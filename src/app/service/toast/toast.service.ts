import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastCtrl: ToastController) { }
  async presentToastWithOptions(message: string)  {
    const element = await this.toastCtrl.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const toast = await this.toastCtrl.create({
      header: message,
     // mode:"ios",
      animated:true,
      position: 'bottom',
      cssClass:'toastMessage',
      duration: 3000
      // buttons: [
      //    {
      //     text: 'OK',
      //     role: 'cancel',
      //     handler: () => {
      //     }
      //   }
      // ]
    });
    toast.present();
  }
  async presentToastWithoutOptions(message: string) {
    const element = await this.toastCtrl.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const toast = await this.toastCtrl.create({
      header: message,
      animated:true,
    //  mode:"ios",
      position: 'bottom',
      cssClass:'custom-toast',
      duration: 3000
    });
    toast.present();
  }
}
