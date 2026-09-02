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

async show(){
  const element = await this.loadingController.getTop();
  if (element && element.dismiss) {
    element.dismiss();
  }
  const loading = await this.loadingController.create({
    message: 'Please wait',
    mode:"ios",
    spinner: 'dots',
    backdropDismiss: false
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
}

async hide(){
  const element = await this.loadingController.getTop();
  if (element && element.dismiss) {
    element.dismiss();
  }
  const loading = await this.loadingController.create({
    message: 'Please wait',
    mode:"ios",
    spinner: 'dots',
    backdropDismiss: false
  });
  await loading.dismiss();
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
