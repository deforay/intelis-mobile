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
import { Storage } from '@ionic/storage-angular';
import { LocalTestRequestFormService } from '../../../service/localTestRequestForm/local-Test-Request-Form.service';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../../services/db.service';
import { CommonService } from '../../../service/common/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { ChangeDetectorRef } from '@angular/core';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-vl-new-request',
  templateUrl: './vl-new-request.page.html',
  styleUrls: ['./vl-new-request.page.scss'],
})

export class VlNewRequestPage implements OnInit {
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
  result: any;
  checkedB: boolean = false;
  vlInitArray: any = [];
  POECountyArray: any = [];
  genderArray: any = [];
  PatientConsent: any = [];
  RapidTestResultArray: any = [];
  selectedPatientDetail: any;
  genderSelected: any;
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
  requestClinicianFilteredOptions: Observable<string[]>;
  approvedByFilteredOptions: Observable<string[]>;
  reviewedByFilteredOptions: Observable<string[]>;





  count: number;
  getSelectedTestReqForm: any;
  motherTreatment: any = [];
  mode: any;
  isMenuOrBackButton: any;
  appSampleCode: any;
  sampleReordered: boolean = false;
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
  Accesstype: string;
  testMethodArray: any = [];
  dateOfTestingArray: any = [];
  testPlatformArray: any = [];
  testResultArray: any = [];
  labTechnicianID: any;
  testedByID: any;
  approvedByID: any;
  reviewedByID: any;
  formattedDateTime2: string;
  labName: any;
  provinceID: any;
  implementingPartnerID: any;
  implementingPartnerName: any;
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
  technicianLab: any;
  approverLab: any;
  reviewerLab: any;
  provinceListArray: any = [];
  districtID: any;
  absVal: any;
  remoteSampleCode: any;
  previousRejectedValue: any;
  maxSampleReceivedLabDate: any;
  maxSampleTestDate: any;
  maxSampleCollectionDate: any;
  maxSampleReceivedHubDate: any;
  maxResultDate: any;
  indication4VlTestingPanelForm: FormGroup;
  clinicInfoPanelForm: FormGroup;
  patientInfoPanelForm: FormGroup;
  sampleInfoPanelForm: FormGroup;
  treatmentInfoPanelForm: FormGroup;
  staticArrays: any;
  communitySample: any = [];
  userList: any;
  constructor(private router: Router,
    private cdr: ChangeDetectorRef,
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
    this.maxDatetime = new Date().toISOString().slice(0, 16);
    // this.minSampleCollectionDate = '2020-01-01T00:00'; // Example min date
    this.minSampleDispatchedDate = '';
    actRoute.params.subscribe(val => {
      // put the code from `ngOnInit` here
      console.log('constructortest');

      this.indication4VlTestingPanelForm = new FormGroup({
        VLTesting: new FormControl('', []),
        rtnDoViralLoadTest: new FormControl('', []),
        rtnVlValue: new FormControl('', []),
        rptDoViralLoadTest: new FormControl('', []),
        rptVlValue: new FormControl('', []),
        stfDoViralLoadTest: new FormControl('', []),
        stfVlValue: new FormControl('', []),
        requestClinician: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
       
        phoneNumber: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        requestDate: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
      });

      this.clinicInfoPanelForm = new FormGroup({

        sampleReordered: new FormControl('', []),
       
        POEState: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
        CommunitySample: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        POECounty: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),

        POE: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
     
        fundingSource: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        implementingPartner: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      });

      this.patientInfoPanelForm = new FormGroup({

        search: new FormControl('', []),
        art_no: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
        dob: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        firstName: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, [Validators.required]),
       
      
        // lastName: new FormControl('', [Validators.required,]),
        ageInYears: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        ageInMonths: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        gender: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
       
        patientConsent: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        patientPhoneNo: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [])
      });

      this.sampleInfoPanelForm = new FormGroup({


        specimenType: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),

        sampleCollectionDateTime: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
        sampleDispatchedOn: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
     
        sampleReceivedDateTimeAtHub: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, [Validators.required]),

