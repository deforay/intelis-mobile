DROP TABLE IF EXISTS "activity_log";
CREATE TABLE IF NOT EXISTS "activity_log" (
	"log_id"	int NOT NULL,
	"event_type"	TEXT DEFAULT NULL,
	"action"	mediumtext,
	"resource"	TEXT DEFAULT NULL,
	"date_time"	datetime DEFAULT NULL,
	"ip_address"	TEXT DEFAULT NULL,
	PRIMARY KEY("log_id")
);
 DROP TABLE IF EXISTS "version_history";
CREATE TABLE IF NOT EXISTS "version_history"(
  "versionNumber"	TEXT NOT NULL,
  	"updatedAt"	TEXT NOT NULL
);

DROP TABLE IF EXISTS "batch_details";
CREATE TABLE IF NOT EXISTS "batch_details" (
	"batch_id"	int NOT NULL,
	"machine"	int NOT NULL,
	"batch_code"	TEXT DEFAULT NULL,
	"batch_code_key"	TEXT DEFAULT NULL,
	"test_type"	TEXT DEFAULT NULL,
	"batch_status"	TEXT NOT NULL DEFAULT 'completed',
	"sent_mail"	TEXT NOT NULL DEFAULT 'no',
	"label_order"	mediumtext,
	"request_created_datetime"	datetime NOT NULL,
	PRIMARY KEY("batch_id")
);

DROP TABLE IF EXISTS "contact_notes_details";
CREATE TABLE IF NOT EXISTS "contact_notes_details" (
	"contact_notes_id"	int NOT NULL,
	"treament_contact_id"	int DEFAULT NULL,
	"contact_notes"	mediumtext,
	"collected_on"	date DEFAULT NULL,
	"added_on"	datetime DEFAULT NULL,
	FOREIGN KEY("treament_contact_id") REFERENCES "vl_request_form"("vl_sample_id"),
	PRIMARY KEY("contact_notes_id")
);
DROP TABLE IF EXISTS "covid19_imported_controls";
CREATE TABLE IF NOT EXISTS "covid19_imported_controls" (
	"control_id"	int NOT NULL,
	"control_code"	TEXT NOT NULL,
	"lab_id"	int DEFAULT NULL,
	"batch_id"	int DEFAULT NULL,
	"control_type"	TEXT DEFAULT NULL,
	"lot_number"	TEXT DEFAULT NULL,
	"lot_expiration_date"	date DEFAULT NULL,
	"tested_by"	TEXT DEFAULT NULL,
	"sample_tested_datetime"	datetime DEFAULT NULL,
	"is_sample_rejected"	TEXT DEFAULT NULL,
	"reason_for_sample_rejection"	TEXT DEFAULT NULL,
	"result"	TEXT DEFAULT NULL,
	"approver_comments"	TEXT DEFAULT NULL,
	"result_approved_by"	TEXT DEFAULT NULL,
	"result_approved_datetime"	datetime DEFAULT NULL,
	"result_reviewed_by"	TEXT DEFAULT NULL,
	"result_reviewed_datetime"	datetime DEFAULT NULL,
	"status"	TEXT DEFAULT NULL,
	"vlsm_country_id"	TEXT DEFAULT NULL,
	"file_name"	TEXT DEFAULT NULL,
	"imported_date_time"	datetime DEFAULT NULL,
	PRIMARY KEY("control_id")
);
DROP TABLE IF EXISTS "covid19_patient_comorbidities";
CREATE TABLE IF NOT EXISTS "covid19_patient_comorbidities" (
	"covid19_id"	int NOT NULL,
	"comorbidity_id"	int NOT NULL,
	"comorbidity_detected"	TEXT NOT NULL,
	PRIMARY KEY("covid19_id","comorbidity_id")
);
DROP TABLE IF EXISTS "covid19_patient_symptoms";
CREATE TABLE IF NOT EXISTS "covid19_patient_symptoms" (
	"covid19_id"	int NOT NULL,
	"symptom_id"	int NOT NULL,
	"symptom_detected"	TEXT NOT NULL,
	"symptom_details"	text,
	PRIMARY KEY("covid19_id","symptom_id")
);
DROP TABLE IF EXISTS "covid19_positive_confirmation_manifest";
CREATE TABLE IF NOT EXISTS "covid19_positive_confirmation_manifest" (
	"manifest_id"	int NOT NULL,
	"manifest_code"	TEXT NOT NULL,
	"added_by"	TEXT NOT NULL,
	"manifest_status"	TEXT DEFAULT NULL,
	"module"	TEXT DEFAULT NULL,
	"request_created_datetime"	datetime DEFAULT NULL,
	PRIMARY KEY("manifest_id")
);
DROP TABLE IF EXISTS "covid19_reasons_for_testing";
CREATE TABLE IF NOT EXISTS "covid19_reasons_for_testing" (
	"covid19_id"	int NOT NULL,
	"reasons_id"	int DEFAULT NULL,
	"reasons_detected"	TEXT DEFAULT NULL,
	"reason_details"	text
);
DROP TABLE IF EXISTS "covid19_tests";
CREATE TABLE IF NOT EXISTS "covid19_tests" (
	"test_id" INTEGER PRIMARY KEY,
	"unique_id" TEXT NOT NULL,
	"covid19_id" int NOT NULL,
	"facility_id" int DEFAULT NULL,
	"test_name"	TEXT DEFAULT NULL,
	"tested_by"	TEXT DEFAULT NULL,
	"sample_tested_datetime" datetime DEFAULT NULL,
	"testing_platform" TEXT DEFAULT NULL,
	"kitLotNo" TEXT DEFAULT NULL,
	"kitExpiryDate" date DEFAULT NULL,
	"result" TEXT DEFAULT NULL
);
DROP TABLE IF EXISTS "eid_form";
CREATE TABLE IF NOT EXISTS "eid_form" (
	"eid_id"	INTEGER NOT NULL,
	"unique_id" NOT NULL UNIQUE,
	"is_synced"	TEXT,
	"app_sample_code"	text UNIQUE,
	"user_id"	TEXT NOT NULL,
	"vlsm_instance_id"	TEXT DEFAULT NULL,
	"vlsm_country_id"	int DEFAULT NULL,
	"sample_code_key"	int DEFAULT NULL,
	"sample_code_format"	TEXT DEFAULT NULL,
	"sample_code"	TEXT DEFAULT NULL,
	"remote_sample"	TEXT NOT NULL DEFAULT 'no',
	"remote_sample_code_key"	int DEFAULT NULL,
	"remote_sample_code_format"	TEXT DEFAULT NULL,
	"remote_sample_code"	TEXT DEFAULT NULL,
	"sample_collection_date"	datetime NOT NULL,
	"sample_received_at_hub_datetime"	datetime DEFAULT NULL,
	"sample_received_at_vl_lab_datetime"	datetime DEFAULT NULL,
	"sample_tested_datetime"	datetime DEFAULT NULL,
	"funding_source"	int DEFAULT NULL,
	"implementing_partner"	int DEFAULT NULL,
	"is_sample_rejected"	TEXT DEFAULT NULL,
	"reason_for_sample_rejection"	TEXT DEFAULT NULL,
	"sample_rejection_id" TEXT DEFAULT NULL,
	"district"	text,
	"facility_district_id" TEXT DEFAULT NULL,
	"facility_name"	text,
	"facility_id"	int DEFAULT NULL,
	"province_name"	text,
	"province_id"	int DEFAULT NULL,
	"mother_id"	TEXT DEFAULT NULL,
	"mother_name"	TEXT DEFAULT NULL,
	"mother_surname"	TEXT DEFAULT NULL,
	"caretaker_contact_consent"	TEXT DEFAULT NULL,
	"caretaker_phone_number"	TEXT DEFAULT NULL,
	"caretaker_address"	TEXT DEFAULT NULL,
	"mother_dob"	date DEFAULT NULL,
	"mother_age_in_years"	TEXT DEFAULT NULL,
	"mother_marital_status"	TEXT DEFAULT NULL,
	"child_id"	TEXT DEFAULT NULL,
	"child_name"	TEXT DEFAULT NULL,
	"child_surname"	TEXT DEFAULT NULL,
	"child_dob"	date DEFAULT NULL,
	"child_age"	TEXT DEFAULT NULL,
	"child_gender"	TEXT DEFAULT NULL,
	"mother_hiv_status"	TEXT DEFAULT NULL,
	"mode_of_delivery"	TEXT DEFAULT NULL,
	"mother_treatment"	TEXT DEFAULT NULL,
	"mother_treatment_other"	TEXT DEFAULT NULL,
	"mother_treatment_initiation_date"	date DEFAULT NULL,
	"mother_cd4"	TEXT DEFAULT NULL,
	"mother_cd4_test_date"	date DEFAULT NULL,
	"mother_vl_result"	TEXT DEFAULT NULL,
	"mother_vl_test_date"	TEXT DEFAULT NULL,
	"child_treatment"	TEXT DEFAULT NULL,
	"child_treatment_other"	TEXT DEFAULT NULL,
	"is_infant_receiving_treatment"	TEXT DEFAULT NULL,
	"has_infant_stopped_breastfeeding"	TEXT DEFAULT NULL,
	"age_breastfeeding_stopped_in_months"	TEXT DEFAULT NULL,
	"choice_of_feeding"	TEXT DEFAULT NULL,
	"is_cotrimoxazole_being_administered_to_the_infant"	TEXT DEFAULT NULL,
	"sample_requestor_name"	TEXT DEFAULT NULL,
	"sample_requestor_phone"	TEXT DEFAULT NULL,
	"specimen_quality"	TEXT DEFAULT NULL,
	"specimen_type"	TEXT DEFAULT NULL,
	"reason_for_eid_test"	int DEFAULT NULL,
	"pcr_test_performed_before"	TEXT DEFAULT NULL,
	"last_pcr_id"	TEXT DEFAULT NULL,
	"previous_pcr_result"	TEXT DEFAULT NULL,
	"last_pcr_date"	date DEFAULT NULL,
	"reason_for_pcr"	TEXT DEFAULT NULL,
	"rapid_test_performed"	TEXT DEFAULT NULL,
	"rapid_test_date"	date DEFAULT NULL,
	"rapid_test_result"	TEXT DEFAULT NULL,
	"lab_id"	int DEFAULT NULL,
	"lab_technician"	TEXT DEFAULT NULL,
	"lab_reception_person"	TEXT DEFAULT NULL,
	"eid_test_platform"	TEXT DEFAULT NULL,
	"result_status"	int DEFAULT NULL,
	"locked"	TEXT NOT NULL DEFAULT 'no',
	"result"	TEXT DEFAULT NULL,
	"rejection_on"	date DEFAULT NULL,
	"reason_for_changing"	text,
	"tested_by"	TEXT DEFAULT NULL,
	"result_reviewed_datetime"	datetime DEFAULT NULL,
	"result_reviewed_by"	TEXT DEFAULT NULL,
	"result_approved_datetime"	datetime DEFAULT NULL,
	"result_approved_by"	TEXT DEFAULT NULL,
	"approver_comments"	TEXT DEFAULT NULL,
	"result_dispatched_datetime"	datetime DEFAULT NULL,
	"result_mail_datetime"	datetime DEFAULT NULL,
	"manual_result_entry"	TEXT DEFAULT 'no',
	"import_machine_name"	TEXT DEFAULT NULL,
	"import_machine_file_name"	TEXT DEFAULT NULL,
	"result_printed_datetime"	datetime DEFAULT NULL,
	"request_created_datetime"	datetime DEFAULT NULL,
	"request_created_by"	TEXT DEFAULT NULL,
	"sample_registered_at_lab"	datetime DEFAULT NULL,
	"last_modified_datetime"	datetime DEFAULT NULL,
	"last_modified_by"	TEXT DEFAULT NULL,
	"sample_batch_id"	int DEFAULT NULL,
	"sample_package_id"	TEXT DEFAULT NULL,
	"sample_package_code"	TEXT DEFAULT NULL,
	"lot_number"	TEXT DEFAULT NULL,
	"source_of_request"	TEXT DEFAULT NULL,
	"source_data_dump"	text,
	"result_sent_to_source"	text,
	"lot_expiration_date"	date DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("eid_id" AUTOINCREMENT)
);
DROP TABLE IF EXISTS "eid_imported_controls";
CREATE TABLE IF NOT EXISTS "eid_imported_controls" (
	"control_id"	int NOT NULL,
	"control_code"	TEXT NOT NULL,
	"lab_id"	int DEFAULT NULL,
	"batch_id"	int DEFAULT NULL,
	"control_type"	TEXT DEFAULT NULL,
	"lot_number"	TEXT DEFAULT NULL,
	"lot_expiration_date"	date DEFAULT NULL,
	"tested_by"	TEXT DEFAULT NULL,
	"sample_tested_datetime"	datetime DEFAULT NULL,
	"is_sample_rejected"	TEXT DEFAULT NULL,
	"reason_for_sample_rejection"	TEXT DEFAULT NULL,
	"result"	TEXT DEFAULT NULL,
	"approver_comments"	TEXT DEFAULT NULL,
	"result_approved_by"	TEXT DEFAULT NULL,
	"result_approved_datetime"	datetime DEFAULT NULL,
	"result_reviewed_by"	TEXT DEFAULT NULL,
	"result_reviewed_datetime"	datetime DEFAULT NULL,
	"status"	TEXT DEFAULT NULL,
	"vlsm_country_id"	TEXT DEFAULT NULL,
	"file_name"	TEXT DEFAULT NULL,
	"imported_date_time"	datetime DEFAULT NULL,
	PRIMARY KEY("control_id")
);
DROP TABLE IF EXISTS "facility_details";
CREATE TABLE IF NOT EXISTS "facility_details" (
	"facility_id"	int NOT NULL,
	"facility_name"	TEXT DEFAULT NULL,
	"facility_code"	TEXT DEFAULT NULL,
	"email"	TEXT DEFAULT NULL,
	"vlsm_instance_id"	TEXT DEFAULT NULL,
	"other_id"	TEXT DEFAULT NULL,
	"facility_emails"	TEXT DEFAULT NULL,
	"report_email"	mediumtext,
	"contact_person"	TEXT DEFAULT NULL,
	"facility_mobile_numbers"	TEXT DEFAULT NULL,
	"address"	TEXT DEFAULT NULL,
	"country"	TEXT DEFAULT NULL,
	"facility_state"	TEXT DEFAULT NULL,
	"facility_state_id" TEXT DEFAULT NULL,
	"facility_district"	TEXT DEFAULT NULL,
	"facility_district_id" TEXT DEFAULT NULL,
	"facility_hub_name"	TEXT DEFAULT NULL,
	"latitude"	TEXT DEFAULT NULL,
	"longitude"	TEXT DEFAULT NULL,
	"facility_type"	int DEFAULT NULL,
	"testing_points"	json DEFAULT NULL,
	"facility_logo"	TEXT DEFAULT NULL,
	"header_text"	TEXT DEFAULT NULL,
	"status"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	"test_type"	TEXT DEFAULT NULL,
	PRIMARY KEY("facility_id")
);
DROP TABLE IF EXISTS "facility_type";
CREATE TABLE IF NOT EXISTS "facility_type" (
	"facility_type_id"	int NOT NULL,
	"facility_type_name"	TEXT DEFAULT NULL,
	PRIMARY KEY("facility_type_id")
);
DROP TABLE IF EXISTS "form_covid19";
CREATE TABLE IF NOT EXISTS "form_covid19" (
	"user_id"	TEXT NOT NULL,
	"covid19_id"	INTEGER NOT NULL,
	"unique_id" NOT NULL UNIQUE,
	"vlsm_instance_id"	text,
	"vlsm_country_id"	int DEFAULT NULL,
	"sample_code_key"	int DEFAULT NULL,
	"sample_code_format"	text,
	"sample_code"	text,
	"external_sample_code"	text,
	"test_number"	int DEFAULT NULL,
	"remote_sample"	TEXT DEFAULT 'no',
	"remote_sample_code_key"	int DEFAULT NULL,
	"remote_sample_code_format"	text,
	"remote_sample_code"	text,
	"sample_collection_date"	datetime NOT NULL,
	"sample_received_at_hub_datetime"	datetime DEFAULT NULL,
	"sample_received_at_vl_lab_datetime"	datetime DEFAULT NULL,
	"sample_condition"	text,
	"tested_by"	text,
	"sample_tested_datetime"	datetime DEFAULT NULL,
	"funding_source"	int DEFAULT NULL,
	"implementing_partner"	int DEFAULT NULL,
	"source_of_alert"	text,
	"source_of_alert_other"	text,
	"facility_id"	int DEFAULT NULL,
	"province_id"	int DEFAULT NULL,
	"patient_id"	text,
	"patient_name"	text,
	"patient_surname"	text,
	"patient_dob"	date DEFAULT NULL,
	"patient_age"	text,
	"patient_gender"	text,
	"is_patient_pregnant"	text,
	"patient_phone_number"	text,
	"patient_nationality"	text,
	"patient_passport_number"	text,
	"patient_occupation"	text,
	"does_patient_smoke"	text,
	"patient_address"	TEXT DEFAULT NULL,
	"flight_airline"	text,
	"flight_seat_no"	text,
	"flight_arrival_datetime"	datetime DEFAULT NULL,
	"flight_airport_of_departure"	text,
	"flight_transit"	text,
	"reason_of_visit"	TEXT DEFAULT NULL,
	"is_sample_collected"	text,
	"reason_for_covid19_test"	int DEFAULT NULL,
	"type_of_test_requested"	text,
	"patient_province"	text,
	"patient_district"	text,
	"patient_zone"	text,
	"patient_city"	text,
	"specimen_type"	text,
	"is_sample_post_mortem"	text,
	"priority_status"	text,
	"number_of_days_sick"	int DEFAULT NULL,
	"date_of_symptom_onset"	date DEFAULT NULL,
	"suspected_case"	text,
	"date_of_initial_consultation"	date DEFAULT NULL,
	"medical_history"	text,
	"recent_hospitalization"	text,
	"patient_lives_with_children"	text,
	"patient_cares_for_children"	text,
	"fever_temp"	text,
	"temperature_measurement_method"	text,
	"respiratory_rate"	int DEFAULT NULL,
	"oxygen_saturation"	double DEFAULT NULL,
	"close_contacts"	text,
	"contact_with_confirmed_case"	text,
	"has_recent_travel_history"	text,
	"travel_country_names"	text,
	"travel_return_date"	date DEFAULT NULL,
	"lab_id"	int DEFAULT NULL,
	"testing_point"	text,
	"lab_technician"	text,
	"investogator_name"	text,
	"investigator_phone"	text,
	"investigator_email"	text,
	"clinician_name"	text,
	"clinician_phone"	text,
	"clinician_email"	text,
	"health_outcome"	text,
	"health_outcome_date"	date DEFAULT NULL,
	"lab_reception_person"	text,
	"covid19_test_platform"	text,
	"result_status"	int DEFAULT NULL,
	"locked"	TEXT NOT NULL DEFAULT 'no',
	"is_sample_rejected"	text,
	"reason_for_sample_rejection"	TEXT DEFAULT NULL,
	"sample_rejection_id" TEXT DEFAULT NULL,
	"rejection_on"	date DEFAULT NULL,
	"result"	text,
	"if_have_other_diseases"	TEXT DEFAULT NULL,
	"other_diseases"	text,
	"is_result_authorised"	text,
	"authorized_by"	text,
	"authorized_on"	date DEFAULT NULL,
	"reason_for_changing"	text,
	"result_reviewed_datetime"	datetime DEFAULT NULL,
	"result_reviewed_by"	text,
	"result_approved_datetime"	datetime DEFAULT NULL,
	"result_approved_by"	text,
	"approver_comments"	TEXT DEFAULT NULL,
	"result_dispatched_datetime"	datetime DEFAULT NULL,
	"result_mail_datetime"	datetime DEFAULT NULL,
	"manual_result_entry"	TEXT DEFAULT 'no',
	"import_machine_name"	text,
	"import_machine_file_name"	text,
	"result_printed_datetime"	datetime DEFAULT NULL,
	"request_created_datetime"	datetime DEFAULT NULL,
	"request_created_by"	text,
	"sample_registered_at_lab"	datetime DEFAULT NULL,
	"sample_batch_id"	int DEFAULT NULL,
	"sample_package_id"	text,
	"sample_package_code"	text,
	"positive_test_manifest_id"	int DEFAULT NULL,
	"positive_test_manifest_code"	text,
	"lot_number"	text,
	"source_of_request"	text,
	"source_data_dump"	text,
	"result_sent_to_source"	text,
	"lot_expiration_date"	date DEFAULT NULL,
	"is_result_mail_sent"	TEXT DEFAULT 'no',
	"app_sample_code"	text UNIQUE,
	"last_modified_datetime"	datetime DEFAULT NULL,
	"last_modified_by"	text,
	"data_sync"	int NOT NULL DEFAULT '0',
	"province_name"	text,
	"facility_name"	text,
	"implementing_partner_name"	text,
	"funding_source_name"	text,
	"lab_name"	text,
	"patient_province_id"	text,
	"patient_nationality_name"	text,
	"lab_technician_name"	text,
	"tested_by_name"	text,
	"created_on"	datetime DEFAULT NULL,
	"is_synced"	TEXT,
	"district"	text,
	"patientEmail" TEXT DEFAULT NULL,
	"asymptomatic" TEXT DEFAULT NULL,
	"sample_dispatched_datetime" datetime DEFAULT NULL,	
	FOREIGN KEY("user_id") REFERENCES "user_details"("user_id"),
	PRIMARY KEY("covid19_id" AUTOINCREMENT)
);

