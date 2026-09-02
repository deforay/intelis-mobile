import { ViewChild } from '@angular/core';
import { Component, OnInit, NgZone } from '@angular/core';
import { UntypedFormControl, FormGroupDirective, NgForm, Validators, FormBuilder, UntypedFormGroup, FormArray, FormControl, ControlValueAccessor, NgControl, FormGroup, } from '@angular/forms';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Observable } from 'rxjs';
import { CrudOperationsService, ToastService, LoaderService, Events, AlertService, } from '../../../service/providers';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';
import { ErrorStateMatcher } from '@angular/material/core';
import { Storage } from '@ionic/storage-angular';
import { LocalTestRequestFormService } from '../../../service/localTestRequestForm/local-Test-Request-Form.service';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../../../services/db.service';
import { CommonService } from '../../../service/common/common.service';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';
import { MatFormFieldControl } from '@angular/material/form-field';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: UntypedFormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'drc-app-add-new-request',
  templateUrl: './drc-add-new-request.page.html',
  styleUrls: ['./drc-add-new-request.page.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: DRCAddNewRequestPage },
  ],
})
export class DRCAddNewRequestPage implements OnInit {
  matcher = new MyErrorStateMatcher();
  submitted: boolean = false;
  isMenuOrBackButton: any;
  reason:any;
  reasonsArray: any[] = [];
  maxDate: Date;
  zones:any;
  maxDatetime: string;
  appVersionNumber: any;
  testNumberArray: any = [];
  loginDetails: any;
  covid19InitArray: any = [];
  POECountyArray: any = [];
  POEPatientCountyArray: any = [];
  genderArray: any = [];
  selectedPatientDetail: any;
  genderSelected: any;
  samplingSelected: any;
  getSelectedTestReqForm: any;
  POEArray: any = [];
  selectedCaseDefinition: string = 'Diagnostique';
  reasonForCovidTest: any;
  ProvinceFilteredOptions: Observable<string[]>;
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
  // specimenInfoPanelForm = new UntypedFormGroup({
  //   typeOfTestRequest: new UntypedFormControl('', []),
  //   reasonForTestReq: new UntypedFormControl('', [Validators.required]),

  //   specimenType: new UntypedFormControl('', [Validators.required]),
  //   testNumber: new UntypedFormControl('', []),
  // });

