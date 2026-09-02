import {
  Injectable
} from '@angular/core';
import { Platform } from '@ionic/angular';
import {
  SQLite,
  SQLiteObject
} from '@ionic-native/sqlite/ngx';
import {
  Storage
} from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  c19TestsKeysArray: any = [];
  covidItemsArray: any = [];
  eidItemsArray: any = [];
  vlItemsArray: any = [];
  provinceDetailsArray: any = [];
  districtDetailsArray: any = [];
  facilitiesDetailsArray:any =[];
  private dbStorage: SQLiteObject;
  data: {};
  c19SymptomsKeysArray: any;
  c19ReasonsKeysArray: any;

  constructor(private plt: Platform, private storage: Storage, public sql: SQLite ) {
    this.plt.ready().then(() => {
      this.sql.create({
        name: 'vlsm_mobile.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.dbStorage = db;
      });
    });

  }

  async removeItems(items: string[]): Promise<void> {
    for (const item of items) {
      await this.storage.remove(item);
    }
  }

 async  getc19TestsKeysArray(c19TestDetailsArray) {
    return this.c19TestsKeysArray = c19TestDetailsArray.map(function (item) {
      return {
        "testId": item.test_id,
        "covid19Id": item.covid19_id,
        "facilityId": item.facility_id,
        "testName": item.test_name,
        "testDate": item.sample_tested_datetime,
        "testingPlatform": item.testing_platform,
        "kitLotNo": item.kitLotNo,
        "kitExpiryDate": item.kitExpiryDate,
        "result": item.result,
      }
    })
  }
  async getc19ReasonsKeysArray(c19reasonsArray){
    return this.c19ReasonsKeysArray = c19reasonsArray.map(function (item) {
     return {
        reasons_detected: item.reasons_detected,
        reason_details: item.reason_details
      };
    })
}
async getc19SymptomsKeysArray(c19SymptomsArray){
    return this.c19SymptomsKeysArray = c19SymptomsArray.map(function (item) {
      return {
        // covid19_id: item.covid19_id,
        id: item.symptom_id,
        symptom: item.symptom_detected,
        detail: item.symptom_details
      };
    })
}

