import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder,
  FormGroup,
  FormArray
} from '@angular/forms';
import {
  SQLite,
  SQLiteObject
} from '@awesome-cordova-plugins/sqlite/ngx';
import {
  Observable,
} from 'rxjs';
import {
  CrudOperationsService,
  ToastService,
  LoaderService,
  Events,
  AlertService,
} from '../../../../app/service/providers';
import {
  Router
} from '@angular/router';
import {
  startWith,
  map
} from 'rxjs/operators';
import {
  ErrorStateMatcher
} from '@angular/material/core';
import {
  Storage
} from '@ionic/storage-angular';
import {
  LocalTestRequestFormService
} from '../../../service/localTestRequestForm/local-Test-Request-Form.service';
import {
  ActivatedRoute
} from '@angular/router';
import {
  DbService
} from '../../../services/db.service';
import {
  CommonService
} from '../../../service/common/common.service';
import { SharedService } from 'src/app/services/shared.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
    selector: 'app-new-vl-drc',
    templateUrl: './new-vl-drc.page.html',
    styleUrls: ['./new-vl-drc.page.scss'],
    standalone: false
})
export class NewVlDrcPage implements OnInit {
  reason:any;
  reasonArray: any[] = [];
  public districtdata:any;
  matcher = new MyErrorStateMatcher();
  submitted: boolean = false;
  appVersionNumber: any;
  testNumberArray: any = [];
  ViralLoadTesting: any = [];
  loginDetails: any;
  isVisible: any;
  checkedT: boolean = false;
  checkedB20: boolean = false;
  checkedB40: boolean = false;
  checkedB400: boolean = false;
  minSampleCollectedDate: any;
  review:any;
  result: any;
  vlInitArray: any = [];
  POECountyArray: any = [];
  genderArray: any = [];
  specimenTypeArray: any = [];
  rejectedReasonArray: any = [];
  implementingPartnerArray: any = [];
  fundingSourceArray: any = [];
  reviewed:any;
  artRegimenArray: any = [];
  testingPlatformArray: any = [];
  vlTestReasonArray: any = [];
  PatientConsent: any = [];
  labNameArray: any[] = [];
  trimestre: any = [];  
  RapidTestResultArray: any = [];
  selectedPatientDetail: any;
  genderSelected: any;
  vlTestReasonSelected: any;
  trimesterSelected: any;
  labNameSelected: any;
  statusSelected: any;
  rejectionReasonSelected: any;
  specimenTypeSelected: any;
  rejectReasonSelected: any;
  POEArray: any = [];
  rejectionReasonId: any;
  rejectionReason: any;
  selectedOptions: any;
  // sourceOfAlertFilteredOptions: Observable < string[] > ;
  POEStateFilteredOptions: Observable<string[]>;
  POECountyFilteredOptions: Observable<string[]>;
  POEFilteredOptions: Observable<string[]>;
  implementPartnerFilteredOptions: Observable<string[]>;
  fundingSourceFilteredOptions: Observable<string[]>;
  testingLabFilteredOptions: Observable<string[]>;
  testPlatformListFilteredOptions: Observable<string[]>;
  labTechnicianFilteredOptions: Observable<string[]>;
  testedByFilteredOptions: Observable<string[]>;
  approvedByFilteredOptions: Observable<string[]>;
  reviewedByFilteredOptions: Observable<string[]>;

  count: number;
  getSelectedTestReqForm: any;
  motherTreatment: any = [];
  mode: any;
  isMenuOrBackButton: any;
  appSampleCode: any;
  titleHeader: any;
  formattedDate;
  sampleCode: any;
  createdOn: string;
  updatedOn: any;
  isSynced: boolean;
  viewResultArray: any = [];
  isNoRecord: boolean = false;
  facilityId: any = [];
  labId: any;
  isToggled: boolean;
  loggedUserArray: any = [];
  userTestRequestArray: any = [];
  userID: any;
  uniqueID: any;
  formattedDateTime: string;
  labResultPanelForm: FormGroup;
  isTestingUser: string;
  testMethodArray: any = [];
  dateOfTestingArray: any = [];
  testPlatformArray: any = [];
  testResultArray: any = [];
  labTechnicianID: any;
  testedByID: any;
  formattedDateTime2: string;
  labName: any;
  provinceID: any;
  implementingPartnerID: any;
  implementingPartnerName: any;
  fundingSourceName:any;
  testingLab: any;
  poe: any;
  fundingSource: any;
  fundingSourceID: any;
  testDetails: any = [];
  testDetailsArray: any = [];
  previousPageURL: any;
  maxDate;
  maxDatetime;
  vl_id: any;
  keyItemsArray: any = [];
  formEidLength: any;
  initArray: any;
  results: any[];
  private sqlite: SQLiteObject;
  district: any;
  state: any;
  staticArrays: any;
  technicianLab: any;
  provinceListArray: any = [];
  filteredStates: string[] = [];
  districtID: any;
  absVal: any;
  remoteSampleCode: any;
  previousStatusValue: any;
  maxSampleReceivedLabDate: any;
  maxSampleTestDate: any;
  maxSampleCollectionDate: any;
  previousRejectedValue: any;
  maxSampleReceivedHubDate: any;
  clinicInfoPanelForm: FormGroup;
  resultat: any = [];
  constructor(private router: Router,
    private sharedService: SharedService,
    public sql: SQLite,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    public CrudService: CrudOperationsService,
    public events: Events,
    private storage: Storage,
    private actRoute: ActivatedRoute,
    public localTestRequestFormService: LocalTestRequestFormService,
    private fb: FormBuilder,
    public alertService: AlertService,
    private db: DbService,
    public CommonService: CommonService
  ) {
    actRoute.params.subscribe(val => {
      // put the code from `ngOnInit` here

      this.clinicInfoPanelForm = new FormGroup({
        search: new FormControl('', []),
        serialNo: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
     
       
        POEState: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),

         POECounty: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),

        POE: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
     
        clinicianName: new FormControl('', []),
        clinicanTelephone: new FormControl('', []),
        reqClinician: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        reqClinicianPhoneNumber: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
       
        fundingSource: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        implementingPartner: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        dateOfDemand: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
    
        dob: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        ageInYears: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),

        ageInMonths: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),

        isPatientNew: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        dateOfArtInitiation: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),


