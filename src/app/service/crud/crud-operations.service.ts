import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  LoadingController
} from '@ionic/angular';
import {
  Storage
} from '@ionic/storage-angular';
import {
  Router
} from '@angular/router';
import {
  AlertController
} from '@ionic/angular';
import { nanoid } from 'nanoid';
import * as pako from 'pako';
// import { Device } from '@awesome-cordova-plugins/device/ngx';

@Injectable( {
  providedIn: 'root'
} )
export class CrudOperationsService {
  appVersionNumber;
  deviceID;
  deviceOSVersion;
  deviceuuid;
  constructor( public http: HttpClient,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private router: Router,
    public alertController: AlertController,
    // private deviceInfo: Device
  ) {

  }

  async ionViewWillEnter() {
    // tslint:disable-next-line: no-debugger
    await this.storage.create();
    await this.createUser();
  }
  async createUser() {
    const id = nanoid();
    console.log( 'nanoid device id', id );
  }
  private gzipPayload(payload: any) {
    const str = JSON.stringify(payload);
    const utf8Data = unescape(encodeURIComponent(str));
    const geoJsonGz = pako.gzip(utf8Data);
    const gzippedBlob = new Blob([geoJsonGz]);
    console.log(str, utf8Data, geoJsonGz,gzippedBlob, 'test');
    return gzippedBlob;
    // return pako.gzip(JSON.stringify(payload)); // Compress the payload using pako
  }
  async postDataWithLoader( URL, credentials, authToken, useGzip) {
    console.log(useGzip,'useGzip');
    let payload = credentials;
    // useGzip=true;
    if (useGzip) {
      // GZIP the payload and add the appropriate headers
      payload = this.gzipPayload(credentials);
      var headers = new HttpHeaders().set('Content-Encoding', 'gzip').set('Content-Type', 'application/json').set( 'Authorization', 'Bearer ' + authToken ).set( 'appVersion', this.appVersionNumber ).set( 'deviceId', this.deviceID ).set( 'deviceOSVersion', this.deviceOSVersion).set( 'deviceuuid', this.deviceuuid);
      // .set('Accept-Encoding', 'gzip');
    }
    else{
      payload = JSON.stringify( credentials );
      var headers = new HttpHeaders().set( 'Content-Type', 'application/json' ).set( 'Authorization', 'Bearer ' + authToken ).set( 'appVersion', this.appVersionNumber ).set( 'deviceId', this.deviceID ).set( 'deviceOSVersion', this.deviceOSVersion).set( 'deviceuuid', this.deviceuuid); 
    }
    const loading = await this.loadingCtrl.create( { spinner: 'dots', backdropDismiss: false, mode: 'ios', message: 'Please wait', } );
    await loading.present();
    return new Promise( async ( resolve, reject ) => {
      const apiURL = await this.storage.get( 'apiUrl' );
      if ( apiURL ) { this.http.post( apiURL + URL, payload, { headers } ).subscribe( res => {
            if ( loading ) {
              loading.dismiss();
            }
            resolve( res );
          }, async ( err ) => {
            if ( loading ) {
              loading.dismiss();
            }
            if ( err.status === 401 ) {
              this.alertWithSingleButton( 'Error', 'OK', 'Login expired. Please login again', '' );
              await this.storage.set( 'isLoggedIn', false );
              this.router.navigate( ['/login'] );
            }
            reject( err );
          } );
      }
    } );
  }

  async postDataWithoutAuthToken( URL, credentials ) {
    const headers = new HttpHeaders().set( 'Content-Type', 'application/json' ).set( 'appVersion', this.appVersionNumber ).set( 'deviceId', this.deviceID ).set( 'deviceOSVersion', this.deviceOSVersion).set( 'deviceuuid', this.deviceuuid)
    const loading = await this.loadingCtrl.create( {
      spinner: 'dots',
      backdropDismiss: false,
      mode: 'ios',
      message: 'Please wait',
    } );
    await loading.present();

    return new Promise( async ( resolve, reject ) => {

      const apiURL = await this.storage.get( 'apiUrl' );
      if ( apiURL ) {
        this.http.post( apiURL + URL, JSON.stringify( credentials ), {
          headers
        } )
          .subscribe( res => {
            if ( loading ) {
              loading.dismiss();
            }
            resolve( res );
          }, async ( err ) => {
            if ( loading ) {
              loading.dismiss();
            }
            if ( err.status === 401 ) {
              this.alertWithSingleButton( 'Error', 'OK', 'Login expired. Please login again', '' );
              await this.storage.set( 'isLoggedIn', false );
              this.router.navigate( ['/login'] );
            }
            reject( err );
          } );
      }
    } );
  }

