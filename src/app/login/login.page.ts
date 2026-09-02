import { PrivilegeService } from './../service/privilage/privilege.service';
import { Component, OnInit } from '@angular/core';
import {
  CrudOperationsService,
  ToastService,
  LoaderService,
  Events,
  themeService,
  AlertService,
  SyncTestRequestsService,
} from '../../app/service/providers';
// import urlExist from "url-exist"
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { CommonService } from '../service/common/common.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { trimmedCharsValidator } from '../../validators/validators';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import _ from 'lodash';
import { DbService } from '../services/db.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: false
})
export class LoginPage implements OnInit {
  appVersionNumber: any;
  deviceOSVersion: any;
  uuid: any;
  deviceInfoObj = {};
  userNameFormControl = new FormControl('', [
    Validators.required,
    trimmedCharsValidator.checkTrimmedThreeChars,
  ]);
  pswdFormControl = new FormControl('', [
    Validators.required,
    trimmedCharsValidator.checkTrimmedThreeChars,
  ]);
  serverHostFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  pswdhide = true;
  loginDetailsArray: any = [];
  submitted = false;
  initArray: any = [];
  userName: any;
  selectedTheme: String;
  UnLoggedUserArray: any = [];
  loggedUserArray: any = [];
  userTestRequestArray: any = [];
  webSamplesArray: any = [];
  vlSamplesArray: any = [];
  userID: any;
  localTestRequestFormArray: any = [];
  authToken: any;
  userRole: any;
  networkType: any;
  private dbStorage: SQLiteObject;
  results: any = [];
  testresults: any = [];
  formID: any;
  covid19WebArray: any = [];
  count: number;
  offTestReqID: any;
  lcltstrqidloop: any;
  lcltstrqid: any;

  constructor(
    public menu: MenuController,
    public commonservice: CommonService,
    private storage: Storage,
    private router: Router, public http: HttpClient,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    public CrudService: CrudOperationsService,
    public events: Events,
    public themeService: themeService,
    public alertService: AlertService,
    public network: Network,
    public SyncReq: SyncTestRequestsService,
    private db: DbService,
    private sqlite: SQLite,
    public privilege: PrivilegeService
  ) {
    this.themeService
      .getActiveTheme()
      .subscribe((val) => (this.selectedTheme = val));
  }

  ngOnInit() { }

  async ionViewDidEnter() {
    // the root left menu should be disabled on this page
    this.menu.enable(false);
  }