        gender: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),

        patientArtNo: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),

        artRegimen: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        newArtRegimen: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        hasChangedRegimen: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        reasonForArvRegimenChange: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        dateOfArvRegimenChange: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        vlTestReason: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        viralLoadNo: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        lastViralLoadResult: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        lastViralLoadTestDate: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        sampleCollectionDate: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        specimenType: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
        dateDispatchedFromClinicToLab: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
       
        isPatientBreastfeeding: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
        isPatientPregnant: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
        trimester: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

      });

      this.labResultPanelForm = this.fb.group({
        sampleReceivedDate: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        status: new FormControl('', []),

        rejectionReason: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),

        rejectionDate: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
        labName: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
        dateOfCompletionOfViralLoad: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
       
        
        isSampleRejected: new FormControl('', []),
        below20: new FormControl('', []),
        below40: new FormControl('', []),
        below400: new FormControl('', []),
        targetNotDetected: new FormControl('', []),
        vlResult: new FormControl('', []),
        vlLog: new FormControl('', []),
       

        testingPlatform: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
        reasonForChanging: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),

        reviewedOn: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),

        reviewedBy: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),

        approvedBy: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
       
        approvedOn: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
      
      });
      
      });
      this.loadStaticArrays();

    this.mode = this.actRoute.snapshot.params['data_mode'];
    if (this.actRoute.snapshot.params['previuosPageURL']) {
      this.previousPageURL = this.actRoute.snapshot.params['previuosPageURL'];
    }
    if ((this.mode == 'edit' || this.mode == 'view' || this.mode == 'result edit') && this.mode != undefined) {
      this.isMenuOrBackButton = "back";
      this.titleHeader = this.mode + ' ' + "VL TEST REQUEST FORM"
    } else {
      this.isMenuOrBackButton = "menu";
      this.mode = 'add';
      this.titleHeader = this.mode + ' ' + "VL TEST REQUEST FORM";
    }
    this.maxmindate();
  }

  ionViewWillLeave() {
    if (this.mode == 'add') {
      for (let inner in this.clinicInfoPanelForm.controls) {
        this.clinicInfoPanelForm.get(inner).setValue('');
        this.clinicInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.clinicInfoPanelForm.controls) {
        this.clinicInfoPanelForm.get(inner).setValue('');
        this.clinicInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.clinicInfoPanelForm.controls) {
        this.clinicInfoPanelForm.get(inner).setValue('');
        this.clinicInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.clinicInfoPanelForm.controls) {
        this.clinicInfoPanelForm.get(inner).setValue('');
        this.clinicInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.labResultPanelForm.controls) {
        this.labResultPanelForm.get(inner).setValue('');
        this.labResultPanelForm.get(inner).setErrors(null);
      }
    }
    this.storage.remove("selectedPatient");
  }

  ngOnInit() {
    if (this.mode == 'add') {

    }

  }


  async ionViewWillEnter() {

    await this.storage.create();

    this.isToggled = false;
    this.step = 0;
    await this.getInitArray();
    this.initArray = await this.storage.get("initArray");
    if (this.actRoute.snapshot.paramMap.get('searchText')) {
      this.clinicInfoPanelForm.get('search').setValue(this.actRoute.snapshot.paramMap.get('searchText'));
    }

    if (await this.storage.get("selectedPatient") && this.clinicInfoPanelForm.get('search').value) {

      this.getSelectedPatientDetails();
    }

    if (this.mode == 'edit' || this.mode == 'view' || this.mode == 'result edit') {
      this.editSelectedTestReqForm();
    }

    await this.storage.get('loginDetails').then(async (loginDetails) => {
      if (loginDetails) {
        this.userID = loginDetails['user'].user_id;
        this.isTestingUser = loginDetails['user'].testing_user;
      }
    })

    await this.storage.get('localTestRequestForm').then(async (result) => {
      this.isNoRecord = false;
      if (result != null) {

        this.loggedUserArray = result.filter(item => item.userID == this.userID);
        if (this.loggedUserArray.length != 0) {
          this.userTestRequestArray = this.loggedUserArray[0].testFormArray.reverse();
          let filteredViewTestRecord = this.userTestRequestArray.filter(resultItem => resultItem.sampleCode == this.sampleCode && resultItem.sampleResult);
          if (filteredViewTestRecord.length != 0) {
            this.viewResultArray.push(filteredViewTestRecord[0].sampleResult);
          }
        }
        if (this.viewResultArray.length == 0) {
          this.isNoRecord = true;
        }
      }
    })
  }


  async getSelectedPatientDetails() {
    

    if (await this.storage.get("selectedPatient") && this.clinicInfoPanelForm.get('search').value) {

      this.step = 1;

      this.selectedPatientDetail = await this.storage.get("selectedPatient");
      console.log(this.selectedPatientDetail);

      this.clinicInfoPanelForm.get('patientArtNo').setValue(this.selectedPatientDetail.patient_art_no);
      // this.clinicInfoPanelForm.get('DHIS2CaseID').setValue(this.selectedPatientDetail.externalSampleCode);
      // this.clinicInfoPanelForm.get('fullName').setValue(this.selectedPatientDetail.fullName);
      // this.clinicInfoPanelForm.get('lastName').setValue(this.selectedPatientDetail.lastName);
      this.clinicInfoPanelForm.get('dob').setValue(this.selectedPatientDetail.patient_dob ? new Date(this.selectedPatientDetail.patient_dob) : '');
      this.clinicInfoPanelForm.get('ageInYears').setValue(this.selectedPatientDetail.patient_age_in_years);
      this.clinicInfoPanelForm.get('ageInMonths').setValue(this.selectedPatientDetail.patient_age_in_months);
      this.clinicInfoPanelForm.get('gender').setValue(this.selectedPatientDetail.patient_gender);
      this.genderSelected = this.selectedPatientDetail.patientGender;
      this.clinicInfoPanelForm.get('reqClinicianPhoneNumber').setValue(this.selectedPatientDetail.patient_mobile_number);
      // this.clinicInfoPanelForm.get('address').setValue(this.selectedPatientDetail.patient_address);



    } else {

      this.clinicInfoPanelForm.get('patientArtNo').setValue('');
      this.clinicInfoPanelForm.get('DHIS2CaseID').setValue('');
      this.clinicInfoPanelForm.get('fullName').setValue('');
      this.clinicInfoPanelForm.get('lastName').setValue('');
      this.clinicInfoPanelForm.get('dob').setValue('');
      this.clinicInfoPanelForm.get('age').setValue('');
      this.clinicInfoPanelForm.get('gender').setValue('');
      this.genderSelected = '';
      this.clinicInfoPanelForm.get('phoneNo').setValue('');
      this.clinicInfoPanelForm.get('address').setValue('');
      this.clinicInfoPanelForm.get('state').setValue("");
      this.clinicInfoPanelForm.get('county').setValue("");
      this.clinicInfoPanelForm.get('zone').setValue("");
      this.clinicInfoPanelForm.get('city').setValue("");
      this.clinicInfoPanelForm.get('passportNumber').setValue('');

    }

  }

  async editSelectedTestReqForm() {
    this.getSelectedTestReqForm = await this.storage.get("selectedVlTestReq");
    this.viewResultArray.push(this.getSelectedTestReqForm);
    console.log(this.getSelectedTestReqForm, 'getSelected Vl');
    this.districtdata=this.getSelectedTestReqForm.district_id;
    this.reason= this.getSelectedTestReqForm.reasonForChanging;
    let reasons = JSON.parse(this.reason)
    
    if (this.reason) {
      let reasons = JSON.parse(this.reason);
      console.log(reasons);
      if (Array.isArray(reasons)) {
          reasons.forEach((item: any) => {
              this.reasonArray.push(item);
          });
          this.labResultPanelForm.get('reasonForChanging').setValue(reasons[reasons.length - 1]?.reason || '');
      }
  }
    this.clinicInfoPanelForm.get('serialNo').setValue(this.getSelectedTestReqForm.serialNo);
    this.POEStateFilteredOptions = this.clinicInfoPanelForm.get('POEState').valueChanges.pipe(startWith(''),map(value =>this.POEStateFilter(value)));
    this.clinicInfoPanelForm.get('POEState').setValue(this.getSelectedTestReqForm.provinceName);
    let defaultSelectedCounty = this.provinceListArray.filter(item => item.province_name == this.getSelectedTestReqForm.provinceName);
    console.log(defaultSelectedCounty, 'defaultSelectedCounty',this.provinceListArray);

    if (defaultSelectedCounty.length != 0) {
      let POECountyDupArray = await this.CommonService.getDistrictList(defaultSelectedCounty[0].province_id);
      this.POECountyArray = [...new Set(POECountyDupArray.map(({district_id}) => district_id))].map(e => POECountyDupArray.find(({district_id}) => district_id == e));
      console.log(this.POECountyArray, POECountyDupArray, 'POECountyDupArray');
    }
    this.POECountyFilteredOptions = this.clinicInfoPanelForm.get('POECounty').valueChanges.pipe(startWith(''),map(value => this.POECountyFilter(value)));
    this.clinicInfoPanelForm.get('POECounty').setValue(this.getSelectedTestReqForm.district);
    let defaultSelectedCounty1 = this.POECountyArray.filter(item => item.district_name == this.getSelectedTestReqForm.district);
    if (defaultSelectedCounty1.length != 0) {
      this.POEArray = await this.CommonService.getFacilitiesList(defaultSelectedCounty1[0].district_id);
    }
    this.POEFilteredOptions = this.clinicInfoPanelForm.get('POE').valueChanges.pipe(startWith(''),map(value => this.POEFilter(value)));
    this.clinicInfoPanelForm.get('POE').setValue(this.getSelectedTestReqForm.facilityName);
    this.clinicInfoPanelForm.get('reqClinician').setValue(this.getSelectedTestReqForm.requestClinician);
    this.clinicInfoPanelForm.get('reqClinicianPhoneNumber').setValue(this.getSelectedTestReqForm.phoneNumber);
    if (this.getSelectedTestReqForm.implementingPartner) {
      let filteredImpPartner = this.initArray['implementingPartnerList'].filter(item => item.value == this.getSelectedTestReqForm.implementingPartner);
      if (filteredImpPartner.length != 0) {
        this.implementingPartnerName = filteredImpPartner[0].show ? filteredImpPartner[0].show : '';
        this.clinicInfoPanelForm.get('implementingPartner').setValue(this.implementingPartnerName);
      }
    }
    this.clinicInfoPanelForm.get('dateOfDemand').setValue(this.getSelectedTestReqForm.dateOfDemand ? new Date(this.getSelectedTestReqForm.dateOfDemand) : '');
    if (this.getSelectedTestReqForm.fundingSource) {
      
      console.log("Selected funding source:", this.getSelectedTestReqForm.fundingSource);
      
      let fundingSource = this.initArray['fundingSourceList'].filter(item => item.value == this.getSelectedTestReqForm.fundingSource);
      console.log("Filtered funding source array:", fundingSource);
      
      if (fundingSource.length != 0) {
        this.fundingSourceName = fundingSource[0].show ? fundingSource[0].show : '';
        console.log("Funding source name:", this.fundingSourceName);
        
        this.clinicInfoPanelForm.get('fundingSource').setValue(this.fundingSourceName);
      }
      // this.clinicInfoPanelForm.get('fundingSource').setValue(this.getSelectedTestReqForm.fundingSource);
    }
    
    this.clinicInfoPanelForm.get('dob').setValue(this.getSelectedTestReqForm.patientDob ? new Date(this.getSelectedTestReqForm.patientDob) : '');
    this.clinicInfoPanelForm.get('ageInYears').setValue(this.getSelectedTestReqForm.patientAge);
    this.clinicInfoPanelForm.get('ageInMonths').setValue(this.getSelectedTestReqForm.patientAgeinMonths);
    this.clinicInfoPanelForm.get('gender').setValue(this.getSelectedTestReqForm.patientGender);
    this.genderSelected = this.getSelectedTestReqForm.patientGender;
    this.clinicInfoPanelForm.get('patientArtNo').setValue(this.getSelectedTestReqForm.patientId);
    this.clinicInfoPanelForm.get('isPatientNew').setValue(this.getSelectedTestReqForm.isPatientNew);
    this.clinicInfoPanelForm.get('dateOfArtInitiation').setValue(this.getSelectedTestReqForm.doTreatmentInit ? new Date(this.getSelectedTestReqForm.doTreatmentInit) : '');
    this.clinicInfoPanelForm.get('artRegimen').setValue(this.getSelectedTestReqForm.currentRegimen);
    this.clinicInfoPanelForm.get('newArtRegimen').setValue(this.getSelectedTestReqForm.currentRegimen);
    this.clinicInfoPanelForm.get('hasChangedRegimen').setValue(this.getSelectedTestReqForm.hasChangedRegimen);
    this.clinicInfoPanelForm.get('reasonForArvRegimenChange').setValue(this.getSelectedTestReqForm.reasonForArvRegimenChange);
    this.clinicInfoPanelForm.get('dateOfArvRegimenChange').setValue(this.getSelectedTestReqForm.dateOfArvRegimenChange ? new Date(this.getSelectedTestReqForm.dateOfArvRegimenChange) : '');
    this.clinicInfoPanelForm.get('vlTestReason').setValue(this.getSelectedTestReqForm.vlTestReason ? this.getSelectedTestReqForm.vlTestReason : '');
    this.vlTestReasonSelected = this.getSelectedTestReqForm.vlTestReason;
    this.clinicInfoPanelForm.get('viralLoadNo').setValue(this.getSelectedTestReqForm.viralLoadNo ? this.getSelectedTestReqForm.viralLoadNo : '');
    this.clinicInfoPanelForm.get('lastViralLoadResult').setValue(this.getSelectedTestReqForm.lastViralLoadResult ? this.getSelectedTestReqForm.lastViralLoadResult : '');
    this.clinicInfoPanelForm.get('lastViralLoadTestDate').setValue(this.getSelectedTestReqForm.lastViralLoadTestDate ? new Date(this.getSelectedTestReqForm.lastViralLoadTestDate) : '');
    
    this.clinicInfoPanelForm.get('isPatientBreastfeeding').setValue(this.getSelectedTestReqForm.isPatientBreastfeeding);
    this.clinicInfoPanelForm.get('isPatientPregnant').setValue(this.getSelectedTestReqForm.isPatientPregnant);
    this.clinicInfoPanelForm.get('trimester').setValue(this.getSelectedTestReqForm.trimester);
    // this.trimesterSelected = this.getSelectedTestReqForm.trimester;
    // console.log(this.trimesterSelected,'trimesterSelected');
    
    this.clinicInfoPanelForm.get('sampleCollectionDate').setValue(this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleCollectionDate)));
    this.specimenTypeSelected = this.getSelectedTestReqForm.specimenType.toString();
    this.clinicInfoPanelForm.get('specimenType').setValue(this.specimenTypeSelected);
    this.clinicInfoPanelForm.get('dateDispatchedFromClinicToLab').setValue(this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.dateDispatchedFromClinicToLab)));
    this.labResultPanelForm.get('sampleReceivedDate').setValue(this.getSelectedTestReqForm.sampleReceivedDateTimeAtTestLab ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleReceivedDateTimeAtTestLab)) : "");
    
    // this.labResultPanelForm.get('reasonForChanging').setValue(this.getSelectedTestReqForm.reasonForChanging ? this.getSelectedTestReqForm.reasonForChanging : "");
    // for (var i = 0; i < this.vlInitArray['rejectedReasonList'].length; i++) {
    //   let filteredRejectionReason = this.vlInitArray['rejectedReasonList'][i].reasons.filter(item =>
    //     item.show == this.labResultPanelForm.controls.rejectionReason.value);
    //   if (filteredRejectionReason.length > 0) {
    //     this.rejectionReasonId = filteredRejectionReason[0] ? filteredRejectionReason[0].value : '';
    //     this.rejectionReason = this.labResultPanelForm.controls.rejectionReason.value;
    //     console.log(filteredRejectionReason, 'filteredRejectionReason', this.rejectionReasonId, this.rejectionReason);
    //     break;
    //   }
    // }
    this.labResultPanelForm.get('rejectionReason').setValue(this.getSelectedTestReqForm.rejectionReason ? this.getSelectedTestReqForm.rejectionReason : "");
    this.onChangeRejectReason();
    // if(this.getSelectedTestReqForm.rejectionReasonId){
    //   this.rejectionReasonSelected = this.getSelectedTestReqForm.rejectionReasonId.toString();
    //   console.log(this.rejectionReasonSelected,'this.rejectionReasonSelected');
    //   this.labResultPanelForm.get('rejectionReason').setValue(this.rejectionReasonSelected);
      // this.onChangeRejectReason();
    // }

    this.initArray = await this.storage.get("initArray");
    if (this.initArray && this.initArray.testingLabsList) {
      let testingLabs = this.initArray.testingLabsList.filter(item => item.value == this.getSelectedTestReqForm.labId);
      console.log(testingLabs);
      if (testingLabs.length != 0) {
        this.testingLab = testingLabs[0].show ? testingLabs[0].show : '';
      }
    } else {
      console.error('initArray or testingLabsList is undefined');
    }
    
        this.labResultPanelForm.get('labName').setValue(this.testingLab);

        if (this.initArray && this.initArray.labTechniciansList) {
          let reviews = this.initArray.labTechniciansList.filter(item => item.value == this.getSelectedTestReqForm.reviewedBy);
          console.log(reviews);
          if (reviews.length != 0) {
            this.review = reviews[0].show ? reviews[0].show : '';
          }
        } else {
          console.error('initArray or labTechniciansList is undefined');
        }
 
    // this.labResultPanelForm.get('labName').setValue(this.getSelectedTestReqForm.labName);
    this.labResultPanelForm.get('dateOfCompletionOfViralLoad').setValue(this.getSelectedTestReqForm.sampleTestDate ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleTestDate)) : "");
    this.labResultPanelForm.get('testingPlatform').setValue(this.getSelectedTestReqForm.vlTestPlatform ? this.getSelectedTestReqForm.vlTestPlatform : "");
    // if (this.getSelectedTestReqForm.result == 'vlTND') {
    //   this.checkedT = true;
    // }
    // else if (this.getSelectedTestReqForm.result == 'vlLt20') {
    //   this.checkedB20 = true;
    // }
    // else if (this.getSelectedTestReqForm.result == 'vlLt40') {
    //   this.checkedB40 = true;
    // }
    // else if (this.getSelectedTestReqForm.result == 'vlLt400') {
    //   this.checkedB400 = true;
    // }
    // else if (this.getSelectedTestReqForm.result == null) {
    //   this.labResultPanelForm.get('status').setValue(this.getSelectedTestReqForm.status ? this.getSelectedTestReqForm.status : "");
    // } isSampleRejected: "no"
    // else {
      this.labResultPanelForm.get('vlResult').setValue(this.getSelectedTestReqForm.result ? this.getSelectedTestReqForm.result : "");
      this.onChangeVl('vlResult');
    // }
    this.labResultPanelForm.get('isSampleRejected').setValue(this.getSelectedTestReqForm.isSampleRejected ? this.getSelectedTestReqForm.isSampleRejected : "");

    if (this.getSelectedTestReqForm.isSampleRejected) {
      this.previousRejectedValue = this.getSelectedTestReqForm.isSampleRejected;
    }
    this.labResultPanelForm.get('rejectionDate').setValue(this.getSelectedTestReqForm.rejectionDate ? new Date(this.getSelectedTestReqForm.rejectionDate) : "");

    this.labResultPanelForm.get('reviewedBy').setValue(this.review);
    this.labResultPanelForm.get('reviewedOn').setValue(this.getSelectedTestReqForm.reviewedOn ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.reviewedOn)) : "");
    this.labResultPanelForm.get('approvedBy').setValue(this.getSelectedTestReqForm.approvedBy ? this.getSelectedTestReqForm.approvedBy : "");
    this.labResultPanelForm.get('approvedOn').setValue(this.getSelectedTestReqForm.approvedOn ? new Date(this.getSelectedTestReqForm.approvedOn) : "");



    if (this.getSelectedTestReqForm.sampleCode) {
      this.sampleCode = this.getSelectedTestReqForm.sampleCode;
    }
    this.remoteSampleCode = this.getSelectedTestReqForm.remoteSampleCode ? this.getSelectedTestReqForm.remoteSampleCode : '';
    this.createdOn = this.getSelectedTestReqForm.createdOn;
    this.appSampleCode = this.getSelectedTestReqForm.appSampleCode;
    this.vl_id = this.getSelectedTestReqForm.vlId;
    this.uniqueID = this.getSelectedTestReqForm.uniqueId;
    if (this.getSelectedTestReqForm.sourceOfAlertPOE) {
      let sourceOfAlertString = this.getSelectedTestReqForm.sourceOfAlertPOE;
      const sourceOfAlertWord = sourceOfAlertString.split(" ");
      for (let i = 0; i < sourceOfAlertWord.length; i++) {
        sourceOfAlertWord[i] = sourceOfAlertWord[i][0].toUpperCase() + sourceOfAlertWord[i].slice(1);
      }
      this.clinicInfoPanelForm.get('sourceOfAlert').setValue(sourceOfAlertWord.join(" "));
    }
    

    // let technicianLab = this.initArray['labTechniciansList'].filter(item => item.value == this.getSelectedTestReqForm.testedBy);
    // if (technicianLab.length != 0) {
    //   this.technicianLab = technicianLab[0].show ? technicianLab[0].show : '';
    // }
    
    
  }
  async onChangePOEState($event) {
    try {
      this.clinicInfoPanelForm.get('POECounty').setValue('');
    this.clinicInfoPanelForm.get('POE').setValue('');
      this.POECountyArray = await this.sharedService.onChangePOEState($event, this.provinceListArray);
      console.log(this.POECountyArray, 'POE County Array');
      // Subscribe to changes if needed
      this.POECountyFilteredOptions = this.clinicInfoPanelForm.get('POECounty').valueChanges.pipe(startWith(''), map(value => this.POECountyFilter(value)));
      this.POECountyFilteredOptions.subscribe(val => console.log(val, 'POE County Filtered Options'));
    } catch (error) {
      console.error('Error in onChangePOEState:', error);
    }
  }
  
  async onChangePOECounty($event) {
    try {
      this.clinicInfoPanelForm.get('POE').setValue('');
      const { POEArray, district_id } = await this.sharedService.onChangePOECounty($event, this.POECountyArray);
      this.POEArray = POEArray;
      this.districtdata = district_id;
      console.log(this.districtdata);
      // Subscribe to changes if needed
      this.POEFilteredOptions = this.clinicInfoPanelForm.get('POE').valueChanges.pipe(startWith(''), map(value => this.POEFilter(value)));
    } catch (error) {
      console.error('Error in onChangePOECounty:', error);
    }
  }
  

  /* Natesh 

  // async onChangePOEState($event, form) {

  //   this.clinicInfoPanelForm.get('POECounty').setValue('');
  //   this.clinicInfoPanelForm.get('POE').setValue('');
  //   let selectedCounty = this.provinceListArray.filter(item => item.province_name == $event.option.value);
  //   // this.POECountyArray = selectedCounty[0].districtDetails;
  //   let POECountyDupArray = await this.CommonService.getDistrictList(selectedCounty[0].province_id);

  //   this.POECountyArray = [...new Set(POECountyDupArray.map(({ district_id }) => district_id))].map(e => POECountyDupArray.find(({ district_id }) => district_id == e));
  //   console.log(this.POECountyArray,'POECountyArray');



  //   this.POECountyFilteredOptions = this.clinicInfoPanelForm.get('POECounty').valueChanges
  //     .pipe(
  //       startWith(''),
  //       map(value =>
  //         this.POECountyFilter(value))
  //     );
  // }

  // async onChangePOECounty($event) {

  //   this.clinicInfoPanelForm.get('POE').setValue('');
  //   let selectedCounty = this.POECountyArray.filter(item => item.district_name == $event.option.value);
  //   this.POEArray = await this.CommonService.getFacilitiesList(selectedCounty[0].district_id);

  //   this.POEFilteredOptions = this.clinicInfoPanelForm.get('POE').valueChanges.pipe(startWith(''),map(value => this.POEFilter(value)));
  // }

 */


  async getInitArray() {

    this.initArray = await this.storage.get("initArray");
    this.vlInitArray = this.initArray.vl;
    console.log(this.initArray.testingLabsList);
    this.fundingSourceArray = this.initArray['fundingSourceList'];

    this.labNameArray = this.initArray.testingLabsList;
    console.log(this.labNameArray);
    

    this.provinceListArray = await this.CommonService.getProvinceList();

    this.POEStateFilteredOptions = this.clinicInfoPanelForm.get('POEState').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.POEStateFilter(value))
      );
    this.implementPartnerFilteredOptions = this.clinicInfoPanelForm.get('implementingPartner').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.implementPartnerFilter(value))
      );
    // this.fundingSourceFilteredOptions = this.clinicInfoPanelForm.get('fundingSource').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value =>
    //       this.fundingSourceFilter(value))
    //   );
    this.testingLabFilteredOptions = this.labResultPanelForm.get('labName').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.testingLabFilter(value))
      );
    // this.testPlatformListFilteredOptions = this.labResultPanelForm.get('vlTestPlatform').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value =>
    //       this.testPlatformListFilter(value))
    //   );


    // this.testedByFilteredOptions = this.labResultPanelForm.get('testedBy').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value =>
    //       this.labTechnicianFilter(value))
    //   );
    this.approvedByFilteredOptions = this.labResultPanelForm.get('approvedBy').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.labTechnicianFilter(value))
      );

    this.reviewedByFilteredOptions = this.labResultPanelForm.get('reviewedBy').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.labTechnicianFilter(value))
      );

  }
  async searchPatient() {

    await this.storage.remove("selectedPatient");
    this.router.navigate(['vl-select-patient-details',
      {
        'data': this.clinicInfoPanelForm.get('search').value
      }
    ]);

  }

  // calAge() {
  //   this.sharedService.calculateAge(this.clinicInfoPanelForm);
  // }

  isOptionDisabled(): boolean{
    return this.mode === 'view' || this.mode === 'result edit';
  }

  isOptionDisableds(): boolean{
    return this.mode === 'view' ;
  }

  preventInput(event: KeyboardEvent | ClipboardEvent): void {
    if (this.mode === 'view' || this.mode === 'result edit') {
      event.preventDefault(); // Prevent any input actions
    }
  }
  

  calAge() {
    const convertAge = new Date(this.clinicInfoPanelForm.controls.dob.value);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    this.clinicInfoPanelForm.get('ageInYears').setValue(Math.floor((timeDiff / (1000 * 3600 * 24)) / 365));
    console.log(this.clinicInfoPanelForm.controls.ageInYears.value, 'ageInYears');
    if (this.clinicInfoPanelForm.controls.ageInYears.value || this.clinicInfoPanelForm.controls.ageInYears.value === 0) {
      const convertAge = new Date(this.clinicInfoPanelForm.controls.dob.value);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.clinicInfoPanelForm.get('ageInMonths').setValue(Math.floor((timeDiff / (1000 * 3600 * 24)) / 30));
      console.log(this.clinicInfoPanelForm.controls.ageInMonths.value, 'ageInMonths');
    }
    this.maxSampleCollectionDate = convertAge;
    var month = this.formatDate(this.maxSampleCollectionDate.getMonth() + 1);
    var day = this.formatDate(this.maxSampleCollectionDate.getDate());
    this.maxSampleCollectionDate = this.maxSampleCollectionDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
    console.log(this.maxSampleCollectionDate, 'maxSampleCollectionDate');
  }

  //mat auto complete filters start


  POEStateFilter(val: string): string[] {
    console.log(val, 'val');
    return this.provinceListArray.map(x => x.province_name).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  POECountyFilter(val: string): string[] {
    console.log(val, 'val');
    return this.POECountyArray.map(x => x.district_name).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }


  POEFilter(val: string): string[] {
    console.log(val, 'val');
    return this.POEArray.map(x => x.facility_name).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }


  implementPartnerFilter(val: string): string[] {
    console.log(val, "implementing val");
    return this.initArray['implementingPartnerList'].map(x => x.show).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  fundingSourceFilter(val: string): string[] {
    return this.initArray['fundingSourceList'].map(x => x.show).filter(option =>
      option.toLowerCase().includes(val));
  }

  testingLabFilter(val: string): string[] {
    return this.initArray['testingLabsList'].map(x => x.show).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  testPlatformListFilter(val: string): string[] {
    return this.initArray['testPlatformList'].map(x => x.show).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }


  labTechnicianFilter(val: string): string[] {
    return this.initArray['labTechniciansList'].map(x => x.show).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  //mat auto complete filters end

  nextStepClinicInfo(isClinicInfoFormValid) {
    if (isClinicInfoFormValid) {
      this.step = 1;
    }
  }
  goToViewResult() {
    this.step = 2;
  }

  dateFormat(dateObj) {

    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    return this.formattedDate = ('0' + (dateObj.getDate())).slice(-2) + '-' + (month[dateObj.getMonth()]) + '-' + (dateObj.getFullYear());

  }

  dateTimeFormat2(dateObj) {
    this.formattedDateTime2 = '';
    return this.formattedDateTime2 = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + (dateObj.getDate())).slice(-2) + 'T' + ('0' + dateObj.getHours()).slice(-2) + ':' + ('0' + dateObj.getMinutes()).slice(-2) + ':00';
  }

  dateTimeFormat(dateObj) {

    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var mydate = (new Date(dateObj));

    return this.formattedDateTime = ('0' + (mydate.getDate())).slice(-2) + '-' + (month[mydate.getMonth()]) + '-' + (mydate.getFullYear()) + ' ' + ('0' + mydate.getHours()).slice(-2) + ':' + ('0' + mydate.getMinutes()).slice(-2) + ':00';

  }

  funding:any

  async saveVlAddSouthSudanForm(isClinicInfoFormValid, isLabResultFormValid, isAddOrUpdate) {


    if (!isClinicInfoFormValid) {
      this.step = 0;

      for (let inner in this.clinicInfoPanelForm.controls) {
        this.clinicInfoPanelForm.get(inner).markAsTouched();
        this.clinicInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.labResultPanelForm.controls) {
        this.labResultPanelForm.get(inner).markAsTouched();
        this.labResultPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (this.isTestingUser == 'no') {
      this.step = 1;
      isLabResultFormValid = true;
    } else if (this.isTestingUser == 'yes') {

      if (!isLabResultFormValid) {
        this.step = 1;
        for (let inner in this.labResultPanelForm.controls) {
          this.labResultPanelForm.get(inner).markAsTouched();
          this.labResultPanelForm.get(inner).updateValueAndValidity();
        }
      } else {
        this.step = 1;
        if (this.labResultPanelForm.controls.isSampleRejected.value) {
          for (let inner in this.labResultPanelForm.controls) {
            this.labResultPanelForm.get(inner).markAsTouched();
            this.labResultPanelForm.get(inner).updateValueAndValidity();
          }
        } else {
          isLabResultFormValid = true;
        }
      }
    }



    if (isClinicInfoFormValid && isLabResultFormValid) {
      this.submitted = true;

      this.loginDetails = await this.storage.get("loginDetails");

      if (isAddOrUpdate == 'add') {
        let count = await this.storage.get("lastLocalTestVlID");
        // count = count.toString();
        if (count == null) {
          count = 1;
        } else {
          var parts = count.slice(-3);
          if (parts == 'NaN') {
            count = 1;
          }
          else {
            var lastCount = count.slice(-4);
            count = +lastCount + 1;
          }
          // var parts = count.split("000");
          // var result = parts[parts.length - 1];
          // count = parseInt(result) + 1;
        }

        var currentDate = new Date();
        var offTestReqID;
        var offTestReqID1;
        // offTestReqID = 'AVL';
        // offTestReqID += currentDate.getFullYear().toString(); // 2011
        // offTestReqID += (currentDate.getMonth() + 1 < 9 ? '0' : '') + (currentDate.getMonth() + 1).toString(); // JS months are 0-based, so +1 and pad with 0's
        // offTestReqID += ('000' + count.toString()).slice(-4);

        // offTestReqID += (currentDate.getFullYear().toString()).slice(2); // 2011
        // offTestReqID += (currentDate.getMonth() + 1 < 9 ? '0' : '') + (currentDate.getMonth() + 1).toString(); // JS months are 0-based, so +1 and pad with 0's AEID2021120001 AEID2112290003
        // offTestReqID += (currentDate.getDate() + 1 < 9 ? '0' : '') + (currentDate.getDate()).toString();
        // offTestReqID += ('000' + count.toString()).slice(-4);

        offTestReqID = 'AVL';
        offTestReqID += Math.random().toString(36).slice(2, 4).toUpperCase();
        offTestReqID += (currentDate.getFullYear().toString()).slice(-2);
        offTestReqID += ('0' + (currentDate.getMonth() + 1)).slice(-2);
        offTestReqID += ('000' + count.toString()).slice(-4);
        console.log(offTestReqID, 'offTestReqID offTestReqID');

        this.createdOn = this.dateTimeFormat(new Date);
        this.isSynced = false;
        this.uniqueID = offTestReqID
        // this.uniqueID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      } else {

        this.updatedOn = this.dateTimeFormat(new Date);
        offTestReqID = this.appSampleCode;
        offTestReqID1 = this.uniqueID;
        this.isSynced = false;

      }

      let filteredPOEState = this.provinceListArray.filter(item => item.province_name == this.clinicInfoPanelForm.controls.POEState.value);
      if (filteredPOEState.length != 0) {
        this.provinceID = filteredPOEState[0] ? filteredPOEState[0].province_id : '';
      }
      // let filteredPOECounty = this.POECountyArray.filter(item => item.district_name == this.clinicInfoPanelForm.controls.POECounty.value);
      // if (filteredPOECounty.length != 0) {
      //   this.districtID = filteredPOECounty[0] ? filteredPOECounty[0].district_id : '';
      // }
      this.districtID = this.districtdata;
      // console.log('iD', this.districtID, this.provinceID, filteredPOECounty, filteredPOEState, this.POECountyArray);

      var BreakException = {};
      try {
        this.initArray['districtList'].forEach((item, index) => {
          let filteredFacilityRecord = item.facilityDetails.filter(facItem => facItem.show === this.clinicInfoPanelForm.controls.POE.value);
          this.facilityId = filteredFacilityRecord[0] ? filteredFacilityRecord[0].value : "";
          if (this.facilityId) {
            throw BreakException;
          }
        });
      } catch (e) {
        if (e !== BreakException) throw e;
      }

     
      let fundingSource = this.initArray ['fundingSourceList'].filter(item => 
        item.show = this.clinicInfoPanelForm.controls.fundingSource.value);
      this.funding = fundingSource[0]? fundingSource[0].value : '';

      let filteredTestLabRecord = this.initArray['testingLabsList'].filter(item =>
        item.show == this.labResultPanelForm.controls.labName.value);
      this.labId = filteredTestLabRecord[0] ? filteredTestLabRecord[0].value : '';
      this.labName = this.labResultPanelForm.controls.labName.value;
      console.log(this.labName,'labName',this.labId, this.labResultPanelForm.controls.reviewedOn.value);

      let reviewedsby = this.initArray['labTechniciansList']?.filter(item =>
        item.show === this.labResultPanelForm.controls.reviewedBy.value);
        console.log(reviewedsby);
      this.reviewed = reviewedsby[0] ? reviewedsby[0].value : '';
      console.log('Reviewed Value:', this.reviewed);

      let filteredImpPartner = this.initArray['implementingPartnerList'].filter(item => item.show == this.clinicInfoPanelForm.controls.implementingPartner.value);
      if (filteredImpPartner.length != 0) {
        this.implementingPartnerID = filteredImpPartner[0] ? filteredImpPartner[0].value : '';
      }

      // let filteredTestedByRecord = this.initArray['labTechniciansList'].filter(item => item.show == this.labResultPanelForm.controls.testedBy.value);
      // if (filteredTestedByRecord.length != 0) {
      //   this.testedByID = filteredTestedByRecord[0] ? filteredTestedByRecord[0].value : '';
      // }


      // if (this.checkedT == true) {
      //   this.result = 'vlTND';
      // }
      // else if (this.checkedB20 == true) {
      //   this.result = 'vlLt40';
      // }
      // else if (this.checkedB40 == true) {
      //   this.result = 'vlLt40';
      // }
      // else if (this.checkedB400 == true) {
      //   this.result = 'vlLt400';
      // }
      // else 
      if (this.labResultPanelForm.controls.isSampleRejected.value == 'yes') {
        this.result = '';
        // this.labResultPanelForm.controls.vlResult = null;
        this.labResultPanelForm.get('vlResult').setValue('');
        this.labResultPanelForm.get('vlLog').setValue('');
      }
      else {
        this.result = this.labResultPanelForm.controls.vlResult.value;
        this.labResultPanelForm.get('rejectionDate').setValue('');
        this.labResultPanelForm.get('rejectionReason').setValue('');
        this.rejectionReason = '';

      }
      
      if(this.clinicInfoPanelForm.controls.isPatientNew.value == 'no'){
        this.clinicInfoPanelForm.get('dateOfArtInitiation').setValue('');
      }

      if(this.clinicInfoPanelForm.controls.hasChangedRegimen.value == 'no'){
        this.clinicInfoPanelForm.get('reasonForArvRegimenChange').setValue('');
        this.clinicInfoPanelForm.get('dateOfArvRegimenChange').setValue('');
      }

      if (this.labResultPanelForm.get('vlResult').value == 'Failed' || this.labResultPanelForm.get('vlResult').value == 'No Result' || this.labResultPanelForm.get('vlResult').value == 'Error' || this.labResultPanelForm.get('vlResult').value == 'Below Detection Level'){
        this.labResultPanelForm.get('vlLog').setValue('');
      }

      if(this.clinicInfoPanelForm.controls.gender.value == 'male'){
        this.clinicInfoPanelForm.get('isPatientBreastfeeding').setValue('');
        this.clinicInfoPanelForm.get('isPatientPregnant').setValue('');
        this.clinicInfoPanelForm.get('trimester').setValue('');
      }

      let currentDateTime = new Date().toISOString().slice(0, 16).replace('T', ' ');
      await this.storage.get('loginDetails').then(async (loginDetails) => {
        if (loginDetails) {
         
          this.userID = loginDetails['user'].user_id;
        
        }
      });
      
      // let reasonForChangingArray = [];
      let array = [];
      let reasonForChangingObj = {
        "reason": this.labResultPanelForm.controls.reasonForChanging.value ? this.labResultPanelForm.controls.reasonForChanging.value : '',
        "change_datetime": currentDateTime,
        "changed_by": this.userID
    };
    // reasonForChangingArray.push(reasonForChangingObj);
    array.push(reasonForChangingObj)
    
    this.reasonArray.push(reasonForChangingObj)

      let saveVlSSJSON =
      {
        "user_id": this.userID,
        "uniqueId": this.uniqueID,
        "appSampleCode": offTestReqID,
        "sampleCode": this.sampleCode ? this.sampleCode : '',
        "remoteSampleCode": this.remoteSampleCode ? this.remoteSampleCode : '',
        "createdOn": this.createdOn,
        "updatedOn": this.updatedOn ? this.updatedOn : '',
        "isSynced": this.isSynced,
        "authToken": this.loginDetails['api_token'],
        "formId": this.loginDetails['form'],

        "serialNo": this.clinicInfoPanelForm.controls.serialNo.value,
        "provinceName": this.clinicInfoPanelForm.controls.POEState.value,
        "provinceId": this.provinceID,
        "district": this.clinicInfoPanelForm.controls.POECounty.value,
        "districtId": this.districtID,
        "facilityName": this.clinicInfoPanelForm.controls.POE.value,
        "facilityId": this.facilityId,
        "requestClinician": this.clinicInfoPanelForm.controls.reqClinician.value,
        "phoneNumber": this.clinicInfoPanelForm.controls.reqClinicianPhoneNumber.value,
        "implementingPartner": this.implementingPartnerID ? this.implementingPartnerID : '',
        "implementingPartnerName": this.clinicInfoPanelForm.controls.implementingPartner.value,
        "fundingSource": this.funding,
        "dateOfDemand": this.clinicInfoPanelForm.controls.dateOfDemand.value ? this.dateFormat(new Date(this.clinicInfoPanelForm.controls.dateOfDemand.value)) : '',

        "dob": this.clinicInfoPanelForm.controls.dob.value ? this.dateFormat(new Date(this.clinicInfoPanelForm.controls.dob.value)) : '',
        "ageInYears": this.clinicInfoPanelForm.controls.ageInYears.value,
        "ageInMonths": this.clinicInfoPanelForm.controls.ageInMonths.value,
        "gender": this.clinicInfoPanelForm.controls.gender.value,
        "art_no": this.clinicInfoPanelForm.controls.patientArtNo.value,
        "isPatientNew": this.clinicInfoPanelForm.controls.isPatientNew.value,
        "doTreatmentInit": this.clinicInfoPanelForm.controls.dateOfArtInitiation.value ? this.dateFormat(new Date(this.clinicInfoPanelForm.controls.dateOfArtInitiation.value)) : '',
        "currentRegimen": this.clinicInfoPanelForm.controls.artRegimen.value,
        "hasChangedRegimen": this.clinicInfoPanelForm.controls.hasChangedRegimen.value,
        "reasonForArvRegimenChange": this.clinicInfoPanelForm.controls.reasonForArvRegimenChange.value,
        "dateOfArvRegimenChange": this.clinicInfoPanelForm.controls.dateOfArvRegimenChange.value ? this.dateFormat(new Date(this.clinicInfoPanelForm.controls.dateOfArvRegimenChange.value)) : '',
        "vlTestReason": this.clinicInfoPanelForm.controls.vlTestReason.value,
        "viralLoadNo": this.clinicInfoPanelForm.controls.viralLoadNo.value,
        "lastViralLoadResult": this.clinicInfoPanelForm.controls.lastViralLoadResult.value,
        "lastViralLoadTestDate": this.clinicInfoPanelForm.controls.lastViralLoadTestDate.value ? this.dateFormat(new Date(this.clinicInfoPanelForm.controls.lastViralLoadTestDate.value)) : '',
        "sampleCollectionDateTime": this.clinicInfoPanelForm.controls.sampleCollectionDate.value ? this.dateTimeFormat(new Date(this.clinicInfoPanelForm.controls.sampleCollectionDate.value)) : '',
        "specimenType": this.clinicInfoPanelForm.controls.specimenType.value,
        "dateDispatchedFromClinicToLab": this.clinicInfoPanelForm.controls.dateDispatchedFromClinicToLab.value ? this.dateTimeFormat(new Date(this.clinicInfoPanelForm.controls.dateDispatchedFromClinicToLab.value)) : '',
        "isPatientBreastfeeding": this.clinicInfoPanelForm.controls.isPatientBreastfeeding.value,
        "isPatientPregnant": this.clinicInfoPanelForm.controls.isPatientPregnant.value,
        "trimester": this.clinicInfoPanelForm.controls.trimester.value,


        "sampleReceivedDateTimeAtTestLab": this.labResultPanelForm.controls.sampleReceivedDate.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.sampleReceivedDate.value)) : '',

        "isSampleRejected": this.labResultPanelForm.controls.isSampleRejected.value,

        "rejectionReasonid": this.rejectionReasonId ? this.rejectionReasonId : '',
        "rejectionReason": this.rejectionReason ? this.rejectionReason : '',
        "labName": this.labResultPanelForm.controls.labName.value,
        "labId": this.labId,
        "sampleTestDate": this.labResultPanelForm.controls.dateOfCompletionOfViralLoad.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.dateOfCompletionOfViralLoad.value)) : '',
        "vlTestPlatform": this.labResultPanelForm.controls.testingPlatform.value,
        "vlResult": this.labResultPanelForm.controls.vlResult.value ? this.labResultPanelForm.controls.vlResult.value : '',
        "resultIn": this.result,
        "vlLog": this.labResultPanelForm.controls.vlLog.value ? this.labResultPanelForm.controls.vlLog.value : '',
        "approvedBy": this.labResultPanelForm.controls.approvedBy.value ? this.labResultPanelForm.controls.approvedBy.value : '',
        "approvedOn": this.labResultPanelForm.controls.approvedOn.value ? this.dateFormat(new Date(this.labResultPanelForm.controls.approvedOn.value)) : '',
        "reviewedBy": this.reviewed,
        "reviewedOn": this.labResultPanelForm.controls.reviewedOn.value ? this.dateFormat(new Date(this.labResultPanelForm.controls.reviewedOn.value)) : '',
        // "reasonForChanging": this.labResultPanelForm.controls.reasonForChanging.value ? this.labResultPanelForm.controls.reasonForChanging.value : '',

        "reasonForChanging": this.reasonArray,
        // "requestClinician": this.clinicInfoPanelForm.controls.requestClinician.value,

        // "requestDate": this.clinicInfoPanelForm.controls.requestDate.value ? this.dateFormat(new Date(this.clinicInfoPanelForm.controls.requestDate.value)) : '',
        // "sampleReceivedDateTimeAtHub": this.labResultPanelForm.controls.sampleReceivedDateTimeAtHub.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.sampleReceivedDateTimeAtHub.value)) : '',

        "rejectionDate": this.labResultPanelForm.controls.rejectionDate.value ? this.dateFormat(new Date(this.labResultPanelForm.controls.rejectionDate.value)) : '',
        // "dateResultDispatch": this.labResultPanelForm.controls.dateResultDispatch.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.dateResultDispatch.value)) : '',
        // "testedBy": this.testedByID,
        
        "arvAdherence": '',
        "resultValueHivDetection": '',
        "labTechComments": '',
        "firstName": '',
        "lastName": '',
        "patientPhoneNo": '',
        
        "patientConsent": '',
        "doInitCuurentRegimen": '',
        "rptDoViralLoadTest": '',
        "rptVlValue": '',
        "requestDate": '',
        "dateResultDispatch": '',
        "rtnDoViralLoadTest": '',
        "rtnVlValue": '',
        "sampleReceivedDateTimeAtHub": '',
        "sampleReordered": '',
        "stfDoViralLoadTest": '',
        "stfVlValue": '',
        "testedBy": '',
        "vlFocalPerson": '',
        "vlFocalPhoneNo": '',

      }



      // this.localTestRequestFormService.offlineStoreShipmentForm(saveVlSSJSON, isAddOrUpdate);

      this.db.insertVlData(saveVlSSJSON, isAddOrUpdate);

      if (this.mode == undefined) {
        for (let inner in this.clinicInfoPanelForm.controls) {
          this.clinicInfoPanelForm.get(inner).setValue('');
          this.clinicInfoPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.labResultPanelForm.controls) {
          this.labResultPanelForm.get(inner).setValue('');
          this.labResultPanelForm.get(inner).setErrors(null);
        }
      }

    }
  }

  loadStaticArrays() {
    this.isVisible = -1;
    this.ViralLoadTesting = [{
      "name": "Routine Monitoring",
      "value": 1
    },
    {
      "name": "Repeat VL test after suspected treatment failure adherence counselling",
      "value": 2
    },
    {
      "name": "Suspect Treatment Failure",
      "value": 3
    }]
    this.testNumberArray = [{
      "name": "1",
      "value": 1
    },
    {
      "name": "2",
      "value": 2
    },
    {
      "name": "3",
      "value": 3
    },
    {
      "name": "4",
      "value": 4
    },
    {
      "name": "5",
      "value": 5
    },
    ]
    this.genderArray = [{
      "name": "Male",
      "value": "male"
    },
    {
      "name": "Female",
      "value": "female"
    }
    ]
    this.resultat = [{
      "name": "Below Detection Level",
      "value": "Below Detection Level"
    },
    {
      "name": "Failed",
      "value": "Failed"
    },
    {
      "name": "Error",
      "value": "Error"
    },
    {
      "name": "No Result",
      "value": "No Result"
    }]
    this.PatientConsent = [{
      "name": "Oui",
      "value": "yes"
    },
    {
      "name": "Non",
      "value": "no"
    }
    ]
    this.trimestre = [{
      "name": "Trimestre 1",
      "value": 1
    },
    {
      "name": "Trimestre 2",
      "value": 2
    },
    {
      "name": "Trimestre 3",
      "value": 3
    }
    ]
    this.RapidTestResultArray = [{
      "name": "Positive",
      "value": "positive"
    },
    {
      "name": "Negative",
      "value": "negative"
    },
    {
      "name": "Indeterminate",
      "value": "Indeterminate"
    }
    ]
    // this.implementingPartnerArray = [{
    //   "name": "CORDAID",
    //   "value": "MTI="
    // },
    // {
    //   "name": "EGPAF Elikya",
    //   "value": "MTA="
    // },
    // {
    //   "name": "HPP-CONGO",
    //   "value": "MTE="
    // },
    // {
    //   "name": "ICAP Haut-Katanga",
    //   "value": "NA=="
    // },
    // {
    //   "name": "ICAP Kinshasa",
    //   "value": "Mw=="
    // },
    // {
    //   "name": "IHAP Haut-Katanga",
    //   "value": "NQ=="
    // },
    // {
    //   "name": "IHAP Kinshasa",
    //   "value": "Mg=="
    // },
    // {
    //   "name": "KHETHIMPILO (HEC)",
    //   "value": "Nw=="
    // },
    // {
    //   "name": "Metabiota",
    //   "value": "OA=="
    // },
    // {
    //   "name": "METABIOTA DoD - Kisangani",
    //   "value": "OQ=="
    // },
    // {
    //   "name": "SANRU",
    //   "value": "Ng=="
    // }
    // ]
    
    this.artRegimenArray = [{
      "name": "AZT-3TC-NVP",
      "value": "AZT-3TC-NVP"
    },
    {
      "name": "TDF-3TC-NVP",
      "value": "TDF-3TC-NVP"
    },
    {
      "name": "AZT-3TC-EFV",
      "value": "AZT-3TC-EFV"
    },
    {
      "name": "TDF-3TC-EFV",
      "value": "TDF-3TC-EFV"
    },
    {
      "name": "ABC-DDI-LPV/r",
      "value": "ABC-DDI-LPV/r"
    },
    {
      "name": "AZT-3TC-LPV/r",
      "value": "AZT-3TC-LPV/r"
    },
    {
      "name": "TDF/FTC/Kal",
      "value": "TDF/FTC/Kal"
    },
    {
      "name": "TDF/3TC/LPV/r",
      "value": "TDF/3TC/LPV/r"
    },
    {
      "name": "TDF/3TC/Kal",
      "value": "TDF/3TC/Kal"
    },
    {
      "name": "ABC-3TC-LPV/r",
      "value": "ABC-3TC-LPV/r"
    },
    {
      "name": "LPV-Duovir +ctx",
      "value": "LPV-Duovir +ctx"
    },
    {
      "name": "TDF-3TC-LPVr",
      "value": "TDF-3TC-LPVr"
    },
    {
      "name": "ABC-3TC-EFV",
      "value": "ABC-3TC-EFV"
    },
    {
      "name": "TDR 354 LPR",
      "value": "TDR 354 LPR"
    },
    {
      "name": "ABC F3 M HFU",
      "value": "ABC F3 M HFU"
    },
    {
      "name": "ABC 39c LPV 12",
      "value": "ABC 39c LPV 12"
    },
    {
      "name": "TDF 3TC DTG",
      "value": "TDF 3TC DTG"
    },
    {
      "name": "TLD",
      "value": "TLD"
    },
    {
      "name": "ABC 3TC DTG",
      "value": "ABC 3TC DTG"
    },
    {
      "name": "ABC 35C EFV",
      "value": "ABC 35C EFV"
    },
    {
      "name": "DTG+3TC+TDF",
      "value": "DTG+3TC+TDF"
    },
    {
      "name": "TDF-3TC-DTG",
      "value": "TDF-3TC-DTG"
    },
    {
      "name": "DLT",
      "value": "DLT"
    },
    {
      "name": "L2TLD",
      "value": "L2TLD"
    },
    {
      "name": "L1TLD",
      "value": "L1TLD"
    },
    {
      "name": "TDF/3TC/DLT",
      "value": "TDF/3TC/DLT"
    },
    {
      "name": "ABC+3TC+DOLITEGRAVIN",
      "value": "ABC+3TC+DOLITEGRAVIN"
    },
    {
      "name": "ABC+3TC+DOLITEGRAVIN50",
      "value": "ABC+3TC+DOLITEGRAVIN50"
    },
    {
      "name": "NVP",
      "value": "NVP"
    },
    {
      "name": "TLD-3TC-EFV",
      "value": "TLD-3TC-EFV"
    },
    {
      "name": "AZT3TCDTG",
      "value": "AZT3TCDTG"
    },
    {
      "name": "T3U",
      "value": "T3U"
    },
    {
      "name": "T30",
      "value": "T30"
    },
    {
      "name": "TLO",
      "value": "TLO"
    },
    {
      "name": "TLD+3TC/TDF",
      "value": "TLD+3TC/TDF"
    },
    {
      "name": "ABC+3TC+LOPIR",
      "value": "ABC+3TC+LOPIR"
    },
    {
      "name": "Autre",
      "value": "other"
    }
    ]
    this.vlTestReasonArray = [{
      "name": "CV à 6 Mois",
      "value": "1"
    },
    {
      "name": "CV à  12 Mois De TARV",
      "value": "2"
    },
    {
      "name": "Contrôle De Routine",
      "value": "3"
    },
    {
      "name": "Suspicion D’échec   Thérapeutique",
      "value": "4"
    },
    {
      "name": "CV Après Conseil D’adhérence",
      "value": "5"
    },
    {
      "name": "CONTROLE APRES 1 AN DE PRELEVEMENT ANTERIEURES RESULTATS NON RECU",
      "value": "6"
    },
    {
      "name": "PREMIERE CHARGE VIRAL APRES 6 MOIS DES T3 ARV",
      "value": "7"
    },
    {
      "name": "RETOUR APRES ABANDON",
      "value": "8"
    },
    {
      "name": "OPTION B+",
      "value": "9"
    },
    {
      "name": "RUPTURE",
      "value": "10"
    },
    {
      "name": "PROTOCOLE NATIONAL",
      "value": "11"
    },
    {
      "name": "DIAGNOSTIQUE",
      "value": "12"
    },
    {
      "name": "Resultat Hiv Indetermine",
      "value": "13"
    },
    {
      "name": "FES ALLAITENTE A 6 SEMAINE",
      "value": "14"
    },
    {
      "name": "NDT",
      "value": "15"
    },
    {
      "name": "CV A 3 MOIS",
      "value": "16"
    },
    {
      "name": "6 SEMAINES APRES ACCOUCHEMENT",
      "value": "17"
    },
    {
      "name": "FEMME ALLAITANTE A 6 MOIS",
      "value": "18"
    },
    {
      "name": "PREMIER PRELEVEMENT SANS RESULTAT",
      "value": "19"
    },
    {
      "name": "CV CIBLEE CHEZ UNE FEMME  ENCEINTE",
      "value": "20"
    },
    {
      "name": "PAS D RESULTAT",
      "value": "21"
    },
    {
      "name": "Politique Nationale",
      "value": "22"
    },
    {
      "name": "Recency",
      "value": "9999"
    },
    {
      "name": "Autre",
      "value": "other"
    }
    ]
    this.testingPlatformArray = [{
      "name": "Cobas TaqMan Roche",
      "value": "Cobas TaqMan Roche##0##0"
    },
    {
      "name": "GeneXpert ",
      "value": "GeneXpert ##0##0"
    },
    {
      "name": "Abbott RealTime HIV-1 ",
      "value": "Abbott RealTime HIV-1##40##10000000"
    }
    ]
    this.specimenTypeArray = [{
      "name": "DBS",
      "value": "1"
    },
    {
      "name": "Plasma",
      "value": "2"
    },
    {
      "name": "Sang Total",
      "value": "3"
    },
    {
      "name": "Venous Blood(EDTA)",
      "value": "4"
    },
    {
      "name": "Frozen Plasma",
      "value": "5"
    },
    {
      "name": "Venous DBS(EDTA)",
      "value": "6"
    },
    {
      "name": "CAPILLARY DBS",
      "value": "7"
    }
    ]
    this.rejectedReasonArray = [{
      "name": "Reason One",
      "value": "1"
    },
    {
      "name": "Reason Two",
      "value": "2"
    },
    {
      "name": "Bad Rslt",
      "value": "3"
    },
    {
      "name": "Poorly Labelled Specimen",
      "value": "4"
    },
    {
      "name": "Mismatched Sample And Form Labeling",
      "value": "5"
    },
    {
      "name": "Missing Labels On Container Or Tracking Form",
      "value": "6"
    },
    {
      "name": "Sample Without Request Forms/Tracking Forms",
      "value": "7"
    },
    {
      "name": "Name/Information Of Requester Is Missing",
      "value": "8"
    },
    {
      "name": "Missing Information On Request Form - Age",
      "value": "9"
    },
    {
      "name": "Missing Information On Request Form - Sex",
      "value": "10"
    },
    {
      "name": "Missing Information On Request Form - Sample Collection Date",
      "value": "11"
    },
    {
      "name": "Missing Information On Request Form - ART No",
      "value": "12"
    },
    {
      "name": "Inappropriate Specimen Packing",
      "value": "13"
    },
    {
      "name": "Inappropriate Specimen For Test Request",
      "value": "14"
    },
    {
      "name": "EDTA Tube Specimens That Arrived Hemolyzed",
      "value": "15"
    },
    {
      "name": "ETDA Tube That Arrives More Than 24 Hours After Specimen Collection",
      "value": "16"
    },
    {
      "name": "Plasma That Arrives At A Temperature Above 8 C",
      "value": "17"
    },
    {
      "name": "Plasma Tube Contain Less Than 1.5 ML",
      "value": "18"
    },
    {
      "name": "DBS Cards With Insufficient Blood Spots",
      "value": "19"
    },
    {
      "name": "DBS Card With Clotting Present In Spots",
      "value": "20"
    },
    {
      "name": "DBS Cards That Have Serum Rings Indicating Contamination Around Spots",
      "value": "21"
    },
    {
      "name": "VL Mechine Flag",
      "value": "22"
    },
    {
      "name": "Autre",
      "value": "other"
    }
    ]

  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  prevStep() {
    this.step--;
  }

  clearDOB(field) {
    if (field == 'dod') {
      this.clinicInfoPanelForm.get('dateOfDemand').setValue('');
    }
    else if (field == 'dob') {
      this.clinicInfoPanelForm.get('dob').setValue('');
    }
    else if (field == 'doi') {
      this.clinicInfoPanelForm.get('dateOfArtInitiation').setValue('');
    }
    else if (field == 'doarc') {
      this.clinicInfoPanelForm.get('dateOfArvRegimenChange').setValue('');
    }
    else if (field == 'dolvlt') {
      this.clinicInfoPanelForm.get('lastViralLoadTestDate').setValue('');
    }
  }

  clearSampleCollection() {
    this.clinicInfoPanelForm.get('sampleCollectionDate').setValue('');
  }

  clearSampleCollections(){
    this.clinicInfoPanelForm.get('dateDispatchedFromClinicToLab').setValue('');
  }

  clearSampleReceived() {
    this.labResultPanelForm.get('sampleReceivedDate').setValue('');
  }

  clearDateOfCompletion() {
    this.labResultPanelForm.get('dateOfCompletionOfViralLoad').setValue('');
  }

  // clearDateOfTesting() {
  //   this.labResultPanelForm.get('sampleTestDate').setValue('');
  // }

 
  clearReviewedByOn(){
    this.labResultPanelForm.get('reviewedOn').setValue('');
  }

  goBack() {

    var routerSplitURL = this.router.url.split(';');
    if ((this.router.url === '/add-new-request' && (this.clinicInfoPanelForm.dirty || this.clinicInfoPanelForm.dirty || this.clinicInfoPanelForm.dirty || this.labResultPanelForm.dirty)) ||
      (routerSplitURL[1] == 'data_mode=edit' && (this.clinicInfoPanelForm.dirty || this.clinicInfoPanelForm.dirty || this.clinicInfoPanelForm.dirty || this.labResultPanelForm.dirty))) {

      this.alertService.confirmAlert('VLSM', "Are you sure you want to go back? Because the data you have entered will be lost", 'addEditForm');

    } else {
      this.router.navigate([this.previousPageURL], {
        replaceUrl: true
      });
    }
  }

  

  maxmindate() {
    this.maxDate = new Date();
    var month = this.formatDate(this.maxDate.getMonth()+1);
    var day = this.formatDate(this.maxDate.getDate());
    var hour = this.maxDate.getHours();
    var minute = this.maxDate.getMinutes();
    this.maxDatetime = this.maxDate.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + minute;
  }

  

  private formatDate(nmbr: number): string {
    var date = nmbr + "";
    date = (date.length < 2) ? "0" + date : date;
    return date;
  }

  

  /* Natesh

  // onItemChange() {
  //   console.log(this.clinicInfoPanelForm.get('VLTesting').value, 'clinicInfoPanelForm.get().value');
  //   this.isVisible = this.clinicInfoPanelForm.get('VLTesting').value;
  // }

  

  // onChangeTarget() {

  //   if (this.checkedT == false) {
  //     this.checkedT = true;
  //     this.labResultPanelForm.get('vlResult').setValue('');
  //     this.labResultPanelForm.get('vlLog').setValue('');
  //   }
  //   else {
  //     this.checkedT = false;
  //   }
  // }

  

  // onChangeBelow(num) {
  //   if (num == 20) {
  //     if (this.checkedB20 == false) {
  //       this.checkedB20 = true;
  //       this.labResultPanelForm.get('vlResult').setValue('');
  //       this.labResultPanelForm.get('vlLog').setValue('');
  //     }
  //     else {
  //       this.checkedB20 = false;
  //     }
  //   }
  //   else if (num == 40) {
  //     if (this.checkedB40 == false) {
  //       this.checkedB40 = true;
  //       this.labResultPanelForm.get('vlResult').setValue('');
  //       this.labResultPanelForm.get('vlLog').setValue('');
  //     }
  //     else {
  //       this.checkedB40 = false;
  //     }
  //   }
  //   else if (num == 400) {
  //     console.log(this.checkedB400, num, 'this.checkedB400 num');
  //     if (this.checkedB400 == false) {
  //       this.checkedB400 = true;
  //       this.labResultPanelForm.get('vlResult').setValue('');
  //       this.labResultPanelForm.get('vlLog').setValue('');
  //     }
  //     else {
  //       this.checkedB400 = false;
  //     }
  //   }
  // }

  */

  onChangeVl(objId) {
    if (this.labResultPanelForm.get('vlResult').value == 'Failed' || this.labResultPanelForm.get('vlResult').value == 'No Result' || this.labResultPanelForm.get('vlResult').value == 'Error' || this.labResultPanelForm.get('vlResult').value == 'Below Detection Level'){
      // this.labResultPanelForm.get('vlLog').setValue('');
      console.log('testIF in cange');
    }
    else{
      if (objId == "vlResult") {
        var absValue = this.labResultPanelForm.get('vlResult').value;
        if (absValue != '' && absValue != 0 && !isNaN(absValue)) {
          this.labResultPanelForm.get('vlResult').setValue(parseFloat(absValue).toFixed());
          this.labResultPanelForm.get('vlLog').setValue(Math.round(Math.log10(absValue) * 100) / 100);
          console.log(this.labResultPanelForm.get('vlLog'), 'vlLog');
        } else {
          this.labResultPanelForm.get('vlLog').setValue('');
        }
      }
      if (objId == "vlLog") {
        var logValue = this.labResultPanelForm.get('C').value;
        if (logValue != '' && logValue != 0 && !isNaN(logValue)) {
          this.absVal = Math.round(Math.pow(10, logValue) * 100) / 100;
          if (this.absVal != 'Infinity') {
            var logValue1 = (Math.round(Math.pow(10, logValue) * 100) / 100);
            this.labResultPanelForm.get('vlResult').setValue((logValue1).toFixed());
            console.log(this.labResultPanelForm.get('vlResult'), 'vlResult');
          }
        } else {
          this.labResultPanelForm.get('vlResult').setValue('');
        }
      }
      console.log('testElse in cange');
    }

   
  }

  // onChangeRejectReason(){
  //   if (this.vlInitArray && this.labResultPanelForm) {
  //     const result = this.sharedService.onChangeRejectReason(this.vlInitArray, this.labResultPanelForm);
  //     console.log(result);
  //   } else {
  //     console.error('vlInitArray or labResultPanelForm is not defined');
  //   }
  // }
    
 
  onChangeRejectReason() {
    for (var i = 0; i < this.vlInitArray['rejectedReasonList'].length; i++) {
      let filteredRejectionReason = this.vlInitArray['rejectedReasonList'][i].reasons.filter(item =>
        item.show == this.labResultPanelForm.controls.rejectionReason.value);
      if (filteredRejectionReason.length > 0) {
        this.rejectionReasonId = filteredRejectionReason[0] ? filteredRejectionReason[0].value : '';
        this.rejectionReason = this.labResultPanelForm.controls.rejectionReason.value;
        console.log(filteredRejectionReason, 'filteredRejectionReason', this.rejectionReasonId, this.rejectionReason);
        break;
      }
    }
  }


  setMaxSampleReceivedHubDate() {
    this.minSampleCollectedDate = new Date(this.clinicInfoPanelForm.controls.sampleCollectionDateTime.value);
    var month = this.formatDate(this.minSampleCollectedDate.getMonth() + 1);
    var day = this.formatDate(this.minSampleCollectedDate.getDate());
    this.minSampleCollectedDate = this.minSampleCollectedDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
    console.log(this.minSampleCollectedDate, 'setmaxSampleReceivedHubDate');
  }



  /* Natesh

  // setMaxSampleReceivedLabDate() {
  //   this.maxSampleReceivedLabDate = new Date(this.labResultPanelForm.controls.sampleReceivedDateTimeAtHub.value);
  //   var month = this.formatDate(this.maxSampleReceivedLabDate.getMonth() + 1);
  //   var day = this.formatDate(this.maxSampleReceivedLabDate.getDate());
  //   this.maxSampleReceivedLabDate = this.maxSampleReceivedLabDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
  //   console.log(this.maxSampleReceivedLabDate, 'setmaxSampleReceivedLabDate');
  // }
  // setMaxSampleTestDate() {

  //   this.maxSampleTestDate = new Date(this.labResultPanelForm.controls.sampleReceivedDateTimeAtTestLab.value);
  //   var month = this.formatDate(this.maxSampleTestDate.getMonth()+1);
  //   var day = this.formatDate(this.maxSampleTestDate.getDate());
  //   var hour = this.maxSampleTestDate.getHours();
  //   var minute = this.maxSampleTestDate.getMinutes();
  //   this.maxSampleTestDate = this.maxSampleTestDate.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + minute;
  //   console.log(this.maxSampleTestDate,'setMaxSampleTestDate',this.maxDate);
  // }

  */

}
