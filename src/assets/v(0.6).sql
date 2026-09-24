UPDATE eid_form SET vlsm_country_id = '1', remote_sample_code = CASE WHEN remote_sample_code = '1' THEN NULL ELSE remote_sample_code END, sample_code = CASE WHEN sample_code = app_sample_code AND IFNULL(sample_code_key, '') != '' THEN sample_code_key ELSE sample_code END WHERE vlsm_country_id = unique_id;
ALTER TABLE eid_form ADD sample_dispatched_datetime datetime DEFAULT NULL;
