import {
  Injectable
} from '@angular/core';
import {
  Storage
} from '@ionic/storage-angular';
import {
  LoaderService,
} from '../../../app/service/providers';
import _ from "lodash";
import {
  LoadingController
} from '@ionic/angular';
import {
  AlertService
} from '../alert/alert.service';
@Injectable({
  providedIn: 'root'
})
export class LocalTestRequestFormService {

  localTestRequestFormArray = [];
  existingTestRequestArray = [];
  formJSONArray: any = [];
  authToken: any;
  appVersionNumber: any;
  existingTestReqArray = [];
  existingTestReqIndex: any;

  constructor(private storage: Storage,
    public alertService: AlertService,
    public LoaderService: LoaderService,
    public loadingCtrl: LoadingController,
  ) {}

  async ionViewWillEnter() {
    await this.storage.create();
  }

  async offlineStoreShipmentForm(formJSON, isAddOrUpdate) {

    const element = await this.loadingCtrl.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
      message: 'Please wait',
    });
    await loading.present();
    await this.storage.get('localTestRequestForm').then(async (result) => {
      if (result == null) {
        await this.storage.set('localTestRequestForm', []);
      }
    })

    await this.storage.get('localTestRequestForm').then(async (localTestRequestForm) => {
      if (localTestRequestForm) {

        this.localTestRequestFormArray = localTestRequestForm;
        await this.storage.get('loginDetails').then(async (loginDetails) => {
          if (loginDetails) {

            this.existingTestRequestArray = this.localTestRequestFormArray.filter(
              item => item.userID == loginDetails['user'].user_id);

            this.appVersionNumber = await this.storage.get("appVersionNumber");
            if (this.existingTestRequestArray.length == 0) {

              this.formJSONArray = [];
              this.formJSONArray.push(formJSON);

              this.localTestRequestFormArray.push({
                "userID": loginDetails['user'].user_id,
                "userName": loginDetails['user'].user_name,
                "authToken": loginDetails['api_token'],
                "appVersion": await this.storage.get("appVersionNumber"),
                "testFormArray": this.formJSONArray

              })

            } else {

              this.existingTestReqIndex = _.findIndex(this.localTestRequestFormArray, {
                userID: loginDetails['user'].user_id
              });

              //find existing old shipment id and removing it start...
              let existingOldTestReqIndex = _.findIndex(this.localTestRequestFormArray[this.existingTestReqIndex].testFormArray, {
                appSampleCode: formJSON.appSampleCode
              });
              if (existingOldTestReqIndex != -1) {
                this.localTestRequestFormArray[this.existingTestReqIndex].testFormArray.splice(existingOldTestReqIndex, 1);
              }
              //end...
              this.existingTestReqArray = [];
              if (this.localTestRequestFormArray[this.existingTestReqIndex].testFormArray.length != 0) {
                this.existingTestReqArray = this.localTestRequestFormArray[this.existingTestReqIndex].testFormArray;
              }
              this.formJSONArray = [];
              this.formJSONArray.push(formJSON);

              this.localTestRequestFormArray[this.existingTestReqIndex].testFormArray = [];
              if (this.existingTestReqArray.length != 0) {
                this.localTestRequestFormArray[this.existingTestReqIndex].testFormArray = this.existingTestReqArray.concat(this.formJSONArray);
              } else { 
                this.localTestRequestFormArray[this.existingTestReqIndex].testFormArray = this.formJSONArray;
              }
            }

            await this.storage.set("localTestRequestForm", this.localTestRequestFormArray);
            // await this.storage.set('lastappSampleCode', formJSON.appSampleCode);


            if (this.localTestRequestFormArray.length != 0) {
            // await this.storage.set('lastappSampleCode', formJSON.appSampleCode);
              if (isAddOrUpdate == 'add') {
                  this.alertService.alertWithSingleButton('Success', 'OK', "New Test Request added successfully", 'localTestReqAlert');
              } else {
                console.log('update alert');
                this.alertService.alertWithSingleButton('Success', 'OK', "Test Request updated successfully", 'localTestReqAlert');
              }
            }
          }
        })
      }
    })
    loading.dismiss();

  }
}
