import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { CrudOperationsService } from '../crud/crud-operations.service';
import { CommonService } from '../common/common.service';
import { SyncTestRequestsService } from '../syncTestRequests/sync-test-requests.service';
import { InitDataService } from '../init-data/init-data.service';

export type StepState = 'pending' | 'running' | 'done' | 'failed';
export interface BootstrapStep { key: string; label: string; state: StepState; detail?: string; }
export interface BootstrapProgress { steps: BootstrapStep[]; done: boolean; failed: boolean; }

/**
 * Runs the work that follows a successful login: the reference data download
 * (init), the download of the user's existing test requests, and the facility
 * write to SQLite. Publishes progress so the setup screen can show it, and can
 * be re-run after a failure.
 */
@Injectable({ providedIn: 'root' })
export class BootstrapService {
  private loginDetails: any;
  private running = false;
  private readonly initialSteps = (): BootstrapStep[] => [
    { key: 'init', label: 'Downloading reference data', state: 'pending' },
    { key: 'records', label: 'Downloading your test requests', state: 'pending' },
    { key: 'facilities', label: 'Saving facilities', state: 'pending' },
  ];
  readonly progress$ = new BehaviorSubject<BootstrapProgress>({ steps: this.initialSteps(), done: false, failed: false });

  // State shared with the download code moved here from the login page.
  appVersionNumber: any;
  authToken: any;
  userID: any;
  formID: any;
  initArray: any = {};
  covid19WebArray: any = [];
  webSamplesArray: any = [];
  vlSamplesArray: any = [];
  results: any = [];
  testresults: any = [];
  private dbStorage: SQLiteObject;

  constructor(
    public CrudService: CrudOperationsService,
    public commonservice: CommonService,
    public SyncReq: SyncTestRequestsService,
    private sqlite: SQLite,
    private storage: Storage,
    private initData: InitDataService,
  ) {}

  /** Start (or restart) the post-login work. Returns immediately; watch progress$. */
  start(loginDetails?: any): void {
    if (loginDetails) { this.loginDetails = loginDetails; }
    if (this.running || !this.loginDetails) { return; }
    this.running = true;
    this.progress$.next({ steps: this.initialSteps(), done: false, failed: false });
    this.run().catch((e) => console.error('bootstrap', e)).finally(() => { this.running = false; });
  }

  private async run(): Promise<void> {
    this.authToken = this.loginDetails.api_token;
    this.userID = this.loginDetails.user.user_id;
    this.formID = this.loginDetails.form;
    this.appVersionNumber = await this.storage.get('appVersionNumber');

    // Reference data is needed for every form; the login page used to skip it for some.
    const initTask = this.runInit();
    const recordsTask = this.runRecords();
    await Promise.all([initTask, recordsTask]);

    const facilities = this.initArray && this.initArray.facilitiesList;
    if (this.stepState('init') === 'done' && Array.isArray(facilities) && facilities.length) {
      this.setStep('facilities', 'running');
      try {
        const n = await this.initData.insertFacilities(facilities);
        this.setStep('facilities', 'done', n + ' facilities');
      } catch (e) {
        console.error(e);
        this.setStep('facilities', 'failed', 'Could not save facilities');
      }
    } else {
      this.setStep('facilities', 'done', this.stepState('init') === 'done' ? 'Nothing to save' : 'Skipped');
    }
    this.finish();
  }

  private async runInit(): Promise<void> {
    this.setStep('init', 'running');
    try {
      const result: any = await this.CrudService.postDataWithoutLoader('/api/v1.1/init.php', {}, this.authToken, true);
      if (result && result.status == '1') {
        this.initArray = result.data;
        await this.storage.set('initArray', this.initArray);
        await this.initData.recordInitSync(result.timestamp);
        const n = Array.isArray(this.initArray.facilitiesList) ? this.initArray.facilitiesList.length : 0;
        this.setStep('init', 'done', n ? n + ' facilities received' : undefined);
      } else {
        this.setStep('init', 'failed', (result && (result.message || result.error)) || 'Server did not return reference data');
      }
    } catch (err: any) {
      console.error(err);
      this.setStep('init', 'failed', (err && err.serverMessage) || 'Could not reach the server');
    }
  }

  private async runRecords(): Promise<void> {
    this.setStep('records', 'running');
    try {
      await this.getWebRecords();
      const total = this.vlSamplesArray.length + this.covid19WebArray.length + this.webSamplesArray.length;
      this.setStep('records', 'done', total + ' requests');
    } catch (err: any) {
      console.error(err);
      this.setStep('records', 'failed', (err && err.serverMessage) || 'Could not download test requests');
    }
  }

  private finish(): void {
    const p = this.progress$.value;
    const failed = p.steps.some(s => s.state === 'failed');
    this.progress$.next({ ...p, done: !failed, failed });
  }

  private stepState(key: string): StepState {
    const st = this.progress$.value.steps.find(s => s.key === key);
    return st ? st.state : 'pending';
  }

  private setStep(key: string, state: StepState, detail?: string): void {
    const p = this.progress$.value;
    this.progress$.next({ ...p, steps: p.steps.map(s => s.key === key ? { ...s, state, detail } : s) });
  }

  // ---- moved from login.page.ts ------------------------------------------------

