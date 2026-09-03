import {
  Component,
  OnInit,
  ChangeDetectionStrategy
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
    selector: 'app-add-new-request',
    templateUrl: './add-new-request.page.html',
    styleUrls: ['./add-new-request.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AddNewRequestPage implements OnInit {
  reason:any;
  reasonArray: any[] = [];
  public districtdata:any;
  matcher = new MyErrorStateMatcher();
  submitted: boolean = false;
  appVersionNumber: any;
  testNumberArray: any = [];
  loginDetails: any;
  eidInitArray: any = [];
  initArray: any = { 'testingLabsList': [] };
  POECountyArray: any = [];
  genderArray: any = [];
  funcingsource:any;
  implements:any;
  InfantRapidHIVArray: any = [];
  RapidTestResultArray: any = [];
  selectedPatientDetail: any;
  genderSelected: any;
  rejectReasonSelected: any;
  POEArray: any = [];
  selectedOptions: any;
  // sourceOfAlertFilteredOptions: Observable < string[] > ;
  POEStateFilteredOptions: Observable<string[]>;
  POECountyFilteredOptions: Observable<string[]>;
  POECountyPatientFilteredOptions: Observable<string[]>;
  POEFilteredOptions: Observable<string[]>;
  implementPartnerFilteredOptions: Observable<string[]>;
  fundingPartnerFilteredOptions: Observable<string[]>;
  testingLabFilteredOptions: Observable<string[]>;
  testPlatformListFilteredOptions: Observable<string[]>;
  pcrTestReasonFilteredOptions: Observable<string[]>;
  resultsListFilteredOptions: Observable<string[]>;
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
  rejectionReasonId: any;
  rejectionReason: any;
  isToggled: boolean;
  loggedUserArray: any = [];
  userTestRequestArray: any = [];
  userID: any;
  formattedDateTime: string;
  labResultPanelForm: FormGroup;
  isTestingUser: string;
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
  POECountyPatientArray: any = [];
  provinceID: any;
  implementingPartnerID: any;
  implementingPartnerName: any;
  testingLab: any;
  rejectedReasonShow: any;
  rejectedReason: any;
  poe: any;
  fundingSource: any;
  fundingSourceID: any;
  testDetails: any = [];
  testDetailsArray: any = [];
  previousPageURL: any;
  maxDate;
  maxDatetime;
  eid_id: any;
  keyItemsArray: any = [];
  formEidLength: any;
  // initArray: any;
  results: any[];
  private sqlite: SQLiteObject;
  district: any;
  state: any;
  technicianLab: any;
  technicianApproved: any;
  provinceListArray: any = [];
  districtID: any;
  patientDistrictID: any;
  remoteSampleCode: any;
  uniqueID: any;
  previousRejectedValue: any;
  maxSampleReceivedDate;
  maxSampleTestDate;
  maxSampleCollectionDate;
  siteInfoPanelForm: FormGroup;
  childMotherDetailsPanelForm: FormGroup;
  infantMotherHealthInfoPanelForm: FormGroup;
  specimenInfoPanelForm: FormGroup;
  technicianReviewed: any;

  constructor(
    private sharedService: SharedService,
    private router: Router,
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
      this.siteInfoPanelForm = this.fb.group({

        // sourceOfAlert: new FormControl('', []),

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
        
        fundingPartner: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        implementingPartner: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        testingLab: new FormControl({
          value: '',
          disabled: this.mode === 'view'
        }, [Validators.required]),
        
    
    
      });
    
      this.childMotherDetailsPanelForm = this.fb.group({
    
        search: new FormControl('', []),

        child_id: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
      
        DHIS2CaseID: new FormControl('', []),
        firstName: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, [Validators.required]),
        lastName: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, [Validators.required]),
        dob: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        age: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
        gender: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
       
        motherArtNo: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
        phoneNo: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        address: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
       
        state: new FormControl('', []),
        county: new FormControl('', []),
        zone: new FormControl('', []),
        city: new FormControl('', []),
        nationality: new FormControl('', []),
        passportNumber: new FormControl('', [])
    
      })
    
      this.specimenInfoPanelForm = this.fb.group({
    
        typeOfTestRequest: new FormControl('', []),
      
        requestingOfficer: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        sampleCollectionDateTime: new FormControl('', [
          Validators.required,
        ]),

        specimenType: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),

        requestingOfficerPhone: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
      
    
      })
      
      this.infantMotherHealthInfoPanelForm = this.fb.group({
        mothersHIVStatus: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        motherTreatment: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        infantRapidHIVTest: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        testDate: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        rapidTestResult: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        infantBreastfeeding: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        ageBfeedingStopped: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        pcrTest: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        previousPcrResult: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        previousTestDate: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        reasonPcr2Test: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        
        
    
        // specimenType: new FormControl('', [
        //   Validators.required,
        // ]),
        // requestingOfficerPhone: new FormControl('', [])
    
      })

      this.labResultPanelForm = this.fb.group({
        sampleReceivedDateTime: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
       
        machineUsed: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
      
        testPlatform: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
        sampleTestDate: new FormControl('', []),

        sampleRejected: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
        rejectionReason: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
        rejectionDate: new FormControl({
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

       
        testResult: new FormControl('', []),
        reasonForChanging: new FormControl('', []),

        reviewedBy: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),


        reviewedOn: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
       
      

        //for undefined
        // motherViralLoad: new FormControl('', []),
        // motherTreatmentOther: new FormControl('', []),
        // mothersName: new FormControl('', []),
        // mothersMaritalStatus: new FormControl('', []),
        // mothersDob: new FormControl('', []),
        // mothercd4: new FormControl('', []),
        // isCotrimoxazoleBeingAdministered: new FormControl('', []),
        // choiceOfFeeding: new FormControl('', []),
        // childTreatment: new FormControl('', []),
  
      });
      for (let inner in this.siteInfoPanelForm.controls) {
        this.siteInfoPanelForm.get(inner).setValue('');
        this.siteInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.childMotherDetailsPanelForm.controls) {
        this.childMotherDetailsPanelForm.get(inner).setValue('');
        this.childMotherDetailsPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.infantMotherHealthInfoPanelForm.controls) {
        this.infantMotherHealthInfoPanelForm.get(inner).setValue('');
        this.infantMotherHealthInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.specimenInfoPanelForm.controls) {
        this.specimenInfoPanelForm.get(inner).setValue('');
        this.specimenInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.labResultPanelForm.controls) {
        this.labResultPanelForm.get(inner).setValue('');
        this.labResultPanelForm.get(inner).setErrors(null);
      }
    });
    this.loadStaticArrays();

    this.mode = this.actRoute.snapshot.params['data_mode'];
    if (this.actRoute.snapshot.params['previuosPageURL']) {
      this.previousPageURL = this.actRoute.snapshot.params['previuosPageURL'];
    }
    if ((this.mode == 'edit' || this.mode == 'view' || this.mode == 'result edit') && this.mode != undefined) {
      this.isMenuOrBackButton = "back";
      this.titleHeader = this.mode + ' ' + "EID TEST REQUEST FORM"
    } else {
      this.isMenuOrBackButton = "menu";
      this.mode = 'add';
      this.titleHeader = this.mode + ' ' + "EID TEST REQUEST FORM";
    }
    this.maxmindate();
  }


  ionViewWillLeave() {
    console.log('leaving');
    if (this.mode == 'add') {
      for (let inner in this.siteInfoPanelForm.controls) {
        this.siteInfoPanelForm.get(inner).setValue('');
        this.siteInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.childMotherDetailsPanelForm.controls) {
        this.childMotherDetailsPanelForm.get(inner).setValue('');
        this.childMotherDetailsPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.infantMotherHealthInfoPanelForm.controls) {
        this.infantMotherHealthInfoPanelForm.get(inner).setValue('');
        this.infantMotherHealthInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.specimenInfoPanelForm.controls) {
        this.specimenInfoPanelForm.get(inner).setValue('');
        this.specimenInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.labResultPanelForm.controls) {
        this.labResultPanelForm.get(inner).setValue('');
        this.labResultPanelForm.get(inner).setErrors(null);
      }
    }
    this.storage.remove("selectedPatient");
  }

  ngOnInit() {
    this.setMaxDatetime();
    let testingLabs = [];
    if (this.initArray && Array.isArray(this.initArray['testingLabsList'])) {
      testingLabs = this.initArray['testingLabsList'].filter(item => item.value == this.getSelectedTestReqForm.labId);
      console.log(testingLabs)
    }
    if (this.mode == 'add') {
console.log(this.labResultPanelForm.controls.reasonForChanging.value);
    }

  }


  async ionViewWillEnter() {

    await this.storage.create();

    this.isToggled = false;
    this.step = 0;
    if(this.mode == 'result edit'){
      this.step=4;
      console.log('step#');
    }
    this.getInitArray();
    if (this.actRoute.snapshot.paramMap.get('searchText')) {
      this.childMotherDetailsPanelForm.get('search').setValue(this.actRoute.snapshot.paramMap.get('searchText'));
    }

    if (await this.storage.get("selectedPatient") && this.childMotherDetailsPanelForm.get('search').value) {

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

  onChangeSampleRejected() {
    if (this.mode == 'edit' && this.labResultPanelForm.controls.sampleRejected.value == 'no') {
      // this.testArray().push(this.newTest());
    }
  }



  async getSelectedPatientDetails() {

    if (await this.storage.get("selectedPatient") && this.childMotherDetailsPanelForm.get('search').value) {

      this.step = 1;

      this.selectedPatientDetail = await this.storage.get("selectedPatient");
      console.log(this.selectedPatientDetail);

      this.childMotherDetailsPanelForm.get('child_id').setValue(this.selectedPatientDetail.child_id);
      // this.childMotherDetailsPanelForm.get('DHIS2CaseID').setValue(this.selectedPatientDetail.externalSampleCode);
      this.childMotherDetailsPanelForm.get('firstName').setValue(this.selectedPatientDetail.child_name);
      this.childMotherDetailsPanelForm.get('lastName').setValue(this.selectedPatientDetail.child_surname);
      this.childMotherDetailsPanelForm.get('dob').setValue(this.selectedPatientDetail.child_dob ? new Date(this.selectedPatientDetail.child_dob) : '');
      this.childMotherDetailsPanelForm.get('age').setValue(this.selectedPatientDetail.child_age);
      this.childMotherDetailsPanelForm.get('gender').setValue(this.selectedPatientDetail.child_gender);
      this.genderSelected = this.selectedPatientDetail.patientGender;
      this.childMotherDetailsPanelForm.get('phoneNo').setValue(this.selectedPatientDetail.caretaker_phone_number);
      this.childMotherDetailsPanelForm.get('address').setValue(this.selectedPatientDetail.caretaker_address);
      this.childMotherDetailsPanelForm.get('motherArtNo').setValue(this.selectedPatientDetail.mother_id);
      



    } else {

      this.childMotherDetailsPanelForm.get('child_id').setValue('');
      this.childMotherDetailsPanelForm.get('DHIS2CaseID').setValue('');
      this.childMotherDetailsPanelForm.get('firstName').setValue('');
      this.childMotherDetailsPanelForm.get('lastName').setValue('');
      this.childMotherDetailsPanelForm.get('dob').setValue('');
      this.childMotherDetailsPanelForm.get('age').setValue('');
      this.childMotherDetailsPanelForm.get('gender').setValue('');
      this.genderSelected = '';
      this.childMotherDetailsPanelForm.get('phoneNo').setValue('');
      this.childMotherDetailsPanelForm.get('address').setValue('');
      this.childMotherDetailsPanelForm.get('state').setValue("");
      this.childMotherDetailsPanelForm.get('county').setValue("");
      this.childMotherDetailsPanelForm.get('zone').setValue("");
      this.childMotherDetailsPanelForm.get('city').setValue("");
      this.childMotherDetailsPanelForm.get('nationality').setValue("");
      this.childMotherDetailsPanelForm.get('passportNumber').setValue('');

    }

  }

  async editSelectedTestReqForm() {

    this.getSelectedTestReqForm = await this.storage.get("selectedEidTestReq");
    this.viewResultArray.push(this.getSelectedTestReqForm);
    console.log(this.getSelectedTestReqForm, 'getSelected CovidID', this.getSelectedTestReqForm.resultIn);
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
    this.eid_id = this.getSelectedTestReqForm.eidId;
    this.uniqueID = this.getSelectedTestReqForm.uniqueId;


    // this.siteInfoPanelForm.controls.POEState.value
    this.siteInfoPanelForm.get('POEState').setValue(this.getSelectedTestReqForm.provinceName)
    this.POEStateFilteredOptions = this.siteInfoPanelForm.get('POEState').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.POEStateFilter(value))
      );
    let defaultSelectedCounty = await this.provinceListArray.filter(item => item.province_name == this.getSelectedTestReqForm.provinceName);
    console.log('defaultSelectedCounty edit in',defaultSelectedCounty);
    if (defaultSelectedCounty.length != 0) {
      let POECountyDupArray = await this.CommonService.getDistrictList(defaultSelectedCounty[0].province_id);
      this.POECountyArray = [...new Set(POECountyDupArray.map(({district_id}) => district_id))].map(e => POECountyDupArray.find(({district_id}) => district_id == e));
      console.log(this.POECountyArray, 'this.POECountyArray edit in', POECountyDupArray,defaultSelectedCounty);
    }


    this.siteInfoPanelForm.get('POECounty').setValue(this.getSelectedTestReqForm.district);
    this.POECountyFilteredOptions = this.siteInfoPanelForm.get('POECounty').valueChanges.pipe(startWith(''),map(value => this.POECountyFilter(value)));
    console.log(this.POECountyFilteredOptions, 'this.POECountyFilteredOptions edit in', this.POEStateFilteredOptions);
    let defaultSelectedCounty1 = await this.POECountyArray.filter(item => item.district_name == this.getSelectedTestReqForm.district);
    if (defaultSelectedCounty1.length != 0) {
      this.POEArray = await this.CommonService.getFacilitiesList(defaultSelectedCounty1[0].district_id);
    }

    this.POEFilteredOptions = this.siteInfoPanelForm.get('POE').valueChanges.pipe(startWith(''),map(value =>this.POEFilter(value)));
    
    this.siteInfoPanelForm.get('POE').setValue(this.getSelectedTestReqForm.facilityName);
    
    console.log(this.POEFilteredOptions, 'this.POEFilteredOptions edit in',this.POEArray);


    this.initArray = await this.storage.get("initArray");
    if (this.initArray && this.initArray.implementingPartnerList) {
      let implement = this.initArray.implementingPartnerList.filter(item => item.value == this.getSelectedTestReqForm.implementingPartner);
      console.log(implement);
      if (implement.length != 0) {
        this.implements = implement[0].show ? implement[0].show : '';
      }
    } else {
      console.error('initArray or implementingPartnerList is undefined');
    }
    
    this.siteInfoPanelForm.get('implementingPartner').setValue(this.implements);

    

  
    
    if (this.initArray && this.initArray.fundingSourceList) {
      let funding = this.initArray.fundingSourceList.filter(item => item.value == this.getSelectedTestReqForm.fundingSource);
      console.log(funding);
      if (funding.length != 0) {
        this.funcingsource = funding[0].show ? funding[0].show : '';
      }
    } else {
      console.error('initArray or fundingSourceList is undefined');
    }

    this.siteInfoPanelForm.get('fundingPartner').setValue(this.funcingsource);

   
    // let testingLabs = [];
    // if (this.initArray && Array.isArray(this.initArray['testingLabsList'])) {
    //   testingLabs = this.initArray['testingLabsList'].filter(item => item.value == this.getSelectedTestReqForm.labId);
    // }

    // if (testingLabs.length != 0) {
    //   this.testingLab = testingLabs[0].show ? testingLabs[0].show : '';
    //   console.log(this.testingLab)
    // } else {
    //   this.testingLab = ''; // Ensure this is also set to a default value if no labs are found
    // }

    if (this.getSelectedTestReqForm.labId) {
      console.log('labId');
      let testingLabs = this.initArray['testingLabsList'].filter(item => item.value == this.getSelectedTestReqForm.labId);
      
      if (testingLabs.length != 0) {
        this.testingLab = testingLabs[0].show ? testingLabs[0].show : '';
        console.log('labId', this.testingLab);
      }
      this.siteInfoPanelForm.get('testingLab').setValue(this.testingLab);
    }



    // this.siteInfoPanelForm.get('testingLab').setValue(this.getSelectedTestReqForm.testingLab);
    this.childMotherDetailsPanelForm.get('child_id').setValue(this.getSelectedTestReqForm.patientId);
    this.childMotherDetailsPanelForm.get('firstName').setValue(this.getSelectedTestReqForm.firstName);
    this.childMotherDetailsPanelForm.get('lastName').setValue(this.getSelectedTestReqForm.lastName);
    this.childMotherDetailsPanelForm.get('dob').setValue(this.getSelectedTestReqForm.patientDob ? new Date(this.getSelectedTestReqForm.patientDob) : '');
    this.childMotherDetailsPanelForm.get('age').setValue(this.getSelectedTestReqForm.childAge);
    this.childMotherDetailsPanelForm.get('gender').setValue(this.getSelectedTestReqForm.patientGender);
    this.genderSelected = this.getSelectedTestReqForm.patientGender;
    this.childMotherDetailsPanelForm.get('motherArtNo').setValue(this.getSelectedTestReqForm.motherArtNumber);
    this.childMotherDetailsPanelForm.get('phoneNo').setValue(this.getSelectedTestReqForm.patientPhoneNumber);
    this.childMotherDetailsPanelForm.get('address').setValue(this.getSelectedTestReqForm.patientAddress);

    this.infantMotherHealthInfoPanelForm.get('mothersHIVStatus').setValue(this.getSelectedTestReqForm.mothersHIVStatus);


    if (this.getSelectedTestReqForm.motherTreatment != "" && this.getSelectedTestReqForm.motherTreatment != null) {
      let motherTreatment = this.getSelectedTestReqForm.motherTreatment.split(",");
      for (var i = 0; i < motherTreatment.length; i++) {
        this.motherTreatment.push(motherTreatment[i]);
      }
      this.infantMotherHealthInfoPanelForm.get('motherTreatment').setValue(this.motherTreatment);
    }

    this.infantMotherHealthInfoPanelForm.get('infantRapidHIVTest').setValue(this.getSelectedTestReqForm.infantRapidHIVTest);
    this.infantMotherHealthInfoPanelForm.get('rapidTestResult').setValue(this.getSelectedTestReqForm.rapidTestResult);
    this.infantMotherHealthInfoPanelForm.get('infantBreastfeeding').setValue(this.getSelectedTestReqForm.infantBreastfeeding);
    this.infantMotherHealthInfoPanelForm.get('ageBfeedingStopped').setValue(this.getSelectedTestReqForm.ageBfeedingStopped);
    this.infantMotherHealthInfoPanelForm.get('pcrTest').setValue(this.getSelectedTestReqForm.pcrTest);
    this.infantMotherHealthInfoPanelForm.get('previousPcrResult').setValue(this.getSelectedTestReqForm.previousPcrResult);
    this.infantMotherHealthInfoPanelForm.get('reasonPcr2Test').setValue(this.getSelectedTestReqForm.reasonPcr2Test);
    this.infantMotherHealthInfoPanelForm.get('previousTestDate').setValue(this.getSelectedTestReqForm.previousTestDate ? new Date(this.getSelectedTestReqForm.previousTestDate) : '');
    this.infantMotherHealthInfoPanelForm.get('testDate').setValue(this.getSelectedTestReqForm.testDate ? new Date(this.getSelectedTestReqForm.testDate) : '');

    this.specimenInfoPanelForm.get('sampleCollectionDateTime').setValue(this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleCollectionDate)));
    this.specimenInfoPanelForm.get('specimenType').setValue(this.getSelectedTestReqForm.specimenType);
    this.specimenInfoPanelForm.get('requestingOfficer').setValue(this.getSelectedTestReqForm.requestingOfficer);
    this.specimenInfoPanelForm.get('requestingOfficerPhone').setValue(this.getSelectedTestReqForm.requestingOfficerPhone);


    this.labResultPanelForm.get('sampleReceivedDateTime').setValue(this.getSelectedTestReqForm.sampleReceivedDate ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleReceivedDate)) : "");
    this.labResultPanelForm.get('sampleRejected').setValue(this.getSelectedTestReqForm.isSampleRejected ? this.getSelectedTestReqForm.isSampleRejected : "");
    if(this.getSelectedTestReqForm.isSampleRejected){
      this.previousRejectedValue = this.getSelectedTestReqForm.isSampleRejected;
    }
    this.labResultPanelForm.get('rejectionReason').setValue(this.getSelectedTestReqForm.rejectionReason);
    this.labResultPanelForm.get('rejectionDate').setValue(this.getSelectedTestReqForm.rejectionDate ? new Date(this.getSelectedTestReqForm.rejectionDate) : "");
    // this.labResultPanelForm.get('reasonForChanging').setValue(this.getSelectedTestReqForm.reasonForChanging ? this.getSelectedTestReqForm.reasonForChanging : "");
    this.labResultPanelForm.get('testPlatform').setValue(this.getSelectedTestReqForm.testPlatform ? this.getSelectedTestReqForm.testPlatform : "");
    this.labResultPanelForm.get('machineUsed').setValue(this.getSelectedTestReqForm.machineUsed ? this.getSelectedTestReqForm.machineUsed : "");
    this.labResultPanelForm.get('sampleTestDate').setValue(this.getSelectedTestReqForm.sampleTestDate ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleTestDate)) : "");
    this.labResultPanelForm.get('testResult').setValue(this.getSelectedTestReqForm.testResult);
    // let technicianLab = this.initArray['labTechniciansList'].filter(item => item.value == this.getSelectedTestReqForm.testedBy);
    // if (technicianLab.length != 0) {
    //   this.technicianLab = technicianLab[0].show ? technicianLab[0].show : '';
    // }
    let technicianLab = [];
    if (this.initArray && Array.isArray(this.initArray['labTechniciansList'])) {
      technicianLab = this.initArray['labTechniciansList'].filter(item => item.value == this.getSelectedTestReqForm.testedBy);
    }

    if (technicianLab.length != 0) {
      this.technicianLab = technicianLab[0].show ? technicianLab[0].show : '';
      console.log(this.technicianLab)
    } else {
      this.technicianLab = ''; // Ensure this is also set to a default value if no technicians are found
    }

    this.labResultPanelForm.get('testedBy').setValue(this.technicianLab ? this.technicianLab : "");
    let technicianReviewed = this.initArray['labTechniciansList'].filter(item => item.value == this.getSelectedTestReqForm.approvedBy);
    console.log(technicianReviewed,'technicianReviewed');
    if (technicianReviewed.length != 0) {
      this.technicianReviewed = technicianReviewed[0].show ? technicianReviewed[0].show : '';
    }
    this.labResultPanelForm.get('reviewedBy').setValue(this.technicianReviewed ? this.technicianReviewed : "");
    this.labResultPanelForm.get('reviewedOn').setValue(this.getSelectedTestReqForm.reviewedOn ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.reviewedOn)) : "");

    let technicianApproved = this.initArray['labTechniciansList'].filter(item => item.value == this.getSelectedTestReqForm.approvedBy);
    console.log(technicianApproved,'technicianApproved');
    if (technicianApproved.length != 0) {
      this.technicianApproved = technicianApproved[0].show ? technicianApproved[0].show : '';
    }
    this.labResultPanelForm.get('approvedBy').setValue(this.technicianApproved ? this.technicianApproved : "");
    this.labResultPanelForm.get('approvedOn').setValue(this.getSelectedTestReqForm.approvedOn ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.approvedOn)) : "");

  }





  async onChangePOEState($event) {
    try {
      this.siteInfoPanelForm.get('POECounty').setValue('');
      this.siteInfoPanelForm.get('POE').setValue(''); 
      this.POECountyArray = await this.sharedService.onChangePOEState($event, this.provinceListArray);
      console.log(this.POECountyArray, 'POE County Array');
      // Subscribe to changes if needed
      this.POECountyFilteredOptions = this.siteInfoPanelForm.get('POECounty').valueChanges.pipe(startWith(''), map(value => this.POECountyFilter(value)));
      this.POECountyFilteredOptions.subscribe(val => console.log(val, 'POE County Filtered Options'));
    } catch (error) {
      console.error('Error in onChangePOEState:', error);
    }
  }
  
  // async onChangePOECounty($event) {
  //   try {
  //     const { POEArray, district_id } = await this.sharedService.onChangePOECounty($event, this.POECountyArray);
  //     this.POEArray = POEArray;
  //     this.districtdata = district_id;
  //     console.log(this.districtdata);
  //     // Subscribe to changes if needed
  //     this.POEFilteredOptions = this.siteInfoPanelForm.get('POE').valueChanges.pipe(startWith(''), map(value => this.POEFilter(value)));
  //   } catch (error) {
  //     console.error('Error in onChangePOECounty:', error);
  //   }
  // }


  async onChangePOECounty( $event ) {

    this.siteInfoPanelForm.get( 'POE' ).setValue( '' );
    const selectedCounty = this.POECountyArray.filter( item => item.district_name == $event.option.value );
    this.POEArray = await this.CommonService.getFacilitiesList( selectedCounty[0].district_id );
    this.POEFilteredOptions = this.siteInfoPanelForm.get( 'POE' ).valueChanges
      .pipe(
        startWith( '' ),
        map( value =>
          this.POEFilter( value ) )
      );

  }




  async getInitArray() {

    this.initArray = await this.storage.get("initArray");
    console.log(this.initArray)
    this.eidInitArray = this.initArray.eid;
    console.log(this.eidInitArray);

    this.provinceListArray = await this.CommonService.getProvinceList();

    this.POEStateFilteredOptions = this.siteInfoPanelForm.get('POEState').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.POEStateFilter(value))
      );
    this.implementPartnerFilteredOptions = this.siteInfoPanelForm.get('implementingPartner').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.implementPartnerFilter(value))
      );
    this.fundingPartnerFilteredOptions = this.siteInfoPanelForm.get('fundingPartner').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.fundingPartnerFilter(value))
      );
    this.testingLabFilteredOptions = this.siteInfoPanelForm.get('testingLab').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.testingLabFilter(value))
      );
    console.log(this.testingLabFilteredOptions)
    this.testPlatformListFilteredOptions = this.labResultPanelForm.get('testPlatform').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.testPlatformListFilter(value))
      );

    this.pcrTestReasonFilteredOptions = this.infantMotherHealthInfoPanelForm.get('reasonPcr2Test').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.pcrTestReasonFilter(value))
      );
    this.resultsListFilteredOptions = this.labResultPanelForm.get('testResult').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.resultsListFilter(value))
      );
    this.resultsListFilteredOptions = this.infantMotherHealthInfoPanelForm.get('previousPcrResult').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.resultsListFilter(value))
      );

    this.testedByFilteredOptions = this.labResultPanelForm.get('testedBy').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.labTechnicianFilter(value))
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
    this.router.navigate(['eid-select-patient-details',
      {
        'data': this.childMotherDetailsPanelForm.get('search').value
      }
    ]);

  }


 calAge() {
    const convertAge = new Date(this.childMotherDetailsPanelForm.controls.dob.value);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    this.childMotherDetailsPanelForm.get('age').setValue(Math.floor((timeDiff / (1000 * 3600 * 24)) / 30));

    this.maxSampleCollectionDate = convertAge;
    var month = this.formatDate(this.maxSampleCollectionDate.getMonth() + 1);
    var day = this.formatDate(this.maxSampleCollectionDate.getDate());
    this.maxSampleCollectionDate = this.maxSampleCollectionDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
    console.log(this.maxSampleCollectionDate,'maxSampleCollectionDate');
     }

  // setMaxSampleReceivedDate(){
  //   this.maxSampleReceivedDate  = new Date(this.specimenInfoPanelForm.controls.sampleCollectionDateTime.value);
  //   var month = this.formatDate(this.maxSampleReceivedDate.getMonth() + 1);
  //   var day = this.formatDate(this.maxSampleReceivedDate.getDate());
  //   this.maxSampleReceivedDate = this.maxSampleReceivedDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
  //   console.log(this.maxSampleReceivedDate,'setMaxSampleReceivedDate',this.specimenInfoPanelForm.controls.sampleCollectionDateTime.value);
  // }

  // setMaxSampleTestDate(){
  //   this.maxSampleTestDate = new Date(this.labResultPanelForm.controls.sampleReceivedDateTime.value);
  //   var month = this.formatDate(this.maxSampleTestDate.getMonth()+1);
  //   var day = this.formatDate(this.maxSampleTestDate.getDate());
  //   var hour = this.maxSampleTestDate.getHours();
  //   var minute = this.maxSampleTestDate.getMinutes();
  //   this.maxSampleTestDate = this.maxSampleTestDate.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + minute;
  //   console.log(this.maxSampleTestDate,'setMaxSampleTestDate',this.maxDate);
  // }

  minSampleReceivedDate: string = '';


  setMaxSampleReceivedDate() {
    const sampleCollectionDate = this.specimenInfoPanelForm.controls.sampleCollectionDateTime.value;
    const selectedDate = new Date(sampleCollectionDate);
    selectedDate.setDate(selectedDate.getDate());
    this.minSampleReceivedDate = selectedDate.toISOString().slice(0, 16);
    // const maxSampleDate = new Date(this.maxSampleCollectionDate);
    console.log(this.minSampleReceivedDate, 'setMinSampleReceivedDate', sampleCollectionDate);
  }
  
  setMaxSampleTestDate() {
    // Get the sample received date from the form control
    const sampleReceivedDate = this.labResultPanelForm.controls.sampleReceivedDateTime.value;
  
    // Create a new Date object for the selected sample received date
    const selectedDate = new Date(sampleReceivedDate);
  
    // Format the date to YYYY-MM-DDTHH:mm for the input max attribute
    this.maxSampleTestDate = selectedDate.toISOString().slice(0, 16);
  
    // Log the calculated max date for debugging
    console.log(this.maxSampleTestDate, 'setMaxSampleTestDate', this.maxDate);
  }
  
  // Helper function to format date numbers
  // formatDate(dateNumber: number): string {
  //   return dateNumber < 10 ? '0' + dateNumber : dateNumber.toString();
  // }

  setMaxDatetime() {
    const now = new Date();
    this.maxDatetime = now.toISOString().slice(0, 16);
  }

  clearDateOfTesting() {
    this.labResultPanelForm.get('sampleTestDate')?.setValue('');
  }

  //mat auto complete filters start


  POEStateFilter(val: string): string[] {
    console.log(val,'POEStateFilter val');
    return this.provinceListArray.map(x => x.province_name).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  POECountyFilter(val: string): string[] {
    console.log(val,'POECountyFilter val');
    return this.POECountyArray.map(x => x.district_name).filter(option => option.toLowerCase().includes(val.toLowerCase()));
  }


  POEFilter(val: string): string[] {
    console.log(val,'POEFilter val');
    return this.POEArray.map(x => x.facility_name).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  implementPartnerFilter(val: string): string[] {
    return this.initArray['implementingPartnerList'].map(x => x.show).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  fundingPartnerFilter(val: string): string[] {
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
  pcrTestReasonFilter(val: string): string[] {
    return this.initArray['pcrTestReason'].map(x => x.show).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }
  resultsListFilter(val: string): string[] {
    return this.initArray['resultsList'].map(x => x.show).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }



  labTechnicianFilter(val: string): string[] {
    return this.initArray['labTechniciansList'].map(x => x.show).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  //mat auto complete filters end

  nextStepSiteInfo(isSiteInfoFormVaild) {
    if (isSiteInfoFormVaild) {
      this.step = 1;
    }
  }

  nextStepChildMotherDetails(ischildMotherDetailsFormValid) {
    if (ischildMotherDetailsFormValid) {
      this.step = 2;
    }
  }

  nextStepChildisMotherHealthDetails(ischildMotherHealthDetailsFormValid) {
    if (ischildMotherHealthDetailsFormValid) {
      this.step = 3;
    }
  }
  nextStepSpecimenInformation(isSpecimenInfoFormValid) {
    if (isSpecimenInfoFormValid) {
      this.step = 4;
    }
  }

  goToViewResult() {
    this.step = 5;
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

  isOptionDisabled(): boolean{
    return this.mode === 'view' || this.mode === 'result edit';
  }

  isOptionDisableds(): boolean{
    return this.mode === 'view' ;
  }

  

  async saveEidAddSouthSudanForm(isSiteInfoFormVaild, childMotherDetailsFormValid, infantMotherHealthInfoFormValid, isSpecimenInfoFormValid, isLabResultFormValid, isAddOrUpdate) {


    if (!isSiteInfoFormVaild) {
      this.step = 0;

      for (let inner in this.siteInfoPanelForm.controls) {
        this.siteInfoPanelForm.get(inner).markAsTouched();
        this.siteInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.childMotherDetailsPanelForm.controls) {
        this.childMotherDetailsPanelForm.get(inner).markAsTouched();
        this.childMotherDetailsPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.infantMotherHealthInfoPanelForm.controls) {
        this.infantMotherHealthInfoPanelForm.get(inner).markAsTouched();
        this.infantMotherHealthInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.specimenInfoPanelForm.controls) {
        this.specimenInfoPanelForm.get(inner).markAsTouched();
        this.specimenInfoPanelForm.get(inner).updateValueAndValidity();
      }
    }else if (!childMotherDetailsFormValid) {
      this.step = 1;
      for (let inner in this.childMotherDetailsPanelForm.controls) {
        this.childMotherDetailsPanelForm.get(inner).markAsTouched();
        this.childMotherDetailsPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.infantMotherHealthInfoPanelForm.controls) {
        this.infantMotherHealthInfoPanelForm.get(inner).markAsTouched();
        this.infantMotherHealthInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.specimenInfoPanelForm.controls) {
        this.specimenInfoPanelForm.get(inner).markAsTouched();
        this.specimenInfoPanelForm.get(inner).updateValueAndValidity();
      }
    }else if (!infantMotherHealthInfoFormValid) {
      this.step = 2;
      for (let inner in this.infantMotherHealthInfoPanelForm.controls) {
        this.infantMotherHealthInfoPanelForm.get(inner).markAsTouched();
        this.infantMotherHealthInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.specimenInfoPanelForm.controls) {
        this.specimenInfoPanelForm.get(inner).markAsTouched();
        this.specimenInfoPanelForm.get(inner).updateValueAndValidity();
      }
    }else if (!isSpecimenInfoFormValid) {
      this.step = 3;
      for (let inner in this.specimenInfoPanelForm.controls) {
        this.specimenInfoPanelForm.get(inner).markAsTouched();
        this.specimenInfoPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (this.isTestingUser == 'no') {
      this.step = 2;
      isLabResultFormValid = true;
    } else if (this.isTestingUser == 'yes') {

      if (!isSpecimenInfoFormValid) {
        this.step = 3;
        for (let inner in this.specimenInfoPanelForm.controls) {
          this.specimenInfoPanelForm.get(inner).markAsTouched();
          this.specimenInfoPanelForm.get(inner).updateValueAndValidity();
        }
      } else {
        this.step = 4;
        if (this.labResultPanelForm.controls.sampleRejected.value) {
          for (let inner in this.labResultPanelForm.controls) {
            this.labResultPanelForm.get(inner).markAsTouched();
            this.labResultPanelForm.get(inner).updateValueAndValidity();
          }
        } else {
          isLabResultFormValid = true;
        }
      }
    }

    for (var i = 0; i < this.eidInitArray['rejectedReasonList'].length; i++) {
      let filteredRejectionReason = this.eidInitArray['rejectedReasonList'][i].reasons.filter((item) => item.show == this.labResultPanelForm.controls.rejectionReason.value);
  
      if (filteredRejectionReason.length > 0) {
        this.rejectionReasonId = filteredRejectionReason[0] ? filteredRejectionReason[0].value : '';
        console.log(this.rejectionReasonId);
        this.rejectionReason = this.labResultPanelForm.controls.rejectionReason.value;
        console.log(this.rejectionReason);
       
      }
    }



    if (isSiteInfoFormVaild && childMotherDetailsFormValid && infantMotherHealthInfoFormValid && isSpecimenInfoFormValid && isLabResultFormValid) {

      this.loginDetails = await this.storage.get("loginDetails");

      // console.log(this.appSampleCode,isAddOrUpdate,'this.appSampleCode'); 
      // || (isAddOrUpdate == 'update' && this.appSampleCode == null) ---->>>> no need to save req from dB while login, if it doesn't have appSampleCode
      if (isAddOrUpdate == 'add') {
        let count = await this.storage.get("lastLocalTestEidID");
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
        // offTestReqID = 'AEID';
        // offTestReqID += currentDate.getFullYear().toString(); // 2011
        // offTestReqID += (currentDate.getMonth() + 1 < 9 ? '0' : '') + (currentDate.getMonth() + 1).toString(); // JS months are 0-based, so +1 and pad with 0's
        // offTestReqID += ('000' + count.toString()).slice(-4);

        // offTestReqID += (currentDate.getFullYear().toString()).slice(2); // 2011
        // offTestReqID += (currentDate.getMonth() + 1 < 9 ? '0' : '') + (currentDate.getMonth() + 1).toString(); // JS months are 0-based, so +1 and pad with 0's AEID2021120001 AEID2112290003
        // offTestReqID += (currentDate.getDate() + 1 < 9 ? '0' : '') + (currentDate.getDate()).toString();
        // offTestReqID += ('000' + count.toString()).slice(-4);

        // to resolve sqlite3_step failure: UNIQUE constraint failed: eid.app_sample_code issue
        // i used same code as in covid form
        // by mohan kumar thangaraj
        offTestReqID = 'AEID';
        offTestReqID += Math.random().toString(36).slice(2, 4).toUpperCase();
        offTestReqID += (currentDate.getFullYear().toString()).slice(-2);
        offTestReqID += ('0' + (currentDate.getMonth() + 1)).slice(-2);
        console.log(offTestReqID,'offTestReqID');
        offTestReqID += ('000' + count.toString()).slice(-4);
        console.log(offTestReqID,'offTestReqID');
        // this.eid_id = offTestReqID;
        this.createdOn = this.dateTimeFormat(new Date);
        this.isSynced = false;
        this.uniqueID = offTestReqID;
        // this.uniqueID = Math.random().toString(36).ing(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      } else {

        this.updatedOn = this.dateTimeFormat(new Date);
        offTestReqID = this.appSampleCode;
        offTestReqID1 = this.uniqueID;
        this.isSynced = false;
      }

      let filteredPOEState = this.provinceListArray.filter(item => item.province_name == this.siteInfoPanelForm.controls.POEState.value);
      if (filteredPOEState.length != 0) {
        this.provinceID = filteredPOEState[0] ? filteredPOEState[0].province_id : '';
      }
      // let filteredPOECounty = this.POECountyArray.filter(item => item.district_name == this.siteInfoPanelForm.controls.POECounty.value);
      // if (filteredPOECounty.length != 0) {
      //   this.districtID = filteredPOECounty[0] ? filteredPOECounty[0].district_id : '';
      // }
      this.districtID = this.districtdata;
      // let selectedFacility = this.POEArray.filter(item => item.facility_name == this.siteInfoPanelForm.controls.POE.value);
      // if (selectedFacility.length != 0) {
      //   this.facilityId = selectedFacility[0].facility_id;
      // }

      var BreakException = {};
      try {
        this.initArray['districtList'].forEach((item, index) => {
          let filteredFacilityRecord = item.facilityDetails.filter(facItem => facItem.show === this.siteInfoPanelForm.controls.POE.value);
          this.facilityId = filteredFacilityRecord[0] ? filteredFacilityRecord[0].value : "";
          if (this.facilityId) {
            throw BreakException;
          }
        });
      } catch (e) {
        if (e !== BreakException) throw e;
      }

      console.log(this.siteInfoPanelForm.controls.POEState.value, 'provinceArray and POEState', filteredPOEState);
      // console.log(this.clinicInfoPanelForm.controls.POECounty.value, 'POEcountyArray', filteredPOECounty);
      console.log(this.siteInfoPanelForm.controls.POE.value, 'POEArray');
      console.log(this.provinceID, this.districtID, this.facilityId, 'FinalSaveID');

      let filteredImpPartner = this.initArray['implementingPartnerList'].filter(item => item.show == this.siteInfoPanelForm.controls.implementingPartner.value);
        this.implementingPartnerID = filteredImpPartner[0] ? filteredImpPartner[0].value : '';

     

      let filteredFundingSource = this.initArray['fundingSourceList'].filter(item => item.show == this.siteInfoPanelForm.controls.fundingPartner.value);
        this.fundingSourceID = filteredFundingSource[0] ? filteredFundingSource[0].value : '';
    

      let filteredTestLabRecord = this.initArray['testingLabsList'].filter(item =>
        item.show == this.siteInfoPanelForm.controls.testingLab.value);
      this.labId = filteredTestLabRecord[0] ? filteredTestLabRecord[0].value : '';
      this.labName = this.siteInfoPanelForm.controls.testingLab.value;

    
     

      let filteredTestedByRecord = this.initArray['labTechniciansList'].filter(item => item.show == this.labResultPanelForm.controls.testedBy.value);
      if (filteredTestedByRecord.length != 0) {
        this.testedByID = filteredTestedByRecord[0] ? filteredTestedByRecord[0].value : '';
      }

      // const selectedFacility = this.POEArray.filter( item => item.facility_name == this.siteInfoPanelForm.controls.POE.value );
      // if ( selectedFacility.length != 0 ) {
      //   this.facilityId = selectedFacility[0].facility_id;
      // }

      let filteredApprovedByRecord = this.initArray['labTechniciansList'].filter(item => item.show == this.labResultPanelForm.controls.approvedBy.value);
      if (filteredApprovedByRecord.length != 0) {
        this.approvedByID = filteredApprovedByRecord[0] ? filteredApprovedByRecord[0].value : '';
      }

      let filteredReviewedByRecord = this.initArray['labTechniciansList'].filter(item => item.show == this.labResultPanelForm.controls.reviewedBy.value);
      if (filteredReviewedByRecord.length != 0) {
        this.reviewedByID = filteredReviewedByRecord[0] ? filteredReviewedByRecord[0].value : '';
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

      let saveEidSSJSON  =
      {
        "user_id": this.userID,
        "uniqueId": this.uniqueID,
        "remoteSampleCode": this.remoteSampleCode ? this.remoteSampleCode : '',
        "appSampleCode": offTestReqID,
        "eid_id": this.eid_id ? this.eid_id : null,
        "sampleCode": this.sampleCode ? this.sampleCode : '',
        "createdOn": this.createdOn,
        "updatedOn": this.updatedOn ? this.updatedOn : '',
        "isSynced": this.isSynced,
        "authToken": this.loginDetails['api_token'],
        "formId": this.loginDetails['form'],

        "provinceId": this.provinceID,
        "provinceName": this.siteInfoPanelForm.controls.POEState.value,
        "district": this.siteInfoPanelForm.controls.POECounty.value,
        "districtId": this.districtID,
        "facilityId": this.facilityId,
        "facilityName": this.siteInfoPanelForm.controls.POE.value,
        "implementingPartner": this.implementingPartnerID ? this.implementingPartnerID : "",
        "fundingSource": this.fundingSourceID ? this.fundingSourceID : "",
        "labId": this.labId ? this.labId : '',
        "testingLab": this.labName,
        "child_id": this.childMotherDetailsPanelForm.controls.child_id.value,
        "firstName": this.childMotherDetailsPanelForm.controls.firstName.value,
        "lastName": this.childMotherDetailsPanelForm.controls.lastName.value,
        "child_Dob": this.childMotherDetailsPanelForm.controls.dob.value ? this.dateFormat(new Date(this.childMotherDetailsPanelForm.controls.dob.value)) : '',
        "childAge": this.childMotherDetailsPanelForm.controls.age.value,
        "child_Gender": this.childMotherDetailsPanelForm.controls.gender.value,
        "motherArtNumber": this.childMotherDetailsPanelForm.controls.motherArtNo.value,
        "caretakerPhoneNumber": this.childMotherDetailsPanelForm.controls.phoneNo.value,
        "caretakerAddress": this.childMotherDetailsPanelForm.controls.address.value,

        "mothersHIVStatus": this.infantMotherHealthInfoPanelForm.controls.mothersHIVStatus.value,
        "motherTreatment": this.infantMotherHealthInfoPanelForm.controls.motherTreatment.value,
        "infantRapidHIVTest": this.infantMotherHealthInfoPanelForm.controls.infantRapidHIVTest.value,
        "testDate": this.infantMotherHealthInfoPanelForm.controls.testDate.value ? this.dateFormat(new Date(this.infantMotherHealthInfoPanelForm.controls.testDate.value)) : '',
        "rapidTestResult": this.infantMotherHealthInfoPanelForm.controls.rapidTestResult.value,
        "infantBreastfeeding": this.infantMotherHealthInfoPanelForm.controls.infantBreastfeeding.value,
        "ageBfeedingStopped": this.infantMotherHealthInfoPanelForm.controls.ageBfeedingStopped.value,
        "pcrTest": this.infantMotherHealthInfoPanelForm.controls.pcrTest.value,
        "previousPcrResult": this.infantMotherHealthInfoPanelForm.controls.previousPcrResult.value,
        "previousTestDate": this.infantMotherHealthInfoPanelForm.controls.previousTestDate.value ? this.dateFormat(new Date(this.infantMotherHealthInfoPanelForm.controls.previousTestDate.value)) : '',
        "reasonPcr2Test": this.infantMotherHealthInfoPanelForm.controls.reasonPcr2Test.value,

        "sampleCollectionDate": this.dateTimeFormat(this.specimenInfoPanelForm.controls.sampleCollectionDateTime.value),
        "specimenType": this.specimenInfoPanelForm.controls.specimenType.value,
        "requestingOfficer": this.specimenInfoPanelForm.controls.requestingOfficer.value,
        "requestingOfficerPhone": this.specimenInfoPanelForm.controls.requestingOfficerPhone.value,

        "sampleReceivedDate": this.labResultPanelForm.controls.sampleReceivedDateTime.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.sampleReceivedDateTime.value)) : '',
        "testPlatform": this.labResultPanelForm.controls.testPlatform.value ? this.labResultPanelForm.controls.testPlatform.value : '',
        "isSampleRejected": this.labResultPanelForm.controls.sampleRejected.value ? this.labResultPanelForm.controls.sampleRejected.value : '',
        "rejectionReason": this.rejectionReason ? this.rejectionReason : '',
        "rejectionReasonid":this.rejectionReasonId ? this.rejectionReasonId : '',
        "rejectionDate": this.labResultPanelForm.controls.rejectionDate.value ? this.dateFormat(new Date(this.labResultPanelForm.controls.rejectionDate.value)) : '',
        "reasonForChanging": this.reasonArray,
        // "reasonForChanging": this.labResultPanelForm.controls.reasonForChanging.value ? this.labResultPanelForm.controls.reasonForChanging.value : '',
        "machineUsed": this.labResultPanelForm.controls.machineUsed.value ? this.labResultPanelForm.controls.machineUsed.value : '',
        "sampleTestDate": this.labResultPanelForm.controls.sampleTestDate.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.sampleTestDate.value)) : '',
        "testResult": this.labResultPanelForm.controls.testResult.value ? this.labResultPanelForm.controls.testResult.value : '',
        "testedBy": this.testedByID ? this.testedByID : "",
        "approvedBy": this.approvedByID ? this.approvedByID : '',
        "approvedOn": this.labResultPanelForm.controls.approvedOn.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.approvedOn.value)) : '',
        "reviewedBy": this.reviewedByID ? this.reviewedByID : '',
        "reviewedOn": this.labResultPanelForm.controls.reviewedOn.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.reviewedOn.value)) : '',
        
        "motherViralLoad": '',
        "motherTreatmentOther": '',
        "mothersName": '',
        "mothersMaritalStatus": '',
        "mothersDob": '',
        "mothercd4": '',
        "isCotrimoxazoleBeingAdministered": '',
        "choiceOfFeeding": '',
        "childTreatment": '',
        
        
      }

      // this.localTestRequestFormService.offlineStoreShipmentForm(saveEidSSJSON, isAddOrUpdate);
      this.db.insertEidData(saveEidSSJSON, isAddOrUpdate);

      if (this.mode == undefined) {
        for (let inner in this.siteInfoPanelForm.controls) {
          this.siteInfoPanelForm.get(inner).setValue('');
          this.siteInfoPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.childMotherDetailsPanelForm.controls) {
          this.childMotherDetailsPanelForm.get(inner).setValue('');
          this.childMotherDetailsPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.infantMotherHealthInfoPanelForm.controls) {
          this.infantMotherHealthInfoPanelForm.get(inner).setValue('');
          this.infantMotherHealthInfoPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.specimenInfoPanelForm.controls) {
          this.specimenInfoPanelForm.get(inner).setValue('');
          this.specimenInfoPanelForm.get(inner).setErrors(null);
        }
      }

    }
  }

  loadStaticArrays() {
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
    this.InfantRapidHIVArray = [{
      "name": "Yes",
      "value": "yes"
    },
    {
      "name": "No",
      "value": "no"
    },
    {
      "name": "Unknown",
      "value": "unknown"
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

  clearDOB() {
    this.childMotherDetailsPanelForm.get('dob').setValue('');
    this.childMotherDetailsPanelForm.get('age').setValue('');
  }

 

  clearDOT(){
    this.infantMotherHealthInfoPanelForm.get('testDate').setValue('');
  }
  clearDOPCRT(){
    this.infantMotherHealthInfoPanelForm.get('previousTestDate').setValue('');

  }




  clearSampleCollection() {
    this.specimenInfoPanelForm.get('sampleCollectionDateTime').setValue('');
  }
  // clearSamplCollection() {
  //   this.infantMotherHealthInfoPanelForm.get('sampleCollectionDateTime').setValue('');
  // }

  clearSampleReceived() {
    this.labResultPanelForm.get('sampleReceivedDateTime').setValue('');
  }


 

  clearApprovedOn() {
    this.labResultPanelForm.get('approvedOn').setValue('');
  }

  clearRejection() {
    this.labResultPanelForm.get('rejectionDate').setValue('');
  }


  clearReviewedByOn(){
    this.labResultPanelForm.get('reviewedOn').setValue('');
  }

  goBack() {

    var routerSplitURL = this.router.url.split(';');
    if ((this.router.url === '/add-new-request' && (this.siteInfoPanelForm.dirty || this.childMotherDetailsPanelForm.dirty || this.specimenInfoPanelForm.dirty || this.labResultPanelForm.dirty)) ||
      (routerSplitURL[1] == 'data_mode=edit' && (this.siteInfoPanelForm.dirty || this.childMotherDetailsPanelForm.dirty || this.specimenInfoPanelForm.dirty || this.labResultPanelForm.dirty))) {

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

  onChangeRejectReason(){
    for (var i = 0; i < this.eidInitArray['rejectedReasonList'].length; i++) {
      let filteredRejectionReason = this.eidInitArray['rejectedReasonList'][i].reasons.filter(item =>
        item.show == this.labResultPanelForm.controls.rejectionReason.value);

      if(filteredRejectionReason.length>0){
        this.rejectionReasonId = filteredRejectionReason[0] ? filteredRejectionReason[0].value : '';
        this.rejectionReason = this.labResultPanelForm.controls.rejectionReason.value;
        console.log(filteredRejectionReason,'filteredRejectionReason',this.rejectionReasonId,this.rejectionReason);
        break;
      }
    }
  }

 

}
