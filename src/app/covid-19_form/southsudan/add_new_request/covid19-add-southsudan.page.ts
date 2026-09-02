import {
  Component,
  OnInit, NgZone,
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
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState( control: FormControl | null, form: FormGroupDirective | NgForm | null ): boolean {
    const isSubmitted = form && form.submitted;
    return !!( control && control.invalid && ( control.dirty || control.touched || isSubmitted ) );
  }
}
@Component( {
    selector: 'app-covid19-add-southsudan',
    templateUrl: './covid19-add-southsudan.page.html',
    styleUrls: ['./covid19-add-southsudan.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
} )

export class Covid19AddSouthsudanPage implements OnInit {
  matcher = new MyErrorStateMatcher();
  submitted: boolean = false;
  testingLab: boolean = false;
  appVersionNumber: any;
  reasonforrequested: any;
  testNumberArray: any = [];
  loginDetails: any;
  covid19InitArray: any = [];
  POECountyArray: any = [];
  genderArray: any = [];
  selectedPatientDetail: any;
  genderSelected: any;
  POEArray: any = [];
  sourceOfAlertFilteredOptions: Observable<string[]>;
  POEStateFilteredOptions: Observable<string[]>;
  POECountyFilteredOptions: Observable<string[]>;
  POECountyPatientFilteredOptions: Observable<string[]>;
  POEFilteredOptions: Observable<string[]>;
  implementPartnerFilteredOptions: Observable<string[]>;
  fundingPartnerFilteredOptions: Observable<string[]>;
  testingLabFilteredOptions: Observable<string[]>;
  nationalityFilteredOptions: Observable<string[]>;
  labTechnicianFilteredOptions: Observable<string[]>;
  testedByFilteredOptions: Observable<string[]>;
  authorizedByFilteredOptions: Observable<string[]>;


  count: number;
  getSelectedTestReqForm: any;
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
  isNoRecord = false;
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
  reasonForTestRequest: any;
  testedByID: any;
  labNameArray: any[] = [];
  authorizedByID: any;
  formattedDateTime2: string;
  labName: any;
  POECountyPatientArray: any = [];
  provinceID: any;
  implementingPartnerID: any;
  fundingSourceID: any;
  patientStateID: any;
  nationalityID: any;
  sourceOfAlertID: any;
  testDetails: any = [];
  testDetailsArray: any = [];
  previousPageURL: any;
  maxDate;
  maxDatetime;
  covid19_id: any;
  keyItemsArray: any = [];
  formcovid19Length: any;
  initArray: any = [];
  selectedFormCovid19Array: any = [];
  c19TestsArray: any = [];
  provinceListArray: any = [];
  results: any = [];
  private dbStorage: SQLiteObject;
  districtID: any;
  patientDistrictID: any;
  offTestReqID: any;
  remoteSampleCode: any;
  uniqueId: any;
  previousRejectedValue: any;
  implementingPartnerName: any;
  step = 0;
  maxSampleReceivedDate;
  maxSampleTestDate;
  maxSampleCollectionDate;
  siteInfoPanelForm: FormGroup;
  caseDetailsPanelForm: FormGroup;
  specimenInfoPanelForm: FormGroup;
  constructor(
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
    public CommonService: CommonService,
    private zone: NgZone,
  ) {
    actRoute.params.subscribe( val => {
      // put the code from `ngOnInit` here
      this.siteInfoPanelForm = new FormGroup( {

        sourceOfAlert: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }),
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
        fundingPartner: new FormControl( '', [] ),
        implementingPartner: new FormControl( '', [] ),
        testingLab: new FormControl( '', [

        ] )

      } );

      this.caseDetailsPanelForm = new FormGroup( {

        search: new FormControl( '', [] ),
      
        caseID: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
        DHIS2CaseID: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        firstName: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
        lastName: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
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
        phoneNo: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        address: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        state: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        county: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        zone: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        city: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        nationality: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        passportNumber: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       

      } );

      this.specimenInfoPanelForm = new FormGroup( {

        typeOfTestRequest: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        reasonForTestReq: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),

        sampleCollectionDateTime: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
        
        specimenType: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
        
        testNumber: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        
      

      } );

      this.labResultPanelForm = this.fb.group( {
        testArray: this.fb.array( [] ),
        sampleReceivedDateTime: new FormControl({
          value: '',
          disabled: this.mode === 'view'
        }, []),
        labName: new FormControl({
          value: '',
          disabled: this.mode === 'view'
        }, []),
        specimenQuality: new FormControl({
          value: '',
          disabled: this.mode === 'view'
        }, []),
        labTechnician: new FormControl({
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
        rejectionDate: new FormControl({
          value: '',
          disabled: this.mode === 'view'
        }, []),
        
        testedBy: new FormControl({
          value: '',
          disabled: this.mode === 'view'
        }, []),
      
        resultAuthorized: new FormControl({
          value: '',
          disabled: this.mode === 'view'
        }, []),
       
      
        authorizedBy: new FormControl( '', [] ),
        authorizedOn: new FormControl( '', [] ),
        finalResult: new FormControl( '', [] ),
        reasonForChanging: new FormControl( '', [] ),
      } );
    } );
    this.loadStaticArrays();

    this.mode = this.actRoute.snapshot.params.data_mode;
    if ( this.actRoute.snapshot.params.previuosPageURL ) {
      this.previousPageURL = this.actRoute.snapshot.params.previuosPageURL;
    }
    if ( ( this.mode == 'edit' || this.mode == 'view' || this.mode == 'result edit' ) && this.mode != undefined ) {
      if ( this.mode == 'result edit' ) {
        this.step = 3;
      }
      this.isMenuOrBackButton = 'back';
      this.titleHeader = this.mode + ' ' + 'COVID-19 VIRUS LABORATORY TEST REQUEST FORM';
    } else {
      this.isMenuOrBackButton = 'menu';
      this.mode = 'add';
      this.titleHeader = this.mode + ' ' + 'COVID-19 VIRUS LABORATORY TEST REQUEST FORM';
    }
    this.maxmindate();
    

  }

  ionViewWillLeave() {
    if ( this.mode == 'add' ) {
      for ( const inner in this.siteInfoPanelForm.controls ) {
        this.siteInfoPanelForm.get( inner ).setValue( '' );
        this.siteInfoPanelForm.get( inner ).setErrors( null );
      }
      for ( const inner in this.caseDetailsPanelForm.controls ) {
        this.caseDetailsPanelForm.get( inner ).setValue( '' );
        this.caseDetailsPanelForm.get( inner ).setErrors( null );
      }
      for ( const inner in this.labResultPanelForm.controls ) {
        // this.labResultPanelForm.get( inner ).setValue( '' );
        this.labResultPanelForm.get( inner ).setErrors( null );
      }
      for ( const inner in this.specimenInfoPanelForm.controls ) {
        this.specimenInfoPanelForm.get( inner ).setValue( '' );
        this.specimenInfoPanelForm.get( inner ).setErrors( null );
      }      
    }
    this.storage.remove( 'selectedPatient' );
  }

  ngOnInit() {
    this.step = 0;
    if ( this.mode == 'result edit' ) {
      this.step = 3;
    }

  }

  testArray(): FormArray {
    return this.labResultPanelForm.get( 'testArray' ) as FormArray;
  }

  newTest(): FormGroup {
    return this.fb.group( {
      
      testMethod: { value: '', disabled: this.mode === 'view' },
      dateOfTesting: '',
      testPlatform: '',
      kitLotNo: '',
      kitExpiryDate: '',
      testResult: '',
    } );
  }

  setTestMethodDisabled() {
    const testMethodControl = this.labResultPanelForm.get('testMethod');
    if (this.mode === 'view') {
      testMethodControl?.disable();
    } else {
      testMethodControl?.enable();
    }
  }
  

  async editTestDetails( testDetailsArray ) {
    await this.getKeyItemsArray( testDetailsArray );

    await this.keyItemsArray.forEach( ( item, index ) => {
      this.testArray().removeAt( index );
      this.testArray().push( this.newTest() );
      this.zone.run( () => { // <== added
        this.testArray().at( index ).patchValue( {
          test_id: item.test_id,
          covid19_id: item.covid19_id,
          facility_id: item.facility_id,
          testMethod: item.testName,
          dateOfTesting: this.dateTimeFormat2( new Date( item.testDate ) ),
          kitLotNo: item.kitLotNo,
          kitExpiryDate: ( new Date( item.kitExpiryDate ) ),
          testPlatform: item.testingPlatform,
          testResult: item.testResult
        } );
      } );

    } );
    console.log( 'editTestDetails', this.keyItemsArray );
  }

  async getKeyItemsArray( testDetailsArray ) {
    return this.keyItemsArray = await testDetailsArray.map( function ( item ) {
      return {
        testId: item.test_id,
        covid19Id: item.covid19_id,
        facilityId: item.facility_id,
        testName: item.test_name,
        testDate: item.sample_tested_datetime,
        testingPlatform: item.testing_platform,
        kitLotNo: item.kitLotNo,
        kitExpiryDate: item.kitExpiryDate,
        // tslint:disable-next-line: radix
        testResult: parseInt( item.result )
      };
    } );

  }

  getFormArray(): FormArray {
    return this.labResultPanelForm.get( 'testArray' ) as FormArray;
  }

  addTest() {
    this.testArray().push( this.newTest() );
  }

  removeTest( testIndex: number ) {
    this.testArray().removeAt( testIndex );
  }

  async ionViewWillEnter() {
    this.step = 0;
    if ( this.mode == 'result edit' ) {
      this.step = 3;
    }

    this.labResultPanelForm = this.fb.group( {
      testArray: this.fb.array( [] ),
      sampleReceivedDateTime: new FormControl( '', [] ),
      labName: new FormControl( '', [] ),
      specimenQuality: new FormControl( '', [] ),
      labTechnician: new FormControl( '', [] ),
      sampleRejected: new FormControl( '', [] ),
      rejectionReason: new FormControl( '', [] ),
      rejectionDate: new FormControl( '', [] ),
      testedBy: new FormControl( '', [] ),
      resultAuthorized: new FormControl( '', [] ),
      authorizedBy: new FormControl( '', [] ),
      authorizedOn: new FormControl( '', [] ),
      finalResult: new FormControl( '', [] ),
      reasonForChanging: new FormControl( '', [] ),

    } );
    await this.getInitArray();

    if ( this.mode == 'add' ) {
      this.testArray().push( this.newTest() );
    }
    await this.storage.create();

    this.isToggled = false;
    if ( this.actRoute.snapshot.paramMap.get( 'searchText' ) ) {
      this.caseDetailsPanelForm.get( 'search' ).setValue( this.actRoute.snapshot.paramMap.get( 'searchText' ) );
    }
    if ( await this.storage.get( 'selectedPatient' ) && this.caseDetailsPanelForm.get( 'search' ).value ) {
      this.getSelectedPatientDetails();
    }

    if ( this.mode == 'edit' || this.mode == 'view' || this.mode == 'result edit' ) {
     await this.editSelectedTestReqForm();
    }

    await this.storage.get( 'loginDetails' ).then( async ( loginDetails ) => {
      if ( loginDetails ) {
        this.userID = loginDetails.user.user_id;
        this.isTestingUser = loginDetails.user.testing_user;
      }
    } );
  }

  onChangeSampleRejected() {
    if ( ( this.mode == 'edit' || this.mode == 'result edit' ) && this.labResultPanelForm.controls.sampleRejected.value == 'no' ) {
      this.testArray().push( this.newTest() );
    }
    else if ( this.labResultPanelForm.controls.sampleRejected.value == 'yes' ) {
      this.testArray().removeAt( 0 );
      this.labResultPanelForm.get( 'finalResult' ).setErrors( null );
    }
    else if ( ( this.mode == 'add' ) && this.labResultPanelForm.controls.sampleRejected.value == 'no' ) {
      if ( this.testArray.length == 0 ) {
        this.testArray().removeAt( 0 );
        this.testArray().push( this.newTest() );
      }
      this.labResultPanelForm.get( 'rejectionReason' ).setValue( '' );
      this.labResultPanelForm.get( 'rejectionDate' ).setValue( '' );
      this.labResultPanelForm.get( 'rejectionReason' ).setErrors( null );
      this.labResultPanelForm.get( 'rejectionDate' ).setErrors( null );
    }
  }

  async getSelectedPatientDetails() {

    if ( await this.storage.get( 'selectedPatient' ) && this.caseDetailsPanelForm.get( 'search' ).value ) {

      this.step = 1;

      this.selectedPatientDetail = await this.storage.get( 'selectedPatient' );
      console.log( this.selectedPatientDetail );

      this.caseDetailsPanelForm.get( 'caseID' ).setValue( this.selectedPatientDetail.patient_id );
      this.caseDetailsPanelForm.get( 'DHIS2CaseID' ).setValue( this.selectedPatientDetail.external_sample_code );
      this.caseDetailsPanelForm.get( 'firstName' ).setValue( this.selectedPatientDetail.patient_name );
      this.caseDetailsPanelForm.get( 'lastName' ).setValue( this.selectedPatientDetail.patient_surname );
      this.caseDetailsPanelForm.get( 'dob' ).setValue( this.selectedPatientDetail.patient_dob ? new Date( this.selectedPatientDetail.patient_dob ) : '' );
      this.caseDetailsPanelForm.get( 'age' ).setValue( this.selectedPatientDetail.patient_age );
      this.caseDetailsPanelForm.get( 'gender' ).setValue( this.selectedPatientDetail.patient_gender );
      this.genderSelected = this.selectedPatientDetail.patientGender;
      this.caseDetailsPanelForm.get( 'phoneNo' ).setValue( this.selectedPatientDetail.patient_phone_number );
      this.caseDetailsPanelForm.get( 'address' ).setValue( this.selectedPatientDetail.patient_address );
      this.caseDetailsPanelForm.get( 'state' ).setValue( this.selectedPatientDetail.patient_province );
      this.caseDetailsPanelForm.get( 'county' ).setValue( this.selectedPatientDetail.district );
      this.caseDetailsPanelForm.get( 'city' ).setValue( this.selectedPatientDetail.patient_city );
      this.caseDetailsPanelForm.get( 'zone' ).setValue( this.selectedPatientDetail.patient_zone );
      this.caseDetailsPanelForm.get( 'nationality' ).setValue( this.selectedPatientDetail.patient_nationality );
      this.caseDetailsPanelForm.get( 'passportNumber' ).setValue( this.selectedPatientDetail.patient_passport_number );



    } else {

      this.caseDetailsPanelForm.get( 'caseID' ).setValue( '' );
      this.caseDetailsPanelForm.get( 'DHIS2CaseID' ).setValue( '' );
      this.caseDetailsPanelForm.get( 'firstName' ).setValue( '' );
      this.caseDetailsPanelForm.get( 'lastName' ).setValue( '' );
      this.caseDetailsPanelForm.get( 'dob' ).setValue( '' );
      this.caseDetailsPanelForm.get( 'age' ).setValue( '' );
      this.caseDetailsPanelForm.get( 'gender' ).setValue( '' );
      this.genderSelected = '';
      this.caseDetailsPanelForm.get( 'phoneNo' ).setValue( '' );
      this.caseDetailsPanelForm.get( 'address' ).setValue( '' );
      this.caseDetailsPanelForm.get( 'state' ).setValue( '' );
      this.caseDetailsPanelForm.get( 'county' ).setValue( '' );
      this.caseDetailsPanelForm.get( 'zone' ).setValue( '' );
      this.caseDetailsPanelForm.get( 'city' ).setValue( '' );
      this.caseDetailsPanelForm.get( 'nationality' ).setValue( '' );
      this.caseDetailsPanelForm.get( 'passportNumber' ).setValue( '' );

    }

  }

  async editSelectedTestReqForm() {

    this.zone.run( async () => { // <== added
      this.getSelectedTestReqForm = await this.storage.get( 'selectedCovid19TestReq' );
     
      this.viewResultArray.push( this.getSelectedTestReqForm );
      if(this.getSelectedTestReqForm.result){
        console.log('result');
        this.viewResultArray.forEach( object => {
          // tslint:disable-next-line: radix
  
          object.showTestResult = this.getSelectedTestReqForm.result.show;
          object.idresult = this.getSelectedTestReqForm.result.value;
        } );
      }
      else{
        console.log('result else');
      }
        

      if ( this.viewResultArray[0].isSampleRejected == 'yes' || this.viewResultArray[0].isSampleRejected == 'no' ) {

        this.isNoRecord = false;
      } else {
        this.isNoRecord = true;
      }
      console.log( this.getSelectedTestReqForm, 'getSelected CovidID', this.getSelectedTestReqForm.appSampleCode, this.viewResultArray);
      this.sampleCode = this.getSelectedTestReqForm.sampleCode ? this.getSelectedTestReqForm.sampleCode : '';
      this.remoteSampleCode = this.getSelectedTestReqForm.remoteSampleCode ? this.getSelectedTestReqForm.remoteSampleCode : '';
      this.uniqueId = this.getSelectedTestReqForm.uniqueId ? this.getSelectedTestReqForm.uniqueId : '';
      this.createdOn = this.getSelectedTestReqForm.createdOn;
      this.appSampleCode = this.getSelectedTestReqForm.appSampleCode;
      this.covid19_id = this.getSelectedTestReqForm.covid19Id;
      if ( this.getSelectedTestReqForm.sourceOfAlertPOE ) {
        const sourceOfAlertString = this.getSelectedTestReqForm.sourceOfAlertPOE;
        const sourceOfAlertWord = sourceOfAlertString.split( ' ' );
        for ( let i = 0; i < sourceOfAlertWord.length; i++ ) {
          sourceOfAlertWord[i] = sourceOfAlertWord[i][0].toUpperCase() + sourceOfAlertWord[i].slice( 1 );
        }
        this.siteInfoPanelForm.get( 'sourceOfAlert' ).setValue( sourceOfAlertWord.join( ' ' ) );
      }

      this.POEStateFilteredOptions = this.siteInfoPanelForm.get( 'POEState' ).valueChanges
        .pipe(
          startWith( '' ),
          map( value =>
            this.POEStateFilter( value ) )
        );
      this.siteInfoPanelForm.get( 'POEState' ).setValue( this.getSelectedTestReqForm.provinceName );

      const defaultSelectedCounty = this.provinceListArray.filter( item => item.province_name == this.getSelectedTestReqForm.provinceName );

      if ( defaultSelectedCounty.length != 0 ) {

        const POECountyDupArray = await this.CommonService.getDistrictList( defaultSelectedCounty[0].province_id );

        this.POECountyArray = [...new Set( POECountyDupArray.map( ( {
          district_id
        } ) => district_id ) )].map( e => POECountyDupArray.find( ( {
          district_id
        } ) => district_id == e ) );
        console.log( this.POECountyArray );

      }
      this.POECountyFilteredOptions = this.siteInfoPanelForm.get( 'POECounty' ).valueChanges
        .pipe(
          startWith( '' ),
          map( value =>
            this.POECountyFilter( value ) )
        );
      this.siteInfoPanelForm.get( 'POECounty' ).setValue( this.getSelectedTestReqForm.district );
      const defaultSelectedCounty1 = this.POECountyArray.filter( item => item.district_name == this.getSelectedTestReqForm.district );
      if ( defaultSelectedCounty1.length != 0 ) {
        this.POEArray = await this.CommonService.getFacilitiesList( defaultSelectedCounty1[0].district_id );
      }

      this.POEFilteredOptions = this.siteInfoPanelForm.get( 'POE' ).valueChanges
        .pipe(
          startWith( '' ),
          map( value =>
            this.POEFilter( value ) )
        );
      this.siteInfoPanelForm.get( 'POE' ).setValue( this.getSelectedTestReqForm.facilityName );

      if ( this.getSelectedTestReqForm.implementingPartner ) {
        const filteredImpPartner = this.initArray.implementingPartnerList.filter( item => item.value == this.getSelectedTestReqForm.implementingPartner );
        if ( filteredImpPartner.length != 0 ) {
          this.implementingPartnerName = filteredImpPartner[0] ? filteredImpPartner[0].show : '';
        }
        this.siteInfoPanelForm.get( 'implementingPartner' ).setValue( this.implementingPartnerName );
      }

      this.siteInfoPanelForm.get( 'fundingPartner' ).setValue( this.getSelectedTestReqForm.fundingSourceName );
      console.log('Setting labName value:', this.getSelectedTestReqForm?.labName);
      this.siteInfoPanelForm.get( 'testingLab' ).setValue( this.getSelectedTestReqForm.labId ? this.getSelectedTestReqForm.labId : '' );


      this.caseDetailsPanelForm.get( 'caseID' ).setValue( this.getSelectedTestReqForm.patientId );
      this.caseDetailsPanelForm.get( 'DHIS2CaseID' ).setValue( this.getSelectedTestReqForm.externalSampleCode );
      this.caseDetailsPanelForm.get( 'firstName' ).setValue( this.getSelectedTestReqForm.firstName );
      this.caseDetailsPanelForm.get( 'lastName' ).setValue( this.getSelectedTestReqForm.lastName );
      this.caseDetailsPanelForm.get( 'dob' ).setValue( this.getSelectedTestReqForm.patientDob ? new Date( this.getSelectedTestReqForm.patientDob ) : '' );
      this.caseDetailsPanelForm.get( 'age' ).setValue( this.getSelectedTestReqForm.patientAge );
      this.caseDetailsPanelForm.get( 'gender' ).setValue( this.getSelectedTestReqForm.patientGender );
      this.genderSelected = this.getSelectedTestReqForm.patientGender;
      this.caseDetailsPanelForm.get( 'phoneNo' ).setValue( this.getSelectedTestReqForm.patientPhoneNumber );
      this.caseDetailsPanelForm.get( 'address' ).setValue( this.getSelectedTestReqForm.patientAddress );
      this.POEStateFilteredOptions = this.caseDetailsPanelForm.get( 'state' ).valueChanges
        .pipe(
          startWith( '' ),
          map( value =>
            this.POEStateFilter( value ) )
        );
      this.caseDetailsPanelForm.get( 'state' ).setValue( this.getSelectedTestReqForm.patientProvince );

      const defaultSelectedPatientCounty = this.provinceListArray.filter( item => item.province_name == this.getSelectedTestReqForm.patientProvince );
      if ( defaultSelectedPatientCounty.length != 0 ) {

        const POECountyDupPatientArray = await this.CommonService.getDistrictList( defaultSelectedPatientCounty[0].province_id );

        this.POECountyPatientArray = [...new Set( POECountyDupPatientArray.map( ( {
          district_id
        } ) => district_id ) )].map( e => POECountyDupPatientArray.find( ( {
          district_id
        } ) => district_id == e ) );
        console.log( this.POECountyPatientArray );
      }
      this.POECountyPatientFilteredOptions = this.caseDetailsPanelForm.get( 'county' ).valueChanges
        .pipe(
          startWith( '' ),
          map( value =>
            this.POECountyPatientFilter( value ) )
        );
      this.caseDetailsPanelForm.get( 'county' ).setValue( this.getSelectedTestReqForm.patientDistrict );
      this.caseDetailsPanelForm.get( 'zone' ).setValue( this.getSelectedTestReqForm.patientZone );
      this.caseDetailsPanelForm.get( 'city' ).setValue( this.getSelectedTestReqForm.patientCity );
      this.caseDetailsPanelForm.get( 'nationality' ).setValue( this.getSelectedTestReqForm.patientNationalityName );
      this.caseDetailsPanelForm.get( 'passportNumber' ).setValue( this.getSelectedTestReqForm.patientPassportNumber );

      this.specimenInfoPanelForm.get( 'typeOfTestRequest' ).setValue( this.getSelectedTestReqForm.testTypeRequested );
      // this.specimenInfoPanelForm.get( 'reasonForTestReq' ).setValue( this.getSelectedTestReqForm.reasonForCovid19Test );

      if (this.getSelectedTestReqForm.reasonForCovid19Test) {
        console.log('reasonForCovid19Test');
        let reasonforrequest = this.covid19InitArray['covid19ReasonsForTestingList'].filter(item => item.value == this.getSelectedTestReqForm.reasonForCovid19Test);
        
        if (reasonforrequest.length != 0) {
          this.reasonforrequested = reasonforrequest[0].show ? reasonforrequest[0].show : '';
          console.log('reasonForCovid19Test', this.reasonforrequested);
        }
        this.specimenInfoPanelForm.get('reasonForTestReq').setValue(this.reasonforrequested);
      }

      this.specimenInfoPanelForm.get( 'sampleCollectionDateTime' ).setValue( this.dateTimeFormat2( new Date( this.getSelectedTestReqForm.sampleCollectionDate ) ) );
      this.specimenInfoPanelForm.get( 'specimenType' ).setValue(this.getSelectedTestReqForm.specimenType);
      this.specimenInfoPanelForm.get( 'testNumber' ).setValue( parseInt( this.getSelectedTestReqForm.testNumber ) );

      this.labResultPanelForm.get( 'sampleReceivedDateTime' ).setValue( this.getSelectedTestReqForm.sampleReceivedDate ? this.dateTimeFormat2( new Date( this.getSelectedTestReqForm.sampleReceivedDate ) ) : '' );
      // this.labResultPanelForm.get( 'labName' ).setValue( this.getSelectedTestReqForm.labName);
      if (this.getSelectedTestReqForm.labId) {
        console.log('labId');
        let testingLabs = this.initArray['testingLabsList'].filter(item => item.value == this.getSelectedTestReqForm.labId);
        
        if (testingLabs.length != 0) {
          this.testingLab = testingLabs[0].show ? testingLabs[0].show : '';
          console.log('labId', this.testingLab);
        }
        this.labResultPanelForm.get('labName').setValue(this.testingLab);
      }
      this.labResultPanelForm.get( 'specimenQuality' ).setValue( this.getSelectedTestReqForm.sampleCondition ? this.getSelectedTestReqForm.sampleCondition : '' );
      this.labResultPanelForm.get( 'labTechnician' ).setValue( this.getSelectedTestReqForm.labTechnicianName ? this.getSelectedTestReqForm.labTechnicianName : '' );
      this.labResultPanelForm.get( 'sampleRejected' ).setValue( this.getSelectedTestReqForm.isSampleRejected ? this.getSelectedTestReqForm.isSampleRejected : '' );
      if ( this.getSelectedTestReqForm.isSampleRejected ) {
        this.previousRejectedValue = this.getSelectedTestReqForm.isSampleRejected;
      }
      this.labResultPanelForm.get( 'rejectionReason' ).setValue( this.getSelectedTestReqForm.rejectionReason ? this.getSelectedTestReqForm.rejectionReason : '' );
      this.labResultPanelForm.get( 'rejectionDate' ).setValue( this.getSelectedTestReqForm.rejectionDate ? new Date( this.getSelectedTestReqForm.rejectionDate ) : '' );
      this.labResultPanelForm.get( 'reasonForChanging' ).setValue( this.getSelectedTestReqForm.reasonForCovid19ResultChanges ? this.getSelectedTestReqForm.reasonForCovid19ResultChanges : '' );


      this.labResultPanelForm.get( 'testedBy' ).setValue( this.getSelectedTestReqForm.testedByName ? this.getSelectedTestReqForm.testedByName : '' );
      this.labResultPanelForm.get( 'resultAuthorized' ).setValue( this.getSelectedTestReqForm.isResultAuthorized ? this.getSelectedTestReqForm.isResultAuthorized : '' );
      this.labResultPanelForm.get( 'authorizedBy' ).setValue( this.getSelectedTestReqForm.authorizedBy ? this.getSelectedTestReqForm.authorizedBy : '' );
      this.labResultPanelForm.get( 'authorizedOn' ).setValue( this.getSelectedTestReqForm.authorizedOn ? new Date( this.getSelectedTestReqForm.authorizedOn ) : '' );

      this.labResultPanelForm.get( 'finalResult' ).setValue( this.getSelectedTestReqForm.idresult ? this.getSelectedTestReqForm.idresult : '' );
      await this.sql.create( {
        name: 'vlsm_mobile.db',
        location: 'default'
      } ).then( ( db: SQLiteObject ) => {
        return new Promise( ( resolve, reject ) => {

          db.executeSql( 'SELECT * FROM covid19_tests where unique_id=?', [this.getSelectedTestReqForm.uniqueId] ).then( async data => {

            this.c19TestsArray = [];
            const selectedc19TestsLength = data.rows.length;
            for ( let i = 0; i < selectedc19TestsLength; i++ ) {
              const outerItem = data.rows.item( i );
              this.c19TestsArray.push( outerItem );
            }

            resolve( this.c19TestsArray );

            this.getSelectedTestReqForm.c19Tests = await this.getKeyItemsArray( this.c19TestsArray );

            if ( this.getSelectedTestReqForm.c19Tests ) {
              this.testDetailsArray = this.getSelectedTestReqForm.c19Tests;
              if ( this.testDetailsArray.length != 0 ) {
                this.editTestDetails( this.testDetailsArray );
              }
            }

            this.viewResultArray[0].c19Tests = await this.getKeyItemsArray( this.c19TestsArray );
            // this.viewResultArray[0].c19Tests[0].showTestResult = this.getSelectedTestReqForm.showTestResult;
            if (this.viewResultArray[0].c19Tests && this.viewResultArray[0].c19Tests.length > 0) {
              this.viewResultArray[0].c19Tests[0].showTestResult = this.getSelectedTestReqForm.showTestResult;
            } 
          } ).catch( e => {
            console.log( e );
          } );
        } );
      } );

    } );


  }

  async onChangePOEState( $event, form ) {

    if ( form == 'siteInfoPanelForm' ) {
      this.siteInfoPanelForm.get( 'POECounty' ).setValue( '' );
      this.siteInfoPanelForm.get( 'POE' ).setValue( '' );
      const selectedCounty = this.provinceListArray.filter( item => item.province_name == $event.option.value );
      const POECountyDupArray = await this.CommonService.getDistrictList( selectedCounty[0].province_id );

      this.POECountyArray = [...new Set( POECountyDupArray.map( ( {
        district_id
      } ) => district_id ) )].map( e => POECountyDupArray.find( ( {
        district_id
      } ) => district_id == e ) );
      console.log( this.POECountyArray );

    } else if ( form == 'caseDetailsPanelForm' ) {
      this.caseDetailsPanelForm.get( 'county' ).setValue( '' );
      this.caseDetailsPanelForm.get( 'city' ).setValue( '' );
      const selectedPatientCounty = this.provinceListArray.filter( item => item.province_name == $event.option.value );
      const POECountyPatientDupArray = await this.CommonService.getDistrictList( selectedPatientCounty[0].province_id );

      this.POECountyPatientArray = [...new Set( POECountyPatientDupArray.map( ( {
        district_id
      } ) => district_id ) )].map( e => POECountyPatientDupArray.find( ( {
        district_id
      } ) => district_id == e ) );
      console.log( this.POECountyPatientArray );
    }

    this.POECountyFilteredOptions = this.siteInfoPanelForm.get( 'POECounty' ).valueChanges
      .pipe(
        startWith( '' ),
        map( value =>
          this.POECountyFilter( value ) )
      );
    this.POECountyPatientFilteredOptions = this.caseDetailsPanelForm.get( 'county' ).valueChanges
      .pipe(
        startWith( '' ),
        map( value =>
          this.POECountyPatientFilter( value ) )
      );
  }

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

    this.initArray = await this.storage.get( 'initArray' );
    if ( this.initArray ) {
      this.covid19InitArray = this.initArray.covid19;
    }

    this.provinceListArray = await this.CommonService.getProvinceList();
    this.labNameArray = this.initArray.testingLabsList.filter(item => item.test_type === 'covid19');
    console.log(this.labNameArray);
    

    this.sourceOfAlertFilteredOptions = this.siteInfoPanelForm.get( 'sourceOfAlert' ).valueChanges
      .pipe(
        startWith( '' ),
        map( value =>
          this.sourceOfAlertFilter( value ) )
      );
    this.POEStateFilteredOptions = this.siteInfoPanelForm.get( 'POEState' ).valueChanges
      .pipe(
        startWith( '' ),
        map( value =>
          this.POEStateFilter( value ) )
      );

    this.implementPartnerFilteredOptions = this.siteInfoPanelForm.get( 'implementingPartner' ).valueChanges
      .pipe(
        startWith( '' ),
        map( value =>
          this.implementPartnerFilter( value ) )
      );
    this.fundingPartnerFilteredOptions = this.siteInfoPanelForm.get( 'fundingPartner' ).valueChanges
      .pipe(
        startWith( '' ),
        map( value =>
          this.fundingPartnerFilter( value ) )
      );
    this.testingLabFilteredOptions = this.siteInfoPanelForm.get( 'testingLab' ).valueChanges
      .pipe(
        startWith( '' ),
        map( value =>
          this.testingLabFilter( value ) )
      );
    console.log(this.testingLabFilteredOptions)
    this.POEStateFilteredOptions = this.caseDetailsPanelForm.get( 'state' ).valueChanges
      .pipe(
        startWith( '' ),
        map( value =>
          this.POEStateFilter( value ) )
      );
    this.nationalityFilteredOptions = this.caseDetailsPanelForm.get( 'nationality' ).valueChanges
      .pipe(
        startWith( '' ),
        map( value =>
          this.nationalityFilter( value ) )
      );
    this.labTechnicianFilteredOptions = this.labResultPanelForm.get( 'labTechnician' ).valueChanges
      .pipe(
        startWith( '' ),
        map( value =>
          this.labTechnicianFilter( value ) )
      );
    this.testedByFilteredOptions = this.labResultPanelForm.get( 'testedBy' ).valueChanges
      .pipe(
        startWith( '' ),
        map( value =>
          this.labTechnicianFilter( value ) )
      );
    this.authorizedByFilteredOptions = this.labResultPanelForm.get( 'authorizedBy' ).valueChanges
      .pipe(
        startWith( '' ),
        map( value =>
          this.labTechnicianFilter( value ) )
      );
  }

  async searchPatient() {

    await this.storage.remove("selectedPatient");
    this.router.navigate(['select-patient-details',
      {
        'data': this.caseDetailsPanelForm.get('search').value
      }
    ]);

  }

  calAge() {
    const convertAge = new Date( this.caseDetailsPanelForm.controls.dob.value );
    const timeDiff = Math.abs( Date.now() - convertAge.getTime() );
    this.caseDetailsPanelForm.get( 'age' ).setValue( Math.floor( ( timeDiff / ( 1000 * 3600 * 24 ) ) / 365 ) );
    this.maxSampleCollectionDate = convertAge;
    const month = this.formatDate( this.maxSampleCollectionDate.getMonth() + 1 );
    const day = this.formatDate( this.maxSampleCollectionDate.getDate() );
    this.maxSampleCollectionDate = this.maxSampleCollectionDate.getFullYear() + '-' + month + '-' + day + 'T' + '00' + ':' + '00';
    console.log( this.maxSampleCollectionDate, 'maxSampleCollectionDate' );
  }

  // mat auto complete filters start

  sourceOfAlertFilter( val: string ): string[] {
    return this.covid19InitArray.sourceOfAlertList.map( x => x.show ).filter( option =>
      option.toLowerCase().includes( val.toLowerCase() ) );
  }

  // POEStateFilter( val: string ): string[] {
  //   return this.provinceListArray.map( x => x.province_name )?.filter( option =>
  //     option.toLowerCase().includes( val.toLowerCase() ) );

  // }

  POEStateFilter(val: string): string[] {
    if (!val) {
      return this.provinceListArray.map(x => x.province_name).filter(Boolean);
    }
  
    return this.provinceListArray
      .map(x => x.province_name)
      .filter(option => option && option.toLowerCase().includes(val.toLowerCase()));
  }
  
  
  

  POECountyFilter( val: string ): string[] {
    return this.POECountyArray.map( x => x.district_name ).filter( option =>
      option.toLowerCase().includes( val.toLowerCase() ) );
  }

  POECountyPatientFilter( val: string ): string[] {
    return this.POECountyPatientArray.map( x => x.district_name ).filter( option =>
      option.toLowerCase().includes( val.toLowerCase() ) );
  }

  POEFilter( val: string ): string[] {
    return this.POEArray.map( x => x.facility_name ).filter( option =>
      option.toLowerCase().includes( val.toLowerCase() ) );
  }

  implementPartnerFilter( val: string ): string[] {
    return this.initArray.implementingPartnerList.map( x => x.show ).filter( option =>
      option.toLowerCase().includes( val.toLowerCase() ) );
  }

  fundingPartnerFilter( val: string ): string[] {
    return this.initArray.fundingSourceList.map( x => x.show ).filter( option =>
      option.toLowerCase().includes( val ) );
  }

  testingLabFilter( val: string ): string[] {
    return this.initArray.testingLabsList.map( x => x.show ).filter( option =>
      option.toLowerCase().includes( val.toLowerCase() ) );
  }

  // nationalityFilter( val: string ): string[] {
  //   return this.initArray.nationalityList.map( x => x.show ).filter( option =>
  //     option.toLowerCase().includes( val.toLowerCase() ) );
  // }

  nationalityFilter(val: string): string[] {
    if (!val) {
      return this.initArray['nationalityList'].map(x => x.show).filter(Boolean);
    }
  
    return this.initArray['nationalityList']
      .map(x => x.show)
      .filter(option => option && option.toLowerCase().includes(val.toLowerCase()));
  }

  labTechnicianFilter( val: string ): string[] {
    return this.initArray.labTechniciansList.map( x => x.show ).filter( option =>
      option.toLowerCase().includes( val.toLowerCase() ) );
  }

  // mat auto complete filters end

  nextStepSiteInfo( isSiteInfoFormVaild ) {
    if ( isSiteInfoFormVaild ) {
      this.step = 1;
    }
  }

  nextStepCaseDetails( isCaseDetailsFormValid ) {
    if ( isCaseDetailsFormValid ) {
      this.step = 2;
    }
  }

  nextStepSpecimenInformation( isSpecimenInfoFormValid ) {
    if ( isSpecimenInfoFormValid ) {
      this.step = 3;
    }
  }

  goToViewResult() {
    this.step = 4;
  }

  dateFormat( dateObj ) {

    const month = new Array();
    month[0] = 'Jan';
    month[1] = 'Feb';
    month[2] = 'Mar';
    month[3] = 'Apr';
    month[4] = 'May';
    month[5] = 'Jun';
    month[6] = 'Jul';
    month[7] = 'Aug';
    month[8] = 'Sep';
    month[9] = 'Oct';
    month[10] = 'Nov';
    month[11] = 'Dec';
    return this.formattedDate = ( '0' + ( dateObj.getDate() ) ).slice( -2 ) + '-' + ( month[dateObj.getMonth()] ) + '-' + ( dateObj.getFullYear() );

  }

  dateTimeFormat2( dateObj ) {
    this.formattedDateTime2 = '';
    return this.formattedDateTime2 = dateObj.getFullYear() + '-' + ( '0' + ( dateObj.getMonth() + 1 ) ).slice( -2 ) + '-' + ( '0' + ( dateObj.getDate() ) ).slice( -2 ) + 'T' + ( '0' + dateObj.getHours() ).slice( -2 ) + ':' + ( '0' + dateObj.getMinutes() ).slice( -2 ) + ':00';
  }

  dateTimeFormat( dateObj ) {

    const month = new Array();
    month[0] = 'Jan';
    month[1] = 'Feb';
    month[2] = 'Mar';
    month[3] = 'Apr';
    month[4] = 'May';
    month[5] = 'Jun';
    month[6] = 'Jul';
    month[7] = 'Aug';
    month[8] = 'Sep';
    month[9] = 'Oct';
    month[10] = 'Nov';
    month[11] = 'Dec';

    const mydate = ( new Date( dateObj ) );

    return this.formattedDateTime = ( '0' + ( mydate.getDate() ) ).slice( -2 ) + '-' + ( month[mydate.getMonth()] ) + '-' + ( mydate.getFullYear() ) + ' ' + ( '0' + mydate.getHours() ).slice( -2 ) + ':' + ( '0' + mydate.getMinutes() ).slice( -2 ) + ':00';

  }



  isOptionDisabled(): boolean{
    return this.mode === 'view' || this.mode === 'result edit';
  }

  isOptionDisableds(): boolean{
    return this.mode === 'view' ;
  }

  async saveCovid19AddSouthSudanForm( isSiteInfoFormVaild, isCaseDetailsFormValid, isSpecimenInfoFormValid, isLabResultFormValid, isAddOrUpdate ) {
    console.log( isSiteInfoFormVaild, isCaseDetailsFormValid, isSpecimenInfoFormValid, isLabResultFormValid, isAddOrUpdate );
    if ( !isSiteInfoFormVaild ) {
      this.step = 0;
      for ( const inner in this.siteInfoPanelForm.controls ) {
        this.siteInfoPanelForm.get( inner ).markAsTouched();
        this.siteInfoPanelForm.get( inner ).updateValueAndValidity();
      }
      for ( const inner in this.caseDetailsPanelForm.controls ) {
        this.caseDetailsPanelForm.get( inner ).markAsTouched();
        this.caseDetailsPanelForm.get( inner ).updateValueAndValidity();
      }
      for ( const inner in this.specimenInfoPanelForm.controls ) {
        this.specimenInfoPanelForm.get( inner ).markAsTouched();
        this.specimenInfoPanelForm.get( inner ).updateValueAndValidity();
      }
    } else if ( !isCaseDetailsFormValid ) {
      this.step = 1;
      for ( const inner in this.caseDetailsPanelForm.controls ) {
        this.caseDetailsPanelForm.get( inner ).markAsTouched();
        this.caseDetailsPanelForm.get( inner ).updateValueAndValidity();
      }
      for ( const inner in this.specimenInfoPanelForm.controls ) {
        this.specimenInfoPanelForm.get( inner ).markAsTouched();
        this.specimenInfoPanelForm.get( inner ).updateValueAndValidity();
      }
    } else if ( !isSpecimenInfoFormValid ) {
      this.step = 2;
      for ( const inner in this.specimenInfoPanelForm.controls ) {
        this.specimenInfoPanelForm.get( inner ).markAsTouched();
        this.specimenInfoPanelForm.get( inner ).updateValueAndValidity();
      }
    } else if ( this.isTestingUser == 'no' ) {
      this.step = 2;
      isLabResultFormValid = true;
    } else if ( this.isTestingUser == 'yes' ) {

      if ( !isSpecimenInfoFormValid ) {
        this.step = 2;
        for ( const inner in this.specimenInfoPanelForm.controls ) {
          this.specimenInfoPanelForm.get( inner ).markAsTouched();
          this.specimenInfoPanelForm.get( inner ).updateValueAndValidity();
        }
      } else {
        this.step = 3;
        if ( this.labResultPanelForm.controls.sampleRejected.value ) {
          for ( const inner in this.labResultPanelForm.controls ) {
            this.labResultPanelForm.get( inner ).markAsTouched();
            this.labResultPanelForm.get( inner ).updateValueAndValidity();
          }
        } else {
          isLabResultFormValid = true;
        }
      }
    }

    if ( isLabResultFormValid && this.labResultPanelForm.controls.sampleRejected.value == 'no' ) {

      const testValuesArray = this.labResultPanelForm.value.testArray;
      this.testDetails = [];
      testValuesArray.forEach( ( element, index ) => {

        this.testDetails.push( {
          testName: element.testMethod,
          testDate: this.dateTimeFormat( element.dateOfTesting ),
          testingPlatform: element.testPlatform,
          kitLotNo: element.kitLotNo,
          kitExpiryDate: this.dateTimeFormat( element.kitExpiryDate ),
          testResult: parseInt( element.testResult )
        } );
      } );
    }

    for (var i = 0; i < this.covid19InitArray['rejectedReasonList'].length; i++) {
      let filteredRejectionReason = this.covid19InitArray['rejectedReasonList'][i].reasons.filter((item) => item.show == this.labResultPanelForm.controls.rejectionReason.value);

      if (filteredRejectionReason.length > 0) {
        this.rejectionReasonId = filteredRejectionReason[0] ? filteredRejectionReason[0].value : '';
        console.log(this.rejectionReasonId);
        this.rejectionReason = this.labResultPanelForm.controls.rejectionReason.value;
        console.log(this.rejectionReason);
       
      }
    }

    if ( isSiteInfoFormVaild && isCaseDetailsFormValid && isSpecimenInfoFormValid && isLabResultFormValid ) {
      this.submitted = true;

      this.loginDetails = await this.storage.get( 'loginDetails' );

      if ( isAddOrUpdate == 'add' ) {

        let offTestReqID;
        let count = await this.storage.get( 'lastappSampleCode' );
        if ( this.offTestReqID ) {
          count = this.offTestReqID;
        }
        if ( count == null ) {
          count = 1;
        } else {
          const parts = count.slice( -3 );
          if ( parts == 'NaN' ) {
            count = 1;
          }
          else {
            const lastCount = count.slice( -4 );
            count = +lastCount + 1;
          }
          // var lastCount = count.slice(-4);
          // count = +lastCount + 1;
        }
        const currentDate = new Date();
        this.offTestReqID = 'AC19';
        this.offTestReqID += Math.random().toString( 36 ).slice( 2, 4 ).toUpperCase();
        this.offTestReqID += ( currentDate.getFullYear().toString() ).slice( -2 );
        this.offTestReqID += ( '0' + ( currentDate.getMonth() + 1 ) ).slice( -2 );
        offTestReqID += ( currentDate.getDate() + 1 < 9 ? '0' : '' ) + ( currentDate.getDate() ).toString();
        this.offTestReqID += ( '000' + count.toString() ).slice( -4 );
        offTestReqID = this.offTestReqID;

        // offTestReqID += (currentDate.getFullYear().toString()).slice(2); // 2011
        // offTestReqID += (currentDate.getMonth() + 1 < 9 ? '0' : '') + (currentDate.getMonth() + 1).toString(); // JS months are 0-based, so +1 and pad with 0's AEID2021120001 AEID2112290003
        // offTestReqID += (currentDate.getDate() + 1 < 9 ? '0' : '') + (currentDate.getDate()).toString();
        // offTestReqID += ('000' + count.toString()).slice(-4);

        this.createdOn = this.dateTimeFormat( new Date );
        this.isSynced = false;

      } else {

        this.updatedOn = this.dateTimeFormat( new Date );
        this.offTestReqID = this.appSampleCode;
        console.log( 'offTestReqID', this.offTestReqID );
        this.isSynced = false;
      }

      const filteredSourceOfAlert = this.covid19InitArray.sourceOfAlertList.filter( item =>
        item.show == this.siteInfoPanelForm.controls.sourceOfAlert.value );
      if ( filteredSourceOfAlert.length != 0 ) {
        this.sourceOfAlertID = filteredSourceOfAlert[0] ? filteredSourceOfAlert[0].value : '';
      }


      const filteredPOEState = this.provinceListArray.filter( item =>
        item.province_name == this.siteInfoPanelForm.controls.POEState.value );
      if ( filteredPOEState.length != 0 ) {
        this.provinceID = filteredPOEState[0] ? filteredPOEState[0].province_id : '';
      }

      const filteredPOECounty = this.POECountyArray.filter( item =>
        item.district_name == this.siteInfoPanelForm.controls.POECounty.value );
      if ( filteredPOECounty.length != 0 ) {
        this.districtID = filteredPOECounty[0] ? filteredPOECounty[0].district_id : '';
      }

      const filteredImpPartner = this.initArray.implementingPartnerList.filter( item => item.show == this.siteInfoPanelForm.controls.implementingPartner.value );
      if ( filteredImpPartner.length != 0 ) {
        this.implementingPartnerID = filteredImpPartner[0] ? filteredImpPartner[0].value : '';
      }

      const filteredFundingSource = this.initArray.fundingSourceList.filter( item => item.show == this.siteInfoPanelForm.controls.fundingPartner.value );
      if ( filteredFundingSource.length != 0 ) {
        this.fundingSourceID = filteredFundingSource[0] ? filteredFundingSource[0].value : '';
      }

      const filteredPatientState = this.provinceListArray.filter( item =>
        item.province_name == this.caseDetailsPanelForm.controls.state.value );
      if ( filteredPatientState.length != 0 ) {
        this.patientStateID = filteredPatientState[0] ? filteredPatientState[0].province_id : '';
      }

      const filteredPatientCounty = this.POECountyArray.filter( item =>
        item.district_name == this.caseDetailsPanelForm.controls.county.value );
      if ( filteredPatientCounty.length != 0 ) {
        this.patientDistrictID = filteredPatientCounty[0] ? filteredPatientCounty[0].district_id : '';
      }

      const filteredNationality = this.initArray.nationalityList.filter( item =>
        item.show == this.caseDetailsPanelForm.controls.nationality.value );
      if ( filteredNationality.length != 0 ) {
        this.nationalityID = filteredNationality[0] ? filteredNationality[0].value : '';
      }

      const selectedFacility = this.POEArray.filter( item => item.facility_name == this.siteInfoPanelForm.controls.POE.value );
      if ( selectedFacility.length != 0 ) {
        this.facilityId = selectedFacility[0].facility_id;
      }

      if ( this.isTestingUser == 'no' ) {

        const filteredTestLabRecord = this.initArray.testingLabsList.filter( item =>
          item.show == this.siteInfoPanelForm.controls.testingLab.value );
        this.labId = filteredTestLabRecord[0] ? filteredTestLabRecord[0].value : '';
        this.labName = this.siteInfoPanelForm.controls.testingLab.value;
      } else {

        let filteredTestLabRecord = this.initArray['testingLabsList'].filter(item =>
          item.show == this.labResultPanelForm.controls.labName.value);
        this.labId = filteredTestLabRecord[0] ? filteredTestLabRecord[0].value : '';
        this.labName = this.labResultPanelForm.controls.labName.value;
  

        // const filteredTestLabRecord2 = this.initArray.testingLabsList.filter( item =>
        //   item.value == parseInt( this.labResultPanelForm.controls.labName.value ) ); 
        // this.labId = filteredTestLabRecord2[0] ? filteredTestLabRecord2[0].show : '';
        // this.labName = this.labResultPanelForm.controls.labName.value ? this.labResultPanelForm.controls.labName.value : '';
      }

      const reasonForTestReqs = this.covid19InitArray.covid19ReasonsForTestingList.filter( item => item.show == this.specimenInfoPanelForm.controls.reasonForTestReq.value );
      if ( reasonForTestReqs.length != 0 ) {
        this.reasonForTestRequest = reasonForTestReqs[0] ? reasonForTestReqs[0].value : '';
      }

      const filteredLabTechnicianRecord = this.initArray.labTechniciansList.filter( item => item.show == this.labResultPanelForm.controls.labTechnician.value );
      if ( filteredLabTechnicianRecord.length != 0 ) {
        this.labTechnicianID = filteredLabTechnicianRecord[0] ? filteredLabTechnicianRecord[0].value : '';
      }

      const filteredTestedByRecord = this.initArray.labTechniciansList.filter( item => item.show == this.labResultPanelForm.controls.testedBy.value );
      if ( filteredTestedByRecord.length != 0 ) {
        this.testedByID = filteredTestedByRecord[0] ? filteredTestedByRecord[0].value : '';
      }
      if ( this.labResultPanelForm.controls.resultAuthorized.value == 'Yes' ) {
        const filteredAuthorizedByRecord = this.initArray.labTechniciansList.filter( item => item.show == this.labResultPanelForm.controls.AuthorizedBy.value );
        if ( filteredAuthorizedByRecord.length != 0 ) {
          this.authorizedByID = filteredAuthorizedByRecord[0] ? filteredAuthorizedByRecord[0].value : '';
        }
      }
      if ( isAddOrUpdate == 'add' ) {

      }


      const saveCovid19SSJSON =

      {
        user_id: this.userID,
        uniqueId: this.uniqueId ? this.uniqueId : Math.random().toString( 36 ).substring( 2, 15 ) + Math.random().toString( 36 ).substring( 2, 15 ) + Math.random().toString( 36 ).substring( 2, 15 ),
        appSampleCode: this.offTestReqID,
        covid19_id: this.covid19_id ? this.covid19_id : null,
        sampleCode: this.sampleCode ? this.sampleCode : '',
        remoteSampleCode: this.remoteSampleCode ? this.remoteSampleCode : '',
        createdOn: this.createdOn,
        updatedOn: this.updatedOn ? this.updatedOn : '',
        isSynced: this.isSynced,
        authToken: this.loginDetails.api_token,
        formId: this.loginDetails.form,
        sourceOfAlertPOE: this.siteInfoPanelForm.controls.sourceOfAlert.value,
        provinceId: this.provinceID,
        provinceName: this.siteInfoPanelForm.controls.POEState.value,
        district: this.siteInfoPanelForm.controls.POECounty.value,
        districtId: this.districtID,
        facilityId: this.facilityId,
        facilityName: this.siteInfoPanelForm.controls.POE.value,
        implementingPartner: this.implementingPartnerID ? this.implementingPartnerID : '',
        // "implementingPartnerName": this.siteInfoPanelForm.controls.implementingPartner.value,
        fundingSource: this.fundingSourceID ? this.fundingSourceID : '',
        // "fundingSourceName": this.siteInfoPanelForm.controls.fundingPartner.value,
        labId: this.labId,
        labName: this.labName,


        patientId: this.caseDetailsPanelForm.controls.caseID.value,
        externalSampleCode: this.caseDetailsPanelForm.controls.DHIS2CaseID.value,
        firstName: this.caseDetailsPanelForm.controls.firstName.value,
        lastName: this.caseDetailsPanelForm.controls.lastName.value,
        patientDob: this.caseDetailsPanelForm.controls.dob.value ? this.dateFormat( new Date( this.caseDetailsPanelForm.controls.dob.value ) ) : '',
        patientAge: this.caseDetailsPanelForm.controls.age.value,
        patientGender: this.caseDetailsPanelForm.controls.gender.value,
        patientPhoneNumber: this.caseDetailsPanelForm.controls.phoneNo.value,
        patientAddress: this.caseDetailsPanelForm.controls.address.value,
        patientProvince: this.caseDetailsPanelForm.controls.state.value,
        patientProvinceId: this.patientStateID ? this.patientStateID : '',
        patientDistrict: this.caseDetailsPanelForm.controls.county.value,
        patientDistrictId: this.patientDistrictID ? this.patientDistrictID : '',
        patientZone: this.caseDetailsPanelForm.controls.zone.value,
        patientCity: this.caseDetailsPanelForm.controls.city.value,
        patientNationality: this.nationalityID ? this.nationalityID : '',
        patientNationalityName: this.caseDetailsPanelForm.controls.nationality.value,
        patientPassportNumber: this.caseDetailsPanelForm.controls.passportNumber.value,



        testTypeRequested: this.specimenInfoPanelForm.controls.typeOfTestRequest.value,
        reasonForCovid19Test: this.reasonForTestRequest,
        sampleCollectionDate: this.dateTimeFormat( this.specimenInfoPanelForm.controls.sampleCollectionDateTime.value ),
        specimenType: this.specimenInfoPanelForm.controls.specimenType.value,
        testNumber: this.specimenInfoPanelForm.controls.testNumber.value,


        sampleReceivedDate: this.labResultPanelForm.controls.sampleReceivedDateTime.value ? this.dateTimeFormat( new Date( this.labResultPanelForm.controls.sampleReceivedDateTime.value ) ) : '',
        sampleCondition: this.labResultPanelForm.controls.specimenQuality.value ? this.labResultPanelForm.controls.specimenQuality.value : '',
        labTechnician: this.labTechnicianID ? this.labTechnicianID : '',
        labTechnicianName: this.labResultPanelForm.controls.labTechnician.value ? this.labResultPanelForm.controls.labTechnician.value : '',
        isSampleRejected: this.labResultPanelForm.controls.sampleRejected.value ? this.labResultPanelForm.controls.sampleRejected.value : '',
        rejectionDate: this.labResultPanelForm.controls.rejectionDate.value ? this.dateFormat( new Date( this.labResultPanelForm.controls.rejectionDate.value ) ) : '',
        reasonForChanging: this.labResultPanelForm.controls.reasonForChanging.value ? this.labResultPanelForm.controls.reasonForChanging.value : '',
        rejectionReason: this.rejectionReason ? this.rejectionReason : '',
        rejectionReasonid: this.rejectionReasonId ? this.rejectionReasonId : '',

        c19Tests: this.testDetails,
        result: this.labResultPanelForm.controls.finalResult.value ? this.labResultPanelForm.controls.finalResult.value : '',
        testedBy: this.testedByID ? this.testedByID : '',
        testedByName: this.labResultPanelForm.controls.testedBy.value ? this.labResultPanelForm.controls.testedBy.value : '',
        isResultAuthorized: this.labResultPanelForm.controls.resultAuthorized.value ? this.labResultPanelForm.controls.resultAuthorized.value : '',
        authorizedBy: this.labResultPanelForm.controls.authorizedBy.value ? this.labResultPanelForm.controls.authorizedBy.value : '',
        authorizedOn: this.labResultPanelForm.controls.authorizedOn.value ? this.dateFormat( new Date( this.labResultPanelForm.controls.authorizedOn.value ) ) : ''

      };

      console.log( saveCovid19SSJSON, 'saveCovid19SSJSON' );
      this.db.insertCovid19Data( saveCovid19SSJSON, isAddOrUpdate );

      if ( this.mode == undefined ) {
        for ( const inner in this.siteInfoPanelForm.controls ) {
          this.siteInfoPanelForm.get( inner ).setValue( '' );
          this.siteInfoPanelForm.get( inner ).setErrors( null );
        }
        for ( const inner in this.caseDetailsPanelForm.controls ) {
          this.caseDetailsPanelForm.get( inner ).setValue( '' );
          this.caseDetailsPanelForm.get( inner ).setErrors( null );
        }
        for ( const inner in this.specimenInfoPanelForm.controls ) {
          this.specimenInfoPanelForm.get( inner ).setValue( '' );
          this.specimenInfoPanelForm.get( inner ).setErrors( null );
        }
        for ( const inner in this.labResultPanelForm.controls ) {
          // this.labResultPanelForm.get( inner ).setValue( '' );
          this.labResultPanelForm.get( inner ).setErrors( null );
        }
      }

    }
  }

  loadStaticArrays() {
    this.testNumberArray = [{
      name: '1',
      value: 1
    },
    {
      name: '2',
      value: 2
    },
    {
      name: '3',
      value: 3
    },
    {
      name: '4',
      value: 4
    },
    {
      name: '5',
      value: 5
    },
    ];
    this.genderArray = [{
      name: 'Male',
      value: 'male'
    },
    {
      name: 'Female',
      value: 'female'
    },
    {
      name: 'Other',
      value: 'other'
    }
    ];
  }



  setStep( index: number ) {
    this.step = index;
  }

  prevStep() {
    this.step--;
  }

  clearDOB() {
    this.caseDetailsPanelForm.get( 'dob' ).setValue( '' );
    this.caseDetailsPanelForm.get( 'age' ).setValue( '' );
  }

  clearSampleCollection() {
    this.specimenInfoPanelForm.get( 'sampleCollectionDateTime' ).setValue( '' );
  }

  clearSampleReceived() {
    this.labResultPanelForm.get( 'sampleReceivedDateTime' ).setValue( '' );
  }

  clearRejection() {
    this.labResultPanelForm.get( 'rejectionDate' ).setValue( '' );
  }

  clearDateOfTesting( testIndex ) {
    this.testArray().at( testIndex ).patchValue( {
      dateOfTesting: '',
    } );
  }

  goBack() {

    const routerSplitURL = this.router.url.split( ';' );
    if ( ( this.router.url === '/covid19-add-southsudan' && ( this.siteInfoPanelForm.dirty || this.caseDetailsPanelForm.dirty || this.specimenInfoPanelForm.dirty || this.labResultPanelForm.dirty ) ) ||
      ( routerSplitURL[1] == 'data_mode=edit' && ( this.siteInfoPanelForm.dirty || this.caseDetailsPanelForm.dirty || this.specimenInfoPanelForm.dirty || this.labResultPanelForm.dirty ) ) ) {

      this.alertService.confirmAlert( 'VLSM', 'Are you sure you want to go back? Because the data you have entered will be lost', 'addEditForm' );

    } else {
      this.router.navigate( [this.previousPageURL], {
        replaceUrl: true
      } );
    }
  }
  maxmindate() {
    this.maxDate = new Date();
    const month = this.formatDate( this.maxDate.getMonth() + 1 );
    const day = this.formatDate( this.maxDate.getDate() );
    const hour = this.maxDate.getHours();
    const minute = this.maxDate.getMinutes();
    this.maxDatetime = this.maxDate.getFullYear() + '-' + month + '-' + day + 'T' + hour + ':' + minute;
    console.log( this.maxDatetime, 'maxDateTime' );
    // this.maxDate = new Date();
    // var month = this.formatDate(this.maxDate.getMonth());
    // var day = this.formatDate(this.maxDate.getDate());
    // var hour = this.maxDate.getHours();
    // var minute = this.maxDate.getMinutes();
    // this.maxDatetime = this.maxDate.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + minute;
  }

  private formatDate( nmbr: number ): string {
    let date = nmbr + '';
    date = ( date.length < 2 ) ? '0' + date : date;
    return date;
  }

  onChangeReasonForRejection() {
    for ( let i = 0; i < this.covid19InitArray.rejectedReasonList.length; i++ ) {
      const filteredRejectionReason = this.covid19InitArray.rejectedReasonList[i].reasons.filter( item =>
        item.show == this.labResultPanelForm.controls.rejectionReason.value );

      if ( filteredRejectionReason.length > 0 ) {
        this.rejectionReasonId = filteredRejectionReason[0] ? filteredRejectionReason[0].value : '';
        this.rejectionReason = this.labResultPanelForm.controls.rejectionReason.value;
        break;
      }
    }
  }
  onChangeTestMethod( testIndex ) {
    this.testArray().at( testIndex ).patchValue( {
      kitLotNo: '',
      kitExpiryDate: '',
      testPlatform: ''
    } );

  }
  setMaxSampleReceivedDate() {
    this.maxSampleReceivedDate = new Date( this.specimenInfoPanelForm.controls.sampleCollectionDateTime.value );
    const month = this.formatDate( this.maxSampleReceivedDate.getMonth() + 1 );
    const day = this.formatDate( this.maxSampleReceivedDate.getDate() );
    this.maxSampleReceivedDate = this.maxSampleReceivedDate.getFullYear() + '-' + month + '-' + day + 'T' + '00' + ':' + '00';
    console.log( this.maxSampleReceivedDate, 'setMaxSampleReceivedDate' );
  }
  setMaxSampleTestDate() {

    this.maxSampleTestDate = new Date( this.labResultPanelForm.controls.sampleReceivedDateTime.value );
    console.log( this.maxSampleTestDate, 'setMaxSampleTestDate', this.maxDate );
  }
}