  async ionViewWillEnter() {
    await this.storage.create();
    await this.storage.get('localTestRequestForm').then(async (result) => {
      if (result == null) {
        await this.storage.set('localTestRequestForm', []);
      }
    });
    // this.serverHostFormControl.setValue('https://vlsm.deforay.dev');
    // this.userNameFormControl.setValue("admin");
    // this.pswdFormControl.setValue('123');
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
  }
  async getData(URL) {
    return new Promise(async (resolve, reject) => {
      // let apiURL = await this.storage.get("apiUrl");
      // if (apiURL) {
      // this.http.get(URL + '/api/v1.1/xyz.php')

      const checkLegacyVersionEndpoint = () => this.http.get(URL + '/api/v1.1/version.php').subscribe(async (resp: any) => {
        console.log(resp);
        if (resp) {
          const res: any = resp;
          if (res.version != undefined && res.version != null && res.version != '') {
            resolve(true);
          } else {
            this.CrudService.alertWithSingleButton('Alert', 'OK', 'Please enter a valid cloud VLSM URL. Contact your VLSM system administrator for help or guidance', '');
          }
        }
      }, async (err) => {
        console.log(err.status);

        // if (err.status == 401) {
        this.CrudService.alertWithSingleButton('Alert', 'OK', 'Please enter a valid cloud VLSM URL. Contact your VLSM system administrator for help or guidance', '');
        // await this.storage.set("isLoggedIn", false);
        // this.router.navigate(['/login']);
        // }
        reject(err);
      });

      // Prefer the health endpoint. Older InteLIS servers only have version.php, so fall back to it.
      this.http.get(URL + '/api/v1.1/health').subscribe((health: any) => {
        if (health && (health.status === 'ok' || health.version)) {
          resolve(true);
        } else {
          checkLegacyVersionEndpoint();
        }
      }, () => checkLegacyVersionEndpoint());

      // }
    });
  }
  async login() { 
    this.LoaderService.show();
    await this.db.loadSQLFile('login');
    this.networkType = this.network.type;

    // if (this.network.type == 'none' || this.network.type == 'unknown') {

    //   this.alertService.alertWithSingleButton('Alert', 'OK', "You need internet connection to login to the VLSM app for the first time. Please connect to the internet to proceed with one time setup process.");

    // } else {

    this.userNameFormControl.setValue(this.userNameFormControl.value.trim());
    this.pswdFormControl.setValue(this.pswdFormControl.value.trim());
    this.submitted = true;
    // this.LoaderService.hide();
    if (this.userNameFormControl.invalid || this.pswdFormControl.invalid || this.serverHostFormControl.invalid) {
      // this.LoaderService.show();
      this.alertService.alertWithSingleButton('Alert', 'OK', "Invalid Credentials", '');
      this.LoaderService.hide();
    } else {
      let apiUrl = '';
      if (this.serverHostFormControl.value.indexOf('http://') == 0 || this.serverHostFormControl.value.indexOf('https://') == 0) {
        apiUrl = this.serverHostFormControl.value;
      } else {
        apiUrl = 'https://' + this.serverHostFormControl.value;
      }
      await this.storage.set('apiUrl', apiUrl.trim());
      // await this.getData(apiUrl);

      // let access = await urlExist(apiUrl);
      const access = await this.getData(apiUrl);
      if (access) {
        this.appVersionNumber = await this.storage.get('appVersionNumber');

        const loginJSON = {
          userName: this.userNameFormControl.value,
          password: this.pswdFormControl.value,
          appVersion: this.appVersionNumber,
        };
      
        this.CrudService.postDataWithoutAuthToken('/api/v1.1/user/login.php', loginJSON).then(
          async (result) => {
            console.log(result['status'],'resultStatus');
            if (result['status'] == '1') {
              await this.storage.set('isLoggedIn', true);
              await this.storage.set('isLogOut', false);
              await this.storage.set('loginDetails', result['data']);

              this.loginDetailsArray = [];
              this.loginDetailsArray = result['data'];
              await this.storage.set('privileges', this.loginDetailsArray.access.privileges);
              await this.storage.set('isLoggedIn', true);
              await this.storage.get('loginDetails').then(async (loginDetails) => {
                if (loginDetails) {
                  this.authToken = loginDetails['api_token'];
                  this.userName = loginDetails['user'].user_name;
                  this.userID = loginDetails['user'].user_id;
                  this.userRole = loginDetails['user'].role_name;
                  this.formID = loginDetails['form'];
                  let userJSON = { userName: this.userName, userRole: this.userRole, };
                  this.events.publish('userName', userJSON);
                  this.db.insertUserDetails(this.loginDetailsArray);
                  await this.getWebRecords();
                }
              });
              this.events.publish(
                'setTheme',
                this.loginDetailsArray.user.testing_user
              );
              if (this.loginDetailsArray.user.testing_user == 'yes') {
                this.selectedTheme = 'blue-theme';
                this.themeService.setActiveTheme('blue-theme');
              } else {
                this.selectedTheme = 'red-theme';
                this.themeService.setActiveTheme('red-theme');
              }

              if (this.loginDetailsArray.form == '3' || this.loginDetailsArray.form == '1') {
                const initJSON = {
                  // appVersion: this.appVersionNumber,
                  // deviceOSVersion: '',
                  // uuid: ''
                };
              
                this.deviceOSVersion = await this.storage.get('deviceOSVersion');
                // this.uuid = await this.storage.get('deviceuuid');
                // initJSON.deviceOSVersion = this.deviceOSVersion;
                // initJSON.uuid = this.uuid;

                this.CrudService.postDataWithoutLoader(
                  '/api/v1.1/init.php',
                  initJSON,
                  this.loginDetailsArray.api_token ,true
                ).then(
                  async (result: any) => {
                

                    if (result.status == '1') {
                      this.initArray = result.data;
                      console.log(this.initArray) 
                      console.log( this.initArray, 'initAuto' );
                      await this.storage.set( 'initArray', this.initArray );
                      console.log('initArray has been set in storage:', this.initArray);          
                      this.router.navigate(['/app-password'], {
                        replaceUrl: true,
                      });
                      this.insertFacilitiesDetails();
                      this.LoaderService.hide();
                    }
                    if (result.status == '2' || result.status == 'failed') {
                      this.LoaderService.hide();
                      this.alertService.alertWithSingleButton('Alert', 'OK', result.message, '');
                    }
                    this.LoaderService.hide();
                  },
                  async (result) => {
                    this.LoaderService.hide();
                    if (result.status == 'failed') {
                      await this.storage.set('isLoggedIn', false);
                      this.router.navigate(['/login']);
                    }
                  }
                );
              }
            }
            else if (result['status'] == '2') {
              this.LoaderService.hide();
              this.alertService.presentAlert('Alert', result["message"], '');
            }

          },
          (err) => {
            this.LoaderService.hide();
            // if (this.serverHostFormControl.value.indexOf('https://') != 0) {
            //   this.alertService.alertWithSingleButton(
            //     'Alert',
            //     'OK',
            //     'Invalid Server Url',
            //     ''
            //   );
            // } else if (
            //   this.serverHostFormControl.value.indexOf('https://') == 0 ||
            //   this.serverHostFormControl.value.indexOf('http://') == 0
            // ) {
            //   if (
            //     this.serverHostFormControl.value ==
            //       'https://vlsm.labsinformatics.com' ||
            //     this.serverHostFormControl.value == 'https://vlsm-test.mohdrc.com'
            //   ) {
            //     this.alertService.alertWithSingleButton(
            //       'Alert',
            //       'OK',
            //       'Invalid Credentials',
            //       ''
            //     );
            //   } else {
            //     this.alertService.alertWithSingleButton(
            //       'Alert',
            //       'OK',
            //       'Invalid Server Url',
            //       ''
            //     );
            //   }
            // }
          }
        );
      } else {
        this.CrudService.alertWithSingleButton('Alert', 'OK', 'Please enter a valid cloud VLSM URL. Contact your VLSM system administrator for help or guidance', '');
      }
    }
    // }
  }

  

