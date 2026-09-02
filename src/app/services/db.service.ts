import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertService } from '../service/alert/alert.service';
import { Router } from '@angular/router';
import { DbMigrationService } from './db-migration.service';
@Injectable({
  providedIn: 'root',
})
export class DbService {
  private storage: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  results: any = [];
  id: any;
  uniqueId: any;
  appVersionNumber: Promise<any>;

  constructor(
    private lclstorage: Storage,
    private platform: Platform,
    private router: Router,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
    public alertService: AlertService,
    private dbMigrationService: DbMigrationService
  ) {
    // console.log(this.router.url, 'this.router.url', this.router.url.split(';'));
    // if ( this.router.url == '/login' ) {
    //   this.loadSQLFile();
    // }
  }

  async loadSQLFile(from) {
    console.log('loadSQLFile',from);
  
    try {
      await this.platform.ready();
      const db = await this.sqlite.create({
        name: 'vlsm_mobile.db',
        location: 'default',
      });
  
      this.storage = db;
  
      const data = await this.httpClient.get('assets/vlsm-sqlite3db.sql', {
        responseType: 'text',
      }).toPromise();
  
      await this.sqlPorter.importSqlToDb(this.storage, data);
  
      this.isDbReady.next(true);
      await this.dbMigrationService.startMigration(from);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately, e.g., show a message to the user
    }
  }
  

  dbState() {
    return this.isDbReady.asObservable();
  }

