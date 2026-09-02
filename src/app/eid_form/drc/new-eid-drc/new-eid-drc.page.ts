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
    selector: 'app-new-eid-drc',
    templateUrl: './new-eid-drc.page.html',
    styleUrls: ['./new-eid-drc.page.scss'],
    standalone: false
})

export class NewEidDrcPage implements OnInit {
  reason:any;
  reasonArray: any[] = [];
  public districtdata:any;
  matcher = new MyErrorStateMatcher();
  submitted: boolean = false;
  appVersionNumber: any;
  loginDetails: any;
  eidInitArray: any = [];
  POECountyArray: any = [];
  genderArray: any = [];
  implementingPartnerArray: any = [];
  maritalStatArray: any = [];
  motherTreatmentArray: any = [];
  childTreatmentArray: any = [];
  motherViralLoadArray: any = [];
  InfantRapidHIVArray: any = [];
  pcrTestReasonArray: any = [];
  RapidTestResultArray: any = [];
  choiceOfFeedingArray: any = [];
  ctxArray: any = [];
  fundingPartnerArray: any = [];
  rejectReasonArray: any = [];
  selectedPatientDetail: any;
  genderSelected: any;
  maritalSelected: any;
  implementingSelected: any;
  fundingSelected: any;
  reviewed:any;
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
  reviewedByFilteredOptions: Observable<string[]>;
  approvedByFilteredOptions: Observable<string[]>;


  count: number;
  getSelectedTestReqForm: any;
  motherTreatment: any = [];
  childTreatment: any = [];
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
  motherViralLoad: any;
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
  initArray: any;
  results: any[];
  private sqlite: SQLiteObject;
  district: any;
  state: any;
  review:any;
  technicianLab: any;
  provinceListArray: any = [];
  districtID: any;
  patientDistrictID: any;
  remoteSampleCode: any;
  uniqueID: any;
  previousRejectedValue: any;
  maxSampleReceivedDate;
  maxSampleTestDate;
  maxSampleCollectionDate;
  motherHealthInfoPanelForm: FormGroup;
  specimenInfoPanelForm: FormGroup;
  childInfoPanelForm: FormGroup;
  childMotherDetailsPanelForm: FormGroup;
  siteInfoPanelForm: FormGroup;

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