        sampleReceivedDateTimeAtTestLab: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, [Validators.required]),
      
      


      });

      this.treatmentInfoPanelForm = new FormGroup({
        doTreatmentInit: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        currentRegimen: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        doInitCuurentRegimen: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        arvAdherence: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        isPatientPregnant: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        isPatientBreastfeeding: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
      
       
      });

      for (let inner in this.treatmentInfoPanelForm.controls) {
        this.treatmentInfoPanelForm.get(inner).setValue('');
        this.treatmentInfoPanelForm.get(inner).setErrors(null);
      }
      this.labResultPanelForm = this.fb.group({
        labName: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
        vlFocalPerson: new FormControl('', []),
        vlFocalPhoneNo: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
        sampleReceivedDateTimeAtHub: new FormControl('', []),
        sampleReceivedDateTimeAtTestLab: new FormControl('', []),
       
        sampleTestDate: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        vlTestPlatform: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),

        isSampleRejected: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
        resultValueHivDetection: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
        rejectionReason: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
       
        
        
        vlResult: new FormControl('', []),
        targetNotDetected: new FormControl('', []),
        belowDetectionLevel: new FormControl('', []),
        vlLog: new FormControl('', []),
        reasonForChanging: new FormControl('', []),
        rejectionDate: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),

        dateResultDispatch: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
      
        testedBy: new FormControl({
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
       
        reviewedBy: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
       
        reviewedOn: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
      
        labTechComments: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),

        
      });

      // if (this.mode == 'add') {
      //   for (let inner in this.clinicInfoPanelForm.controls) {
      //     this.clinicInfoPanelForm.get(inner).setValue('');
      //     this.clinicInfoPanelForm.get(inner).setErrors(null);
      //   }
      //   for (let inner in this.patientInfoPanelForm.controls) {
      //     this.patientInfoPanelForm.get(inner).setValue('');
      //     this.patientInfoPanelForm.get(inner).setErrors(null);
      //   }
      //   for (let inner in this.sampleInfoPanelForm.controls) {
      //     this.sampleInfoPanelForm.get(inner).setValue('');
      //     this.sampleInfoPanelForm.get(inner).setErrors(null);
      //   }
      //   for (let inner in this.treatmentInfoPanelForm.controls) {
      //     this.treatmentInfoPanelForm.get(inner).setValue('');
      //     this.treatmentInfoPanelForm.get(inner).setErrors(null);
      //   }
      //   for (let inner in this.indication4VlTestingPanelForm.controls) {
      //     this.indication4VlTestingPanelForm.get(inner).setValue('');
      //     this.indication4VlTestingPanelForm.get(inner).setErrors(null);
      //   }
      //   for (let inner in this.labResultPanelForm.controls) {
      //     this.labResultPanelForm.get(inner).setValue('');
      //     this.labResultPanelForm.get(inner).setErrors(null);
      //   }
      // }
      console.log(this.clinicInfoPanelForm.valid, this.patientInfoPanelForm.valid, this.sampleInfoPanelForm.valid, this.treatmentInfoPanelForm.valid, this.indication4VlTestingPanelForm.valid, this.labResultPanelForm.valid, 'constructortest');

    });
    
    this.loadStaticArrays()

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
    this.setMaxDatetime();
  }

  ionViewWillLeave() {
    if (this.mode == 'add') {
      for (let inner in this.clinicInfoPanelForm.controls) {
        this.clinicInfoPanelForm.get(inner).setValue('');
        this.clinicInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.patientInfoPanelForm.controls) {
        this.patientInfoPanelForm.get(inner).setValue('');
        this.patientInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.sampleInfoPanelForm.controls) {
        this.sampleInfoPanelForm.get(inner).setValue('');
        this.sampleInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.treatmentInfoPanelForm.controls) {
        this.treatmentInfoPanelForm.get(inner).setValue('');
        this.treatmentInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.indication4VlTestingPanelForm.controls) {
        this.indication4VlTestingPanelForm.get(inner).setValue('');
        this.indication4VlTestingPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.labResultPanelForm.controls) {
        this.labResultPanelForm.get(inner).setValue('');
        this.labResultPanelForm.get(inner).setErrors(null);
      }
    }
    console.log(this.clinicInfoPanelForm.valid, this.patientInfoPanelForm.valid, this.sampleInfoPanelForm.valid, this.treatmentInfoPanelForm.valid, this.indication4VlTestingPanelForm.valid, this.labResultPanelForm.valid, 'ionViewWillLeave');
    this.storage.remove("selectedPatient");
  }

  ngOnInit() {

    this.setInitialMinSampleDispatchedDate();

    if (this.mode == 'add') {
      console.log(this.clinicInfoPanelForm.valid, this.patientInfoPanelForm.valid, this.sampleInfoPanelForm.valid, this.treatmentInfoPanelForm.valid, this.indication4VlTestingPanelForm.valid, this.labResultPanelForm.valid, 'ngOnInIt');

    }

  }


  async ionViewWillEnter() {
    console.log(this.clinicInfoPanelForm.valid, this.patientInfoPanelForm.valid, this.sampleInfoPanelForm.valid, this.treatmentInfoPanelForm.valid, this.indication4VlTestingPanelForm.valid, this.labResultPanelForm.valid, 'ionViewWillEnter');

    await this.storage.create();

    this.isToggled = false;
    this.step = 0;
    await this.getInitArray();
    if (this.actRoute.snapshot.paramMap.get('searchText')) {
      this.patientInfoPanelForm.get('search').setValue(this.actRoute.snapshot.paramMap.get('searchText'));
    }

    if (await this.storage.get("selectedPatient") && this.patientInfoPanelForm.get('search').value) {

      this.getSelectedPatientDetails();
    }

    if (this.mode == 'edit' || this.mode == 'view' || this.mode == 'result edit') {
      this.editSelectedTestReqForm();
    }

    await this.storage.get('loginDetails').then(async (loginDetails) => {
      if (loginDetails) {
        this.userID = loginDetails['user'].user_id;
        this.isTestingUser = loginDetails['user'].testing_user;
        this.Accesstype = loginDetails['user'].access_type;
      }
    })

    // await this.storage.get('loginDetails').then(async (loginDetails) => {
    //   if (loginDetails) {
    //     console.log('Login Details:', loginDetails); // Log the entire loginDetails object
    
    //     this.userID = loginDetails['user'].user_id;
    //     this.isTestingUser = loginDetails['user'].testing_user;
    //     this.Accesstype = loginDetails['user'].access_type;
    
    //     console.log('User ID:', this.userID);           // Log the user ID
    //     console.log('Is Testing User:', this.isTestingUser); // Log the testing user flag
    //     console.log('Access Type:', this.Accesstype);   // Log the access type
    //   } else {
    //     console.log('No login details found.'); // Log a message if loginDetails is not found
    //   }
    // });
    

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

  onChangeisSampleRejected() {
    if (this.mode == 'edit' && this.labResultPanelForm.controls.isSampleRejected.value == 'no') {
      // this.testArray().push(this.newTest());
    }
  }



  async getSelectedPatientDetails() {

    if (await this.storage.get("selectedPatient") && this.patientInfoPanelForm.get('search').value) {

      this.step = 1;

      this.selectedPatientDetail = await this.storage.get("selectedPatient");
      console.log(this.selectedPatientDetail);

      this.patientInfoPanelForm.get('art_no').setValue(this.selectedPatientDetail.patient_art_no);
      // this.patientInfoPanelForm.get('DHIS2CaseID').setValue(this.selectedPatientDetail.externalSampleCode);
      this.patientInfoPanelForm.get('firstName').setValue(this.selectedPatientDetail.patient_first_name);
      // this.patientInfoPanelForm.get('lastName').setValue(this.selectedPatientDetail.lastName);
      this.patientInfoPanelForm.get('dob').setValue(this.selectedPatientDetail.patient_dob ? new Date(this.selectedPatientDetail.patient_dob) : '');
      this.patientInfoPanelForm.get('ageInYears').setValue(this.selectedPatientDetail.patient_age_in_years);
      this.patientInfoPanelForm.get('ageInMonths').setValue(this.selectedPatientDetail.patient_age_in_months);
      this.patientInfoPanelForm.get('gender').setValue(this.selectedPatientDetail.patient_gender);
      this.genderSelected = this.selectedPatientDetail.patientGender;
      this.patientInfoPanelForm.get('patientPhoneNo').setValue(this.selectedPatientDetail.patient_mobile_number);
      // this.patientInfoPanelForm.get('address').setValue(this.selectedPatientDetail.patient_address);



    } else {

      this.patientInfoPanelForm.get('art_no').setValue('');
      this.patientInfoPanelForm.get('DHIS2CaseID').setValue('');
      this.patientInfoPanelForm.get('firstName').setValue('');
      // this.patientInfoPanelForm.get('lastName').setValue('');
      this.patientInfoPanelForm.get('dob').setValue('');
      this.patientInfoPanelForm.get('age').setValue('');
      this.patientInfoPanelForm.get('gender').setValue('');
      this.genderSelected = '';
      this.patientInfoPanelForm.get('phoneNo').setValue('');
      this.patientInfoPanelForm.get('address').setValue('');
      this.patientInfoPanelForm.get('state').setValue("");
      this.patientInfoPanelForm.get('county').setValue("");
      this.patientInfoPanelForm.get('zone').setValue("");
      this.patientInfoPanelForm.get('city').setValue("");
      this.patientInfoPanelForm.get('passportNumber').setValue('');

    }

  }

  async editSelectedTestReqForm() {

    this.getSelectedTestReqForm = await this.storage.get("selectedVlTestReq");
    this.viewResultArray.push(this.getSelectedTestReqForm);
    console.log(this.getSelectedTestReqForm.communitySample)
    console.log(this.getSelectedTestReqForm, 'getSelected Vl', this.getSelectedTestReqForm.provinceId, this.getSelectedTestReqForm.provinceName);
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
    if (this.getSelectedTestReqForm.sampleCode) {
      this.sampleCode = this.getSelectedTestReqForm.sampleCode;
    }
    this.remoteSampleCode = this.getSelectedTestReqForm.remoteSampleCode ? this.getSelectedTestReqForm.remoteSampleCode : '';
    this.createdOn = this.getSelectedTestReqForm.createdOn;
    this.appSampleCode = this.getSelectedTestReqForm.appSampleCode;
    if (this.getSelectedTestReqForm.sampleReordered == 'no') {
      this.sampleReordered = false;
    }
    else {
      this.sampleReordered = this.getSelectedTestReqForm.sampleReordered;
    }
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

    this.clinicInfoPanelForm.get('CommunitySample').setValue(this.getSelectedTestReqForm.communitySample);

    // this.provinceListArray
    let defaultProvinceTest = this.provinceListArray.filter(item => item.province_id == this.getSelectedTestReqForm.provinceId);
    console.log(defaultProvinceTest, 'defaultprovincetestdefaultprovincetest defaultprovincetest', this.provinceListArray);
    this.clinicInfoPanelForm.get('POEState').setValue(defaultProvinceTest[0].province_name);
    this.POEStateFilteredOptions = this.clinicInfoPanelForm.get('POEState').valueChanges.pipe(startWith(''), map(value => this.POEStateFilter(value)));
    // this.clinicInfoPanelForm.get('POEState').setValue(this.getSelectedTestReqForm.provinceName);
    let defaultSelectedCounty = this.provinceListArray.filter(item => item.province_name == defaultProvinceTest[0].province_name);
    if (defaultSelectedCounty.length != 0) {
      let POECountyDupArray = await this.CommonService.getDistrictList(defaultSelectedCounty[0].province_id);
      this.POECountyArray = [...new Set(POECountyDupArray.map(({ district_id }) => district_id))].map(e => POECountyDupArray.find(({ district_id }) => district_id == e));
      console.log(this.POECountyArray);
    }

    this.clinicInfoPanelForm.get('POECounty').setValue(this.getSelectedTestReqForm.district);
    this.POECountyFilteredOptions = this.clinicInfoPanelForm.get('POECounty').valueChanges.pipe(startWith(''), map(value => this.POECountyFilter(value)));
    console.log(this.POECountyFilteredOptions, 'POECountyFilteredOptions POECountyArray POECountyArray', this.POECountyArray, this.getSelectedTestReqForm.district, this.clinicInfoPanelForm.get('POECounty').value);
    let defaultSelectedCounty1 = this.POECountyArray.filter(item => item.district_name == this.getSelectedTestReqForm.district);
    if (defaultSelectedCounty1.length != 0) {
      this.POEArray = await this.CommonService.getFacilitiesList(defaultSelectedCounty1[0].district_id);
    }

    this.clinicInfoPanelForm.get('POE').setValue(this.getSelectedTestReqForm.facilityName);
    this.POEFilteredOptions = this.clinicInfoPanelForm.get('POE').valueChanges.pipe(startWith(''), map(value => this.POEFilter(value)));

    if (this.getSelectedTestReqForm.implementingPartner) {
      let filteredImpPartner = this.initArray['implementingPartnerList'].filter(item => item.value == this.getSelectedTestReqForm.implementingPartner);
      if (filteredImpPartner.length != 0) {
        this.implementingPartnerName = filteredImpPartner[0].show ? filteredImpPartner[0].show : '';
        this.clinicInfoPanelForm.get('implementingPartner').setValue(this.implementingPartnerName);
      }
    }

    if (this.getSelectedTestReqForm.fundingSource) {
      let filteredFundingSource = this.initArray['fundingSourceList'].filter(item => item.value == this.getSelectedTestReqForm.fundingSource);
      if (filteredFundingSource.length != 0) {
        this.fundingSource = filteredFundingSource[0].show ? filteredFundingSource[0].show : '';
      }
      this.clinicInfoPanelForm.get('fundingSource').setValue(this.fundingSource);

    }

    if (this.getSelectedTestReqForm.labId) {
      console.log('labId');
      let testingLabs = this.initArray['testingLabsList'].filter(item => item.value == this.getSelectedTestReqForm.labId);
      
      if (testingLabs.length != 0) {
        this.testingLab = testingLabs[0].show ? testingLabs[0].show : '';
        console.log('labId', this.testingLab);
      }
      this.labResultPanelForm.get('labName').setValue(this.testingLab);
    }


    this.patientInfoPanelForm.get('art_no').setValue(this.getSelectedTestReqForm.patientId ? this.getSelectedTestReqForm.patientId : "");
    this.patientInfoPanelForm.get('firstName').setValue(this.getSelectedTestReqForm.firstName ? this.getSelectedTestReqForm.firstName : "");
    // this.patientInfoPanelForm.get('lastName').setValue(this.getSelectedTestReqForm.lastName ? this.getSelectedTestReqForm.lastName : "");
    this.patientInfoPanelForm.get('dob').setValue(this.getSelectedTestReqForm.patientDob ? new Date(this.getSelectedTestReqForm.patientDob) : '');
    this.patientInfoPanelForm.get('ageInYears').setValue(this.getSelectedTestReqForm.patientAge ? this.getSelectedTestReqForm.patientAge : "");
    this.patientInfoPanelForm.get('ageInMonths').setValue(this.getSelectedTestReqForm.patientAgeinMonths ? this.getSelectedTestReqForm.patientAgeinMonths : "");
    this.patientInfoPanelForm.get('gender').setValue(this.getSelectedTestReqForm.patientGender ? this.getSelectedTestReqForm.patientGender : "");
    this.genderSelected = this.getSelectedTestReqForm.patientGender;
    this.patientInfoPanelForm.get('patientPhoneNo').setValue(this.getSelectedTestReqForm.patientPhoneNumber ? this.getSelectedTestReqForm.patientPhoneNumber : "");
    this.patientInfoPanelForm.get('patientConsent').setValue(this.getSelectedTestReqForm.patientConsent ? this.getSelectedTestReqForm.patientConsent : "");

    this.sampleInfoPanelForm.get('sampleCollectionDateTime').setValue(this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleCollectionDate)));
    this.sampleInfoPanelForm.get('sampleDispatchedOn').setValue(this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleDispatchedOn)));
    this.sampleInfoPanelForm.get('specimenType').setValue(this.getSelectedTestReqForm.specimenType);
    this.treatmentInfoPanelForm.get('doTreatmentInit').setValue(this.getSelectedTestReqForm.doTreatmentInit ? new Date(this.getSelectedTestReqForm.doTreatmentInit) : '');
    this.treatmentInfoPanelForm.get('currentRegimen').setValue(this.getSelectedTestReqForm.currentRegimen ? this.getSelectedTestReqForm.currentRegimen : "");
    this.treatmentInfoPanelForm.get('doInitCuurentRegimen').setValue(this.getSelectedTestReqForm.doInitCuurentRegimen ? new Date(this.getSelectedTestReqForm.doInitCuurentRegimen) : '');
    this.treatmentInfoPanelForm.get('arvAdherence').setValue(this.getSelectedTestReqForm.arvAdherence ? this.getSelectedTestReqForm.arvAdherence : "");
    this.treatmentInfoPanelForm.get('isPatientPregnant').setValue(this.getSelectedTestReqForm.isPatientPregnant ? this.getSelectedTestReqForm.isPatientPregnant : "");
    this.treatmentInfoPanelForm.get('isPatientBreastfeeding').setValue(this.getSelectedTestReqForm.isPatientBreastfeeding ? this.getSelectedTestReqForm.isPatientBreastfeeding : "");
    if (this.getSelectedTestReqForm.rtnDoViralLoadTest != '' && this.getSelectedTestReqForm.rtnDoViralLoadTest != null) {
      this.indication4VlTestingPanelForm.get('rtnDoViralLoadTest').setValue(this.getSelectedTestReqForm.rtnDoViralLoadTest ? new Date(this.getSelectedTestReqForm.rtnDoViralLoadTest) : '');
      this.indication4VlTestingPanelForm.get('rtnVlValue').setValue(this.getSelectedTestReqForm.rtnVlValue ? this.getSelectedTestReqForm.rtnVlValue : "");
      this.indication4VlTestingPanelForm.get('VLTesting').setValue(1);
      this.onItemChange();
    }
    if (this.getSelectedTestReqForm.rptDoViralLoadTest != '' && this.getSelectedTestReqForm.rptDoViralLoadTest != null) {
      this.indication4VlTestingPanelForm.get('rptDoViralLoadTest').setValue(this.getSelectedTestReqForm.rptDoViralLoadTest ? new Date(this.getSelectedTestReqForm.rptDoViralLoadTest) : '');
      this.indication4VlTestingPanelForm.get('rptVlValue').setValue(this.getSelectedTestReqForm.rptVlValue ? this.getSelectedTestReqForm.rptVlValue : "");
      this.indication4VlTestingPanelForm.get('VLTesting').setValue(10);
      this.onItemChange();
    }
    if (this.getSelectedTestReqForm.stfDoViralLoadTest != '' && this.getSelectedTestReqForm.stfDoViralLoadTest != null) {
      this.indication4VlTestingPanelForm.get('stfDoViralLoadTest').setValue(this.getSelectedTestReqForm.stfDoViralLoadTest ? new Date(this.getSelectedTestReqForm.stfDoViralLoadTest) : '');
      this.indication4VlTestingPanelForm.get('stfVlValue').setValue(this.getSelectedTestReqForm.stfVlValue ? this.getSelectedTestReqForm.stfVlValue : "");
      this.indication4VlTestingPanelForm.get('VLTesting').setValue(11);
      this.onItemChange();
    }


    this.indication4VlTestingPanelForm.get('requestClinician').setValue(this.getSelectedTestReqForm.requestClinician ? this.getSelectedTestReqForm.requestClinician : "");
    this.indication4VlTestingPanelForm.get('phoneNumber').setValue(this.getSelectedTestReqForm.phoneNumber ? this.getSelectedTestReqForm.phoneNumber : "");
    this.indication4VlTestingPanelForm.get('requestDate').setValue(this.getSelectedTestReqForm.requestDate ? new Date(this.getSelectedTestReqForm.requestDate) : '');

    // this.labResultPanelForm.get('labName').setValue(this.getSelectedTestReqForm.labName ? this.getSelectedTestReqForm.labName : "");
    this.labResultPanelForm.get('vlFocalPerson').setValue(this.getSelectedTestReqForm.vlFocalPerson ? this.getSelectedTestReqForm.vlFocalPerson : "");
    this.labResultPanelForm.get('vlFocalPhoneNo').setValue(this.getSelectedTestReqForm.vlFocalPhoneNo ? this.getSelectedTestReqForm.vlFocalPhoneNo : "");
    this.sampleInfoPanelForm.get('sampleReceivedDateTimeAtHub').setValue(this.getSelectedTestReqForm.sampleReceivedDateTimeAtHub ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleReceivedDateTimeAtHub)) : "");
    this.sampleInfoPanelForm.get('sampleReceivedDateTimeAtTestLab').setValue(this.getSelectedTestReqForm.sampleReceivedDateTimeAtTestLab ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleReceivedDateTimeAtTestLab)) : "");
    this.labResultPanelForm.get('sampleTestDate').setValue(this.getSelectedTestReqForm.sampleTestDate ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleTestDate)) : "");
    this.labResultPanelForm.get('vlTestPlatform').setValue(this.getSelectedTestReqForm.vlTestPlatform ? this.getSelectedTestReqForm.vlTestPlatform : "");
    this.labResultPanelForm.get('isSampleRejected').setValue(this.getSelectedTestReqForm.isSampleRejected ? this.getSelectedTestReqForm.isSampleRejected : "");

    if (this.getSelectedTestReqForm.isSampleRejected) {
      this.previousRejectedValue = this.getSelectedTestReqForm.isSampleRejected;
    }
    this.labResultPanelForm.get('resultValueHivDetection').setValue(this.getSelectedTestReqForm.resultValueHivDetection ? this.getSelectedTestReqForm.resultValueHivDetection : "");
    this.labResultPanelForm.get('rejectionReason').setValue(this.getSelectedTestReqForm.rejectionReason ? this.getSelectedTestReqForm.rejectionReason : "");
    this.onChangeRejectReason();
    // this.labResultPanelForm.get('reasonForChanging').setValue(this.getSelectedTestReqForm.reasonForChanging ? this.getSelectedTestReqForm.reasonForChanging : "");
    this.labResultPanelForm.get('dateResultDispatch').setValue(this.getSelectedTestReqForm.dateResultDispatch ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.dateResultDispatch)) : "");
    this.labResultPanelForm.get('rejectionDate').setValue(this.getSelectedTestReqForm.rejectionDate ? new Date(this.getSelectedTestReqForm.rejectionDate) : '');

    if (this.getSelectedTestReqForm.resultIn == 'Target Not Detected') {
      this.checkedT = true;
    }

    else if (this.getSelectedTestReqForm.resultIn == 'Below Detection Level') {
      this.checkedB = true;
      // this.labResultPanelForm.get('belowDetectionLevel').setValue(true);
      console.log('checkedB', this.checkedB);

    }
    else if (this.getSelectedTestReqForm.resultIn == null) {
      this.labResultPanelForm.get('isSampleRejected').setValue(this.getSelectedTestReqForm.isSampleRejected ? this.getSelectedTestReqForm.isSampleRejected : "");
    }
    else {
      this.labResultPanelForm.get('vlResult').setValue(this.getSelectedTestReqForm.vlResult ? this.getSelectedTestReqForm.vlResult : "");
      this.onChangeVl('vlResult');
    }

    let technicianLab = this.initArray['labTechniciansList'].filter(item => item.value == this.getSelectedTestReqForm.testedBy);
    if (technicianLab.length != 0) {
      this.technicianLab = technicianLab[0].show ? technicianLab[0].show : '';
    }
    this.labResultPanelForm.get('testedBy').setValue(this.technicianLab ? this.technicianLab : "");
    let approverLab = this.initArray['labTechniciansList'].filter(item => item.value == this.getSelectedTestReqForm.approvedBy);
    if (approverLab.length != 0) {
      this.approverLab = approverLab[0].show ? approverLab[0].show : '';
    }
    let reviewerLab = this.initArray['labTechniciansList'].filter(item => item.value == this.getSelectedTestReqForm.reviewedBy);
    if (reviewerLab.length != 0) {
      this.reviewerLab = reviewerLab[0].show ? reviewerLab[0].show : '';
    }
    console.log(reviewerLab)
    this.labResultPanelForm.get('approvedBy').setValue(this.approverLab ? this.approverLab : "");
    this.labResultPanelForm.get('reviewedBy').setValue(this.reviewerLab ? this.reviewerLab : "");
    this.labResultPanelForm.get('approvedOn').setValue(this.getSelectedTestReqForm.approvedOn ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.approvedOn)) : "");
    this.labResultPanelForm.get('reviewedOn').setValue(this.getSelectedTestReqForm.reviewedOn ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.reviewedOn)) : "");
    this.labResultPanelForm.get('labTechComments').setValue(this.getSelectedTestReqForm.labTechComments ? this.getSelectedTestReqForm.labTechComments : "");
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
  //   console.log(selectedCounty[0].province_id);
  //   let POECountyDupArray = await this.CommonService.getDistrictList(selectedCounty[0].province_id);

  //   this.POECountyArray = [...new Set(POECountyDupArray.map(({ district_id }) => district_id))].map(e => POECountyDupArray.find(({ district_id }) => district_id == e));
  //   console.log(this.POECountyArray, this.provinceListArray);

  //   this.POECountyFilteredOptions = this.clinicInfoPanelForm.get('POECounty').valueChanges.pipe(startWith(''), map(value => this.POECountyFilter(value)));
  //   this.POECountyFilteredOptions.subscribe(val => console.log(val, 'POE County Filtered Options'));
  // }

  // async onChangePOECounty($event) {

  //   console.log($event.option.value, $event.option.id, 'onChangePOECounty $event', this.POECountyArray);
  //   this.clinicInfoPanelForm.get('POE').setValue('');
  //   let selectedCountyName = this.POECountyArray.filter(item => item.district_name == $event.option.value);
  //   let selectedCountyId = this.POECountyArray.filter(item => item.district_id == $event.option.id);
  //   console.log(selectedCountyId, 'selectedCountyName', selectedCountyName);
  //   this.POEArray = await this.CommonService.getFacilitiesList(selectedCountyId[0].district_id);

  //   this.POEFilteredOptions = this.clinicInfoPanelForm.get('POE').valueChanges.pipe(startWith(''), map(value => this.POEFilter(value)));

  // }

  */


  async getInitArray() {

    this.initArray = await this.storage.get("initArray");
    this.vlInitArray = this.initArray.vl;
    this.userList = this.initArray.userList;
    this.provinceListArray = await this.CommonService.getProvinceList();
    console.group(this.provinceListArray, 'this.provinceListArray');
    this.POEStateFilteredOptions = this.clinicInfoPanelForm.get('POEState').valueChanges.pipe(startWith(''), map(value => this.POEStateFilter(value)));
    console.log(this.POEStateFilteredOptions, 'POEStateFilteredOptions POEStateFilteredOptions');
    this.implementPartnerFilteredOptions = this.clinicInfoPanelForm.get('implementingPartner').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.implementPartnerFilter(value))
      );
    this.fundingSourceFilteredOptions = this.clinicInfoPanelForm.get('fundingSource').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.fundingSourceFilter(value))
      );
    // this.testingLabFilteredOptions = this.clinicInfoPanelForm.get('testingLab').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value =>
    //       this.testingLabFilter(value))
    //   );
    this.testPlatformListFilteredOptions = this.labResultPanelForm.get('vlTestPlatform').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.testPlatformListFilter(value))
      );


    this.testedByFilteredOptions = this.labResultPanelForm.get('testedBy').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.labTechnicianFilter(value))
      );

    this.requestClinicianFilteredOptions = this.indication4VlTestingPanelForm.get('requestClinician').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.requestClinicianFilter(value))
      );
      
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
    this.router.navigate(['select-patient-details-vl',
      {
        'data': this.patientInfoPanelForm.get('search').value
      }
    ]);

  }

  // calAge() {
  //   this.sharedService.calculateAged(this.patientInfoPanelForm);
  // }

  // calAge() {
  //   const convertAge = new Date(this.patientInfoPanelForm.controls.dob.value);
  //   const timeDiff = Math.abs(Date.now() - convertAge.getTime());
  //   this.patientInfoPanelForm.get('ageInYears').setValue(Math.floor((timeDiff / (1000 * 3600 * 24)) / 365));
  //   console.log(this.patientInfoPanelForm.controls.ageInYears.value, 'ageInYears');
  //   if (this.patientInfoPanelForm.controls.ageInYears.value < 1) {  
  //     const convertAge = new Date(this.patientInfoPanelForm.controls.dob.value);
  //     const timeDiff = Math.abs(Date.now() - convertAge.getTime());
  //     this.patientInfoPanelForm.get('ageInMonths').setValue(Math.floor((timeDiff / (1000 * 3600 * 24)) / 30));
  //   }
  //   this.maxSampleCollectionDate = convertAge;
  //   var month = this.formatDate(this.maxSampleCollectionDate.getMonth() + 1);
  //   var day = this.formatDate(this.maxSampleCollectionDate.getDate());
  //   this.maxSampleCollectionDate = this.maxSampleCollectionDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
  //   console.log(this.maxSampleCollectionDate, 'maxSampleCollectionDate');
  // }

  calAge() {
    const dob = this.patientInfoPanelForm.controls.dob.value;
    
    if (!dob) {
      return;
    }
    
    const convertAge = new Date(dob);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    const ageInYears = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
    
    // Set ageInYears to null if less than 1 year
    if (ageInYears < 1) {
      this.patientInfoPanelForm.get('ageInYears').setValue(null);
  
      // Calculate and set ageInMonths only if ageInYears is less than 1
      const ageInMonths = Math.floor((timeDiff / (1000 * 3600 * 24)) / 30);
      this.patientInfoPanelForm.get('ageInMonths').setValue(ageInMonths);
      console.log(ageInMonths, 'ageInMonths');
    } else {
      this.patientInfoPanelForm.get('ageInYears').setValue(ageInYears);
      this.patientInfoPanelForm.get('ageInMonths').setValue(null); // Clear ageInMonths if ageInYears is 1 or more
      console.log(ageInYears, 'ageInYears');
    }
    
    this.maxSampleCollectionDate = convertAge;
    const month = this.formatDate(this.maxSampleCollectionDate.getMonth() + 1);
    const day = this.formatDate(this.maxSampleCollectionDate.getDate());
    this.maxSampleCollectionDate = `${this.maxSampleCollectionDate.getFullYear()}-${month}-${day}T00:00`;
    console.log(this.maxSampleCollectionDate, 'maxSampleCollectionDate');
  }
  

  //mat auto complete filters start


  POEStateFilter(val: string): string[] {
    console.log(val, 'StateFilter');
    return this.provinceListArray.map(x => x.province_name).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  POECountyFilter(val: string): string[] {
    console.log(val, 'CountyFilter', this.POECountyArray);
    return this.POECountyArray.map(({ district_name, district_id }) => ({ district_name, district_id })).filter(option => option.district_name.toLowerCase().includes(val.toLowerCase()));
    // return [...new Set(this.POECountyArray.map(({ district_id }) => district_id))].map(e => this.POECountyArray.find(({ district_id }) => district_id == e));
    // return this.POECountyArray.map(x => {x.district_name}).filter(option => option?.toLowerCase().includes(val.toLowerCase()));
  }

  POEFilter(val: string): string[] {
    console.log(val, 'POEFilter');
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

  requestClinicianFilter(val: string): string[] {
    return this.initArray['userList'].map(x => x.user_name).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  //mat auto complete filters end

  nextStepClinicInfo(isClinicInfoFormValid) {
    if (isClinicInfoFormValid) {
      this.step = 1;
    }
  }

  nextStepPatientInfo(isisPatientInfoPanelFormValid) {
    if (isisPatientInfoPanelFormValid) {
      this.step = 2;
    }
  }

  nextStepSampleInfo(ischildMotherHealthDetailsFormValid) {
    if (ischildMotherHealthDetailsFormValid) {
      this.step = 3;
    }
  }
  
  nextStepTreatmentInfo(isTreatmentInfoPanelFormValid) {
    console.log(isTreatmentInfoPanelFormValid, 'isTreatmentInfoPanelFormValid');
    if (isTreatmentInfoPanelFormValid) {
      this.step = 4;
      this.cdr.detectChanges();
    }
  }
  nextStepIndication4VlTestingPanel(isSampleInfoPanelFormValid) {
    if (isSampleInfoPanelFormValid) {
      this.step = 5;
    }
    console.log(isSampleInfoPanelFormValid, 'isSampleInfoPanelFormValid', this.indication4VlTestingPanelForm.controls.VLTesting.hasError('required'), this.isVisible == 0, this.isVisible == 1, this.isVisible == 2);
  }
  goToViewResult() {
    this.step = 6;
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

  async saveVlAddSouthSudanForm(isClinicInfoFormValid, isPatientInfoPanelFormValid, isSampleInfoPanelFormValid, isTreatmentInfoPanelFormValid, isIndication4VlTestingPanelFormValid, isLabResultFormValid, isAddOrUpdate) {

    console.log('test', isClinicInfoFormValid, isPatientInfoPanelFormValid, isSampleInfoPanelFormValid, isTreatmentInfoPanelFormValid, isIndication4VlTestingPanelFormValid, isLabResultFormValid, isAddOrUpdate);

    if (!isClinicInfoFormValid) {
      this.step = 0;

      for (let inner in this.clinicInfoPanelForm.controls) {
        this.clinicInfoPanelForm.get(inner).markAsTouched();
        this.clinicInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.patientInfoPanelForm.controls) {
        this.patientInfoPanelForm.get(inner).markAsTouched();
        this.patientInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.sampleInfoPanelForm.controls) {
        this.sampleInfoPanelForm.get(inner).markAsTouched();
        this.sampleInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.treatmentInfoPanelForm.controls) {
        this.treatmentInfoPanelForm.get(inner).markAsTouched();
        this.treatmentInfoPanelForm.get(inner).updateValueAndValidity();
      }
      // indication4VlTestingPanelForm
      for (let inner in this.indication4VlTestingPanelForm.controls) {
        this.indication4VlTestingPanelForm.get(inner).markAsTouched();
        this.indication4VlTestingPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (!isPatientInfoPanelFormValid) {
      this.step = 1;
      for (let inner in this.patientInfoPanelForm.controls) {
        this.patientInfoPanelForm.get(inner).markAsTouched();
        this.patientInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.sampleInfoPanelForm.controls) {
        this.sampleInfoPanelForm.get(inner).markAsTouched();
        this.sampleInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.treatmentInfoPanelForm.controls) {
        this.treatmentInfoPanelForm.get(inner).markAsTouched();
        this.treatmentInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.indication4VlTestingPanelForm.controls) {
        this.indication4VlTestingPanelForm.get(inner).markAsTouched();
        this.indication4VlTestingPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (!isSampleInfoPanelFormValid) {
      this.step = 2;
      for (let inner in this.sampleInfoPanelForm.controls) {
        this.sampleInfoPanelForm.get(inner).markAsTouched();
        this.sampleInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.treatmentInfoPanelForm.controls) {
        this.treatmentInfoPanelForm.get(inner).markAsTouched();
        this.treatmentInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.indication4VlTestingPanelForm.controls) {
        this.indication4VlTestingPanelForm.get(inner).markAsTouched();
        this.indication4VlTestingPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (!isTreatmentInfoPanelFormValid) {
      this.step = 3;
      for (let inner in this.treatmentInfoPanelForm.controls) {
        this.treatmentInfoPanelForm.get(inner).markAsTouched();
        this.treatmentInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.indication4VlTestingPanelForm.controls) {
        this.indication4VlTestingPanelForm.get(inner).markAsTouched();
        this.indication4VlTestingPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (!isIndication4VlTestingPanelFormValid) {
      this.step = 4;
      for (let inner in this.treatmentInfoPanelForm.controls) {
        this.treatmentInfoPanelForm.get(inner).markAsTouched();
        this.treatmentInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.indication4VlTestingPanelForm.controls) {
        this.indication4VlTestingPanelForm.get(inner).markAsTouched();
        this.indication4VlTestingPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (this.isTestingUser == 'no') {
      this.step = 4;
      isLabResultFormValid = true;
    } else if (this.isTestingUser == 'yes') {

      if (!isIndication4VlTestingPanelFormValid) {
        this.step = 4;
        for (let inner in this.indication4VlTestingPanelForm.controls) {
          this.indication4VlTestingPanelForm.get(inner).markAsTouched();
          this.indication4VlTestingPanelForm.get(inner).updateValueAndValidity();
        }
      } else {
        this.step = 5;
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

    if (isClinicInfoFormValid && isPatientInfoPanelFormValid && isSampleInfoPanelFormValid && isTreatmentInfoPanelFormValid && isIndication4VlTestingPanelFormValid && isLabResultFormValid) {
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
          // split("000");id
          // count = parseInt(parts) + 1;

        }

        var currentDate = new Date();
        var offTestReqID;
        // offTestReqID = 'AVL';
        // offTestReqID += currentDate.getFullYear().toString(); // 2011
        // offTestReqID += (currentDate.getMonth() + 1 < 9 ? '0' : '') + (currentDate.getMonth() + 1).toString(); // JS months are 0-based, so +1 and pad with 0's
        // offTestReqID += ('000' + count.toString()).slice(-4);

        // offTestReqID += (currentDate.getFullYear().toString()).slice(2); // 2011
        // offTestReqID += (currentDate.getMonth() + 1 < 9 ? '0' : '') + (currentDate.getMonth() + 1).toString(); // JS months are 0-based, so +1 and pad with 0's AEID2021120001 AEID2112290003
        // offTestReqID += (currentDate.getDate() + 1 < 9 ? '0' : '') + (currentDate.getDate()).toString();
        // offTestReqID += (currentDate.getHours() + 1 < 9 ? '0' : '') + (currentDate.getHours()).toString();
        // offTestReqID += ('000' + count.toString()).slice(-4);

        // to resolve sqlite3_step failure: UNIQUE constraint failed: eid.app_sample_code issue
        // i used same code as in covid form
        // by mohan kumar thangaraj
        offTestReqID = 'AVL';
        offTestReqID += Math.random().toString(36).slice(2, 4).toUpperCase();
        offTestReqID += (currentDate.getFullYear().toString()).slice(-2);
        offTestReqID += ('0' + (currentDate.getMonth() + 1)).slice(-2);
        offTestReqID += ('000' + count.toString()).slice(-4);
        console.log(offTestReqID, 'offTestReqID offTestReqID');
        this.createdOn = this.dateTimeFormat(new Date);
        this.isSynced = false;
        this.uniqueID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      } else {
        this.updatedOn = this.dateTimeFormat(new Date);
        offTestReqID = this.appSampleCode;
        this.isSynced = false;
      }

      let filteredPOEState = this.provinceListArray.filter(item => item.province_name == this.clinicInfoPanelForm.controls.POEState.value);
      if (filteredPOEState.length != 0) {
        this.provinceID = filteredPOEState[0] ? filteredPOEState[0].province_id : '';
      }
      // let filteredPOECounty = this.POECountyArray.filter(item => item.district_name == this.clinicInfoPanelForm.controls.POECounty.value);
      // console.log(filteredPOECounty, 
      //   this.clinicInfoPanelForm.controls.POECounty.value, 
      //   this.POECountyArray, 
      //   'this.POECountyArray test');
      // if (filteredPOECounty.length != 0) {
      //   this.districtID = filteredPOECounty[0].district_id ? filteredPOECounty[0].district_id : '';
      // }
      this.districtID = this.districtdata;
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

      console.log(this.clinicInfoPanelForm.controls.POEState.value, 'provinceArray and POEState', filteredPOEState);
      // console.log(this.clinicInfoPanelForm.controls.POECounty.value, 'POEcountyArray', filteredPOECounty);
      console.log(this.clinicInfoPanelForm.controls.POE.value, 'POEArray');
      console.log(this.provinceID, this.districtID, this.facilityId, 'FinalSaveID');


      let filteredImpPartner = this.initArray['implementingPartnerList'].filter(item => item.show == this.clinicInfoPanelForm.controls.implementingPartner.value);
      if (filteredImpPartner.length != 0) {
        this.implementingPartnerID = filteredImpPartner[0] ? filteredImpPartner[0].value : '';
      }

      let filteredFundingSource = this.initArray['fundingSourceList'].filter(item => item.show == this.clinicInfoPanelForm.controls.fundingSource.value);
      if (filteredFundingSource.length != 0) {
        this.fundingSourceID = filteredFundingSource[0] ? filteredFundingSource[0].value : '';
      }


      let filteredTestLabRecord = this.initArray['testingLabsList'].filter(item =>
        item.show == this.labResultPanelForm.controls.labName.value);
      this.labId = filteredTestLabRecord[0] ? filteredTestLabRecord[0].value : '';
      this.labName = this.labResultPanelForm.controls.labName.value;


      let filteredTestedByRecord = this.initArray['labTechniciansList'].filter(item => item.show == this.labResultPanelForm.controls.testedBy.value);
      if (filteredTestedByRecord.length != 0) {
        this.testedByID = filteredTestedByRecord[0] ? filteredTestedByRecord[0].value : '';
      }
      let filteredApprovedByRecord = this.initArray['labTechniciansList'].filter(item => item.show == this.labResultPanelForm.controls.approvedBy.value);
      if (filteredApprovedByRecord.length != 0) {
        this.approvedByID = filteredApprovedByRecord[0] ? filteredApprovedByRecord[0].value : '';
        console.log(this.approvedByID)
      }

      let filteredReviewedByRecord1 = this.initArray['labTechniciansList'].filter(item => item.show == this.labResultPanelForm.controls.reviewedBy.value);
      if (filteredReviewedByRecord1.length != 0) {
        this.reviewedByID = filteredReviewedByRecord1[0] ? filteredReviewedByRecord1[0].value : '';
        console.log(this.reviewedByID)
      }

      if (this.indication4VlTestingPanelForm.get('VLTesting').value == 1) {
        this.indication4VlTestingPanelForm.get('rptDoViralLoadTest').setValue('');
        this.indication4VlTestingPanelForm.get('rptVlValue').setValue('');

        this.indication4VlTestingPanelForm.get('stfDoViralLoadTest').setValue('');
        this.indication4VlTestingPanelForm.get('stfVlValue').setValue('');
      }

      else if (this.indication4VlTestingPanelForm.get('VLTesting').value == 10) {
        this.indication4VlTestingPanelForm.get('rtnDoViralLoadTest').setValue('');
        this.indication4VlTestingPanelForm.get('rtnVlValue').setValue('');

        this.indication4VlTestingPanelForm.get('stfDoViralLoadTest').setValue('');
        this.indication4VlTestingPanelForm.get('stfVlValue').setValue('');
      }
      else if (this.indication4VlTestingPanelForm.get('VLTesting').value == 11) {

        this.indication4VlTestingPanelForm.get('rtnDoViralLoadTest').setValue('');
        this.indication4VlTestingPanelForm.get('rtnVlValue').setValue('');

        this.indication4VlTestingPanelForm.get('rptDoViralLoadTest').setValue('');
        this.indication4VlTestingPanelForm.get('rptVlValue').setValue('');
      }

      if (this.labResultPanelForm.controls.isSampleRejected.value == 'yes') {
        this.labResultPanelForm.get('vlResult').setValue('');
        this.labResultPanelForm.get('vlLog').setValue('');
        this.result = null;
      }
      // else if (this.checkedT == true) {
      //   this.result = 'Target Not Detected';
      // }
      else if (this.checkedB == true) {
        this.result = 'Below Detection Level';
      }
      else {
        this.result = this.labResultPanelForm.controls.vlResult.value;
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

        "sampleReordered": this.sampleReordered,
        "communitySample": this.clinicInfoPanelForm.controls.CommunitySample.value,
        "provinceName": this.clinicInfoPanelForm.controls.POEState.value,
        "provinceId": this.provinceID,
        "district": this.clinicInfoPanelForm.controls.POECounty.value,
        "districtId": this.districtID,
        "facilityName": this.clinicInfoPanelForm.controls.POE.value,
        "facilityId": this.facilityId,
        "implementingPartner": this.implementingPartnerID ? this.implementingPartnerID : '',
        "implementingPartnerName": this.clinicInfoPanelForm.controls.implementingPartner.value,
        "fundingSource": this.fundingSourceID ? this.fundingSourceID : "",
        //fundingSourceName in getRequest
        "labId": this.labId,

        "art_no": this.patientInfoPanelForm.controls.art_no.value,
        "firstName": this.patientInfoPanelForm.controls.firstName.value,
        "lastName": '',
        "dob": this.patientInfoPanelForm.controls.dob.value ? this.dateFormat(new Date(this.patientInfoPanelForm.controls.dob.value)) : '',
        "ageInYears": this.patientInfoPanelForm.controls.ageInYears.value,
        "ageInMonths": this.patientInfoPanelForm.controls.ageInMonths.value,
        "gender": this.patientInfoPanelForm.controls.gender.value,
        "patientConsent": this.patientInfoPanelForm.controls.patientConsent.value,
        "patientPhoneNo": this.patientInfoPanelForm.controls.patientPhoneNo.value,

        "sampleCollectionDateTime": this.sampleInfoPanelForm.controls.sampleCollectionDateTime.value ? this.dateTimeFormat(new Date(this.sampleInfoPanelForm.controls.sampleCollectionDateTime.value)) : '',
        "sampleDispatchedOn": this.sampleInfoPanelForm.controls.sampleDispatchedOn.value ? this.dateTimeFormat(new Date(this.sampleInfoPanelForm.controls.sampleDispatchedOn.value)) : '',
        "specimenType": this.sampleInfoPanelForm.controls.specimenType.value,

        "doTreatmentInit": this.treatmentInfoPanelForm.controls.doTreatmentInit.value ? this.dateFormat(new Date(this.treatmentInfoPanelForm.controls.doTreatmentInit.value)) : '',
        "currentRegimen": this.treatmentInfoPanelForm.controls.currentRegimen.value,
        "doInitCuurentRegimen": this.treatmentInfoPanelForm.controls.doInitCuurentRegimen.value ? this.dateFormat(new Date(this.treatmentInfoPanelForm.controls.doInitCuurentRegimen.value)) : '',
        "arvAdherence": this.treatmentInfoPanelForm.controls.arvAdherence.value,
        "isPatientPregnant": this.treatmentInfoPanelForm.controls.isPatientPregnant.value,
        "isPatientBreastfeeding": this.treatmentInfoPanelForm.controls.isPatientBreastfeeding.value,

        "vlTestReason": this.indication4VlTestingPanelForm.controls.VLTesting.value,
        "rtnDoViralLoadTest": this.indication4VlTestingPanelForm.controls.rtnDoViralLoadTest.value ? this.dateFormat(new Date(this.indication4VlTestingPanelForm.controls.rtnDoViralLoadTest.value)) : '',
        "rtnVlValue": this.indication4VlTestingPanelForm.controls.rtnVlValue.value,
        "rptDoViralLoadTest": this.indication4VlTestingPanelForm.controls.rptDoViralLoadTest.value ? this.dateFormat(new Date(this.indication4VlTestingPanelForm.controls.rptDoViralLoadTest.value)) : '',
        "rptVlValue": this.indication4VlTestingPanelForm.controls.rptVlValue.value,
        "stfDoViralLoadTest": this.indication4VlTestingPanelForm.controls.stfDoViralLoadTest.value ? this.dateFormat(new Date(this.indication4VlTestingPanelForm.controls.stfDoViralLoadTest.value)) : '',
        "stfVlValue": this.indication4VlTestingPanelForm.controls.stfVlValue.value,
        "requestClinician": this.indication4VlTestingPanelForm.controls.requestClinician.value,
        "phoneNumber": this.indication4VlTestingPanelForm.controls.phoneNumber.value,
        "requestDate": this.indication4VlTestingPanelForm.controls.requestDate.value ? this.dateFormat(new Date(this.indication4VlTestingPanelForm.controls.requestDate.value)) : '',


        "labName": this.labResultPanelForm.controls.labName.value,
        "vlFocalPerson": this.labResultPanelForm.controls.vlFocalPerson.value,
        "vlFocalPhoneNo": this.labResultPanelForm.controls.vlFocalPhoneNo.value,
        "sampleReceivedDateTimeAtHub": this.sampleInfoPanelForm.controls.sampleReceivedDateTimeAtHub.value ? this.dateTimeFormat(new Date(this.sampleInfoPanelForm.controls.sampleReceivedDateTimeAtHub.value)) : '',
        "sampleReceivedDateTimeAtTestLab": this.sampleInfoPanelForm.controls.sampleReceivedDateTimeAtTestLab.value ? this.dateTimeFormat(new Date(this.sampleInfoPanelForm.controls.sampleReceivedDateTimeAtTestLab.value)) : '',
        "sampleTestDate": this.labResultPanelForm.controls.sampleTestDate.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.sampleTestDate.value)) : '',
        "vlTestPlatform": this.labResultPanelForm.controls.vlTestPlatform.value,
        "isSampleRejected": this.labResultPanelForm.controls.isSampleRejected.value,
        "resultValueHivDetection": this.labResultPanelForm.controls.resultValueHivDetection.value,
        "rejectionReason": this.rejectionReason ? this.rejectionReason : '',
        "rejectionReasonid": this.rejectionReasonId ? this.rejectionReasonId : '',

        "vlResult": this.labResultPanelForm.controls.vlResult.value ? this.labResultPanelForm.controls.vlResult.value : '',
        "resultIn": this.result ? this.result : '',
        "vlLog": this.labResultPanelForm.controls.vlLog.value ? this.labResultPanelForm.controls.vlLog.value : '',
        "rejectionDate": this.labResultPanelForm.controls.rejectionDate.value ? this.dateFormat(new Date(this.labResultPanelForm.controls.rejectionDate.value)) : '',
        "reasonForChanging": this.reasonArray,
        // "reasonForChanging": this.labResultPanelForm.controls.reasonForChanging.value ? this.labResultPanelForm.controls.reasonForChanging.value : '',
        "dateResultDispatch": this.labResultPanelForm.controls.dateResultDispatch.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.dateResultDispatch.value)) : '',
        "testedBy": this.testedByID ? this.testedByID : '',
        "approvedBy": this.approvedByID ? this.approvedByID : '',
        "approvedOn": this.labResultPanelForm.controls.approvedOn.value ? this.dateFormat(new Date(this.labResultPanelForm.controls.approvedOn.value)) : '',
        "reviewedBy": this.reviewedByID ? this.reviewedByID : '',
        "reviewedOn": this.labResultPanelForm.controls.reviewedOn.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.reviewedOn.value)) : '',
        "labTechComments": this.labResultPanelForm.controls.labTechComments.value ? this.labResultPanelForm.controls.labTechComments.value : '',

        "dateDispatchedFromClinicToLab": '',
        "dateOfDemand": '',
        "hasChangedRegimen": '',
        "viralLoadNo": '',
        "isPatientNew": '',
        "lastViralLoadTestDate": '',
        "lastViralLoadResult": '',
        "reasonForArvRegimenChange": '',
        "dateOfArvRegimenChange": '',
        // "approvedBy":'',
        // "reviewedBy": '',
        // "reviewedOn": '',
        "statusIn": '',
        "serialNo": '',
        "trimester": '',

      }



      // this.localTestRequestFormService.offlineStoreShipmentForm(saveVlSSJSON, isAddOrUpdate);

      console.log(saveVlSSJSON, 'savevlJson');
      this.db.insertVlData(saveVlSSJSON, isAddOrUpdate);

      if (this.mode == undefined) {
        for (let inner in this.clinicInfoPanelForm.controls) {
          this.clinicInfoPanelForm.get(inner).setValue('');
          this.clinicInfoPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.patientInfoPanelForm.controls) {
          this.patientInfoPanelForm.get(inner).setValue('');
          this.patientInfoPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.sampleInfoPanelForm.controls) {
          this.sampleInfoPanelForm.get(inner).setValue('');
          this.sampleInfoPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.treatmentInfoPanelForm.controls) {
          this.treatmentInfoPanelForm.get(inner).setValue('');
          this.treatmentInfoPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.indication4VlTestingPanelForm.controls) {
          this.indication4VlTestingPanelForm.get(inner).setValue('');
          this.indication4VlTestingPanelForm.get(inner).setErrors(null);
        }
      }

    }
  }

  forCons() {
    console.log(this.labResultPanelForm.controls.vlTestPlatform.value, 'vlTestPlatform');
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
    },
    {
      "name": "Not Recorded",
      "value": "notrecorded"
    }
    ]
    this.PatientConsent = [{
      "name": "Yes",
      "value": "yes"
    },
    {
      "name": "No",
      "value": "no"
    }
    ]
    this.communitySample = [{
      "name": "Yes",
      "value": "yes"
    },
    {
      "name": "No",
      "value": "no"
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
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  prevStep() {
    this.step--;
  }

  clearDOB(field) {
    if (field == 'dob') {
      this.patientInfoPanelForm.get('dob').setValue('');
      this.patientInfoPanelForm.get('ageInYears').setValue('');
      this.patientInfoPanelForm.get('ageInMonths').setValue('');
    }
    else if (field == 'doTreatmentInit') {
      this.treatmentInfoPanelForm.get('doTreatmentInit').setValue('');
    }
  }

  clearSampleCollection() {
    this.sampleInfoPanelForm.get('sampleCollectionDateTime').setValue('');
  }
  // clearsampleDispatchedOn() {
  //   this.sampleInfoPanelForm.get('sampleDispatchedOn').setValue('');
  // }

  clearSampleCollections() {
    this.sampleInfoPanelForm.get('dateResultDispatch').setValue('');
  }

  clearSampleDispatchedOn() {
    this.sampleInfoPanelForm.get('sampleDispatchedOn').setValue('');
  }

  clearSampleReceived() {
    this.sampleInfoPanelForm.get('sampleReceivedDateTimeAtTestLab').setValue('');
  }

  clearRejection() {
    this.labResultPanelForm.get('rejectionDate').setValue('');
  }

  clearDateOfTesting() {
    this.labResultPanelForm.get('sampleTestDate').setValue('');
  }


  clearReviewedByOn(){
    this.sharedService.clearReviewedByOn();
  }

  // clearReviewedByOn() {
  //   this.labResultPanelForm.get('reviewedOn').setValue('');
  // }

  goBack() {

    var routerSplitURL = this.router.url.split(';');
    if ((this.router.url === '/add-new-request' && (this.clinicInfoPanelForm.dirty || this.patientInfoPanelForm.dirty || this.treatmentInfoPanelForm.dirty || this.labResultPanelForm.dirty)) ||
      (routerSplitURL[1] == 'data_mode=edit' && (this.clinicInfoPanelForm.dirty || this.patientInfoPanelForm.dirty || this.treatmentInfoPanelForm.dirty || this.labResultPanelForm.dirty))) {

      this.alertService.confirmAlert('VLSM', "Are you sure you want to go back? Because the data you have entered will be lost", 'addEditForm');

    } else {
      this.router.navigate([this.previousPageURL], {
        replaceUrl: true
      });
    }
  }
  setMaxDatetime() {
    const now = new Date();
    this.maxDatetime = now.toISOString().slice(0, 16);
  }


  private formatDate(nmbr: number): string {
    var date = nmbr + "";
    date = (date.length < 2) ? "0" + date : date;
    return date;
  }



  // formatDate(value: number): string {
  //   return value < 10 ? '0' + value : value.toString();
  // }

  onItemChange() {
    console.log(this.indication4VlTestingPanelForm.get('VLTesting').value, 'indication4VlTestingPanelForm.get().value');
    this.isVisible = this.indication4VlTestingPanelForm.get('VLTesting').value;
  }

  isOptionDisabled(): boolean{
    return this.mode === 'view' || this.mode === 'result edit';
  }

  isOptionDisableds(): boolean{
    return this.mode === 'view' ;
  }

  onClinicianSelected($event): void {
    const selectedUser = this.initArray.userList.find(user => user.user_name === $event.option.value);
    if (selectedUser) {
      this.indication4VlTestingPanelForm.get('phoneNumber')?.setValue(selectedUser.phone_number || '');
    }
  }

  /* Natesh
  // onChangeTarget() {

  //   if (this.checkedT == false) {
  //     this.checkedT = true;
  //     this.labResultPanelForm.get('vlResult').setValue('');
  //     this.labResultPanelForm.get('vlLog').setValue('');

  //   }
  //   else {
  //     this.checkedT = false;
  //   }
  //   console.log('checkedT', this.checkedT);
  // }
  */

  onChangeBelow() {

    if (this.checkedB == false) {
      this.checkedB = true;
      this.labResultPanelForm.get('vlResult').setValue('');
      this.labResultPanelForm.get('vlLog').setValue('');

    }
    else {
      this.checkedB = false;
    }
    console.log('onChangeBelow', this.checkedB);
  }
  onChangeVl(objId) {
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
      var logValue = this.labResultPanelForm.get('vlLog').value;
      if (logValue != '' && logValue != 0 && !isNaN(logValue)) {
        this.absVal = Math.round(Math.pow(10, logValue) * 100) / 100;
        console.log(this.absVal, 'this.absVal');
        if (this.absVal != 'Infinity') {
          var logValue1 = (Math.round(Math.pow(10, logValue) * 100) / 100);
          this.labResultPanelForm.get('vlResult').setValue((logValue1).toFixed());
          console.log(this.labResultPanelForm.get('vlResult'), 'vlResult');
        }
      } else {
        this.labResultPanelForm.get('vlResult').setValue('');
      }
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
  

  onChangeReordered() {
    if (this.sampleReordered == false) {
      this.sampleReordered = true;
    }
    else {
      this.sampleReordered = false;
    }
    console.log('sampleReordered', this.sampleReordered);
    console.log(this.clinicInfoPanelForm.controls.sampleReordered.value, 'sampleReordered');
  }

  minSampleDispatchedDate: string;
  
  onSampleCollectionDateChange() {
    const sampleCollectionDate = this.sampleInfoPanelForm.controls.sampleCollectionDateTime.value;

    if (sampleCollectionDate) {
      const nextDay = new Date(sampleCollectionDate);
      nextDay.setDate(nextDay.getDate()); // Add one day

      // Format the next day date as YYYY-MM-DDTHH:MM
      this.minSampleDispatchedDate = nextDay.toISOString().slice(0, 16);
      console.log(this.minSampleDispatchedDate, 'Updated minSampleDispatchedDate');
    }
  }

  setInitialMinSampleDispatchedDate() {
    const initialSampleCollectionDate = this.sampleInfoPanelForm.controls.sampleCollectionDateTime.value;

    if (initialSampleCollectionDate) {
      const nextDay = new Date(initialSampleCollectionDate);
      nextDay.setDate(nextDay.getDate());

      // Format the next day date as YYYY-MM-DDTHH:MM
      this.minSampleDispatchedDate = nextDay.toISOString().slice(0, 16);
      console.log(this.minSampleDispatchedDate, 'Initial minSampleDispatchedDate');
    }
  }

  setMaxSampleReceivedHubDate() {
    const sampleCollectionDate = this.sampleInfoPanelForm.controls.sampleCollectionDateTime.value;

    if (sampleCollectionDate) {
      const sampleCollectionDateTime = new Date(sampleCollectionDate);
      const month = this.formatDate(sampleCollectionDateTime.getMonth() + 1);
      const day = this.formatDate(sampleCollectionDateTime.getDate());
      this.maxSampleReceivedHubDate = sampleCollectionDateTime.getFullYear() + "-" + month + "-" + day + "T00:00";
      console.log(this.maxSampleReceivedHubDate, 'setMaxSampleReceivedHubDate');
    }
  }

  setMaxSampleDispatchedHubDate() {
    const sampleDispatchedOn = this.sampleInfoPanelForm.controls.sampleDispatchedOn.value;

    if (sampleDispatchedOn) {
      const sampleDispatchedDateTime = new Date(sampleDispatchedOn);
      const month = this.formatDate(sampleDispatchedDateTime.getMonth() + 1);
      const day = this.formatDate(sampleDispatchedDateTime.getDate());
      this.maxSampleReceivedHubDate = sampleDispatchedDateTime.getFullYear() + "-" + month + "-" + day + "T00:00";
      console.log(this.maxSampleReceivedHubDate, 'setMaxSampleDispatchedHubDate');
    }
  }

  
  // setMaxSampleReceivedHubDate() {
  //   this.maxSampleReceivedHubDate = new Date(this.sampleInfoPanelForm.controls.sampleCollectionDateTime.value);
  //   var month = this.formatDate(this.maxSampleReceivedHubDate.getMonth() + 1);
  //   var day = this.formatDate(this.maxSampleReceivedHubDate.getDate());
  //   this.maxSampleReceivedHubDate = this.maxSampleReceivedHubDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
  //   console.log(this.maxSampleReceivedHubDate, 'setmaxSampleReceivedHubDate');
  // }

   
  // setMaxSampleDispatchedHubDate() {
  //   this.maxSampleReceivedHubDate = new Date(this.sampleInfoPanelForm.controls.sampleDispatchedOn.value);
  //   var month = this.formatDate(this.maxSampleReceivedHubDate.getMonth() + 1);
  //   var day = this.formatDate(this.maxSampleReceivedHubDate.getDate());
  //   this.maxSampleReceivedHubDate = this.maxSampleReceivedHubDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
  //   console.log(this.maxSampleReceivedHubDate, 'setmaxSampleReceivedHubDate');
  // }

  setMaxSampleReceivedLabDate() {
    this.maxSampleReceivedLabDate = new Date(this.labResultPanelForm.controls.sampleReceivedDateTimeAtHub.value);
    var month = this.formatDate(this.maxSampleReceivedLabDate.getMonth() + 1);
    var day = this.formatDate(this.maxSampleReceivedLabDate.getDate());
    this.maxSampleReceivedLabDate = this.maxSampleReceivedLabDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
    console.log(this.maxSampleReceivedLabDate, 'setmaxSampleReceivedLabDate');
  }
  setMaxSampleTestDate() {
    this.maxSampleTestDate = new Date(this.sampleInfoPanelForm.controls.sampleReceivedDateTimeAtTestLab.value);
    var month = this.formatDate(this.maxSampleTestDate.getMonth() + 1);
    var day = this.formatDate(this.maxSampleTestDate.getDate());
    this.maxSampleTestDate = this.maxSampleTestDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
    console.log(this.maxSampleTestDate, 'setMaxSampleTestDate', this.maxDate);
  }
  setMaxResultDate() {
    this.maxResultDate = new Date(this.sampleInfoPanelForm.controls.sampleReceivedDateTimeAtTestLab.value);
    var month = this.formatDate(this.maxResultDate.getMonth() + 1);
    var day = this.formatDate(this.maxResultDate.getDate());
    this.maxResultDate = this.maxResultDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
    console.log(this.maxResultDate, 'setmaxResultDate', this.maxDate);
  }

}