DROP TABLE IF EXISTS "form_hepatitis";
CREATE TABLE IF NOT EXISTS "form_hepatitis" (
	"hepatitis_id"	int NOT NULL,
	"vlsm_instance_id"	TEXT DEFAULT NULL,
	"vlsm_country_id"	int DEFAULT NULL,
	"sample_code_key"	int DEFAULT NULL,
	"sample_code_format"	TEXT DEFAULT NULL,
	"sample_code"	TEXT DEFAULT NULL,
	"external_sample_code"	TEXT DEFAULT NULL,
	"test_number"	int DEFAULT NULL,
	"remote_sample"	TEXT NOT NULL DEFAULT 'no',
	"remote_sample_code_key"	int DEFAULT NULL,
	"remote_sample_code_format"	TEXT DEFAULT NULL,
	"remote_sample_code"	TEXT DEFAULT NULL,
	"sample_collection_date"	datetime NOT NULL,
	"sample_received_at_hub_datetime"	datetime DEFAULT NULL,
	"sample_received_at_vl_lab_datetime"	datetime DEFAULT NULL,
	"sample_condition"	TEXT DEFAULT NULL,
	"sample_tested_datetime"	datetime DEFAULT NULL,
	"funding_source"	int DEFAULT NULL,
	"implementing_partner"	int DEFAULT NULL,
	"facility_id"	int DEFAULT NULL,
	"province_id"	int DEFAULT NULL,
	"patient_id"	TEXT DEFAULT NULL,
	"patient_name"	TEXT DEFAULT NULL,
	"patient_surname"	TEXT DEFAULT NULL,
	"patient_dob"	date DEFAULT NULL,
	"patient_age"	TEXT DEFAULT NULL,
	"patient_gender"	TEXT DEFAULT NULL,
	"patient_phone_number"	TEXT DEFAULT NULL,
	"patient_province"	TEXT DEFAULT NULL,
	"patient_district"	TEXT DEFAULT NULL,
	"patient_city"	TEXT DEFAULT NULL,
	"patient_nationality"	TEXT DEFAULT NULL,
	"patient_occupation"	TEXT DEFAULT NULL,
	"patient_address"	TEXT DEFAULT NULL,
	"patient_marital_status"	TEXT DEFAULT NULL,
	"patient_insurance"	TEXT DEFAULT NULL,
	"hbv_vaccination"	TEXT DEFAULT NULL,
	"is_sample_collected"	TEXT DEFAULT NULL,
	"reason_for_hepatitis_test"	int DEFAULT NULL,
	"type_of_test_requested"	TEXT DEFAULT NULL,
	"reason_for_vl_test"	TEXT DEFAULT NULL,
	"specimen_type"	TEXT DEFAULT NULL,
	"priority_status"	TEXT DEFAULT NULL,
	"lab_id"	int DEFAULT NULL,
	"testing_point"	TEXT DEFAULT NULL,
	"lab_reception_person"	TEXT DEFAULT NULL,
	"hepatitis_test_platform"	TEXT DEFAULT NULL,
	"result_status"	int DEFAULT NULL,
	"locked"	TEXT NOT NULL DEFAULT 'no',
	"is_sample_rejected"	TEXT NOT NULL DEFAULT 'no',
	"reason_for_sample_rejection"	TEXT DEFAULT NULL,
	"rejection_on"	date DEFAULT NULL,
	"result"	TEXT DEFAULT NULL,
	"tested_by"	TEXT DEFAULT NULL,
	"hbsag_result"	TEXT DEFAULT NULL,
	"anti_hcv_result"	TEXT DEFAULT NULL,
	"hcv_vl_result"	TEXT DEFAULT NULL,
	"hbv_vl_result"	TEXT DEFAULT NULL,
	"hcv_vl_count"	TEXT DEFAULT NULL,
	"hbv_vl_count"	TEXT DEFAULT NULL,
	"vl_testing_site"	TEXT DEFAULT NULL,
	"is_result_authorised"	TEXT DEFAULT NULL,
	"authorized_by"	TEXT DEFAULT NULL,
	"authorized_on"	date DEFAULT NULL,
	"reason_for_changing"	text,
	"result_reviewed_datetime"	datetime DEFAULT NULL,
	"result_reviewed_by"	TEXT DEFAULT NULL,
	"result_approved_datetime"	datetime DEFAULT NULL,
	"result_approved_by"	TEXT DEFAULT NULL,
	"approver_comments"	TEXT DEFAULT NULL,
	"result_dispatched_datetime"	datetime DEFAULT NULL,
	"result_mail_datetime"	datetime DEFAULT NULL,
	"manual_result_entry"	TEXT DEFAULT 'no',
	"import_machine_name"	TEXT DEFAULT NULL,
	"import_machine_file_name"	TEXT DEFAULT NULL,
	"result_printed_datetime"	datetime DEFAULT NULL,
	"request_created_datetime"	datetime DEFAULT NULL,
	"request_created_by"	TEXT DEFAULT NULL,
	"sample_registered_at_lab"	datetime DEFAULT NULL,
	"sample_batch_id"	int DEFAULT NULL,
	"sample_package_id"	TEXT DEFAULT NULL,
	"sample_package_code"	TEXT DEFAULT NULL,
	"positive_test_manifest_id"	int DEFAULT NULL,
	"positive_test_manifest_code"	TEXT DEFAULT NULL,
	"lot_number"	TEXT DEFAULT NULL,
	"source_of_request"	TEXT DEFAULT NULL,
	"source_data_dump"	mediumtext,
	"result_sent_to_source"	mediumtext,
	"lot_expiration_date"	date DEFAULT NULL,
	"is_result_mail_sent"	TEXT DEFAULT 'no',
	"last_modified_datetime"	datetime DEFAULT NULL,
	"last_modified_by"	TEXT DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("hepatitis_id")
);
DROP TABLE IF EXISTS "global_config";
CREATE TABLE IF NOT EXISTS "global_config" (
	"display_name"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"value"	TEXT,
	"category"	TEXT DEFAULT NULL,
	"remote_sync_needed"	TEXT DEFAULT NULL,
	"updated_on"	datetime DEFAULT NULL,
	"updated_by"	mediumtext,
	"status"	TEXT NOT NULL DEFAULT 'active',
	PRIMARY KEY("name")
);
DROP TABLE IF EXISTS "health_facilities";
CREATE TABLE IF NOT EXISTS "health_facilities" (
	"test_type"	TEXT NOT NULL,
	"facility_id"	int NOT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	PRIMARY KEY("test_type","facility_id")
);
DROP TABLE IF EXISTS "hepatitis_patient_comorbidities";
CREATE TABLE IF NOT EXISTS "hepatitis_patient_comorbidities" (
	"hepatitis_id"	int NOT NULL,
	"comorbidity_id"	int NOT NULL,
	"comorbidity_detected"	TEXT NOT NULL,
	PRIMARY KEY("hepatitis_id","comorbidity_id")
);
DROP TABLE IF EXISTS "hepatitis_risk_factors";
CREATE TABLE IF NOT EXISTS "hepatitis_risk_factors" (
	"hepatitis_id"	int NOT NULL,
	"riskfactors_id"	int NOT NULL,
	"riskfactors_detected"	TEXT NOT NULL,
	PRIMARY KEY("hepatitis_id","riskfactors_id")
);
DROP TABLE IF EXISTS "hold_sample_import";
CREATE TABLE IF NOT EXISTS "hold_sample_import" (
	"hold_sample_id"	int NOT NULL,
	"facility_id"	int DEFAULT NULL,
	"lab_name"	TEXT DEFAULT NULL,
	"lab_id"	int DEFAULT NULL,
	"lab_contact_person"	TEXT DEFAULT NULL,
	"lab_phone_number"	TEXT DEFAULT NULL,
	"sample_received_at_vl_lab_datetime"	TEXT DEFAULT NULL,
	"sample_tested_datetime"	TEXT DEFAULT NULL,
	"result_dispatched_datetime"	TEXT DEFAULT NULL,
	"result_reviewed_datetime"	TEXT DEFAULT NULL,
	"result_reviewed_by"	TEXT DEFAULT NULL,
	"approver_comments"	TEXT DEFAULT NULL,
	"lot_number"	TEXT DEFAULT NULL,
	"lot_expiration_date"	date DEFAULT NULL,
	"sample_code"	TEXT DEFAULT NULL,
	"batch_code"	TEXT DEFAULT NULL,
	"sample_type"	TEXT DEFAULT NULL,
	"order_number"	TEXT DEFAULT NULL,
	"result_value_log"	TEXT DEFAULT NULL,
	"result_value_absolute"	TEXT DEFAULT NULL,
	"result_value_text"	TEXT DEFAULT NULL,
	"result_value_absolute_decimal"	TEXT DEFAULT NULL,
	"result"	TEXT DEFAULT NULL,
	"sample_details"	TEXT DEFAULT NULL,
	"status"	TEXT DEFAULT NULL,
	"import_batch_tracking"	int DEFAULT NULL,
	"vl_test_platform"	TEXT DEFAULT NULL,
	"import_machine_name"	int DEFAULT NULL,
	"import_machine_file_name"	TEXT DEFAULT NULL,
	"manual_result_entry"	TEXT DEFAULT NULL,
	"file_name"	TEXT DEFAULT NULL,
	PRIMARY KEY("hold_sample_id")
);
DROP TABLE IF EXISTS "import_config";
CREATE TABLE IF NOT EXISTS "import_config" (
	"config_id"	int NOT NULL,
	"machine_name"	TEXT DEFAULT NULL,
	"supported_tests"	json DEFAULT NULL,
	"import_machine_file_name"	TEXT DEFAULT NULL,
	"lower_limit"	int DEFAULT NULL,
	"higher_limit"	int DEFAULT NULL,
	"max_no_of_samples_in_a_batch"	int NOT NULL,
	"number_of_in_house_controls"	int DEFAULT NULL,
	"number_of_manufacturer_controls"	int DEFAULT NULL,
	"number_of_calibrators"	int DEFAULT NULL,
	"low_vl_result_text"	mediumtext,
	"status"	TEXT NOT NULL DEFAULT 'active',
	PRIMARY KEY("config_id")
);
DROP TABLE IF EXISTS "import_config_controls";
CREATE TABLE IF NOT EXISTS "import_config_controls" (
	"test_type"	TEXT NOT NULL,
	"config_id"	int NOT NULL,
	"number_of_in_house_controls"	int DEFAULT NULL,
	"number_of_manufacturer_controls"	int DEFAULT NULL,
	"number_of_calibrators"	int DEFAULT NULL,
	PRIMARY KEY("test_type","config_id")
);
DROP TABLE IF EXISTS "import_config_machines";
CREATE TABLE IF NOT EXISTS "import_config_machines" (
	"config_machine_id"	int NOT NULL,
	"config_id"	int NOT NULL,
	"config_machine_name"	TEXT NOT NULL,
	"poc_device"	TEXT DEFAULT NULL,
	"latitude"	TEXT DEFAULT NULL,
	"longitude"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	PRIMARY KEY("config_machine_id")
);
DROP TABLE IF EXISTS "lab_report_signatories";
CREATE TABLE IF NOT EXISTS "lab_report_signatories" (
	"signatory_id"	int NOT NULL,
	"name_of_signatory"	TEXT DEFAULT NULL,
	"designation"	TEXT DEFAULT NULL,
	"signature"	TEXT DEFAULT NULL,
	"test_types"	TEXT DEFAULT NULL,
	"lab_id"	int DEFAULT NULL,
	"display_order"	TEXT DEFAULT NULL,
	"added_on"	datetime DEFAULT NULL,
	"added_by"	TEXT DEFAULT NULL,
	"signatory_status"	TEXT DEFAULT NULL,
	FOREIGN KEY("lab_id") REFERENCES "facility_details"("facility_id") ON DELETE RESTRICT ON UPDATE RESTRICT,
	PRIMARY KEY("signatory_id")
);
DROP TABLE IF EXISTS "log_result_updates";
CREATE TABLE IF NOT EXISTS "log_result_updates" (
	"result_log_id"	int NOT NULL,
	"user_id"	int NOT NULL,
	"vl_sample_id"	int NOT NULL,
	"test_type"	TEXT DEFAULT NULL,
	"updated_on"	datetime DEFAULT NULL,
	PRIMARY KEY("result_log_id")
);
DROP TABLE IF EXISTS "move_samples";
CREATE TABLE IF NOT EXISTS "move_samples" (
	"move_sample_id"	int NOT NULL,
	"moved_from_lab_id"	int NOT NULL,
	"moved_to_lab_id"	int NOT NULL,
	"moved_on"	date DEFAULT NULL,
	"moved_by"	TEXT DEFAULT NULL,
	"reason_for_moving"	mediumtext,
	"move_approved_by"	TEXT DEFAULT NULL,
	"list_request_created_datetime"	datetime DEFAULT NULL,
	PRIMARY KEY("move_sample_id")
);
DROP TABLE IF EXISTS "move_samples_map";
CREATE TABLE IF NOT EXISTS "move_samples_map" (
	"sample_map_id"	int NOT NULL,
	"move_sample_id"	int NOT NULL,
	"vl_sample_id"	int NOT NULL,
	"move_sync_status"	TEXT NOT NULL DEFAULT '0',
	PRIMARY KEY("sample_map_id")
);
DROP TABLE IF EXISTS "other_config";
CREATE TABLE IF NOT EXISTS "other_config" (
	"type"	TEXT DEFAULT NULL,
	"display_name"	TEXT DEFAULT NULL,
	"name"	TEXT NOT NULL,
	"value"	mediumtext,
	PRIMARY KEY("name")
);
DROP TABLE IF EXISTS "package_details";
CREATE TABLE IF NOT EXISTS "package_details" (
	"package_id"	int NOT NULL,
	"package_code"	TEXT NOT NULL,
	"added_by"	TEXT NOT NULL,
	"package_status"	TEXT DEFAULT NULL,
	"module"	TEXT DEFAULT NULL,
	"lab_id"	int DEFAULT NULL,
	"request_created_datetime"	datetime DEFAULT NULL,
	PRIMARY KEY("package_id")
);
DROP TABLE IF EXISTS "privileges";
CREATE TABLE IF NOT EXISTS "privileges" (
	"privilege_id"	int NOT NULL,
	"resource_id"	TEXT NOT NULL,
	"privilege_name"	TEXT DEFAULT NULL,
	"display_name"	TEXT DEFAULT NULL,
	PRIMARY KEY("privilege_id")
);
DROP TABLE IF EXISTS "province_details";
CREATE TABLE IF NOT EXISTS "province_details" (
	"province_id"	int NOT NULL,
	"province_name"	TEXT DEFAULT NULL,
	"province_code"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("province_id")
);
DROP TABLE IF EXISTS "r_countries";
CREATE TABLE IF NOT EXISTS "r_countries" (
	"id"	int NOT NULL,
	"iso_name"	TEXT NOT NULL,
	"iso2"	TEXT NOT NULL,
	"iso3"	TEXT NOT NULL,
	"numeric_code"	smallint NOT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "r_covid19_comorbidities";
CREATE TABLE IF NOT EXISTS "r_covid19_comorbidities" (
	"comorbidity_id"	int NOT NULL,
	"comorbidity_name"	TEXT DEFAULT NULL,
	"comorbidity_status"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	PRIMARY KEY("comorbidity_id")
);
DROP TABLE IF EXISTS "r_covid19_results";
CREATE TABLE IF NOT EXISTS "r_covid19_results" (
	"result_id"	TEXT NOT NULL,
	"result"	TEXT NOT NULL,
	"status"	TEXT NOT NULL DEFAULT 'active',
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("result_id")
);
DROP TABLE IF EXISTS "r_covid19_sample_rejection_reasons";
CREATE TABLE IF NOT EXISTS "r_covid19_sample_rejection_reasons" (
	"rejection_reason_id"	int NOT NULL,
	"rejection_reason_name"	TEXT DEFAULT NULL,
	"rejection_type"	TEXT NOT NULL DEFAULT 'general',
	"rejection_reason_status"	TEXT DEFAULT NULL,
	"rejection_reason_code"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("rejection_reason_id")
);
DROP TABLE IF EXISTS "r_covid19_sample_type";
CREATE TABLE IF NOT EXISTS "r_covid19_sample_type" (
	"sample_id"	int NOT NULL,
	"sample_name"	TEXT DEFAULT NULL,
	"status"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("sample_id")
);
DROP TABLE IF EXISTS "r_covid19_symptoms";
CREATE TABLE IF NOT EXISTS "r_covid19_symptoms" (
	"symptom_id"	int NOT NULL,
	"symptom_name"	TEXT DEFAULT NULL,
	"parent_symptom"	int DEFAULT NULL,
	"symptom_status"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	PRIMARY KEY("symptom_id")
);
DROP TABLE IF EXISTS "r_covid19_test_reasons";
CREATE TABLE IF NOT EXISTS "r_covid19_test_reasons" (
	"test_reason_id"	int NOT NULL,
	"test_reason_name"	TEXT DEFAULT NULL,
	"parent_reason"	int DEFAULT NULL,
	"test_reason_status"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	PRIMARY KEY("test_reason_id")
);
DROP TABLE IF EXISTS "r_eid_results";
CREATE TABLE IF NOT EXISTS "r_eid_results" (
	"result_id"	TEXT NOT NULL,
	"result"	TEXT NOT NULL,
	"status"	TEXT NOT NULL DEFAULT 'active',
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("result_id")
);
DROP TABLE IF EXISTS "r_eid_sample_rejection_reasons";
CREATE TABLE IF NOT EXISTS "r_eid_sample_rejection_reasons" (
	"rejection_reason_id"	int NOT NULL,
	"rejection_reason_name"	TEXT DEFAULT NULL,
	"rejection_type"	TEXT NOT NULL DEFAULT 'general',
	"rejection_reason_status"	TEXT DEFAULT NULL,
	"rejection_reason_code"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("rejection_reason_id")
);
DROP TABLE IF EXISTS "r_eid_sample_type";
CREATE TABLE IF NOT EXISTS "r_eid_sample_type" (
	"sample_id"	int NOT NULL,
	"sample_name"	TEXT DEFAULT NULL,
	"status"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("sample_id")
);
DROP TABLE IF EXISTS "r_eid_test_reasons";
CREATE TABLE IF NOT EXISTS "r_eid_test_reasons" (
	"test_reason_id"	int NOT NULL,
	"test_reason_name"	TEXT DEFAULT NULL,
	"parent_reason"	int DEFAULT '0',
	"test_reason_status"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int DEFAULT '0',
	PRIMARY KEY("test_reason_id")
);
DROP TABLE IF EXISTS "r_funding_sources";
CREATE TABLE IF NOT EXISTS "r_funding_sources" (
	"funding_source_id"	int NOT NULL,
	"funding_source_name"	TEXT NOT NULL,
	"funding_source_status"	TEXT NOT NULL DEFAULT 'active',
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int DEFAULT '0',
	PRIMARY KEY("funding_source_id")
);
DROP TABLE IF EXISTS "r_hepatitis_comorbidities";
CREATE TABLE IF NOT EXISTS "r_hepatitis_comorbidities" (
	"comorbidity_id"	int NOT NULL,
	"comorbidity_name"	TEXT DEFAULT NULL,
	"comorbidity_status"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	PRIMARY KEY("comorbidity_id")
);
DROP TABLE IF EXISTS "r_hepatitis_results";
CREATE TABLE IF NOT EXISTS "r_hepatitis_results" (
	"result_id"	TEXT NOT NULL,
	"result"	TEXT NOT NULL,
	"status"	TEXT NOT NULL DEFAULT 'active',
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("result_id")
);
DROP TABLE IF EXISTS "r_hepatitis_risk_factors";
CREATE TABLE IF NOT EXISTS "r_hepatitis_risk_factors" (
	"riskfactor_id"	int NOT NULL,
	"riskfactor_name"	TEXT DEFAULT NULL,
	"riskfactor_status"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	PRIMARY KEY("riskfactor_id")
);
DROP TABLE IF EXISTS "r_hepatitis_sample_rejection_reasons";
CREATE TABLE IF NOT EXISTS "r_hepatitis_sample_rejection_reasons" (
	"rejection_reason_id"	int NOT NULL,
	"rejection_reason_name"	TEXT DEFAULT NULL,
	"rejection_type"	TEXT NOT NULL DEFAULT 'general',
	"rejection_reason_status"	TEXT DEFAULT NULL,
	"rejection_reason_code"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("rejection_reason_id")
);
DROP TABLE IF EXISTS "r_hepatitis_sample_type";
CREATE TABLE IF NOT EXISTS "r_hepatitis_sample_type" (
	"sample_id"	int NOT NULL,
	"sample_name"	TEXT DEFAULT NULL,
	"status"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("sample_id")
);
DROP TABLE IF EXISTS "r_hepatitis_test_reasons";
CREATE TABLE IF NOT EXISTS "r_hepatitis_test_reasons" (
	"test_reason_id"	int NOT NULL,
	"test_reason_name"	TEXT DEFAULT NULL,
	"parent_reason"	int DEFAULT NULL,
	"test_reason_status"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	PRIMARY KEY("test_reason_id")
);
DROP TABLE IF EXISTS "r_implementation_partners";
CREATE TABLE IF NOT EXISTS "r_implementation_partners" (
	"i_partner_id"	int NOT NULL,
	"i_partner_name"	TEXT NOT NULL,
	"i_partner_status"	TEXT NOT NULL DEFAULT 'active',
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int DEFAULT '0',
	PRIMARY KEY("i_partner_id")
);
DROP TABLE IF EXISTS "r_sample_controls";
CREATE TABLE IF NOT EXISTS "r_sample_controls" (
	"r_sample_control_id"	int NOT NULL,
	"r_sample_control_name"	TEXT DEFAULT NULL,
	PRIMARY KEY("r_sample_control_id")
);
DROP TABLE IF EXISTS "r_sample_status";
CREATE TABLE IF NOT EXISTS "r_sample_status" (
	"status_id"	int NOT NULL,
	"status_name"	TEXT DEFAULT NULL,
	"status"	TEXT NOT NULL DEFAULT 'active',
	PRIMARY KEY("status_id")
);
DROP TABLE IF EXISTS "r_vl_art_regimen";
CREATE TABLE IF NOT EXISTS "r_vl_art_regimen" (
	"art_id"	int NOT NULL,
	"art_code"	TEXT DEFAULT NULL,
	"parent_art"	int NOT NULL,
	"headings"	TEXT DEFAULT NULL,
	"nation_identifier"	TEXT DEFAULT NULL,
	"art_status"	TEXT NOT NULL DEFAULT 'active',
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("art_id")
);
DROP TABLE IF EXISTS "r_vl_sample_rejection_reasons";
CREATE TABLE IF NOT EXISTS "r_vl_sample_rejection_reasons" (
	"rejection_reason_id"	int NOT NULL,
	"rejection_reason_name"	TEXT DEFAULT NULL,
	"rejection_type"	TEXT NOT NULL DEFAULT 'general',
	"rejection_reason_status"	TEXT DEFAULT NULL,
	"rejection_reason_code"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("rejection_reason_id")
);
DROP TABLE IF EXISTS "r_vl_sample_type";
CREATE TABLE IF NOT EXISTS "r_vl_sample_type" (
	"sample_id"	int NOT NULL,
	"sample_name"	TEXT DEFAULT NULL,
	"status"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int NOT NULL DEFAULT '0',
	PRIMARY KEY("sample_id")
);
DROP TABLE IF EXISTS "r_vl_test_reasons";
CREATE TABLE IF NOT EXISTS "r_vl_test_reasons" (
	"test_reason_id"	int NOT NULL,
	"test_reason_name"	TEXT DEFAULT NULL,
	"parent_reason"	int DEFAULT '0',
	"test_reason_status"	TEXT DEFAULT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	"data_sync"	int DEFAULT '0',
	PRIMARY KEY("test_reason_id")
);
DROP TABLE IF EXISTS "report_to_mail";
CREATE TABLE IF NOT EXISTS "report_to_mail" (
	"report_mail_id"	int NOT NULL,
	"batch_id"	int NOT NULL,
	"subject"	TEXT DEFAULT NULL,
	"to_mail"	TEXT DEFAULT NULL,
	"encrypt"	TEXT DEFAULT NULL,
	"password"	TEXT DEFAULT NULL,
	"comment"	TEXT DEFAULT NULL,
	FOREIGN KEY("batch_id") REFERENCES "batch_details"("batch_id"),
	PRIMARY KEY("report_mail_id")
);
DROP TABLE IF EXISTS "resources";
CREATE TABLE IF NOT EXISTS "resources" (
	"resource_id"	TEXT NOT NULL,
	"module"	TEXT NOT NULL,
	"display_name"	TEXT DEFAULT NULL,
	PRIMARY KEY("resource_id")
);
DROP TABLE IF EXISTS "result_import_stats";
CREATE TABLE IF NOT EXISTS "result_import_stats" (
	"id"	int NOT NULL,
	"imported_on"	datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	"no_of_results_imported"	int DEFAULT NULL,
	"imported_by"	TEXT DEFAULT NULL,
	"import_mode"	TEXT DEFAULT NULL,
	PRIMARY KEY("id")
);
DROP TABLE IF EXISTS "roles";
CREATE TABLE IF NOT EXISTS "roles" (
	"role_id"	int NOT NULL,
	"role_name"	TEXT DEFAULT NULL,
	"role_code"	TEXT DEFAULT NULL,
	"status"	TEXT DEFAULT NULL,
	"access_type"	TEXT DEFAULT NULL,
	"landing_page"	TEXT DEFAULT NULL,
	PRIMARY KEY("role_id")
);
DROP TABLE IF EXISTS "roles_privileges_map";
CREATE TABLE IF NOT EXISTS "roles_privileges_map" (
	"map_id"	int NOT NULL,
	"role_id"	int NOT NULL,
	"privilege_id"	int NOT NULL,
	FOREIGN KEY("privilege_id") REFERENCES "privileges"("privilege_id"),
	FOREIGN KEY("role_id") REFERENCES "roles"("role_id"),
	PRIMARY KEY("map_id")
);
DROP TABLE IF EXISTS "s_available_country_forms";
CREATE TABLE IF NOT EXISTS "s_available_country_forms" (
	"vlsm_country_id"	int NOT NULL,
	"form_name"	TEXT DEFAULT NULL,
	PRIMARY KEY("vlsm_country_id")
);
DROP TABLE IF EXISTS "s_vlsm_instance";
CREATE TABLE IF NOT EXISTS "s_vlsm_instance" (
	"vlsm_instance_id"	TEXT NOT NULL,
	"instance_facility_name"	TEXT DEFAULT NULL,
	"instance_facility_code"	TEXT DEFAULT NULL,
	"instance_facility_type"	TEXT DEFAULT NULL,
	"instance_facility_logo"	TEXT DEFAULT NULL,
	"instance_added_on"	datetime DEFAULT NULL,
	"instance_update_on"	datetime DEFAULT NULL,
	"instance_mac_address"	TEXT DEFAULT NULL,
	"vl_last_dash_sync"	datetime DEFAULT NULL,
	"eid_last_dash_sync"	datetime DEFAULT NULL,
	"covid19_last_dash_sync"	datetime DEFAULT NULL,
	"last_vldash_sync"	datetime DEFAULT NULL
);
DROP TABLE IF EXISTS "system_config";
CREATE TABLE IF NOT EXISTS "system_config" (
	"display_name"	TEXT NOT NULL,
	"name"	TEXT NOT NULL,
	"value"	TEXT DEFAULT NULL,
	PRIMARY KEY("name")
);
DROP TABLE IF EXISTS "temp_sample_import";
CREATE TABLE IF NOT EXISTS "temp_sample_import" (
	"temp_sample_id"	int NOT NULL,
	"module"	TEXT DEFAULT NULL,
	"facility_id"	int DEFAULT NULL,
	"lab_name"	TEXT DEFAULT NULL,
	"lab_id"	int DEFAULT NULL,
	"lab_contact_person"	TEXT DEFAULT NULL,
	"lab_phone_number"	TEXT DEFAULT NULL,
	"sample_received_at_vl_lab_datetime"	TEXT DEFAULT NULL,
	"sample_tested_datetime"	TEXT DEFAULT NULL,
	"result_dispatched_datetime"	TEXT DEFAULT NULL,
	"result_reviewed_datetime"	TEXT DEFAULT NULL,
	"result_reviewed_by"	TEXT DEFAULT NULL,
	"approver_comments"	TEXT DEFAULT NULL,
	"lot_number"	TEXT DEFAULT NULL,
	"lot_expiration_date"	date DEFAULT NULL,
	"sample_code"	TEXT DEFAULT NULL,
	"batch_code"	TEXT DEFAULT NULL,
	"batch_code_key"	int DEFAULT NULL,
	"sample_type"	TEXT DEFAULT NULL,
	"order_number"	TEXT DEFAULT NULL,
	"result_value_log"	TEXT DEFAULT NULL,
	"result_value_absolute"	TEXT DEFAULT NULL,
	"result_value_text"	TEXT DEFAULT NULL,
	"result_value_absolute_decimal"	TEXT DEFAULT NULL,
	"result"	TEXT DEFAULT NULL,
	"sample_details"	TEXT DEFAULT NULL,
	"result_status"	TEXT DEFAULT NULL,
	"import_machine_file_name"	TEXT DEFAULT NULL,
	"vl_test_platform"	TEXT DEFAULT NULL,
	"import_machine_name"	int DEFAULT NULL,
	"request_exported_datetime"	datetime DEFAULT NULL,
	"request_imported_datetime"	datetime DEFAULT NULL,
	"result_exported_datetime"	datetime DEFAULT NULL,
	"result_imported_datetime"	datetime DEFAULT NULL,
	"temp_sample_status"	int NOT NULL DEFAULT '0',
	"sample_review_by"	TEXT DEFAULT NULL,
	"imported_by"	TEXT NOT NULL,
	"file_name"	TEXT DEFAULT NULL,
	PRIMARY KEY("temp_sample_id")
);
DROP TABLE IF EXISTS "testing_labs";
CREATE TABLE IF NOT EXISTS "testing_labs" (
	"test_type"	TEXT NOT NULL,
	"facility_id"	int NOT NULL,
	"updated_datetime"	datetime DEFAULT NULL,
	"monthly_target"	TEXT DEFAULT NULL,
	"suppressed_monthly_target"	TEXT DEFAULT NULL,
	PRIMARY KEY("test_type","facility_id")
);
DROP TABLE IF EXISTS "track_api_requests";
CREATE TABLE IF NOT EXISTS "track_api_requests" (
	"api_track_id"	int NOT NULL,
	"requested_by"	TEXT DEFAULT NULL,
	"requested_on"	datetime DEFAULT NULL,
	"number_of_records"	TEXT DEFAULT NULL,
	"request_type"	TEXT DEFAULT NULL,
	"test_type"	TEXT DEFAULT NULL,
	"api_url"	text,
	"api_params"	text,
	"data_format"	TEXT DEFAULT NULL,
	PRIMARY KEY("api_track_id")
);
DROP TABLE IF EXISTS "user_admin_details";
CREATE TABLE IF NOT EXISTS "user_admin_details" (
	"user_admin_id"	int NOT NULL,
	"user_admin_name"	TEXT DEFAULT NULL,
	"user_admin_login"	TEXT DEFAULT NULL,
	"user_admin_password"	TEXT DEFAULT NULL
);
DROP TABLE IF EXISTS "user_details";
CREATE TABLE IF NOT EXISTS "user_details" (
	"user_id"	TEXT NOT NULL,
	"user_name"	TEXT DEFAULT NULL,
	"email"	TEXT DEFAULT NULL,
	"phone_number"	TEXT DEFAULT NULL,
	"login_id"	TEXT DEFAULT NULL,
	"password"	TEXT DEFAULT NULL,
	"role_id"	int NOT NULL,
	"user_signature"	mediumtext,
	"api_token"	mediumtext,
	"api_token_generated_datetime"	datetime DEFAULT NULL,
	"status"	TEXT DEFAULT NULL,
	"app_access"	TEXT DEFAULT 'no',
	FOREIGN KEY("role_id") REFERENCES "roles"("role_id"),
	PRIMARY KEY("user_id")
);
DROP TABLE IF EXISTS "vl_facility_map";
CREATE TABLE IF NOT EXISTS "vl_facility_map" (
	"facility_map_id"	int NOT NULL,
	"vl_lab_id"	int NOT NULL,
	"facility_id"	int NOT NULL,
	FOREIGN KEY("facility_id") REFERENCES "facility_details"("facility_id"),
	FOREIGN KEY("vl_lab_id") REFERENCES "facility_details"("facility_id"),
	PRIMARY KEY("facility_map_id")
);
DROP TABLE IF EXISTS "vl_imported_controls";
CREATE TABLE IF NOT EXISTS "vl_imported_controls" (
	"control_id"	int NOT NULL,
	"control_code"	TEXT NOT NULL,
	"lab_id"	int DEFAULT NULL,
	"batch_id"	int DEFAULT NULL,
	"control_type"	TEXT DEFAULT NULL,
	"lot_number"	TEXT DEFAULT NULL,
	"lot_expiration_date"	date DEFAULT NULL,
	"tested_by"	TEXT DEFAULT NULL,
	"sample_tested_datetime"	datetime DEFAULT NULL,
	"is_sample_rejected"	TEXT DEFAULT NULL,
	"reason_for_sample_rejection"	TEXT DEFAULT NULL,
	"result_value_absolute"	TEXT DEFAULT NULL,
	"result_value_log"	TEXT DEFAULT NULL,
	"result_value_text"	TEXT DEFAULT NULL,
	"result_value_absolute_decimal"	TEXT DEFAULT NULL,
	"result"	TEXT DEFAULT NULL,
	"approver_comments"	TEXT DEFAULT NULL,
	"result_approved_by"	TEXT DEFAULT NULL,
	"result_approved_datetime"	datetime DEFAULT NULL,
	"result_reviewed_by"	TEXT DEFAULT NULL,
	"result_reviewed_datetime"	datetime DEFAULT NULL,
	"status"	TEXT DEFAULT NULL,
	"vlsm_country_id"	TEXT DEFAULT NULL,
	"file_name"	TEXT DEFAULT NULL,
	"imported_date_time"	datetime DEFAULT NULL,
	PRIMARY KEY("control_id")
);
DROP TABLE IF EXISTS "vl_request_form";
CREATE TABLE IF NOT EXISTS "vl_request_form" (
	"vl_sample_id"	INTEGER NOT NULL,
	"unique_id" NOT NULL UNIQUE,
	"vlsm_instance_id"	text DEFAULT NULL,
	"vlsm_country_id"	int DEFAULT NULL,
	"remote_sample_code"	TEXT DEFAULT NULL,
	"serial_no"	TEXT DEFAULT NULL,
	"facility_id"	int DEFAULT NULL,
	"province_id"	TEXT DEFAULT NULL,
	"facility_sample_id"	TEXT DEFAULT NULL,
	"sample_batch_id"	TEXT DEFAULT NULL,
	"sample_package_id"	TEXT DEFAULT NULL,
	"sample_package_code"	TEXT DEFAULT NULL,
	"sample_reordered"	TEXT NOT NULL DEFAULT 'no',
	"remote_sample_code_key"	int DEFAULT NULL,
	"remote_sample_code_format"	TEXT DEFAULT NULL,
	"sample_code_key"	int DEFAULT NULL,
	"sample_code_format"	TEXT DEFAULT NULL,
	"sample_code_title"	TEXT NOT NULL DEFAULT 'auto',
	"sample_code"	TEXT DEFAULT NULL,
	"test_urgency"	TEXT DEFAULT NULL,
	"funding_source"	int DEFAULT NULL,
	"implementing_partner"	int DEFAULT NULL,
	"patient_first_name"	TEXT DEFAULT NULL,
	"patient_middle_name"	TEXT DEFAULT NULL,
	"patient_last_name"	TEXT DEFAULT NULL,
	"patient_responsible_person"	TEXT DEFAULT NULL,
	"patient_nationality"	int DEFAULT NULL,
	"patient_province"	TEXT DEFAULT NULL,
	"patient_district"	TEXT DEFAULT NULL,
	"patient_group"	TEXT DEFAULT NULL,
	"patient_art_no"	TEXT DEFAULT NULL,
	"patient_dob"	date DEFAULT NULL,
	"patient_below_five_years"	TEXT DEFAULT NULL,
	"patient_gender"	TEXT DEFAULT NULL,
	"patient_mobile_number"	TEXT DEFAULT NULL,
	"patient_location"	TEXT DEFAULT NULL,
	"patient_address"	text,
	"patient_art_date" date DEFAULT NULL,
	"patient_receiving_therapy"	TEXT DEFAULT NULL,
	"patient_drugs_transmission"	TEXT DEFAULT NULL,
	"patient_tb"	TEXT DEFAULT NULL,
	"patient_tb_yes"	TEXT DEFAULT NULL,
	"sample_collection_date"	datetime DEFAULT NULL,
	"sample_type"	TEXT DEFAULT NULL,
	"is_patient_new"	TEXT DEFAULT NULL,
	"treatment_initiation"	TEXT DEFAULT NULL,
	"line_of_treatment"	int DEFAULT NULL,
	"line_of_treatment_ref_type"	TEXT DEFAULT NULL,
	"current_regimen"	TEXT DEFAULT NULL,
	"date_of_initiation_of_current_regimen"	TEXT DEFAULT NULL,
	"is_patient_pregnant"	TEXT DEFAULT NULL,
	"is_patient_breastfeeding"	TEXT DEFAULT NULL,
	"pregnancy_trimester"	int DEFAULT NULL,
	"arv_adherance_percentage"	TEXT DEFAULT NULL,
	"is_adherance_poor"	TEXT DEFAULT NULL,
	"consent_to_receive_sms"	TEXT DEFAULT NULL,
	"number_of_enhanced_sessions"	TEXT DEFAULT NULL,
	"last_vl_date_routine"	date DEFAULT NULL,
	"last_vl_result_routine"	TEXT DEFAULT NULL,
	"last_vl_sample_type_routine"	int DEFAULT NULL,
	"last_vl_date_failure_ac"	date DEFAULT NULL,
	"last_vl_result_failure_ac"	TEXT DEFAULT NULL,
	"last_vl_sample_type_failure_ac"	int DEFAULT NULL,
	"last_vl_date_failure"	date DEFAULT NULL,
	"last_vl_result_failure"	TEXT DEFAULT NULL,
	"last_vl_sample_type_failure"	int DEFAULT NULL,
	"last_vl_date_ecd"	date DEFAULT NULL,
	"last_vl_result_ecd"	TEXT DEFAULT NULL,
	"last_vl_date_cf"	date DEFAULT NULL,
	"last_vl_result_cf"	TEXT DEFAULT NULL,
	"last_vl_date_if"	date DEFAULT NULL,
	"last_vl_result_if"	TEXT DEFAULT NULL,
	"request_clinician_name"	TEXT DEFAULT NULL,
	"test_requested_on"	date DEFAULT NULL,
	"request_clinician_phone_number"	TEXT DEFAULT NULL,
	"sample_testing_date"	datetime DEFAULT NULL,
	"vl_focal_person"	TEXT DEFAULT NULL,
	"vl_focal_person_phone_number"	TEXT DEFAULT NULL,
	"sample_received_at_hub_datetime"	datetime DEFAULT NULL,
	"sample_received_at_vl_lab_datetime"	datetime DEFAULT NULL,
	"result_dispatched_datetime"	datetime DEFAULT NULL,
	"is_sample_rejected"	TEXT DEFAULT NULL,
	"sample_rejection_facility"	int DEFAULT NULL,
	"reason_for_sample_rejection"	int DEFAULT NULL,
	"sample_rejection_id" TEXT DEFAULT NULL,
	"rejection_on"	date DEFAULT NULL,
	"reason_for_changing"	text,
	"request_created_by"	TEXT DEFAULT NULL,
	"request_created_datetime"	datetime DEFAULT NULL,
	"last_modified_by"	TEXT DEFAULT NULL,
	"last_modified_datetime"	datetime DEFAULT NULL,
	"patient_other_id"	TEXT DEFAULT NULL,
	"patient_age_in_years"	TEXT DEFAULT NULL,
	"patient_age_in_months"	TEXT DEFAULT NULL,
	"treatment_initiated_date"	date DEFAULT NULL,
	"patient_anc_no"	TEXT DEFAULT NULL,
	"treatment_details"	text,
	"sample_visit_type" TEXT DEFAULT NULL,
	"vl_sample_suspected_treatment_failure_at"	TEXT DEFAULT NULL,
	"lab_name"	TEXT DEFAULT NULL,
	"lab_id"	int DEFAULT NULL,
	"lab_code"	int DEFAULT NULL,
	"lab_technician"	TEXT DEFAULT NULL,
	"lab_contact_person"	TEXT DEFAULT NULL,
	"lab_phone_number"	TEXT DEFAULT NULL,
	"sample_registered_at_lab"	datetime DEFAULT NULL,
	"sample_tested_datetime"	datetime DEFAULT NULL,
	"result_value_log"	TEXT DEFAULT NULL,
	"result_value_absolute"	TEXT DEFAULT NULL,
	"result_value_text"	TEXT DEFAULT NULL,
	"result_value_absolute_decimal"	TEXT DEFAULT NULL,
	"result" TEXT DEFAULT NULL,
	"approver_comments"	text,
	"reason_for_vl_result_changes" text,
	"lot_number" TEXT DEFAULT NULL,
	"lot_expiration_date"	date DEFAULT NULL,
	"tested_by"	TEXT DEFAULT NULL,
	"result_approved_by"	TEXT DEFAULT NULL,
	"result_approved_datetime"	datetime DEFAULT NULL,
	"result_reviewed_by"	TEXT DEFAULT NULL,
	"result_reviewed_datetime"	datetime DEFAULT NULL,
	"test_methods"	TEXT DEFAULT NULL,
	"contact_complete_status"	TEXT DEFAULT NULL,
	"last_viral_load_date"	date DEFAULT NULL,
	"last_viral_load_result"	TEXT DEFAULT NULL,
	"last_vl_result_in_log"	TEXT DEFAULT NULL,
	"reason_for_vl_testing"	TEXT DEFAULT NULL,
	"reason_for_vl_testing_other"	TEXT DEFAULT NULL,
	"drug_substitution"	TEXT DEFAULT NULL,
	"sample_collected_by"	TEXT DEFAULT NULL,
	"facility_comments"	text ,
	"vl_test_platform" TEXT DEFAULT NULL,
	"cphl_vl_result"	TEXT DEFAULT NULL,
	"import_machine_name"	int DEFAULT NULL,
	"facility_support_partner"	TEXT DEFAULT NULL,
	"has_patient_changed_regimen"	TEXT DEFAULT NULL,
	"reason_for_regimen_change"	TEXT DEFAULT NULL,
	"regimen_change_date"	date DEFAULT NULL,
	"plasma_conservation_temperature"	float DEFAULT NULL,
	"plasma_conservation_duration"	TEXT DEFAULT NULL,
	"physician_name"	TEXT DEFAULT NULL,
	"date_test_ordered_by_physician"	date DEFAULT NULL,
	"vl_test_number"	TEXT DEFAULT NULL,
	"date_dispatched_from_clinic_to_lab"	datetime DEFAULT NULL,
	"result_printed_datetime"	datetime DEFAULT NULL,
	"result_sms_sent_datetime"	datetime DEFAULT NULL,
	"is_request_mail_sent"	TEXT NOT NULL DEFAULT 'no',
	"request_mail_datetime"	datetime DEFAULT NULL,
	"is_result_mail_sent"	TEXT NOT NULL DEFAULT 'no',
	"result_mail_datetime"	datetime DEFAULT NULL,
	"is_result_sms_sent"	TEXT NOT NULL DEFAULT 'no',
	"test_request_export"	int NOT NULL DEFAULT '0',
	"test_request_import"	int NOT NULL DEFAULT '0',
	"test_result_export"	int NOT NULL DEFAULT '0',
	"test_result_import"	int NOT NULL DEFAULT '0',
	"request_exported_datetime"	datetime DEFAULT NULL,
	"request_imported_datetime"	datetime DEFAULT NULL,
	"result_exported_datetime"	datetime DEFAULT NULL,
	"result_imported_datetime"	datetime DEFAULT NULL,
	"result_status"	int DEFAULT NULL,
	"locked"	TEXT NOT NULL DEFAULT 'no',
	"import_machine_file_name"	TEXT DEFAULT NULL,
	"manual_result_entry"	TEXT DEFAULT NULL,
	"source"	TEXT DEFAULT 'manual',
	"ward"	TEXT DEFAULT NULL,
	"art_cd_cells"	TEXT DEFAULT NULL,
	"art_cd_date"	date DEFAULT NULL,
	"who_clinical_stage"	TEXT DEFAULT NULL,
	"reason_testing_png"	text,
	"tech_name_png" TEXT DEFAULT NULL,
	"qc_tech_name"	TEXT DEFAULT NULL,
	"qc_tech_sign"	TEXT DEFAULT NULL,
	"qc_date"	TEXT DEFAULT NULL,
	"whole_blood_ml"	TEXT DEFAULT NULL,
	"whole_blood_vial"	TEXT DEFAULT NULL,
	"plasma_ml"	TEXT DEFAULT NULL,
	"plasma_vial"	TEXT DEFAULT NULL,
	"plasma_process_time"	TEXT DEFAULT NULL,
	"plasma_process_tech"	TEXT DEFAULT NULL,
	"batch_quality"	TEXT DEFAULT NULL,
	"sample_test_quality"	TEXT DEFAULT NULL,
	"repeat_sample_collection"	TEXT DEFAULT NULL,
	"failed_test_date"	datetime DEFAULT NULL,
	"failed_test_tech"	TEXT DEFAULT NULL,
	"failed_vl_result"	TEXT DEFAULT NULL,
	"failed_batch_quality"	TEXT DEFAULT NULL,
	"failed_sample_test_quality"	TEXT DEFAULT NULL,
	"failed_batch_id"	TEXT DEFAULT NULL,
	"clinic_date"	date DEFAULT NULL,
	"report_date"	date DEFAULT NULL,
	"sample_to_transport"	TEXT DEFAULT NULL,
	"requesting_professional_number"	TEXT DEFAULT NULL,
	"requesting_category"	TEXT DEFAULT NULL,
	"requesting_vl_service_sector"	TEXT DEFAULT NULL,
	"requesting_facility_id"	int DEFAULT NULL,
	"requesting_person"	TEXT DEFAULT NULL,
	"requesting_phone"	TEXT DEFAULT NULL,
	"requesting_date"	date DEFAULT NULL,
	"collection_site"	TEXT DEFAULT NULL,
	"data_sync"	TEXT NOT NULL DEFAULT '0',
	"remote_sample"	TEXT DEFAULT 'no',
	"recency_vl"	TEXT NOT NULL DEFAULT 'no',
	"recency_sync"	int DEFAULT '0',
	"file_name"	TEXT DEFAULT NULL,
	"result_coming_from"	TEXT DEFAULT NULL,
	"consultation"	TEXT DEFAULT NULL,
	"first_line"	TEXT DEFAULT NULL,
	"second_line"	TEXT DEFAULT NULL,
	"first_viral_load"	TEXT DEFAULT NULL,
	"collection_type"	TEXT DEFAULT NULL,
	"sample_processed"	TEXT DEFAULT NULL,
	"vl_result_category"	TEXT DEFAULT NULL,
	"vldash_sync"	int NOT NULL DEFAULT '0',
	"source_of_request"	TEXT DEFAULT NULL,
	"source_data_dump"	text,
	"result_sent_to_source"	text,
	"user_id"	TEXT DEFAULT NULL,
	"app_sample_code"	text UNIQUE,
	"is_synced"	TEXT,
	"province_name"	text,
	"district"	TEXT DEFAULT NULL,
	"facility_district_id" TEXT DEFAULT NULL,
	"facility_name"	text,
	"implementing_partner_name"	text,
	"result_value_hiv_detection" TEXT DEFAULT NULL,
	"community_sample" TEXT DEFAULT NULL,
	"sample_dispatched_datetime" datetime DEFAULT NULL,
	FOREIGN KEY("result_status") REFERENCES "r_sample_status"("status_id"),
	FOREIGN KEY("funding_source") REFERENCES "r_funding_sources"("funding_source_id"),
	PRIMARY KEY("vl_sample_id")
);
DROP TABLE IF EXISTS "vl_user_facility_map";
CREATE TABLE IF NOT EXISTS "vl_user_facility_map" (
	"user_facility_map_id"	int NOT NULL,
	"user_id"	TEXT NOT NULL,
	"facility_id"	int NOT NULL,
	FOREIGN KEY("facility_id") REFERENCES "facility_details"("facility_id"),
	PRIMARY KEY("user_facility_map_id")
);
INSERT INTO "facility_type" VALUES (1,'Clinic');
INSERT INTO "facility_type" VALUES (2,'Viral Load Lab');
INSERT INTO "facility_type" VALUES (3,'Hub');
INSERT INTO "facility_type" VALUES (4,'Lab');
INSERT INTO "global_config" VALUES ('App Menu Name','app_menu_name','VLSM','app','no','2021-06-14 18:47:11',NULL,'active');
INSERT INTO "global_config" VALUES ('Auto Approval','auto_approval','yes','general','no',NULL,NULL,'inactive');
INSERT INTO "global_config" VALUES ('Barcode Format','barcode_format','C39','general','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Barcode Printing','bar_code_printing','off','general','no','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Covid-19 Indeterminate','covid19_indeterminate','Indeterminate','covid19','yes',NULL,NULL,'active');
INSERT INTO "global_config" VALUES ('Covid-19 Maximum Length','covid19_max_length','','covid19','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Covid-19 Minimum Length','covid19_min_length','','covid19','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Covid-19 Negative','covid19_negative','Negative','covid19','yes',NULL,NULL,'active');
INSERT INTO "global_config" VALUES ('Covid-19 Positive','covid19_positive','Positive','covid19','yes',NULL,NULL,'active');
INSERT INTO "global_config" VALUES ('Positive Confirmatory Tests Required By Central Lab','covid19_positive_confirmatory_tests_required_by_central_lab','no','covid19','yes',NULL,NULL,'active');
INSERT INTO "global_config" VALUES ('Report Type','covid19_report_type','who','covid19','yes',NULL,NULL,'active');
INSERT INTO "global_config" VALUES ('Covid-19 Sample Code Format','covid19_sample_code','MMYY','covid19','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Covid-19 Sample Code Prefix','covid19_sample_code_prefix','C19','covid19','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Covid19 Tests Table in Results Pdf','covid19_tests_table_in_results_pdf','no','covid19','yes',NULL,NULL,'active');
INSERT INTO "global_config" VALUES ('Data Sync Interval','data_sync_interval','30','general','yes',NULL,NULL,'active');
INSERT INTO "global_config" VALUES ('Default Time Zone','default_time_zone','Africa/Kigali','general','no','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Edit Profile','edit_profile','yes','general','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('EID Indeterminate','eid_indeterminate','Indeterminate','eid','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('EID Maximum Length','eid_max_length','','eid','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('EID Minimum Length','eid_min_length','','eid','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('EID Negative','eid_negative','Negative','eid','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('EID Positive','eid_positive','Positive','eid','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('EID Sample Code','eid_sample_code','MMYY','eid','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('EID Sample Code Prefix','eid_sample_code_prefix','EID','eid','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Enable QR Code Mechanism','enable_qr_mechanism','no','general','yes',NULL,NULL,'inactive');
INSERT INTO "global_config" VALUES ('Header','header','MINISTRY OF HEALTH','general','no','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Hepatitis Sample Code Format','hepatitis_sample_code','MMYY','hepatitis','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Hepatitis Sample Code Prefix','hepatitis_sample_code_prefix','HEP','hepatitis','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Result PDF High Viral Load Message','h_vl_msg','','vl','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Import Non matching Sample Results from Machine generated file','import_non_matching_sample','yes','general','no','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Instance Type ','instance_type','Viral Load Lab','general','no','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Lock Approved Covid-19 Samples','lock_approved_covid19_samples','no','covid19','yes',NULL,NULL,'active');
INSERT INTO "global_config" VALUES ('Lock Approved EID Samples','lock_approved_eid_samples','no','eid','yes',NULL,NULL,'active');
INSERT INTO "global_config" VALUES ('Lock approved VL Samples','lock_approved_vl_samples','no','vl','yes',NULL,NULL,'active');
INSERT INTO "global_config" VALUES ('Logo','logo','logoHbL801.png','general','no','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Low Viral Load (text results)','low_vl_text_results','Target Not Detected, TND, < 20, < 40','vl','yes',NULL,NULL,'active');
INSERT INTO "global_config" VALUES ('Result PDF Low Viral Load Message','l_vl_msg','','vl','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Manager Email','manager_email','','general','no','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Maximum Length','max_length','','vl','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Minimum Length','min_length','','vl','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Patient Name in Result PDF','patient_name_pdf','flname','general','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Result PDF Mandatory Fields','r_mandatory_fields',NULL,'vl','yes',NULL,NULL,'active');
INSERT INTO "global_config" VALUES ('Sample Code','sample_code','MMYY','vl','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Sample Code Prefix','sample_code_prefix','VL','general','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Patient ART No. Date','show_date','no','vl','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Do you want to show emoticons on the result pdf?','show_smiley','yes','general','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Sync Path','sync_path','','general','no',NULL,NULL,'inactive');
INSERT INTO "global_config" VALUES ('Testing Status','testing_status','enabled','vl','yes',NULL,NULL,'active');
INSERT INTO "global_config" VALUES ('Same user can Review and Approve','user_review_approve','yes','general','no','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Viral Load Threshold Limit','viral_load_threshold_limit','1000','vl','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Vldashboard Url','vldashboard_url','','general','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "global_config" VALUES ('Viral Load Form','vl_form','1','general','yes','2021-01-14 22:34:50','8fisqdpu-wpkn-jo19-jo19-ku9fk2207e89','active');
INSERT INTO "import_config" VALUES (1,'Roche','[\"vl\", \"eid\", \"covid19\"]','roche-ssudan-nhrl.php',20,10000000,21,0,3,0,'','active');
INSERT INTO "import_config" VALUES (2,'Biomerieux',NULL,'biomerieux.php',0,0,10,2,3,1,NULL,'inactive');
INSERT INTO "import_config" VALUES (3,'Abbott m2000','[\"vl\", \"eid\", \"covid19\"]','abbott-ssudan.php',839,10000000,93,0,3,0,'','active');
INSERT INTO "import_config" VALUES (4,'ABI7500 System','[\"covid19\"]','abi7500-system.php',0,0,21,NULL,NULL,NULL,'','active');
INSERT INTO "import_config" VALUES (5,'GeneXpert','[\"covid19\"]','genexpert.php',0,0,21,NULL,NULL,NULL,'','active');
INSERT INTO "import_config" VALUES (6,'BioRad PCR','[\"covid19\"]','biorad-pcr.php',0,0,21,NULL,NULL,NULL,'','active');
INSERT INTO "import_config" VALUES (7,'Rotor Gene System','[\"covid19\"]','rotor-gene-system.php',0,0,21,NULL,NULL,NULL,'','active');
INSERT INTO "import_config_machines" VALUES (1,1,'Roche',NULL,NULL,NULL,NULL);
INSERT INTO "import_config_machines" VALUES (2,3,'Abbott m2000','no','','','2020-12-10 17:15:43');
INSERT INTO "import_config_machines" VALUES (3,4,'ABI7500 System',NULL,NULL,NULL,NULL);
INSERT INTO "import_config_machines" VALUES (4,5,'GeneXpert',NULL,NULL,NULL,NULL);
INSERT INTO "import_config_machines" VALUES (5,6,'BioRad PCR',NULL,NULL,NULL,NULL);
INSERT INTO "import_config_machines" VALUES (6,7,'Rotor Gene System',NULL,NULL,NULL,NULL);
INSERT INTO "other_config" VALUES ('request','Email Id','rq_email','vlsm.southsudan@gmail.com');
INSERT INTO "other_config" VALUES ('request','Email Fields','rq_field','Sample ID,Province,Clinic Name,Sample Collection Date,Sample Received Date,Gender,Age in years,Age in months,Patient OI/ART Number,Result Of Last Viral Load,Specimen type,Sample Testing Date,Viral Load Result(copiesl/ml),Log Value,If no result,Rejection Reason,Reviewed By,Approved By,Status');
INSERT INTO "other_config" VALUES ('request','Password','rq_password','#mko)(*&^%$123');
INSERT INTO "other_config" VALUES ('result','Email Id','rs_email','vlsm.southsudan@gmail.com');
INSERT INTO "other_config" VALUES ('result','Email Fields','rs_field','Sample ID,Clinic Name,Patient OI/ART Number,Viral Load Log,Lab Name,Sample Testing Date,Viral Load Result(copiesl/ml),Log Value,Rejection Reason,Reviewed By,Approved By,Laboratory Scientist Comments');
INSERT INTO "other_config" VALUES ('result','Password','rs_password','#mko)(*&^%$123');
INSERT INTO "privileges" VALUES (1,'users','users.php','Access');
INSERT INTO "privileges" VALUES (2,'users','addUser.php','Add');
INSERT INTO "privileges" VALUES (3,'users','editUser.php','Edit');
INSERT INTO "privileges" VALUES (4,'facility','facilities.php','Access');
INSERT INTO "privileges" VALUES (5,'facility','addFacility.php','Add');
INSERT INTO "privileges" VALUES (6,'facility','editFacility.php','Edit');
INSERT INTO "privileges" VALUES (7,'global-config','globalConfig.php','Access');
INSERT INTO "privileges" VALUES (8,'global-config','editGlobalConfig.php','Edit');
INSERT INTO "privileges" VALUES (9,'import-config','importConfig.php','Access');
INSERT INTO "privileges" VALUES (10,'import-config','addImportConfig.php','Add');
INSERT INTO "privileges" VALUES (11,'import-config','editImportConfig.php','Edit');
INSERT INTO "privileges" VALUES (12,'vl-test-request','vlRequest.php','Access');
INSERT INTO "privileges" VALUES (13,'vl-test-request','addVlRequest.php','Add');
INSERT INTO "privileges" VALUES (14,'vl-test-request','editVlRequest.php','Edit');
INSERT INTO "privileges" VALUES (15,'vl-test-request','viewVlRequest.php','View Vl Request');
INSERT INTO "privileges" VALUES (16,'vl-batch','batchcode.php','Access');
INSERT INTO "privileges" VALUES (17,'vl-batch','addBatch.php','Add');
INSERT INTO "privileges" VALUES (18,'vl-batch','editBatch.php','Edit');
INSERT INTO "privileges" VALUES (19,'vl-results','addImportResult.php','Import VL Results from File');
INSERT INTO "privileges" VALUES (20,'vl-results','vlPrintResult.php','Print Result PDF');
INSERT INTO "privileges" VALUES (21,'vl-results','vlTestResult.php','Access');
INSERT INTO "privileges" VALUES (22,'vl-reports','vl-sample-status.php','Sample Status Report');
INSERT INTO "privileges" VALUES (23,'vl-reports','vlResult.php','Access Export VL Data');
INSERT INTO "privileges" VALUES (24,'home','index.php','Access');
INSERT INTO "privileges" VALUES (25,'roles','roles.php','Access');
INSERT INTO "privileges" VALUES (26,'roles','editRole.php','Edit');
INSERT INTO "privileges" VALUES (27,'vl-test-request','vlRequestMail.php','Email Test Request');
INSERT INTO "privileges" VALUES (28,'test-request-email-config','testRequestEmailConfig.php','Access');
INSERT INTO "privileges" VALUES (29,'vl-test-request','sendRequestToMail.php','Send Request to Mail');
INSERT INTO "privileges" VALUES (31,'vl-results','vlResultApproval.php','Manage VL Result Status (Approve/Reject)');
INSERT INTO "privileges" VALUES (33,'vl-reports','highViralLoad.php','High VL Report');
INSERT INTO "privileges" VALUES (34,'vl-reports','addContactNotes.php','Contact Notes (High VL Reports)');
INSERT INTO "privileges" VALUES (39,'roles','addRole.php','Add');
INSERT INTO "privileges" VALUES (40,'vl-reports','vlTestResultStatus.php','Dashboard');
INSERT INTO "privileges" VALUES (41,'vl-test-request','patientList.php','Export Patient List');
INSERT INTO "privileges" VALUES (43,'test-request-email-config','editTestRequestEmailConfig.php','Edit');
INSERT INTO "privileges" VALUES (45,'vl-test-request','vlResultMail.php','Email Test Result');
INSERT INTO "privileges" VALUES (46,'vl-batch','editBatchControlsPosition.php','Edit Controls Position');
INSERT INTO "privileges" VALUES (47,'vl-batch','addBatchControlsPosition.php','Add Controls Position');
INSERT INTO "privileges" VALUES (48,'test-result-email-config','testResultEmailConfig.php','Access');
INSERT INTO "privileges" VALUES (49,'test-result-email-config','editTestResultEmailConfig.php','Edit');
INSERT INTO "privileges" VALUES (50,'vl-test-request','vlRequestMailConfirm.php','Email Test Request Confirm');
INSERT INTO "privileges" VALUES (51,'vl-test-request','vlResultMailConfirm.php','Email Test Result Confirm');
INSERT INTO "privileges" VALUES (56,'vl-reports','vlWeeklyReport.php','VL Weekly Report');
INSERT INTO "privileges" VALUES (57,'vl-reports','sampleRejectionReport.php','Sample Rejection Report');
INSERT INTO "privileges" VALUES (59,'vl-reports','vlMonitoringReport.php','Sample Monitoring Report');
INSERT INTO "privileges" VALUES (62,'vl-reports','vlRequestRwdForm.php','Manage QR Code Rwd Form');
INSERT INTO "privileges" VALUES (63,'vl-reports','vlControlReport.php','Controls Report');
INSERT INTO "privileges" VALUES (64,'facility','addVlFacilityMap.php','Add Facility Map');
INSERT INTO "privileges" VALUES (65,'facility','facilityMap.php','Access Facility Map');
INSERT INTO "privileges" VALUES (66,'facility','editVlFacilityMap.php','Edit Facility Map');
INSERT INTO "privileges" VALUES (67,'specimen-referral-manifest','addSpecimenReferralManifest.php','Add');
INSERT INTO "privileges" VALUES (68,'specimen-referral-manifest','editSpecimenReferralManifest.php','Edit');
INSERT INTO "privileges" VALUES (69,'specimen-referral-manifest','specimenReferralManifestList.php','Access');
INSERT INTO "privileges" VALUES (70,'vl-reports','vlResultAllFieldExportInExcel.php','Export VL Data in Excel');
INSERT INTO "privileges" VALUES (71,'move-samples','sampleList.php','Access');
INSERT INTO "privileges" VALUES (72,'move-samples','addSampleList.php','Add Samples List');
INSERT INTO "privileges" VALUES (73,'move-samples','editSampleList.php','Edit Sample List');
INSERT INTO "privileges" VALUES (74,'eid-requests','eid-add-request.php','Add Request');
INSERT INTO "privileges" VALUES (75,'eid-requests','eid-edit-request.php','Edit Request');
INSERT INTO "privileges" VALUES (76,'eid-requests','eid-requests.php','View Requests');
INSERT INTO "privileges" VALUES (77,'eid-batches','eid-batches.php','View Batches');
INSERT INTO "privileges" VALUES (78,'eid-batches','eid-add-batch.php','Add Batch');
INSERT INTO "privileges" VALUES (79,'eid-batches','eid-edit-batch.php','Edit Batch');
INSERT INTO "privileges" VALUES (80,'eid-results','eid-manual-results.php','Enter Result');
INSERT INTO "privileges" VALUES (81,'eid-results','eid-import-result.php','Import Result File');
INSERT INTO "privileges" VALUES (84,'eid-results','eid-result-status.php','Manage Result Status');
INSERT INTO "privileges" VALUES (85,'eid-results','eid-print-results.php','Print Results');
INSERT INTO "privileges" VALUES (86,'eid-management','eid-export-data.php','Export Data');
INSERT INTO "privileges" VALUES (87,'eid-management','eid-sample-rejection-report.php','Sample Rejection Report');
INSERT INTO "privileges" VALUES (88,'eid-management','eid-sample-status.php','Sample Status Report');
INSERT INTO "privileges" VALUES (89,'vl-test-request','addSamplesFromManifest.php','Add Samples from Manifest');
INSERT INTO "privileges" VALUES (91,'eid-requests','addSamplesFromManifest.php','Add Samples from Manifest');
INSERT INTO "privileges" VALUES (95,'covid-19-requests','covid-19-add-request.php','Add Request');
INSERT INTO "privileges" VALUES (96,'covid-19-requests','covid-19-edit-request.php','Edit Request');
INSERT INTO "privileges" VALUES (97,'covid-19-requests','covid-19-requests.php','View Requests');
INSERT INTO "privileges" VALUES (98,'covid-19-requests','covid-19-result-status.php','Manage Result Status');
INSERT INTO "privileges" VALUES (99,'covid-19-requests','covid-19-print-results.php','Print Results');
INSERT INTO "privileges" VALUES (100,'covid-19-batches','covid-19-batches.php','View Batches');
INSERT INTO "privileges" VALUES (101,'covid-19-batches','covid-19-add-batch.php','Add Batch');
INSERT INTO "privileges" VALUES (102,'covid-19-batches','covid-19-edit-batch.php','Edit Batch');
INSERT INTO "privileges" VALUES (103,'covid-19-results','covid-19-manual-results.php','Enter Result Manually');
INSERT INTO "privileges" VALUES (104,'covid-19-results','covid-19-import-result.php','Import Result File');
INSERT INTO "privileges" VALUES (105,'covid-19-management','covid-19-export-data.php','Export Data');
INSERT INTO "privileges" VALUES (106,'covid-19-management','covid-19-sample-rejection-report.php','Sample Rejection Report');
INSERT INTO "privileges" VALUES (107,'covid-19-management','covid-19-sample-status.php','Sample Status Report');
INSERT INTO "privileges" VALUES (108,'covid-19-requests','record-final-result.php','Record Final Result');
INSERT INTO "privileges" VALUES (109,'covid-19-requests','can-record-confirmatory-tests.php','Can Record Confirmatory Tests');
INSERT INTO "privileges" VALUES (110,'covid-19-requests','update-record-confirmatory-tests.php','Update Record Confirmatory Tests');
INSERT INTO "privileges" VALUES (111,'covid-19-batches','covid-19-confirmation-manifest.php','Covid-19 Confirmation Manifest');
INSERT INTO "privileges" VALUES (112,'covid-19-batches','covid-19-add-confirmation-manifest.php','Add New Confirmation Manifest');
INSERT INTO "privileges" VALUES (113,'covid-19-batches','generate-confirmation-manifest.php','Generate Positive Confirmation Manifest');
INSERT INTO "privileges" VALUES (114,'covid-19-batches','covid-19-edit-confirmation-manifest.php','Edit Positive Confirmation Manifest');
INSERT INTO "privileges" VALUES (121,'eid-management','eid-clinic-report.php','EID Clinic Reports');
INSERT INTO "privileges" VALUES (122,'covid-19-management','covid-19-clinic-report.php','Covid-19 Clinic Reports');
INSERT INTO "privileges" VALUES (123,'covid-19-reference','covid19-sample-type.php','Manage Reference');
INSERT INTO "privileges" VALUES (124,'covid-19-reference','covid19-comorbidities.php','Manage Comorbidities');
INSERT INTO "privileges" VALUES (125,'covid-19-reference','addCovid19Comorbidities.php','Add Comorbidities');
INSERT INTO "privileges" VALUES (126,'covid-19-reference','editCovid19Comorbidities.php','Edit Comorbidities');
INSERT INTO "privileges" VALUES (127,'covid-19-reference','covid19-sample-rejection-reasons.php','Manage Sample Rejection Reasons');
INSERT INTO "privileges" VALUES (128,'covid-19-reference','addCovid19SampleRejectionReason.php','Add Sample Rejection Reason');
INSERT INTO "privileges" VALUES (129,'covid-19-reference','editCovid19SampleRejectionReason.php','Edit Sample Rejection Reason');
INSERT INTO "privileges" VALUES (130,'vl-reference','vl-art-code-details.php','Manage Reference');
INSERT INTO "privileges" VALUES (131,'eid-reference','eid-sample-type.php','Manage Reference');
INSERT INTO "privileges" VALUES (139,'common-reference','province-details.php','Manage common Reference');
INSERT INTO "privileges" VALUES (140,'vl-test-request','edit-locked-vl-samples','Edit Locked VL Samples');
INSERT INTO "privileges" VALUES (141,'eid-requests','edit-locked-eid-samples','Edit Locked EID Samples');
INSERT INTO "privileges" VALUES (142,'covid-19-requests','edit-locked-covid19-samples','Edit Locked Covid-19 Samples');
INSERT INTO "privileges" VALUES (143,'vl-reports','vlMonthlyThresholdReport.php','Monthly Threshold Report');
INSERT INTO "privileges" VALUES (144,'eid-management','eidMonthlyThresholdReport.PHP','Monthly Threshold Report');
INSERT INTO "privileges" VALUES (145,'covid-19-management','covid19MonthlyThresholdReport.PHP','Monthly Threshold Report');
INSERT INTO "privileges" VALUES (146,'hepatitis-requests','hepatitis-requests.php','Access');
INSERT INTO "privileges" VALUES (147,'hepatitis-requests','hepatitis-add-request.php','Add');
INSERT INTO "privileges" VALUES (148,'hepatitis-requests','hepatitis-edit-request.php','Edit');
INSERT INTO "privileges" VALUES (149,'hepatitis-results','hepatitis-manual-results.php','Enter Result Manually');
INSERT INTO "privileges" VALUES (151,'hepatitis-requests','hepatitis-print-results.php','Print Results');
INSERT INTO "privileges" VALUES (152,'hepatitis-requests','hepatitis-result-status.php','Manage Result Status');
INSERT INTO "privileges" VALUES (153,'vl-reports','vlSuppressedTargetReport.php','Suppressed Target report');
INSERT INTO "privileges" VALUES (154,'hepatitis-batches','hepatitis-batches.php','View Batches');
INSERT INTO "privileges" VALUES (155,'hepatitis-batches','hepatitis-add-batch.php','Add Batch');
INSERT INTO "privileges" VALUES (156,'hepatitis-batches','hepatitis-edit-batch.php','Edit Batch');
INSERT INTO "privileges" VALUES (157,'hepatitis-batches','hepatitis-add-batch-position.php','Add Batch Position');
INSERT INTO "privileges" VALUES (158,'hepatitis-batches','hepatitis-edit-batch-position.php','Edit Batch Position');
INSERT INTO "privileges" VALUES (159,'hepatitis-requests','add-samples-from-manifest.php','Add Samples from Manifest');
INSERT INTO "privileges" VALUES (160,'hepatitis-reports','hepatitis-clinic-report.php','Hepatitis Clinic Reports');
INSERT INTO "privileges" VALUES (161,'hepatitis-reports','hepatitis-testing-target-report.php','Hepatitis Testing Target Reports');
INSERT INTO "privileges" VALUES (162,'hepatitis-reports','hepatitis-sample-rejection-report.php','Hepatitis Sample Rejection Reports');
INSERT INTO "privileges" VALUES (163,'hepatitis-reports','hepatitis-sample-status.php','Hepatitis Sample Status Reports');
INSERT INTO "province_details" VALUES (1,'Central Equatorial State','CES','2020-10-15 12:17:01',0);
INSERT INTO "province_details" VALUES (2,'Western Equatorial State','WES',NULL,0);
INSERT INTO "province_details" VALUES (3,'Nairobi',NULL,NULL,0);
INSERT INTO "province_details" VALUES (4,'Eastern Equatorial State',NULL,'2017-11-29 14:57:11',0);
INSERT INTO "province_details" VALUES (5,'Western Bahr-el -Gazal',NULL,'2018-01-26 08:39:05',0);
INSERT INTO "province_details" VALUES (6,'Western LakeS',NULL,'2018-07-19 11:11:53',0);
INSERT INTO "province_details" VALUES (7,'Eastern Lakes',NULL,'2018-08-13 12:42:24',0);
INSERT INTO "province_details" VALUES (8,'Jonglei State',NULL,'2020-08-25 09:17:21',0);
INSERT INTO "r_countries" VALUES (1,'Afghanistan','AF','AFG',4);
INSERT INTO "r_countries" VALUES (2,'Aland Islands','AX','ALA',248);
INSERT INTO "r_countries" VALUES (3,'Albania','AL','ALB',8);
INSERT INTO "r_countries" VALUES (4,'Algeria','DZ','DZA',12);
INSERT INTO "r_countries" VALUES (5,'American Samoa','AS','ASM',16);
INSERT INTO "r_countries" VALUES (6,'Andorra','AD','AND',20);
INSERT INTO "r_countries" VALUES (7,'Angola','AO','AGO',24);
INSERT INTO "r_countries" VALUES (8,'Anguilla','AI','AIA',660);
INSERT INTO "r_countries" VALUES (9,'Antarctica','AQ','ATA',10);
INSERT INTO "r_countries" VALUES (10,'Antigua and Barbuda','AG','ATG',28);
INSERT INTO "r_countries" VALUES (11,'Argentina','AR','ARG',32);
INSERT INTO "r_countries" VALUES (12,'Armenia','AM','ARM',51);
INSERT INTO "r_countries" VALUES (13,'Aruba','AW','ABW',533);
INSERT INTO "r_countries" VALUES (14,'Australia','AU','AUS',36);
INSERT INTO "r_countries" VALUES (15,'Austria','AT','AUT',40);
INSERT INTO "r_countries" VALUES (16,'Azerbaijan','AZ','AZE',31);
INSERT INTO "r_countries" VALUES (17,'Bahamas','BS','BHS',44);
INSERT INTO "r_countries" VALUES (18,'Bahrain','BH','BHR',48);
INSERT INTO "r_countries" VALUES (19,'Bangladesh','BD','BGD',50);
INSERT INTO "r_countries" VALUES (20,'Barbados','BB','BRB',52);
INSERT INTO "r_countries" VALUES (21,'Belarus','BY','BLR',112);
INSERT INTO "r_countries" VALUES (22,'Belgium','BE','BEL',56);
INSERT INTO "r_countries" VALUES (23,'Belize','BZ','BLZ',84);
INSERT INTO "r_countries" VALUES (24,'Benin','BJ','BEN',204);
INSERT INTO "r_countries" VALUES (25,'Bermuda','BM','BMU',60);
INSERT INTO "r_countries" VALUES (26,'Bhutan','BT','BTN',64);
INSERT INTO "r_countries" VALUES (27,'Bolivia, Plurinational State of','BO','BOL',68);
INSERT INTO "r_countries" VALUES (28,'Bonaire, Sint Eustatius and Saba','BQ','BES',535);
INSERT INTO "r_countries" VALUES (29,'Bosnia and Herzegovina','BA','BIH',70);
INSERT INTO "r_countries" VALUES (30,'Botswana','BW','BWA',72);
INSERT INTO "r_countries" VALUES (31,'Bouvet Island','BV','BVT',74);
INSERT INTO "r_countries" VALUES (32,'Brazil','BR','BRA',76);
INSERT INTO "r_countries" VALUES (33,'British Indian Ocean Territory','IO','IOT',86);
INSERT INTO "r_countries" VALUES (34,'Brunei Darussalam','BN','BRN',96);
INSERT INTO "r_countries" VALUES (35,'Bulgaria','BG','BGR',100);
INSERT INTO "r_countries" VALUES (36,'Burkina Faso','BF','BFA',854);
INSERT INTO "r_countries" VALUES (37,'Burundi','BI','BDI',108);
INSERT INTO "r_countries" VALUES (38,'Cambodia','KH','KHM',116);
INSERT INTO "r_countries" VALUES (39,'Cameroon','CM','CMR',120);
INSERT INTO "r_countries" VALUES (40,'Canada','CA','CAN',124);
INSERT INTO "r_countries" VALUES (41,'Cape Verde','CV','CPV',132);
INSERT INTO "r_countries" VALUES (42,'Cayman Islands','KY','CYM',136);
INSERT INTO "r_countries" VALUES (43,'Central African Republic','CF','CAF',140);
INSERT INTO "r_countries" VALUES (44,'Chad','TD','TCD',148);
INSERT INTO "r_countries" VALUES (45,'Chile','CL','CHL',152);
INSERT INTO "r_countries" VALUES (46,'China','CN','CHN',156);
INSERT INTO "r_countries" VALUES (47,'Christmas Island','CX','CXR',162);
INSERT INTO "r_countries" VALUES (48,'Cocos (Keeling) Islands','CC','CCK',166);
INSERT INTO "r_countries" VALUES (49,'Colombia','CO','COL',170);
INSERT INTO "r_countries" VALUES (50,'Comoros','KM','COM',174);
INSERT INTO "r_countries" VALUES (51,'Congo','CG','COG',178);
INSERT INTO "r_countries" VALUES (52,'Congo, the Democratic Republic of the','CD','COD',180);
INSERT INTO "r_countries" VALUES (53,'Cook Islands','CK','COK',184);
INSERT INTO "r_countries" VALUES (54,'Costa Rica','CR','CRI',188);
INSERT INTO "r_countries" VALUES (55,'Cote d''Ivoire','CI','CIV',384);
INSERT INTO "r_countries" VALUES (56,'Croatia','HR','HRV',191);
INSERT INTO "r_countries" VALUES (57,'Cuba','CU','CUB',192);
INSERT INTO "r_countries" VALUES (58,'Cura','CW','CUW',531);
INSERT INTO "r_countries" VALUES (59,'Cyprus','CY','CYP',196);
INSERT INTO "r_countries" VALUES (60,'Czech Republic','CZ','CZE',203);
INSERT INTO "r_countries" VALUES (61,'Denmark','DK','DNK',208);
INSERT INTO "r_countries" VALUES (62,'Djibouti','DJ','DJI',262);
INSERT INTO "r_countries" VALUES (63,'Dominica','DM','DMA',212);
INSERT INTO "r_countries" VALUES (64,'Dominican Republic','DO','DOM',214);
INSERT INTO "r_countries" VALUES (65,'Ecuador','EC','ECU',218);
INSERT INTO "r_countries" VALUES (66,'Egypt','EG','EGY',818);
INSERT INTO "r_countries" VALUES (67,'El Salvador','SV','SLV',222);
INSERT INTO "r_countries" VALUES (68,'Equatorial Guinea','GQ','GNQ',226);
INSERT INTO "r_countries" VALUES (69,'Eritrea','ER','ERI',232);
INSERT INTO "r_countries" VALUES (70,'Estonia','EE','EST',233);
INSERT INTO "r_countries" VALUES (71,'Ethiopia','ET','ETH',231);
INSERT INTO "r_countries" VALUES (72,'Falkland Islands (Malvinas)','FK','FLK',238);
INSERT INTO "r_countries" VALUES (73,'Faroe Islands','FO','FRO',234);
INSERT INTO "r_countries" VALUES (74,'Fiji','FJ','FJI',242);
INSERT INTO "r_countries" VALUES (75,'Finland','FI','FIN',246);
INSERT INTO "r_countries" VALUES (76,'France','FR','FRA',250);
INSERT INTO "r_countries" VALUES (77,'French Guiana','GF','GUF',254);
INSERT INTO "r_countries" VALUES (78,'French Polynesia','PF','PYF',258);
INSERT INTO "r_countries" VALUES (79,'French Southern Territories','TF','ATF',260);
INSERT INTO "r_countries" VALUES (80,'Gabon','GA','GAB',266);
INSERT INTO "r_countries" VALUES (81,'Gambia','GM','GMB',270);
INSERT INTO "r_countries" VALUES (82,'Georgia','GE','GEO',268);
INSERT INTO "r_countries" VALUES (83,'Germany','DE','DEU',276);
INSERT INTO "r_countries" VALUES (84,'Ghana','GH','GHA',288);
INSERT INTO "r_countries" VALUES (85,'Gibraltar','GI','GIB',292);
INSERT INTO "r_countries" VALUES (86,'Greece','GR','GRC',300);
INSERT INTO "r_countries" VALUES (87,'Greenland','GL','GRL',304);
INSERT INTO "r_countries" VALUES (88,'Grenada','GD','GRD',308);
INSERT INTO "r_countries" VALUES (89,'Guadeloupe','GP','GLP',312);
INSERT INTO "r_countries" VALUES (90,'Guam','GU','GUM',316);
INSERT INTO "r_countries" VALUES (91,'Guatemala','GT','GTM',320);
INSERT INTO "r_countries" VALUES (92,'Guernsey','GG','GGY',831);
INSERT INTO "r_countries" VALUES (93,'Guinea','GN','GIN',324);
INSERT INTO "r_countries" VALUES (94,'Guinea-Bissau','GW','GNB',624);
INSERT INTO "r_countries" VALUES (95,'Guyana','GY','GUY',328);
INSERT INTO "r_countries" VALUES (96,'Haiti','HT','HTI',332);
INSERT INTO "r_countries" VALUES (97,'Heard Island and McDonald Islands','HM','HMD',334);
INSERT INTO "r_countries" VALUES (98,'Holy See (Vatican City State)','VA','VAT',336);
INSERT INTO "r_countries" VALUES (99,'Honduras','HN','HND',340);
INSERT INTO "r_countries" VALUES (100,'Hong Kong','HK','HKG',344);
INSERT INTO "r_countries" VALUES (101,'Hungary','HU','HUN',348);
INSERT INTO "r_countries" VALUES (102,'Iceland','IS','ISL',352);
INSERT INTO "r_countries" VALUES (103,'India','IN','IND',356);
INSERT INTO "r_countries" VALUES (104,'Indonesia','ID','IDN',360);
INSERT INTO "r_countries" VALUES (105,'Iran, Islamic Republic of','IR','IRN',364);
INSERT INTO "r_countries" VALUES (106,'Iraq','IQ','IRQ',368);
INSERT INTO "r_countries" VALUES (107,'Ireland','IE','IRL',372);
INSERT INTO "r_countries" VALUES (108,'Isle of Man','IM','IMN',833);
INSERT INTO "r_countries" VALUES (109,'Israel','IL','ISR',376);
INSERT INTO "r_countries" VALUES (110,'Italy','IT','ITA',380);
INSERT INTO "r_countries" VALUES (111,'Jamaica','JM','JAM',388);
INSERT INTO "r_countries" VALUES (112,'Japan','JP','JPN',392);
INSERT INTO "r_countries" VALUES (113,'Jersey','JE','JEY',832);
INSERT INTO "r_countries" VALUES (114,'Jordan','JO','JOR',400);
INSERT INTO "r_countries" VALUES (115,'Kazakhstan','KZ','KAZ',398);
INSERT INTO "r_countries" VALUES (116,'Kenya','KE','KEN',404);
INSERT INTO "r_countries" VALUES (117,'Kiribati','KI','KIR',296);
INSERT INTO "r_countries" VALUES (118,'Korea, Democratic People''s Republic of','KP','PRK',408);
INSERT INTO "r_countries" VALUES (119,'Korea, Republic of','KR','KOR',410);
INSERT INTO "r_countries" VALUES (120,'Kuwait','KW','KWT',414);
INSERT INTO "r_countries" VALUES (121,'Kyrgyzstan','KG','KGZ',417);
INSERT INTO "r_countries" VALUES (122,'Lao People''s Democratic Republic','LA','LAO',418);
INSERT INTO "r_countries" VALUES (123,'Latvia','LV','LVA',428);
INSERT INTO "r_countries" VALUES (124,'Lebanon','LB','LBN',422);
INSERT INTO "r_countries" VALUES (125,'Lesotho','LS','LSO',426);
INSERT INTO "r_countries" VALUES (126,'Liberia','LR','LBR',430);
INSERT INTO "r_countries" VALUES (127,'Libya','LY','LBY',434);
INSERT INTO "r_countries" VALUES (128,'Liechtenstein','LI','LIE',438);
INSERT INTO "r_countries" VALUES (129,'Lithuania','LT','LTU',440);
INSERT INTO "r_countries" VALUES (130,'Luxembourg','LU','LUX',442);
INSERT INTO "r_countries" VALUES (131,'Macao','MO','MAC',446);
INSERT INTO "r_countries" VALUES (132,'Macedonia, the former Yugoslav Republic of','MK','MKD',807);
INSERT INTO "r_countries" VALUES (133,'Madagascar','MG','MDG',450);
INSERT INTO "r_countries" VALUES (134,'Malawi','MW','MWI',454);
INSERT INTO "r_countries" VALUES (135,'Malaysia','MY','MYS',458);
INSERT INTO "r_countries" VALUES (136,'Maldives','MV','MDV',462);
INSERT INTO "r_countries" VALUES (137,'Mali','ML','MLI',466);
INSERT INTO "r_countries" VALUES (138,'Malta','MT','MLT',470);
INSERT INTO "r_countries" VALUES (139,'Marshall Islands','MH','MHL',584);
INSERT INTO "r_countries" VALUES (140,'Martinique','MQ','MTQ',474);
INSERT INTO "r_countries" VALUES (141,'Mauritania','MR','MRT',478);
INSERT INTO "r_countries" VALUES (142,'Mauritius','MU','MUS',480);
INSERT INTO "r_countries" VALUES (143,'Mayotte','YT','MYT',175);
INSERT INTO "r_countries" VALUES (144,'Mexico','MX','MEX',484);
INSERT INTO "r_countries" VALUES (145,'Micronesia, Federated States of','FM','FSM',583);
INSERT INTO "r_countries" VALUES (146,'Moldova, Republic of','MD','MDA',498);
INSERT INTO "r_countries" VALUES (147,'Monaco','MC','MCO',492);
INSERT INTO "r_countries" VALUES (148,'Mongolia','MN','MNG',496);
INSERT INTO "r_countries" VALUES (149,'Montenegro','ME','MNE',499);
INSERT INTO "r_countries" VALUES (150,'Montserrat','MS','MSR',500);
INSERT INTO "r_countries" VALUES (151,'Morocco','MA','MAR',504);
INSERT INTO "r_countries" VALUES (152,'Mozambique','MZ','MOZ',508);
INSERT INTO "r_countries" VALUES (153,'Myanmar','MM','MMR',104);
INSERT INTO "r_countries" VALUES (154,'Namibia','NA','NAM',516);
INSERT INTO "r_countries" VALUES (155,'Nauru','NR','NRU',520);
INSERT INTO "r_countries" VALUES (156,'Nepal','NP','NPL',524);
INSERT INTO "r_countries" VALUES (157,'Netherlands','NL','NLD',528);
INSERT INTO "r_countries" VALUES (158,'New Caledonia','NC','NCL',540);
INSERT INTO "r_countries" VALUES (159,'New Zealand','NZ','NZL',554);
INSERT INTO "r_countries" VALUES (160,'Nicaragua','NI','NIC',558);
INSERT INTO "r_countries" VALUES (161,'Niger','NE','NER',562);
INSERT INTO "r_countries" VALUES (162,'Nigeria','NG','NGA',566);
INSERT INTO "r_countries" VALUES (163,'Niue','NU','NIU',570);
INSERT INTO "r_countries" VALUES (164,'Norfolk Island','NF','NFK',574);
INSERT INTO "r_countries" VALUES (165,'Northern Mariana Islands','MP','MNP',580);
INSERT INTO "r_countries" VALUES (166,'Norway','NO','NOR',578);
INSERT INTO "r_countries" VALUES (167,'Oman','OM','OMN',512);
INSERT INTO "r_countries" VALUES (168,'Pakistan','PK','PAK',586);
INSERT INTO "r_countries" VALUES (169,'Palau','PW','PLW',585);
INSERT INTO "r_countries" VALUES (170,'Palestine, State of','PS','PSE',275);
INSERT INTO "r_countries" VALUES (171,'Panama','PA','PAN',591);
INSERT INTO "r_countries" VALUES (172,'Papua New Guinea','PG','PNG',598);
INSERT INTO "r_countries" VALUES (173,'Paraguay','PY','PRY',600);
INSERT INTO "r_countries" VALUES (174,'Peru','PE','PER',604);
INSERT INTO "r_countries" VALUES (175,'Philippines','PH','PHL',608);
INSERT INTO "r_countries" VALUES (176,'Pitcairn','PN','PCN',612);
INSERT INTO "r_countries" VALUES (177,'Poland','PL','POL',616);
INSERT INTO "r_countries" VALUES (178,'Portugal','PT','PRT',620);
INSERT INTO "r_countries" VALUES (179,'Puerto Rico','PR','PRI',630);
INSERT INTO "r_countries" VALUES (180,'Qatar','QA','QAT',634);
INSERT INTO "r_countries" VALUES (181,'Reunion','RE','REU',638);
INSERT INTO "r_countries" VALUES (182,'Romania','RO','ROU',642);
INSERT INTO "r_countries" VALUES (183,'Russian Federation','RU','RUS',643);
INSERT INTO "r_countries" VALUES (184,'Rwanda','RW','RWA',646);
INSERT INTO "r_countries" VALUES (185,'Saint Barthelemy','BL','BLM',652);
INSERT INTO "r_countries" VALUES (186,'Saint Helena, Ascension and Tristan da Cunha','SH','SHN',654);
INSERT INTO "r_countries" VALUES (187,'Saint Kitts and Nevis','KN','KNA',659);
INSERT INTO "r_countries" VALUES (188,'Saint Lucia','LC','LCA',662);
INSERT INTO "r_countries" VALUES (189,'Saint Martin (French part)','MF','MAF',663);
INSERT INTO "r_countries" VALUES (190,'Saint Pierre and Miquelon','PM','SPM',666);
INSERT INTO "r_countries" VALUES (191,'Saint Vincent and the Grenadines','VC','VCT',670);
INSERT INTO "r_countries" VALUES (192,'Samoa','WS','WSM',882);
INSERT INTO "r_countries" VALUES (193,'San Marino','SM','SMR',674);
INSERT INTO "r_countries" VALUES (194,'Sao Tome and Principe','ST','STP',678);
INSERT INTO "r_countries" VALUES (195,'Saudi Arabia','SA','SAU',682);
INSERT INTO "r_countries" VALUES (196,'Senegal','SN','SEN',686);
INSERT INTO "r_countries" VALUES (197,'Serbia','RS','SRB',688);
INSERT INTO "r_countries" VALUES (198,'Seychelles','SC','SYC',690);
INSERT INTO "r_countries" VALUES (199,'Sierra Leone','SL','SLE',694);
INSERT INTO "r_countries" VALUES (200,'Singapore','SG','SGP',702);
INSERT INTO "r_countries" VALUES (201,'Sint Maarten (Dutch part)','SX','SXM',534);
INSERT INTO "r_countries" VALUES (202,'Slovakia','SK','SVK',703);
INSERT INTO "r_countries" VALUES (203,'Slovenia','SI','SVN',705);
INSERT INTO "r_countries" VALUES (204,'Solomon Islands','SB','SLB',90);
INSERT INTO "r_countries" VALUES (205,'Somalia','SO','SOM',706);
INSERT INTO "r_countries" VALUES (206,'South Africa','ZA','ZAF',710);
INSERT INTO "r_countries" VALUES (207,'South Georgia and the South Sandwich Islands','GS','SGS',239);
INSERT INTO "r_countries" VALUES (208,'South Sudan','SS','SSD',728);
INSERT INTO "r_countries" VALUES (209,'Spain','ES','ESP',724);
INSERT INTO "r_countries" VALUES (210,'Sri Lanka','LK','LKA',144);
INSERT INTO "r_countries" VALUES (211,'Sudan','SD','SDN',729);
INSERT INTO "r_countries" VALUES (212,'Suriname','SR','SUR',740);
INSERT INTO "r_countries" VALUES (213,'Svalbard and Jan Mayen','SJ','SJM',744);
INSERT INTO "r_countries" VALUES (214,'Swaziland','SZ','SWZ',748);
INSERT INTO "r_countries" VALUES (215,'Sweden','SE','SWE',752);
INSERT INTO "r_countries" VALUES (216,'Switzerland','CH','CHE',756);
INSERT INTO "r_countries" VALUES (217,'Syrian Arab Republic','SY','SYR',760);
INSERT INTO "r_countries" VALUES (218,'Taiwan, Province of China','TW','TWN',158);
INSERT INTO "r_countries" VALUES (219,'Tajikistan','TJ','TJK',762);
INSERT INTO "r_countries" VALUES (220,'Tanzania, United Republic of','TZ','TZA',834);
INSERT INTO "r_countries" VALUES (221,'Thailand','TH','THA',764);
INSERT INTO "r_countries" VALUES (222,'Timor-Leste','TL','TLS',626);
INSERT INTO "r_countries" VALUES (223,'Togo','TG','TGO',768);
INSERT INTO "r_countries" VALUES (224,'Tokelau','TK','TKL',772);
INSERT INTO "r_countries" VALUES (225,'Tonga','TO','TON',776);
INSERT INTO "r_countries" VALUES (226,'Trinidad and Tobago','TT','TTO',780);
INSERT INTO "r_countries" VALUES (227,'Tunisia','TN','TUN',788);
INSERT INTO "r_countries" VALUES (228,'Turkey','TR','TUR',792);
INSERT INTO "r_countries" VALUES (229,'Turkmenistan','TM','TKM',795);
INSERT INTO "r_countries" VALUES (230,'Turks and Caicos Islands','TC','TCA',796);
INSERT INTO "r_countries" VALUES (231,'Tuvalu','TV','TUV',798);
INSERT INTO "r_countries" VALUES (232,'Uganda','UG','UGA',800);
INSERT INTO "r_countries" VALUES (233,'Ukraine','UA','UKR',804);
INSERT INTO "r_countries" VALUES (234,'United Arab Emirates','AE','ARE',784);
INSERT INTO "r_countries" VALUES (235,'United Kingdom','GB','GBR',826);
INSERT INTO "r_countries" VALUES (236,'United States','US','USA',840);
INSERT INTO "r_countries" VALUES (237,'United States Minor Outlying Islands','UM','UMI',581);
INSERT INTO "r_countries" VALUES (238,'Uruguay','UY','URY',858);
INSERT INTO "r_countries" VALUES (239,'Uzbekistan','UZ','UZB',860);
INSERT INTO "r_countries" VALUES (240,'Vanuatu','VU','VUT',548);
INSERT INTO "r_countries" VALUES (241,'Venezuela, Bolivarian Republic of','VE','VEN',862);
INSERT INTO "r_countries" VALUES (242,'Vietnam','VN','VNM',704);
INSERT INTO "r_countries" VALUES (243,'Virgin Islands, British','VG','VGB',92);
INSERT INTO "r_countries" VALUES (244,'Virgin Islands, U.S.','VI','VIR',850);
INSERT INTO "r_countries" VALUES (245,'Wallis and Futuna','WF','WLF',876);
INSERT INTO "r_countries" VALUES (246,'Western Sahara','EH','ESH',732);
INSERT INTO "r_countries" VALUES (247,'Yemen','YE','YEM',887);
INSERT INTO "r_countries" VALUES (248,'Zambia','ZM','ZMB',894);
INSERT INTO "r_countries" VALUES (249,'Zimbabwe','ZW','ZWE',716);
INSERT INTO "r_covid19_results" VALUES ('indeterminate','Indeterminate','active',NULL,0);
INSERT INTO "r_covid19_results" VALUES ('negative','Negative','active',NULL,0);
INSERT INTO "r_covid19_results" VALUES ('positive','Positive','active',NULL,0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (1,'Poorly labelled specimen','general','active','Gen_PLSP','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (2,'Mismatched sample and form labeling','general','active','Gen_MMSP','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (3,'Missing labels on container or tracking form','general','active','Gen_MLTS','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (4,'Sample without request forms/Tracking forms','general','active','Gen_SMRT','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (5,'Name/Information of requester is missing','general','active','Gen_NIRM','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (6,'Missing information on request form - Age','general','active','Gen_MIRA','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (7,'Missing information on request form - Sex','general','active','Gen_MIRS','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (8,'Missing information on request form - Sample Collection Date','general','active','Gen_MIRD','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (9,'Missing information on request form - ART No','general','active','Gen_MIAN','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (10,'Inappropriate specimen packing','general','active','Gen_ISPK','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (11,'Inappropriate specimen for test request','general','active','Gen_ISTR','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (12,'Form received without Sample','general','active','Gen_NoSample','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (13,'VL Machine Flag','testing','active','FLG_','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (14,'CNTRL_FAIL','testing','active','FLG_AL00','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (15,'SYS_ERROR','testing','active','FLG_TM00','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (16,'A/D_ABORT','testing','active','FLG_TM17','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (17,'KIT_EXPIRY','testing','active','FLG_TMAP','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (18,'RUN_EXPIRY','testing','active','FLG_TM19','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (19,'DATA_ERROR','testing','active','FLG_TM20','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (20,'NC_INVALID','testing','active','FLG_TM24','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (21,'LPCINVALID','testing','active','FLG_TM25','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (22,'MPCINVALID','testing','active','FLG_TM26','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (23,'HPCINVALID','testing','active','FLG_TM27','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (24,'S_INVALID','testing','active','FLG_TM29','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (25,'MATH_ERROR','testing','active','FLG_TM31','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (26,'PRECHECK','testing','active','FLG_TM44 ','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (27,'QS_INVALID','testing','active','FLG_TM50','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (28,'POSTCHECK','testing','active','FLG_TM51','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (29,'REAG_ERROR','testing','active','FLG_AP02 ','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (30,'NO_SAMPLE','testing','active','FLG_AP12','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (31,'DISP_ERROR','testing','active','FLG_AP13 ','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (32,'TEMP_RANGE','testing','active','FLG_AP19 ','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (33,'PREP_ABORT','testing','active','FLG_AP24','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_rejection_reasons" VALUES (34,'SAMPLECLOT','testing','active','FLG_AP25','2019-12-17 12:44:29',0);
INSERT INTO "r_covid19_sample_type" VALUES (1,'Oropharyngeal swab','active',NULL,0);
INSERT INTO "r_covid19_sample_type" VALUES (2,'Nasopharyngeal  swab','active',NULL,0);
INSERT INTO "r_covid19_sample_type" VALUES (3,'Serum','active',NULL,0);
INSERT INTO "r_covid19_test_reasons" VALUES (1,'Suspect',NULL,'active',NULL);
INSERT INTO "r_covid19_test_reasons" VALUES (2,'Contact',NULL,'active',NULL);
INSERT INTO "r_covid19_test_reasons" VALUES (3,'Postmortem',NULL,'active',NULL);
INSERT INTO "r_covid19_test_reasons" VALUES (4,'Treatment Discharge',NULL,'active',NULL);
INSERT INTO "r_covid19_test_reasons" VALUES (5,'Follow up',NULL,'active',NULL);
INSERT INTO "r_covid19_test_reasons" VALUES (6,'Alert',NULL,'active',NULL);
INSERT INTO "r_covid19_test_reasons" VALUES (7,'Screening',NULL,'active',NULL);
INSERT INTO "r_eid_results" VALUES ('indeterminate','Indeterminate','active',0);
INSERT INTO "r_eid_results" VALUES ('negative','Negative','active',0);
INSERT INTO "r_eid_results" VALUES ('positive','Positive','active',0);
INSERT INTO "r_eid_sample_type" VALUES (1,'DBS','active',NULL,0);
INSERT INTO "r_eid_sample_type" VALUES (2,'Whole Blood','active',NULL,0);
INSERT INTO "r_funding_sources" VALUES (1,'MOH','active',NULL,0);
INSERT INTO "r_hepatitis_comorbidities" VALUES (1,'Diabetes','active','2020-11-17 16:32:11');
INSERT INTO "r_hepatitis_comorbidities" VALUES (2,'Chronic renal failure','active','2020-11-17 16:32:11');
INSERT INTO "r_hepatitis_comorbidities" VALUES (3,'Cancer','active','2020-11-17 16:32:11');
INSERT INTO "r_hepatitis_comorbidities" VALUES (4,'HIV infection','active','2020-11-17 16:32:11');
INSERT INTO "r_hepatitis_comorbidities" VALUES (5,'Cardiovascular disease','active','2020-11-17 16:32:11');
INSERT INTO "r_hepatitis_comorbidities" VALUES (6,'HPV','active','2020-11-17 16:32:11');
INSERT INTO "r_hepatitis_results" VALUES ('negative','Negative','active',NULL,0);
INSERT INTO "r_hepatitis_results" VALUES ('positive','Positive','active',NULL,0);
INSERT INTO "r_hepatitis_risk_factors" VALUES (1,'Ever diagnosed with a liver disease','active','2020-11-17 16:35:09');
INSERT INTO "r_hepatitis_risk_factors" VALUES (2,'Viral hepatitis in the family','active','2020-11-17 16:35:09');
INSERT INTO "r_hepatitis_risk_factors" VALUES (3,'Ever been operated','active','2020-11-17 16:35:09');
INSERT INTO "r_hepatitis_risk_factors" VALUES (4,'Ever been traditionally operated (ibyinyo, ibirimi, indasago, scarification, tattoo)','active','2020-11-17 16:35:09');
INSERT INTO "r_hepatitis_risk_factors" VALUES (5,'Ever been transfused','active','2020-11-17 16:35:09');
INSERT INTO "r_hepatitis_risk_factors" VALUES (6,'Having more than one sexually partner','active','2020-11-17 16:35:09');
INSERT INTO "r_hepatitis_risk_factors" VALUES (7,'Ever experienced a physical trauma','active','2020-11-17 16:35:09');
INSERT INTO "r_hepatitis_sample_type" VALUES (1,'Whole Blood','active',NULL,0);
INSERT INTO "r_implementation_partners" VALUES (1,'MOH','active',NULL,0);
INSERT INTO "r_sample_controls" VALUES (1,'S');
INSERT INTO "r_sample_controls" VALUES (2,'Control');
INSERT INTO "r_sample_controls" VALUES (3,'HPC');
INSERT INTO "r_sample_controls" VALUES (4,'LPC');
INSERT INTO "r_sample_controls" VALUES (5,'NC');
INSERT INTO "r_sample_controls" VALUES (6,'Calibrator');
INSERT INTO "r_sample_status" VALUES (1,'Hold','active');
INSERT INTO "r_sample_status" VALUES (2,'Lost','active');
INSERT INTO "r_sample_status" VALUES (3,'Sample Reordered','active');
INSERT INTO "r_sample_status" VALUES (4,'Rejected','active');
INSERT INTO "r_sample_status" VALUES (5,'Invalid','active');
INSERT INTO "r_sample_status" VALUES (6,'Sample Registered at VL Lab','active');
INSERT INTO "r_sample_status" VALUES (7,'Accepted','active');
INSERT INTO "r_sample_status" VALUES (8,'Awaiting Approval','active');
INSERT INTO "r_sample_status" VALUES (9,'Sample Registered at Health Center','active');
INSERT INTO "r_vl_art_regimen" VALUES (1,'1a = AZT+3TC+EFV',2,'Adult 1st Line Regimens','sudan','active','2020-11-20 16:57:47',0);
INSERT INTO "r_vl_art_regimen" VALUES (2,'1b = AZT+3TC+NVP',0,'Adult 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (3,'1c = d4T+3TC+EFV',0,'Adult 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (4,'1d = d4T+3TC+NVP',0,'Adult 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (5,'1f  = TDF+3TC+EFV',0,'Adult 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (6,'1g = TDF+3TC+NVP',0,'Adult 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (7,'1h = TDF +FTC+ EFV',0,'Adult 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (8,'1j = TDF+FTC+NVP',0,'Adult 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (9,'1k=ABC+3TC+EFV',0,'Adult 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (10,'1m=ABC+3TC+NVP',0,'Adult 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (11,'1k=ABC+3TC+EFV',0,'Adult 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (12,'1m=ABC+3TC+NVP',0,'Adult 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (13,'2a = ABC+ddI+LPV/r',0,'Adult 2nd Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (14,'2b = ABC+ddI+NFV',0,'Adult 2nd Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (15,'2c = TDF+ddI+LPV/r',0,'Adult 2nd Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (16,'2d = TDF+ddI+NFV',0,'Adult 2nd Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (17,'2e = TDF+3TC+LPV/r',0,'Adult 2nd Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (18,'2f = TDF+3TC+ATZ/r',0,'Adult 2nd Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (19,'2g = AZT+3TC+LPV/r',0,'Adult 2nd Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (20,'2h = AZT+3TC+ATZ/r',0,'Adult 2nd Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (21,'4a = AZT+3TC+NVP',1,'Child 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (22,'4b = AZT+3TC+NFV',2,'Child 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (23,'4c = d4T+3TC+NVP',3,'Child 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (24,'4d = d4T+3TC+EFV',4,'Child 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (25,'4f  = ABC+3TC+NVP',5,'Child 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (26,'4g = ABC+3TC+EFV',6,'Child 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (27,'4h = TDF+3TC+EFV',7,'Child 1st Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (28,'5a = ABC+ddI+LPV/r',13,'Child 2nd Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (29,'5b = AZT+3TC+LPV/r',14,'Child 2nd Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (30,'5c = ABC+3TC+LPV/r',15,'Child 2nd Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (31,'5d = TDF+3TC+LPV/r',16,'Child 2nd Line Regimens','sudan','active',NULL,0);
INSERT INTO "r_vl_art_regimen" VALUES (32,'TDF/3TC/DTG',1,NULL,'sudan','active','2019-08-15 08:47:09',0);
INSERT INTO "r_vl_art_regimen" VALUES (33,'TLD120',1,NULL,'sudan','active','2019-08-16 13:28:03',0);
INSERT INTO "r_vl_art_regimen" VALUES (34,'ABC/3TC/DTG',1,NULL,'sudan','active','2019-08-16 13:35:19',0);
INSERT INTO "r_vl_art_regimen" VALUES (35,'TLD90',1,NULL,'sudan','active','2019-08-16 14:22:52',0);
INSERT INTO "r_vl_art_regimen" VALUES (36,'2K',1,NULL,'sudan','active','2019-08-20 09:29:42',0);
INSERT INTO "r_vl_art_regimen" VALUES (37,'1E',1,NULL,'sudan','active','2019-08-21 10:43:30',0);
INSERT INTO "r_vl_art_regimen" VALUES (38,'4i',1,NULL,'sudan','active','2019-08-22 07:32:30',0);
INSERT INTO "r_vl_art_regimen" VALUES (39,'1C+CPT',20,'','sudan','active','2020-11-20 18:18:01',0);
INSERT INTO "r_vl_art_regimen" VALUES (40,'TLD',1,NULL,'sudan','active','2019-11-21 06:36:58',0);
INSERT INTO "r_vl_art_regimen" VALUES (41,'5i',1,NULL,'sudan','active','2019-11-22 09:22:47',0);
INSERT INTO "r_vl_art_regimen" VALUES (42,'4I (TLD)',1,NULL,'sudan','active','2019-12-04 11:15:23',0);
INSERT INTO "r_vl_art_regimen" VALUES (43,'1C/90',1,NULL,'sudan','active','2019-12-06 07:57:37',0);
INSERT INTO "r_vl_art_regimen" VALUES (44,'TDF/3TC/DTG/90',1,NULL,'sudan','active','2019-12-06 08:48:56',0);
INSERT INTO "r_vl_art_regimen" VALUES (45,'TLIS',1,NULL,'sudan','active','2019-12-06 14:06:31',0);
INSERT INTO "r_vl_art_regimen" VALUES (46,'1C/180',1,NULL,'sudan','active','2019-12-10 13:16:02',0);
INSERT INTO "r_vl_art_regimen" VALUES (47,'4I/30',1,NULL,'sudan','active','2019-12-10 13:25:13',0);
INSERT INTO "r_vl_art_regimen" VALUES (48,'1F+CPT',1,NULL,'sudan','active','2019-12-12 09:55:25',0);
INSERT INTO "r_vl_art_regimen" VALUES (49,'49',1,NULL,'sudan','active','2019-12-16 09:10:42',0);
INSERT INTO "r_vl_art_regimen" VALUES (50,'5i/90',1,NULL,'sudan','active','2019-12-18 05:51:00',0);
INSERT INTO "r_vl_art_regimen" VALUES (51,'DTG/1C',1,NULL,'sudan','active','2019-12-19 12:34:33',0);
INSERT INTO "r_vl_art_regimen" VALUES (52,'ABH/ICLLPVIR',1,NULL,'sudan','active','2019-12-23 10:47:34',0);
INSERT INTO "r_vl_art_regimen" VALUES (53,'IC(TLD)',1,NULL,'sudan','active','2019-12-27 13:21:08',0);
INSERT INTO "r_vl_art_regimen" VALUES (54,'IF/90',1,NULL,'sudan','active','2020-01-02 10:28:25',0);
INSERT INTO "r_vl_art_regimen" VALUES (55,'IF/180',1,NULL,'sudan','active','2020-01-07 11:59:33',0);
INSERT INTO "r_vl_art_regimen" VALUES (56,'4I/90',1,NULL,'sudan','active','2020-01-10 11:37:27',0);
INSERT INTO "r_vl_art_regimen" VALUES (57,'1C/CTX',1,NULL,'sudan','active','2020-01-20 12:12:09',0);
INSERT INTO "r_vl_art_regimen" VALUES (58,'1K',1,NULL,'sudan','active','2020-01-23 08:38:21',0);
INSERT INTO "r_vl_art_regimen" VALUES (59,'TDF/3TC/EF2',1,NULL,'sudan','active','2020-01-27 08:24:15',0);
INSERT INTO "r_vl_art_regimen" VALUES (60,'5H',1,NULL,'sudan','active','2020-02-04 06:45:20',0);
INSERT INTO "r_vl_art_regimen" VALUES (61,'TLD180',1,NULL,'sudan','active','2020-03-10 12:33:58',0);
INSERT INTO "r_vl_art_regimen" VALUES (62,'TLE-IF',1,NULL,'sudan','active','2020-04-03 15:19:20',0);
INSERT INTO "r_vl_art_regimen" VALUES (63,'1D (TLD)',1,NULL,'sudan','active','2020-04-09 10:53:05',0);
INSERT INTO "r_vl_art_regimen" VALUES (64,'4i/60',1,NULL,'sudan','active','2020-06-24 07:06:48',0);
INSERT INTO "r_vl_art_regimen" VALUES (65,'AZT/3TC/EFZ',1,NULL,'sudan','active','2020-07-13 11:29:30',0);
INSERT INTO "r_vl_art_regimen" VALUES (66,'4K',1,NULL,'sudan','active','2020-08-04 14:30:05',0);
INSERT INTO "r_vl_art_regimen" VALUES (67,'IF+IC',1,NULL,'sudan','active','2020-08-12 11:45:53',0);
INSERT INTO "r_vl_art_regimen" VALUES (68,'TLD/1C',1,NULL,'sudan','active','2020-09-10 08:33:21',0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (1,'Samples older than 30 days before receipt at the laboratory','general','active',NULL,NULL,0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (2,'Incorrectly labelled DBS card/ Unreadable Details on the card','general','active',NULL,NULL,0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (3,'Missing or duplicated unique ART number on DBS card or Lab requisition form','general','active',NULL,NULL,0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (4,'Mismatch of unique ART number on DBS card and lab requisition form','general','active',NULL,NULL,0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (5,'Less than 4 dry blood spots on the card','general','active',NULL,NULL,0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (6,'Improperly dried blood spots','general','active',NULL,NULL,0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (7,'Insufficient blood for testing (small spots) or no blood spots on DBS card','general','active',NULL,NULL,0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (8,'Damaged blood spots','general','active',NULL,NULL,0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (9,'Clotted, layered and/or haemolysed blood spots','general','active',NULL,NULL,0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (10,'DBS sample cards stacked together in one glassine bag','general','active',NULL,NULL,0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (11,'DBS sample received without laboratory requisition form and vice versa','general','active',NULL,NULL,0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (12,'DBS samples packaged without desiccants','general','active',NULL,NULL,0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (13,'DBS collected on an expired Card/filter paper','general','active',NULL,NULL,0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (14,'Patient Not yet 6 months ON ART','general','active',NULL,'2018-11-22 10:01:56',0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (15,'Insufficient sample ','general','active',NULL,'2018-11-26 12:13:07',0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (16,'Duplicate entry into VLSM','general','active',NULL,'2018-11-28 13:32:07',0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (17,'REQUEST AND DISPATCH FORM WITH OUT ACCOMPANYING DBS SAMPLE','general','active',NULL,'2019-01-09 08:46:31',0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (18,'NO SAMPLE AND REQUEST FORM','general','active',NULL,'2019-02-07 14:06:33',0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (19,'Dispatch with no accampaning DBS sample and Request form','general','active',NULL,'2019-02-11 13:06:28',0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (20,'Dispatch form with no accompanying DBS Sample and Requisition form ','general','active',NULL,'2019-02-11 13:11:47',0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (21,'Duplicated unique  ART number  on DBS card ','general','active',NULL,'2019-03-14 14:03:04',0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (22,'NO SAMPLE ID','general','active',NULL,'2019-04-08 08:39:42',0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (23,'BLOOD SPOTS EATEN BY RAT OR DAMAGED BLOOD SPOTS','general','active',NULL,'2019-05-09 07:41:32',0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (24,'Duplicated unique ART number ','general','active',NULL,'2019-05-20 15:13:01',0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (25,'Interval time between first and second vl tests is less than 6 month ','general','active',NULL,'2019-08-28 08:15:12',0);
INSERT INTO "r_vl_sample_rejection_reasons" VALUES (26,'4457 Internal control failed ,insufficient sample please collect new sample ','general','active',NULL,'2019-09-23 10:20:00',0);
INSERT INTO "r_vl_sample_type" VALUES (1,'Plasma','active',NULL,0);
INSERT INTO "r_vl_sample_type" VALUES (2,'Whole Blood','active',NULL,0);
INSERT INTO "r_vl_sample_type" VALUES (3,'DBS','active',NULL,0);
INSERT INTO "r_vl_test_reasons" VALUES (1,'routine VL',0,'active',NULL,0);
INSERT INTO "r_vl_test_reasons" VALUES (2,'Confirmation Of Treatment Failure(repeat VL at 3M)',0,'active',NULL,0);
INSERT INTO "r_vl_test_reasons" VALUES (3,'clinical failure',0,'active',NULL,0);
INSERT INTO "r_vl_test_reasons" VALUES (4,'immunological failure',0,'active',NULL,0);
INSERT INTO "r_vl_test_reasons" VALUES (5,'single drug substitution',0,'active',NULL,0);
INSERT INTO "r_vl_test_reasons" VALUES (6,'Pregnant Mother',0,'active',NULL,0);
INSERT INTO "r_vl_test_reasons" VALUES (7,'Lactating Mother',0,'active',NULL,0);
INSERT INTO "r_vl_test_reasons" VALUES (8,'Baseline VL',0,'active',NULL,0);
INSERT INTO "r_vl_test_reasons" VALUES (9,'routine',0,'active',NULL,0);
INSERT INTO "r_vl_test_reasons" VALUES (10,'suspect',0,'active',NULL,0);
INSERT INTO "r_vl_test_reasons" VALUES (11,'failure',0,'active',NULL,0);
INSERT INTO "resources" VALUES ('common-reference','admin','Common Reference Tables');
INSERT INTO "resources" VALUES ('covid-19-batches','covid19','Covid-19 Batch Management');
INSERT INTO "resources" VALUES ('covid-19-management','covid19','Covid-19 Reports');
INSERT INTO "resources" VALUES ('covid-19-reference','admin','Covid-19 Reference Tables');
INSERT INTO "resources" VALUES ('covid-19-requests','covid19','Covid-19 Request Management');
INSERT INTO "resources" VALUES ('covid-19-results','covid19','Covid-19 Result Management');
INSERT INTO "resources" VALUES ('eid-batches','eid','EID Batch Management');
INSERT INTO "resources" VALUES ('eid-management','eid','EID Reports');
INSERT INTO "resources" VALUES ('eid-reference','admin','EID Reference Management');
INSERT INTO "resources" VALUES ('eid-requests','eid','EID Request Management');
INSERT INTO "resources" VALUES ('eid-results','eid','EID Result Management');
INSERT INTO "resources" VALUES ('facility','admin','Manage Facility');
INSERT INTO "resources" VALUES ('global-config','admin','Manage General Config');
INSERT INTO "resources" VALUES ('hepatitis-batches','hepatitis','Hepatitis Batch Management');
INSERT INTO "resources" VALUES ('hepatitis-reports','hepatitis','Hepatitis Reports');
INSERT INTO "resources" VALUES ('hepatitis-requests','hepatitis','Hepatitis Request Management');
INSERT INTO "resources" VALUES ('hepatitis-results','hepatitis','Hepatitis Results Management');
INSERT INTO "resources" VALUES ('home','common','Dashboard');
INSERT INTO "resources" VALUES ('import-config','admin','Manage Import Config');
INSERT INTO "resources" VALUES ('move-samples','common','Move Samples');
INSERT INTO "resources" VALUES ('roles','admin','Manage Roles');
INSERT INTO "resources" VALUES ('specimen-referral-manifest','vl','Manage Specimen Referral Manifests');
INSERT INTO "resources" VALUES ('test-request-email-config','admin','Manage Test Request Email Config');
INSERT INTO "resources" VALUES ('test-result-email-config','admin','Manage Test Result Email Config');
INSERT INTO "resources" VALUES ('users','admin','Manage Users');
INSERT INTO "resources" VALUES ('vl-batch','vl','Manage VL Batch');
INSERT INTO "resources" VALUES ('vl-reference','admin','VL Reference Management');
INSERT INTO "resources" VALUES ('vl-reports','vl','VL Reports');
INSERT INTO "resources" VALUES ('vl-results','vl','VL Results');
INSERT INTO "resources" VALUES ('vl-test-request','vl','VL Requests');
INSERT INTO "roles" VALUES (1,'Admin','AD','active',NULL,'');
INSERT INTO "roles" VALUES (2,'Lab Technician','LAB','active','testing-lab','');
INSERT INTO "roles" VALUES (3,'Data Entry','DE','active',NULL,'');
INSERT INTO "roles" VALUES (4,'API User','API','active',NULL,NULL);
INSERT INTO "roles_privileges_map" VALUES (2082,3,74);
INSERT INTO "roles_privileges_map" VALUES (2083,3,75);
INSERT INTO "roles_privileges_map" VALUES (2084,3,76);
INSERT INTO "roles_privileges_map" VALUES (2085,3,77);
INSERT INTO "roles_privileges_map" VALUES (2086,3,78);
INSERT INTO "roles_privileges_map" VALUES (2087,3,79);
INSERT INTO "roles_privileges_map" VALUES (2088,3,88);
INSERT INTO "roles_privileges_map" VALUES (2780,1,139);
INSERT INTO "roles_privileges_map" VALUES (2781,1,125);
INSERT INTO "roles_privileges_map" VALUES (2782,1,128);
INSERT INTO "roles_privileges_map" VALUES (2783,1,126);
INSERT INTO "roles_privileges_map" VALUES (2784,1,129);
INSERT INTO "roles_privileges_map" VALUES (2785,1,124);
INSERT INTO "roles_privileges_map" VALUES (2786,1,123);
INSERT INTO "roles_privileges_map" VALUES (2787,1,127);
INSERT INTO "roles_privileges_map" VALUES (2788,1,131);
INSERT INTO "roles_privileges_map" VALUES (2789,1,4);
INSERT INTO "roles_privileges_map" VALUES (2790,1,65);
INSERT INTO "roles_privileges_map" VALUES (2791,1,5);
INSERT INTO "roles_privileges_map" VALUES (2792,1,64);
INSERT INTO "roles_privileges_map" VALUES (2793,1,6);
INSERT INTO "roles_privileges_map" VALUES (2794,1,66);
INSERT INTO "roles_privileges_map" VALUES (2795,1,7);
INSERT INTO "roles_privileges_map" VALUES (2796,1,8);
INSERT INTO "roles_privileges_map" VALUES (2797,1,9);
INSERT INTO "roles_privileges_map" VALUES (2798,1,10);
INSERT INTO "roles_privileges_map" VALUES (2799,1,11);
INSERT INTO "roles_privileges_map" VALUES (2800,1,25);
INSERT INTO "roles_privileges_map" VALUES (2801,1,39);
INSERT INTO "roles_privileges_map" VALUES (2802,1,26);
INSERT INTO "roles_privileges_map" VALUES (2803,1,28);
INSERT INTO "roles_privileges_map" VALUES (2804,1,43);
INSERT INTO "roles_privileges_map" VALUES (2805,1,48);
INSERT INTO "roles_privileges_map" VALUES (2806,1,49);
INSERT INTO "roles_privileges_map" VALUES (2807,1,1);
INSERT INTO "roles_privileges_map" VALUES (2808,1,2);
INSERT INTO "roles_privileges_map" VALUES (2809,1,3);
INSERT INTO "roles_privileges_map" VALUES (2810,1,130);
INSERT INTO "roles_privileges_map" VALUES (2811,1,24);
INSERT INTO "roles_privileges_map" VALUES (2812,1,71);
INSERT INTO "roles_privileges_map" VALUES (2813,1,72);
INSERT INTO "roles_privileges_map" VALUES (2814,1,73);
INSERT INTO "roles_privileges_map" VALUES (2815,1,101);
INSERT INTO "roles_privileges_map" VALUES (2816,1,112);
INSERT INTO "roles_privileges_map" VALUES (2817,1,111);
INSERT INTO "roles_privileges_map" VALUES (2818,1,102);
INSERT INTO "roles_privileges_map" VALUES (2819,1,114);
INSERT INTO "roles_privileges_map" VALUES (2820,1,113);
INSERT INTO "roles_privileges_map" VALUES (2821,1,100);
INSERT INTO "roles_privileges_map" VALUES (2822,1,122);
INSERT INTO "roles_privileges_map" VALUES (2823,1,105);
INSERT INTO "roles_privileges_map" VALUES (2824,1,145);
INSERT INTO "roles_privileges_map" VALUES (2825,1,106);
INSERT INTO "roles_privileges_map" VALUES (2826,1,107);
INSERT INTO "roles_privileges_map" VALUES (2827,1,95);
INSERT INTO "roles_privileges_map" VALUES (2828,1,109);
INSERT INTO "roles_privileges_map" VALUES (2829,1,142);
INSERT INTO "roles_privileges_map" VALUES (2830,1,96);
INSERT INTO "roles_privileges_map" VALUES (2831,1,98);
INSERT INTO "roles_privileges_map" VALUES (2832,1,99);
INSERT INTO "roles_privileges_map" VALUES (2833,1,108);
INSERT INTO "roles_privileges_map" VALUES (2834,1,110);
INSERT INTO "roles_privileges_map" VALUES (2835,1,97);
INSERT INTO "roles_privileges_map" VALUES (2836,1,103);
INSERT INTO "roles_privileges_map" VALUES (2837,1,104);
INSERT INTO "roles_privileges_map" VALUES (2838,1,78);
INSERT INTO "roles_privileges_map" VALUES (2839,1,79);
INSERT INTO "roles_privileges_map" VALUES (2840,1,77);
INSERT INTO "roles_privileges_map" VALUES (2841,1,121);
INSERT INTO "roles_privileges_map" VALUES (2842,1,86);
INSERT INTO "roles_privileges_map" VALUES (2843,1,144);
INSERT INTO "roles_privileges_map" VALUES (2844,1,87);
INSERT INTO "roles_privileges_map" VALUES (2845,1,88);
INSERT INTO "roles_privileges_map" VALUES (2846,1,74);
INSERT INTO "roles_privileges_map" VALUES (2847,1,91);
INSERT INTO "roles_privileges_map" VALUES (2848,1,141);
INSERT INTO "roles_privileges_map" VALUES (2849,1,75);
INSERT INTO "roles_privileges_map" VALUES (2850,1,76);
INSERT INTO "roles_privileges_map" VALUES (2851,1,80);
INSERT INTO "roles_privileges_map" VALUES (2852,1,81);
INSERT INTO "roles_privileges_map" VALUES (2853,1,84);
INSERT INTO "roles_privileges_map" VALUES (2854,1,85);
INSERT INTO "roles_privileges_map" VALUES (2855,1,155);
INSERT INTO "roles_privileges_map" VALUES (2856,1,157);
INSERT INTO "roles_privileges_map" VALUES (2857,1,156);
INSERT INTO "roles_privileges_map" VALUES (2858,1,158);
INSERT INTO "roles_privileges_map" VALUES (2859,1,154);
INSERT INTO "roles_privileges_map" VALUES (2860,1,146);
INSERT INTO "roles_privileges_map" VALUES (2861,1,147);
INSERT INTO "roles_privileges_map" VALUES (2862,1,148);
INSERT INTO "roles_privileges_map" VALUES (2863,1,152);
INSERT INTO "roles_privileges_map" VALUES (2864,1,151);
INSERT INTO "roles_privileges_map" VALUES (2865,1,149);
INSERT INTO "roles_privileges_map" VALUES (2866,1,69);
INSERT INTO "roles_privileges_map" VALUES (2867,1,67);
INSERT INTO "roles_privileges_map" VALUES (2868,1,68);
INSERT INTO "roles_privileges_map" VALUES (2869,1,16);
INSERT INTO "roles_privileges_map" VALUES (2870,1,17);
INSERT INTO "roles_privileges_map" VALUES (2871,1,47);
INSERT INTO "roles_privileges_map" VALUES (2872,1,18);
INSERT INTO "roles_privileges_map" VALUES (2873,1,46);
INSERT INTO "roles_privileges_map" VALUES (2874,1,23);
INSERT INTO "roles_privileges_map" VALUES (2875,1,34);
INSERT INTO "roles_privileges_map" VALUES (2876,1,63);
INSERT INTO "roles_privileges_map" VALUES (2877,1,40);
INSERT INTO "roles_privileges_map" VALUES (2878,1,70);
INSERT INTO "roles_privileges_map" VALUES (2879,1,33);
INSERT INTO "roles_privileges_map" VALUES (2880,1,62);
INSERT INTO "roles_privileges_map" VALUES (2881,1,143);
INSERT INTO "roles_privileges_map" VALUES (2882,1,153);
INSERT INTO "roles_privileges_map" VALUES (2883,1,59);
INSERT INTO "roles_privileges_map" VALUES (2884,1,57);
INSERT INTO "roles_privileges_map" VALUES (2885,1,22);
INSERT INTO "roles_privileges_map" VALUES (2886,1,56);
INSERT INTO "roles_privileges_map" VALUES (2887,1,12);
INSERT INTO "roles_privileges_map" VALUES (2888,1,13);
INSERT INTO "roles_privileges_map" VALUES (2889,1,89);
INSERT INTO "roles_privileges_map" VALUES (2890,1,14);
INSERT INTO "roles_privileges_map" VALUES (2891,1,140);
INSERT INTO "roles_privileges_map" VALUES (2892,1,27);
INSERT INTO "roles_privileges_map" VALUES (2893,1,50);
INSERT INTO "roles_privileges_map" VALUES (2894,1,45);
INSERT INTO "roles_privileges_map" VALUES (2895,1,51);
INSERT INTO "roles_privileges_map" VALUES (2896,1,41);
INSERT INTO "roles_privileges_map" VALUES (2897,1,29);
INSERT INTO "roles_privileges_map" VALUES (2898,1,15);
INSERT INTO "roles_privileges_map" VALUES (2899,1,21);
INSERT INTO "roles_privileges_map" VALUES (2900,1,19);
INSERT INTO "roles_privileges_map" VALUES (2901,1,31);
INSERT INTO "roles_privileges_map" VALUES (2902,1,20);
INSERT INTO "roles_privileges_map" VALUES (2943,2,4);
INSERT INTO "roles_privileges_map" VALUES (2944,2,5);
INSERT INTO "roles_privileges_map" VALUES (2945,2,28);
INSERT INTO "roles_privileges_map" VALUES (2946,2,43);
INSERT INTO "roles_privileges_map" VALUES (2947,2,48);
INSERT INTO "roles_privileges_map" VALUES (2948,2,49);
INSERT INTO "roles_privileges_map" VALUES (2949,2,24);
INSERT INTO "roles_privileges_map" VALUES (2950,2,78);
INSERT INTO "roles_privileges_map" VALUES (2951,2,79);
INSERT INTO "roles_privileges_map" VALUES (2952,2,77);
INSERT INTO "roles_privileges_map" VALUES (2953,2,87);
INSERT INTO "roles_privileges_map" VALUES (2954,2,88);
INSERT INTO "roles_privileges_map" VALUES (2955,2,74);
INSERT INTO "roles_privileges_map" VALUES (2956,2,75);
INSERT INTO "roles_privileges_map" VALUES (2957,2,76);
INSERT INTO "roles_privileges_map" VALUES (2958,2,80);
INSERT INTO "roles_privileges_map" VALUES (2959,2,81);
INSERT INTO "roles_privileges_map" VALUES (2960,2,84);
INSERT INTO "roles_privileges_map" VALUES (2961,2,85);
INSERT INTO "roles_privileges_map" VALUES (2962,2,16);
INSERT INTO "roles_privileges_map" VALUES (2963,2,17);
INSERT INTO "roles_privileges_map" VALUES (2964,2,47);
INSERT INTO "roles_privileges_map" VALUES (2965,2,18);
INSERT INTO "roles_privileges_map" VALUES (2966,2,46);
INSERT INTO "roles_privileges_map" VALUES (2967,2,23);
INSERT INTO "roles_privileges_map" VALUES (2968,2,34);
INSERT INTO "roles_privileges_map" VALUES (2969,2,40);
INSERT INTO "roles_privileges_map" VALUES (2970,2,33);
INSERT INTO "roles_privileges_map" VALUES (2971,2,62);
INSERT INTO "roles_privileges_map" VALUES (2972,2,59);
INSERT INTO "roles_privileges_map" VALUES (2973,2,57);
INSERT INTO "roles_privileges_map" VALUES (2974,2,22);
INSERT INTO "roles_privileges_map" VALUES (2975,2,56);
INSERT INTO "roles_privileges_map" VALUES (2976,2,12);
INSERT INTO "roles_privileges_map" VALUES (2977,2,13);
INSERT INTO "roles_privileges_map" VALUES (2978,2,14);
INSERT INTO "roles_privileges_map" VALUES (2979,2,21);
INSERT INTO "roles_privileges_map" VALUES (2980,2,19);
INSERT INTO "roles_privileges_map" VALUES (2981,2,31);
INSERT INTO "roles_privileges_map" VALUES (2982,2,20);
INSERT INTO "s_available_country_forms" VALUES (1,'South Sudan Form');
INSERT INTO "s_available_country_forms" VALUES (2,'Zimbabwe Form');
INSERT INTO "s_available_country_forms" VALUES (3,'DRC Form');
INSERT INTO "s_available_country_forms" VALUES (4,'Zambia Form');
INSERT INTO "s_available_country_forms" VALUES (5,'Papua New Guinea');
INSERT INTO "s_available_country_forms" VALUES (6,'WHO FORM');
INSERT INTO "s_available_country_forms" VALUES (7,'Rwanda FORM');
INSERT INTO "s_available_country_forms" VALUES (8,'Angola Form');
INSERT INTO "system_config" VALUES ('Lab Name','lab_name',NULL);
INSERT INTO "system_config" VALUES ('User Type','user_type','vluser');
INSERT INTO "system_config" VALUES ('Version','version','4.3.1');
INSERT INTO "testing_labs" VALUES ('vl',15,'2021-05-07 19:38:39','','');
INSERT INTO "testing_labs" VALUES ('vl',16,'2021-05-12 19:54:17','','');
INSERT INTO "testing_labs" VALUES ('eid',15,'2021-05-07 19:38:39','',NULL);
INSERT INTO "testing_labs" VALUES ('eid',16,'2021-05-12 19:54:17','',NULL);
INSERT INTO "testing_labs" VALUES ('covid19',15,'2021-05-07 20:09:54',NULL,NULL);
INSERT INTO "testing_labs" VALUES ('covid19',16,'2021-05-12 19:54:17','',NULL);
INSERT INTO "testing_labs" VALUES ('hepatitis',15,'2021-05-07 19:38:39','',NULL);
INSERT INTO "testing_labs" VALUES ('hepatitis',16,'2021-05-12 19:54:17','',NULL);
INSERT INTO "user_admin_details" VALUES (1,'ssadmin','ssadmin','123');
DROP INDEX IF EXISTS "contact_notes_details_treament_contact_id";
CREATE INDEX IF NOT EXISTS "contact_notes_details_treament_contact_id" ON "contact_notes_details" (
	"treament_contact_id"
);
DROP INDEX IF EXISTS "covid19_tests_covid19_id";
CREATE INDEX IF NOT EXISTS "covid19_tests_covid19_id" ON "covid19_tests" (
	"covid19_id"
);
DROP INDEX IF EXISTS "eid_form_sample_code_key";
CREATE INDEX IF NOT EXISTS "eid_form_sample_code_key" ON "eid_form" (
	"sample_code_key"
);
DROP INDEX IF EXISTS "eid_form_remote_sample_code_key";
CREATE INDEX IF NOT EXISTS "eid_form_remote_sample_code_key" ON "eid_form" (
	"remote_sample_code_key"
);
DROP INDEX IF EXISTS "form_covid19_sample_code_key";
CREATE UNIQUE INDEX IF NOT EXISTS "form_covid19_sample_code_key" ON "form_covid19" (
	"sample_code_key"
);
DROP INDEX IF EXISTS "form_hepatitis_last_modified_datetime";
CREATE INDEX IF NOT EXISTS "form_hepatitis_last_modified_datetime" ON "form_hepatitis" (
	"last_modified_datetime"
);
DROP INDEX IF EXISTS "form_hepatitis_sample_code_key";
CREATE INDEX IF NOT EXISTS "form_hepatitis_sample_code_key" ON "form_hepatitis" (
	"sample_code_key"
);
DROP INDEX IF EXISTS "form_hepatitis_remote_sample_code_key";
CREATE INDEX IF NOT EXISTS "form_hepatitis_remote_sample_code_key" ON "form_hepatitis" (
	"remote_sample_code_key"
);
DROP INDEX IF EXISTS "lab_report_signatories_lab_id";
CREATE INDEX IF NOT EXISTS "lab_report_signatories_lab_id" ON "lab_report_signatories" (
	"lab_id"
);
DROP INDEX IF EXISTS "r_countries_id";
CREATE UNIQUE INDEX IF NOT EXISTS "r_countries_id" ON "r_countries" (
	"id"
);
DROP INDEX IF EXISTS "report_to_mail_batch_id";
CREATE INDEX IF NOT EXISTS "report_to_mail_batch_id" ON "report_to_mail" (
	"batch_id"
);
DROP INDEX IF EXISTS "roles_privileges_map_role_id";
CREATE INDEX IF NOT EXISTS "roles_privileges_map_role_id" ON "roles_privileges_map" (
	"role_id"
);
DROP INDEX IF EXISTS "roles_privileges_map_privilege_id";
CREATE INDEX IF NOT EXISTS "roles_privileges_map_privilege_id" ON "roles_privileges_map" (
	"privilege_id"
);
DROP INDEX IF EXISTS "s_vlsm_instance_vl_instance_id";
CREATE UNIQUE INDEX IF NOT EXISTS "s_vlsm_instance_vl_instance_id" ON "s_vlsm_instance" (
	"vlsm_instance_id"
);
DROP INDEX IF EXISTS "user_admin_details_user_admin_id";
CREATE UNIQUE INDEX IF NOT EXISTS "user_admin_details_user_admin_id" ON "user_admin_details" (
	"user_admin_id"
);
DROP INDEX IF EXISTS "user_details_role_id";
CREATE INDEX IF NOT EXISTS "user_details_role_id" ON "user_details" (
	"role_id"
);
DROP INDEX IF EXISTS "vl_facility_map_vl_lab_id";
CREATE INDEX IF NOT EXISTS "vl_facility_map_vl_lab_id" ON "vl_facility_map" (
	"vl_lab_id"
);
DROP INDEX IF EXISTS "vl_facility_map_facility_id";
CREATE INDEX IF NOT EXISTS "vl_facility_map_facility_id" ON "vl_facility_map" (
	"facility_id"
);
DROP INDEX IF EXISTS "vl_request_form_sample_code";
CREATE UNIQUE INDEX IF NOT EXISTS "vl_request_form_sample_code" ON "vl_request_form" (
	"sample_code"
);
DROP INDEX IF EXISTS "vl_request_form_facility_id";
CREATE INDEX IF NOT EXISTS "vl_request_form_facility_id" ON "vl_request_form" (
	"facility_id"
);
DROP INDEX IF EXISTS "vl_request_form_art_no";
CREATE INDEX IF NOT EXISTS "vl_request_form_art_no" ON "vl_request_form" (
	"patient_art_no"
);
DROP INDEX IF EXISTS "vl_request_form_sample_id";
CREATE INDEX IF NOT EXISTS "vl_request_form_sample_id" ON "vl_request_form" (
	"sample_type"
);
DROP INDEX IF EXISTS "vl_request_form_created_by";
CREATE INDEX IF NOT EXISTS "vl_request_form_created_by" ON "vl_request_form" (
	"request_created_by"
);
DROP INDEX IF EXISTS "vl_request_form_status";
CREATE INDEX IF NOT EXISTS "vl_request_form_status" ON "vl_request_form" (
	"result_status"
);
DROP INDEX IF EXISTS "vl_request_form_funding_source";
CREATE INDEX IF NOT EXISTS "vl_request_form_funding_source" ON "vl_request_form" (
	"funding_source"
);
DROP INDEX IF EXISTS "vl_request_form_sample_collection_date";
CREATE INDEX IF NOT EXISTS "vl_request_form_sample_collection_date" ON "vl_request_form" (
	"sample_collection_date"
);
DROP INDEX IF EXISTS "vl_request_form_sample_tested_datetime";
CREATE INDEX IF NOT EXISTS "vl_request_form_sample_tested_datetime" ON "vl_request_form" (
	"sample_tested_datetime"
);
DROP INDEX IF EXISTS "vl_request_form_lab_id";
CREATE INDEX IF NOT EXISTS "vl_request_form_lab_id" ON "vl_request_form" (
	"lab_id"
);
DROP INDEX IF EXISTS "vl_request_form_result_status";
CREATE INDEX IF NOT EXISTS "vl_request_form_result_status" ON "vl_request_form" (
	"result_status"
);
DROP INDEX IF EXISTS "vl_request_form_sample_code_key";
CREATE INDEX IF NOT EXISTS "vl_request_form_sample_code_key" ON "vl_request_form" (
	"sample_code_key"
);
DROP INDEX IF EXISTS "vl_request_form_remote_sample_code_key";
CREATE INDEX IF NOT EXISTS "vl_request_form_remote_sample_code_key" ON "vl_request_form" (
	"remote_sample_code_key"
);
DROP INDEX IF EXISTS "vl_user_facility_map_user_id";
CREATE INDEX IF NOT EXISTS "vl_user_facility_map_user_id" ON "vl_user_facility_map" (
	"user_id"
);
DROP INDEX IF EXISTS "vl_user_facility_map_facility_id";
CREATE INDEX IF NOT EXISTS "vl_user_facility_map_facility_id" ON "vl_user_facility_map" (
	"facility_id"
);