  async getWebRecords() {
    console.log("getWebRecords");
    let getWebSamplesJSON = { appVersion: this.appVersionNumber, };
    await this.CrudService.postDataWithoutLoader('/api/v1.1/covid-19/get-request.php', getWebSamplesJSON, this.authToken ,true).then(
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

    await this.CrudService.postDataWithoutLoader('/api/v1.1/eid/get-request.php', getWebSamplesJSON, this.authToken ,true).then(
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


    

    

    await this.CrudService.postDataWithoutLoader('/api/v1.1/vl/get-request.php', getWebSamplesJSON, this.authToken ,true).then(
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
  insertFacilitiesDetails() {
    this.sqlite.create({
        name: 'vlsm_mobile.db',
        location: 'default',
      }).then((db: SQLiteObject) => {
        this.dbStorage = db;
        const data = [];
        const rowArgs = [];
        let query = 'INSERT OR REPLACE INTO facility_details (facility_id,facility_name,facility_code,facility_state,facility_state_id,facility_district,facility_district_id,other_id,testing_points,status) VALUES ';
        this.initArray.facilitiesList.forEach(function (item) {
          rowArgs.push('(? ,?, ?, ?, ?, ?, ?, ?, ?, ?)');

          data.push(item.facility_id);
          data.push(item.facility_name);
          data.push(item.facility_code);
          data.push(item.facility_state);
          data.push(item.facility_state_id);
          data.push(item.facility_district);
          data.push(item.facility_district_id);
          data.push(item.other_id);
          data.push(item.testing_points);
          data.push(item.status);
        });
        query += rowArgs.join(', ');

        return this.dbStorage
          .executeSql(query, data)
          .then((res) => {
            console.log('inserted facility details table');

            return this.dbStorage
              .executeSql('SELECT * FROM facility_details', [])
              .then((data) => {
                console.log(data,'SELECTed');
                this.results = [];
                for (let i = 0; i < data.rows.length; i++) {
                  const item = data.rows.item(i);
                  this.results.push(item);
                }
                console.log(this.results, 'facility_details');
              });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }
}
