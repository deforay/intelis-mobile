import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable( {
  providedIn: 'root',
} )
export class PrivilegeService {
  isAdminPrivilege = false;
  isCommonPrivilege = false;
  isVLPrivilege = false;
  isEIDPrivilege = false;
  isCovidPrivilege = false;

  // Admin Priviliges Start

  // Admin Priviliges End
  // Common Priviliges Start
  canCommonHomeAccess = false;
  canCommonImportResultsFromFile = false;
  // Common Priviliges End

  // EID Priviliges Start

  // EID Request Privilileges
  canEIDRequest = false;
  canEIDRequestAdd = false;
  canEIDRequestEdit = false;
  canEIDRequestAddSamplesFromManifest = false;
  canEIDRequestEditLockedEidSamples = false;
  canEIDRequestView = false;

  // EID Result Priviliges
  canEIDResult = false;
  canEIDResultView = false;
  canEIDResultsEnterResultManually = false;
  canEIDResultsImportResultFile = false;
  canEIDResultsManageResultStatus = false;
  canEIDResultsPrintresults = false;
  // EID Batches Privileges
  canEIDBatchAdd = false;
  canEIDBatchView = false;
  canEIDBatchEdit = false;
  // EID Management Privileges
  canEIDManagementClinicReports = false;
  canEIDManagementExportData = false;
  canEIDManagementMonthlyThresholdReport = false;
  canEIDManagementSampleRejectionReport = false;
  canEIDManagementSampleStatusReport = false;

  // EID Priviliges End

  // ViralLoad Priviliges Start

  // VL Specimen Referal Manifest Priviliges
  canVLSpecimenReferralManifestAccess = false;
  canVLSpecimenReferralManifestAdd = false;
  canVLSpecimenReferralManifestEdit = false;
  // VL Batch Priviliges
  canVLBatchAccess = false;
  canVLBatchAdd = false;
  canVLBatchAddControlsPosition = false;
  canVLBatchEdit = false;
  canVLBatchEditControlsPosition = false;
  // VL Results Priviliges
  canVLResult = false;
  canVLResultView = false;
  canVLResultEnterManually = false;
  canVLResultPrintPDF = false;
  canVLResultManageResultStatusApproveReject = false;
  // VL Reports Priviliges
  canVLReport = false;
  canVLReportAccessExportData = false;
  canVLReportContactNotesHigh = false;
  canVLReportControls = false;
  canVLReportDashboard = false;
  canVLReportExportDataExcel = false;
  canVLReportHighReport = false;
  canVLReportManageQRCoderwdform = false;
  canVLReportMonthlyThreshold = false;
  canVLReportSampleMonitoring = false;
  canVLReportSampleRejection = false;
  canVLReportSampleStatus = false;
  canVLReportWeekly = false;
  // VL Requests Priviliges
  canVLRequest = false;
  canVLRequestAdd = false;
  canVLRequestEdit = false;
  canVLRequestView = false;
  canVLRequestAddSamplesFromManifes = false;
  canVLRequestEditLockedSamples = false;
  canVLRequestEmailTestRequest = false;
  canVLRequestEmailTestRequestConfirm = false;
  canVLRequestEmailTestResult = false;
  canVLRequestEmailTestResultConfirm = false;
  canVLRequestExportPatientList = false;
  canVLRequestSendRequestToMail = false;

  // VL Priviliges End

  // Covid19 Priviliges Start

  // Covid19 Results Priviliges
  canCovidResult = false;
  canCovidresultView = false;
  canCovidResultEnterResultManually = false;
  canCovidResultImportResultFile = false;
  // covid19 Requests
  canCovidRequest = false;
  canCovidRequestAdd = false;
  canCovidRequestEdit = false;
  canCovidRequestView = false;
  canCovidRequestCanRecordConfirmaryTests = false;
  canCovidRequestEditLockedSamples = false;
  canCovidRequestManageResultStatus = false;
  canCovidRequestPrintStatus = false;
  canCovidRequestRecordFinalResult = false;
  canCovidRequestUpdateRecoedConfirmaryTests = false;
  // Covid19 Batches Priviliges
  canCovidBatchAdd = false;
  canCovidBatchAddNewConfirmationManifest = false;
  canCovidBatchConfirmationManifest = false;
  canCovidBatchEdit = false;
  canCovidBatchEditPositiveConfirmationManifest = false;
  canCovidBatchGeneratePositiveConfirmationManifest = false;
  canCovidBatchView = false;
  // Covid19 Management Privileges
  canCovidManagementClinicReports = false;
  canCovidManagementExportData = false;
  canCovidManagementMonthlyThresholdReport = false;
  canCovidManagementSampleRejectionReport = false;
  canCovidManagementSampleStatusReport = false;