// async getc19SymptomsKeysArray(c19SymptomsArray) {
//   return c19SymptomsArray.map(function (item) {
//     return {
//       id: item.symptom_id,
//       symptom: item.symptom_detected, // Use the value from the database
//       detail: item.symptom_details
//     };
//   });
// }


  async covidKeysArray(items) {
    // debugger;
    return this.covidItemsArray = items.map(function (item) {
      
      return {
        "covid19Id": item.covid19_id,
        "uniqueId":item.unique_id,
        "appSampleCode": item.app_sample_code,
        "sampleCode": item.sample_code,
        "remoteSampleCode":item.remote_sample_code,
        "createdOn": item.created_on,
        "updatedOn": item.last_modified_datetime,
        "isSynced": item.is_synced,
        "authToken": item.api_token,
        "formId": item.vlsm_country_id,
        "sourceOfAlertPOE": item.source_of_alert,
        "provinceId": item.province_id,
        "provinceName": item.province_name,
        "district": item.district,
        "facilityId": item.facility_id,
        "facilityName": item.facility_name,
        "implementingPartner": item.implementing_partner,
        "implementingPartnerName": item.implementing_partner_name,
        "fundingSource": item.funding_source,
        "fundingSourceName": item.funding_source_name,
        "labId": item.lab_id,
        "labName": item.lab_name,
        "patientId": item.patient_id,
        "externalSampleCode": item.external_sample_code,
        "firstName": item.patient_name,
        "lastName": item.patient_surname,
        "patientDob": item.patient_dob,
        "patientAge": item.patient_age,
        "patientGender": item.patient_gender,
        "patientPhoneNumber": item.patient_phone_number,
        "patientAddress": item.patient_address,
        "patientProvince": item.patient_province,
        "patientProvinceId": item.patient_province_id,
        "patientDistrict": item.patient_district,
        "patientZone": item.patient_zone,
        "patientCity": item.patient_city,
        "patientNationality": item.patient_nationality,
        "patientNationalityName": item.patient_nationality_name,
        "patientPassportNumber": item.patient_passport_number,
        "testTypeRequested": item.type_of_test_requested,
        "reasonForCovid19Test": item.reason_for_covid19_test,
        "sampleCollectionDate": item.sample_collection_date,
        "specimenType": item.specimen_type,
        "testNumber": item.test_number,
        "sampleReceivedDate": item.sample_received_at_vl_lab_datetime,
        "sampleCondition": item.sample_condition,
        "labTechnician": item.lab_technician,
        "labTechnicianName": item.lab_technician_name,
        "isSampleRejected": item.is_sample_rejected,
        "rejectionDate": item.rejection_on,
        "reasonForCovid19ResultChanges": item.reason_for_changing,
        "rejectionReason": item.reason_for_sample_rejection,
        "rejectionReasonId": item.sample_rejection_id,
        "c19Tests": item.c19Tests,
        "testResult": item.result,
        "testedBy": item.tested_by,
        "testedByName": item.tested_by_name,
        "isResultAuthorized": item.is_result_authorised,
        "authorizedBy": item.authorized_by,
        "authorizedOn": item.authorized_on,
        "user_id": item.user_id,
        "covid19_id": item.covid19_id,
        "sampleID": item.sample_code,
        "sampling": item.sample_batch_id,
        "isPatientPregnant":item.is_patient_pregnant,
        "feverTemp": item.fever_temp,
        "temperatureMeasurementMethod":item.temperature_measurement_method,
        "respiratoryRate":item.respiratory_rate,
        "oxygenSaturation":item.oxygen_saturation,
        "numberOfDaysSick":item.number_of_days_sick,
        "dateOfSymptomOnset":item.date_of_symptom_onset,
        "dateOfInitialConsultation":item.date_of_initial_consultation,
        "patientLivesWithChildren":item.patient_lives_with_children,
        "patientCaresForChildren":item.patient_cares_for_children,
        "hasRecentTravelHistory":item.has_recent_travel_history,
        "countryName": item.travel_country_names,
        "airline": item.flight_airline,
        "seatNo":item.flight_seat_no ,
        "dateTimeofArrivalPicker":item.flight_arrival_datetime,
        "airportOfDeparture":item.flight_airport_of_departure,
        "transit": item.flight_transit,
        "reasonOfVisit":item.reason_of_visit,
        "patientOccupation":item.patient_occupation,
        "doesPatientSmoke":item.does_patient_smoke,
        "reviewedBy":item.result_reviewed_by,
        "reviewedOn": item.result_reviewed_datetime,
        "approvedBy":item.result_approved_by ,
        "approvedOn": item.result_approved_datetime,
        "returnDate": item.travel_return_date,
        "medicalHistory":item.medical_history,
        "recentHospitalization":item.recent_hospitalization,
        "closeContacts":item.close_contacts,
        "asymptomatic": item.asymptomatic,
        "patientEmail": item.patientEmail,
        "sampleDispatchedOn": item.sample_dispatched_datetime,
        
        // fever: fever,
        // weightLoss: weightLoss,
        // convulsions: convulsions,
        // lethargy: lethargy,
        // headAche: headAche,
        // soreThroat: soreThroat,
        // cough: cough,
        // rhinitis: rhinitis,
        // difficultBreathing:difficultBreathing,
        // nausea: nausea,
        // musclePain: musclePain,
        // asthenia: asthenia,
        // diarrhea: diarrhea,
      }
    })
  }


  async covidSyncArray(items) {
 
    return this.covidItemsArray = items.map(function (item) {
      
      return {
        "covid19Id": item.covid19_id,
        "uniqueId":item.unique_id,
        "appSampleCode": item.app_sample_code,
        "sampleCode": item.sample_code,
        "remoteSampleCode":item.remote_sample_code,
        "createdOn": item.created_on,
        "updatedOn": item.last_modified_datetime,
        "isSynced": item.is_synced,
        "authToken": item.api_token,
        "formId": item.vlsm_country_id,
        "sourceOfAlertPOE": item.source_of_alert,
        "provinceId": item.province_id,
        "provinceName": item.province_name,
        "district": item.district,
        "facilityId": item.facility_id,
        "facilityName": item.facility_name,
        "implementingPartner": item.implementing_partner,
        "implementingPartnerName": item.implementing_partner_name,
        "fundingSource": item.funding_source,
        "fundingSourceName": item.funding_source_name,
        "labId": item.lab_id,
        "labName": item.lab_name,
        "patientId": item.patient_id,
        "externalSampleCode": item.external_sample_code,
        "firstName": item.patient_name,
        "lastName": item.patient_surname,
        "patientDob": item.patient_dob,
        "patientAge": item.patient_age,
        "patientGender": item.patient_gender,
        "patientPhoneNumber": item.patient_phone_number,
        "patientAddress": item.patient_address,
        "patientProvince": item.patient_province,
        "patientProvinceId": item.patient_province_id,
        "patientDistrict": item.patient_district,
        "patientZone": item.patient_zone,
        "patientCity": item.patient_city,
        "patientNationality": item.patient_nationality,
        "patientNationalityName": item.patient_nationality_name,
        "patientPassportNumber": item.patient_passport_number,
        "testTypeRequested": item.type_of_test_requested,
        "reasonForCovid19Test": item.reason_for_covid19_test,
        "sampleCollectionDate": item.sample_collection_date,
        "specimenType": item.specimen_type,
        "testNumber": item.test_number,
        "sampleReceivedDate": item.sample_received_at_vl_lab_datetime,
        "sampleCondition": item.sample_condition,
        "labTechnician": item.lab_technician,
        "labTechnicianName": item.lab_technician_name,
        "isSampleRejected": item.is_sample_rejected,
        "rejectionDate": item.rejection_on,
        "reasonForCovid19ResultChanges": item.reason_for_changing,
        "sampleRejectionReason": item.reason_for_sample_rejection,
        "rejectionReasonId": item.sample_rejection_id,
        "c19Tests": item.c19Tests,
        "result": item.result,
        "testedBy": item.tested_by,
        "testedByName": item.tested_by_name,
        "isResultAuthorized": item.is_result_authorised,
        "authorizedBy": item.authorized_by,
        "authorizedOn": item.authorized_on,
        "user_id": item.user_id,
        "covid19_id": item.covid19_id,
        "sampleID": item.sample_code,
        "sampling": item.sample_batch_id,
        "isPatientPregnant":item.is_patient_pregnant,
        "feverTemp": item.fever_temp,
        "temperatureMeasurementMethod":item.temperature_measurement_method,
        "respiratoryRate":item.respiratory_rate,
        "oxygenSaturation":item.oxygen_saturation,
        "numberOfDaysSick":item.number_of_days_sick,
        "dateOfSymptomOnset":item.date_of_symptom_onset,
        "dateOfInitialConsultation":item.date_of_initial_consultation,
        "patientLivesWithChildren":item.patient_lives_with_children,
        "patientCaresForChildren":item.patient_cares_for_children,
        "hasRecentTravelHistory":item.has_recent_travel_history,
        "countryName": item.travel_country_names,
        "airline": item.flight_airline,
        "seatNo":item.flight_seat_no ,
        "arrivalDateTime":item.flight_arrival_datetime,
        "airportOfDeparture":item.flight_airport_of_departure,
        "transit": item.flight_transit,
        "reasonOfVisit":item.reason_of_visit,
        "patientOccupation":item.patient_occupation,
        "doesPatientSmoke":item.does_patient_smoke,
        "reviewedBy":item.result_reviewed_by,
        "reviewedOn": item.result_reviewed_datetime,
        "approvedBy":item.result_approved_by ,
        "approvedOn": item.result_approved_datetime,
        "returnDate": item.travel_return_date,
        "medicalHistory":item.medical_history,
        "recentHospitalization":item.recent_hospitalization,
        "closeContacts":item.close_contacts,
        "asymptomatic": item.asymptomatic,
        "patientEmail": item.patientEmail,
        "sampleDispatchedOn": item.sample_dispatched_datetime,
        // fever: fever,
        // weightLoss: weightLoss,
        // convulsions: convulsions,
        // lethargy: lethargy,
        // headAche: headAche,
        // soreThroat: soreThroat,
        // cough: cough,
        // rhinitis: rhinitis,
        // difficultBreathing:difficultBreathing,
        // nausea: nausea,
        // musclePain: musclePain,
        // asthenia: asthenia,
        // diarrhea: diarrhea,
      }
    })
  }

  async eidKeysArray(items) {
    return this.eidItemsArray = items.map(function (item) {
      return {
        "eidId": item.eid_id,
        "uniqueId":item.unique_id,
        "appSampleCode": item.app_sample_code,
        "sampleCode": item.sample_code,
        "remoteSampleCode": item.remote_sample_code,
        "createdOn": item.request_created_datetime,
        "updatedOn": item.last_modified_datetime,
        "isSynced": item.is_synced, //
        "authToken": item.api_token, //
        "formId": item.vlsm_country_id, //

        "provinceId": item.province_id,
        "provinceName":item.province_name,
        "district": item.district,
        "district_id": item.facility_district_id,
        "facilityId": item.facility_id,
        "facilityName": item.facility_name, //
        "implementingPartner": item.implementing_partner,
        "fundingSource": item.funding_source,
        "labId": item.lab_id,
        "testingLab":item.lab_id,
        
        "childTreatment": item.child_treatment,
        "choiceOfFeeding": item.choice_of_feeding,
        "isCotrimoxazoleBeingAdministered": item.is_cotrimoxazole_being_administered_to_the_infant,
        "motherTreatmentOther": item.mother_treatment_other,
        "motherViralLoadText": item.mother_vl_result,
        "motherViralLoadCopiesPerMl": item.mother_vl_result,
        "mothercd4": item.mother_cd4,
        "mothersDob": item.mother_dob,
        "mothersMaritalStatus": item.mother_marital_status,
        "mothersName": item.mother_name,
        "reviewedBy": item.result_reviewed_by,
        "reviewedOn": item.result_reviewed_datetime,

        "patientId": item.child_id,
        "externalSampleCode": item.external_sample_code, 
        "firstName": item.child_name,
        "lastName": item.child_surname,
        "patientDob": item.child_dob,
        "childAge": item.child_age,
        "patientGender": item.child_gender,
        "patientPhoneNumber": item.caretaker_phone_number,
        "patientAddress": item.caretaker_address,
        "motherArtNumber": item.mother_id,

        "mothersHIVStatus": item.mother_hiv_status,
        "mothersId": item.mother_id,
        "motherTreatment": item.mother_treatment,
        "infantRapidHIVTest": item.rapid_test_performed,
        "testDate": item.rapid_test_date,
        "rapidTestResult": item.rapid_test_result,
        "infantBreastfeeding": item.has_infant_stopped_breastfeeding,
        "ageBfeedingStopped": item.age_breastfeeding_stopped_in_months,
        "pcrTest": item.pcr_test_performed_before,
        "previousPcrResult": item.previous_pcr_result,
        "previousTestDate": item.last_pcr_date,
        "reasonPcr2Test": item.reason_for_pcr,

        "sampleCollectionDate": item.sample_collection_date,
        "specimenType": item.specimen_type,
        "requestingOfficer": item.sample_requestor_name,
        "requestingOfficerPhone": item.sample_requestor_phone,

        "sampleReceivedDate": item.sample_received_at_vl_lab_datetime,
        "testPlatform": item.eid_test_platform,
        "isSampleRejected": item.is_sample_rejected,
        "rejectionReason": item.reason_for_sample_rejection,
        "rejectionReasonId": item.sample_rejection_id,
        "rejectionDate": item.rejection_on,
        "reasonForChanging": item.reason_for_changing,
        "machineUsed": item.import_machine_name, //crossCheck
        "sampleTestDate": item.sample_tested_datetime,
        "testedBy": item.tested_by,
        "testResult": item.result,
        
        "approvedBy": item.result_approved_by,
        "approvedOn": item.result_approved_datetime,
        

      }
    })
  }
  async eidSyncArray(items) {
    return this.eidItemsArray = items.map(function (item) {
      return {
        "user_id": item.user_id,
        "uniqueId":item.unique_id,
        "appSampleCode": item.app_sample_code,
        "eid_id": item.eid_id,
        "sampleCode": item.sample_code,
        "remoteSampleCode": item.remote_sample_code,
        "createdOn": item.request_created_datetime,
        "updatedOn": item.last_modified_datetime,
        "isSynced": item.is_synced,
        "authToken": item.api_token,
        "formId": item.vlsm_country_id,

        "provinceId": item.province_id,
        "provinceName":item.province_name,
        "district": item.district,
        "district_id": item.facility_district_id,
        "facilityId": item.facility_id,
        "facilityName": item.facility_name, //
        "implementingPartner": item.implementing_partner,
        "fundingSource": item.funding_source,
        "labId": item.lab_id,

        "childTreatment": item.child_treatment,
        "choiceOfFeeding": item.choice_of_feeding,
        "isCotrimoxazoleBeingAdministered": item.is_cotrimoxazole_being_administered_to_the_infant,
        "motherTreatmentOther": item.mother_treatment_other,
        "motherViralLoadText": item.mother_vl_result,
        "motherViralLoadCopiesPerMl": item.mother_vl_result,
        "mothercd4": item.mother_cd4,
        "mothersDob": item.mother_dob,
        "mothersMaritalStatus": item.mother_marital_status,
        "mothersName": item.mother_name,
        "reviewedBy": item.result_reviewed_by,
        "reviewedOn": item.result_reviewed_datetime,

        "childId": item.child_id,
        "childName": item.child_name,
        "childSurName": item.child_surname,
        "childDob": item.child_dob,
        "childAge": item.child_age,
        "childGender": item.child_gender,
        "mothersId": item.mother_id,
        "caretakerPhoneNumber": item.caretaker_phone_number,
        "caretakerAddress": item.caretaker_address,

        "mothersHIVStatus": item.mother_hiv_status,
        "motherTreatment": item.mother_treatment,
        "rapidTestPerformed": item.rapid_test_performed,
        "rapidtestDate": item.rapid_test_date,
        "rapidTestResult": item.rapid_test_result,
        "hasInfantStoppedBreastfeeding": item.has_infant_stopped_breastfeeding,
        "ageBreastfeedingStopped": item.age_breastfeeding_stopped_in_months,
        "pcrTestPerformedBefore": item.pcr_test_performed_before,
        "prePcrTestResult": item.previous_pcr_result,
        "previousPCRTestDate": item.last_pcr_date,
        "pcrTestReason": item.reason_for_pcr,


        "sampleCollectionDate": item.sample_collection_date,
        "specimenType": item.specimen_type,
        "sampleRequestorName": item.sample_requestor_name,
        "sampleRequestorPhone": item.sample_requestor_phone,


        "sampleReceivedDate": item.sample_received_at_vl_lab_datetime,
        "eidPlatform": item.eid_test_platform,
        "isSampleRejected": item.is_sample_rejected,
        "sampleRejectionReason": item.reason_for_sample_rejection,
        "rejectionReasonId": item.sample_rejection_id,
        "reasonForEidResultChanges": item.reason_for_changing,
        "rejectionDate": item.rejection_on,
        "machineName": item.import_machine_name,
        "sampleTestedDateTime": item.sample_tested_datetime,
        "result": item.result,
        "testedBy": item.tested_by,
        "approvedBy": item.result_approved_by,
        "approvedOn": item.result_approved_datetime,

      }
    })
  }
  async vlKeysArray(items){
    return this.vlItemsArray = items.map(function (item) {
      return {

        "vl_sample_id": item.vl_sample_id,
        "uniqueId":item.unique_id,
        "appSampleCode": item.app_sample_code,
        "sampleCode": item.sample_code,
        "remoteSampleCode": item.remote_sample_code,
        "createdOn": item.request_created_datetime,
        "updatedOn": item.last_modified_datetime,
        "isSynced": item.is_synced, //
        "authToken": item.api_token, //
        "formId": item.vlsm_country_id, //
        "communitySample": item.community_sample,
        "sampleDispatchedOn": item.sample_dispatched_datetime,
        "sampleReordered": item.sample_reordered,
        "provinceId": item.province_id,
        "provinceName":item.province_name,
        "district": item.district,
        "district_id": item.facility_district_id,
        "facilityId": item.facility_id,
        "facilityName": item.facility_name, //
        "implementingPartner": item.implementing_partner,
        "implementingPartnerName":item.implementing_partner_name,
        "fundingSource": item.funding_source,
        "labId": item.lab_id,

        "patientId": item.patient_art_no,
        "externalSampleCode": item.external_sample_code, //
        "firstName": item.patient_first_name,
        "lastName": item.patient_last_name,
        "patientDob": item.patient_dob,
        "patientAge": item.patient_age_in_years,
        "patientAgeinMonths": item.patient_age_in_months,
        "patientGender": item.patient_gender,
        "patientPhoneNumber": item.patient_mobile_number,
        "patientConsent": item.consent_to_receive_sms,

        "sampleCollectionDate": item.sample_collection_date,
        "specimenType": item.sample_type,

        "doTreatmentInit": item.treatment_initiated_date,
        "currentRegimen": item.current_regimen,
        "doInitCuurentRegimen": item.date_of_initiation_of_current_regimen,
        "arvAdherence": item.arv_adherance_percentage,
        "isPatientPregnant": item.is_patient_pregnant,
        "isPatientBreastfeeding": item.is_patient_breastfeeding,
        "trimester": item.pregnancy_trimester,
        

        "rtnDoViralLoadTest": item.last_vl_date_routine,
        "rtnVlValue": item.last_vl_result_routine,
        "rptDoViralLoadTest": item.last_vl_date_failure_ac,
        "rptVlValue": item.last_vl_result_failure_ac,
        "stfDoViralLoadTest": item.last_vl_date_failure,
        "stfVlValue": item.last_vl_result_failure,
        "requestClinician": item.request_clinician_name,
        "phoneNumber": item.request_clinician_phone_number,
        "requestDate": item.test_requested_on,

        "labName": item.lab_name,
        "vlFocalPerson": item.vl_focal_person,
        "vlFocalPhoneNo": item.vl_focal_person_phone_number,
        "sampleReceivedDateTimeAtHub": item.sample_received_at_hub_datetime,
        "sampleReceivedDateTimeAtTestLab": item.sample_received_at_vl_lab_datetime,
        "resultValueHivDetection": item.result_value_hiv_detection,
        "vlTestPlatform": item.vl_test_platform,
        "isSampleRejected": item.is_sample_rejected,
        "rejectionReason": item.reason_for_sample_rejection,
        "rejectionReasonId": item.sample_rejection_id,
        "rejectionDate": item.rejection_on,
        "reasonForChanging": item.reason_for_changing,
        "vlResult": item.result_value_absolute,
        "resultIn": item.result,
        "result": item.result,
        "vlLog": item.result_value_log,
        "dateResultDispatch": item.result_dispatched_datetime,
        "testedBy": item.tested_by,
        "approvedBy": item.result_approved_by,
        "approvedOn": item.result_approved_datetime,
        "labTechComments": item.facility_comments,

        "serialNo": item.serial_no,
        "dateOfDemand": item.date_test_ordered_by_physician,
        "isPatientNew": item.is_patient_new,
        "hasChangedRegimen": item.has_patient_changed_regimen,
        "reasonForArvRegimenChange": item.reason_for_regimen_change,
        "dateOfArvRegimenChange": item.regimen_change_date,
        "vlTestReason": item.reason_for_vl_testing,
        "viralLoadNo": item.vl_test_number,
        "lastViralLoadResult": item.last_viral_load_result,
        "lastViralLoadTestDate": item.last_viral_load_date,
        "dateDispatchedFromClinicToLab": item.date_dispatched_from_clinic_to_lab,
        "status": item.result_status,
        "sampleTestDate": item.sample_tested_datetime,
        "reviewedBy": item.result_reviewed_by,
        "reviewedOn": item.result_reviewed_datetime

      }

    })
  }  
  async vlSyncsArray(items){
    return this.vlItemsArray = items.map(function (item) {
      console.log(item)
      return {
        "vl_sample_id": item.vl_sample_id,
        "uniqueId":item.unique_id,
        "appSampleCode": item.app_sample_code,
        "sampleCode": item.sample_code,
        "remoteSampleCode": item.remote_sample_code,
        "createdOn": item.request_created_datetime,
        "updatedOn": item.last_modified_datetime,
        "isSynced": item.is_synced, //
        "authToken": item.api_token, //
        "formId": item.vlsm_country_id, //

        "sampleReordered": item.sample_reordered,
        "communitySample": item.community_sample,
        "provinceId": item.province_id,
        "provinceName":item.province_name,
        "district": item.district,
        "district_id": item.facility_district_id,
        "facilityId": item.facility_id,
        "facilityName": item.facility_name, //
        "implementingPartner": item.implementing_partner,
        "implementingPartnerName":item.implementing_partner_name,
        "fundingSource": item.funding_source,
        "labId": item.lab_id,

        "patientArtNo": item.patient_art_no,
        "externalSampleCode": item.external_sample_code, //
        "patientFirstName": item.patient_first_name,
        "patientLastName": item.patient_last_name,
        "patientDob": item.patient_dob,
        "ageInYears": item.patient_age_in_years,
        "ageInMonths": item.patient_age_in_months,
        "patientGender": item.patient_gender,
        "patientPhoneNumber": item.patient_mobile_number,
        "receiveSms": item.consent_to_receive_sms,

        "sampleCollectionDate": item.sample_collection_date,
        "sampleDispatchedOn": item.sample_dispatched_datetime,
        "specimenType": item.sample_type,

        "dateOfArtInitiation": item.treatment_initiated_date,
        "artRegimen": item.current_regimen,
        "regimenInitiatedOn": item.date_of_initiation_of_current_regimen,
        "arvAdherence": item.arv_adherance_percentage,
        "patientPregnant": item.is_patient_pregnant,
        "breastfeeding": item.is_patient_breastfeeding,
        "trimester": item.pregnancy_trimester,

        "rmTestingLastVLDate": item.last_vl_date_routine,
        "rmTestingVlValue": item.last_vl_result_routine,
        "repeatTestingLastVLDate": item.last_vl_date_failure_ac,
        "repeatTestingVlValue": item.last_vl_result_failure_ac,
        "suspendTreatmentLastVLDate": item.last_vl_date_failure,
        "suspendTreatmentVlValue": item.last_vl_result_failure,
        "reqClinician": item.request_clinician_name,
        "reqClinicianPhoneNumber": item.request_clinician_phone_number,
        "requestDate": item.test_requested_on,

        "labName": item.lab_name,
        "vlFocalPerson": item.vl_focal_person,
        "vlFocalPersonPhoneNumber": item.vl_focal_person_phone_number,
        "sampleReceivedAtHubOn": item.sample_received_at_hub_datetime,
        "sampleReceivedDate": item.sample_received_at_vl_lab_datetime,
        // "sampleTestingDateAtLab": item.sample_testing_date,
        "testingPlatform": item.vl_test_platform,
        "isSampleRejected": item.is_sample_rejected,
        "rejectionDate": item.rejection_on,
        "rejectionReason": item.sample_rejection_id,
        "rejectionReasonId": item.reason_for_sample_rejection,
        "reasonForVlResultChanges": item.reason_for_changing,
        "vlResult": item.result_value_absolute,
        "vlResultAbsoluteDecimal": item.result_value_log,
        "result": item.result,
        "vlLog": item.result_value_log,
        "resultDispatchedOn": item.result_dispatched_datetime,
        "testedBy": item.tested_by,
        "approvedBy": item.result_approved_by,
        "approvedOnDateTime": item.result_approved_datetime,
        "labComments": item.facility_comments,

        "serialNo": item.serial_no,
        "dateOfDemand": item.date_test_ordered_by_physician,
        "isPatientNew": item.is_patient_new,
        "hasChangedRegimen": item.has_patient_changed_regimen,
        "reasonForArvRegimenChange": item.reason_for_regimen_change,
        "dateOfArvRegimenChange": item.regimen_change_date,
        "vlTestReason": item.reason_for_vl_testing,
        "viralLoadNo": item.vl_test_number,
        "lastViralLoadResult": item.last_viral_load_result,
        "lastViralLoadTestDate": item.last_viral_load_date,
        "dateDispatchedFromClinicToLab": item.date_dispatched_from_clinic_to_lab,
        "status": item.result_status,
        "sampleTestingDateAtLab": item.sample_tested_datetime,
        "reviewedBy": item.result_reviewed_by,
        "reviewedOn": item.result_reviewed_datetime,
        "hivDetection": item.result_value_hiv_detection

      }

    })
  }

  async getpatientZone() {
    const data = await this.dbStorage.executeSql(`SELECT DISTINCT patient_zone FROM form_covid19 WHERE patient_zone IS NOT NULL`, []);
    let patientZones = [];
    for (let i = 0; i < data.rows.length; i++) {
        patientZones.push(data.rows.item(i).patient_zone);
    }
    return patientZones; // Return the patientZones array
}

  async getProvinceList() {
    // debugger;
    const data = await this.dbStorage.executeSql('SELECT DISTINCT facility_state_id as province_id, facility_state as province_name from facility_details where status like "active" ', []);
    this.provinceDetailsArray = [];
    // debugger;
    for (let i = 0; i < data.rows.length; i++) {
      let item = data.rows.item(i);
      this.provinceDetailsArray.push(item);
    }
    return this.provinceDetailsArray;
  }

  async getDistrictList(provinceID) {
    const data = await this.dbStorage.executeSql('SELECT DISTINCT facility_district_id as district_id, facility_district as district_name from facility_details where facility_state_id =? AND status like "active"', [provinceID]);
    this.districtDetailsArray = [];
    for (let i = 0; i < data.rows.length; i++) {
      let item = data.rows.item(i);
      this.districtDetailsArray.push(item);
    }
    return this.districtDetailsArray;
  }

  async getFacilitiesList(districtID) {
    const data = await this.dbStorage.executeSql('SELECT DISTINCT facility_id, facility_name from facility_details where facility_district_id = ? and status like "active"', [districtID]);
    this.facilitiesDetailsArray = [];
    for (let i = 0; i < data.rows.length; i++) {
      let item = data.rows.item(i);
      this.facilitiesDetailsArray.push(item);
    }
    return this.facilitiesDetailsArray;
  }

  async tokenUpdate(updatedToken){
    await this.storage.get('loginDetails').then(async (loginDetails) => {
      if (loginDetails) {

        var access = loginDetails['access'];
        var api_token = updatedToken;
        var appMenuName = loginDetails['appMenuName'];
        var user = loginDetails['user'];
        var form = loginDetails['form'];

        this.data = {access,api_token,appMenuName,user,form};
        await this.storage.set('loginDetails', this.data);
      }
    })
  }

}