  insertUserDetails(loginDetails) {
    console.log(loginDetails, 'insertUserDetails');
    this.sqlite
      .create({
        name: 'vlsm_mobile.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.storage = db;
        return this.storage
          .executeSql(
            `INSERT OR REPLACE INTO user_details (user_id,user_name,email,phone_number,login_id,password,role_id,api_token,api_token_generated_datetime,status,app_access) VALUES ("${loginDetails['user'].user_id}","${loginDetails['user'].user_name}","${loginDetails['user'].email}","${loginDetails['user'].phone_number}","${loginDetails['user'].login_id}","${loginDetails['user'].password}","${loginDetails['user'].role_id}","${loginDetails['user'].api_token}","${loginDetails['user'].api_token_generated_datetime}","${loginDetails['user'].status}","${loginDetails['user'].app_access}")`,
            []
          )
          .then((res) => {
            console.log(res);

            return this.storage
              .executeSql('SELECT * FROM user_details', [])
              .then((data) => {
                this.results = [];
                for (let i = 0; i < data.rows.length; i++) {
                  let item = data.rows.item(i);
                  this.results.push(item);
                }
                console.log(this.results, 'insertUserDetails result');
              });
          })
          .catch((error) => {
            console.error(error);
            if (
              error.code == 6 &&
              error.message ==
              'sqlite3_step failure: UNIQUE constraint failed: user_details.user_id'
            ) {
              return this.storage
                .executeSql(
                  `UPDATE user_details set user_name= "${loginDetails['user'].user_name}",user_name="${loginDetails['user'].user_name}",email= "${loginDetails['user'].email}",phone_number="${loginDetails['user'].phone_number}",login_id="${loginDetails['user'].login_id}",password="${loginDetails['user'].password}",role_id= "${loginDetails['user'].role_id}",api_token="${loginDetails['user'].api_token}",api_token_generated_datetime="${loginDetails['user'].api_token_generated_datetime}",status="${loginDetails['user'].status}",app_access="${loginDetails['user'].app_access}" where user_id="${loginDetails['user'].user_id}"`,
                  []
                )
                .then((res) => {
                  console.log(res);

                  return this.storage
                    .executeSql('SELECT * FROM user_details', [])
                    .then((data) => {
                      this.results = [];
                      for (let i = 0; i < data.rows.length; i++) {
                        let item = data.rows.item(i);
                        this.results.push(item);
                      }
                      console.log(this.results, 'updated user_details');
                    });
                });
            }
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // insertCovid19Data(saveCovid19SSJSON, isAddOrUpdate) {
  //   this.sqlite
  //     .create({
  //       name: 'vlsm_mobile.db',
  //       location: 'default',
  //     })
  //     .then((db: SQLiteObject) => {
  //       this.storage = db;

  //       const reasonForChangingString = JSON.stringify(saveCovid19SSJSON.reasonForChanging);
  //     console.log(reasonForChangingString);

  //         return this.storage.executeSql(`INSERT INTO form_covid19 as C19 (user_id,unique_id,vlsm_country_id,remote_sample_code,locked,data_sync,app_sample_code,sample_collection_date,asymptomatic,sample_code,last_modified_datetime,source_of_alert,province_id,province_name,district,facility_id,facility_name,implementing_partner,implementing_partner_name,funding_source,funding_source_name,lab_id,lab_name,patient_id,external_sample_code,patient_name,patient_surname,patient_dob,patient_age,patient_gender,patient_phone_number,patient_address,patient_province_id,patient_province,patient_district,
  //           patient_zone,patient_city,patient_nationality,patient_nationality_name,patient_passport_number,type_of_test_requested,reason_for_covid19_test,specimen_type,
  //           test_number,sample_received_at_vl_lab_datetime,sample_condition,lab_technician,lab_technician_name,is_sample_rejected,rejection_on,reason_for_sample_rejection,sample_rejection_id,result,tested_by,tested_by_name,is_result_authorised,authorized_by,authorized_on,request_created_datetime,is_synced,reason_for_changing,
  //           patientEmail,
  //           fever_temp, temperature_measurement_method, respiratory_rate, oxygen_saturation, number_of_days_sick, date_of_symptom_onset, date_of_initial_consultation, medical_history, recent_hospitalization, patient_lives_with_children, patient_cares_for_children, close_contacts, has_recent_travel_history, travel_country_names, flight_airline, flight_seat_no, flight_arrival_datetime, flight_airport_of_departure, flight_transit, reason_of_visit, patient_occupation, does_patient_smoke, travel_return_date,  result_reviewed_by, result_reviewed_datetime, result_approved_by, result_approved_datetime,is_patient_pregnant,sample_dispatched_datetime)
  //        VALUES ("${saveCovid19SSJSON.user_id}","${saveCovid19SSJSON.uniqueId}","${saveCovid19SSJSON.formId}","${saveCovid19SSJSON.remoteSampleCode}","no",0, "${saveCovid19SSJSON.appSampleCode}","${saveCovid19SSJSON.sampleCollectionDate}","${saveCovid19SSJSON.asymptomatic}","${saveCovid19SSJSON.sampleCode}","${saveCovid19SSJSON.updatedOn}","${saveCovid19SSJSON.sourceOfAlertPOE}","${saveCovid19SSJSON.provinceId}","${saveCovid19SSJSON.provinceName}","${saveCovid19SSJSON.district}","${saveCovid19SSJSON.facilityId}","${saveCovid19SSJSON.facilityName}","${saveCovid19SSJSON.implementingPartner}","${saveCovid19SSJSON.implementingPartnerName}","${saveCovid19SSJSON.fundingSource}","${saveCovid19SSJSON.fundingSourceName}","${saveCovid19SSJSON.labId}","${saveCovid19SSJSON.labName}","${saveCovid19SSJSON.patientId}","${saveCovid19SSJSON.externalSampleCode}","${saveCovid19SSJSON.firstName}","${saveCovid19SSJSON.lastName}","${saveCovid19SSJSON.patientDob}","${saveCovid19SSJSON.patientAge}","${saveCovid19SSJSON.patientGender}","${saveCovid19SSJSON.patientPhoneNumber}","${saveCovid19SSJSON.patientAddress}","${saveCovid19SSJSON.patientProvinceId}","${saveCovid19SSJSON.patientProvince}","${saveCovid19SSJSON.patientDistrict}","${saveCovid19SSJSON.patientZone}","${saveCovid19SSJSON.patientCity}","${saveCovid19SSJSON.patientNationality}","${saveCovid19SSJSON.patientNationalityName}","${saveCovid19SSJSON.patientPassportNumber}","${saveCovid19SSJSON.testTypeRequested}","${saveCovid19SSJSON.reasonForCovid19Test}","${saveCovid19SSJSON.specimenType}","${saveCovid19SSJSON.testNumber}","${saveCovid19SSJSON.sampleReceivedDate}","${saveCovid19SSJSON.sampleCondition}","${saveCovid19SSJSON.labTechnician}","${saveCovid19SSJSON.labTechnicianName}","${saveCovid19SSJSON.isSampleRejected}","${saveCovid19SSJSON.rejectionDate}","${saveCovid19SSJSON.rejectionReason}","${saveCovid19SSJSON.rejectionReasonid}","${saveCovid19SSJSON.testResult}","${saveCovid19SSJSON.testedBy}","${saveCovid19SSJSON.testedByName}","${saveCovid19SSJSON.isResultAuthorized}","${saveCovid19SSJSON.authorizedBy}","${saveCovid19SSJSON.authorizedOn}","${saveCovid19SSJSON.createdOn}","${saveCovid19SSJSON.isSynced}", "${saveCovid19SSJSON.reasonForCovid19ResultChanges}" ,"${saveCovid19SSJSON.patientEmail}", "${saveCovid19SSJSON.feverTemp}", "${saveCovid19SSJSON.temperatureMeasurementMethod}", "${saveCovid19SSJSON.respiratoryRate}", "${saveCovid19SSJSON.oxygenSaturation}", "${saveCovid19SSJSON.numberOfDaysSick}", "${saveCovid19SSJSON.dateOfSymptomOnset}", "${saveCovid19SSJSON.dateOfInitialConsultation}", "${saveCovid19SSJSON.medicalBackground}", "${saveCovid19SSJSON.recentHospitalization}", "${saveCovid19SSJSON.patientLivesWithChildren}", "${saveCovid19SSJSON.patientCaresForChildren}", "${saveCovid19SSJSON.closeContacts}", "${saveCovid19SSJSON.hasRecentTravelHistory}", "${saveCovid19SSJSON.countryName}", "${saveCovid19SSJSON.airline}", "${saveCovid19SSJSON.seatNo}", "${saveCovid19SSJSON.dateTimeofArrivalPicker}", "${saveCovid19SSJSON.airportOfDeparture}", "${saveCovid19SSJSON.transit}", "${saveCovid19SSJSON.reasonOfVisit}", "${saveCovid19SSJSON.patientOccupation}", "${saveCovid19SSJSON.doesPatientSmoke}", "${saveCovid19SSJSON.returnDate}", "${saveCovid19SSJSON.reviewedBy}", "${saveCovid19SSJSON.reviewedOn}", "${saveCovid19SSJSON.approvedBy}", "${saveCovid19SSJSON.approvedOn}", "${saveCovid19SSJSON.isPatientPregnant}","${saveCovid19SSJSON.sampleDispatchedDate}")
  //        ON CONFLICT (unique_id)
  //       DO UPDATE
  //       SET (user_id,vlsm_country_id,remote_sample_code,locked,data_sync,sample_collection_date,asymptomatic,sample_code,last_modified_datetime,source_of_alert,province_id,province_name,district,facility_id,facility_name,implementing_partner,implementing_partner_name,funding_source,funding_source_name,lab_id,lab_name,patient_id,external_sample_code,patient_name,patient_surname,patient_dob,patient_age,patient_gender,patient_phone_number,patient_address,patient_province_id,patient_province,patient_district,patient_zone,patient_city,patient_nationality,patient_nationality_name,patient_passport_number,type_of_test_requested,reason_for_covid19_test,specimen_type,test_number,sample_received_at_vl_lab_datetime,sample_condition,lab_technician,lab_technician_name,is_sample_rejected,rejection_on,reason_for_sample_rejection,sample_rejection_id,result,tested_by,tested_by_name,is_result_authorised,authorized_by,authorized_on,request_created_datetime,is_synced, reason_for_changing, patientEmail,
  //         fever_temp, temperature_measurement_method, respiratory_rate, oxygen_saturation, number_of_days_sick, date_of_symptom_onset, date_of_initial_consultation, medical_history, recent_hospitalization, patient_lives_with_children, patient_cares_for_children, close_contacts, has_recent_travel_history, travel_country_names, flight_airline, flight_seat_no, flight_arrival_datetime, flight_airport_of_departure, flight_transit, reason_of_visit, patient_occupation, does_patient_smoke, travel_return_date,  result_reviewed_by, result_reviewed_datetime, result_approved_by, result_approved_datetime,is_patient_pregnant,sample_dispatched_datetime) = (EXCLUDED.user_id, EXCLUDED.vlsm_country_id, EXCLUDED.remote_sample, EXCLUDED.locked, EXCLUDED.data_sync, EXCLUDED.sample_collection_date, EXCLUDED.asymptomatic, EXCLUDED.sample_code,EXCLUDED.last_modified_datetime, EXCLUDED.source_of_alert, EXCLUDED.province_id, EXCLUDED.province_name,EXCLUDED.district, EXCLUDED.facility_id, EXCLUDED.facility_name, EXCLUDED.implementing_partner, EXCLUDED.implementing_partner_name, EXCLUDED.funding_source, EXCLUDED.funding_source_name, EXCLUDED.lab_id,EXCLUDED.lab_name, EXCLUDED.patient_id, EXCLUDED.external_sample_code, EXCLUDED.patient_name, EXCLUDED.patient_surname, EXCLUDED.patient_dob, EXCLUDED.patient_age, EXCLUDED.patient_gender, EXCLUDED.patient_phone_number, EXCLUDED.patient_address, EXCLUDED.patient_province_id, EXCLUDED.patient_province, EXCLUDED.patient_district,EXCLUDED.patient_zone, EXCLUDED.patient_city, EXCLUDED.patient_nationality, EXCLUDED.patient_nationality_name, EXCLUDED.patient_passport_number, EXCLUDED.type_of_test_requested, EXCLUDED.reason_for_covid19_test, EXCLUDED.specimen_type, EXCLUDED.test_number, EXCLUDED.sample_received_at_vl_lab_datetime, EXCLUDED.sample_condition, EXCLUDED.lab_technician,EXCLUDED.lab_technician_name, EXCLUDED.is_sample_rejected, EXCLUDED.rejection_on, EXCLUDED.reason_for_sample_rejection, EXCLUDED.sample_rejection_id, EXCLUDED.result, EXCLUDED.tested_by,EXCLUDED.tested_by_name, EXCLUDED.is_result_authorised, EXCLUDED.authorized_by, EXCLUDED.authorized_on, EXCLUDED.request_created_datetime,EXCLUDED.is_synced, EXCLUDED.reason_for_changing, EXCLUDED.patientEmail,
  //           EXCLUDED.fever_temp, EXCLUDED.temperature_measurement_method, EXCLUDED.respiratory_rate, EXCLUDED.oxygen_saturation, EXCLUDED.number_of_days_sick, EXCLUDED.date_of_symptom_onset, EXCLUDED.date_of_initial_consultation, EXCLUDED.medical_history, EXCLUDED.recent_hospitalization, EXCLUDED.patient_lives_with_children, EXCLUDED.patient_cares_for_children, EXCLUDED.close_contacts, EXCLUDED.has_recent_travel_history, EXCLUDED.travel_country_names, EXCLUDED.flight_airline, EXCLUDED.flight_seat_no, EXCLUDED.flight_arrival_datetime, EXCLUDED.flight_airport_of_departure, EXCLUDED.flight_transit, EXCLUDED.reason_of_visit, EXCLUDED.patient_occupation, EXCLUDED.does_patient_smoke, EXCLUDED.travel_return_date,  EXCLUDED.result_reviewed_by, EXCLUDED.result_reviewed_datetime, EXCLUDED.result_approved_by, EXCLUDED.result_approved_datetime, EXCLUDED.is_patient_pregnant, EXCLUDED.sample_dispatched_datetime)`,
  //             []).then(async (res) => {
  //             await this.lclstorage.set('lastappSampleCode',saveCovid19SSJSON.appSampleCode);

  //             this.storage.executeSql('SELECT * FROM form_covid19 where unique_id=?', [saveCovid19SSJSON.uniqueId,]).then((data) => {
  //                 this.results = [];
  //                 for (let i = 0; i < data.rows.length; i++) {
  //                   let item = data.rows.item(i);
  //                   this.results.push(item);
  //                 }
  //                 console.log(this.results, 'form_covid19 inserted record');
  //               }).catch((error) => {
  //                 console.error(error);
  //               });

  //             if (isAddOrUpdate == 'add') {
  //               this.id = res.insertId;
  //             } else if (isAddOrUpdate == 'update') {
  //               this.id = saveCovid19SSJSON.covid19_id;
  //               this.uniqueId = saveCovid19SSJSON.uniqueId;
  //               await this.storage.executeSql('DELETE FROM covid19_tests where unique_id =?',[saveCovid19SSJSON.uniqueId]);
  //               await this.storage.executeSql('DELETE FROM covid19_reasons_for_testing where covid19_id =?',[saveCovid19SSJSON.uniqueId]);
  //               await this.storage.executeSql('DELETE FROM covid19_patient_symptoms where covid19_id =?',[saveCovid19SSJSON.uniqueId]);
  //             }

  //             if (saveCovid19SSJSON.reasonDetails) {
  //               if (saveCovid19SSJSON.reasonDetails.length > 0) {
  //                 console.log(saveCovid19SSJSON.reasonDetails,'saveCovid19SSJSON.reasonDetails');
  //                 for (let i = 0;i < saveCovid19SSJSON.reasonDetails.length;i++) {
  //                   let covidTestitem = saveCovid19SSJSON.reasonDetails[i];
  //                   let id = i + 1;
  //                   this.storage.executeSql(`INSERT INTO covid19_reasons_for_testing (covid19_id,reasons_id,reasons_detected,reason_details) VALUES ("${this.uniqueId}","${id}","${covidTestitem.reason}","${covidTestitem.detail}")`,[]).then((result) => {
  //                       console.log(result, 'res in covid19_reasons_for_testing');
  //                       this.storage.executeSql('SELECT * FROM covid19_reasons_for_testing where covid19_id=?',[this.uniqueId,]).then((data) => {
  //                           let savedItem = [];
  //                           for (let i = 0; i < data.rows.length; i++) {
  //                             let item = data.rows.item(i);
  //                             savedItem.push(item);
  //                           }
  //                           console.log(savedItem, 'covid19_reasons_for_testing inserted record');
  //                         }).catch((error) => {
  //                           console.error(error);
  //                         });
  //                       console.log('if this.showSucessAlert(isAddOrUpdate);');
  //                     }).catch((error) => {
  //                       console.error(error,'error in covid19_reasons_for_testing');
  //                     });
  //                 }
  //               }
  //             }
  //             if (saveCovid19SSJSON.covid19PatientSymptomsArray) {
  //               if (saveCovid19SSJSON.covid19PatientSymptomsArray.length > 0) {
  //                 console.log(saveCovid19SSJSON.covid19PatientSymptomsArray, 'saveCovid19SSJSON.covid19PatientSymptomsArray');
  //                 for (let i = 0; i < saveCovid19SSJSON.covid19PatientSymptomsArray.length; i++) {
  //                   let covidTestitem = saveCovid19SSJSON.covid19PatientSymptomsArray[i];
  //                   this.storage.executeSql(`INSERT OR IGNORE INTO covid19_patient_symptoms (covid19_id,symptom_id,symptom_detected,symptom_details) VALUES ("${this.uniqueId}","${covidTestitem.id}","${covidTestitem.symptom}","${covidTestitem.detail}")`, []).then((result) => {
  //                     console.log(result, 'res in covid19_patient_symptoms');
  //                     this.storage.executeSql('SELECT * FROM covid19_patient_symptoms where covid19_id=?', [this.uniqueId,]).then((data) => {
  //                       let savedItem = [];
  //                       for (let i = 0; i < data.rows.length; i++) {
  //                         let item = data.rows.item(i);
  //                         savedItem.push(item);
  //                       }
  //                       console.log(savedItem, 'covid19_patient_symptoms inserted record');
  //                     }).catch((error) => {
  //                         console.error(error);
  //                       });
  //                     console.log('ifthis.showSucessAlert(isAddOrUpdate);');
  //                   }).catch((error) => {
  //                       console.error(error, 'error in covid19_patient_symptoms');
  //                     });
  //                 }
  //               }
  //             }
  //             if (saveCovid19SSJSON && Array.isArray(saveCovid19SSJSON.c19Tests) && saveCovid19SSJSON.c19Tests.length > 0) {
  //               for (let i = 0; i < saveCovid19SSJSON.c19Tests.length; i++) {
  //                 let covidTestitem = saveCovid19SSJSON.c19Tests[i];
  //                 this.storage.executeSql(`INSERT INTO covid19_tests (unique_id,covid19_id,facility_id,test_name,tested_by,sample_tested_datetime,testing_platform,result, kitLotNo, kitExpiryDate) VALUES ("${saveCovid19SSJSON.uniqueId}","${this.id}","${saveCovid19SSJSON.facilityId}","${covidTestitem.testName}","${saveCovid19SSJSON.testedBy}","${covidTestitem.testDate}","${covidTestitem.testingPlatform}","${covidTestitem.testResult}","${covidTestitem.kitLotNo}","${covidTestitem.kitExpiryDate}")`,[]).then((result) => {
  //                     console.log(result, 'res in Covid19_test');
  //                     this.showSucessAlert(isAddOrUpdate);
  //                   }).catch((error) => {
  //                     console.error(error, 'error in Covid19_test');
  //                   });
  //               }
  //             } else {
  //               this.showSucessAlert(isAddOrUpdate);
  //             }
  //             await this.getCovid19Records();
  //           }).catch((error) => {
  //             console.error(error);
  //           });
  //     });
  // }

  async insertCovid19Data(saveCovid19SSJSON: any, isAddOrUpdate: string) {
    try {
    
      
      const db = await this.sqlite.create({
        name: 'vlsm_mobile.db',
        location: 'default',
    });
      this.storage = db;
      await this.lclstorage.set('lastappSampleCode', saveCovid19SSJSON.appSampleCode);
      const reasonForChangingString = JSON.stringify(saveCovid19SSJSON.reasonForChanging).replace(/\\\"/g, '"'); 
          console.log(reasonForChangingString);
  
      
      const result = await this.storage.executeSql(`
        INSERT INTO form_covid19 (
          user_id, unique_id, vlsm_country_id, remote_sample_code, locked, data_sync,
          app_sample_code, sample_collection_date, asymptomatic, sample_code, last_modified_datetime,
          source_of_alert, province_id, province_name, district, facility_id, facility_name,
          implementing_partner, implementing_partner_name, funding_source, funding_source_name, lab_id,
          lab_name, patient_id, external_sample_code, patient_name, patient_surname, patient_dob,
          patient_age, patient_gender, patient_phone_number, patient_address, patient_province_id,
          patient_province, patient_district, patient_zone, patient_city, patient_nationality,
          patient_nationality_name, patient_passport_number, type_of_test_requested, reason_for_covid19_test,
          specimen_type, test_number, sample_received_at_vl_lab_datetime, sample_condition, lab_technician,
          lab_technician_name, is_sample_rejected, rejection_on, reason_for_sample_rejection, sample_rejection_id,
          result, tested_by, tested_by_name, is_result_authorised, authorized_by, authorized_on,
          request_created_datetime, is_synced, reason_for_changing, patientEmail, fever_temp,
          temperature_measurement_method, respiratory_rate, oxygen_saturation, number_of_days_sick,
          date_of_symptom_onset, date_of_initial_consultation, medical_history, recent_hospitalization,
          patient_lives_with_children, patient_cares_for_children, close_contacts, has_recent_travel_history,
          travel_country_names, flight_airline, flight_seat_no, flight_arrival_datetime, flight_airport_of_departure,
          flight_transit, reason_of_visit, patient_occupation, does_patient_smoke, travel_return_date,
          result_reviewed_by, result_reviewed_datetime, result_approved_by, result_approved_datetime,
          is_patient_pregnant, sample_dispatched_datetime
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
         ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT (unique_id) DO UPDATE SET
          user_id = EXCLUDED.user_id, vlsm_country_id = EXCLUDED.vlsm_country_id, remote_sample_code = EXCLUDED.remote_sample_code,
          locked = EXCLUDED.locked, data_sync = EXCLUDED.data_sync, app_sample_code = EXCLUDED.app_sample_code,
          sample_collection_date = EXCLUDED.sample_collection_date, asymptomatic = EXCLUDED.asymptomatic,
          sample_code = EXCLUDED.sample_code, last_modified_datetime = EXCLUDED.last_modified_datetime,
          source_of_alert = EXCLUDED.source_of_alert, province_id = EXCLUDED.province_id, province_name = EXCLUDED.province_name,
          district = EXCLUDED.district, facility_id = EXCLUDED.facility_id, facility_name = EXCLUDED.facility_name,
          implementing_partner = EXCLUDED.implementing_partner, implementing_partner_name = EXCLUDED.implementing_partner_name,
          funding_source = EXCLUDED.funding_source, funding_source_name = EXCLUDED.funding_source_name, lab_id = EXCLUDED.lab_id,
          lab_name = EXCLUDED.lab_name, patient_id = EXCLUDED.patient_id, external_sample_code = EXCLUDED.external_sample_code,
          patient_name = EXCLUDED.patient_name, patient_surname = EXCLUDED.patient_surname, patient_dob = EXCLUDED.patient_dob,
          patient_age = EXCLUDED.patient_age, patient_gender = EXCLUDED.patient_gender, patient_phone_number = EXCLUDED.patient_phone_number,
          patient_address = EXCLUDED.patient_address, patient_province_id = EXCLUDED.patient_province_id,
          patient_province = EXCLUDED.patient_province, patient_district = EXCLUDED.patient_district, patient_zone = EXCLUDED.patient_zone,
          patient_city = EXCLUDED.patient_city, patient_nationality = EXCLUDED.patient_nationality,
          patient_nationality_name = EXCLUDED.patient_nationality_name, patient_passport_number = EXCLUDED.patient_passport_number,
          type_of_test_requested = EXCLUDED.type_of_test_requested, reason_for_covid19_test = EXCLUDED.reason_for_covid19_test,
          specimen_type = EXCLUDED.specimen_type, test_number = EXCLUDED.test_number, sample_received_at_vl_lab_datetime = EXCLUDED.sample_received_at_vl_lab_datetime,
          sample_condition = EXCLUDED.sample_condition, lab_technician = EXCLUDED.lab_technician, lab_technician_name = EXCLUDED.lab_technician_name,
          is_sample_rejected = EXCLUDED.is_sample_rejected, rejection_on = EXCLUDED.rejection_on, reason_for_sample_rejection = EXCLUDED.reason_for_sample_rejection,
          sample_rejection_id = EXCLUDED.sample_rejection_id, result = EXCLUDED.result, tested_by = EXCLUDED.tested_by,
          tested_by_name = EXCLUDED.tested_by_name, is_result_authorised = EXCLUDED.is_result_authorised, authorized_by = EXCLUDED.authorized_by,
          authorized_on = EXCLUDED.authorized_on, request_created_datetime = EXCLUDED.request_created_datetime, is_synced = EXCLUDED.is_synced,
          reason_for_changing = EXCLUDED.reason_for_changing, patientEmail = EXCLUDED.patientEmail, fever_temp = EXCLUDED.fever_temp,
          temperature_measurement_method = EXCLUDED.temperature_measurement_method, respiratory_rate = EXCLUDED.respiratory_rate,
          oxygen_saturation = EXCLUDED.oxygen_saturation, number_of_days_sick = EXCLUDED.number_of_days_sick, date_of_symptom_onset = EXCLUDED.date_of_symptom_onset,
          date_of_initial_consultation = EXCLUDED.date_of_initial_consultation, medical_history = EXCLUDED.medical_history,
          recent_hospitalization = EXCLUDED.recent_hospitalization, patient_lives_with_children = EXCLUDED.patient_lives_with_children,
          patient_cares_for_children = EXCLUDED.patient_cares_for_children, close_contacts = EXCLUDED.close_contacts,
          has_recent_travel_history = EXCLUDED.has_recent_travel_history, travel_country_names = EXCLUDED.travel_country_names,
          flight_airline = EXCLUDED.flight_airline, flight_seat_no = EXCLUDED.flight_seat_no, flight_arrival_datetime = EXCLUDED.flight_arrival_datetime,
          flight_airport_of_departure = EXCLUDED.flight_airport_of_departure, flight_transit = EXCLUDED.flight_transit,
          reason_of_visit = EXCLUDED.reason_of_visit, patient_occupation = EXCLUDED.patient_occupation, does_patient_smoke = EXCLUDED.does_patient_smoke,
          travel_return_date = EXCLUDED.travel_return_date, result_reviewed_by = EXCLUDED.result_reviewed_by, result_reviewed_datetime = EXCLUDED.result_reviewed_datetime,
          result_approved_by = EXCLUDED.result_approved_by, result_approved_datetime = EXCLUDED.result_approved_datetime,
          is_patient_pregnant = EXCLUDED.is_patient_pregnant, sample_dispatched_datetime = EXCLUDED.sample_dispatched_datetime
      `, [
        saveCovid19SSJSON.user_id, saveCovid19SSJSON.uniqueId, saveCovid19SSJSON.formId, saveCovid19SSJSON.remoteSampleCode, 
        "no", 0, saveCovid19SSJSON.appSampleCode, saveCovid19SSJSON.sampleCollectionDate, saveCovid19SSJSON.asymptomatic,
        saveCovid19SSJSON.sampleCode, saveCovid19SSJSON.updatedOn, saveCovid19SSJSON.sourceOfAlertPOE, saveCovid19SSJSON.provinceId,
        saveCovid19SSJSON.provinceName, saveCovid19SSJSON.district, saveCovid19SSJSON.facilityId, saveCovid19SSJSON.facilityName,
        saveCovid19SSJSON.implementingPartner, saveCovid19SSJSON.implementingPartnerName, saveCovid19SSJSON.fundingSource,
        saveCovid19SSJSON.fundingSourceName, saveCovid19SSJSON.labId, saveCovid19SSJSON.labName, saveCovid19SSJSON.patientId,
        saveCovid19SSJSON.externalSampleCode, saveCovid19SSJSON.firstName, saveCovid19SSJSON.lastName, saveCovid19SSJSON.patientDob,
        saveCovid19SSJSON.patientAge, saveCovid19SSJSON.patientGender, saveCovid19SSJSON.patientPhoneNumber, saveCovid19SSJSON.patientAddress,
        saveCovid19SSJSON.patientProvinceId, saveCovid19SSJSON.patientProvince, saveCovid19SSJSON.patientDistrict, saveCovid19SSJSON.patientZone,
        saveCovid19SSJSON.patientCity, saveCovid19SSJSON.patientNationality, saveCovid19SSJSON.patientNationalityName,
        saveCovid19SSJSON.patientPassportNumber, saveCovid19SSJSON.testTypeRequested, saveCovid19SSJSON.reasonForCovid19Test,
        saveCovid19SSJSON.specimenType, saveCovid19SSJSON.testNumber, saveCovid19SSJSON.sampleReceivedDate, saveCovid19SSJSON.sampleCondition,
        saveCovid19SSJSON.labTechnician, saveCovid19SSJSON.labTechnicianName, saveCovid19SSJSON.isSampleRejected,
        saveCovid19SSJSON.rejectionDate, saveCovid19SSJSON.rejectionReason, saveCovid19SSJSON.rejectionReasonid, saveCovid19SSJSON.testResult,
        saveCovid19SSJSON.testedBy, saveCovid19SSJSON.testedByName, saveCovid19SSJSON.isResultAuthorized, saveCovid19SSJSON.authorizedBy,
        saveCovid19SSJSON.authorizedOn, saveCovid19SSJSON.requestCreatedDatetime, saveCovid19SSJSON.isSynced, reasonForChangingString,
        saveCovid19SSJSON.patientEmail, saveCovid19SSJSON.feverTemp, saveCovid19SSJSON.temperatureMeasurementMethod, saveCovid19SSJSON.respiratoryRate,
        saveCovid19SSJSON.oxygenSaturation, saveCovid19SSJSON.numberOfDaysSick, saveCovid19SSJSON.dateOfSymptomOnset,
        saveCovid19SSJSON.dateOfInitialConsultation, saveCovid19SSJSON.medicalBackground, saveCovid19SSJSON.recentHospitalization,
        saveCovid19SSJSON.patientLivesWithChildren, saveCovid19SSJSON.patientCaresForChildren, saveCovid19SSJSON.closeContacts,
        saveCovid19SSJSON.hasRecentTravelHistory, saveCovid19SSJSON.countryName, saveCovid19SSJSON.airline, saveCovid19SSJSON.seatNo,
        saveCovid19SSJSON.dateTimeofArrivalPicker, saveCovid19SSJSON.airportOfDeparture, saveCovid19SSJSON.transit, saveCovid19SSJSON.reasonOfVisit,
        saveCovid19SSJSON.patientOccupation, saveCovid19SSJSON.doesPatientSmoke, saveCovid19SSJSON.returnDate,
        saveCovid19SSJSON.reviewedBy, saveCovid19SSJSON.reviewedOn, saveCovid19SSJSON.approvedBy, saveCovid19SSJSON.approvedOn,
        saveCovid19SSJSON.isPatientPregnant, saveCovid19SSJSON.sampleDispatchedDate
      ]);
  
      // Fetch the inserted or updated record
      const data = await this.storage.executeSql('SELECT * FROM form_covid19 WHERE unique_id = ?', [saveCovid19SSJSON.uniqueId]);
      this.results = [];
      for (let i = 0; i < data.rows.length; i++) {
        this.results.push(data.rows.item(i));
      }
      console.log(this.results, 'form_covid19 inserted record');
  
      if (isAddOrUpdate === 'add') {
        this.id = result.insertId;
      } else if (isAddOrUpdate === 'update') {
        this.id = saveCovid19SSJSON.covid19_id;
        await Promise.all([
          this.storage.executeSql('DELETE FROM covid19_tests WHERE unique_id = ?', [saveCovid19SSJSON.uniqueId]),
          this.storage.executeSql('DELETE FROM covid19_reasons_for_testing WHERE covid19_id = ?', [saveCovid19SSJSON.covid19_id]),
          this.storage.executeSql('DELETE FROM covid19_patient_symptoms WHERE covid19_id = ?', [saveCovid19SSJSON.covid19_id])
        ]);
      }
  
      if (saveCovid19SSJSON.reasonDetails && saveCovid19SSJSON.reasonDetails.length > 0) {
        for (const covidTestitem of saveCovid19SSJSON.reasonDetails) {
          await this.storage.executeSql(
            `INSERT INTO covid19_reasons_for_testing (covid19_id, reasons_id, reasons_detected, reason_details) VALUES (?, ?, ?, ?)`,
            [this.id, covidTestitem.id, covidTestitem.reason, covidTestitem.detail]
          );
          const reasonData = await this.storage.executeSql('SELECT * FROM covid19_reasons_for_testing WHERE covid19_id = ?', [this.id]);
          const savedItem = [];
          for (let i = 0; i < reasonData.rows.length; i++) {
            savedItem.push(reasonData.rows.item(i));
          }
          console.log(savedItem, 'covid19_reasons_for_testing inserted record');
        }
      }
  
      if (saveCovid19SSJSON.covid19PatientSymptomsArray && saveCovid19SSJSON.covid19PatientSymptomsArray.length > 0) {
        for (const covidTestitem of saveCovid19SSJSON.covid19PatientSymptomsArray) {
          await this.storage.executeSql(
            `INSERT OR IGNORE INTO covid19_patient_symptoms (covid19_id, symptom_id, symptom_detected, symptom_details) VALUES (?, ?, ?, ?)`,
            [this.id, covidTestitem.id, covidTestitem.symptom, covidTestitem.detail]
          );
          const symptomData = await this.storage.executeSql('SELECT * FROM covid19_patient_symptoms WHERE covid19_id = ?', [this.id]);
          const savedItem = [];
          for (let i = 0; i < symptomData.rows.length; i++) {
            savedItem.push(symptomData.rows.item(i));
          }
          console.log(savedItem, 'covid19_patient_symptoms inserted record');
        }
      }
  
      if (saveCovid19SSJSON.c19Tests && saveCovid19SSJSON.c19Tests.length > 0) {
        for (const covidTestitem of saveCovid19SSJSON.c19Tests) {
          await this.storage.executeSql(
            `INSERT INTO covid19_tests (unique_id, covid19_id, facility_id, test_name, tested_by, sample_tested_datetime, testing_platform, result, kitLotNo, kitExpiryDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [saveCovid19SSJSON.uniqueId, this.id, saveCovid19SSJSON.facilityId, covidTestitem.testName, saveCovid19SSJSON.testedBy, covidTestitem.testDate, covidTestitem.testingPlatform, covidTestitem.testResult, covidTestitem.kitLotNo, covidTestitem.kitExpiryDate]
          );
          console.log('Covid19_test inserted record');
        }
      }
  
      this.showSucessAlert(isAddOrUpdate);
      await this.getCovid19Records();
    } catch (error) {
      console.error('Error inserting or updating Covid19 data:', error);
    }
  }



  async getCovid19Records() {
    try {
      const db: SQLiteObject = await this.sqlite.create({
        name: 'vlsm_mobile.db',
        location: 'default',
      });
      const data = await db.executeSql('SELECT * FROM form_covid19', []);
      this.results = [];
      for (let i = 0; i < data.rows.length; i++) {
        let item = data.rows.item(i);
        this.results.push(item);
      }
      console.log('Results:', this.results); // Log the results array
    } catch (error) {
      console.error('Error retrieving data from SQLite database:', error);
    }
  }
  







  
  // insertEidData(saveEidSSJSON, isAddOrUpdate) {
  //   console.log(saveEidSSJSON, isAddOrUpdate, 'insertEidData');
  //   this.sqlite.create({
  //       name: 'vlsm_mobile.db',
  //       location: 'default',
  //     }).then((db: SQLiteObject) => {
  //       this.storage = db;
  //       return this.storage
  //         .executeSql(
  //           `INSERT INTO eid_form (user_id,unique_id,vlsm_country_id,remote_sample,locked,data_sync,app_sample_code,remote_sample_code,sample_collection_date,sample_code,sample_code_key,last_modified_datetime,province_id,province_name,district,facility_district_id,facility_name,facility_id,implementing_partner,funding_source,lab_id,child_id,child_name,child_surname,child_dob,child_age,child_gender,caretaker_phone_number,caretaker_address,specimen_type,sample_received_at_vl_lab_datetime,is_sample_rejected,reason_for_sample_rejection,sample_rejection_id, result,tested_by,result_approved_by,result_approved_datetime,request_created_datetime,is_synced,rapid_test_performed,mother_hiv_status,mother_id,mother_treatment,rapid_test_result,has_infant_stopped_breastfeeding,age_breastfeeding_stopped_in_months,pcr_test_performed_before,previous_pcr_result,last_pcr_date,reason_for_pcr,sample_requestor_name,sample_requestor_phone,eid_test_platform,import_machine_name,sample_tested_datetime,rapid_test_date, rejection_on, reason_for_changing,child_treatment,choice_of_feeding,is_cotrimoxazole_being_administered_to_the_infant,mother_treatment_other,mother_vl_result,mother_cd4,mother_dob,mother_marital_status,mother_name,result_reviewed_by,result_reviewed_datetime) VALUES ("${saveEidSSJSON.user_id}","${saveEidSSJSON.uniqueId}","${saveEidSSJSON.formId}","no","no",0, "${saveEidSSJSON.appSampleCode}","${saveEidSSJSON.remoteSampleCode}","${saveEidSSJSON.sampleCollectionDate}","${saveEidSSJSON.sampleCode}","${saveEidSSJSON.sampleCode}","${saveEidSSJSON.updatedOn}","${saveEidSSJSON.provinceId}","${saveEidSSJSON.provinceName}","${saveEidSSJSON.district}","${saveEidSSJSON.districtId}","${saveEidSSJSON.facilityName}","${saveEidSSJSON.facilityId}","${saveEidSSJSON.implementingPartner}","${saveEidSSJSON.fundingSource}","${saveEidSSJSON.labId}","${saveEidSSJSON.child_id}","${saveEidSSJSON.firstName}","${saveEidSSJSON.lastName}","${saveEidSSJSON.child_Dob}","${saveEidSSJSON.child_Age}","${saveEidSSJSON.child_Gender}","${saveEidSSJSON.caretakerPhoneNumber}","${saveEidSSJSON.caretakerAddress}","${saveEidSSJSON.specimenType}","${saveEidSSJSON.sampleReceivedDate}","${saveEidSSJSON.isSampleRejected}","${saveEidSSJSON.rejectionReason}","${saveEidSSJSON.rejectionReasonid}","${saveEidSSJSON.testResult}","${saveEidSSJSON.testedBy}","${saveEidSSJSON.approvedBy}","${saveEidSSJSON.approvedOn}","${saveEidSSJSON.createdOn}","${saveEidSSJSON.isSynced}","${saveEidSSJSON.infantRapidHIVTest}","${saveEidSSJSON.mothersHIVStatus}","${saveEidSSJSON.motherArtNumber}","${saveEidSSJSON.motherTreatment}","${saveEidSSJSON.rapidTestResult}","${saveEidSSJSON.infantBreastfeeding}","${saveEidSSJSON.ageBfeedingStopped}","${saveEidSSJSON.pcrTest}","${saveEidSSJSON.previousPcrResult}","${saveEidSSJSON.previousTestDate}","${saveEidSSJSON.reasonPcr2Test}","${saveEidSSJSON.requestingOfficer}","${saveEidSSJSON.requestingOfficerPhone}","${saveEidSSJSON.testPlatform}","${saveEidSSJSON.machineUsed}","${saveEidSSJSON.sampleTestDate}" ,"${saveEidSSJSON.testDate}","${saveEidSSJSON.rejectionDate}","${saveEidSSJSON.reasonForChanging}","${saveEidSSJSON.childTreatment}","${saveEidSSJSON.choiceOfFeeding}","${saveEidSSJSON.isCotrimoxazoleBeingAdministered}","${saveEidSSJSON.motherTreatmentOther}","${saveEidSSJSON.motherViralLoad}","${saveEidSSJSON.mothercd4}","${saveEidSSJSON.mothersDob}","${saveEidSSJSON.mothersMaritalStatus}","${saveEidSSJSON.mothersName}","${saveEidSSJSON.reviewedBy}","${saveEidSSJSON.reviewedOn}")
  //   ON CONFLICT (unique_id)
  //   DO UPDATE
  //   SET (user_id,vlsm_country_id,remote_sample_code,remote_sample,locked,data_sync,app_sample_code,sample_collection_date,sample_code,sample_code_key,last_modified_datetime,province_id,province_name,district,facility_district_id,facility_name,facility_id,implementing_partner,funding_source,lab_id,child_id,child_name,child_surname,child_dob,child_age,child_gender,caretaker_phone_number,caretaker_address,specimen_type,sample_received_at_vl_lab_datetime,is_sample_rejected,reason_for_sample_rejection,sample_rejection_id, result,tested_by,result_approved_by,result_approved_datetime,request_created_datetime,is_synced,rapid_test_performed,mother_hiv_status,mother_id,mother_treatment,rapid_test_result,has_infant_stopped_breastfeeding,age_breastfeeding_stopped_in_months,pcr_test_performed_before,previous_pcr_result,last_pcr_date,reason_for_pcr,sample_requestor_name,sample_requestor_phone,eid_test_platform,import_machine_name,sample_tested_datetime,rapid_test_date, rejection_on, reason_for_changing,child_treatment,choice_of_feeding,is_cotrimoxazole_being_administered_to_the_infant,mother_treatment_other,mother_vl_result,mother_cd4,mother_dob,mother_marital_status,mother_name,result_reviewed_by,result_reviewed_datetime) = (EXCLUDED.user_id, EXCLUDED.vlsm_country_id, EXCLUDED.remote_sample_code,EXCLUDED.remote_sample, EXCLUDED.locked, EXCLUDED.data_sync, EXCLUDED.app_sample_code, EXCLUDED.sample_collection_date, EXCLUDED.sample_code, EXCLUDED.sample_code_key, EXCLUDED.last_modified_datetime, EXCLUDED.province_id,EXCLUDED.province_name, EXCLUDED.district, EXCLUDED.facility_district_id,EXCLUDED.facility_name,EXCLUDED.facility_id, EXCLUDED.implementing_partner, EXCLUDED.funding_source, EXCLUDED.lab_id, EXCLUDED.child_id, EXCLUDED.child_name, EXCLUDED.child_surname, EXCLUDED.child_dob, EXCLUDED.child_age, EXCLUDED.child_gender, EXCLUDED.caretaker_phone_number, EXCLUDED.caretaker_address, EXCLUDED.specimen_type, EXCLUDED.sample_received_at_vl_lab_datetime, EXCLUDED.is_sample_rejected, EXCLUDED.reason_for_sample_rejection, EXCLUDED.sample_rejection_id, EXCLUDED.result, EXCLUDED.tested_by, EXCLUDED.result_approved_by, EXCLUDED.result_approved_datetime, EXCLUDED.request_created_datetime, EXCLUDED.is_synced, EXCLUDED.rapid_test_performed, EXCLUDED.mother_hiv_status, EXCLUDED.mother_id, EXCLUDED.mother_treatment, EXCLUDED.rapid_test_result, EXCLUDED.has_infant_stopped_breastfeeding, EXCLUDED.age_breastfeeding_stopped_in_months, EXCLUDED.pcr_test_performed_before, EXCLUDED.previous_pcr_result, EXCLUDED.last_pcr_date, EXCLUDED.reason_for_pcr, EXCLUDED.sample_requestor_name, EXCLUDED.sample_requestor_phone, EXCLUDED.eid_test_platform, EXCLUDED.import_machine_name, EXCLUDED.sample_tested_datetime, EXCLUDED.rapid_test_date, EXCLUDED.rejection_on, EXCLUDED.reason_for_changing, EXCLUDED.child_treatment,EXCLUDED.choice_of_feeding, EXCLUDED.is_cotrimoxazole_being_administered_to_the_infant, EXCLUDED.mother_treatment_other, EXCLUDED.mother_vl_result, EXCLUDED.mother_cd4, EXCLUDED.mother_dob, EXCLUDED.mother_marital_status, EXCLUDED.mother_name, EXCLUDED.result_reviewed_by, EXCLUDED.result_reviewed_datetime)`,
  //           []
  //         )
  //         .then(async (res) => {
  //           if (isAddOrUpdate == 'add') {
  //             await this.lclstorage.set('lastLocalTestEidID',saveEidSSJSON.appSampleCode);
  //           }
  //           this.showSucessAlert(isAddOrUpdate);
  //           await this.getEidRecords();
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     });
  // }
  
  insertEidData(saveEidSSJSON, isAddOrUpdate) {
    console.log(saveEidSSJSON, isAddOrUpdate, 'insertEidData');
    this.sqlite
      .create({
        name: 'vlsm_mobile.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.storage = db;
        const reasonForChangingString = JSON.stringify(saveEidSSJSON.reasonForChanging).replace(/\\\"/g, '"'); 
        console.log(reasonForChangingString);
  
        let insertSQL = `
          INSERT INTO eid_form (
            user_id, unique_id, vlsm_country_id, remote_sample, locked, data_sync, app_sample_code, remote_sample_code,
            sample_collection_date, sample_code, sample_code_key, last_modified_datetime, province_id, province_name,
            district, facility_district_id, facility_name, facility_id, implementing_partner, funding_source, lab_id,
            child_id, child_name, child_surname, child_dob, child_age, child_gender, caretaker_phone_number, caretaker_address,
            specimen_type, sample_received_at_vl_lab_datetime, is_sample_rejected, reason_for_sample_rejection,
            sample_rejection_id, result, tested_by, result_approved_by, result_approved_datetime, request_created_datetime,
            is_synced, rapid_test_performed, mother_hiv_status, mother_id, mother_treatment, rapid_test_result,
            has_infant_stopped_breastfeeding, age_breastfeeding_stopped_in_months, pcr_test_performed_before,
            previous_pcr_result, last_pcr_date, reason_for_pcr, sample_requestor_name, sample_requestor_phone,
            eid_test_platform, import_machine_name, sample_tested_datetime, rapid_test_date, rejection_on,
            reason_for_changing, child_treatment, choice_of_feeding, is_cotrimoxazole_being_administered_to_the_infant,
            mother_treatment_other, mother_vl_result, mother_cd4, mother_dob, mother_marital_status, mother_name,
            result_reviewed_by, result_reviewed_datetime
          ) VALUES (
            ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,
            ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
          )
          ON CONFLICT (app_sample_code) DO UPDATE SET
            user_id = EXCLUDED.user_id, vlsm_country_id = EXCLUDED.vlsm_country_id,
            remote_sample_code = EXCLUDED.remote_sample_code, remote_sample = EXCLUDED.remote_sample,
            locked = EXCLUDED.locked, data_sync = EXCLUDED.data_sync, app_sample_code = EXCLUDED.app_sample_code,
            sample_collection_date = EXCLUDED.sample_collection_date, sample_code = EXCLUDED.sample_code,
            sample_code_key = EXCLUDED.sample_code_key, last_modified_datetime = EXCLUDED.last_modified_datetime,
            province_id = EXCLUDED.province_id, province_name = EXCLUDED.province_name, district = EXCLUDED.district,
            facility_district_id = EXCLUDED.facility_district_id, facility_name = EXCLUDED.facility_name,
            facility_id = EXCLUDED.facility_id, implementing_partner = EXCLUDED.implementing_partner,
            funding_source = EXCLUDED.funding_source, lab_id = EXCLUDED.lab_id, child_id = EXCLUDED.child_id,
            child_name = EXCLUDED.child_name, child_surname = EXCLUDED.child_surname, child_dob = EXCLUDED.child_dob,
            child_age = EXCLUDED.child_age, child_gender = EXCLUDED.child_gender,
            caretaker_phone_number = EXCLUDED.caretaker_phone_number, caretaker_address = EXCLUDED.caretaker_address,
            specimen_type = EXCLUDED.specimen_type, sample_received_at_vl_lab_datetime = EXCLUDED.sample_received_at_vl_lab_datetime,
            is_sample_rejected = EXCLUDED.is_sample_rejected, reason_for_sample_rejection = EXCLUDED.reason_for_sample_rejection,
            sample_rejection_id = EXCLUDED.sample_rejection_id, result = EXCLUDED.result, tested_by = EXCLUDED.tested_by,
            result_approved_by = EXCLUDED.result_approved_by, result_approved_datetime = EXCLUDED.result_approved_datetime,
            request_created_datetime = EXCLUDED.request_created_datetime, is_synced = EXCLUDED.is_synced,
            rapid_test_performed = EXCLUDED.rapid_test_performed, mother_hiv_status = EXCLUDED.mother_hiv_status,
            mother_id = EXCLUDED.mother_id, mother_treatment = EXCLUDED.mother_treatment,
            rapid_test_result = EXCLUDED.rapid_test_result, has_infant_stopped_breastfeeding = EXCLUDED.has_infant_stopped_breastfeeding,
            age_breastfeeding_stopped_in_months = EXCLUDED.age_breastfeeding_stopped_in_months,
            pcr_test_performed_before = EXCLUDED.pcr_test_performed_before, previous_pcr_result = EXCLUDED.previous_pcr_result,
            last_pcr_date = EXCLUDED.last_pcr_date, reason_for_pcr = EXCLUDED.reason_for_pcr,
            sample_requestor_name = EXCLUDED.sample_requestor_name, sample_requestor_phone = EXCLUDED.sample_requestor_phone,
            eid_test_platform = EXCLUDED.eid_test_platform, import_machine_name = EXCLUDED.import_machine_name,
            sample_tested_datetime = EXCLUDED.sample_tested_datetime, rapid_test_date = EXCLUDED.rapid_test_date,
            rejection_on = EXCLUDED.rejection_on, reason_for_changing = EXCLUDED.reason_for_changing,
            child_treatment = EXCLUDED.child_treatment, choice_of_feeding = EXCLUDED.choice_of_feeding,
            is_cotrimoxazole_being_administered_to_the_infant = EXCLUDED.is_cotrimoxazole_being_administered_to_the_infant,
            mother_treatment_other = EXCLUDED.mother_treatment_other, mother_vl_result = EXCLUDED.mother_vl_result,
            mother_cd4 = EXCLUDED.mother_cd4, mother_dob = EXCLUDED.mother_dob,
            mother_marital_status = EXCLUDED.mother_marital_status, mother_name = EXCLUDED.mother_name,
            result_reviewed_by = EXCLUDED.result_reviewed_by, result_reviewed_datetime = EXCLUDED.result_reviewed_datetime
        `;
  
        let updateSQL = `
          UPDATE eid_form SET
            user_id = ?, vlsm_country_id = ?, remote_sample_code = ?, remote_sample = ?, locked = ?, data_sync = ?,
            sample_collection_date = ?, sample_code = ?, sample_code_key = ?, last_modified_datetime = ?,
            province_id = ?, province_name = ?, district = ?, facility_district_id = ?, facility_name = ?,
            facility_id = ?, implementing_partner = ?, funding_source = ?, lab_id = ?, child_id = ?, child_name = ?,
            child_surname = ?, child_dob = ?, child_age = ?, child_gender = ?, caretaker_phone_number = ?,
            caretaker_address = ?, specimen_type = ?, sample_received_at_vl_lab_datetime = ?, is_sample_rejected = ?,
            reason_for_sample_rejection = ?, sample_rejection_id = ?, result = ?, tested_by = ?, result_approved_by = ?,
            result_approved_datetime = ?, request_created_datetime = ?, is_synced = ?, rapid_test_performed = ?,
            mother_hiv_status = ?, mother_id = ?, mother_treatment = ?, rapid_test_result = ?,
            has_infant_stopped_breastfeeding = ?, age_breastfeeding_stopped_in_months = ?,
            pcr_test_performed_before = ?, previous_pcr_result = ?, last_pcr_date = ?, reason_for_pcr = ?,
            sample_requestor_name = ?, sample_requestor_phone = ?, eid_test_platform = ?, import_machine_name = ?,
            sample_tested_datetime = ?, rapid_test_date = ?, rejection_on = ?, reason_for_changing = ?,
            child_treatment = ?, choice_of_feeding = ?, is_cotrimoxazole_being_administered_to_the_infant = ?,
            mother_treatment_other = ?, mother_vl_result = ?, mother_cd4 = ?, mother_dob = ?, mother_marital_status = ?,
            mother_name = ?, result_reviewed_by = ?, result_reviewed_datetime = ?
          WHERE app_sample_code = ?
        `;
  
        let insertValues = [
          saveEidSSJSON.user_id, saveEidSSJSON.uniqueId, saveEidSSJSON.formId, 'no', 'no', 0,
          saveEidSSJSON.appSampleCode, saveEidSSJSON.remoteSampleCode, saveEidSSJSON.sampleCollectionDate,
          saveEidSSJSON.sampleCode, saveEidSSJSON.sampleCode, saveEidSSJSON.updatedOn, saveEidSSJSON.provinceId,
          saveEidSSJSON.provinceName, saveEidSSJSON.district, saveEidSSJSON.districtId, saveEidSSJSON.facilityName,
          saveEidSSJSON.facilityId, saveEidSSJSON.implementingPartner, saveEidSSJSON.fundingSource, saveEidSSJSON.labId,
          saveEidSSJSON.child_id, saveEidSSJSON.firstName, saveEidSSJSON.lastName, saveEidSSJSON.child_Dob,
          saveEidSSJSON.childAge, saveEidSSJSON.child_Gender, saveEidSSJSON.caretakerPhoneNumber,
          saveEidSSJSON.caretakerAddress, saveEidSSJSON.specimenType, saveEidSSJSON.sampleReceivedDate,
          saveEidSSJSON.isSampleRejected, saveEidSSJSON.rejectionReason, saveEidSSJSON.rejectionReasonid,
          saveEidSSJSON.testResult, saveEidSSJSON.testedBy, saveEidSSJSON.approvedBy, saveEidSSJSON.approvedOn,
          saveEidSSJSON.createdOn, saveEidSSJSON.isSynced, saveEidSSJSON.infantRapidHIVTest, saveEidSSJSON.mothersHIVStatus,
          saveEidSSJSON.motherArtNumber, saveEidSSJSON.motherTreatment, saveEidSSJSON.rapidTestResult,
          saveEidSSJSON.infantBreastfeeding, saveEidSSJSON.ageBfeedingStopped, saveEidSSJSON.pcrTest,
          saveEidSSJSON.previousPcrResult, saveEidSSJSON.previousTestDate, saveEidSSJSON.reasonPcr2Test,
          saveEidSSJSON.requestingOfficer, saveEidSSJSON.requestingOfficerPhone, saveEidSSJSON.testPlatform,
          saveEidSSJSON.machineUsed, saveEidSSJSON.sampleTestDate, saveEidSSJSON.testDate, saveEidSSJSON.rejectionDate,
          reasonForChangingString, saveEidSSJSON.childTreatment, saveEidSSJSON.choiceOfFeeding,
          saveEidSSJSON.isCotrimoxazoleBeingAdministered, saveEidSSJSON.motherTreatmentOther, saveEidSSJSON.motherViralLoad,
          saveEidSSJSON.mothercd4, saveEidSSJSON.mothersDob, saveEidSSJSON.mothersMaritalStatus,
          saveEidSSJSON.mothersName, saveEidSSJSON.reviewedBy, saveEidSSJSON.reviewedOn
        ];
  
        let updateValues = [
          saveEidSSJSON.user_id, saveEidSSJSON.uniqueId, saveEidSSJSON.formId, 'no', 'no', 0,
          saveEidSSJSON.sampleCollectionDate, saveEidSSJSON.appSampleCode, saveEidSSJSON.sampleCode,
          saveEidSSJSON.updatedOn, saveEidSSJSON.provinceId, saveEidSSJSON.provinceName, saveEidSSJSON.district,
          saveEidSSJSON.districtId, saveEidSSJSON.facilityName, saveEidSSJSON.facilityId, saveEidSSJSON.implementingPartner,
          saveEidSSJSON.fundingSource, saveEidSSJSON.labId, saveEidSSJSON.child_id, saveEidSSJSON.firstName,
          saveEidSSJSON.lastName, saveEidSSJSON.child_Dob, saveEidSSJSON.childAge, saveEidSSJSON.child_Gender,
          saveEidSSJSON.caretakerPhoneNumber, saveEidSSJSON.caretakerAddress, saveEidSSJSON.specimenType,
          saveEidSSJSON.sampleReceivedDate, saveEidSSJSON.isSampleRejected, saveEidSSJSON.rejectionReason,
          saveEidSSJSON.rejectionReasonid, saveEidSSJSON.testResult, saveEidSSJSON.testedBy, saveEidSSJSON.approvedBy,
          saveEidSSJSON.approvedOn, saveEidSSJSON.createdOn, saveEidSSJSON.isSynced, saveEidSSJSON.infantRapidHIVTest,
          saveEidSSJSON.mothersHIVStatus, saveEidSSJSON.motherArtNumber, saveEidSSJSON.motherTreatment,
          saveEidSSJSON.rapidTestResult, saveEidSSJSON.infantBreastfeeding, saveEidSSJSON.ageBfeedingStopped,
          saveEidSSJSON.pcrTest, saveEidSSJSON.previousPcrResult, saveEidSSJSON.previousTestDate,
          saveEidSSJSON.reasonPcr2Test, saveEidSSJSON.requestingOfficer, saveEidSSJSON.requestingOfficerPhone,
          saveEidSSJSON.testPlatform, saveEidSSJSON.machineUsed, saveEidSSJSON.sampleTestDate, saveEidSSJSON.testDate,
          saveEidSSJSON.rejectionDate, reasonForChangingString, saveEidSSJSON.childTreatment, saveEidSSJSON.choiceOfFeeding,
          saveEidSSJSON.isCotrimoxazoleBeingAdministered, saveEidSSJSON.motherTreatmentOther, saveEidSSJSON.motherViralLoad,
          saveEidSSJSON.mothercd4, saveEidSSJSON.mothersDob, saveEidSSJSON.mothersMaritalStatus, saveEidSSJSON.mothersName,
          saveEidSSJSON.reviewedBy, saveEidSSJSON.reviewedOn, saveEidSSJSON.appSampleCode
        ];
  
        return this.storage.executeSql(isAddOrUpdate === 'add' ? insertSQL : updateSQL, isAddOrUpdate === 'add' ? insertValues : updateValues)
          .then(async (res) => {
            if (isAddOrUpdate === 'add') {
              await this.lclstorage.set('lastLocalTestEidID', saveEidSSJSON.appSampleCode);
            }
            this.showSucessAlert(isAddOrUpdate);
            await this.getEidRecords();
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }

  // insertVlData(saveVlSSJSON, isAddOrUpdate) {

  //   console.log(saveVlSSJSON, isAddOrUpdate);
  //   this.sqlite
  //     .create({
  //       name: 'vlsm_mobile.db',
  //       location: 'default',
  //     })
  //     .then((db: SQLiteObject) => {
  //       this.storage = db;
  //       const reasonForChangingString = JSON.stringify(saveVlSSJSON.reasonForChanging);
  //       console.log(reasonForChangingString);
  //       return this.storage.executeSql(`INSERT INTO vl_request_form (user_id, unique_id,app_sample_code,remote_sample_code, remote_sample, request_created_datetime, last_modified_datetime, is_synced, vlsm_country_id, province_name, province_id, district, facility_district_id, facility_name, facility_id, implementing_partner,implementing_partner_name, funding_source, lab_id, patient_art_no, patient_first_name, patient_last_name,patient_dob, patient_age_in_years, patient_age_in_months, patient_gender, consent_to_receive_sms, patient_mobile_number, sample_collection_date, sample_type, treatment_initiated_date, current_regimen, date_of_initiation_of_current_regimen, arv_adherance_percentage, is_patient_pregnant, is_patient_breastfeeding, last_vl_date_routine, last_vl_result_routine, last_vl_date_failure_ac, last_vl_result_failure_ac, last_vl_date_failure, last_vl_result_failure, request_clinician_name, request_clinician_phone_number, test_requested_on, lab_name, vl_focal_person, vl_focal_person_phone_number, sample_received_at_hub_datetime, sample_received_at_vl_lab_datetime, sample_tested_datetime, vl_test_platform, is_sample_rejected, reason_for_sample_rejection, sample_rejection_id, result_value_absolute, result_value_log, result_dispatched_datetime, tested_by, result_approved_by, result_approved_datetime, facility_comments,result,rejection_on, reason_for_changing,sample_reordered,serial_no, date_test_ordered_by_physician, is_patient_new, has_patient_changed_regimen, reason_for_regimen_change, regimen_change_date, reason_for_vl_testing, vl_test_number, last_viral_load_result, last_viral_load_date, date_dispatched_from_clinic_to_lab, result_reviewed_by, result_reviewed_datetime,result_value_hiv_detection, pregnancy_trimester) VALUES ("${saveVlSSJSON.user_id}", "${saveVlSSJSON.uniqueId}","${saveVlSSJSON.appSampleCode}", "${saveVlSSJSON.remoteSampleCode}", "${saveVlSSJSON.sampleCode}", "${saveVlSSJSON.createdOn}", "${saveVlSSJSON.updatedOn}", "${saveVlSSJSON.isSynced}", "${saveVlSSJSON.formId}", "${saveVlSSJSON.provinceName}", "${saveVlSSJSON.provinceId}", "${saveVlSSJSON.district}", "${saveVlSSJSON.districtId}", "${saveVlSSJSON.facilityName}", "${saveVlSSJSON.facilityId}", "${saveVlSSJSON.implementingPartner}", "${saveVlSSJSON.implementingPartnerName}", "${saveVlSSJSON.fundingSource}", "${saveVlSSJSON.labId}", "${saveVlSSJSON.art_no}", "${saveVlSSJSON.firstName}","${saveVlSSJSON.lastName}", "${saveVlSSJSON.dob}", "${saveVlSSJSON.ageInYears}", "${saveVlSSJSON.ageInMonths}", "${saveVlSSJSON.gender}", "${saveVlSSJSON.patientConsent}", "${saveVlSSJSON.patientPhoneNo}", "${saveVlSSJSON.sampleCollectionDateTime}", "${saveVlSSJSON.specimenType}", "${saveVlSSJSON.doTreatmentInit}", "${saveVlSSJSON.currentRegimen}", "${saveVlSSJSON.doInitCuurentRegimen}", "${saveVlSSJSON.arvAdherence}", "${saveVlSSJSON.isPatientPregnant}", "${saveVlSSJSON.isPatientBreastfeeding}", "${saveVlSSJSON.rtnDoViralLoadTest}", "${saveVlSSJSON.rtnVlValue}", "${saveVlSSJSON.rptDoViralLoadTest}", "${saveVlSSJSON.rptVlValue}", "${saveVlSSJSON.stfDoViralLoadTest}", "${saveVlSSJSON.stfVlValue}", "${saveVlSSJSON.requestClinician}", "${saveVlSSJSON.phoneNumber}", "${saveVlSSJSON.requestDate}", "${saveVlSSJSON.labName}", "${saveVlSSJSON.vlFocalPerson}", "${saveVlSSJSON.vlFocalPhoneNo}", "${saveVlSSJSON.sampleReceivedDateTimeAtHub}", "${saveVlSSJSON.sampleReceivedDateTimeAtTestLab}", "${saveVlSSJSON.sampleTestDate}", "${saveVlSSJSON.vlTestPlatform}", "${saveVlSSJSON.isSampleRejected}", "${saveVlSSJSON.rejectionReason}","${saveVlSSJSON.rejectionReasonid}", "${saveVlSSJSON.vlResult}", "${saveVlSSJSON.vlLog}", "${saveVlSSJSON.dateResultDispatch}", "${saveVlSSJSON.testedBy}", "${saveVlSSJSON.approvedBy}", "${saveVlSSJSON.approvedOn}", "${saveVlSSJSON.labTechComments}", "${saveVlSSJSON.resultIn}", "${saveVlSSJSON.rejectionDate}", "${reasonForChangingString}", "${saveVlSSJSON.sampleReordered}", "${saveVlSSJSON.serialNo}", "${saveVlSSJSON.dateOfDemand}", "${saveVlSSJSON.isPatientNew}", "${saveVlSSJSON.hasChangedRegimen}", "${saveVlSSJSON.reasonForArvRegimenChange}", "${saveVlSSJSON.dateOfArvRegimenChange}", "${saveVlSSJSON.vlTestReason}", "${saveVlSSJSON.viralLoadNo}", "${saveVlSSJSON.lastViralLoadResult}", "${saveVlSSJSON.lastViralLoadTestDate}", "${saveVlSSJSON.dateDispatchedFromClinicToLab}", "${saveVlSSJSON.reviewedBy}", "${saveVlSSJSON.reviewedOn}", "${saveVlSSJSON.resultValueHivDetection}", "${saveVlSSJSON.trimester}") ON CONFLICT (unique_id) DO UPDATE SET (user_id, app_sample_code,remote_sample_code, remote_sample, request_created_datetime, last_modified_datetime, is_synced, vlsm_country_id, province_name, province_id, district, facility_district_id, facility_name, facility_id, implementing_partner, implementing_partner_name, funding_source, lab_id, patient_art_no, patient_first_name, patient_last_name,patient_dob, patient_age_in_years, patient_age_in_months, patient_gender, consent_to_receive_sms, patient_mobile_number, sample_collection_date, sample_type, treatment_initiated_date, current_regimen, date_of_initiation_of_current_regimen, arv_adherance_percentage, is_patient_pregnant, is_patient_breastfeeding, last_vl_date_routine, last_vl_result_routine, last_vl_date_failure_ac, last_vl_result_failure_ac, last_vl_date_failure, last_vl_result_failure, request_clinician_name, request_clinician_phone_number, test_requested_on, lab_name, vl_focal_person, vl_focal_person_phone_number, sample_received_at_hub_datetime, sample_received_at_vl_lab_datetime, sample_tested_datetime, vl_test_platform, is_sample_rejected, reason_for_sample_rejection, sample_rejection_id, result_value_absolute, result_value_log, result_dispatched_datetime, tested_by, result_approved_by, result_approved_datetime, facility_comments,result,rejection_on, reason_for_changing,sample_reordered, serial_no, date_test_ordered_by_physician, is_patient_new, has_patient_changed_regimen, reason_for_regimen_change, regimen_change_date, reason_for_vl_testing, vl_test_number, last_viral_load_result, last_viral_load_date, date_dispatched_from_clinic_to_lab, result_reviewed_by, result_reviewed_datetime,result_value_hiv_detection, pregnancy_trimester) = (EXCLUDED.user_id, EXCLUDED.app_sample_code, EXCLUDED.remote_sample_code,EXCLUDED.remote_sample, EXCLUDED.request_created_datetime, EXCLUDED.last_modified_datetime, EXCLUDED.is_synced, EXCLUDED.vlsm_country_id, EXCLUDED.province_name, EXCLUDED.province_id, EXCLUDED.district, EXCLUDED.facility_district_id, EXCLUDED.facility_name, EXCLUDED.facility_id, EXCLUDED.implementing_partner, EXCLUDED.implementing_partner_name, EXCLUDED.funding_source, EXCLUDED.lab_id, EXCLUDED.patient_art_no, EXCLUDED.patient_first_name, EXCLUDED.patient_last_name,EXCLUDED.patient_dob, EXCLUDED.patient_age_in_years, EXCLUDED.patient_age_in_months, EXCLUDED.patient_gender, EXCLUDED.consent_to_receive_sms, EXCLUDED.patient_mobile_number, EXCLUDED.sample_collection_date, EXCLUDED.sample_type, EXCLUDED.treatment_initiated_date, EXCLUDED.current_regimen, EXCLUDED.date_of_initiation_of_current_regimen, EXCLUDED.arv_adherance_percentage, EXCLUDED.is_patient_pregnant, EXCLUDED.is_patient_breastfeeding, EXCLUDED.last_vl_date_routine, EXCLUDED.last_vl_result_routine, EXCLUDED.last_vl_date_failure_ac, EXCLUDED.last_vl_result_failure_ac, EXCLUDED.last_vl_date_failure, EXCLUDED.last_vl_result_failure, EXCLUDED.request_clinician_name, EXCLUDED.request_clinician_phone_number, EXCLUDED.test_requested_on, EXCLUDED.lab_name, EXCLUDED.vl_focal_person, EXCLUDED.vl_focal_person_phone_number, EXCLUDED.sample_received_at_hub_datetime, EXCLUDED.sample_received_at_vl_lab_datetime, EXCLUDED.sample_tested_datetime, EXCLUDED.vl_test_platform, EXCLUDED.is_sample_rejected, EXCLUDED.reason_for_sample_rejection, EXCLUDED.sample_rejection_id, EXCLUDED.result_value_absolute, EXCLUDED.result_value_log, EXCLUDED.result_dispatched_datetime, EXCLUDED.tested_by, EXCLUDED.result_approved_by, EXCLUDED.result_approved_datetime, EXCLUDED.facility_comments, EXCLUDED.result,EXCLUDED.rejection_on, EXCLUDED.reason_for_changing,EXCLUDED.sample_reordered, EXCLUDED.serial_no, EXCLUDED.date_test_ordered_by_physician, EXCLUDED.is_patient_new, EXCLUDED.has_patient_changed_regimen, EXCLUDED.reason_for_regimen_change, EXCLUDED.regimen_change_date, EXCLUDED.reason_for_vl_testing, EXCLUDED.vl_test_number, EXCLUDED.last_viral_load_result, EXCLUDED.last_viral_load_date, EXCLUDED.date_dispatched_from_clinic_to_lab, EXCLUDED.result_reviewed_by, EXCLUDED.result_reviewed_datetime, EXCLUDED.result_value_hiv_detection, EXCLUDED.pregnancy_trimester)`, []).then(async (res) => {
  //         if (isAddOrUpdate == 'add') {
  //           await this.lclstorage.set(
  //             'lastLocalTestVlID',
  //             saveVlSSJSON.appSampleCode
  //           );
  //         }
  //         this.showSucessAlert(isAddOrUpdate);
  //         await this.getVlRecords();
  //       })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     });
  // }

  async insertVlData(saveVlSSJSON, isAddOrUpdate) {
    console.log(saveVlSSJSON, isAddOrUpdate);
    try {
        const db = await this.sqlite.create({
            name: 'vlsm_mobile.db',
            location: 'default',
        });
        this.storage = db;

        const reasonForChangingString = JSON.stringify(saveVlSSJSON.reasonForChanging);
        console.log(reasonForChangingString);

        const insertSQL = `
            INSERT INTO vl_request_form (
                user_id, unique_id, app_sample_code, remote_sample_code, remote_sample, request_created_datetime, 
                last_modified_datetime, is_synced, vlsm_country_id, province_name, province_id, district, community_sample,sample_dispatched_datetime,
                facility_district_id, facility_name, facility_id, implementing_partner, implementing_partner_name, 
                funding_source, lab_id, patient_art_no, patient_first_name, patient_last_name, patient_dob, 
                patient_age_in_years, patient_age_in_months, patient_gender, consent_to_receive_sms, 
                patient_mobile_number, sample_collection_date, sample_type, treatment_initiated_date, current_regimen, 
                date_of_initiation_of_current_regimen, arv_adherance_percentage, is_patient_pregnant, 
                is_patient_breastfeeding, last_vl_date_routine, last_vl_result_routine, last_vl_date_failure_ac, 
                last_vl_result_failure_ac, last_vl_date_failure, last_vl_result_failure, request_clinician_name, 
                request_clinician_phone_number, test_requested_on, lab_name, vl_focal_person, vl_focal_person_phone_number, 
                sample_received_at_hub_datetime, sample_received_at_vl_lab_datetime, sample_tested_datetime, 
                vl_test_platform, is_sample_rejected, reason_for_sample_rejection, sample_rejection_id, result_value_absolute, 
                result_value_log, result_dispatched_datetime, tested_by, result_approved_by, result_approved_datetime, 
                facility_comments, result, rejection_on, reason_for_changing, sample_reordered, serial_no, 
                date_test_ordered_by_physician, is_patient_new, has_patient_changed_regimen, reason_for_regimen_change, 
                regimen_change_date, reason_for_vl_testing, vl_test_number, last_viral_load_result, last_viral_load_date, 
                date_dispatched_from_clinic_to_lab, result_reviewed_by, result_reviewed_datetime, result_value_hiv_detection, 
                pregnancy_trimester
            ) VALUES (
                ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
            )
            ON CONFLICT (unique_id) DO UPDATE SET 
                user_id = EXCLUDED.user_id, app_sample_code = EXCLUDED.app_sample_code, remote_sample_code = EXCLUDED.remote_sample_code, 
                remote_sample = EXCLUDED.remote_sample, request_created_datetime = EXCLUDED.request_created_datetime, 
                last_modified_datetime = EXCLUDED.last_modified_datetime, is_synced = EXCLUDED.is_synced, 
                vlsm_country_id = EXCLUDED.vlsm_country_id, province_name = EXCLUDED.province_name, province_id = EXCLUDED.province_id, 
                district = EXCLUDED.district, community_sample = EXCLUDED.community_sample, sample_dispatched_datetime = EXCLUDED.sample_dispatched_datetime,facility_district_id = EXCLUDED.facility_district_id, facility_name = EXCLUDED.facility_name, 
                facility_id = EXCLUDED.facility_id, implementing_partner = EXCLUDED.implementing_partner, 
                implementing_partner_name = EXCLUDED.implementing_partner_name, funding_source = EXCLUDED.funding_source, 
                lab_id = EXCLUDED.lab_id, patient_art_no = EXCLUDED.patient_art_no, patient_first_name = EXCLUDED.patient_first_name, 
                patient_last_name = EXCLUDED.patient_last_name, patient_dob = EXCLUDED.patient_dob, patient_age_in_years = EXCLUDED.patient_age_in_years, 
                patient_age_in_months = EXCLUDED.patient_age_in_months, patient_gender = EXCLUDED.patient_gender, 
                consent_to_receive_sms = EXCLUDED.consent_to_receive_sms, patient_mobile_number = EXCLUDED.patient_mobile_number, 
                sample_collection_date = EXCLUDED.sample_collection_date, sample_type = EXCLUDED.sample_type, 
                treatment_initiated_date = EXCLUDED.treatment_initiated_date, current_regimen = EXCLUDED.current_regimen, 
                date_of_initiation_of_current_regimen = EXCLUDED.date_of_initiation_of_current_regimen, 
                arv_adherance_percentage = EXCLUDED.arv_adherance_percentage, is_patient_pregnant = EXCLUDED.is_patient_pregnant, 
                is_patient_breastfeeding = EXCLUDED.is_patient_breastfeeding, last_vl_date_routine = EXCLUDED.last_vl_date_routine, 
                last_vl_result_routine = EXCLUDED.last_vl_result_routine, last_vl_date_failure_ac = EXCLUDED.last_vl_date_failure_ac, 
                last_vl_result_failure_ac = EXCLUDED.last_vl_result_failure_ac, last_vl_date_failure = EXCLUDED.last_vl_date_failure, 
                last_vl_result_failure = EXCLUDED.last_vl_result_failure, request_clinician_name = EXCLUDED.request_clinician_name, 
                request_clinician_phone_number = EXCLUDED.request_clinician_phone_number, test_requested_on = EXCLUDED.test_requested_on, 
                lab_name = EXCLUDED.lab_name, vl_focal_person = EXCLUDED.vl_focal_person, vl_focal_person_phone_number = EXCLUDED.vl_focal_person_phone_number, 
                sample_received_at_hub_datetime = EXCLUDED.sample_received_at_hub_datetime, sample_received_at_vl_lab_datetime = EXCLUDED.sample_received_at_vl_lab_datetime, 
                sample_tested_datetime = EXCLUDED.sample_tested_datetime, vl_test_platform = EXCLUDED.vl_test_platform, 
                is_sample_rejected = EXCLUDED.is_sample_rejected, reason_for_sample_rejection = EXCLUDED.reason_for_sample_rejection, 
                sample_rejection_id = EXCLUDED.sample_rejection_id, result_value_absolute = EXCLUDED.result_value_absolute, 
                result_value_log = EXCLUDED.result_value_log, result_dispatched_datetime = EXCLUDED.result_dispatched_datetime, 
                tested_by = EXCLUDED.tested_by, result_approved_by = EXCLUDED.result_approved_by, 
                result_approved_datetime = EXCLUDED.result_approved_datetime, facility_comments = EXCLUDED.facility_comments, 
                result = EXCLUDED.result, rejection_on = EXCLUDED.rejection_on, reason_for_changing = EXCLUDED.reason_for_changing, 
                sample_reordered = EXCLUDED.sample_reordered, serial_no = EXCLUDED.serial_no, 
                date_test_ordered_by_physician = EXCLUDED.date_test_ordered_by_physician, is_patient_new = EXCLUDED.is_patient_new, 
                has_patient_changed_regimen = EXCLUDED.has_patient_changed_regimen, 
                reason_for_regimen_change = EXCLUDED.reason_for_regimen_change, regimen_change_date = EXCLUDED.regimen_change_date, 
                reason_for_vl_testing = EXCLUDED.reason_for_vl_testing, vl_test_number = EXCLUDED.vl_test_number, 
                last_viral_load_result = EXCLUDED.last_viral_load_result, last_viral_load_date = EXCLUDED.last_viral_load_date, 
                date_dispatched_from_clinic_to_lab = EXCLUDED.date_dispatched_from_clinic_to_lab, 
                result_reviewed_by = EXCLUDED.result_reviewed_by, result_reviewed_datetime = EXCLUDED.result_reviewed_datetime, 
                result_value_hiv_detection = EXCLUDED.result_value_hiv_detection, pregnancy_trimester = EXCLUDED.pregnancy_trimester
            `;
        const values = [
            saveVlSSJSON.user_id, saveVlSSJSON.uniqueId, saveVlSSJSON.appSampleCode, saveVlSSJSON.remoteSampleCode, 
            saveVlSSJSON.sampleCode, saveVlSSJSON.createdOn, saveVlSSJSON.updatedOn, saveVlSSJSON.isSynced, 
            saveVlSSJSON.formId, saveVlSSJSON.provinceName, saveVlSSJSON.provinceId, saveVlSSJSON.district, saveVlSSJSON.communitySample, saveVlSSJSON.sampleDispatchedOn,
            saveVlSSJSON.districtId, saveVlSSJSON.facilityName, saveVlSSJSON.facilityId, saveVlSSJSON.implementingPartner, 
            saveVlSSJSON.implementingPartnerName, saveVlSSJSON.fundingSource, saveVlSSJSON.labId, saveVlSSJSON.art_no, 
            saveVlSSJSON.firstName, saveVlSSJSON.lastName, saveVlSSJSON.dob, saveVlSSJSON.ageInYears, saveVlSSJSON.ageInMonths, 
            saveVlSSJSON.gender, saveVlSSJSON.patientConsent, saveVlSSJSON.patientPhoneNo, saveVlSSJSON.sampleCollectionDateTime, 
            saveVlSSJSON.specimenType, saveVlSSJSON.doTreatmentInit, saveVlSSJSON.currentRegimen, saveVlSSJSON.doInitCuurentRegimen, 
            saveVlSSJSON.arvAdherence, saveVlSSJSON.isPatientPregnant, saveVlSSJSON.isPatientBreastfeeding, saveVlSSJSON.rtnDoViralLoadTest, 
            saveVlSSJSON.rtnVlValue, saveVlSSJSON.rptDoViralLoadTest, saveVlSSJSON.rptVlValue, saveVlSSJSON.stfDoViralLoadTest, 
            saveVlSSJSON.stfVlValue, saveVlSSJSON.requestClinician, saveVlSSJSON.phoneNumber, saveVlSSJSON.requestDate, 
            saveVlSSJSON.labName, saveVlSSJSON.vlFocalPerson, saveVlSSJSON.vlFocalPhoneNo, saveVlSSJSON.sampleReceivedDateTimeAtHub, 
            saveVlSSJSON.sampleReceivedDateTimeAtTestLab, saveVlSSJSON.sampleTestDate, saveVlSSJSON.vlTestPlatform, 
            saveVlSSJSON.isSampleRejected, saveVlSSJSON.rejectionReason, saveVlSSJSON.rejectionReasonid, saveVlSSJSON.vlResult, 
            saveVlSSJSON.vlLog, saveVlSSJSON.dateResultDispatch, saveVlSSJSON.testedBy, saveVlSSJSON.approvedBy, 
            saveVlSSJSON.approvedOn, saveVlSSJSON.labTechComments, saveVlSSJSON.resultIn, saveVlSSJSON.rejectionDate, 
            reasonForChangingString, saveVlSSJSON.sampleReordered, saveVlSSJSON.serialNo, saveVlSSJSON.dateOfDemand, 
            saveVlSSJSON.isPatientNew, saveVlSSJSON.hasChangedRegimen, saveVlSSJSON.reasonForArvRegimenChange, 
            saveVlSSJSON.dateOfArvRegimenChange, saveVlSSJSON.vlTestReason, saveVlSSJSON.viralLoadNo, 
            saveVlSSJSON.lastViralLoadResult, saveVlSSJSON.lastViralLoadTestDate, saveVlSSJSON.dateDispatchedFromClinicToLab, 
            saveVlSSJSON.reviewedBy, saveVlSSJSON.reviewedOn, saveVlSSJSON.resultValueHivDetection, saveVlSSJSON.trimester
        ];

        const res = await this.storage.executeSql(insertSQL, values);

        if (isAddOrUpdate === 'add') {
            await this.lclstorage.set('lastLocalTestVlID', saveVlSSJSON.appSampleCode);
        }

        this.showSucessAlert(isAddOrUpdate);
        await this.getVlRecords();
    } catch (error) {
        console.error(error);
    }
}


  async getEidRecords() {
    this.sqlite
      .create({
        name: 'vlsm_mobile.db',
        location: 'default',
      })
      .then(async (db: SQLiteObject) => {
        this.storage = db;
        const data = await this.storage.executeSql(
          'SELECT * FROM eid_form',
          []
        );
        this.results = [];
        for (let i = 0; i < data.rows.length; i++) {
          let item = data.rows.item(i);
          this.results.push(item);
        }
        console.log(this.results, 'getEidRecords');
        return this.results;
      });
  }

  async getVlRecords() {
    this.sqlite
      .create({
        name: 'vlsm_mobile.db',
        location: 'default',
      })
      .then(async (db: SQLiteObject) => {
        this.storage = db;
        const data = await this.storage.executeSql(
          'SELECT * FROM vl_request_form',
          []
        );
        this.results = [];
        for (let i = 0; i < data.rows.length; i++) {
          let item = data.rows.item(i);
          this.results.push(item);
        }
        console.log(this.results, 'vl_request_form');
        return this.results;
      });
  }

  showSucessAlert(isAddOrUpdate) {
    if (isAddOrUpdate == 'add') {
      this.alertService.alertWithSingleButton(
        'Success',
        'OK',
        'New Test Request added successfully',
        'localTestReqAlert'
      );
    } else {
      this.alertService.alertWithSingleButton(
        'Success',
        'OK',
        'Test Request updated successfully',
        'localTestReqAlert'
      );
    }
  }
}