      this.siteInfoPanelForm = new FormGroup({

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

      });
      this.childMotherDetailsPanelForm = new FormGroup({
        mothersId: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
        mothersName: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
        mothersDob: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
        mothersMaritalStatus: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
        child_id: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
      
       
       
        search: new FormControl('', []),

        firstName: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        lastName: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
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
        }, []),
       
       
        // phoneNo: new FormControl('',[]),
        // address: new FormControl('',[])
      });
      this.childInfoPanelForm = new FormGroup({
        hasInfantStoppedBreastfeeding: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        childTreatment: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        ageBfeedingStopped: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        choiceOfFeeding: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        isCotrimoxazoleBeingAdministered: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
       
      });
      this.specimenInfoPanelForm = new FormGroup({

        typeOfTestRequest: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        sampleCollectionDateTime: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
       
        sampleRequestorPhone: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        sampleRequestorName: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        reasonForPCR: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        rapidTestPerformed: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        rapidTestResult: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        rapidtestDate: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
       
      });
      this.motherHealthInfoPanelForm = new FormGroup({
    
        motherTreatment: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        motherTreatmentOther: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        mothercd4: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        motherViralLoadCopiesPerMl: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        motherViralLoadText: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
     
    
      });
      this.labResultPanelForm = this.fb.group({
        sampleReceivedDateTime: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
      
        testingLab: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
       
        sampleTestDate: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),

        sampleRejected: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
        rejectionReason: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
      
        rejectionDate: new FormControl('', []),
        testedBy: new FormControl('', []),
        approvedBy: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
        approvedOn: new FormControl({
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
        
        result: new FormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
        reasonForChanging: new FormControl('', []),
  
      });
            
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
    if (this.mode == 'add') {
      for (let inner in this.siteInfoPanelForm.controls) {
        this.siteInfoPanelForm.get(inner).setValue('');
        this.siteInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.childMotherDetailsPanelForm.controls) {
        this.childMotherDetailsPanelForm.get(inner).setValue('');
        this.childMotherDetailsPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.motherHealthInfoPanelForm.controls) {
        this.motherHealthInfoPanelForm.get(inner).setValue('');
        this.motherHealthInfoPanelForm.get(inner).setErrors(null);
      }
      for (let inner in this.childInfoPanelForm.controls) {
        this.childInfoPanelForm.get(inner).setValue('');
        this.childInfoPanelForm.get(inner).setErrors(null);
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
      console.log(this.labResultPanelForm.controls.reasonForChanging.value);
    }

  }


  async ionViewWillEnter() {

    await this.storage.create();

    this.isToggled = false;
    this.step = 0;
    if (this.mode == 'result edit') {
      this.step = 5;
    }
    console.log(this.mode,'mode');
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

  onChangeMotherTreatment(event) {
    
    console.log(event, 'event', this.motherHealthInfoPanelForm.controls.motherTreatment.value, this.motherHealthInfoPanelForm.controls.motherTreatment.value.includes('Other'));
  }

  onChangeVl(vlelement){
    if(vlelement == 'motherViralLoadCopiesPerMl'){
      this.motherHealthInfoPanelForm.get('motherViralLoadText').setValue('');
    } else if(vlelement == 'motherViralLoadText'){
      this.motherHealthInfoPanelForm.get('motherViralLoadCopiesPerMl').setValue('');
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
      // this.childMotherDetailsPanelForm.get('phoneNo').setValue(this.selectedPatientDetail.patientphoneNo);
      // this.childMotherDetailsPanelForm.get('address').setValue(this.selectedPatientDetail.patientaddress);



    } else {

      this.childMotherDetailsPanelForm.get('child_id').setValue('');
      this.childMotherDetailsPanelForm.get('DHIS2CaseID').setValue('');
      this.childMotherDetailsPanelForm.get('firstName').setValue('');
      this.childMotherDetailsPanelForm.get('lastName').setValue('');
      this.childMotherDetailsPanelForm.get('dob').setValue('');
      this.childMotherDetailsPanelForm.get('age').setValue('');
      this.childMotherDetailsPanelForm.get('gender').setValue('');
      this.genderSelected = '';
      this.childMotherDetailsPanelForm.get('state').setValue("");
      this.childMotherDetailsPanelForm.get('county').setValue("");
      this.childMotherDetailsPanelForm.get('zone').setValue("");
      this.childMotherDetailsPanelForm.get('city').setValue("");
      this.childMotherDetailsPanelForm.get('nationality').setValue("");
      this.childMotherDetailsPanelForm.get('passportNumber').setValue('');

    }

  }

  isOptionDisabled(): boolean{
    return this.mode === 'view' || this.mode === 'result edit';
  }

  isOptionDisableds(): boolean{
    return this.mode === 'view' ;
  }


  async editSelectedTestReqForm() {

    this.getSelectedTestReqForm = await this.storage.get("selectedEidTestReq");
    this.viewResultArray.push(this.getSelectedTestReqForm);
    console.log(this.getSelectedTestReqForm, 'getSelected EidID', this.getSelectedTestReqForm.patientId);
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


    this.siteInfoPanelForm.get('POEState').setValue(this.getSelectedTestReqForm.provinceName)
    this.POEStateFilteredOptions = this.siteInfoPanelForm.get('POEState').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.POEStateFilter(value))
      );

    let defaultSelectedCounty = this.provinceListArray.filter(item => item.province_name == this.getSelectedTestReqForm.provinceName);

    if (defaultSelectedCounty.length != 0) {
      let POECountyDupArray = await this.CommonService.getDistrictList(defaultSelectedCounty[0].province_id);
      this.POECountyArray = [...new Set(POECountyDupArray.map(({district_id}) => district_id))].map(e => POECountyDupArray.find(({district_id}) => district_id == e));
      console.log(this.POECountyArray,'POECounty POECounty POECounty');
    }
    this.siteInfoPanelForm.get('POECounty').setValue(this.getSelectedTestReqForm.district);
    this.POECountyFilteredOptions = this.siteInfoPanelForm.get('POECounty').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.POECountyFilter(value))
      );
    let defaultSelectedCounty1 = this.POECountyArray.filter(item => item.district_name == this.getSelectedTestReqForm.district);
    if (defaultSelectedCounty1.length != 0) {
      this.POEArray = await this.CommonService.getFacilitiesList(defaultSelectedCounty1[0].district_id);
    }

    this.POEFilteredOptions = this.siteInfoPanelForm.get('POE').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.POEFilter(value))
      );
    this.siteInfoPanelForm.get('POE').setValue(this.getSelectedTestReqForm.facilityName);

    if (this.getSelectedTestReqForm.implementingPartner) {
      this.implementingSelected = this.getSelectedTestReqForm.implementingPartner.toString();
    }

    if (this.getSelectedTestReqForm.fundingSource) {
      this.fundingSelected = this.getSelectedTestReqForm.fundingSource.toString();
    }

    console.log(this.implementingSelected, this.fundingSelected, 'this.fundingSelected');
    this.childMotherDetailsPanelForm.get('mothersId').setValue(this.getSelectedTestReqForm.motherArtNumber);
    this.childMotherDetailsPanelForm.get('mothersName').setValue(this.getSelectedTestReqForm.mothersName);
    this.childMotherDetailsPanelForm.get('mothersDob').setValue(this.getSelectedTestReqForm.mothersDob ? new Date(this.getSelectedTestReqForm.mothersDob) : '');
    this.childMotherDetailsPanelForm.get('mothersMaritalStatus').setValue(this.getSelectedTestReqForm.mothersMaritalStatus);
    this.maritalSelected = this.getSelectedTestReqForm.mothersMaritalStatus;

    this.childMotherDetailsPanelForm.get('child_id').setValue(this.getSelectedTestReqForm.patientId);
    this.childMotherDetailsPanelForm.get('firstName').setValue(this.getSelectedTestReqForm.firstName);
    this.childMotherDetailsPanelForm.get('dob').setValue(this.getSelectedTestReqForm.patientDob ? new Date(this.getSelectedTestReqForm.patientDob) : '');
    this.childMotherDetailsPanelForm.get('age').setValue(this.getSelectedTestReqForm.childAge);
    this.childMotherDetailsPanelForm.get('gender').setValue(this.getSelectedTestReqForm.patientGender);
    // this.childMotherDetailsPanelForm.get('address').setValue(this.getSelectedTestReqForm.patientAddress);
    // this.childMotherDetailsPanelForm.get('phoneNo').setValue(this.getSelectedTestReqForm.patientPhoneNo);
    this.genderSelected = this.getSelectedTestReqForm.patientGender;

    if (this.getSelectedTestReqForm.motherTreatment != "" && this.getSelectedTestReqForm.motherTreatment != null) {
      let motherTreatment = this.getSelectedTestReqForm.motherTreatment.split(",");
      for (var i = 0; i < motherTreatment.length; i++) {
        this.motherTreatment.push(motherTreatment[i]);
      }
      this.motherHealthInfoPanelForm.get('motherTreatment').setValue(this.motherTreatment);
    }
    this.motherHealthInfoPanelForm.get('motherTreatmentOther').setValue(this.getSelectedTestReqForm.motherTreatmentOther);
    this.motherHealthInfoPanelForm.get('mothercd4').setValue(this.getSelectedTestReqForm.mothercd4);

    if(this.getSelectedTestReqForm.motherViralLoadText == "< 40" || this.getSelectedTestReqForm.motherViralLoadText == "< 20" || this.getSelectedTestReqForm.motherViralLoadText == "bdl" || this.getSelectedTestReqForm.motherViralLoadText == "tnd"){
      this.motherHealthInfoPanelForm.get('motherViralLoadText').setValue(this.getSelectedTestReqForm.motherViralLoadText);
      this.motherHealthInfoPanelForm.get('motherViralLoadCopiesPerMl').setValue('');
    }
    else{
      this.motherHealthInfoPanelForm.get('motherViralLoadCopiesPerMl').setValue(this.getSelectedTestReqForm.motherViralLoadCopiesPerMl);
      this.motherHealthInfoPanelForm.get('motherViralLoadText').setValue('');
    }

    
    if (this.getSelectedTestReqForm.childTreatment != "" && this.getSelectedTestReqForm.childTreatment != null) {
      let childTreatment = this.getSelectedTestReqForm.childTreatment.split(",");
      for (var i = 0; i < childTreatment.length; i++) {
        this.childTreatment.push(childTreatment[i]);
      }
      console.log(this.childTreatment,'testchild');
      this.childInfoPanelForm.get('childTreatment').setValue(this.childTreatment);
    }
    this.childInfoPanelForm.get('hasInfantStoppedBreastfeeding').setValue(this.getSelectedTestReqForm.infantBreastfeeding);
    this.childInfoPanelForm.get('ageBfeedingStopped').setValue(this.getSelectedTestReqForm.ageBfeedingStopped);
    this.childInfoPanelForm.get('choiceOfFeeding').setValue(this.getSelectedTestReqForm.choiceOfFeeding);
    this.childInfoPanelForm.get('isCotrimoxazoleBeingAdministered').setValue(this.getSelectedTestReqForm.isCotrimoxazoleBeingAdministered);

    this.specimenInfoPanelForm.get('reasonForPCR').setValue(this.getSelectedTestReqForm.reasonPcr2Test);
    this.specimenInfoPanelForm.get('rapidtestDate').setValue(this.getSelectedTestReqForm.testDate ? new Date(this.getSelectedTestReqForm.testDate) : '');
    this.specimenInfoPanelForm.get('rapidTestPerformed').setValue(this.getSelectedTestReqForm.infantRapidHIVTest);
    this.specimenInfoPanelForm.get('rapidTestResult').setValue(this.getSelectedTestReqForm.rapidTestResult);
    this.specimenInfoPanelForm.get('sampleCollectionDateTime').setValue(this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleCollectionDate)));
    this.specimenInfoPanelForm.get('sampleRequestorPhone').setValue(this.getSelectedTestReqForm.requestingOfficerPhone);
    this.specimenInfoPanelForm.get('sampleRequestorName').setValue(this.getSelectedTestReqForm.requestingOfficer);

    this.labResultPanelForm.get('sampleReceivedDateTime').setValue(this.getSelectedTestReqForm.sampleReceivedDate ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleReceivedDate)) : "");
    this.labResultPanelForm.get('sampleRejected').setValue(this.getSelectedTestReqForm.isSampleRejected ? this.getSelectedTestReqForm.isSampleRejected : "");
    if (this.getSelectedTestReqForm.isSampleRejected) {
      this.previousRejectedValue = this.getSelectedTestReqForm.isSampleRejected;
    }
  // Ensure that initArray exists and is an object
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

    if (this.initArray && this.initArray.labTechniciansList) {
      let reviews = this.initArray.labTechniciansList.filter(item => item.value == this.getSelectedTestReqForm.reviewedBy);
      console.log(reviews);
      if (reviews.length != 0) {
        this.review = reviews[0].show ? reviews[0].show : '';
      }
    } else {
      console.error('initArray or labTechniciansList is undefined');
    }

    this.labResultPanelForm.get('testingLab').setValue(this.testingLab);
    this.labResultPanelForm.get('rejectionReason').setValue(this.getSelectedTestReqForm.rejectionReason);
    this.labResultPanelForm.get('rejectionDate').setValue(this.getSelectedTestReqForm.rejectionDate ? new Date(this.getSelectedTestReqForm.rejectionDate) : "");
    // this.labResultPanelForm.get('reasonForChanging').setValue(this.getSelectedTestReqForm.reasonForChanging ? this.getSelectedTestReqForm.reasonForChanging : "");
    this.labResultPanelForm.get('sampleTestDate').setValue(this.getSelectedTestReqForm.sampleTestDate ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleTestDate)) : "");
    this.labResultPanelForm.get('result').setValue(this.getSelectedTestReqForm.testResult ? this.getSelectedTestReqForm.testResult : "");
    let technicianLab = this.initArray['labTechniciansList'].filter(item => item.value == this.getSelectedTestReqForm.testedBy);
    if (technicianLab.length != 0) {
      this.technicianLab = technicianLab[0].show ? technicianLab[0].show : '';
    }
    // this.labResultPanelForm.get('testedBy').setValue(this.technicianLab ? this.technicianLab : "");
    this.labResultPanelForm.get('approvedBy').setValue(this.getSelectedTestReqForm.approvedBy ? this.getSelectedTestReqForm.approvedBy : "");
    this.labResultPanelForm.get('approvedOn').setValue(this.getSelectedTestReqForm.approvedOn ? new Date(this.getSelectedTestReqForm.approvedOn) : "");
    this.labResultPanelForm.get('reviewedBy').setValue(this.review);
    this.labResultPanelForm.get('reviewedOn').setValue(this.getSelectedTestReqForm.reviewedOn ? new Date(this.getSelectedTestReqForm.reviewedOn) : "");
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
  
  async onChangePOECounty($event) {
    try {
      this.siteInfoPanelForm.get('POE').setValue('');
      const { POEArray, district_id } = await this.sharedService.onChangePOECounty($event, this.POECountyArray);
      this.POEArray = POEArray;
      this.districtdata = district_id;
      console.log(this.districtdata);
      // Subscribe to changes if needed
      this.POEFilteredOptions = this.siteInfoPanelForm.get('POE').valueChanges.pipe(startWith(''), map(value => this.POEFilter(value)));
    } catch (error) {
      console.error('Error in onChangePOECounty:', error);
    }
  }
  
  



  // async onChangePOEState($event, form) {


  //   this.siteInfoPanelForm.get('POECounty').setValue('');
  //   this.siteInfoPanelForm.get('POE').setValue('');
  //   let selectedCounty = this.provinceListArray.filter(item => item.province_name == $event.option.value);
  //   // this.POECountyArray = selectedCounty[0].districtDetails;
  //   let POECountyDupArray = await this.CommonService.getDistrictList(selectedCounty[0].province_id);

  //   this.POECountyArray = [...new Set(POECountyDupArray.map(({
  //     district_id
  //   }) => district_id))].map(e => POECountyDupArray.find(({
  //     district_id
  //   }) => district_id == e));
  //   console.log(this.POECountyArray);



  //   this.POECountyFilteredOptions = this.siteInfoPanelForm.get('POECounty').valueChanges
  //     .pipe(
  //       startWith(''),
  //       map(value =>
  //         this.POECountyFilter(value))
  //     );

  // }

  // async onChangePOECounty($event) {

  //   this.siteInfoPanelForm.get('POE').setValue('');
  //   let selectedCounty = this.POECountyArray.filter(item => item.district_name == $event.option.value);
  //   this.POEArray = await this.CommonService.getFacilitiesList(selectedCounty[0].district_id);
  //   this.districtdata=selectedCounty[0].district_id;

  //   this.POEFilteredOptions = this.siteInfoPanelForm.get('POE').valueChanges
  //     .pipe(
  //       startWith(''),
  //       map(value =>
  //         this.POEFilter(value))
  //     );
  // }


  async getInitArray() {

    this.initArray = await this.storage.get("initArray");
    this.eidInitArray = this.initArray.eid;

    this.provinceListArray = await this.CommonService.getProvinceList();

    this.POEStateFilteredOptions = this.siteInfoPanelForm.get('POEState').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.POEStateFilter(value))
      );
    // this.implementPartnerFilteredOptions = this.siteInfoPanelForm.get('implementingPartner').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value =>
    //       this.implementPartnerFilter(value))
    //   );
    // this.fundingPartnerFilteredOptions = this.siteInfoPanelForm.get('fundingPartner').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value =>
    //       this.fundingPartnerFilter(value))
    //   );
    this.testingLabFilteredOptions = this.labResultPanelForm.get('testingLab').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.testingLabFilter(value))
      );
    // this.testPlatformListFilteredOptions = this.labResultPanelForm.get('testPlatform').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value =>
    //       this.testPlatformListFilter(value))
    //   );

    this.pcrTestReasonFilteredOptions = this.specimenInfoPanelForm.get('reasonForPCR').valueChanges
      .pipe(
        startWith(''),
        map(value =>
          this.pcrTestReasonFilter(value))
      );
    // this.resultsListFilteredOptions = this.labResultPanelForm.get('result').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value =>
    //       this.resultsListFilter(value))
    //   );
    // this.resultsListFilteredOptions = this.motherHealthInfoPanelForm.get('previousPcrResult').valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value =>
    //       this.resultsListFilter(value))
    //   );

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
    this.router.navigate(['select-patient-details-drc',
      {
        'data': this.childMotherDetailsPanelForm.get('search').value
      }
    ]);

  }

 
  // calAge() {
  //   this.sharedService.calculateEidAged(this.childMotherDetailsPanelForm);
  // }
  

  calAge() {
    const convertAge = new Date(this.childMotherDetailsPanelForm.controls.dob.value);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    this.childMotherDetailsPanelForm.get('age').setValue(Math.floor((timeDiff / (1000 * 3600 * 24)) / 30));

    this.maxSampleCollectionDate = convertAge;
    var month = this.formatDate(this.maxSampleCollectionDate.getMonth() + 1);
    var day = this.formatDate(this.maxSampleCollectionDate.getDate());
    this.maxSampleCollectionDate = this.maxSampleCollectionDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
    console.log(this.maxSampleCollectionDate, 'maxSampleCollectionDate');
  }

  setMaxSampleReceivedDate() {
    this.maxSampleReceivedDate = new Date(this.childInfoPanelForm.controls.sampleCollectionDateTime.value);
    var month = this.formatDate(this.maxSampleReceivedDate.getMonth() + 1);
    var day = this.formatDate(this.maxSampleReceivedDate.getDate());
    this.maxSampleReceivedDate = this.maxSampleReceivedDate.getFullYear() + "-" + month + "-" + day + "T" + '00' + ":" + '00';
    console.log(this.maxSampleReceivedDate, 'setMaxSampleReceivedDate', this.childInfoPanelForm.controls.sampleCollectionDateTime.value);
  }

  setMaxSampleTestDate() {
    this.maxSampleTestDate = new Date(this.labResultPanelForm.controls.sampleReceivedDateTime.value);
    var month = this.formatDate(this.maxSampleTestDate.getMonth()+1);
    var day = this.formatDate(this.maxSampleTestDate.getDate());
    var hour = this.maxSampleTestDate.getHours();
    var minute = this.maxSampleTestDate.getMinutes();
    this.maxSampleTestDate = this.maxSampleTestDate.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + minute;
    console.log(this.maxSampleTestDate,'setMaxSampleTestDate',this.maxDate);
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

  // implementPartnerFilter(val: string): string[] {
  //   return this.initArray['implementingPartnerList'].map(x => x.show).filter(option =>
  //     option.toLowerCase().includes(val.toLowerCase()));
  // }

  // fundingPartnerFilter(val: string): string[] {
  //   return this.initArray['fundingSourceList'].map(x => x.show).filter(option =>
  //     option.toLowerCase().includes(val));
  // }

  testingLabFilter(val: string): string[] {
    return this.initArray['testingLabsList'].map(x => x.show).filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  // testPlatformListFilter(val: string): string[] {
  //   return this.initArray['testPlatformList'].map(x => x.show).filter(option =>
  //     option.toLowerCase().includes(val.toLowerCase()));
  // }
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
  nextStepChildInformation(isChildInfoPanelFormValid) {
    if (isChildInfoPanelFormValid) {
      this.step = 4;
    }
  }
  nextStepSpecimenInformation(isSpecimenInfoFormValid) {

    if (isSpecimenInfoFormValid) {
      this.step = 5;
      console.log('rest', this.step);
    }
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

  async saveEidAddDRCForm(isSiteInfoFormVaild, isChildMotherDetailsFormValid, isMotherHealthInfoPanelForm, isChildInfoPanelFormValid, isSpecimenInfoFormValid, isLabResultFormValid, isAddOrUpdate) {


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
      for (let inner in this.motherHealthInfoPanelForm.controls) {
        this.motherHealthInfoPanelForm.get(inner).markAsTouched();
        this.motherHealthInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.childInfoPanelForm.controls) {
        this.childInfoPanelForm.get(inner).markAsTouched();
        this.childInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.specimenInfoPanelForm.controls) {
        this.specimenInfoPanelForm.get(inner).markAsTouched();
        this.specimenInfoPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (!isChildMotherDetailsFormValid) {
      this.step = 1;
      for (let inner in this.childMotherDetailsPanelForm.controls) {
        this.childMotherDetailsPanelForm.get(inner).markAsTouched();
        this.childMotherDetailsPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.motherHealthInfoPanelForm.controls) {
        this.motherHealthInfoPanelForm.get(inner).markAsTouched();
        this.motherHealthInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.childInfoPanelForm.controls) {
        this.childInfoPanelForm.get(inner).markAsTouched();
        this.childInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.specimenInfoPanelForm.controls) {
        this.specimenInfoPanelForm.get(inner).markAsTouched();
        this.specimenInfoPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (!isMotherHealthInfoPanelForm) {
      this.step = 2;
      for (let inner in this.motherHealthInfoPanelForm.controls) {
        this.motherHealthInfoPanelForm.get(inner).markAsTouched();
        this.motherHealthInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.childInfoPanelForm.controls) {
        this.childInfoPanelForm.get(inner).markAsTouched();
        this.childInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.specimenInfoPanelForm.controls) {
        this.specimenInfoPanelForm.get(inner).markAsTouched();
        this.specimenInfoPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (!isChildInfoPanelFormValid) {
      this.step = 3;
      for (let inner in this.childInfoPanelForm.controls) {
        this.childInfoPanelForm.get(inner).markAsTouched();
        this.childInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.specimenInfoPanelForm.controls) {
        this.specimenInfoPanelForm.get(inner).markAsTouched();
        this.specimenInfoPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (!isSpecimenInfoFormValid) {
      this.step = 4;
      for (let inner in this.specimenInfoPanelForm.controls) {
        this.specimenInfoPanelForm.get(inner).markAsTouched();
        this.specimenInfoPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (this.isTestingUser == 'no') {
      this.step = 4;
      isLabResultFormValid = true;
    } else if (this.isTestingUser == 'yes') {

      if (!isSpecimenInfoFormValid) {
        this.step = 4;
        for (let inner in this.specimenInfoPanelForm.controls) {
          this.specimenInfoPanelForm.get(inner).markAsTouched();
          this.specimenInfoPanelForm.get(inner).updateValueAndValidity();
        }
      } else {
        this.step = 5;
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



    if (isSiteInfoFormVaild && isChildMotherDetailsFormValid && isMotherHealthInfoPanelForm && isChildInfoPanelFormValid && isSpecimenInfoFormValid && isLabResultFormValid) {
      this.submitted = true;

      this.loginDetails = await this.storage.get("loginDetails");

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
        // offTestReqID += (currentDate.getFullYear().toString()).slice(2); // 2011
        // offTestReqID += (currentDate.getMonth() + 1 < 9 ? '0' : '') + (currentDate.getMonth() + 1).toString(); // JS months are 0-based, so +1 and pad with 0's AEID2021120001 AEID2112290003
        // offTestReqID += (currentDate.getDate() + 1 < 9 ? '0' : '') + (currentDate.getDate()).toString();
        // offTestReqID += ('000' + count.toString()).slice(-4);
        // console.log(offTestReqID,'offtestID');
        offTestReqID = 'AEID';
        offTestReqID += Math.random().toString(36).slice(2, 4).toUpperCase();
        offTestReqID += (currentDate.getFullYear().toString()).slice(-2);
        offTestReqID += ('0' + (currentDate.getMonth() + 1)).slice(-2);
        console.log(offTestReqID,'offTestReqID');
        offTestReqID += ('000' + count.toString()).slice(-4);
        console.log(offTestReqID,'offTestReqID');

        this.createdOn = this.dateTimeFormat(new Date);
        this.isSynced = false;
        this.uniqueID = offTestReqID;
        // this.uniqueID = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      } else {

        this.updatedOn = this.dateTimeFormat(new Date);
        offTestReqID = this.appSampleCode;
        offTestReqID1 = this.uniqueID;
        this.isSynced = false;
      }

      let filteredPOEState = this.provinceListArray.filter(item =>
        item.province_name == this.siteInfoPanelForm.controls.POEState.value);
      if (filteredPOEState.length != 0) {
        this.provinceID = filteredPOEState[0] ? filteredPOEState[0].province_id : '';
      }
      // let filteredPOECounty = this.POECountyArray.filter(item =>
      //   item.district_name == this.siteInfoPanelForm.controls.POECounty.value);
      // if (filteredPOECounty.length != 0) {
      //   this.districtID = filteredPOECounty[0] ? filteredPOECounty[0].district_id : '';
      // }

      this.districtID = this.districtdata;

      let filteredImpPartner = this.implementingPartnerArray.filter(item => item.value == this.siteInfoPanelForm.controls.implementingPartner.value);
      if (filteredImpPartner.length != 0) {
        this.implementingPartnerID = filteredImpPartner[0] ? filteredImpPartner[0].value : '';
      }

      let filteredFundingSource = this.fundingPartnerArray.filter(item => item.value == this.siteInfoPanelForm.controls.fundingPartner.value);
      if (filteredFundingSource.length != 0) {
        this.fundingSourceID = filteredFundingSource[0] ? filteredFundingSource[0].value : '';
      }
      console.log(this.siteInfoPanelForm.controls.fundingPartner.value, 'filteredFundingSource filteredFundingSource', this.fundingSourceID);

      // let selectedFacility = this.POEArray.filter(item =>
      //   item.facility_name == this.siteInfoPanelForm.controls.POE.value);
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

      let filteredTestLabRecord = this.initArray['testingLabsList']?.filter(item =>
        item.show == this.labResultPanelForm.controls.testingLab.value);
        console.log(filteredTestLabRecord);
      this.labId = filteredTestLabRecord[0] ? filteredTestLabRecord[0].value : '';
      this.labName = this.labResultPanelForm.controls.testingLab.value;

      let filteredTestedByRecord = this.initArray['labTechniciansList'].filter(item => item.show == this.labResultPanelForm.controls.testedBy.value);
      if (filteredTestedByRecord.length != 0) {
        this.testedByID = filteredTestedByRecord[0] ? filteredTestedByRecord[0].value : '';
      }

      
      let reviewedsby = this.initArray['labTechniciansList']?.filter(item =>
        item.show === this.labResultPanelForm.controls.reviewedBy.value);
        console.log(reviewedsby);
      this.reviewed = reviewedsby[0] ? reviewedsby[0].value : '';
      console.log('Reviewed Value:', this.reviewed);
      
      

      if(this.motherHealthInfoPanelForm.controls.motherViralLoadText.value !=''){
        this.motherViralLoad = this.motherHealthInfoPanelForm.controls.motherViralLoadText.value;
      } else if(this.motherHealthInfoPanelForm.controls.motherViralLoadCopiesPerMl.value !=''){
        this.motherViralLoad = this.motherHealthInfoPanelForm.controls.motherViralLoadCopiesPerMl.value;
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

      let saveEidSSJSON =

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

        "provinceName": this.siteInfoPanelForm.controls.POEState.value,
        "provinceId": this.provinceID,
        "district": this.siteInfoPanelForm.controls.POECounty.value,
        "districtId": this.districtID,
        "facilityName": this.siteInfoPanelForm.controls.POE.value,
        "facilityId": this.facilityId,
        "implementingPartner": this.implementingPartnerID ? this.implementingPartnerID : "",
        "fundingSource": this.fundingSourceID ? this.fundingSourceID : "",

        "motherArtNumber": this.childMotherDetailsPanelForm.controls.mothersId.value ? this.childMotherDetailsPanelForm.controls.mothersId.value : '',
        "mothersName": this.childMotherDetailsPanelForm.controls.mothersName.value ? this.childMotherDetailsPanelForm.controls.mothersName.value : '',
        "mothersDob": this.childMotherDetailsPanelForm.controls.mothersDob.value ? this.dateFormat(new Date(this.childMotherDetailsPanelForm.controls.mothersDob.value)) : '',
        "mothersMaritalStatus": this.childMotherDetailsPanelForm.controls.mothersMaritalStatus.value ? this.childMotherDetailsPanelForm.controls.mothersMaritalStatus.value : '',
        "child_id": this.childMotherDetailsPanelForm.controls.child_id.value,
        "firstName": this.childMotherDetailsPanelForm.controls.firstName.value ? this.childMotherDetailsPanelForm.controls.firstName.value : '',
        "child_Dob": this.childMotherDetailsPanelForm.controls.dob.value ? this.dateFormat(new Date(this.childMotherDetailsPanelForm.controls.dob.value)) : '',
        "childAge": this.childMotherDetailsPanelForm.controls.age.value,
        "child_Gender": this.childMotherDetailsPanelForm.controls.gender.value ? this.childMotherDetailsPanelForm.controls.gender.value : '',
       

        "motherTreatment": this.motherHealthInfoPanelForm.controls.motherTreatment.value ? this.motherHealthInfoPanelForm.controls.motherTreatment.value : '',
        "motherTreatmentOther": this.motherHealthInfoPanelForm.controls.motherTreatmentOther.value ? this.motherHealthInfoPanelForm.controls.motherTreatmentOther.value : '',
        "mothercd4": this.motherHealthInfoPanelForm.controls.mothercd4.value ? this.motherHealthInfoPanelForm.controls.mothercd4.value : '',
        "motherViralLoad": this.motherViralLoad ? this.motherViralLoad : '',

        "childTreatment": this.childInfoPanelForm.controls.childTreatment.value ? this.childInfoPanelForm.controls.childTreatment.value : '',
        "infantBreastfeeding": this.childInfoPanelForm.controls.hasInfantStoppedBreastfeeding.value ? this.childInfoPanelForm.controls.hasInfantStoppedBreastfeeding.value : '',
        "ageBfeedingStopped": this.childInfoPanelForm.controls.ageBfeedingStopped.value ? this.childInfoPanelForm.controls.ageBfeedingStopped.value : '',
        "choiceOfFeeding": this.childInfoPanelForm.controls.choiceOfFeeding.value ? this.childInfoPanelForm.controls.choiceOfFeeding.value : '',
        "isCotrimoxazoleBeingAdministered": this.childInfoPanelForm.controls.isCotrimoxazoleBeingAdministered.value ? this.childInfoPanelForm.controls.isCotrimoxazoleBeingAdministered.value : '',


        "sampleCollectionDate": this.specimenInfoPanelForm.controls.sampleCollectionDateTime.value ? this.dateTimeFormat(new Date(this.specimenInfoPanelForm.controls.sampleCollectionDateTime.value)) : '',
        "requestingOfficerPhone": this.specimenInfoPanelForm.controls.sampleRequestorPhone.value ? this.specimenInfoPanelForm.controls.sampleRequestorPhone.value : '',
        "requestingOfficer": this.specimenInfoPanelForm.controls.sampleRequestorName.value ? this.specimenInfoPanelForm.controls.sampleRequestorName.value : '',
        "reasonPcr2Test": this.specimenInfoPanelForm.controls.reasonForPCR.value ? this.specimenInfoPanelForm.controls.reasonForPCR.value : '',
        "infantRapidHIVTest": this.specimenInfoPanelForm.controls.rapidTestPerformed.value ? this.specimenInfoPanelForm.controls.rapidTestPerformed.value : '',
        "testDate": this.specimenInfoPanelForm.controls.rapidtestDate.value ? this.dateTimeFormat(new Date(this.specimenInfoPanelForm.controls.rapidtestDate.value)) : '',
        "rapidTestResult": this.specimenInfoPanelForm.controls.rapidTestResult.value ? this.specimenInfoPanelForm.controls.rapidTestResult.value : '',

        "sampleReceivedDate": this.labResultPanelForm.controls.sampleReceivedDateTime.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.sampleReceivedDateTime.value)) : '',
        "testingLab": this.labName ? this.labName : '',
        "labId": this.labId ? this.labId : '',
        "isSampleRejected": this.labResultPanelForm.controls.sampleRejected.value ? this.labResultPanelForm.controls.sampleRejected.value : '',
        "sampleTestDate": this.labResultPanelForm.controls.sampleTestDate.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.sampleTestDate.value)) : '',
        "testResult": this.labResultPanelForm.controls.result.value ? this.labResultPanelForm.controls.result.value : '',
        "rejectionReason": this.labResultPanelForm.controls.rejectionReason.value ? this.labResultPanelForm.controls.rejectionReason.value : '',
        "reasonForChanging": this.reasonArray,
        // "reasonForChanging": this.labResultPanelForm.controls.reasonForChanging.value ? this.labResultPanelForm.controls.reasonForChanging.value : '',
        "reviewedBy": this.reviewed,
        "reviewedOn": this.labResultPanelForm.controls.reviewedOn.value ? this.dateFormat(new Date(this.labResultPanelForm.controls.reviewedOn.value)) : '',
        "approvedBy": this.labResultPanelForm.controls.approvedBy.value ? this.labResultPanelForm.controls.approvedBy.value : '',
        "approvedOn": this.labResultPanelForm.controls.approvedOn.value ? this.dateFormat(new Date(this.labResultPanelForm.controls.approvedOn.value)) : '',
        "lastName":'',
        "caretakerPhoneNumber":'',
        "caretakerAddress":''

        
       

      }

      console.log(saveEidSSJSON, 'saveEidSSJSON');
      await this.db.insertEidData(saveEidSSJSON, isAddOrUpdate);

      if (this.mode == undefined) {
        for (let inner in this.siteInfoPanelForm.controls) {
          this.siteInfoPanelForm.get(inner).setValue('');
          this.siteInfoPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.childMotherDetailsPanelForm.controls) {
          this.childMotherDetailsPanelForm.get(inner).setValue('');
          this.childMotherDetailsPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.motherHealthInfoPanelForm.controls) {
          this.motherHealthInfoPanelForm.get(inner).setValue('');
          this.motherHealthInfoPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.childInfoPanelForm.controls) {
          this.childInfoPanelForm.get(inner).setValue('');
          this.childInfoPanelForm.get(inner).setErrors(null);
        }
      }

    }
  }

  loadStaticArrays() {
    
    this.genderArray = [{
      "name": "Male",
      "value": "male"
    },
    {
      "name": "Female",
      "value": "female"
    }
    ]
    this.maritalStatArray = [{
      "name": "Single",
      "value": "single"
    },
    {
      "name": "Married",
      "value": "married"
    },
    {
      "name": "Cohabitating",
      "value": "cohabitating"
    }]
    this.motherTreatmentArray = [{
      "name": "Rien",
      "value": "Nothing"
    },
    {
      "name": "ARV débutés durant la grossesse",
      "value": "ARV Initiated during Pregnancy"
    },
    {
      "name": "ARV débutés avant la grossesse",
      "value": "ARV Initiated prior to Pregnancy"
    }, {
      "name": "ARV à l’accouchement",
      "value": "ARV at Child Birth"
    },
    {
      "name": "Option B plus",
      "value": "Option B plus"
    },
    {
      "name": "AZT/3TC/NVP",
      "value": "AZT/3TC/NVP"
    }, {
      "name": "TDF/3TC/EFV",
      "value": "TDF/3TC/EFV"
    },
    {
      "name": "Autres (à préciser)",
      "value": "Other"
    },
    {
      "name": "Inconnu",
      "value": "Unknown"
    }]
    this.childTreatmentArray = [{
      "name": "Rien",
      "value": "Nothing"
    },
    {
      "name": "AZT",
      "value": "AZT"
    }, {
      "name": "NVP",
      "value": "NVP"
    },
    {
      "name": "Inconnu",
      "value": "Unknown"
    }]
    this.motherViralLoadArray = [{
      "name": " Target Not Detected",
      "value": "tnd"
    },
    {
      "name": " Below Detection Limit",
      "value": "bdl"
    },
    {
      "name": "< 20",
      "value": "< 20"
    },
    {
      "name": "< 40",
      "value": "< 40"
    },
    {
      "name": "Invalid",
      "value": "invalid"
    }]
    this.InfantRapidHIVArray = [{
      "name": " Oui ",
      "value": "yes"
    },
    {
      "name": " Non ",
      "value": "no"
    },
    {
      "name": " Inconnu ",
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
    this.choiceOfFeedingArray = [{
      "name": "Allaitement seul",
      "value": "Breastfeeding only"
    },
    {
      "name": "Substitut de lait",
      "value": "Milk substitute"
    },
    {
      "name": "Mixte",
      "value": "Combination"
    },
    {
      "name": "Autre",
      "value": "Other"
    }
    ]
    this.ctxArray = [{
      "name": "Non",
      "value": "no"
    },
    {
      "name": "Oui, prend CTX chaque jour",
      "value": "Yes, takes CTX everyday"
    },
    {
      "name": " Commence CTX aujourd’hui",
      "value": "Starting on CTX today"
    }
    ]
    this.rejectReasonArray = [{
      "name": "Problème technique",
      "value": "Technical Problem"
    },
    {
      "name": "Mauvaise numérotation",
      "value": "Poor numbering"
    },
    {
      "name": "Echantillon insuffisant",
      "value": "Insufficient sample"
    },
    {
      "name": "Echantillon dégradé ou caillot",
      "value": "Degraded sample or clot"
    },
    {
      "name": "Mauvais empaquetage",
      "value": "Poor packaging"
    }
    ]
    this.pcrTestReasonArray = [{
      "name": "Rien",
      "value": "Nothing"
    },
    {
      "name": "1st test pour bébé exposé",
      "value": "First Test for exposed baby"
    },
    {
      "name": "1st test pour bébé malade",
      "value": "First test for sick baby"
    },
    {
      "name": "Répéter car problème avec 1er test",
      "value": "Repeat due to problem with first test"
    },
    {
      "name": "Répéter pour confirmer 1er résultat",
      "value": "Repeat to confirm the first result"
    },
    {
      "name": "Répéter test après arrêt allaitement maternel (6 semaines au moins après arrêt allaitement)",
      "value": "Repeat test once breastfeeding is stopped"
    }
    ]
    this.implementingPartnerArray = [{
      "name": "CORDAID",
      "value": "12"
    },
    {
      "name": "EGPAF Elikya",
      "value": "10"
    },
    {
      "name": "HPP-CONGO",
      "value": "11"
    },
    {
      "name": "ICAP Haut-Katanga",
      "value": "4"
    },
    {
      "name": "ICAP Kinshasa",
      "value": "3"
    },
    {
      "name": "IHAP Haut-Katanga",
      "value": "5"
    },
    {
      "name": "IHAP Kinshasa",
      "value": "2"
    },
    {
      "name": "KHETHIMPILO (HEC)",
      "value": "7"
    },
    {
      "name": "Metabiota",
      "value": "8"
    },
    {
      "name": "METABIOTA DoD - Kisangani",
      "value": "9"
    },
    {
      "name": "SANRU",
      "value": "6"
    }
    ]
    this.fundingPartnerArray = [{
      "name": "Global Fund",
      "value": "2"
    },
    {
      "name": "MOH",
      "value": "3"
    },
    {
      "name": " PEPFAR",
      "value": "4"
    },
    {
      "name": " USA Govt",
      "value": "1"
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
  }

 
  clearMDOB() {
    this.childMotherDetailsPanelForm.get('mothersDob').setValue('');
  }

  clearDOT() {
    this.specimenInfoPanelForm.get('rapidtestDate').setValue('');
  }
  clearDOPCRT() {
    this.motherHealthInfoPanelForm.get('previousTestDate').setValue('');

  }

 

  clearSampleCollection() {
    this.specimenInfoPanelForm.get('sampleCollectionDateTime').setValue('');
  }
  // clearSamplCollection() {
  //   this.motherHealthInfoPanelForm.get('sampleCollectionDateTime').setValue('');
  // }

  clearSampleReceived() {
    this.labResultPanelForm.get('sampleReceivedDateTime').setValue('');
  }

 

  // clearRejection() {
  //   this.labResultPanelForm.get('rejectionDate').setValue('');
  // }

  clearDateOfTesting() {
    this.labResultPanelForm.get('sampleTestDate').setValue('');
  }

  goBack() {

    var routerSplitURL = this.router.url.split(';');
    if ((this.router.url === '/add-new-request' && (this.siteInfoPanelForm.dirty || this.childMotherDetailsPanelForm.dirty || this.childInfoPanelForm.dirty || this.labResultPanelForm.dirty)) ||
      (routerSplitURL[1] == 'data_mode=edit' && (this.siteInfoPanelForm.dirty || this.childMotherDetailsPanelForm.dirty || this.childInfoPanelForm.dirty || this.labResultPanelForm.dirty))) {

      this.alertService.confirmAlert('VLSM', "Are you sure you want to go back? Because the data you have entered will be lost", 'addEditForm');

    } else {
      this.router.navigate([this.previousPageURL], {
        replaceUrl: true
      });
    }
  }
  maxmindate() {
    this.maxDate = new Date();
    var month = this.formatDate(this.maxDate.getMonth() +1);
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

  onChangeRejectReason() {
    for (var i = 0; i < this.eidInitArray['rejectedReasonList'].length; i++) {
      let filteredRejectionReason = this.eidInitArray['rejectedReasonList'][i].reasons.filter(item =>
        item.show == this.labResultPanelForm.controls.rejectionReason.value);

      if (filteredRejectionReason.length > 0) {
        this.rejectionReasonId = filteredRejectionReason[0] ? filteredRejectionReason[0].value : '';
        this.rejectionReason = this.labResultPanelForm.controls.rejectionReason.value;
        console.log(filteredRejectionReason, 'filteredRejectionReason', this.rejectionReasonId, this.rejectionReason);
        break;
      }
    }
  }

}
