ALTER TABLE eid_form ADD sample_dispatched_datetime datetime DEFAULT NULL;
UPDATE eid_form SET vlsm_country_id = '1', remote_sample_code = CASE WHEN remote_sample_code = '1' THEN NULL ELSE remote_sample_code END WHERE vlsm_country_id = unique_id;
