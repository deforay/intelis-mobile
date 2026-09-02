import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CrudOperationsService, Events } from '../../../app/service/providers';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  appVersionNumber;

  constructor(
    public alertController: AlertController,
    public CrudService: CrudOperationsService,
    private router: Router,
    private storage: Storage,
    public events: Events,
  ) {}

  async ionViewWillEnter() {
    await this.storage.create();
  }

  async alertWithCustomButtons(
    headerMessage: string,
    confirmButtonText1: string,
    confirmButtonText2: string,
    contentMessage: string,
    alertName?: any
  ) {
    console.log(alertName,'alertName');
    // confirmButtonText3 : string,
    const element = await this.alertController.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const alert = await this.alertController.create({
      header: headerMessage,
      message: contentMessage,
      mode: 'ios',
      buttons: [
        {
          text: confirmButtonText1,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            if (alertName == 'isChangedTestTypeResultPanel') {
              // this.eventCtrl.publish('isAcceptedTestResultData:false');
            }
          },
        },
        {
          text: confirmButtonText2,
          cssClass: 'primary',
          handler: async () => {
            if (alertName == 'playStoreAlert') {
              // this.market.open('com.deforay.ept');
            }
            if (alertName == 'appExitAlert') {
              navigator['app'].exitApp();
            }
            if (alertName == 'formExitAlert') {
              this.router.navigate(['/all-pt-schemes'], {
                replaceUrl: true,
              });
            }
            if (alertName == 'logoutAlert') {
              this.storage.set('isLogOut', true);
              this.storage.remove('appPin');
              this.router.navigate(['/login'], {
                replaceUrl: true,
              });
            }
            if (alertName == 'primaryEmailAlert') {
              // this.eventCtrl.publish('isChangedPrimaryEmail:true');
            }
            if (alertName == 'isChangedTestTypeResultPanel') {
              // this.eventCtrl.publish('isChangedTestTypeResultPanel:true');
            }
          },
        },
      ],
      backdropDismiss: false,
    });

    await alert.present();
  }
  async presentAlert(
    headerMessage: string,
    contentMessage: string,
    alertName?: any
  ) {
    const element = await this.alertController.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const alert = await this.alertController.create({
      header: headerMessage,
      //  subHeader: 'Subtitle',
      message: contentMessage,
      mode: 'ios',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (alertName == 'syncProcessAlert') {
              this.router.navigate(['/all-pt-schemes']);
            }
            if (alertName == 'offlineSyncMsg') {
              this.router.navigate(['/all-pt-schemes']);
            }
            if (alertName == 'resendMailAlert') {
              // this.eventCtrl.publish('resendMail:true');
            }
          },
        },
      ],
      backdropDismiss: false,
    });
    await alert.present();
  }
  async presentAlertConfirm(
    headerMessage: string,
    subtitle: string,
    contentMessage: string,
    rightSideButtonText: string,
    leftSideButtonText: string,
    alertName?: any
  ) {
    const element = await this.alertController.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const alert = await this.alertController.create({
      header: headerMessage,
      subHeader: subtitle,
      message: contentMessage,
      mode: 'ios',
      buttons: [
        {
          text: rightSideButtonText,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            if (alertName == 'isChangedTestTypeResultPanel') {
              // this.eventCtrl.publish('isAcceptedTestResultData:false');
            }

          },
        },
        {
          text: leftSideButtonText,
          cssClass: 'primary',
          handler: async () => {
            if (alertName == 'playStoreAlert') {
              // this.market.open('com.deforay.ept');
            }
            if (alertName == 'appExitAlert') {
              navigator['app'].exitApp();
            }
            if (alertName == 'formExitAlert') {
              this.router.navigate(['/menu'], {
                replaceUrl: true,
              });
            }
            if (alertName == 'invalidPIN') {
              this.storage.set('isLogOut', true);
              this.storage.remove('appPin');
              this.router.navigate(['/login'], {
                replaceUrl: true,
              });
            }
            if (alertName == 'primaryEmailAlert') {
              // this.eventCtrl.publish('isChangedPrimaryEmail:true');
            }
            if (alertName == 'isChangedTestTypeResultPanel') {
              // this.eventCtrl.publish('isChangedTestTypeResultPanel:true');
            }

          },
        },
      ],
      backdropDismiss: false,
    });

    await alert.present();
  }
  async presentAlertMultipleButtons(
    headerMessage: string,
    subtitle: string,
    contentMessage: string,
    firstButtonText: string,
    secondButtonText: string,
    thirdButtonText: string,
    alertName?: any
  ) {
    const alert = await this.alertController.create({
      header: headerMessage,
      subHeader: subtitle,
      message: contentMessage,
      mode: 'ios',
      buttons: [
        {
          text: firstButtonText,
          role: 'cancel',
          handler: () => {},
        },
        {
          text: secondButtonText,
          cssClass: 'secondary',
          handler: async () => {
            console.log(alertName,'alertName');
            if (alertName == 'logoutAlert') {

                this.router.navigate(['/login'], { replaceUrl: true });
                this.storage.set('isLogOut', true);
                this.storage.remove('privileges');


              // this.eventCtrl.publish('setLoggedOutFCM:true');
            }
          },
        },
        {
          text: thirdButtonText,
          cssClass: 'secondary',
          handler: () => {
            if (alertName == 'logoutAlert') {
              this.router.navigate(['/enter-app-password']);
              this.storage.set('isLogOut', false);
              // this.eventCtrl.publish('setLoggedOutFCM:true');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async alertWithSingleButton(
    headerMessage: string,
    confirmButtonText: string,
    contentMessage: string,
    alertName?: any
  ) {
    const element = await this.alertController.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }

    const alert = await this.alertController.create({
      header: headerMessage,
      message: contentMessage,
      backdropDismiss: false,
      mode: 'ios',
      buttons: [
        {
          text: confirmButtonText,
          cssClass: 'primary',
          handler: () => {
            console.log(this.router.url.split(';')[0]);
            
            if (this.router.url.split(';')[0] == '/add-new-request') {
              if (alertName == 'localTestReqAlert') {
                this.router.navigate(['/eid-view-southsudan']);
              }
            } else if (
              this.router.url.split(';')[0] == '/covid19-add-southsudan'
            ) {
              if (alertName == 'localTestReqAlert') {
                this.router.navigate(['/covid19-view-southsudan']);
              }
            }  else if (
              this.router.url.split(';')[0] == '/mohdrc-add-new-request'
            ) {
              if (alertName == 'localTestReqAlert') {
                this.router.navigate(['/mohdrc-view-test-request']);
              }
            }else if (this.router.url.split(';')[0] == '/vl-new-request') {
              if (alertName == 'localTestReqAlert') {
                this.router.navigate(['/vl-view-southsudan']);
              }
            } else if (this.router.url.split(';')[0] == '/new-eid-drc') {
              if (alertName == 'localTestReqAlert') {
                this.router.navigate(['/eid-view-drc']);
              }
            }
            else if (this.router.url.split(';')[0] == '/new-vl-drc') {
              if (alertName == 'localTestReqAlert') {
                this.router.navigate(['/view-vl-drc']);
              }
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmAlert(
    headerMessage: string,
    contentMessage: string,
    redirectLink?: any
  ) {
    const element = await this.alertController.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const alert = await this.alertController.create({
      header: headerMessage,
      message: contentMessage,
      backdropDismiss: false,
      mode: 'ios',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Yes',
          cssClass: 'primary',
          handler: () => {
            if (redirectLink == 'appExitAlert') {
              navigator['app'].exitApp();
            }
            if (redirectLink == 'addEditForm') {
              this.events.publish('isBackForm', true);
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