  async getWebRecords() {
    console.log("getWebRecords");
    let getWebSamplesJSON = { appVersion: this.appVersionNumber, };
    const covidRecords = this.CrudService.postDataWithoutLoader('/api/v1.1/covid-19/get-request.php', getWebSamplesJSON, this.authToken ,true).then(
      async (result) => {
        if (result['token'] != null) {
          this.authToken = result['token'];
          this.commonservice.tokenUpdate(result['token']);
        }
        if (result['status'] == 'success') {
          this.covid19WebArray = [];
          this.covid19WebArray = result['data'];

          let userID = this.userID;
          let formID = this.formID;

          if (this.covid19WebArray.length != 0) {
            await this.sqlite.create({
                name: 'vlsm_mobile.db',
                location: 'default',
              }).then(async (db: SQLiteObject) => {
                this.dbStorage = db;
                const data = [];
                const rowArgs = [];

                let query =
                  'INSERT or IGNORE into form_covid19 (user_id,unique_id,vlsm_country_id,remote_sample_code,locked,data_sync,app_sample_code,sample_collection_date,sample_code,last_modified_datetime,source_of_alert,province_id,province_name,district,facility_id,facility_name,implementing_partner,implementing_partner_name,funding_source,funding_source_name,lab_id,lab_name,patient_id,external_sample_code,patient_name,patient_surname,patient_dob,patient_age,patient_gender,patient_phone_number,patientEmail,patient_address,patient_province_id,patient_province,patient_district,patient_zone,patient_city,patient_nationality,patient_nationality_name,patient_passport_number,type_of_test_requested,reason_for_covid19_test,specimen_type,test_number,sample_received_at_vl_lab_datetime,sample_condition,lab_technician,lab_technician_name,is_sample_rejected,rejection_on,reason_for_sample_rejection,result,tested_by,tested_by_name,is_result_authorised,authorized_by,authorized_on,created_on,is_synced,reason_for_changing,asymptomatic,fever_temp,has_recent_travel_history,travel_country_names,travel_return_date,flight_airline,flight_seat_no,flight_arrival_datetime,flight_airport_of_departure,flight_transit,reason_of_visit,patient_occupation,does_patient_smoke,temperature_measurement_method,result_approved_by,result_reviewed_by,result_approved_datetime,result_reviewed_datetime,respiratory_rate,oxygen_saturation,number_of_days_sick,medical_history,recent_hospitalization,patient_lives_with_children,patient_cares_for_children,close_contacts,is_patient_pregnant,sample_dispatched_datetime,date_of_symptom_onset,date_of_initial_consultation) VALUES ';
                this.covid19WebArray.forEach(
                  function (item) {
                    if (item.appSampleCode != null) {
                      rowArgs.push('(? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
                      data.push(userID);
                      data.push(item.uniqueId);
                      data.push(formID);
                      data.push(item.remoteSampleCode);
                      data.push('no');
                      data.push(0);
                      data.push(item.appSampleCode);
                      data.push(item.sampleCollectionDate);
                      data.push(item.sampleCode);
                      data.push(item.updatedOn);
                      data.push(item.sourceOfAlertPOE);
                      data.push(item.provinceId);
                      data.push(item.provinceName);
                      data.push(item.district);
                      data.push(item.facilityId);
                      data.push(item.facilityName);
                      data.push(item.implementingPartner);
                      data.push(item.implementingPartnerName);
                      data.push(item.fundingSource);
                      data.push(item.fundingSourceName);
                      data.push(item.labId);
                      data.push(item.labName);
                      data.push(item.patientId);
                      data.push(item.externalSampleCode);
                      data.push(item.firstName);
                      data.push(item.lastName);
                      data.push(item.patientDob);
                      data.push(item.patientAge);
                      data.push(item.patientGender);
                      data.push(item.patientPhoneNumber);
                      data.push(item.patientEmail);
                      data.push(item.patientAddress);
                      data.push(item.patientProvince);
                      data.push(item.patientProvinceName);
                      data.push(item.patientDistrict);
                      data.push(item.patientZone);
                      data.push(item.patientCity);
                      data.push(item.patientNationality);
                      data.push(item.patientNationalityName);
                      data.push(item.patientPassportNumber);
                      data.push(item.testTypeRequested);
                      data.push(item.reasonForCovid19Test);
                      data.push(item.specimenType);
                      data.push(item.testNumber);
                      data.push(item.sampleReceivedDate);
                      data.push(item.sampleCondition);
                      data.push(item.labTechnician);
                      data.push(item.labTechnicianName);
                      data.push(item.isSampleRejected);
                      data.push(item.rejectionDate);
                      data.push(item.rejectionReason);
                      data.push(item.result);
                      data.push(item.testedBy);
                      data.push(item.testedByName);
                      data.push(item.isAuthorised);
                      data.push(item.authorisedBy);
                      data.push(item.authorisedOn);
                      data.push(item.createdOn);
                      data.push(true);
                      data.push(item.reasonForCovid19ResultChanges);
                      data.push(item.asymptomatic);
                      data.push(item.feverTemp);
                      data.push(item.hasRecentTravelHistory);
                      data.push(item.countryName);
                      data.push(item.returnDate);
                      data.push(item.airline);
                      data.push(item.seatNo);
                      data.push(item.arrivalDateTime);
                      data.push(item.airportOfDeparture);
                      data.push(item.transit);
                      data.push(item.reasonOfVisit);
                      data.push(item.patientOccupation);
                      data.push(item.doesPatientSmoke);
                      data.push(item.temperatureMeasurementMethod);
                      data.push(item.approvedBy);
                      data.push(item.reviewedBy);
                      data.push(item.approvedOn);
                      data.push(item.reviewedOn);
                      data.push(item.respiratoryRate);
                      data.push(item.oxygenSaturation);
                      data.push(item.numberOfDaysSick);
                      data.push(item.medicalHistory);
                      data.push(item.recentHospitalization);
                      data.push(item.patientLivesWithChildren);
                      data.push(item.patientCaresForChildren);
                      data.push(item.closeContacts);
                      data.push(item.isPatientPregnant);
                      data.push(item.sampleDispatchedOn);
                      data.push(item.dateOfSymptomOnset);
                      data.push(item.dateOfInitialConsultation);
                      // data.push(item.reasonForChanging);
                    }
                  }.bind(this)
                );

                query += rowArgs.join(', ');

                return this.dbStorage
                  .executeSql(
                    query +
                    'ON CONFLICT (app_sample_code) DO UPDATE SET (user_id,vlsm_country_id,remote_sample,locked,data_sync,app_sample_code,sample_collection_date,sample_code,last_modified_datetime,source_of_alert,province_id,province_name,district,facility_id,facility_name,implementing_partner,implementing_partner_name,funding_source,funding_source_name,lab_id,lab_name,patient_id,external_sample_code,patient_name,patient_surname,patient_dob,patient_age,patient_gender,patient_phone_number,patientEmail,patient_address,patient_province_id,patient_province,patient_district,patient_zone,patient_city,patient_nationality,patient_nationality_name,patient_passport_number,type_of_test_requested,reason_for_covid19_test,specimen_type,test_number,sample_received_at_vl_lab_datetime,sample_condition,lab_technician,lab_technician_name,is_sample_rejected,rejection_on,reason_for_sample_rejection,result,tested_by,tested_by_name,is_result_authorised,authorized_by,authorized_on,created_on,is_synced,reason_for_changing,asymptomatic,fever_temp,has_recent_travel_history,travel_country_names,travel_return_date,flight_airline,flight_seat_no,flight_arrival_datetime,flight_airport_of_departure,flight_transit,reason_of_visit,patient_occupation,does_patient_smoke,temperature_measurement_method,result_approved_by,result_reviewed_by,result_approved_datetime,result_reviewed_datetime,respiratory_rate,oxygen_saturation,number_of_days_sick,medical_history,recent_hospitalization,patient_lives_with_children,patient_cares_for_children,close_contacts,is_patient_pregnant,sample_dispatched_datetime,date_of_symptom_onset,date_of_initial_consultation) = (EXCLUDED.user_id, EXCLUDED.vlsm_country_id, EXCLUDED.remote_sample, EXCLUDED.locked, EXCLUDED.data_sync, EXCLUDED.app_sample_code, EXCLUDED.sample_collection_date, EXCLUDED.sample_code,EXCLUDED.last_modified_datetime, EXCLUDED.source_of_alert, EXCLUDED.province_id, EXCLUDED.province_name,EXCLUDED.district, EXCLUDED.facility_id, EXCLUDED.facility_name, EXCLUDED.implementing_partner, EXCLUDED.implementing_partner_name, EXCLUDED.funding_source, EXCLUDED.funding_source_name, EXCLUDED.lab_id,EXCLUDED.lab_name, EXCLUDED.patient_id, EXCLUDED.external_sample_code, EXCLUDED.patient_name, EXCLUDED.patient_surname, EXCLUDED.patient_dob, EXCLUDED.patient_age, EXCLUDED.patient_gender, EXCLUDED.patient_phone_number, EXCLUDED.patientEmail, EXCLUDED.patient_address, EXCLUDED.patient_province_id, EXCLUDED.patient_province, EXCLUDED.patient_district,EXCLUDED.patient_zone, EXCLUDED.patient_city, EXCLUDED.patient_nationality, EXCLUDED.patient_nationality_name, EXCLUDED.patient_passport_number, EXCLUDED.type_of_test_requested, EXCLUDED.reason_for_covid19_test, EXCLUDED.specimen_type, EXCLUDED.test_number, EXCLUDED.sample_received_at_vl_lab_datetime, EXCLUDED.sample_condition, EXCLUDED.lab_technician,EXCLUDED.lab_technician_name, EXCLUDED.is_sample_rejected, EXCLUDED.rejection_on, EXCLUDED.reason_for_sample_rejection, EXCLUDED.result, EXCLUDED.tested_by,EXCLUDED.tested_by_name, EXCLUDED.is_result_authorised, EXCLUDED.authorized_by, EXCLUDED.authorized_on, EXCLUDED.created_on,EXCLUDED.is_synced, EXCLUDED.reason_for_changing, EXCLUDED.asymptomatic, EXCLUDED.fever_temp, EXCLUDED.has_recent_travel_history, EXCLUDED.travel_country_names, EXCLUDED.travel_return_date,EXCLUDED.flight_airline, EXCLUDED.flight_seat_no, EXCLUDED.flight_arrival_datetime, EXCLUDED.flight_airport_of_departure, EXCLUDED.flight_transit, EXCLUDED.reason_of_visit, EXCLUDED.patient_occupation, EXCLUDED.does_patient_smoke, EXCLUDED.temperature_measurement_method, EXCLUDED.result_approved_by, EXCLUDED.result_reviewed_by, EXCLUDED.result_approved_datetime, EXCLUDED.result_reviewed_datetime, EXCLUDED.respiratory_rate, EXCLUDED.oxygen_saturation, EXCLUDED.number_of_days_sick, EXCLUDED.medical_history, EXCLUDED.recent_hospitalization, EXCLUDED.patient_lives_with_children, EXCLUDED.patient_cares_for_children, EXCLUDED.close_contacts, EXCLUDED.is_patient_pregnant,EXCLUDED.sample_dispatched_datetime,EXCLUDED.date_of_symptom_onset,EXCLUDED.date_of_initial_consultation)',
                    data
                  )
                  .then((res) => {
                    // console.log(res);

                    return this.dbStorage
                      .executeSql('SELECT * FROM form_covid19', [])
                      .then(async (data) => {
                        // console.log(data);
                        this.results = [];
                        for (let i = 0; i < data.rows.length; i++) {
                          const item = data.rows.item(i);
                          this.results.push(item);
                        }
                        // console.log(this.results, 'form_covid19');
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });

            await this.sqlite
              .create({
                name: 'vlsm_mobile.db',
                location: 'default',
              })
              .then(async (db: SQLiteObject) => {
                this.dbStorage = db;
                await this.covid19WebArray.forEach(function (item) {
                  if (item.c19Tests.length > 0) {
                    db.executeSql(
                      'DELETE FROM covid19_tests where unique_id =?',
                      [item.uniqueId]
                    );
                  }
                });
                const data = [];
                const rowArgs = [];
                let query =
                  'INSERT or IGNORE INTO covid19_tests (unique_id,covid19_id,facility_id,test_name,tested_by,sample_tested_datetime,testing_platform,kitLotNo,kitExpiryDate,result) VALUES ';
                this.covid19WebArray.forEach(function (item) {
                  rowArgs.push('(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

                  if (item.c19Tests.length > 0) {
                    for (let i = 0; i < item.c19Tests.length; i++) {
                      data.push(item.uniqueId);
                      data.push(item.covid19Id);
                      data.push(item.facilityId);
                      data.push(item.c19Tests[i].testName);
                      data.push(item.testedByName);
                      data.push(item.c19Tests[i].testDate);
                      data.push(item.c19Tests[i].testingPlatform);
                      data.push(item.c19Tests[i].kitLotNo);
                      data.push(item.c19Tests[i].kitExpiryDate);
                      data.push((item.c19Tests[i].testResult ?? item.c19Tests[i].result));
                      // console.log(item.c19Tests[i].testId,'c19tests[i]',data);
                    }
                  }
                });
                query += rowArgs.join(', ');

                return this.dbStorage
                  .executeSql(query, data)
                  .then((res) => {
                    console.log(res);
                    return this.dbStorage
                      .executeSql('SELECT * FROM covid19_tests', [])
                      .then((data) => {
                        this.testresults = [];
                        for (let i = 0; i < data.rows.length; i++) {
                          const item = data.rows.item(i);
                          this.testresults.push(item);
                        }
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              });

              await this.sqlite.create({
                name: 'vlsm_mobile.db',
                location: 'default',
              }).then(async (db: SQLiteObject) => {
                this.dbStorage = db;
                const data = [];
                const rowArgs = [];
                let query = 'INSERT or IGNORE INTO covid19_reasons_for_testing (covid19_id, reasons_id, reasons_detected, reason_details) VALUES ';
                let reason_detected;
                this.covid19WebArray.forEach(function (item) {
                  if(item.reasonForCovid19Test == 1){
                    reason_detected = "Cas suspect de COVID-19";
                  }
                  else if(item.reasonForCovid19Test == 2){
                    reason_detected = "Cas probable de COVID-19";
                  }
                  else if(item.reasonForCovid19Test == 3){
                    reason_detected = "Cas confirme de covid-19";
                  }
                  else if(item.reasonForCovid19Test == 4){
                    reason_detected = "Non cas contact de COVID-19";
                  }
                  else{
                    reason_detected = "Diagnostique";
                  }
                  rowArgs.push('(?, ?, ?, ?)');
                  if (item.c19ReasonDetails.length > 0) {
                    for (let i = 0; i < item.c19ReasonDetails.length; i++) {
                      data.push(item.covid19Id);
                      data.push(item.reasonForCovid19Test);
                      data.push(reason_detected);
                      data.push(item.c19ReasonDetails[i].reason_details);
                    }
                  }
                });
                query += rowArgs.join(', ');

                return this.dbStorage.executeSql(query, data).then((res) => {
                    console.log(res);
                    return this.dbStorage.executeSql('SELECT * FROM covid19_reasons_for_testing', []).then((data) => {
                        this.testresults = [];
                        for (let i = 0; i < data.rows.length; i++) {
                          const item = data.rows.item(i);
                          this.testresults.push(item);
                        }
                        console.log(this.testresults,'covid_reasons');
                      });
                  }).catch((error) => {
                    console.log(error);
                  });
              });

             
            

              await this.sqlite
              .create({
                name: 'vlsm_mobile.db',
                location: 'default',
              })
              .then(async (db: SQLiteObject) => {
                this.dbStorage = db;
                await this.covid19WebArray.forEach(function (item) {
                  if (item.c19Symptoms.length > 0) {
                    db.executeSql(
                      'DELETE FROM covid19_patient_symptoms where covid19_id =?',
                      [item.covid19Id]
                    );
                  }
                });
                const data = [];
                const rowArgs = [];
                let query = 'INSERT or IGNORE INTO covid19_patient_symptoms (covid19_id,symptom_id,symptom_detected,symptom_details) VALUES ';
                this.covid19WebArray.forEach(function (item) {
                  rowArgs.push('(?, ?, ?, ?)');
                  if (item.c19Symptoms.length > 0) {
                    for (let i = 0; i < item.c19Symptoms.length; i++) {
                      data.push(item.c19Symptoms[i].uniqueId);
                      data.push(item.c19Symptoms[i].symptom_id);
                      data.push(item.c19Symptoms[i].symptom_detected);
                      data.push(item.c19Symptoms[i].symptom_details);
                    }
                  }
                });
                query += rowArgs.join(', ');
                return this.dbStorage.executeSql(query, data).then((res) => {
                    console.log(res,'res');
                    return this.dbStorage.executeSql('SELECT * FROM covid19_patient_symptoms', []).then((data) => {
                        this.testresults = [];
                        for (let i = 0; i < data.rows.length; i++) {
                          const item = data.rows.item(i);
                          this.testresults.push(item);
                        }
                        console.log(this.testresults,'covid19_patient_symptoms');
                      });
                  }).catch((error) => {
                    console.log(error);
                  });
              });        

                  
                  }
                }
              },
              (err) => { }
            );

    const uniqueAppSampleCodes = new Set();

    const eidRecords = this.CrudService.postDataWithoutLoader('/api/v1.1/eid/get-request.php', getWebSamplesJSON, this.authToken ,true).then(
      async (result) => {
        if (result['token'] != null) {
          this.authToken = result['token'];
          this.commonservice.tokenUpdate(result['token']);
        }
        
        if (result['status'] == 'success') {
          this.webSamplesArray = [];
          this.webSamplesArray = result['data'];
          let userID = this.userID;
          // let formID = this.formID;
          if (this.webSamplesArray.length != 0) {
            this.sqlite.create({
              name: 'vlsm_mobile.db',
              location: 'default',
            }).then((db: SQLiteObject) => {
              this.dbStorage = db;
              const data = [];
              const rowArgs = [];
              let query =
                'INSERT or IGNORE INTO eid_form (unique_id, age_breastfeeding_stopped_in_months, app_sample_code, caretaker_address, caretaker_phone_number, child_age, child_dob, child_gender, child_id, child_name, child_surname,child_treatment, child_treatment_other, choice_of_feeding,  eid_test_platform, facility_id, funding_source, has_infant_stopped_breastfeeding, implementing_partner,  import_machine_name,  is_sample_rejected,  is_synced,  lab_id, lab_reception_person, lab_technician, last_pcr_date,  locked, mother_hiv_status,  mother_id,  mother_treatment,  pcr_test_performed_before,  previous_pcr_result,  province_id,  rapid_test_date,  rapid_test_performed, rapid_test_result,  reason_for_pcr,  reason_for_sample_rejection,  remote_sample_code,  result,  result_approved_by,  result_reviewed_by, result_status,  sample_code,  sample_collection_date,  sample_received_at_vl_lab_datetime,  sample_requestor_name,  sample_requestor_phone,  sample_tested_datetime, specimen_type,  tested_by,  user_id,  vlsm_country_id,  vlsm_instance_id,reason_for_changing,facility_name,province_name,district,result_approved_datetime, result_reviewed_datetime, mother_name, mother_marital_status, mother_dob,mother_cd4,is_cotrimoxazole_being_administered_to_the_infant,rejection_on) VALUES ';
              this.webSamplesArray.forEach(
                function (item) {
                  if (item.appSampleCode != null) {
                    rowArgs.push('(? ,? ,? ,? ,? ,? ,? ,? ,? ,? , ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?  ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?, ? ,? ,? ,? ,? ,? ,? ,? , ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,? )');
                    data.push(item.uniqueId);
                    data.push(item.ageBreastfeedingStopped);
                    data.push(item.appSampleCode);
                    data.push(item.caretakerAddress);
                    data.push(item.caretakerPhoneNumber);
                    data.push(item.childAge);
                    data.push(item.childDob);
                    data.push(item.childGender);
                    data.push(item.childId);
                    data.push(item.childName);
                    data.push(item.childSurName);
                    data.push(item.childTreatment);
                    data.push(item.childTreatmentOther);
                    data.push(item.choiceOfFeeding);
                    data.push(item.eidPlatform);
                    data.push(item.facilityId);
                    data.push(item.fundingSource);
                    data.push(item.hasInfantStoppedBreastfeeding);
                    data.push(item.implementingPartner);
                    data.push(item.machineName);
                    data.push(item.isSampleRejected);
                    // data.push(item.isSampleRejected != null ? item.isSampleRejected : 0); 
                    data.push(true);
                    data.push(item.labId);
                    data.push(item.labReceptionPerson);
                    data.push(item.labTechnicianName);
                    data.push(item.previousPCRTestDate);
                    data.push('no');
                    data.push(item.mothersHIVStatus);
                    data.push(item.mothersId);
                    data.push(item.motherTreatment);
                    data.push(item.pcrTestPerformedBefore);
                    data.push(item.prePcrTestResult);
                    data.push(item.provinceId);
                    data.push(item.rapidtestDate);
                    data.push(item.rapidTestPerformed);
                    data.push(item.rapidTestResult);
                    data.push(item.pcrTestReason);
                    data.push(item.sampleRejectionReason);
                    data.push(item.remoteSampleCode);
                    data.push(item.result);
                    data.push(item.approvedBy);
                    data.push(item.reviewedBy);
                    data.push(item.resultStatusName);
                    data.push(item.sampleCode);
                    data.push(item.sampleCollectionDate);
                    data.push(item.sampleReceivedDate);
                    data.push(item.sampleRequestorName);
                    data.push(item.sampleRequestorPhone);
                    data.push(item.sampleTestedDateTime);
                    data.push(item.specimenType);
                    data.push(item.testedBy);
                    data.push(userID);
                    data.push(item.formId);
                    data.push(item.instanceId);
                    data.push(item.reasonForEidResultChanges);
                    data.push(item.facilityName);
                    data.push(item.provinceName);
                    data.push(item.district);
                    data.push(item.approvedOn);
                    data.push(item.reviewedOn);
                    data.push(item.mothersName);
                    data.push(item.mothersMaritalStatus);
                    data.push(item.mothersDob);
                    data.push(item.mothercd4);
                    data.push(item.isCotrimoxazoleBeingAdministered);
                    data.push(item.rejectionDate);
                  }
                
                }.bind(this)
  
              );
              query += rowArgs.join(', ');
  
              return this.dbStorage
              .executeSql(
                query + 
                'ON CONFLICT (app_sample_code) DO UPDATE SET ( age_breastfeeding_stopped_in_months, app_sample_code, caretaker_address, caretaker_phone_number, child_age, child_dob, child_gender, child_id, child_name, child_surname, child_treatment, child_treatment_other, choice_of_feeding, eid_test_platform, facility_id, funding_source, has_infant_stopped_breastfeeding, implementing_partner,  import_machine_name,  is_sample_rejected,  is_synced,  lab_id, lab_reception_person, lab_technician, last_pcr_date,  locked, mother_hiv_status,  mother_id,  mother_treatment,  pcr_test_performed_before,  previous_pcr_result,  province_id,  rapid_test_date,  rapid_test_performed, rapid_test_result,  reason_for_pcr,  reason_for_sample_rejection,  remote_sample_code,  result,  result_approved_by,  result_reviewed_by, result_status,  sample_code,  sample_collection_date,  sample_received_at_vl_lab_datetime,  sample_requestor_name,  sample_requestor_phone,  sample_tested_datetime, specimen_type,  tested_by,  user_id,  vlsm_country_id,  vlsm_instance_id,reason_for_changing, facility_name,province_name,district, result_approved_datetime, result_reviewed_datetime, mother_name, mother_marital_status, mother_dob, mother_cd4,is_cotrimoxazole_being_administered_to_the_infant,rejection_on) = ( EXCLUDED.age_breastfeeding_stopped_in_months, EXCLUDED.app_sample_code, EXCLUDED.caretaker_address, EXCLUDED.caretaker_phone_number, EXCLUDED.child_age, EXCLUDED.child_dob, EXCLUDED.child_gender, EXCLUDED.child_id, EXCLUDED.child_name, EXCLUDED.child_surname, EXCLUDED.child_treatment, EXCLUDED.child_treatment_other, EXCLUDED.choice_of_feeding, EXCLUDED.eid_test_platform, EXCLUDED.facility_id, EXCLUDED.funding_source, EXCLUDED.has_infant_stopped_breastfeeding, EXCLUDED.implementing_partner, EXCLUDED.import_machine_name, EXCLUDED.is_sample_rejected, EXCLUDED.is_synced, EXCLUDED.lab_id, EXCLUDED.lab_reception_person, EXCLUDED.lab_technician, EXCLUDED.last_pcr_date, EXCLUDED.locked, EXCLUDED.mother_hiv_status, EXCLUDED.mother_id, EXCLUDED.mother_treatment, EXCLUDED.pcr_test_performed_before, EXCLUDED.previous_pcr_result, EXCLUDED.province_id, EXCLUDED.rapid_test_date, EXCLUDED.rapid_test_performed, EXCLUDED.rapid_test_result, EXCLUDED.reason_for_pcr, EXCLUDED.reason_for_sample_rejection, EXCLUDED.remote_sample_code, EXCLUDED.result, EXCLUDED.result_approved_by, EXCLUDED.result_reviewed_by, EXCLUDED.result_status, EXCLUDED.sample_code, EXCLUDED.sample_collection_date, EXCLUDED.sample_received_at_vl_lab_datetime, EXCLUDED.sample_requestor_name, EXCLUDED.sample_requestor_phone, EXCLUDED.sample_tested_datetime, EXCLUDED.specimen_type, EXCLUDED.tested_by, EXCLUDED.user_id, EXCLUDED.vlsm_country_id, EXCLUDED.vlsm_instance_id, EXCLUDED.reason_for_changing, EXCLUDED.facility_name, EXCLUDED.province_name,EXCLUDED.district, EXCLUDED.result_approved_datetime, EXCLUDED.result_reviewed_datetime, EXCLUDED.mother_name, EXCLUDED.mother_marital_status, EXCLUDED.mother_dob, EXCLUDED.mother_cd4, EXCLUDED.is_cotrimoxazole_being_administered_to_the_infant, EXCLUDED.rejection_on)',data).then((res) => {
                  // console.log(res, 'return eid_form');
  
                  return this.dbStorage
                    .executeSql('SELECT * FROM eid_form', [])
                    .then((data) => {
                      // console.log(data.rows.length);
                      console.log(data);
                      this.results = [];
                      for (let i = 0; i < data.rows.length; i++) {
                        const item = data.rows.item(i);
                        this.results.push(item);
                      }
                    });
                })
                .catch((error) => {
                  console.log(error);
                });
            });
          }
        }
      },
      (err) => { }
    );


    

    

    const vlRecords = this.CrudService.postDataWithoutLoader('/api/v1.1/vl/get-request.php', getWebSamplesJSON, this.authToken ,true).then(
      async (result) => {
        if (result['token'] != null) {
          this.authToken = result['token'];
          this.commonservice.tokenUpdate(result['token']);
        }
        if (result['status'] == 'success') {
          this.vlSamplesArray = [];
          this.vlSamplesArray = result['data'];
          let userID = this.userID;
          if (this.vlSamplesArray.length != 0) {
            this.sqlite.create({ name: 'vlsm_mobile.db', location: 'default', }).then((db: SQLiteObject) => {
              this.dbStorage = db;
              const data = [];
              const rowArgs = [];
              let query = `INSERT or IGNORE INTO vl_request_form (unique_id, user_id, app_sample_code, remote_sample_code, request_created_datetime, last_modified_datetime, is_synced, vlsm_country_id, province_name, province_id, date_test_ordered_by_physician, district, facility_district_id, facility_name, facility_id, implementing_partner, implementing_partner_name, funding_source, lab_id, patient_art_no, patient_first_name, patient_last_name, patient_dob, patient_age_in_years, patient_age_in_months, patient_gender, consent_to_receive_sms, patient_mobile_number, sample_collection_date, sample_type, treatment_initiated_date, current_regimen, date_of_initiation_of_current_regimen, arv_adherance_percentage, is_patient_pregnant, is_patient_breastfeeding, last_vl_date_routine, last_vl_result_routine, last_vl_date_failure_ac, last_vl_result_failure_ac, last_vl_date_failure, last_vl_result_failure, request_clinician_name, request_clinician_phone_number, test_requested_on, lab_name, vl_focal_person, vl_focal_person_phone_number, sample_received_at_hub_datetime, sample_received_at_vl_lab_datetime, sample_tested_datetime, vl_test_platform, is_sample_rejected, reason_for_sample_rejection, result_value_absolute, result_value_log, result_dispatched_datetime, tested_by, result_approved_by, result_approved_datetime, facility_comments, result, reason_for_changing, result_reviewed_by, result_reviewed_datetime, result_value_hiv_detection, is_patient_new, has_patient_changed_regimen, reason_for_regimen_change, regimen_change_date, reason_for_vl_testing, vl_test_number, last_viral_load_result, last_viral_load_date, serial_no, pregnancy_trimester, rejection_on, community_sample, sample_dispatched_datetime, date_dispatched_from_clinic_to_lab) VALUES `;
    
              this.vlSamplesArray.forEach(function (item) {
                if (item.appSampleCode != null) {
                  rowArgs.push("(? ,?, ? ,? ,? ,? ,? ,? ,? , ?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? , ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                  data.push(item.uniqueId);
                  data.push(userID);
                  data.push(item.appSampleCode);
                  data.push(item.remoteSampleCode);
                  data.push(item.requestCreatedDatetime);
                  data.push(item.lastModifiedDatetime);
                  data.push(true);
                  data.push(item.formId);
                  data.push(item.provinceName);
                  data.push(item.provinceId);
                  data.push(item.dateOfDemand);
                  data.push(item.district);
                  data.push(item.districtId);
                  data.push(item.facilityName);
                  data.push(item.facilityId);
                  data.push(item.implementingPartner);
                  data.push(item.implementingPartnerName);
                  data.push(item.fundingSource);
                  data.push(item.labId);
                  data.push(item.artNo);
                  data.push(item.patientFirstName);
                  data.push(item.patientLastName);
                  data.push(item.dob);
                  data.push(item.ageInYears);
                  data.push(item.ageInMonths);
                  data.push(item.patientGender);
                  data.push(item.receiveSms);
                  data.push(item.patientPhoneNumber);
                  data.push(item.sampleCollectionDate);
                  data.push(item.specimenType);
                  data.push(item.dateOfArtInitiation);
                  data.push(item.artRegimen);
                  data.push(item.regimenInitiatedOn);
                  data.push(item.arvAdherence);
                  data.push(item.patientPregnant);
                  data.push(item.breastfeeding);
                  data.push(item.rmTestingLastVLDate);
                  data.push(item.rmTestingVlValue);
                  data.push(item.repeatTestingLastVLDate);
                  data.push(item.repeatTestingVlValue);
                  data.push(item.suspendTreatmentLastVLDate);
                  data.push(item.suspendTreatmentVlValue);
                  data.push(item.reqClinician);
                  data.push(item.reqClinicianPhoneNumber);
                  data.push(item.requestDate);
                  data.push(item.labName);
                  data.push(item.vlFocalPerson);
                  data.push(item.vlFocalPersonPhoneNumber);
                  data.push(item.sampleReceivedAtHubOn);
                  data.push(item.sampleReceivedDate);
                  data.push(item.sampleTestingDateAtLab);
                  data.push(item.testingPlatform);
                  data.push(item.isSampleRejected);
                  data.push(item.rejectionReason);
                  data.push(item.vlResult);
                  data.push(item.vlLog);
                  data.push(item.resultDispatchedOn);
                  data.push(item.testedBy);
                  data.push(item.approvedBy);
                  data.push(item.approvedOn);
                  data.push(item.labComments);
                  data.push(item.result);
                  data.push(item.reasonForVlResultChanges);
                  data.push(item.reviewedBy);
                  data.push(item.reviewedOn);
                  data.push(item.hivDetection);
                  data.push(item.isPatientNew);
                  data.push(item.hasChangedRegimen);
                  data.push(item.reasonForArvRegimenChange);
                  data.push(item.dateOfArvRegimenChange);
                  data.push(item.reasonForVLTesting);
                  data.push(item.viralLoadNo);
                  data.push(item.lastViralLoadResult);
                  data.push(item.lastViralLoadTestDate);
                  data.push(item.serialNo);
                  data.push(item.trimester);
                  data.push(item.rejectionDate);
                  data.push(item.communitySample);
                  data.push(item.sampleDispatchedOn);
                  data.push(item.dateDispatchedFromClinicToLab);
                }
              }.bind(this));
              query += rowArgs.join(", ");
    
              return this.dbStorage.executeSql(query + `ON CONFLICT (app_sample_code) DO UPDATE SET (user_id, app_sample_code, remote_sample_code, request_created_datetime, last_modified_datetime, is_synced, vlsm_country_id, province_name, province_id, date_test_ordered_by_physician, district, facility_district_id, facility_name, facility_id, implementing_partner, implementing_partner_name, funding_source, lab_id, patient_art_no, patient_first_name, patient_dob, patient_age_in_years, patient_age_in_months, patient_gender, consent_to_receive_sms, patient_mobile_number, sample_collection_date, sample_type, treatment_initiated_date, current_regimen, date_of_initiation_of_current_regimen, arv_adherance_percentage, is_patient_pregnant, is_patient_breastfeeding, last_vl_date_routine, last_vl_result_routine, last_vl_date_failure_ac, last_vl_result_failure_ac, last_vl_date_failure, last_vl_result_failure, request_clinician_name, request_clinician_phone_number, test_requested_on, lab_name, vl_focal_person, vl_focal_person_phone_number, sample_received_at_hub_datetime, sample_received_at_vl_lab_datetime, sample_tested_datetime, vl_test_platform, is_sample_rejected, reason_for_sample_rejection, result_value_absolute, result_value_log, result_dispatched_datetime, tested_by, result_approved_by, result_approved_datetime, facility_comments, result, reason_for_changing, result_reviewed_by, result_reviewed_datetime, result_value_hiv_detection, is_patient_new, has_patient_changed_regimen, reason_for_regimen_change, regimen_change_date, reason_for_vl_testing, vl_test_number, last_viral_load_result, last_viral_load_date, serial_no, pregnancy_trimester, rejection_on, community_sample, sample_dispatched_datetime,date_dispatched_from_clinic_to_lab) = (EXCLUDED.user_id, EXCLUDED.app_sample_code, EXCLUDED.remote_sample_code, EXCLUDED.request_created_datetime, EXCLUDED.last_modified_datetime, EXCLUDED.is_synced, EXCLUDED.vlsm_country_id, EXCLUDED.province_name, EXCLUDED.province_id, EXCLUDED.date_test_ordered_by_physician, EXCLUDED.district, EXCLUDED.facility_district_id, EXCLUDED.facility_name, EXCLUDED.facility_id, EXCLUDED.implementing_partner, EXCLUDED.implementing_partner_name, EXCLUDED.funding_source, EXCLUDED.lab_id, EXCLUDED.patient_art_no, EXCLUDED.patient_first_name, EXCLUDED.patient_dob, EXCLUDED.patient_age_in_years, EXCLUDED.patient_age_in_months, EXCLUDED.patient_gender, EXCLUDED.consent_to_receive_sms, EXCLUDED.patient_mobile_number, EXCLUDED.sample_collection_date, EXCLUDED.sample_type, EXCLUDED.treatment_initiated_date, EXCLUDED.current_regimen, EXCLUDED.date_of_initiation_of_current_regimen, EXCLUDED.arv_adherance_percentage, EXCLUDED.is_patient_pregnant, EXCLUDED.is_patient_breastfeeding, EXCLUDED.last_vl_date_routine, EXCLUDED.last_vl_result_routine, EXCLUDED.last_vl_date_failure_ac, EXCLUDED.last_vl_result_failure_ac, EXCLUDED.last_vl_date_failure, EXCLUDED.last_vl_result_failure, EXCLUDED.request_clinician_name, EXCLUDED.request_clinician_phone_number, EXCLUDED.test_requested_on, EXCLUDED.lab_name, EXCLUDED.vl_focal_person, EXCLUDED.vl_focal_person_phone_number, EXCLUDED.sample_received_at_hub_datetime, EXCLUDED.sample_received_at_vl_lab_datetime, EXCLUDED.sample_tested_datetime, EXCLUDED.vl_test_platform, EXCLUDED.is_sample_rejected, EXCLUDED.reason_for_sample_rejection, EXCLUDED.result_value_absolute, EXCLUDED.result_value_log, EXCLUDED.result_dispatched_datetime, EXCLUDED.tested_by, EXCLUDED.result_approved_by, EXCLUDED.result_approved_datetime, EXCLUDED.facility_comments, EXCLUDED.result, EXCLUDED.reason_for_changing, EXCLUDED.result_reviewed_by, EXCLUDED.result_reviewed_datetime, EXCLUDED.result_value_hiv_detection, EXCLUDED.is_patient_new, EXCLUDED.has_patient_changed_regimen, EXCLUDED.reason_for_regimen_change, EXCLUDED.regimen_change_date, EXCLUDED.reason_for_vl_testing, EXCLUDED.vl_test_number, EXCLUDED.last_viral_load_result, EXCLUDED.last_viral_load_date, EXCLUDED.serial_no, EXCLUDED.pregnancy_trimester, EXCLUDED.rejection_on, EXCLUDED.community_sample, EXCLUDED.sample_dispatched_datetime, EXCLUDED.date_dispatched_from_clinic_to_lab)`, data).then((res) => {
    
                console.log(res, 'return Vl form');
    
                return this.dbStorage.executeSql('SELECT * FROM vl_request_form', []).then((data) => {
                  console.log(data, 'data');
                  this.results = [];
                  for (let i = 0; i < data.rows.length; i++) {
                    let item = data.rows.item(i);
                    this.results.push(item);
                  }
                });
              }).catch((error) => {
                console.log(error);
              });
            });
          }
        }
      },
      (err) => { }
    );
    

    
    
    await Promise.all([covidRecords, eidRecords, vlRecords]);
    await this.showCountToast(
      this.vlSamplesArray.length,
      this.covid19WebArray.length,
      this.webSamplesArray.length
    );
  }
  async showCountToast(vlCount, c19Count, eidCount) {
    if (vlCount && c19Count && eidCount) {
      if (this.SyncReq.UnSyncedOriginalVlArray.length == 0) {
        if (
          this.SyncReq.UnSyncedOriginalKeyArray.length == 0 &&
          this.SyncReq.UnSyncedOriginalEidArray.length == 0
        ) {
          const count =
            this.covid19WebArray.length +
            this.webSamplesArray.length +
            this.vlSamplesArray.length;
          this.SyncReq.singleAlert(
            'OK',
            count,
            'fromLogin',
            'success',
            '',
            0,
            ''
          );
        }
      }
    }
  }
}