  async postDataWithoutLoader( URL, credentials, authToken, useGzip ) {
    let payload = credentials;
    // useGzip=true;
    if (useGzip) {
      // GZIP the payload and add the appropriate headers
      payload = this.gzipPayload(credentials);
      var headers = new HttpHeaders().set('Content-Encoding', 'gzip').set('Content-Type', 'application/json').set( 'Authorization', 'Bearer ' + authToken ).set( 'appVersion', this.appVersionNumber ).set( 'deviceId', this.deviceID ).set( 'deviceOSVersion', this.deviceOSVersion).set( 'deviceuuid', this.deviceuuid);
      // .set('Accept-Encoding', 'gzip');
    }
    else{
      payload = JSON.stringify( credentials );
      var headers = new HttpHeaders().set( 'Content-Type', 'application/json' ).set( 'Authorization', 'Bearer ' + authToken ).set( 'appVersion', this.appVersionNumber ).set( 'deviceId', this.deviceID ).set( 'deviceOSVersion', this.deviceOSVersion).set( 'deviceuuid', this.deviceuuid); 
    }
 
    return new Promise( async ( resolve, reject ) => {
      const apiURL = await this.storage.get( 'apiUrl' );
      if ( apiURL ) {
        this.http.post( apiURL + URL, payload, {headers} ).subscribe( res => {resolve( res );}, async ( err ) => {
            if ( err.status === 401 ) {
              this.alertWithSingleButton( 'Error', 'OK', 'Login expired. Please login again', '' );
              await this.storage.set( 'isLoggedIn', false );
              this.router.navigate( ['/login'] );
            }
            reject( err );
          } );
      }
    } );
  }

  getData( URL ) {
    return new Promise( async ( resolve, reject ) => {
      const apiURL = await this.storage.get( 'apiUrl' );
      if ( apiURL ) {
        this.http.get( apiURL + URL )
          .subscribe( res => {
            resolve( res );
          }, async ( err ) => {
            if ( err.status === 401 ) {
              this.alertWithSingleButton( 'Error', 'OK', 'Login expired. Please login again', '' );
              await this.storage.set( 'isLoggedIn', false );
              this.router.navigate( ['/login'] );
            }
            reject( err );
          } );
      }
    } );
  }

  async getDataWithLoader( URL, PARAMS ) {
    const loading = await this.loadingCtrl.create( {
      spinner: 'dots',
      mode: 'ios',
      message: 'Please wait',
    } );
    await loading.present();
    return new Promise( async ( resolve, reject ) => {
      const apiURL = await this.storage.get( 'apiUrl' );
      if ( apiURL ) {
        this.http.get( apiURL + URL + PARAMS )
          .subscribe( res => {
            if ( loading ) {
              loading.dismiss();
            }
            resolve( res );
          }, async ( err ) => {
            if ( loading ) {
              loading.dismiss();
            }
            if ( err.status === 401 ) {
              this.alertWithSingleButton( 'Error', 'OK', 'Login expired. Please login again', '' );
              await this.storage.set( 'isLoggedIn', false );
              this.router.navigate( ['/login'] );
            }
            reject( err );
          } );
      }
    } );
  }

  async alertWithSingleButton( headerMessage: string, confirmButtonText: string, contentMessage: string, alertName?: any ) {
    const element = await this.alertController.getTop();
    if ( element && element.dismiss ) {
      element.dismiss();
    }
    const alert = await this.alertController.create( {
      header: headerMessage,
      message: contentMessage,
      backdropDismiss: false,
      mode: 'ios',
      buttons: [{
        text: confirmButtonText,
        cssClass: 'primary',
        handler: () => {

        }
      }]
    } );

    await alert.present();
  }
}