  // Covid19 Priviliges End

  constructor( private storage: Storage, private router: Router ) { }
  async init() {
    await this.storage.get( 'privileges' ).then( async ( privileges ) => {
      // privileges !== {} &&
      if ( privileges !== undefined && privileges !== null && privileges !== '' && privileges) {
        if ( privileges.admin ) {
        }
        if ( privileges.common ) {
        }
        if ( privileges.eid ) {
          await this.setEIDPrivilegs( privileges.eid );
        }
        if ( privileges.vl ) {
          await this.setVLPrivileges( privileges.vl );
        }
        if ( privileges.covid19 ) {
          await this.setCovidPrivileges( privileges.covid19 );
        }
      } else {
        this.router.navigate( ['login'], { replaceUrl: true } );
      }
    } );
  }
  async setAdminPrivileges( data ) { }
  async setCommonprivileges( data ) { }
  async setEIDPrivilegs( data ) {
    // && data !== {} 
    if ( data != undefined && data != null && data != '' ) {
      this.isEIDPrivilege = true;
      if (
        data['eid-batches'] !== undefined &&
        data['eid-batches'] !== null &&
        data['eid-batches'] !== ''
        // data['eid-batches'] !== {}
      ) {
        if (data['eid-batches'].includes('add-batch')) {
          this.canEIDBatchAdd = true;
        }
        if (data['eid-batches'].includes('edit-batch')) {
          this.canEIDBatchEdit = true;
        }
        if (data['eid-batches'].includes('view-batches')) {
          this.canEIDBatchView = true;
        }
      }
      if (
        data['eid-management'] != undefined &&
        data['eid-management'] != null &&
        data['eid-management'] != '' 
        // data['eid-management'] != {}
      ) {
        if (data['eid-management'].includes('eid-clinic-reports')) {
          this.canEIDManagementClinicReports = true;
        }
        if (data['eid-management'].includes('export-data')) {
          this.canEIDManagementExportData = true;
        }
        if (data['eid-management'].includes('monthly-threshold-report')) {
          this.canEIDManagementMonthlyThresholdReport = true;
        }
        if (data['eid-management'].includes('sample-rejection-report')) {
          this.canEIDManagementSampleRejectionReport = true;
        }
        if (data['eid-management'].includes('sample-status-report')) {
          this.canEIDManagementSampleStatusReport = true;
        }
      }
      if (
        data['eid-requests'] != undefined &&
        data['eid-requests'] != null &&
        data['eid-requests'] != '' &&
        // data['eid-requests'] != {} &&
        data['eid-requests']
      ) {
        this.canEIDRequest = true;
        if ( data['eid-requests'].includes( 'add' ) ) {
          this.canEIDRequestAdd = true;
        }
        if (data['eid-requests'].includes('add-samples-from-manifest')) {
          this.canEIDRequestAddSamplesFromManifest = true;
        }
        if (data['eid-requests'].includes('edit')) {
          this.canEIDRequestEdit = true;
        }
        if (data['eid-requests'].includes('edit-locked-eid-samples')) {
          this.canEIDRequestEditLockedEidSamples = true;
        }
        if (data['eid-requests'].includes('view')) {
          this.canEIDRequestView = true;
        }
      }
      if (
        data['eid-results'] != undefined &&
        data['eid-results'] != null &&
        data['eid-results'] != '' &&
        // data['eid-results'] != {} &&
        data['eid-results']
      ) {
        this.canEIDResult = true;
        if ( data['eid-results'].includes( 'enter-result-manually' ) ) {
          this.canEIDResultsEnterResultManually = true;
        }
        if (data['eid-results'].includes('import-result-file')) {
          this.canEIDResultsImportResultFile = true;
        }
        if (data['eid-results'].includes('manage-result-status')) {
          this.canEIDResultsManageResultStatus = true;
        }
        if (data['eid-results'].includes('print-results')) {
          this.canEIDResultsPrintresults = true;
        }
      }
    }
  }
 async setVLPrivileges(data) {
  // && data != {}
    if (data != undefined && data != null && data != '') {
      this.isVLPrivilege=true;
      if (
        data['specimen-referral-manifest'] != undefined &&
        data['specimen-referral-manifest'] != null &&
        data['specimen-referral-manifest'] != '' 
        // data['specimen-referral-manifest'] != {}
      ) {
        if (data['specimen-referral-manifest'].includes('access')) {
          this.canVLSpecimenReferralManifestAccess = true;
        }
        if (data['specimen-referral-manifest'].includes('add')) {
          this.canVLSpecimenReferralManifestAdd = true;
        }
        if (data['specimen-referral-manifest'].includes('edit')) {
          this.canVLSpecimenReferralManifestEdit = true;
        }
      }
      if (
        data['vl-batch'] != undefined &&
        data['vl-batch'] != null &&
        data['vl-batch'] != '' &&
        // data['vl-batch'] != {}&&
        data['vl-batch']
      ) {
        if (data['vl-batch'].includes('access')) {
          this.canVLBatchAccess = true;
        }
        if (data['vl-batch'].includes('add')) {
          this.canVLBatchAdd = true;
        }
        if (data['vl-batch'].includes('add-controls-position')) {
          this.canVLBatchAddControlsPosition = true;
        }
        if (data['vl-batch'].includes('edit')) {
          this.canVLBatchEdit = true;
        }
        if (data['vl-batch'].includes('edit-controls-position')) {
          this.canVLBatchEditControlsPosition = true;
        }
      }
      if (
        data['vl-reports'] != undefined &&
        data['vl-reports'] != null &&
        data['vl-reports'] != '' &&
        // data['vl-reports'] != {}&&
        data['vl-reports']
      ) {
        this.canVLReport = true;
        if ( data['vl-reports'].includes( 'access-export-vl-data' ) ) {
          this.canVLReportAccessExportData = true;
        }
        if (data['vl-reports'].includes('contact-notes-high-vl-reports')) {
          this.canVLReportContactNotesHigh = true;
        }
        if (data['vl-reports'].includes('controls-report')) {
          this.canVLReportControls = true;
        }
        if (data['vl-reports'].includes('dashboard')) {
          this.canVLReportDashboard = true;
        }
        if (data['vl-reports'].includes('export-vl-data-in-excel')) {
          this.canVLReportExportDataExcel = true;
        }
        if (data['vl-reports'].includes('high-vl-report')) {
          this.canVLReportHighReport = true;
        }
        if (data['vl-reports'].includes('manage-qr-code-rwd-form')) {
          this.canVLReportManageQRCoderwdform = true;
        }
        if (data['vl-reports'].includes('monthly-threshold-report')) {
          this.canVLReportMonthlyThreshold = true;
        }
        if (data['vl-reports'].includes('sample-monitoring-report')) {
          this.canVLReportSampleMonitoring = true;
        }
        if (data['vl-reports'].includes('sample-rejection-report')) {
          this.canVLReportSampleRejection = true;
        }
        if (data['vl-reports'].includes('sample-status-report')) {
          this.canVLReportSampleStatus = true;
        }
        if (data['vl-reports'].includes('vl-weekly-report')) {
          this.canVLReportWeekly = true;
        }
      }
      if (
        data['vl-requests'] != undefined &&
        data['vl-requests'] != null &&
        data['vl-requests'] != '' &&
        // data['vl-requests'] != {}&&
        data['vl-requests']
      ) {
        this.canVLRequest = true;
        if ( data['vl-requests'].includes( 'add' ) ) {
          this.canVLRequestAdd = true;
        }
        if (data['vl-requests'].includes('add-samples-from-manifest')) {
          this.canVLRequestAddSamplesFromManifes = true;
        }
        if (data['vl-requests'].includes('edit')) {
          this.canVLRequestEdit = true;
        }
        if (data['vl-requests'].includes('edit-locked-vl-samples')) {
          this.canVLRequestEditLockedSamples = true;
        }
        if (data['vl-requests'].includes('email-test-request')) {
          this.canVLRequestEmailTestRequest = true;
        }
        if (data['vl-requests'].includes('email-test-request-confirm')) {
          this.canVLRequestEmailTestRequestConfirm = true;
        }
        if (data['vl-requests'].includes('email-test-result')) {
          this.canVLRequestEmailTestResult = true;
        }
        if (data['vl-requests'].includes('email-test-result-confirm')) {
          this.canVLRequestEmailTestResultConfirm = true;
        }
        if (data['vl-requests'].includes('export-patient-list')) {
          this.canVLRequestExportPatientList = true;
        }
        if (data['vl-requests'].includes('send-request-to-mail')) {
          this.canVLRequestSendRequestToMail = true;
        }
        if (data['vl-requests'].includes('view')) {
          this.canVLRequestView = true;
        }
      }
      if (
        data['vl-results'] != undefined &&
        data['vl-results'] != null &&
        data['vl-results'] != '' &&
        // data['vl-results'] != {}&&
        data['vl-results']
      ) {
        this.canVLResult=true;
        if (data['vl-results'].includes('enter-result-manually')) {
          this.canVLResultEnterManually = true;
        }
        if (
          data['vl-results'].includes('manage-vl-result-status-approve-reject')
        ) {
          this.canVLResultManageResultStatusApproveReject = true;
        }
        if (data['vl-results'].includes('print-result-pdf')) {
          this.canVLResultPrintPDF = true;
        }
      }
    }
  }
  async setCovidPrivileges(data) {
    // && data != {}
    if (data != undefined && data != null && data != '') {
      this.isCovidPrivilege=true;
      if (
        data['covid-19-batches'] != undefined &&
        data['covid-19-batches'] != null &&
        data['covid-19-batches'] != '' 
        // data['covid-19-batches'] != {}
      ) {
        if ( data['covid-19-batches'].includes( 'add-batch' ) ) {
          this.canCovidBatchAdd = true;
        }
        if ( data['covid-19-batches'].includes( 'add-new-confirmation-manifest' ) ) {
          this.canCovidBatchAddNewConfirmationManifest = true;
        }
        if ( data['covid-19-batches'].includes( 'edit-batch' ) ) {
          this.canCovidBatchEdit = true;
        }
        if ( data['covid-19-batches'].includes( 'edit-positive-confirmation-manifest' ) ) {
          this.canCovidBatchEditPositiveConfirmationManifest = true;
        }
        if ( data['covid-19-batches'].includes( 'generate-positive-confirmation-manifest' ) ) {
          this.canCovidBatchGeneratePositiveConfirmationManifest = true;
        }
        if ( data['covid-19-batches'].includes( 'view-branches' ) ) {
          this.canCovidBatchView = true;
        }
        if ( data['covid-19-batches'].includes( 'covid-19-confirmation-manifest' ) ) {
          this.canCovidBatchConfirmationManifest = true;
        }
      }
      if (
        data['covid-19-management'] != undefined &&
        data['covid-19-management'] != null &&
        data['covid-19-management'] != '' 
        // data['covid-19-management'] != {}
      ) {
        if ( data['covid-19-management'].includes( 'covid-19-clinic-reports' ) ) {
          this.canCovidManagementClinicReports = true;
        }
        if ( data['covid-19-management'].includes( 'export-data' ) ) {
          this.canCovidManagementExportData = true;
        }
        if ( data['covid-19-management'].includes( 'monthly-threshold-report' ) ) {
          this.canCovidManagementMonthlyThresholdReport = true;
        }
        if ( data['covid-19-management'].includes( 'sample-rejection-report' ) ) {
          this.canCovidManagementSampleRejectionReport = true;
        }
        if ( data['covid-19-management'].includes( 'sample-status-report' ) ) {
          this.canCovidManagementSampleStatusReport = true;
        }
      }
      if (
        data['covid-19-requests'] != undefined &&
        data['covid-19-requests'] != null &&
        data['covid-19-requests'] != '' 
        // data['covid-19-requests'] != {}
      ) {
        // if (data.includes('covid-19-requests')) {
        this.canCovidRequest = true;
        // }
        if ( data['covid-19-requests'].includes( 'add' ) ) {
          this.canCovidRequestAdd = true;
        }
        if ( data['covid-19-requests'].includes( 'can-record-confirmatory-tests' ) ) {
          this.canCovidRequestCanRecordConfirmaryTests = true;
        }
        if ( data['covid-19-requests'].includes( 'edit' ) ) {
          this.canCovidRequestEdit = true;
        }
        if ( data['covid-19-requests'].includes( 'edit-locked-covid-19-samples' ) ) {
          this.canCovidRequestEditLockedSamples = true;
        }
        if ( data['covid-19-requests'].includes( 'manage-result-status' ) ) {
          this.canCovidRequestManageResultStatus = true;
        }
        if ( data['covid-19-requests'].includes( 'print-status' ) ) {
          this.canCovidRequestPrintStatus = true;
        }
        if ( data['covid-19-requests'].includes( 'record-final-result' ) ) {
          this.canCovidRequestRecordFinalResult = true;
        }
        if ( data['covid-19-requests'].includes( 'update-record-confirmatory-tests' ) ) {
          this.canCovidRequestUpdateRecoedConfirmaryTests = true;
        }
        if ( data['covid-19-requests'].includes( 'view' ) ) {
          this.canCovidRequestView = true;
        }
      }
      if (
        data['covid-19-results'] != undefined &&
        data['covid-19-results'] != null &&
        data['covid-19-results'] != '' 
        // data['covid-19-results'] != {}
      ) {
        this.canCovidResult = true;
        if ( data['covid-19-results'].includes( 'enter-result-manually' ) ) {
          this.canCovidResultEnterResultManually = true;
        }
        if ( data['covid-19-results'].includes( 'import-result-file' ) ) {
          this.canCovidResultImportResultFile = true;
        }
      }
    }
  }
}