  mode: any;
  previousPageURL: any;
  step: number;
  titleHeader: string;
  userID: any;
  isTestingUser: any;
  isToggled: boolean;
  maxSampleCollectionDate: any;
  initArray: any;
  provinceListArray: any;
  zoneArray: any;
  filteredZones: Observable<string[]>;
  facilitiesListArray: any;
  POECountyPatientArray: any;
  keyItemsArray: any;
  keyItemsArray2: any;
  keyItemsArray3: any;
  testedByID: any;
  rejectionReasonId: string = '';
  labTechnicianID: any;
  rejectionReason: string = '';
  testDetails: any;
  userTestSampleRejectedArray: any = [];
  testDetails2: any;
  testDetails3: any;
  viewResultArray: any = [];
  isNoRecord: boolean;
  sampleCode: any;
  remoteSampleCode: any;
  uniqueId: any;
  createdOn: any;
  userTestRequestOrgArray: any = [];
  userTestPendingResultArray: any = [];
  appSampleCode: any;
  covid19_id: any;
  implementingPartnerName: any;
  previousRejectedValue: any;
  c19TestsArray: any[];
  c19ReasonArray: any = [];
  c19SymptomArray: any = [];
  testDetailsArray: any = [];
  testDetailsArray2: any = [];
  testDetailsArray3: any = [];
  formattedDate: string;
  formattedDateTime2: string;
  formattedDateTime: string;
  skeltonArray: any = [];
  offTestReqID: any;
  isSynced: boolean;
  updatedOn: string;
  sourceOfAlertID: any;
  provinceID: any;
  patientProvinceID: any;
  districtID: any;
  implementingPartnerID: any;
  fundingSourceID: any;
  patientStateID: any;
  patientDistrictID: any;
  totalRequestsCount: number;
  isNoRecordText: string;
  nationalityID: any;
  facilityId: any;
  labId: any;
  reviewed:any;
  userTestResultArray: any = [];
  review:any;
  loggedUserArray: any = [];
  userTestRequestArray: any = [];
  labName: any;
  samplingFilteredOptions: Observable<string[]>;
  maxSampleTestDate: any;
  minSampleCollectedDate: any;
  maxSampleReceivedDate: any;
  outerLength: number;
  maxSampleReceivedDates: any;
  testingLab: any;
  maxsamplereceiveddata:any;
  specimenTypeArray: any;
  labNameArray: any;
  samplingArray: any;
  rejectedReasonList: any;
  typeOfTestRequestList: any;
  resultsList: any = [];
  countryList: any = [];
  districtList: any = [];
  symptomsList: any[] = [
    { show: 'Fever', symptom: '' },
    { show: 'Cough', symptom: '' },
    { show: 'Tiredness', symptom: '' },
    { show: 'Loss of taste or smell', symptom: '' },
    // add other symptoms here
  ];
  covid19PatientSymptomsArray: any = [];
  maxSampleReceivedDateTime: string;
  CassuspectdeCOVID: UntypedFormGroup;
  CasprobabledeCOVID: UntypedFormGroup;
  CascontactdeCOVID: UntypedFormGroup;
  CasconfirmedeCOVID: UntypedFormGroup;
  CascontactdeCOVIDS: UntypedFormGroup;
  maxSampleTestDateTime: string;
  labResultPanelForm: FormGroup;
  travelandContactPanelForm: FormGroup;
  caseDefinitionsPanelForm: FormGroup;
  vitalSignsPanelForm: FormGroup;
  caseDetailsPanelForm: FormGroup;
  siteInfoPanelForm: FormGroup;
  selectedReason: any;
  symptomSelected: any;
  

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
    private zone: NgZone,
    public CommonService: CommonService) {
    
    actRoute.params.subscribe(val => {
      // put the code from `ngOnInit` here
      this.siteInfoPanelForm = new FormGroup({
        sampleID: new UntypedFormControl('', []),
        sampling: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        province: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),

        healthZone: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
       
        facilityName: new FormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
       
       
        
        sourceOfAlert: new UntypedFormControl('', []),
        fundingPartner: new UntypedFormControl('', []),
        implementingPartner: new UntypedFormControl('', []),
        testingLab: new UntypedFormControl('', []),
        POEState: new UntypedFormControl(''),
        POECounty: new UntypedFormControl(''),
        POE: new UntypedFormControl(''),
      });
      this.caseDetailsPanelForm = new FormGroup({
        search: new UntypedFormControl('', []),
       
        patientId: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
        DHIS2CaseID: new UntypedFormControl('', []),
       
        firstName: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
        lastName: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        dob: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        patientAge: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
       
        patientGender: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
       
        isPatientPregnant: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        patientPhoneNumber: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
        patientEmail: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
    
     
        patientAddress: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
    

        patientProvince: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

       
        patientDistrict: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        patientZone: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
     

        patientNationality: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
       
       
        phoneNo: new UntypedFormControl('', []),
        address: new UntypedFormControl('', []),
        state: new UntypedFormControl('', []),
        county: new UntypedFormControl('', []),
        zone: new UntypedFormControl('', []),
        city: new UntypedFormControl('', []),
        nationality: new UntypedFormControl('', []),
        passportNumber: new UntypedFormControl('', []),
      });

      this.caseDefinitionsPanelForm = new FormGroup({
        reasonForCovid19Test: new UntypedFormControl('', [Validators.required]),
        reasonArray: this.fb.array([]),
      });

      this.vitalSignsPanelForm = new FormGroup({
        symptomDetected: new UntypedFormControl('', []),
        itemIndex: new UntypedFormControl('', []),
        symptomArray: this.fb.array([]),
       

        feverTemp: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        temperatureMeasurementMethod: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        respiratoryRate: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        
        oxygenSaturation: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        specimenType: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
       
        numberOfDaysSick: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
        dateOfInitialConsultation: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
        asymptomatic: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
        
        
        fever: new UntypedFormControl('', []),
        tiredness: new UntypedFormControl('', []),
        lossOfTasteOrSmell: new UntypedFormControl('', []),
        weightLoss: new UntypedFormControl('', []),
        convulsions: new UntypedFormControl('', []),
        lethargy: new UntypedFormControl('', []),
        headAche: new UntypedFormControl('', []),
        soreThroat: new UntypedFormControl('', []),
        rhinitis: new UntypedFormControl('', []),
        cough: new UntypedFormControl('', []),
        difficultBreathing: new UntypedFormControl('', []),
        nausea: new UntypedFormControl('', []),
        musclePain: new UntypedFormControl('', []),
        asthenia: new UntypedFormControl('', []),
        diarrhea: new UntypedFormControl('', []),
        medicalBackground: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
        recentHospitalization: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        patientLivesWithChildren: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
      
        patientCaresForChildren: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
       
        
       
        dateOfSymptomOnset: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),

        closeContacts: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
      
       
      
        sampleCollectionDate: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, [Validators.required]),
        sampleDispatchedOn: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
     
      });

      this.travelandContactPanelForm = new FormGroup({
        hasRecentTravelHistory: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        countryName: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        returnDate: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        airline: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        seatNo: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
      
        arrivalTime: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        airportOfDeparture: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        transit: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        reasonOfVisit: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
       
        patientOccupation: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        doesPatientSmoke: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

      });
      this.labResultPanelForm = this.fb.group({
        sampleReceivedDateTime: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),

        sampleCondition: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        labName: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        sampleRejected: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        rejectionReason: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        rejectionDate: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        reviewedBy: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        
        resultAuthorized: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
       
        authorizedBy: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
       
        authorizedOn: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
       
        
        
        approvedBy: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        approvedOn: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        
        
           
        reviewedOn: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' || this.mode === 'result edit'
        }, []),
        testingLab: new FormControl('', []),
        specimenQuality: new FormControl('', []),
        labTechnician: new FormControl('', []),
        testedBy: new FormControl('', []),
        
        result: new UntypedFormControl({
          value: '',
          disabled: this.mode === 'view' 
        }, []),
        reasonForChanging: new FormControl('', []),
        testArray: this.fb.array([]),
      });

    });
    this.loadStaticArrays();

    this.mode = this.actRoute.snapshot.params['data_mode'];

    if (this.actRoute.snapshot.params['previuosPageURL']) {
      this.previousPageURL = this.actRoute.snapshot.params['previuosPageURL'];
    }
    if (
      (this.mode == 'edit' ||
        this.mode == 'view' ||
        this.mode == 'result edit') &&
      this.mode != undefined
    ) {
      if (this.mode == 'result edit') {
        this.step = 3;
      }
      this.isMenuOrBackButton = 'back';
      this.titleHeader =
        this.mode + ' ' + 'COVID-19 VIRUS LABORATORY TEST REQUEST FORM';
    } else {
      this.isMenuOrBackButton = 'menu';
      this.mode = 'add';
      this.titleHeader =
        this.mode + ' ' + 'COVID-19 VIRUS LABORATORY TEST REQUEST FORM';
    }
    this.maxmindate();
  }
  value: any;
  stateChanges: Observable<void>;
  id: string;
  placeholder: string;
  ngControl: NgControl;
  focused: boolean;
  empty: boolean;
  shouldLabelFloat: boolean;
  required: boolean;
  disabled: boolean;
  errorState: boolean;
  controlType?: string;
  autofilled?: boolean;
  userAriaDescribedBy?: string;
  setDescribedByIds(ids: string[]): void {
    throw new Error('Method not implemented.');
  }
  onContainerClick(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  radioChange(event: MatRadioChange) {
    this.selectedCaseDefinition = event.value;
    console.log(this.selectedCaseDefinition);
  
    if (this.selectedCaseDefinition === 'Diagnostique') {
      // Reset the checkboxes of all other case definitions
      this.CassuspectdeCOVID.reset();
      this.CasprobabledeCOVID.reset();
      this.CasconfirmedeCOVID.reset();
      this.CascontactdeCOVID.reset();
    } else {
      // Uncheck "Diagnostique" when another option is selected
      this.CascontactdeCOVIDS.get('opt1').setValue(false);
    }
  }

  onDiagnostiqueChange(event: MatCheckboxChange) {
    // Handle checkbox changes
    const isChecked = event.checked;
  
    if (isChecked) {
      this.selectedCaseDefinition = 'Diagnostique'; // Set selected case to Diagnostique
      this.caseDefinitionsPanelForm.get('reasonForCovid19Test').setValue('Diagnostique'); // Set value for the form
    } else {
      // If Diagnostique is unchecked, reset its selection state
      if (this.selectedCaseDefinition === 'Diagnostique') {
        this.selectedCaseDefinition = null; // Clear selection if unchecked
        this.caseDefinitionsPanelForm.get('reasonForCovid19Test').reset(); // Reset the form control
      }
    }
  }
  
  
  
  
  OnChangeAsymptomatic(event: MatSelectChange) {
    if (event.value === 'yes') {
      // If asymptomatic, disable symptom controls
      this.symptomsList.forEach(symptom => {
        const controlName = this.getFormControlName(symptom.show);
        if (controlName) {
          this.vitalSignsPanelForm.get(controlName).disable();
        }
      });
    } else {
      // If not asymptomatic, enable symptom controls
      this.symptomsList.forEach(symptom => {
        const controlName = this.getFormControlName(symptom.show);
        if (controlName) {
          this.vitalSignsPanelForm.get(controlName).enable();
        }
      });
    }
  }


  
  addSymptomValue(event: MatSelectChange, item, i) {
    console.log('symptomsList:', this.symptomsList);
    console.log('event:', event);
    console.log('item:', item);
    console.log('i:', i);

    // Check if symptomsList is defined and not empty
    if (this.symptomsList && this.symptomsList.length > 0) {
      for (let j = 0; j < this.symptomsList.length; j++) {
        console.log('symptomsList element:', this.symptomsList[j]);
        if (this.symptomsList[j] && this.symptomsList[j].show === item.show) {
          this.symptomsList[j].symptom = event.value;
        }
      }
      console.log('Updated symptomsList:', this.symptomsList);
    } else {
      console.error('symptomsList is undefined or empty');
    }
  }

  // addSymptomValue(event: MatSelectChange, item, i) {
  //   console.log('symptomsList:', this.symptomsList);
  //   console.log('event:', event);
  //   console.log('item:', item);
  //   console.log('i:', i);
  
  //   // Check if symptomsList is defined and not empty
  //   if (this.symptomsList && this.symptomsList.length > 0) {
  //     for (let j = 0; j < this.symptomsList.length; j++) {
  //       console.log('symptomsList element:', this.symptomsList[j]);
  //       if (this.symptomsList[j] && this.symptomsList[j].show === item.show) {
  //         this.symptomsList[j].symptom = event.value;
  //       }
  //     }
  //     console.log('Updated symptomsList:', this.symptomsList);
  //   } else {
  //     console.error('symptomsList is undefined or empty');
  //   }
  // }
  

  // addSymptomValue(event: MatSelectChange, item, i) {
  //   console.log(this.vitalSignsPanelForm.controls.symptomDetected.value,'symptoDetected',event.value,item, i, this.symptomSelected[i]);

  //   for (let i = 0; i < this.symptomsList.length; i++) {
  //     if (item.show == this.symptomsList[i].show) {
  //       this.symptomsList[i].symptom = event.value;
  //     }
  //   }
  //   console.log(this.symptomsList);
  // }



  // ionViewWillLeave() {
  //   if (this.mode == 'add') {
  //     for (let inner in this.siteInfoPanelForm.controls) {
  //       this.siteInfoPanelForm.get(inner).setValue('');
  //       this.siteInfoPanelForm.get(inner).setErrors(null);
  //     }
  //     for (let inner in this.caseDetailsPanelForm.controls) {
  //       this.caseDetailsPanelForm.get(inner).setValue('');
  //       this.caseDetailsPanelForm.get(inner).setErrors(null);
  //     }
  //     for (let inner in this.caseDefinitionsPanelForm.controls) {
  //       this.caseDefinitionsPanelForm.get(inner).setValue('');
  //       this.caseDefinitionsPanelForm.get(inner).setErrors(null);
  //     }
  //     console.log(this.vitalSignsPanelForm.controls, 'vitalPanel');
  //     for (let inner in this.vitalSignsPanelForm.controls) {
  //       this.vitalSignsPanelForm.get(inner).setValue('');
  //       this.vitalSignsPanelForm.get(inner).setErrors(null);
  //     }
  //     for (let inner in this.travelandContactPanelForm.controls) {
  //       this.travelandContactPanelForm.get(inner).setValue('');
  //       this.travelandContactPanelForm.get(inner).setErrors(null);
  //     }
  //     for (let inner in this.labResultPanelForm.controls) {
  //       this.labResultPanelForm.get(inner).setValue('');
  //       this.labResultPanelForm.get(inner).setErrors(null);
  //     }
  //   }
  //   this.storage.remove('selectedPatient');
     
  // }

  ionViewWillLeave() {
    if (this.mode == 'add') {
      // Reset siteInfoPanelForm
      this.resetFormControls(this.siteInfoPanelForm);
      
      // Reset caseDetailsPanelForm
      this.resetFormControls(this.caseDetailsPanelForm);
      
      // Reset caseDefinitionsPanelForm
      this.resetFormControls(this.caseDefinitionsPanelForm);
      
      console.log(this.vitalSignsPanelForm.controls, 'vitalPanel');
      
      // Reset vitalSignsPanelForm
      this.resetFormControls(this.vitalSignsPanelForm);
      
      // Reset travelandContactPanelForm
      this.resetFormControls(this.travelandContactPanelForm);
      
      // Reset labResultPanelForm
      this.resetFormControls(this.labResultPanelForm);
    }
    this.storage.remove('selectedPatient');
  }
  
  private resetFormControls(form: FormGroup) {
    Object.keys(form.controls).forEach(controlName => {
      const control = form.get(controlName);
      if (control instanceof FormArray) {
        // If it's a FormArray, reset each control inside it
        control.clear(); // Clear the FormArray
      } else {
        // Reset value and errors for FormGroup controls
        control.setValue('');
        control.setErrors(null);
      }
    });
  }
  




  onChangeReasonForRejection() {
    for (var i = 0; i < this.covid19InitArray['rejectedReasonList'].length; i++) {
      let filteredRejectionReason = this.covid19InitArray['rejectedReasonList'][i].reasons.filter((item) => item.show == this.labResultPanelForm.controls.rejectionReason.value);

      if (filteredRejectionReason.length > 0) {
        this.rejectionReasonId = filteredRejectionReason[0] ? filteredRejectionReason[0].value : '';
        console.log(this.rejectionReasonId);
        this.rejectionReason = this.labResultPanelForm.controls.rejectionReason.value;
        console.log(this.rejectionReason);
        break;
      }
    }
  }

  
  
  onChangeTestMethod(testIndex) {
    this.testArray().at(testIndex).patchValue({ kitLotNo: '', kitExpiryDate: '', testPlatform: '', });
  }

  setMinSampleCollectedDate() {
    this.minSampleCollectedDate = new Date(this.vitalSignsPanelForm.controls.dateOfInitialConsultation.value);
    var month = this.formatDate(this.minSampleCollectedDate.getMonth() + 1);
    var day = this.formatDate(this.minSampleCollectedDate.getDate());
    this.minSampleCollectedDate = this.minSampleCollectedDate.getFullYear() + '-' + month + '-' + day + 'T' + '00' + ':' + '00';
    console.log(this.minSampleCollectedDate, 'setMinSampleCollectedDate');
  }
  setMaxSampleReceivedDate() {
    this.maxSampleReceivedDate = new Date(this.vitalSignsPanelForm.controls.sampleCollectionDate.value);
    var month = this.formatDate(this.maxSampleReceivedDate.getMonth() + 1);
    var day = this.formatDate(this.maxSampleReceivedDate.getDate());
    this.maxSampleReceivedDate = this.maxSampleReceivedDate.getFullYear() + '-' + month + '-' + day + 'T' + '00' + ':' + '00';
    console.log(this.maxSampleReceivedDate, 'setMaxSampleReceivedDate', this.vitalSignsPanelForm.controls.sampleCollectionDate.value);
  }




  setMaxSamplereviewedOn(){
    this.maxSampleReceivedDates = new Date(this.labResultPanelForm.controls.reviewedOn.value);
    var month = this.formatDate(this.maxSampleReceivedDates.getMonth() + 1);
    var day = this.formatDate(this.maxSampleReceivedDates.getDate());
    this.maxSampleReceivedDates = this.maxSampleReceivedDates.getFullYear() + '-' + month + '-' + day + 'T' + '00' + ':' + '00';
    console.log(this.maxSampleReceivedDates, 'setMaxSamplereviewedOn', this.labResultPanelForm.controls.reviewedOn.value);

  }

  setMaxSampleapprovedOn(){
    this.maxSampleReceivedDate = new Date(this.labResultPanelForm.controls.approvedOn.value);
    var month = this.formatDate(this.maxSampleReceivedDate.getMonth() + 1);
    var day = this.formatDate(this.maxSampleReceivedDate.getDate());
    this.maxSampleReceivedDate = this.maxSampleReceivedDate.getFullYear() + '-' + month + '-' + day + 'T' + '00' + ':' + '00';
    console.log(this.maxSampleReceivedDate, 'setMaxSampleReceivedDate', this.labResultPanelForm.controls.approvedOn.value);

  }

  setMaxSampleTestDate() {
    this.maxSampleTestDate = new Date(this.labResultPanelForm.controls.sampleReceivedDateTime.value);
    var month = this.formatDate(this.maxSampleTestDate.getMonth() + 1);
    var day = this.formatDate(this.maxSampleTestDate.getDate());
    this.maxSampleTestDateTime = this.maxSampleTestDate.getFullYear() + '-' + month + '-' + day + 'T' + '00' + ':' + '00';
    console.log(this.maxSampleTestDate, 'setMaxSampleTestDate', this.maxDate);
  }
  clearSampleCollection() {
    this.vitalSignsPanelForm.get('sampleCollectionDate').setValue('');
  }

  clearSampleReceived() {
    this.labResultPanelForm.get('sampleReceivedDateTime').setValue('');
  }

  clearRejection() {
    this.labResultPanelForm.get('rejectionDate').setValue('');
  }

  clearDateOfTesting(testIndex) {
    this.testArray().at(testIndex).patchValue({
      dateOfTesting: '',
    });
  }
  async ionViewWillEnter() {
    this.step = 0;
    if (this.mode == 'result edit') {
      this.step = 3;
    }
    this.labResultPanelForm = this.fb.group({
      testArray: this.fb.array([]),
      sampleReceivedDateTime: new UntypedFormControl('', []),
      sampleCondition: new UntypedFormControl('', []),
      labName: new UntypedFormControl('', []),
      labTechnician: new UntypedFormControl('', []),
      sampleRejected: new UntypedFormControl('no', []),
      rejectionReason: new UntypedFormControl('', []),
      rejectionDate: new UntypedFormControl('', []),
      resultAuthorized: new UntypedFormControl('', []),
      authorizedBy: new UntypedFormControl('', []),
      authorizedOn: new UntypedFormControl('', []),
      reviewedBy: new UntypedFormControl('', []),
      reviewedOn: new UntypedFormControl('', []),
      approvedBy: new UntypedFormControl('', []),
      approvedOn: new UntypedFormControl('', []),
      result: new UntypedFormControl('', []),
      reasonForChanging: new UntypedFormControl('', []),
      testingLab: new UntypedFormControl('', []),
      specimenQuality: new UntypedFormControl('', []),
      testedBy: new UntypedFormControl('', []),
    });
    this.CassuspectdeCOVID = this.fb.group({
      opt1: false,
      opt2: false,
      opt3: false,
      opt4: false,
      opt5: false,
      opt6: false,
      opt7: false,
    });
    this.CasprobabledeCOVID = this.fb.group({
      opt1: false,
      opt2: false,
      opt3: false,
    });
    this.CasconfirmedeCOVID = this.fb.group({
      opt1: false,
    });
    this.CascontactdeCOVID = this.fb.group({
      opt1: false,
    });
    this.CascontactdeCOVIDS = this.fb.group({
      opt1: false,
    });
    await this.getInitArray();

    if (this.mode == 'add') {
      this.testArray().push(this.newTest());
    }
    await this.storage.create();

    this.isToggled = false;
    if (this.actRoute.snapshot.paramMap.get('searchText')) {
      this.caseDetailsPanelForm.get('search').setValue(this.actRoute.snapshot.paramMap.get('searchText'));
    }
    if (await this.storage.get('selectedPatient') && this.caseDetailsPanelForm.get('search').value) {
      this.getSelectedPatientDetails();
    }

    if (this.mode == 'edit' || this.mode == 'view' || this.mode == 'result edit') {
      this.editSelectedTestReqForm();
    }

    await this.storage.get('loginDetails').then(async (loginDetails) => {
      if (loginDetails) {
        this.userID = loginDetails.user.user_id;
        this.isTestingUser = loginDetails.user.testing_user;
      }
    });

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

  ngOnInit() {

    this.labResultPanelForm = this.fb.group({
      sampleReceivedDateTime: new FormControl('', []),
      sampleCondition: new FormControl('', []),
      labName: new FormControl('', [Validators.required]),
      sampleRejected: new FormControl('', []),
      rejectionReason: new FormControl('', []),
      rejectionDate: new FormControl('', []),
      reviewedBy: new FormControl('', []),
      resultAuthorized: new FormControl('', []),
      authorizedBy: new FormControl('', []),
      authorizedOn: new FormControl('', []),
      approvedBy: new FormControl('', []),
      approvedOn: new FormControl('', []),
      reviewedOn: new FormControl('', []),
      testingLab: new FormControl('', []),
      specimenQuality: new FormControl('', []),
      labTechnician: new FormControl('', []),
      testedBy: new FormControl('', []),
      result: new FormControl('', []),
      reasonForChanging: new FormControl('', []),
      testArray: this.fb.array([]),
    });
    this.vitalSignsPanelForm = this.fb.group({
      symptomDetected: new UntypedFormControl('', []),
      itemIndex: new UntypedFormControl('', []),
      symptomArray: this.fb.array([]),
      feverTemp: new UntypedFormControl('', []),
      temperatureMeasurementMethod: new UntypedFormControl('', []),
      respiratoryRate: new UntypedFormControl('', []),
      oxygenSaturation: new UntypedFormControl('', []),
      specimenType: new UntypedFormControl('', []),
      numberOfDaysSick: new UntypedFormControl('', []),
      dateOfInitialConsultation: new UntypedFormControl('', []),
      asymptomatic: new UntypedFormControl('', []),
      fever: new UntypedFormControl('', []),
      tiredness: new UntypedFormControl('', []),
      lossOfTasteOrSmell: new UntypedFormControl('', []),
      weightLoss: new UntypedFormControl('', []),
      convulsions: new UntypedFormControl('', []),
      lethargy: new UntypedFormControl('', []),
      headAche: new UntypedFormControl('', []),
      soreThroat: new UntypedFormControl('', []),
      rhinitis: new UntypedFormControl('', []),
      cough: new UntypedFormControl('', []),
      difficultBreathing: new UntypedFormControl('', []),
      nausea: new UntypedFormControl('', []),
      musclePain: new UntypedFormControl('', []),
      asthenia: new UntypedFormControl('', []),
      diarrhea: new UntypedFormControl('', []),
      medicalBackground: new UntypedFormControl('', []),
      recentHospitalization: new UntypedFormControl('', []),
      patientLivesWithChildren: new UntypedFormControl('', []),
      patientCaresForChildren: new UntypedFormControl('', []),
      dateOfSymptomOnset: new UntypedFormControl('', []),
      closeContacts: new UntypedFormControl('', []),
      sampleCollectionDate: new UntypedFormControl('', []),
      sampleDispatchedOn: new UntypedFormControl('', []),
    });
    this.step = 0;
    if (this.mode == 'result edit') {
      this.step = 3;
    }
  }

  testArray(): FormArray {
    return this.labResultPanelForm.get('testArray') as FormArray;
  }
  
  symptomArray(): FormArray {
    return this.vitalSignsPanelForm.get('symptomArray') as FormArray;
  }
  reasonArray(): FormArray {
    return this.caseDefinitionsPanelForm.get('reasonArray') as FormArray;
  }
  newTest(): UntypedFormGroup {
    return this.fb.group({
      testMethod: [{value: '', disabled: this.mode === 'view'}],
      dateOfTesting: [{value: '', disabled: this.mode === 'view'}],
      testResult: [{value: '', disabled: this.mode === 'view'}],
    });
  }
  newSymptom(): UntypedFormGroup {
    return this.fb.group({
      covid19_id: '',
      symptom_id: '',
      symptom_detected: '',
      symptom_details: '',
    });
  }
  async editTestDetails(testDetailsArray) {
    await this.getKeyItemsArray(testDetailsArray);

    await this.keyItemsArray.forEach((item, index) => {
      this.testArray().removeAt(index);
      this.testArray().push(this.newTest());
      this.zone.run(() => {
        this.testArray().at(index).patchValue({
          test_id: item.test_id,
          covid19_id: item.covid19_id,
          facility_id: item.facility_id,
          testMethod: item.testName,
          dateOfTesting: this.dateTimeFormat2(new Date(item.testDate)),
          kitLotNo: item.kitLotNo,
          kitExpiryDate: new Date(item.kitExpiryDate),
          testPlatform: item.testingPlatform,
          testResult: item.testResult,
        });
      });

    });
  }
  async editTestDetails2(testDetailsArray2) {
    await this.getKeyItemsArray2(testDetailsArray2);

    await this.keyItemsArray.forEach((item, index) => {
      this.reasonArray().removeAt(index);
      this.reasonArray().push(this.newTest());
      this.zone.run(() => {
        this.reasonArray().at(index).patchValue({
          covid19_id: item.covid19_id,
          reasons_id: item.reasons_id,
          reasons_detected: item.reasons_detected,
          reasons_details: item.reasons_details,
        });
      });
    });
  }

  async editTestDetails3(testDetailsArray3) {
    await this.getKeyItemsArray3(testDetailsArray3);

    console.log(this.keyItemsArray3,'keyItwma');
    await this.keyItemsArray3.forEach((item, index) => {
      this.symptomArray().removeAt(index);
      this.symptomArray().push(this.newSymptom());
      this.symptomArray().at(index).patchValue({
        covid19_id: item.covid19_id,
        symptom_id: item.symptom_id,
        symptom_detected: item.symptom_detected,
        symptom_details: item.symptom_details,
      });
    });
  }
  async getKeyItemsArray(testDetailsArray) {
    return (this.keyItemsArray = await testDetailsArray.map(function (item) {
      return {
        testId: item.test_id,
        covid19Id: item.covid19_id,
        facilityId: item.facility_id,
        testName: item.test_name,
        testDate: item.sample_tested_datetime,
        testingPlatform: item.testing_platform,
        kitLotNo: item.kitLotNo,
        kitExpiryDate: item.kitExpiryDate,
        testResult: item.result,
      };
    }));
  }
  async getKeyItemsArray2(testDetailsArray2) {
    console.log(testDetailsArray2,'testDetailsArray2');
    return (this.keyItemsArray2 = await testDetailsArray2.map(function (item) {
      return {
        covid19_id: item.covid19_id,
        reasons_id: item.reasons_id,
        reasons_detected: item.reasons_detected,
        reasons_details: item.reasons_details,
      };
    }));
  }
  async getKeyItemsArray3(testDetailsArray3) {
    console.log(testDetailsArray3,'testDetailsArray3');
    return (this.keyItemsArray3 = await testDetailsArray3.map(function (item) {
      return {
        covid19_id: item.covid19_id,
        symptom_id: item.symptom_id,
        symptom_detected: item.symptom_detected,
        symptom_details: item.symptom_details,
      };
    }));
  }
  getFormArray(): FormArray {
    return this.labResultPanelForm.get('testArray') as FormArray;
  }

  addTest() {
    this.testArray().push(this.newTest());
  }

  removeTest(testIndex: number) {
    this.testArray().removeAt(testIndex);
  }

  getSymptomArray(): FormArray {
    return this.labResultPanelForm.get('testArray') as FormArray;
  }


  isOptionDisabled(): boolean{
    return this.mode === 'view' || this.mode === 'result edit';
  }

  isOptionDisableds(): boolean{
    return this.mode === 'view' ;
  }

  async getSelectedPatientDetails() {
    if ((await this.storage.get('selectedPatient')) && this.caseDetailsPanelForm.get('search').value) {
      this.step = 1;
      this.selectedPatientDetail = await this.storage.get('selectedPatient');
      console.log(this.selectedPatientDetail);
      this.caseDetailsPanelForm.get('patientId').setValue(this.selectedPatientDetail.patient_id);
      this.caseDetailsPanelForm.get('firstName').setValue(this.selectedPatientDetail.patient_name);
      this.caseDetailsPanelForm.get('lastName').setValue(this.selectedPatientDetail.patient_surname);
      this.caseDetailsPanelForm.get( 'dob' ).setValue( this.selectedPatientDetail.patient_dob ? new Date( this.selectedPatientDetail.patient_dob ) : '' );
      this.caseDetailsPanelForm.get( 'patientAge' ).setValue( this.selectedPatientDetail.patient_age );
      this.caseDetailsPanelForm.get( 'patientGender' ).setValue( this.selectedPatientDetail.patient_gender );
      this.genderSelected = this.selectedPatientDetail.patientGender;
      this.caseDetailsPanelForm.get('isPatientPregnant').setValue(this.selectedPatientDetail.isPatientPregnant);
      this.caseDetailsPanelForm.get('phoneNo').setValue(this.selectedPatientDetail.patient_phone_number);
      this.caseDetailsPanelForm.get('patientEmail').setValue(this.selectedPatientDetail.patientEmail);
      this.caseDetailsPanelForm.get('address').setValue(this.selectedPatientDetail.patient_address);
      this.caseDetailsPanelForm.get('patientProvince').setValue(this.selectedPatientDetail.patient_province);
      this.caseDetailsPanelForm.get('patientDistrict').setValue(this.selectedPatientDetail.patient_district);
      this.caseDetailsPanelForm.get('patientNationality').setValue(this.selectedPatientDetail.patient_nationality_name);
    } else {
      this.caseDetailsPanelForm.get('patientId').setValue('');
      this.caseDetailsPanelForm.get('firstName').setValue('');
      this.caseDetailsPanelForm.get('lastName').setValue('');
      this.caseDetailsPanelForm.get('dob').setValue('');
      this.caseDetailsPanelForm.get('patientAge').setValue('');
      this.caseDetailsPanelForm.get('patientGender').setValue('');
      this.genderSelected = '';
      this.caseDetailsPanelForm.get('phoneNo').setValue('');
      this.caseDetailsPanelForm.get('address').setValue('');
      this.caseDetailsPanelForm.get('patientProvince').setValue('');
      this.caseDetailsPanelForm.get('patientDistrict').setValue('');
      this.caseDetailsPanelForm.get('isPatientPregnant').setValue('');
      this.caseDetailsPanelForm.get('patientNationality').setValue('');
    }
  }

  
  

  async editSelectedTestReqForm() {
    this.getSelectedTestReqForm = await this.storage.get('selectedCovid19TestReq');
    console.log('symptomDetected value from getSelectedTestReqForm:', this.getSelectedTestReqForm);

    this.reason= this.getSelectedTestReqForm.reasonForCovid19ResultChanges;
    let reasons = JSON.parse(this.reason)
    
    if (this.reason) {
      let reasons = JSON.parse(this.reason)
      console.log(reasons);
      if (Array.isArray(reasons)) {
          reasons.forEach((item: any) => {
              this.reasonsArray.push(item);
          });
          this.labResultPanelForm.get('reasonForChanging').setValue(reasons[reasons.length - 1]?.reason || '');
      }
    }
 


    this.viewResultArray.push(this.getSelectedTestReqForm);
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
    if ( this.viewResultArray[0].isSampleRejected == 'yes' || this.viewResultArray[0].isSampleRejected == 'no') {
      this.isNoRecord = false;
    } else {
      this.isNoRecord = true;
    }
    console.log( this.getSelectedTestReqForm,'getSelected CovidID');

    // this.sampleCode = this.getSelectedTestReqForm.sampleCode ? this.getSelectedTestReqForm.sampleCode: '';
    if (this.getSelectedTestReqForm.sampleCode) {
      this.sampleCode = this.getSelectedTestReqForm.sampleCode;
    }

    this.remoteSampleCode = this.getSelectedTestReqForm.remoteSampleCode
      ? this.getSelectedTestReqForm.remoteSampleCode
      : '';

    this.uniqueId = this.getSelectedTestReqForm.uniqueId
      ? this.getSelectedTestReqForm.uniqueId
      : '';

    this.createdOn = this.getSelectedTestReqForm.createdOn;
    this.appSampleCode = this.getSelectedTestReqForm.appSampleCode;
    this.covid19_id = this.getSelectedTestReqForm.covid19Id;
    if (this.getSelectedTestReqForm.sourceOfAlertPOE) {
      let sourceOfAlertString = this.getSelectedTestReqForm.sourceOfAlertPOE;
      const sourceOfAlertWord = sourceOfAlertString.split(' ');
      for (let i = 0; i < sourceOfAlertWord.length; i++) {
        sourceOfAlertWord[i] =
          sourceOfAlertWord[i][0].toUpperCase() +
          sourceOfAlertWord[i].slice(1);
      }
      this.siteInfoPanelForm.get('sourceOfAlert').setValue(sourceOfAlertWord.join(' '));
    }

    this.POEStateFilteredOptions = this.siteInfoPanelForm.get('province').valueChanges.pipe(startWith(''), map((value: string) => this.POEStateFilter(value)));
    console.log(this.POEStateFilteredOptions,'testforObe');
    this.siteInfoPanelForm.get('province').setValue(this.getSelectedTestReqForm.provinceName);

    console.log(this.provinceListArray,'listArray');
    let defaultSelectedCounty = this.provinceListArray.filter((item) => item.province_name == this.getSelectedTestReqForm.provinceName);

    if (defaultSelectedCounty.length != 0) {
      let POECountyDupArray = await this.CommonService.getDistrictList(defaultSelectedCounty[0].province_id);

      this.POECountyArray = [ ...new Set(POECountyDupArray.map(({ district_id }) => district_id)), ].map((e) => POECountyDupArray.find(({ district_id }) => district_id == e) );
    }
    this.POECountyFilteredOptions = this.siteInfoPanelForm.get('healthZone').valueChanges.pipe( startWith(''), map((value: string) => this.POECountyFilter(value)) );
    this.siteInfoPanelForm.get('healthZone').setValue(this.getSelectedTestReqForm.district);
    let defaultSelectedCounty1 = this.POECountyArray.filter((item) => item.district_name == this.getSelectedTestReqForm.district);
    if (defaultSelectedCounty1.length != 0) {
      this.POEArray = await this.CommonService.getFacilitiesList(defaultSelectedCounty1[0].district_id);
    }

    this.POEFilteredOptions = this.siteInfoPanelForm
      .get('facilityName')
      .valueChanges.pipe(
        startWith(''),
        map((value: string) => this.POEFilter(value))
      );
    this.siteInfoPanelForm.get('facilityName').setValue(this.getSelectedTestReqForm.facilityName);

    if (this.getSelectedTestReqForm.implementingPartner) {
      let filteredImpPartner = this.initArray['implementingPartnerList'].filter(
        (item) => item.value == this.getSelectedTestReqForm.implementingPartner
      );
      if (filteredImpPartner.length != 0) {
        this.implementingPartnerName = filteredImpPartner[0] ? filteredImpPartner[0].show : '';
      }
      this.siteInfoPanelForm.get('implementingPartner').setValue(this.implementingPartnerName);
    }


    if (this.getSelectedTestReqForm.testNumber) {
      let filteredImpPartner = this.samplingArray.filter(
        (item) => item.value == this.getSelectedTestReqForm.testNumber
      );
      if (filteredImpPartner.length != 0) {
        this.implementingPartnerName = filteredImpPartner[0] ? filteredImpPartner[0].show : '';
      }
      console.log(this.implementingPartnerName)
      this.siteInfoPanelForm.get('sampling').setValue(this.implementingPartnerName);
    }
    this.siteInfoPanelForm.get('healthZone').setValue(this.getSelectedTestReqForm.district);
    this.siteInfoPanelForm.get('facilityName').setValue(this.getSelectedTestReqForm.facilityName);
    // this.siteInfoPanelForm.get('sampling').setValue(this.getSelectedTestReqForm.testNumber);
    this.siteInfoPanelForm.get('sampleID').setValue(this.getSelectedTestReqForm.sampleID);
    this.siteInfoPanelForm.get('fundingPartner').setValue(this.getSelectedTestReqForm.fundingSourceName);
    // this.labResultPanelForm.get('labName').setValue(this.getSelectedTestReqForm.labName);

    this.caseDetailsPanelForm.get('patientId').setValue(this.getSelectedTestReqForm.patientId);
    this.caseDetailsPanelForm.get('firstName').setValue(this.getSelectedTestReqForm.firstName);
    this.caseDetailsPanelForm.get('lastName').setValue(this.getSelectedTestReqForm.lastName);
    this.caseDetailsPanelForm.get('dob').setValue(this.getSelectedTestReqForm.patientDob ? new Date(this.getSelectedTestReqForm.patientDob): '');
    this.caseDetailsPanelForm.get('patientAge').setValue(this.getSelectedTestReqForm.patientAge);
    this.caseDetailsPanelForm.get('patientGender').setValue(this.getSelectedTestReqForm.patientGender);
    this.genderSelected = this.getSelectedTestReqForm.patientGender;
    this.samplingSelected = this.getSelectedTestReqForm.patientGender;
    this.caseDetailsPanelForm.get('patientPhoneNumber').setValue(this.getSelectedTestReqForm.patientPhoneNumber);

    this.caseDetailsPanelForm.get('patientEmail').setValue(this.getSelectedTestReqForm.patientEmail);

    // this.caseDetailsPanelForm.get('patientAddress').setValue(this.getSelectedTestReqForm.patientAddress);
    this.caseDetailsPanelForm.get('patientAddress').setValue(this.getSelectedTestReqForm.patientAddress ? this.getSelectedTestReqForm.patientAddress : '')

    this.caseDetailsPanelForm.get('isPatientPregnant').setValue(this.getSelectedTestReqForm.isPatientPregnant);

    this.caseDetailsPanelForm
      .get('patientProvince')
      .setValue(this.getSelectedTestReqForm.patientProvince);
    this.caseDetailsPanelForm.get('patientZone').setValue(this.getSelectedTestReqForm.patientZone);
    this.caseDetailsPanelForm.get('patientDistrict').setValue(this.getSelectedTestReqForm.patientDistrict);
    this.caseDetailsPanelForm.get('patientNationality').setValue(this.getSelectedTestReqForm.patientNationality);

    this.caseDefinitionsPanelForm.get('reasonForCovid19Test').setValue(this.getSelectedTestReqForm.reasonForCovid19Test);

    this.vitalSignsPanelForm.get('sampleCollectionDate').setValue(this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleCollectionDate)));
    this.vitalSignsPanelForm.get('sampleDispatchedOn').setValue(this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleDispatchedOn)));
    this.vitalSignsPanelForm.get('feverTemp').setValue(this.getSelectedTestReqForm.feverTemp);
    this.vitalSignsPanelForm.get('temperatureMeasurementMethod').setValue(this.getSelectedTestReqForm.temperatureMeasurementMethod);
    this.vitalSignsPanelForm.get('respiratoryRate').setValue(this.getSelectedTestReqForm.respiratoryRate);
    this.vitalSignsPanelForm.get('oxygenSaturation').setValue(this.getSelectedTestReqForm.oxygenSaturation);
    this.vitalSignsPanelForm.get('specimenType').setValue(this.getSelectedTestReqForm.specimenType);
    this.vitalSignsPanelForm.get('numberOfDaysSick').setValue(this.getSelectedTestReqForm.numberOfDaysSick);
    this.vitalSignsPanelForm.get('dateOfSymptomOnset').setValue(this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.dateOfSymptomOnset)));
    this.vitalSignsPanelForm.get('dateOfInitialConsultation').setValue(this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.dateOfInitialConsultation)));
    this.vitalSignsPanelForm.get('asymptomatic').setValue(this.getSelectedTestReqForm.asymptomatic);
    this.symptomsList.map((item) => {
      this.testDetailsArray3.map((item2) => {
        if (item.show === item2.symptom_id) {
          this.vitalSignsPanelForm.get(item.show).setValue(item2.symptom_id);
        }
      });
    });
    

   
    
    
    // this.vitalSignsPanelForm
    //   .get('fever')
    //   .setValue(this.getSelectedTestReqForm.fever);
    // this.vitalSignsPanelForm
    //   .get('weightLoss')
    //   .setValue(this.getSelectedTestReqForm.weightLoss);
    // this.vitalSignsPanelForm
    //   .get('convulsions')
    //   .setValue(this.getSelectedTestReqForm.convulsions);
    // this.vitalSignsPanelForm
    //   .get('lethargy')
    //   .setValue(this.getSelectedTestReqForm.lethargy);
    // this.vitalSignsPanelForm
    //   .get('headAche')
    //   .setValue(this.getSelectedTestReqForm.headAche);
    // this.vitalSignsPanelForm
    //   .get('soreThroat')
    //   .setValue(this.getSelectedTestReqForm.soreThroat);
    // this.vitalSignsPanelForm
    //   .get('cough')
    //   .setValue(this.getSelectedTestReqForm.cough);
    // this.vitalSignsPanelForm
    //   .get('rhinitis')
    //   .setValue(this.getSelectedTestReqForm.rhinitis);
    // this.vitalSignsPanelForm
    //   .get('difficultBreathing')
    //   .setValue(this.getSelectedTestReqForm.difficultBreathing);
    // this.vitalSignsPanelForm
    //   .get('nausea')
    //   .setValue(this.getSelectedTestReqForm.nausea);
    // this.vitalSignsPanelForm
    //   .get('musclePain')
    //   .setValue(this.getSelectedTestReqForm.musclePain);
    // this.vitalSignsPanelForm
    //   .get('asthenia')
    //   .setValue(this.getSelectedTestReqForm.asthenia);
    // this.vitalSignsPanelForm
    //   .get('diarrhea')
    //   .setValue(this.getSelectedTestReqForm.diarrhea);
    this.vitalSignsPanelForm
      .get('medicalBackground')
      .setValue(this.getSelectedTestReqForm.medicalHistory);
    this.vitalSignsPanelForm
      .get('recentHospitalization')
      .setValue(this.getSelectedTestReqForm.recentHospitalization);
    this.vitalSignsPanelForm
      .get('patientLivesWithChildren')
      .setValue(this.getSelectedTestReqForm.patientLivesWithChildren);
    this.vitalSignsPanelForm
      .get('patientCaresForChildren')
      .setValue(this.getSelectedTestReqForm.patientCaresForChildren);
    this.vitalSignsPanelForm
      .get('closeContacts')
      .setValue(this.getSelectedTestReqForm.closeContacts);
    // this.vitalSignsPanelForm.get('feverTemp').setValue(this.getSelectedTestReqForm.feverTemp)
    // this.vitalSignsPanelForm.get('feverTemp').setValue(this.getSelectedTestReqForm.feverTemp)
    // this.vitalSignsPanelForm.get('feverTemp').setValue(this.getSelectedTestReqForm.feverTemp)
    // this.vitalSignsPanelForm.get('feverTemp').setValue(this.getSelectedTestReqForm.feverTemp)

    this.travelandContactPanelForm
      .get('hasRecentTravelHistory')
      .setValue(this.getSelectedTestReqForm.hasRecentTravelHistory);
    this.travelandContactPanelForm
      .get('countryName')
      .setValue(this.getSelectedTestReqForm.countryName);
    this.travelandContactPanelForm
      .get('airline')
      .setValue(this.getSelectedTestReqForm.airline);
    this.travelandContactPanelForm
      .get('seatNo')
      .setValue(this.getSelectedTestReqForm.seatNo);
    this.travelandContactPanelForm
      .get('airportOfDeparture')
      .setValue(this.getSelectedTestReqForm.airportOfDeparture);
    this.travelandContactPanelForm
      .get('transit')
      .setValue(this.getSelectedTestReqForm.transit);
    this.travelandContactPanelForm
      .get('reasonOfVisit')
      .setValue(this.getSelectedTestReqForm.reasonOfVisit);
    this.travelandContactPanelForm
      .get('patientOccupation')
      .setValue(this.getSelectedTestReqForm.patientOccupation);
    this.travelandContactPanelForm
      .get('doesPatientSmoke')
      .setValue(this.getSelectedTestReqForm.doesPatientSmoke);
    this.travelandContactPanelForm
      .get('returnDate')
      .setValue(
        this.getSelectedTestReqForm.returnDate
          ? this.dateTimeFormat2(
            new Date(this.getSelectedTestReqForm.returnDate)
          )
          : ''
      );
    this.travelandContactPanelForm
      .get('arrivalTime')
      .setValue(
        this.getSelectedTestReqForm.dateTimeofArrivalPicker
          ? this.dateTimeFormat2(
            new Date(this.getSelectedTestReqForm.dateTimeofArrivalPicker)
          )
          : ''
      );

    this.labResultPanelForm.get('sampleReceivedDateTime').setValue(this.getSelectedTestReqForm.sampleReceivedDate ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.sampleReceivedDate)) : '');
    if (this.getSelectedTestReqForm.labId) {
      console.log('labId');
      let testingLabs = this.initArray['testingLabsList'].filter(item => item.value == this.getSelectedTestReqForm.labId);
      
      if (testingLabs.length != 0) {
        this.testingLab = testingLabs[0].show ? testingLabs[0].show : '';
        console.log('labId', this.testingLab);
      }
      this.labResultPanelForm.get('labName').setValue(this.testingLab);
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

    // this.labResultPanelForm.get('labName').setValue(this.getSelectedTestReqForm.labName);
    this.labResultPanelForm
      .get('sampleCondition')
      .setValue(
        this.getSelectedTestReqForm.sampleCondition
          ? this.getSelectedTestReqForm.sampleCondition
          : ''
      );
    this.labResultPanelForm
      .get('labTechnician')
      .setValue(
        this.getSelectedTestReqForm.labTechnicianName
          ? this.getSelectedTestReqForm.labTechnicianName
          : ''
      );
    this.labResultPanelForm
      .get('sampleRejected')
      .setValue(
        this.getSelectedTestReqForm.isSampleRejected
          ? this.getSelectedTestReqForm.isSampleRejected
          : ''
      );
    if (this.getSelectedTestReqForm.isSampleRejected) {
      this.previousRejectedValue = this.getSelectedTestReqForm.isSampleRejected;
    }
    this.labResultPanelForm.get('rejectionReason').setValue(this.getSelectedTestReqForm.rejectionReason ? this.getSelectedTestReqForm.rejectionReason: '');

    
    

    this.labResultPanelForm
      .get('rejectionDate')
      .setValue(
        this.getSelectedTestReqForm.rejectionDate
          ? new Date(this.getSelectedTestReqForm.rejectionDate)
          : ''
      );
    // this.labResultPanelForm
    //   .get('reasonForChanging')
    //   .setValue(
    //     this.getSelectedTestReqForm.reasonForCovid19ResultChanges
    //       ? this.getSelectedTestReqForm.reasonForCovid19ResultChanges
    //       : ''
    //   );
    this.labResultPanelForm
      .get('result')
      .setValue(
        this.getSelectedTestReqForm.testResult
          ? this.getSelectedTestReqForm.testResult
          : ''
      );
    
    this.labResultPanelForm.get('testedBy').setValue(this.getSelectedTestReqForm.testedByName ? this.getSelectedTestReqForm.testedByName: '');
    this.labResultPanelForm.get('resultAuthorized').setValue(this.getSelectedTestReqForm.isResultAuthorized ? this.getSelectedTestReqForm.isResultAuthorized: '');
    this.labResultPanelForm.get('authorizedBy').setValue(this.getSelectedTestReqForm.authorizedBy ? this.getSelectedTestReqForm.authorizedBy: '');
    this.labResultPanelForm.get('authorizedOn').setValue(this.getSelectedTestReqForm.authorizedOn ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.authorizedOn)): '');
    this.labResultPanelForm.get('approvedBy').setValue(this.getSelectedTestReqForm.approvedBy ? this.getSelectedTestReqForm.approvedBy: '');
    this.labResultPanelForm.get('approvedOn').setValue(this.getSelectedTestReqForm.approvedOn ? this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.approvedOn)) : '');
    this.labResultPanelForm.get('reviewedBy').setValue(this.review);
    this.labResultPanelForm.get('reviewedOn').setValue(this.getSelectedTestReqForm.reviewedOn ?  this.dateTimeFormat2(new Date(this.getSelectedTestReqForm.reviewedOn)) : '');
    // await this.sql
    //   .create({
    //     name: 'vlsm_mobile.db',
    //     location: 'default',
    //   })
    //   .then((db: SQLiteObject) => {
    //     return new Promise((resolve, reject) => {
    //       db.executeSql('SELECT * FROM covid19_tests where unique_id=?', [this.getSelectedTestReqForm.uniqueId,]).then(async (data) => {
    //           this.c19TestsArray = [];
    //           let selectedc19TestsLength = data.rows.length;
    //           for (let i = 0; i < selectedc19TestsLength; i++) {
    //             let outerItem = data.rows.item(i);
    //             this.c19TestsArray.push(outerItem);
    //           }
    //           resolve(this.c19TestsArray);
    //           this.getSelectedTestReqForm.c19Tests = await this.getKeyItemsArray(this.c19TestsArray);
    //           if (this.getSelectedTestReqForm.c19Tests) {
    //             this.testDetailsArray = this.getSelectedTestReqForm.c19Tests;
    //             if (this.testDetailsArray.length != 0) {
    //               this.editTestDetails(this.testDetailsArray);
    //             }
    //           }
    //           this.viewResultArray[0].c19Tests = await this.getKeyItemsArray(this.c19TestsArray);
    //           this.viewResultArray[0].c19Tests[0].showTestResult = this.getSelectedTestReqForm.showTestResult;
    //         })
    //         .catch((e) => {
    //           console.log(e);
    //         });
    //     });
    //   });

    await this.sql
    .create({
      name: 'vlsm_mobile.db',
      location: 'default',
    })
    .then((db: SQLiteObject) => {
      return new Promise((resolve, reject) => {
        db.executeSql('SELECT * FROM covid19_tests where unique_id=?', [this.getSelectedTestReqForm.uniqueId])
          .then(async (data) => {
            this.c19TestsArray = [];
            let selectedc19TestsLength = data.rows.length;
            for (let i = 0; i < selectedc19TestsLength; i++) {
              let outerItem = data.rows.item(i);
              this.c19TestsArray.push(outerItem);
            }
            resolve(this.c19TestsArray);

            this.getSelectedTestReqForm.c19Tests = await this.getKeyItemsArray(this.c19TestsArray);
            if (this.getSelectedTestReqForm.c19Tests) {
              this.testDetailsArray = this.getSelectedTestReqForm.c19Tests;
              if (this.testDetailsArray.length != 0) {
                this.editTestDetails(this.testDetailsArray);
              }
            }

            // Initialize viewResultArray if not already initialized
            if (!this.viewResultArray) {
              this.viewResultArray = [{}];
            }
            // Ensure the first item in viewResultArray is an object
            if (!this.viewResultArray[0]) {
              this.viewResultArray[0] = {};
            }
            // Ensure c19Tests is an array
            if (!this.viewResultArray[0].c19Tests) {
              this.viewResultArray[0].c19Tests = [];
            }

            this.viewResultArray[0].c19Tests = await this.getKeyItemsArray(this.c19TestsArray);
            if (this.viewResultArray[0].c19Tests.length > 0) {
              this.viewResultArray[0].c19Tests[0].showTestResult = this.getSelectedTestReqForm.showTestResult;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      });
    });


    await this.sql
      .create({
        name: 'vlsm_mobile.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        return new Promise((resolve, reject) => {
          db.executeSql(
            'SELECT * FROM covid19_reasons_for_testing where covid19_id=?',[this.covid19_id]
          ).then(async (data) => {
              this.c19ReasonArray = [];
              let selectedc19TestsLength = data.rows.length;
              for (let i = 0; i < selectedc19TestsLength; i++) {
                let outerItem = data.rows.item(i);
                this.c19ReasonArray.push(outerItem);
              }
              resolve(this.c19ReasonArray);
              this.c19ReasonAssign();
              // this.viewResultArray[0].c19ReasonArray = (this.c19ReasonArray);
            }).catch((e) => {
              console.log(e);
            });
        });
      });
      
    await this.sql.create({name: 'vlsm_mobile.db',location: 'default',}).then((db: SQLiteObject) => {
      return new Promise((resolve, reject) => {
        db.executeSql('SELECT * FROM covid19_patient_symptoms where covid19_id=?', [this.covid19_id]).then(async (data) => {
          this.c19SymptomArray = [];
          let selectedc19TestsLength = data.rows.length;
          for (let i = 0; i < selectedc19TestsLength; i++) {
            let outerItem = data.rows.item(i);
            this.c19SymptomArray.push(outerItem);
          }
          resolve(this.c19SymptomArray);
          this.getSelectedTestReqForm.c19Symptom = this.getKeyItemsArray3(this.c19SymptomArray);
          if(this.getSelectedTestReqForm.asymptomatic!='yes'){
            this.c19SymptomAssign();
          }
          // if (this.getSelectedTestReqForm.c19Symptom) {
          //   this.testDetailsArray3 = this.getSelectedTestReqForm.c19Symptom;
          //   if (this.testDetailsArray3.length != 0) {
          //     this.editTestDetails3(this.testDetailsArray3);
          //   }
          // }
          // this.viewResultArray[0].c19Symptom = this.getKeyItemsArray3(this.c19SymptomArray);
        }).catch((e) => {
          console.log(e);
        });
      });
    });
    this.symptomsList.map((item) => {
      this.testDetailsArray3.map((item2) => {
        if (item.show == item2.symptom_id) {
          this.vitalSignsPanelForm.get(item.show).setValue(item2.symptom_id);
        }
      });
    });
  }

  c19SymptomAssign() {
    if (this.c19SymptomArray) {
      console.log(this.c19SymptomArray, 'newSymptom', this.symptomsList);
      for (let i = 0; i < this.c19SymptomArray.length; i++) {
        const symptom = this.c19SymptomArray[i].symptom_details;
        const detected = this.c19SymptomArray[i].symptom_detected;

        // Find the corresponding symptom item in the symptomsList
        const symptomItem = this.symptomsList.find(item => item.show === symptom);
        if (symptomItem) {
          // Update the value of the corresponding form control
          symptomItem.symptom = detected;
          // Use the actual form control name to set its value
          const controlName = this.getFormControlName(symptomItem.show);
          if (controlName) {
            const control = this.vitalSignsPanelForm.get(controlName);
            if (control) {
              control.setValue(detected);
            } else {
              console.error(`Form control "${controlName}" not found in vitalSignsPanelForm.`);
            }
          } else {
            console.error(`Form control name not found for symptom "${symptomItem.show}".`);
          }
        } else {
          console.error(`Symptom "${symptom}" not found in symptomsList.`);
        }
        console.log(this.symptomsList, '= ', this.c19SymptomArray, i);
      }
    }
  }

  getFormControlName(symptomShow: string): string | null {
    switch (symptomShow) {
      case 'Fever':
        return 'fever';
      case 'Cough':
        return 'cough';
      case 'Tiredness':
        return 'tiredness';
      case 'Loss of taste or smell':
        return 'lossOfTasteOrSmell';
      default:
        return null;
    }
  }

  // c19SymptomAssign() {
  //   if(this.c19SymptomArray){
  //     console.log(this.c19SymptomArray,'newSymptom',this.symptomsList);
  //     for (let i = 0; i < this.c19SymptomArray.length; i++) {
  //       if(this.symptomsList[0].show == this.c19SymptomArray[i].symptom_details){
  //         // this.addSymptomValue(this.c19SymptomArray[i].symptom_detected, this.symptomsList[0]);
  //         this.symptomsList[0].symptom = this.c19SymptomArray[i].symptom_detected;
  //         this.vitalSignsPanelForm.get('itemIndex').setValue(this.c19SymptomArray[i].symptom_detected);
  //       }
  //       else if(this.symptomsList[1].show == this.c19SymptomArray[i].symptom_details){
  //         this.symptomsList[1].symptom = this.c19SymptomArray[i].symptom_detected;
  //         this.vitalSignsPanelForm.get('itemIndex').setValue(this.c19SymptomArray[i].symptom_detected);
  //       }
  //       else if(this.symptomsList[2].show == this.c19SymptomArray[i].symptom_details){
  //         this.symptomsList[2].symptom = this.c19SymptomArray[i].symptom_detected;
  //         this.vitalSignsPanelForm.get('itemIndex').setValue(this.c19SymptomArray[i].symptom_detected);
  //       }
  //       else if(this.symptomsList[3].show == this.c19SymptomArray[i].symptom_details){
  //         this.symptomsList[3].symptom = this.c19SymptomArray[i].symptom_detected;
  //         // this.vitalSignsPanelForm.get('itemIndex').setValue(this.c19SymptomArray[i].symptom_detected);
  //       }
  //       console.log(this.symptomsList,'= ', this.c19SymptomArray,i);
  //     }
  //   }
  // }
  
  // c19ReasonAssign() {
  //     if (this.c19ReasonArray[0].reasons_detected == 'Cas suspect de COVID-19') {        
  //       this.selectedCaseDefinition = 'Cas suspect de COVID-19';
  //       for (let i = 0; i < this.c19ReasonArray.length; i++) {
  //         if (this.c19ReasonArray[i].reason_details == "Fièvre d'accès brutal (Inferieur ou égale à 38°C, vérifié à la salle d'urgence, la consultation externe, ou l'hôpital) ET") {
  //           this.CassuspectdeCOVID.get('opt1').setValue(true);
  //         }
  //         else if (this.c19ReasonArray[i].reason_details == 'Toux') {
  //           this.CassuspectdeCOVID.get('opt2').setValue(true);
  //         }
  //         else if (this.c19ReasonArray[i].reason_details == 'Rhume') {
  //           this.CassuspectdeCOVID.get('opt3').setValue(true);
  //         }
  //         else if (this.c19ReasonArray[i].reason_details == 'Mal de gorge') {
  //           this.CassuspectdeCOVID.get('opt4').setValue(true);
  //         }
  //         else if (this.c19ReasonArray[i].reason_details == 'Difficulté respiratoire') {
  //           this.CassuspectdeCOVID.get('opt5').setValue(true);
  //         }
  //         else if (this.c19ReasonArray[i].reason_details == 'Notion de séjour ou voyage dans les zones a épidémie a COVID-19 dans les 14 jours précédant les symptômes ci-dessous.') {
  //           this.CassuspectdeCOVID.get('opt6').setValue(true);
  //         }
  //         else if (this.c19ReasonArray[i].reason_details == "IRA d'intensité variable (simple a sévère) ayant été en contact étroite avec cas probable ou un cas confirmé de la maladie a COVID-19") {
  //           this.CassuspectdeCOVID.get('opt7').setValue(true);
  //         }
  //       }
  //     } else if (this.c19ReasonArray[0].reasons_detected == 'Cas probable de COVID-19') {
  //       this.selectedCaseDefinition = 'Cas probable de COVID-19';
  //       for (let i = 0; i < this.c19ReasonArray.length; i++) {
  //         if (this.c19ReasonArray[i].reason_details == "Tout cas suspects dont le résultat de laboratoire pour le diagnostic de COVID-19 n'est pas concluant (indéterminé)") {
  //           this.CasprobabledeCOVID.get('opt1').setValue(true);
  //         }
  //         if (this.c19ReasonArray[i].reason_details == "Tout décès dans un tableau d'IRA pour lequel il n'a pas été possible d'obtenir des échantillons biologiques pour confirmation au laboratoire mais dont les investigations ont révélé un lien épidémiologique avec un cas confirmé ou probable") {
  //           this.CasprobabledeCOVID.get('opt2').setValue(true);
  //         }
  //         if (this.c19ReasonArray[i].reason_details == 'Une notion de séjour ou voyage dans les 14 jours précédant le décès dans les zones a épidémie de la maladie a COVID-19') {
  //           this.CasprobabledeCOVID.get('opt3').setValue(true);
  //         }
  //       }
  //     } else if (this.c19ReasonArray[0].reasons_detected == 'Cas confirme de covid-19') {
  //       this.selectedCaseDefinition = 'Cas confirme de covid-19';
  //       this.CasconfirmedeCOVID.get('opt1').setValue(true);
  //     } else if (this.c19ReasonArray[0].reasons_detected == 'Non cas contact de COVID-19') {
  //       this.selectedCaseDefinition = 'Non cas contact de COVID-19';
  //       this.CascontactdeCOVID.get('opt1').setValue(true);
  //     } else if (this.c19ReasonArray[0].reasons_detected == 'Diagnostique') {
  //       this.selectedCaseDefinition = 'Diagnostique';
  //     }
  // }

  c19ReasonAssign() {
   
    if (this.c19ReasonArray && this.c19ReasonArray.length > 0) {
      if (this.c19ReasonArray[0].reasons_detected === 'Cas suspect de COVID-19') {        
        this.selectedCaseDefinition = 'Cas suspect de COVID-19';
        for (let i = 0; i < this.c19ReasonArray.length; i++) {
          if (this.c19ReasonArray[i].reason_details === "Fièvre d'accès brutal (Inferieur ou égale à 38°C, vérifié à la salle d'urgence, la consultation externe, ou l'hôpital) ET") {
            this.CassuspectdeCOVID.get('opt1').setValue(true);
          }
          else if (this.c19ReasonArray[i].reason_details === 'Toux') {
            this.CassuspectdeCOVID.get('opt2').setValue(true);
          }
          else if (this.c19ReasonArray[i].reason_details === 'Rhume') {
            this.CassuspectdeCOVID.get('opt3').setValue(true);
          }
          else if (this.c19ReasonArray[i].reason_details === 'Mal de gorge') {
            this.CassuspectdeCOVID.get('opt4').setValue(true);
          }
          else if (this.c19ReasonArray[i].reason_details === 'Difficulté respiratoire') {
            this.CassuspectdeCOVID.get('opt5').setValue(true);
          }
          else if (this.c19ReasonArray[i].reason_details === 'Notion de séjour ou voyage dans les zones a épidémie a COVID-19 dans les 14 jours précédant les symptômes ci-dessous.') {
            this.CassuspectdeCOVID.get('opt6').setValue(true);
          }
          else if (this.c19ReasonArray[i].reason_details === "IRA d'intensité variable (simple a sévère) ayant été en contact étroite avec cas probable ou un cas confirmé de la maladie a COVID-19") {
            this.CassuspectdeCOVID.get('opt7').setValue(true);
          }
        }
      } else if (this.c19ReasonArray[0].reasons_detected === 'Cas probable de COVID-19') {
        this.selectedCaseDefinition = 'Cas probable de COVID-19';
        for (let i = 0; i < this.c19ReasonArray.length; i++) {
          if (this.c19ReasonArray[i].reason_details === "Tout cas suspects dont le résultat de laboratoire pour le diagnostic de COVID-19 n'est pas concluant (indéterminé)") {
            this.CasprobabledeCOVID.get('opt1').setValue(true);
          }
          if (this.c19ReasonArray[i].reason_details === "Tout décès dans un tableau d'IRA pour lequel il n'a pas été possible d'obtenir des échantillons biologiques pour confirmation au laboratoire mais dont les investigations ont révélé un lien épidémiologique avec un cas confirmé ou probable") {
            this.CasprobabledeCOVID.get('opt2').setValue(true);
          }
          if (this.c19ReasonArray[i].reason_details === 'Une notion de séjour ou voyage dans les 14 jours précédant le décès dans les zones a épidémie de la maladie a COVID-19') {
            this.CasprobabledeCOVID.get('opt3').setValue(true);
          }
        }
      } else if (this.c19ReasonArray[0].reasons_detected === 'Cas confirme de covid-19') {
        this.selectedCaseDefinition = 'Cas confirme de covid-19';
        this.CasconfirmedeCOVID.get('opt1').setValue(true);
      } else if (this.c19ReasonArray[0].reasons_detected === 'Non cas contact de COVID-19') {
        this.selectedCaseDefinition = 'Non cas contact de COVID-19';
        this.CascontactdeCOVID.get('opt1').setValue(true);
      } else if (this.c19ReasonArray[0].reasons_detected === 'Diagnostique') {
        this.selectedCaseDefinition = 'Diagnostique';
        this.CascontactdeCOVIDS.get('opt1').setValue(true);
      }
    } else {
      console.warn('c19ReasonArray is undefined or empty');
    }
  }
  

  async onChangePOEState($event, form) {
    if (form == 'siteInfoPanelForm') {
      this.siteInfoPanelForm.get('healthZone').setValue('');
      this.siteInfoPanelForm.get('facilityName').setValue('');

      let selectedCounty = this.provinceListArray.filter((item) => item.province_name == $event.option.value);
      let POECountyDupArray = await this.CommonService.getDistrictList(selectedCounty[0].province_id);
      this.POECountyArray = [...new Set(POECountyDupArray.map(({ district_id }) => district_id)),].map((e) => POECountyDupArray.find(({ district_id }) => district_id == e));
      this.POECountyFilteredOptions = this.siteInfoPanelForm.get('healthZone').valueChanges.pipe(startWith(''), map((value: string) => this.POECountyFilter(value)));
      let filteredPOEState = this.provinceListArray.filter((item) => item.province_name == this.siteInfoPanelForm.controls.province.value);
      if (filteredPOEState.length != 0) { this.provinceID = filteredPOEState[0] ? filteredPOEState[0].province_id : ''; }
      console.log(this.provinceID, 'provinceID', filteredPOEState);
    }
    else if (form == 'caseDetailsPanelForm') {
      this.caseDetailsPanelForm.get('patientDistrict').setValue('');
      // this.caseDetailsPanelForm.get('facilityName').setValue('');

      let selectedCountyForPatient = this.provinceListArray.filter((item) => item.province_name == $event.option.value);
      let POEPatientCountyDupArray = await this.CommonService.getDistrictList(selectedCountyForPatient[0].province_id);
      this.POEPatientCountyArray = [...new Set(POEPatientCountyDupArray.map(({ district_id }) => district_id)),].map((e) => POEPatientCountyDupArray.find(({ district_id }) => district_id == e));
      this.POECountyPatientFilteredOptions = this.caseDetailsPanelForm.get('patientDistrict').valueChanges.pipe(startWith(''), map((value: string) => this.POEPatientCountyFilter(value)));
      console.log(selectedCountyForPatient, 'test', this.caseDetailsPanelForm.controls.patientProvince.value);
      let filteredPatientPOEState = this.provinceListArray.filter((item) => item.province_name == this.caseDetailsPanelForm.controls.patientProvince.value);
      if (filteredPatientPOEState.length != 0) {
        this.patientProvinceID = filteredPatientPOEState[0] ? filteredPatientPOEState[0].province_id : '';
      }
    }

  }

  async onChangePOECounty($event) {
    this.siteInfoPanelForm.get('facilityName').setValue('');
    let selectedCounty = this.POECountyArray.filter((item) => item.district_name == $event.option.value);
    console.log(selectedCounty, 'selecterd');
    this.POEArray = await this.CommonService.getFacilitiesList(selectedCounty[0].district_id);
    this.POEFilteredOptions = this.siteInfoPanelForm.get('facilityName').valueChanges.pipe(startWith(''), map((value: string) => this.POEFilter(value)));
    console.log(this.siteInfoPanelForm.get('healthZone').value, 'vaalue');
  }


  filteredZoneArray: string[] = [];

  filterZones(value: string) {
    this.filteredZoneArray = this.zoneArray.filter(zone =>
      zone.toLowerCase().includes(value.toLowerCase())
    );
  }

  selectZone(zone: string) {
    const currentValue = this.caseDetailsPanelForm.get('patientZone').value;
    const newValue = currentValue ? `${currentValue}, ${zone}` : zone;
    this.caseDetailsPanelForm.get('patientZone').setValue(newValue);
  }

  async getInitArray() {
    this.initArray = await this.storage.get('initArray');
    this.covid19InitArray = this.initArray.covid19;
    this.provinceListArray = await this.CommonService.getProvinceList();
    this.zoneArray = await this.CommonService.getpatientZone();
    console.log(this.zoneArray)
    this.facilitiesListArray = this.initArray.facilitiesList;
    // this.districtList = this.initArray.districtList;
    this.specimenTypeArray = this.covid19InitArray.specimenTypeResultList;
    this.samplingArray = this.covid19InitArray.testingPoint;
    console.log(this.samplingArray)
    // this.labNameArray = this.initArray.testingLabsList;
    this.labNameArray = this.initArray.testingLabsList.filter(item => item.test_type === 'covid19');
    console.log(this.labNameArray);
    
    this.typeOfTestRequestList = this.covid19InitArray.typeOfTestRequestList;
    this.rejectedReasonList = this.covid19InitArray.rejectedReasonList;
    console.log(this.rejectedReasonList)
    this.resultsList = this.covid19InitArray.resultsList;
    this.symptomsList = this.covid19InitArray.symptomsList ? this.covid19InitArray.symptomsList : [];
    this.symptomsList.map((item) => {
      item.symptom = '';
    });
    for (let formModule of this.symptomsList) {
      this.vitalSignsPanelForm.addControl(formModule.key,new UntypedFormControl(formModule.Value));
    }

    this.ProvinceFilteredOptions = this.siteInfoPanelForm
      .get('province')
      .valueChanges.pipe(
        startWith(''),
        map((value: string) => this.provinceOfAlertFilter(value))
      );
    this.POEStateFilteredOptions = this.siteInfoPanelForm
      .get('province')
      .valueChanges.pipe(
        startWith(''),
        map((value: string) => this.POEStateFilter(value))
      );

    this.implementPartnerFilteredOptions = this.siteInfoPanelForm
      .get('implementingPartner')
      .valueChanges.pipe(
        startWith(''),
        map((value: string) => this.implementPartnerFilter(value))
      );
    this.fundingPartnerFilteredOptions = this.siteInfoPanelForm
      .get('fundingPartner')
      .valueChanges.pipe(
        startWith(''),
        map((value: string) => this.fundingPartnerFilter(value))
      );
    this.testingLabFilteredOptions = this.labResultPanelForm
      .get('labName')
      .valueChanges.pipe(
        startWith(''),
        map((value: string) => this.testingLabFilter(value))
      );
    this.POEStateFilteredOptions = this.caseDetailsPanelForm
      .get('state')
      .valueChanges.pipe(
        startWith(''),
        map((value: string) => this.POEStateFilter(value))
      );
    this.nationalityFilteredOptions = this.caseDetailsPanelForm
      .get('patientNationality')
      .valueChanges.pipe(
        startWith(''),
        map((value: string) => this.nationalityFilter(value))
      );
    this.labTechnicianFilteredOptions = this.labResultPanelForm
      .get('labTechnician')
      .valueChanges.pipe(
        startWith(''),
        map((value: any) => this.labTechnicianFilter(value))
      );
    this.testedByFilteredOptions = this.labResultPanelForm
      .get('testedBy')
      .valueChanges.pipe(
        startWith(''),
        map((value: any) => this.labTechnicianFilter(value))
      );
  }

  async searchPatient() {
    await this.storage.remove('selectedPatient');
    this.router.navigate([
      'mohdrc-select-patient-details',
      {
        data: this.caseDetailsPanelForm.get('search').value,
      },
    ]);
  }

  calret(){
    console.log(new Date(this.travelandContactPanelForm.controls.returnDate.value));
  }
  calAge() {
    const convertAge = new Date(this.caseDetailsPanelForm.controls.dob.value);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    this.caseDetailsPanelForm.get('patientAge').setValue(Math.floor((timeDiff / (1000 * 3600 * 24)) / 365));
    this.maxSampleCollectionDate = convertAge;
    console.log(this.maxSampleCollectionDate, 'this.maxSampleCollectionDate');
    var month = this.formatDate(this.maxSampleCollectionDate.getMonth() + 1);
    var day = this.formatDate(this.maxSampleCollectionDate.getDate());
    this.maxSampleCollectionDate = convertAge.getFullYear() + '-' + month + '-' + day + 'T' + '00' + ':' + '00';
    console.log(this.maxSampleCollectionDate, 'maxSampleCollectionDate',this.caseDetailsPanelForm.controls.dob.value);
  }
  onChangeSampleRejected() {
    if ((this.mode == 'edit' || this.mode == 'result edit') && this.labResultPanelForm.controls.sampleRejected.value == 'no') {
      this.testArray().push(this.newTest());
    }
    else if (this.labResultPanelForm.controls.sampleRejected.value == 'yes') {
      this.testArray().removeAt(0);
      this.labResultPanelForm.get('result').setErrors(null);
    }
    else if ((this.mode == 'add') && this.labResultPanelForm.controls.sampleRejected.value == 'no') {
      if (this.testArray.length == 0) {
        this.testArray().removeAt(0);
        this.testArray().push(this.newTest());
      }
      this.labResultPanelForm.get('rejectionReason').setValue('');
      this.labResultPanelForm.get('rejectionDate').setValue('');
      this.labResultPanelForm.get('rejectionReason').setErrors(null);
      this.labResultPanelForm.get('rejectionDate').setErrors(null);
    }
  }
  goBack() {
    var routerSplitURL = this.router.url.split(';');
    if (
      (this.router.url === '/mohdrc-add-new-request' &&
        (this.siteInfoPanelForm.dirty ||
          this.caseDetailsPanelForm.dirty ||
          this.labResultPanelForm.dirty)) ||
      (routerSplitURL[1] == 'data_mode=edit' &&
        (this.siteInfoPanelForm.dirty ||
          this.caseDetailsPanelForm.dirty ||
          this.labResultPanelForm.dirty))
    ) {
      this.alertService.confirmAlert(
        'VLSM',
        'Are you sure you want to go back? Because the data you have entered will be lost',
        'addEditForm'
      );
    } else {
      this.router.navigate([this.previousPageURL], {
        replaceUrl: true,
      });
    }
  }
  maxmindate() {
    this.maxDate = new Date();
    var month = this.formatDate(this.maxDate.getMonth() + 1);
    var day = this.formatDate(this.maxDate.getDate());
    var hour = this.maxDate.getHours();
    var minute = this.maxDate.getMinutes();
    this.maxDatetime = this.maxDate.getFullYear() + '-' + month + '-' + day + 'T' + hour + ':' + minute;
    // this.maxDate = new Date();
    // var month = this.formatDate(this.maxDate.getMonth());
    // var day = this.formatDate(this.maxDate.getDate());
    // var hour = this.maxDate.getHours();
    // var minute = this.maxDate.getMinutes();
    // this.maxDatetime = this.maxDate.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + minute;
  }

  private formatDate(nmbr: number): string {
    var date = nmbr + '';
    date = date.length < 2 ? '0' + date : date;
    return date;
  }
  loadStaticArrays() {
    this.testNumberArray = [
      {
        name: '1',
        value: 1,
      },
      {
        name: '2',
        value: 2,
      },
      {
        name: '3',
        value: 3,
      },
      {
        name: '4',
        value: 4,
      },
      {
        name: '5',
        value: 5,
      },
    ];
    this.genderArray = [
      {
        name: 'Male',
        value: 'male',
      },
      {
        name: 'Female',
        value: 'female',
      },
      {
        name: 'Other',
        value: 'other',
      },
    ];
  }

  //mat auto complete filters start

  provinceOfAlertFilter(val: string): string[] {
    return this.covid19InitArray['provinceList']
      .map((x) => x.show)
      .filter((option) => option.toLowerCase().includes(val.toLowerCase()));
  }
  POEStateFilter(val: string): string[] {
    return this.provinceListArray
      .map((x) => x.province_name)
      .filter((option) => option.toLowerCase().includes(val.toLowerCase()));
  }

  POECountyFilter(val: string): string[] {
    return this.POECountyArray.map((x) => x.district_name).filter((option) =>
      option.toLowerCase().includes(val.toLowerCase())
    );
  }
  POEPatientCountyFilter(val: string): string[] {
    return this.POEPatientCountyArray.map((x) => x.district_name).filter((option) =>
      option.toLowerCase().includes(val.toLowerCase())
    );
  }


  POECountyPatientFilter(val: string): string[] {
    return this.POECountyPatientArray.map((x) => x.district_name).filter(
      (option) => option.toLowerCase().includes(val.toLowerCase())
    );
  }

  POEFilter(val: string): string[] {
    return this.POEArray.map((x) => x.facility_name).filter((option) =>
      option.toLowerCase().includes(val.toLowerCase())
    );
  }

  implementPartnerFilter(val: string): string[] {
    return this.initArray['implementingPartnerList']
      .map((x) => x.show)
      .filter((option) => option.toLowerCase().includes(val.toLowerCase()));
  }

  fundingPartnerFilter(val: string): string[] {
    return this.initArray['fundingSourceList']
      .map((x) => x.show)
      .filter((option) => option.toLowerCase().includes(val));
  }

  testingLabFilter(val: string): string[] {
    return this.initArray['testingLabsList']
      .map((x) => x.show)
      .filter((option) => option.toLowerCase().includes(val.toLowerCase()));
  }

  nationalityFilter(val: string): string[] {
    if (!val) {
      return this.initArray['nationalityList'].map(x => x.show).filter(Boolean);
    }
  
    return this.initArray['nationalityList']
      .map(x => x.show)
      .filter(option => option && option.toLowerCase().includes(val.toLowerCase()));
  }
  

  labTechnicianFilter(val: string): string[] {
    return this.initArray['labTechniciansList']
      .map((x) => x.show)
      .filter((option) => option.toLowerCase().includes(val.toLowerCase()));
  }

  //mat auto complete filters end

  goToViewResult() {
    this.step = 4;
  }

  setStep(index: number) {
    this.step = index;
  }
  clearDOB() {
    this.caseDetailsPanelForm.get('patientAge').setValue('');
    this.caseDetailsPanelForm.get('dob').setValue('');
  }
  clearDateOfSymptomOnset() {
    this.vitalSignsPanelForm.get('dateOfSymptomOnset').setValue('');
  }
  clearDateOfInitialConsultation() {
    this.vitalSignsPanelForm.get('dateOfInitialConsultation').setValue('');
  }
  clearsampleDispatchedOn() {
    this.vitalSignsPanelForm.get('sampleDispatchedOn').setValue('');
  }
  clearSampleCollectionDate() {
    this.vitalSignsPanelForm.get('sampleCollectionDate').setValue('');
  }
  clearReturnDate() {
    this.travelandContactPanelForm.get('returnDate').setValue('');
  }
  clearArrivalTime() {
    this.travelandContactPanelForm.get('arrivalTime').setValue('');
  }
  clearSampleReceivedDateTime() {
    this.labResultPanelForm.get('sampleReceivedDateTime').setValue('');
  }
  clearRejectionDate() {
    this.labResultPanelForm.get('rejectionDate').setValue('');
  }

  prevStep() {
    this.step--;
  }
  nextStepVitalSigns(isVitalSignsFormValid) {
    console.log(isVitalSignsFormValid, 'isVitalSignsFormValid');

    if (isVitalSignsFormValid) {
      this.step = 4;
    }
  }
  nextStepTravelAndContact(isTravelAndContactFormVaild) {
    //
    console.log(this.travelandContactPanelForm.controls.returnDate.value);
    if (isTravelAndContactFormVaild) {
      this.step = 5;
    }
  }

  nextStepSiteInfo(isSiteInfoFormVaild) {
    //
    if (isSiteInfoFormVaild) {
      this.step = 1;
    }
  }
  nextStepCaseDetails(isCaseDetailsFormValid) {
    //

    if (isCaseDetailsFormValid) {
      this.step = 2;
    }
  }

  nextStepCaseDefinitions(isCaseDefinitionsFormValid: boolean) {
   
    if (!this.caseDefinitionsPanelForm.valid) {
      this.caseDefinitionsPanelForm.markAllAsTouched();
      return;
    }
  
    
    if (isCaseDefinitionsFormValid) {
      this.step = 3;
    }
  }
  
  dateFormat(dateObj) {
    var month = new Array();
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
    return (this.formattedDate =
      ('0' + dateObj.getDate()).slice(-2) +
      '-' +
      month[dateObj.getMonth()] +
      '-' +
      dateObj.getFullYear());
  }

  dateTimeFormat2(dateObj) {
    this.formattedDateTime2 = '';
    return (this.formattedDateTime2 =
      dateObj.getFullYear() +
      '-' +
      ('0' + (dateObj.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + dateObj.getDate()).slice(-2) +
      'T' +
      ('0' + dateObj.getHours()).slice(-2) +
      ':' +
      ('0' + dateObj.getMinutes()).slice(-2) +
      ':00');
  }

  dateTimeFormat(dateObj) {
    var month = new Array();
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

    var mydate = new Date(dateObj);

    return (this.formattedDateTime =
      ('0' + mydate.getDate()).slice(-2) +
      '-' +
      month[mydate.getMonth()] +
      '-' +
      mydate.getFullYear() +
      ' ' +
      ('0' + mydate.getHours()).slice(-2) +
      ':' +
      ('0' + mydate.getMinutes()).slice(-2) +
      ':00');
  }

  


  async saveCovid19AddSouthSudanForm(isSiteInfoFormVaild, isCaseDetailsFormValid, isCaseDefinitionsPanelFormValid, isTravelandContactPanelFormValid, isVitalSignsPanelFormValid, isLabResultFormValid, isAddOrUpdate) {
    console.log(isSiteInfoFormVaild, isCaseDetailsFormValid, isCaseDefinitionsPanelFormValid, isTravelandContactPanelFormValid, isVitalSignsPanelFormValid, isLabResultFormValid, isAddOrUpdate);
    let reasonDetailsArray: any = [];
    if (this.selectedCaseDefinition) {
      if (this.selectedCaseDefinition == 'Cas suspect de COVID-19') {
        this.reasonForCovidTest = 1;
        if (this.CassuspectdeCOVID.controls.opt1.value) {
          reasonDetailsArray.push({
            reason: 'Cas suspect de COVID-19',
            detail:
              "Fièvre d'accès brutal (Inferieur ou égale à 38°C, vérifié à la salle d'urgence, la consultation externe, ou l'hôpital) ET",
          });
        }
        if (this.CassuspectdeCOVID.controls.opt2.value) {
          reasonDetailsArray.push({
            reason: 'Cas suspect de COVID-19',
            detail: 'Toux',
          });
        }
        if (this.CassuspectdeCOVID.controls.opt3.value) {
          reasonDetailsArray.push({
            reason: 'Cas suspect de COVID-19',
            detail: 'Rhume',
          });
        }
        if (this.CassuspectdeCOVID.controls.opt4.value) {
          reasonDetailsArray.push({
            reason: 'Cas suspect de COVID-19',
            detail: 'Mal de gorge',
          });
        }
        if (this.CassuspectdeCOVID.controls.opt5.value) {
          reasonDetailsArray.push({
            reason: 'Cas suspect de COVID-19',
            detail: 'Difficulté respiratoire',
          });
        }
        if (this.CassuspectdeCOVID.controls.opt6.value) {
          reasonDetailsArray.push({
            reason: 'Cas suspect de COVID-19',
            detail:
              'Notion de séjour ou voyage dans les zones a épidémie a COVID-19 dans les 14 jours précédant les symptômes ci-dessous.',
          });
        }
        if (this.CassuspectdeCOVID.controls.opt7.value) {
          reasonDetailsArray.push({
            reason: 'Cas suspect de COVID-19',
            detail:
              "IRA d'intensité variable (simple a sévère) ayant été en contact étroite avec cas probable ou un cas confirmé de la maladie a COVID-19",
          });
        }
      } else if (this.selectedCaseDefinition == 'Cas probable de COVID-19') {
        this.reasonForCovidTest = 2;
        if (this.CasprobabledeCOVID.controls.opt1.value) {
          reasonDetailsArray.push({
            reason: 'Cas probable de COVID-19',
            detail:
              "Tout cas suspects dont le résultat de laboratoire pour le diagnostic de COVID-19 n'est pas concluant (indéterminé)",
          });
        }
        if (this.CasprobabledeCOVID.controls.opt2.value) {
          reasonDetailsArray.push({
            reason: 'Cas probable de COVID-19',
            detail:
              "Tout décès dans un tableau d'IRA pour lequel il n'a pas été possible d'obtenir des échantillons biologiques pour confirmation au laboratoire mais dont les investigations ont révélé un lien épidémiologique avec un cas confirmé ou probable",
          });
        }
        if (this.CasprobabledeCOVID.controls.opt3.value) {
          reasonDetailsArray.push({
            reason: 'Cas probable de COVID-19',
            detail:
              'Une notion de séjour ou voyage dans les 14 jours précédant le décès dans les zones a épidémie de la maladie a COVID-19',
          });
        }
      } else if (this.selectedCaseDefinition == 'Cas confirme de covid-19') {
        this.reasonForCovidTest = 3;
        if (this.CasconfirmedeCOVID.controls.opt1.value) {
          reasonDetailsArray.push({
            reason: 'Cas confirme de covid-19',
            detail:
              "Toute personne avec une confirmation en laboratoire de l'infection au COVID-19, quelles que soient les signes et symptômes cliniques",
          });
        }
      } else if (this.selectedCaseDefinition == 'Non cas contact de COVID-19') {
        this.reasonForCovidTest = 4;
        if (this.CascontactdeCOVID.controls.opt1.value) {
          reasonDetailsArray.push({
            reason: 'Non cas contact de COVID-19',
            detail:
              "Tout cas suspects avec deux résultats de laboratoire négatifs au COVID-19 a au moins 48 heures d'intervalle",
          });
        }
      } else if (this.selectedCaseDefinition == 'Diagnostique') {
        this.reasonForCovidTest = 5;
        if(this.CascontactdeCOVIDS.controls.opt1.value){
          reasonDetailsArray.push({
            reason: 'Diagnostique'
          });
        }
      }
    }
    console.log(reasonDetailsArray);

    if(this.vitalSignsPanelForm.controls.asymptomatic.value!='yes'){
    for (let i = 0; i < this.symptomsList.length; i++) {      
      let id = this.symptomsList[i].value,
        detail = this.symptomsList[i].show,
        symptom = this.symptomsList[i].symptom;
      this.covid19PatientSymptomsArray.push({
        id: id, symptom: symptom, detail: detail,
      });
      // }
    }
    console.log('covid19PatientSymptomsArray', this.covid19PatientSymptomsArray);
    }
    
    // fever: this.vitalSignsPanelForm.controls.fever.value,
    //         weightLoss: this.vitalSignsPanelForm.controls.weightLoss.value,
    //         convulsions: this.vitalSignsPanelForm.controls.convulsions.value,
    //         lethargy: this.vitalSignsPanelForm.controls.lethargy.value,
    //         headAche: this.vitalSignsPanelForm.controls.headAche.value,
    //         soreThroat: this.vitalSignsPanelForm.controls.soreThroat.value,
    //         cough: this.vitalSignsPanelForm.controls.cough.value,
    //         rhinitis: this.vitalSignsPanelForm.controls.rhinitis.value,
    //         difficultBreathing:
    //           this.vitalSignsPanelForm.controls.difficultBreathing.value,
    //         nausea: this.vitalSignsPanelForm.controls.nausea.value,
    //         musclePain: this.vitalSignsPanelForm.controls.musclePain.value,
    //         asthenia: this.vitalSignsPanelForm.controls.asthenia.value,
    //         diarrhea: this.vitalSignsPanelForm.controls.diarrhea.value,
    //

    if (!isSiteInfoFormVaild) {
      this.step = 0;
      for (let inner in this.siteInfoPanelForm.controls) {
        this.siteInfoPanelForm.get(inner).markAsTouched();
        this.siteInfoPanelForm.get(inner).updateValueAndValidity();
      }
      for (let inner in this.caseDetailsPanelForm.controls) {
        this.caseDetailsPanelForm.get(inner).markAsTouched();
        this.caseDetailsPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (!isCaseDetailsFormValid) {
      this.step = 1;
      for (let inner in this.caseDetailsPanelForm.controls) {
        this.caseDetailsPanelForm.get(inner).markAsTouched();
        this.caseDetailsPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (!isCaseDefinitionsPanelFormValid) {
      this.step = 2;
      for (let inner in this.caseDefinitionsPanelForm.controls) {
        this.caseDefinitionsPanelForm.get(inner).markAsTouched();
        this.caseDefinitionsPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (!isVitalSignsPanelFormValid) {
      this.step = 3;
      for (let inner in this.vitalSignsPanelForm.controls) {
        this.vitalSignsPanelForm.get(inner).markAsTouched();
        this.vitalSignsPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (!isTravelandContactPanelFormValid) {
      this.step = 3;
      for (let inner in this.travelandContactPanelForm.controls) {
        this.travelandContactPanelForm.get(inner).markAsTouched();
        this.travelandContactPanelForm.get(inner).updateValueAndValidity();
      }
    } else if (this.isTestingUser == 'no') {
      this.step = 5;
      isLabResultFormValid = true;
    } else if (this.isTestingUser == 'yes') {
      if (!isCaseDefinitionsPanelFormValid) {
        this.step = 2;
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

    if (isVitalSignsPanelFormValid) {
      let testValuesArray3 = this.symptomsList;
      this.testDetails3 = [];
      testValuesArray3.forEach((element, index) => {
        this.testDetails3.push({
          covid19_id: element.covid19_id,
          id: element.symptom_id,
          symptom: element.symptom_detected,
          detail: element.symptom_details,
        });
      });
    }
    if (isLabResultFormValid && this.labResultPanelForm.controls.sampleRejected.value == 'no') {
      let testValuesArray = this.labResultPanelForm.value.testArray;
      this.testDetails = [];
      testValuesArray.forEach((element, index) => {
        this.testDetails.push({
          testName: element.testMethod,
          testDate: this.dateTimeFormat(element.dateOfTesting),
          testingPlatform: element.testPlatform,
          kitLotNo: element.kitLotNo,
          kitExpiryDate: this.dateTimeFormat(element.kitExpiryDate),
          testResult: element.testResult,
          testPlatform: element.testPlatform,
        });
      });
    }

    if (isSiteInfoFormVaild && isCaseDetailsFormValid && isCaseDefinitionsPanelFormValid && isVitalSignsPanelFormValid && isTravelandContactPanelFormValid && isLabResultFormValid) {
      this.submitted = true;
      this.loginDetails = await this.storage.get('loginDetails');
      if (isAddOrUpdate == 'add') {
        var offTestReqID;
        let count = await this.storage.get('lastappSampleCode');
        if (this.offTestReqID) {
          count = this.offTestReqID;
        }
        if (count == null) {
          count = 1;
        } else {
          var parts = count.slice(-3);
          if (parts == 'NaN') {
            count = 1;
          } else {
            var lastCount = count.slice(-4);
            count = +lastCount + 1;
          }
          // var lastCount = count.slice(-4);
          // count = +lastCount + 1;
        }
        var currentDate = new Date();
        this.offTestReqID = 'AC19';
        this.offTestReqID += Math.random().toString(36).slice(2, 4).toUpperCase();
        this.offTestReqID += currentDate.getFullYear().toString().slice(-2);
        this.offTestReqID += ('0' + (currentDate.getMonth() + 1)).slice(-2);
        this.offTestReqID += ('000' + count.toString()).slice(-4);
        offTestReqID = this.offTestReqID;
        this.createdOn = this.dateTimeFormat(new Date());
        this.isSynced = false;
      } else {
        this.updatedOn = this.dateTimeFormat(new Date());
        offTestReqID = this.appSampleCode;
        console.log('offTestReqID', offTestReqID);
        this.isSynced = false;
      }

      let filteredPOEState = this.provinceListArray.filter(
        (item) =>
          item.province_name == this.siteInfoPanelForm.controls.province.value
      );
      if (filteredPOEState.length != 0) {
        this.provinceID = filteredPOEState[0]
          ? filteredPOEState[0].province_id
          : '';
      }

      console.log(filteredPOEState, 'filteredPoe');
      let filteredPOECounty = this.POECountyArray.filter(
        (item) =>
          item.district_name == this.siteInfoPanelForm.controls.healthZone.value
      );
      if (filteredPOECounty.length != 0) {
        this.districtID = filteredPOECounty[0]
          ? filteredPOECounty[0].district_id
          : '';
      }
      console.log(filteredPOECounty, 'filteredPOECounty');

      // let filteredImpPartner = this.initArray['implementingPartnerList'].filter(
      //   (item) =>
      //     item.show == this.siteInfoPanelForm.controls.implementingPartner.value
      // );
      // if (filteredImpPartner.length != 0) {
      //   this.implementingPartnerID = filteredImpPartner[0]
      //     ? filteredImpPartner[0].value
      //     : '';
      // }

      // let filteredFundingSource = this.initArray['fundingSourceList'].filter(
      //   (item) =>
      //     item.show == this.siteInfoPanelForm.controls.fundingPartner.value
      // );
      // if (filteredFundingSource.length != 0) {
      //   this.fundingSourceID = filteredFundingSource[0]
      //     ? filteredFundingSource[0].value
      //     : '';
      // }

      // let filteredPatientState = this.provinceListArray.filter(
      //   (item) =>
      //     item.province_name == this.caseDetailsPanelForm.controls.state.value
      // );
      // if (filteredPatientState.length != 0) {
      //   this.patientStateID = filteredPatientState[0]
      //     ? filteredPatientState[0].province_id
      //     : '';
      // }

      // let filteredPatientCounty = this.POECountyArray.filter(
      //   (item) =>
      //     item.district_name == this.caseDetailsPanelForm.controls.county.value
      // );
      // if (filteredPatientCounty.length != 0) {
      //   this.patientDistrictID = filteredPatientCounty[0]
      //     ? filteredPatientCounty[0].district_id
      //     : '';
      // }

      let filteredNationality = this.initArray['nationalityList'].filter(
        (item) =>
          item.show ==
          this.caseDetailsPanelForm.controls.patientNationality.value
      );
      if (filteredNationality.length != 0) {
        this.nationalityID = filteredNationality[0]
          ? filteredNationality[0].value
          : '';
      }

      let selectedFacility = this.POEArray.filter(
        (item) =>
          item.facility_name ==
          this.siteInfoPanelForm.controls.facilityName.value
      );
      if (selectedFacility.length != 0) {
        this.facilityId = selectedFacility[0].facility_id;
      }

      // if (this.isTestingUser == 'no') {
      //   let filteredTestLabRecord = this.initArray['testingLabsList'].filter(
      //     (item) => item.show == this.labResultPanelForm.controls.labName.value
      //   );
      //   this.labId = filteredTestLabRecord[0]
      //     ? filteredTestLabRecord[0].value
      //     : '';
      //   this.labName = this.labResultPanelForm.controls.labName.value;
      // } else {
      //   let filteredTestLabRecord2 = this.initArray['testingLabsList'].filter(
      //     (item) =>
      //       item.value ==
      //       parseInt(this.labResultPanelForm.controls.labName.value)
      //   );
      //   this.labId = this.labResultPanelForm.controls.labName.value
      //     ? this.labResultPanelForm.controls.labName.value
      //     : '';
      //   this.labName = filteredTestLabRecord2[0]
      //     ? filteredTestLabRecord2[0].show
      //     : '';
      // }

      // let labNameValue = this.labResultPanelForm.controls.labName.value;
      // console.log(labNameValue)
      // this.initArray = await this.storage.get('initArray');
      // console.log(this.initArray['testingLabsList'])
      //   let filteredTestLabRecord = this.initArray['testingLabsList'].filter(item =>
      //       item.value == labNameValue);

      //   this.labId = filteredTestLabRecord[0] ? filteredTestLabRecord[0].value : '';
      //   this.labName = filteredTestLabRecord[0] ? filteredTestLabRecord[0].show : '';

      //   console.log('Labid', this.labId);
      //   console.log('Lab Name', this.labName);

    

      let filteredTestLabRecord = this.initArray['testingLabsList'].filter(item =>
        item.show == this.labResultPanelForm.controls.labName.value);
      this.labId = filteredTestLabRecord[0] ? filteredTestLabRecord[0].value : '';
      this.labName = this.labResultPanelForm.controls.labName.value;
  
      for (var i = 0; i < this.covid19InitArray['rejectedReasonList'].length; i++) {
        let filteredRejectionReason = this.covid19InitArray['rejectedReasonList'][i].reasons.filter((item) => item.show == this.labResultPanelForm.controls.rejectionReason.value);
  
        if (filteredRejectionReason.length > 0) {
          this.rejectionReasonId = filteredRejectionReason[0] ? filteredRejectionReason[0].value : '';
          console.log(this.rejectionReasonId);
          this.rejectionReason = this.labResultPanelForm.controls.rejectionReason.value;
          console.log(this.rejectionReason);
         
        }
      }

      let reviewedsby = this.initArray['labTechniciansList']?.filter(item =>
        item.show === this.labResultPanelForm.controls.reviewedBy.value);
        console.log(reviewedsby);
      this.reviewed = reviewedsby[0] ? reviewedsby[0].value : '';
      console.log('Reviewed Value:', this.reviewed);



      let filteredLabTechnicianRecord = this.initArray[
        'labTechniciansList'
      ].filter(
        (item) =>
          item.show == this.labResultPanelForm.controls.labTechnician.value
      );
      if (filteredLabTechnicianRecord.length != 0) {
        this.labTechnicianID = filteredLabTechnicianRecord[0] ? filteredLabTechnicianRecord[0].value : '';
      }

      let filteredTestedByRecord = this.initArray['labTechniciansList'].filter((item) => item.show == this.labResultPanelForm.controls.testedBy.value);
      if (filteredTestedByRecord.length != 0) {
        this.testedByID = filteredTestedByRecord[0] ? filteredTestedByRecord[0].value : '';
      }

      if (isAddOrUpdate == 'add') {
      }

      let currentDateTime = new Date().toISOString().slice(0, 16).replace('T', ' ');
      await this.storage.get('loginDetails').then(async (loginDetails) => {
        if (loginDetails) {
         
          this.userID = loginDetails['user'].user_id;
        
        }
      });


      let array = [];
      let reasonForChangingObj = {
        "reason": this.labResultPanelForm.controls.reasonForChanging.value ? this.labResultPanelForm.controls.reasonForChanging.value : '',
        "change_datetime": currentDateTime,
        "changed_by": this.userID
    };
    
    array.push(reasonForChangingObj)
    
    this.reasonsArray.push(reasonForChangingObj)

      

    

      let saveCovid19SSJSON = {
        user_id: this.userID,
        uniqueId: this.uniqueId ? this.uniqueId : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        appSampleCode: offTestReqID,
        covid19_id: this.covid19_id ? this.covid19_id : '',
        sampleCode: this.sampleCode ? this.sampleCode : '',
        remoteSampleCode: this.remoteSampleCode ? this.remoteSampleCode : '',
        createdOn: this.createdOn,
        updatedOn: this.updatedOn ? this.updatedOn : '',
        isSynced: this.isSynced,
        authToken: this.loginDetails['api_token'],
        formId: 3,
        // formId:this.loginDetails['form'] ,
        sampleID: this.siteInfoPanelForm.controls.sampleID.value,
        testNumber: this.siteInfoPanelForm.controls.sampling.value ? this.siteInfoPanelForm.controls.sampling.value : '',
        sourceOfAlertPOE: this.siteInfoPanelForm.controls.sourceOfAlert.value ? this.siteInfoPanelForm.controls.sourceOfAlert.value : '',
        provinceId: this.provinceID,
        provinceName: this.siteInfoPanelForm.controls.province.value ? this.siteInfoPanelForm.controls.province.value : '',
        district: this.siteInfoPanelForm.controls.healthZone.value ? this.siteInfoPanelForm.controls.healthZone.value : '',
        districtId: this.districtID ? this.districtID : '',
        facilityId: this.facilityId ? this.facilityId : null,
        facilityName: this.siteInfoPanelForm.controls.facilityName.value ? this.siteInfoPanelForm.controls.facilityName.value : '',
        implementingPartner: this.implementingPartnerID ? this.implementingPartnerID : null,
        // "implementingPartnerName": this.siteInfoPanelForm.controls.implementingPartner.value,
        fundingSource: this.fundingSourceID ? parseInt(this.fundingSourceID) : null,
        // "fundingSourceName": this.siteInfoPanelForm.controls.fundingPartner.value,
        labId: this.labId,
        labName: this.labResultPanelForm.controls.labName.value,
        patientId: this.caseDetailsPanelForm.controls.patientId.value ? this.caseDetailsPanelForm.controls.patientId.value : '',
        externalSampleCode: this.caseDetailsPanelForm.controls.DHIS2CaseID.value ? this.caseDetailsPanelForm.controls.DHIS2CaseID.value : '',
        firstName: this.caseDetailsPanelForm.controls.firstName.value ? this.caseDetailsPanelForm.controls.firstName.value : '',
        lastName: this.caseDetailsPanelForm.controls.lastName.value ? this.caseDetailsPanelForm.controls.lastName.value : '',
        patientDob: this.caseDetailsPanelForm.controls.dob.value ? this.dateFormat(new Date(this.caseDetailsPanelForm.controls.dob.value)) : '',
        patientAge: this.caseDetailsPanelForm.controls.patientAge.value,
        patientGender: this.caseDetailsPanelForm.controls.patientGender.value ? this.caseDetailsPanelForm.controls.patientGender.value : '',
        isPatientPregnant: this.caseDetailsPanelForm.controls.isPatientPregnant.value ? this.caseDetailsPanelForm.controls.isPatientPregnant.value : '',
        patientPhoneNumber: this.caseDetailsPanelForm.controls.patientPhoneNumber.value ? this.caseDetailsPanelForm.controls.patientPhoneNumber.value : '',
        patientEmail: this.caseDetailsPanelForm.controls.patientEmail.value ? this.caseDetailsPanelForm.controls.patientEmail.value : '',
        patientAddress: this.caseDetailsPanelForm.controls.patientAddress.value,
        patientProvince: this.caseDetailsPanelForm.controls.patientProvince.value ? this.caseDetailsPanelForm.controls.patientProvince.value : '',
        patientProvinceId: this.patientProvinceID ? this.patientProvinceID : '',
        patientDistrict: this.caseDetailsPanelForm.controls.patientDistrict.value ? this.caseDetailsPanelForm.controls.patientDistrict.value : '',
        patientDistrictId: this.patientDistrictID ? this.patientDistrictID : '',
        patientZone:  this.caseDetailsPanelForm.controls.patientZone.value ? this.caseDetailsPanelForm.controls.patientZone.value : '',
        patientCity: this.caseDetailsPanelForm.controls.city.value ? this.caseDetailsPanelForm.controls.city.value : '',
        patientNationality: this.caseDetailsPanelForm.controls.patientNationality.value ? this.caseDetailsPanelForm.controls.patientNationality.value : '',
        patientNationalityName: this.caseDetailsPanelForm.controls.patientNationality.value ? this.caseDetailsPanelForm.controls.patientNationality.value : '',
        patientPassportNumber: this.caseDetailsPanelForm.controls.passportNumber.value ? this.caseDetailsPanelForm.controls.passportNumber.value : '',
        reasonForCovid19Test: this.reasonForCovidTest ? this.reasonForCovidTest : null,
        reasonDetails: reasonDetailsArray,
        covid19PatientSymptomsArray: this.covid19PatientSymptomsArray,
        feverTemp: this.vitalSignsPanelForm.controls.feverTemp.value ? this.vitalSignsPanelForm.controls.feverTemp.value : '',
        temperatureMeasurementMethod: this.vitalSignsPanelForm.controls.temperatureMeasurementMethod.value ? this.vitalSignsPanelForm.controls.temperatureMeasurementMethod.value : '',
        respiratoryRate: this.vitalSignsPanelForm.controls.respiratoryRate.value ? parseInt(this.vitalSignsPanelForm.controls.respiratoryRate.value) : '',
        oxygenSaturation: this.vitalSignsPanelForm.controls.oxygenSaturation.value ? parseInt(this.vitalSignsPanelForm.controls.oxygenSaturation.value) : '',
        specimenType: this.vitalSignsPanelForm.controls.specimenType.value ? parseInt(this.vitalSignsPanelForm.controls.specimenType.value) : '',
        numberOfDaysSick: this.vitalSignsPanelForm.controls.numberOfDaysSick.value ? parseInt(this.vitalSignsPanelForm.controls.numberOfDaysSick.value):'',
        dateOfSymptomOnset: this.vitalSignsPanelForm.controls.dateOfSymptomOnset.value,
        dateOfInitialConsultation: this.vitalSignsPanelForm.controls.dateOfInitialConsultation.value ? this.vitalSignsPanelForm.controls.dateOfInitialConsultation.value : '',
        sampleCollectionDate: this.vitalSignsPanelForm.controls.sampleCollectionDate.value ? this.dateTimeFormat(new Date(this.vitalSignsPanelForm.controls.sampleCollectionDate.value)) : '',
        sampleDispatchedDate: this.vitalSignsPanelForm.controls.sampleDispatchedOn.value ? this.dateTimeFormat(new Date(this.vitalSignsPanelForm.controls.sampleCollectionDate.value)) : '',
        asymptomatic: this.vitalSignsPanelForm.controls.asymptomatic.value ? this.vitalSignsPanelForm.controls.asymptomatic.value : '',
        medicalBackground: this.vitalSignsPanelForm.controls.medicalBackground.value,
        recentHospitalization: this.vitalSignsPanelForm.controls.recentHospitalization.value,
        patientLivesWithChildren: this.vitalSignsPanelForm.controls.patientLivesWithChildren.value,
        patientCaresForChildren: this.vitalSignsPanelForm.controls.patientCaresForChildren.value,
        closeContacts: this.vitalSignsPanelForm.controls.closeContacts.value,
        hasRecentTravelHistory: this.travelandContactPanelForm.controls.hasRecentTravelHistory.value ? this.travelandContactPanelForm.controls.hasRecentTravelHistory.value : '',
        countryName: this.travelandContactPanelForm.controls.countryName.value ? this.travelandContactPanelForm.controls.countryName.value : '',
        airline: this.travelandContactPanelForm.controls.airline.value ? this.travelandContactPanelForm.controls.airline.value : '',
        seatNo: this.travelandContactPanelForm.controls.seatNo.value ? this.travelandContactPanelForm.controls.seatNo.value : '',
        dateTimeofArrivalPicker: this.travelandContactPanelForm.controls.arrivalTime.value ? this.travelandContactPanelForm.controls.arrivalTime.value : '',
        airportOfDeparture: this.travelandContactPanelForm.controls.airportOfDeparture.value ? this.travelandContactPanelForm.controls.airportOfDeparture.value : '',
        transit: this.travelandContactPanelForm.controls.transit.value ? this.travelandContactPanelForm.controls.transit.value : '',
        reasonOfVisit: this.travelandContactPanelForm.controls.reasonOfVisit.value ? this.travelandContactPanelForm.controls.reasonOfVisit.value : '',
        patientOccupation: this.travelandContactPanelForm.controls.patientOccupation.value ? this.travelandContactPanelForm.controls.patientOccupation.value : '',
        doesPatientSmoke: this.travelandContactPanelForm.controls.doesPatientSmoke.value ? this.travelandContactPanelForm.controls.doesPatientSmoke.value : '',
        returnDate: this.travelandContactPanelForm.controls.returnDate.value ? this.dateFormat(new Date(this.travelandContactPanelForm.controls.returnDate.value)) : '',

        sampleReceivedDate: this.labResultPanelForm.controls.sampleReceivedDateTime.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.sampleReceivedDateTime.value)) : '',
        sampleCondition: this.labResultPanelForm.controls.sampleCondition.value ? this.labResultPanelForm.controls.sampleCondition.value : '',
        labTechnician: this.labTechnicianID ? this.labTechnicianID : '',
        labTechnicianName: this.labResultPanelForm.controls.labTechnician.value ? this.labResultPanelForm.controls.labTechnician.value : '',
        isSampleRejected: this.labResultPanelForm.controls.sampleRejected.value ? this.labResultPanelForm.controls.sampleRejected.value : '',
        rejectionDate: this.labResultPanelForm.controls.rejectionDate.value ? this.dateFormat(new Date(this.labResultPanelForm.controls.rejectionDate.value)) : '',
        // reasonForChanging: this.labResultPanelForm.controls.reasonForChanging.value ? this.labResultPanelForm.controls.reasonForChanging.value : '',
        reasonForChanging : this.reasonsArray,
        rejectionReason: this.rejectionReason || '',
        rejectionReasonid: this.rejectionReasonId || '',
        c19Tests: this.testDetails,
        testResult: this.labResultPanelForm.controls.result.value ? this.labResultPanelForm.controls.result.value : '',
        testedBy: this.testedByID ? this.testedByID : '',
        testedByName: this.labResultPanelForm.controls.testedBy.value ? this.labResultPanelForm.controls.testedBy.value : '',
        isResultAuthorized: this.labResultPanelForm.controls.resultAuthorized.value ? this.labResultPanelForm.controls.resultAuthorized.value : '',
        authorizedBy: this.labResultPanelForm.controls.authorizedBy.value ? this.labResultPanelForm.controls.authorizedBy.value : '',
        authorizedOn: this.labResultPanelForm.controls.authorizedOn.value ? this.dateFormat(new Date(this.labResultPanelForm.controls.authorizedOn.value)) : '',
        reviewedBy: this.reviewed ,
        reviewedOn: this.labResultPanelForm.controls.reviewedOn.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.reviewedOn.value)) : '',
        approvedBy: this.labResultPanelForm.controls.approvedBy.value ? this.labResultPanelForm.controls.approvedBy.value : null,
        approvedOn: this.labResultPanelForm.controls.approvedOn.value ? this.dateTimeFormat(new Date(this.labResultPanelForm.controls.approvedOn.value)) : '',
      };

      // tslint:disable-next-line: no-debugger

      console.log('drc add request', saveCovid19SSJSON,isAddOrUpdate);
      this.db.insertCovid19Data(saveCovid19SSJSON, isAddOrUpdate);

      if (this.mode == undefined) {
        for (let inner in this.siteInfoPanelForm.controls) {
          this.siteInfoPanelForm.get(inner).setValue('');
          this.siteInfoPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.caseDetailsPanelForm.controls) {
          this.caseDetailsPanelForm.get(inner).setValue('');
          this.caseDetailsPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.caseDefinitionsPanelForm.controls) {
          this.caseDefinitionsPanelForm.get(inner).setValue('');
          this.caseDefinitionsPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.vitalSignsPanelForm.controls) {
          this.vitalSignsPanelForm.get(inner).setValue('');
          this.vitalSignsPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.travelandContactPanelForm.controls) {
          this.travelandContactPanelForm.get(inner).setValue('');
          this.travelandContactPanelForm.get(inner).setErrors(null);
        }
        for (let inner in this.labResultPanelForm.controls) {
          this.labResultPanelForm.get(inner).setValue('');
          this.labResultPanelForm.get(inner).setErrors(null);
        }
      }
    }
  }
}
