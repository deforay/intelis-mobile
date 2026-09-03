import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  Storage
} from '@ionic/storage-angular';
import {
  FormControl,
  FormGroup,
} from '@angular/forms';
import {
  CrudOperationsService,
  AlertService
} from '../../../../app/service/providers';
import {
  PopoverController
} from '@ionic/angular';
import {
  SortingPopoverComponent
} from '../../../component/sorting-popover/sorting-popover.component';
import { CommonService } from '../../../service/common/common.service';

@Component({
    selector: 'app-mohdrc-view-test-result',
    templateUrl: './mohdrc-view-test-result.page.html',
    styleUrls: ['./mohdrc-view-test-result.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MohdrcViewTestResultPage implements OnInit {
  isNoRecord: boolean = false;
  userID: any;
  facilitiesArray: any = [];
  authToken: any;
  searchArray: any = [];
  searchRecordForm = new FormGroup({

    sampleCode: new FormControl('', []),
    patientID: new FormControl('', []),
    patientName: new FormControl('', []),
    facilities: new FormControl('', []),
    sampleStatus: new FormControl('', []),

  });
  sortedData: any;
  searchSortingArray: any = [];
  skeltonArray: any = [];
  sampleStatusArray: any = [];

  constructor(private storage: Storage,
    public CrudService: CrudOperationsService,
    public alertService: AlertService,
    public commonservice: CommonService,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {

    await this.storage.create();

    await this.storage.get('loginDetails').then(async (loginDetails) => {
      if (loginDetails) {
        this.userID = loginDetails['user'].user_id;
        this.authToken = loginDetails['api_token'];
      }
    })

    await this.storage.get('initArray').then(async (initArray) => {
      if (initArray) {
        this.facilitiesArray = initArray.testingLabsList.filter(item => item.test_type === 'covid19');
        this.sampleStatusArray = initArray['covid19'].statusFilterList;
      }
    })

    this.isNoRecord = true;

  }

  reset() {
    for (let inner in this.searchRecordForm.controls) {
      this.searchRecordForm.get(inner).setValue('');
      this.searchRecordForm.get(inner).setErrors(null);
    }
    this.searchArray = [];
    this.isNoRecord = true;
  }

  async searchRecord() {

    if (this.searchRecordForm.controls.sampleCode.value == '' && this.searchRecordForm.controls.patientID.value == '' && this.searchRecordForm.controls.patientName.value == '' && this.searchRecordForm.controls.facilities.value == '' && this.searchRecordForm.controls.sampleStatus.value == '') {

      this.alertService.alertWithSingleButton('Alert', 'OK', "Please enter at least one search field");

    } else {
      this.searchArray = [];

      this.skeltonArray = [{}, {}, {}, {}];

      let searchJSON = {
        "sampleCode": this.searchRecordForm.controls.sampleCode.value ? [
          this.searchRecordForm.controls.sampleCode.value
        ] : [],
        "patientId": this.searchRecordForm.controls.patientID.value ? [
          this.searchRecordForm.controls.patientID.value
        ] : [],
        "patientName": this.searchRecordForm.controls.patientName.value ? this.searchRecordForm.controls.patientName.value : '',
        "facility": this.searchRecordForm.controls.facilities.value ? this.searchRecordForm.controls.facilities.value : [],
        "sampleStatus": this.searchRecordForm.controls.sampleStatus.value ? [this.searchRecordForm.controls.sampleStatus.value] : [],
        "markAsSent": false,
        "sampleCollectionDate": []
      }

      await this.CrudService.postDataWithLoader('/api/v1.1/covid-19/fetch-results.php', searchJSON, this.authToken, true).then(async (result) => {
        if (result['token'] != null) {
          console.log(result['token'], 'result[token]');
          this.authToken = result['token'];
          this.commonservice.tokenUpdate(result['token']);
        }
        this.skeltonArray = [];

        if (result['status'] == 'success') {

          this.searchArray = result['data'];
          this.searchSortingArray = result['data'];
          if (this.searchArray.length == 0) {
            this.isNoRecord = true;
          } else {
            this.isNoRecord = false;
          }
        }
      }, (err) => {
        this.skeltonArray = [];
        this.isNoRecord = true;
        this.alertService.alertWithSingleButton('Alert', 'OK', 'Something went wrong.Please try again later.');

      });
    }
  }

  async presentSortingPopover(ev: any) {

    this.skeltonArray = [{}, {}, {}, {}];

    const popover = await this.popoverController.create({
      component: SortingPopoverComponent,
      componentProps: {
        order: this.sortedData ? this.sortedData.order : '',
        value: this.sortedData ? this.sortedData.value : ''
      },
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    popover.onDidDismiss()
      .then((result) => {

        console.log(result['data']);
        if (result['data']) {
          this.sortedData = result['data'];
          this.searchArray = [];
        }
        setTimeout(() => {
          if (this.sortedData) {

            if (this.sortedData.order == 'asc' && this.sortedData.value == 'lastModified') {

              this.searchArray = this.searchSortingArray.sort(function (a, b) {
                return new Date(a.updatedOn ? a.updatedOn : a.createdOn).getTime() - new Date(b.updatedOn ? b.updatedOn : b.createdOn).getTime()
              });
            } else if (this.sortedData.order == 'des' && this.sortedData.value == 'lastModified') {
              this.searchArray = this.searchSortingArray.sort(function (a, b) {
                return new Date(b.updatedOn ? b.updatedOn : b.createdOn).getTime() - new Date(a.updatedOn ? a.updatedOn : a.createdOn).getTime()
              });
            } else if (this.sortedData.order == 'asc' && this.sortedData.value == 'sampleCollectionDate') {

              this.searchArray = this.searchSortingArray.sort(function (a, b) {
                return new Date(a.sampleCollectionDate ? a.sampleCollectionDate : a.sampleCollectionDate).getTime() - new Date(b.sampleCollectionDate ? b.sampleCollectionDate : b.sampleCollectionDate).getTime()
              });
            } else if (this.sortedData.order == 'des' && this.sortedData.value == 'sampleCollectionDate') {

              this.searchArray = this.searchSortingArray.sort(function (a, b) {
                return new Date(b.sampleCollectionDate ? b.sampleCollectionDate : b.sampleCollectionDate).getTime() - new Date(a.sampleCollectionDate ? a.sampleCollectionDate : a.sampleCollectionDate).getTime()
              });

            } else if (this.sortedData.order == 'asc' && this.sortedData.value == 'sampleCode') {

              this.searchArray = this.searchSortingArray.sort(function (a, b) {
                let bSampleCodeLength = b.sampleCode.length;
                let aSampleCodeLength = a.sampleCode.length;

                (a.sampleCode.substring(aSampleCodeLength - 3)) >
                (b.sampleCode.substring(bSampleCodeLength - 3))

                return 1;

              });
            } else if (this.sortedData.order == 'des' && this.sortedData.value == 'sampleCode') {

              this.searchArray = this.searchSortingArray.sort(function (a, b) {

                let bSampleCodeLength = b.sampleCode.length;
                let aSampleCodeLength = a.sampleCode.length;

                (a.sampleCode.substring(aSampleCodeLength - 3)) <
                (b.sampleCode.substring(bSampleCodeLength - 3))

                return -1;
              });
            } else {
              this.searchArray = this.searchSortingArray.sort(function (a, b) {
                return new Date(b.last_modified_datetime ? b.last_modified_datetime : b.createdOn).getTime() - new Date(a.last_modified_datetime ? a.last_modified_datetime : a.createdOn).getTime()
              });
            }

          }
        }, 500);

        setTimeout(() => {
          this.skeltonArray = [];
        }, 1500);
      });
  }

  getSkeltonColor() {
    // var colors = ['#50C878', '#f6cd61', '#ff726f'];
    // return colors[Math.floor(Math.random() * colors.length)];

    return ['#50C878', '#f6cd61', '#ff726f'];
  }
}
