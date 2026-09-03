import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public loadingController: LoadingController) { 
    
  }
  async presentLoading() {
    const element = await this.loadingController.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1000,
      backdropDismiss: false
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
   
  }
async dissmissLoading(){
  const loading = await this.loadingController.create({
    message: 'Please wait...',
    duration: 1000,
    backdropDismiss: false
  });
await loading.dismiss();

}

async show(message: string = 'Please wait'){
  const element = await this.loadingController.getTop();
  if (element && element.dismiss) {
    element.dismiss();
  }
  const loading = await this.loadingController.create({
    message,
    mode:"ios",
    spinner: 'dots',
    backdropDismiss: false
  });
  await loading.present();
  // Resolve once shown. Waiting for dismissal here would block callers that await show().
}

  /** Update the text of the loader currently on screen, if any. */
  async setMessage(message: string) {
    const element: any = await this.loadingController.getTop();
    if (element) {
      element.message = message;
    }
  }

async hide(){
  // Loaders can stack (the HTTP layer shows its own during requests); dismiss every one.
  for (let i = 0; i < 5; i++) {
    const element = await this.loadingController.getTop();
    if (!element || !element.dismiss) { break; }
    await element.dismiss();
  }
}
  async presentLoadingWithOptions() {
    const element = await this.loadingController.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  
  }
}
