import { Component, ViewChild } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform, IonRouterOutlet, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CommonService } from '../app/service/common/common.service';
import { Device } from '@ionic-native/device/ngx';
import { v4 as uuidv4 } from 'uuid';
import {
  CrudOperationsService,
  Events,
  themeService,
  AlertService,
  MultilevelService,
  SyncTestRequestsService,
} from '../app/service/providers';
import { Network } from '@ionic-native/network/ngx';
import { interval } from 'rxjs';
import { nanoid } from 'nanoid';
import { DbMigrationService } from '../app/services/db-migration.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  @ViewChild(IonRouterOutlet, {
    static: true,
  })
  routerOutlet: IonRouterOutlet;
  deviceOSVersion: string;
  uuid:any;
  deviceuuid: string;
  appVersionNumber: any;
  userName: any;
  showLevel1 = null;
  showLevel2 = null;
  showLevel3 = null;
  public navPages: any = [];
  public appPages: any = [];
  selectedTheme: String;
  isTestingUser: String;
  userRole: any;
  initArray: any = [];
  authToken: any;
  selectedIndex: number;
  tmpPg: any = [];

  constructor(
    private device: Device,
    private appVersion: AppVersion,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    private menu: MenuController,
    public alertService: AlertService,
    private multilevelService: MultilevelService,
    public events: Events,
    public themeService: themeService,
    public network: Network,
    public SyncReq: SyncTestRequestsService,
    private alertController: AlertController,
    public CrudService: CrudOperationsService,
    public commonservice: CommonService,
    private dbMigrationService: DbMigrationService
  ) {
    this.platform.ready().then(() => {
      this.getDeviceOSVersion();
    });
    this.initializeApp();
    console.log('Hi initializeApp');
    this.multilevelService.fetchMenuItems().then((data: any) => {
      this.storage.get('initArray').then(async (initArray) => {
        this.tmpPg = [];
        if (initArray) {
          initArray.activeModule = initArray.activeModule.replace(/['"]+/g, '');
          if (initArray.activeModule) {
            for (var i = 0; i < data.length; i++) {
              var result = data.filter(obj => {
                if (initArray.activeModule.indexOf(data[i].activeModule) != -1) {
                  return data[i].activeModule;
                }
              })
              if (initArray.activeModule.indexOf(data[i].activeModule) != -1) {
                if(result[i].formID == initArray.formId){
                  this.tmpPg.push(result[i]);
                  console.log(result[i].formID, 'this.tmpPg', initArray.formId);
                }
              }
            }
          }
        }
      })
      this.appPages = data;
      this.storage.set('appPages', this.appPages);
    });
    this.events.subscribe('privilege', (data: any) => {
      console.log(data,'data from privilege');
      this.storage.get('initArray').then(async (initArray) => {
        this.tmpPg = [];
        if (initArray) {
          initArray.activeModule = initArray.activeModule.replace(/['"]+/g, '');

          if (initArray.activeModule) {
            for (var i = 0; i < data.length; i++) {
              var result = data.filter(obj => {
                if (initArray.activeModule.indexOf(data[i].activeModule) != -1) {
                  return data[i].activeModule;
                }
              })
              if (initArray.activeModule.indexOf(data[i].activeModule) != -1) {
                if(result[i].formID == initArray.formId){
                  this.tmpPg.push(result[i]);
                  console.log(result[i].formID, 'this.tmpPg', initArray.formId);
                }
              }
            }
          }
        }
      })
      
      this.appPages = this.tmpPg;
      this.storage.set('appPages in appComponent', this.appPages);
    });
    this.storage.get('loginDetails').then(async (loginDetails) => {
      if (loginDetails && loginDetails.user) {
        this.userName = loginDetails.user.user_name;
        this.isTestingUser = loginDetails.user.testing_user;
        this.userRole = loginDetails.user.role_name;
        if (this.isTestingUser == 'yes') {
          this.selectedTheme = 'blue-theme';
        } else {
          this.selectedTheme = 'red-theme';
        }
      }
    });

    this.events.subscribe('setTheme', (data: any) => {
      this.isTestingUser = data;
      if (this.isTestingUser == 'yes') {
        this.selectedTheme = 'blue-theme';
      } else {
        this.selectedTheme = 'red-theme';
      }
    });
  }

  getDeviceOSVersion() {
    this.deviceOSVersion = this.device.version;
    this.device.uuid = uuidv4();
    this.deviceuuid = this.device.uuid;
    this.CrudService.deviceOSVersion =this.deviceOSVersion
    this.CrudService.deviceuuid = this.deviceuuid
    this.storage.set('deviceOSVersion', this.deviceOSVersion);
    this.storage.set ('deviceuuid',this.deviceuuid)
  }
  


  async initializeApp() {
    console.log('initialize');
    await this.createUser();
    await this.storage.create();
    this.platform.ready().then(async () => {
      await this.statusBar.styleLightContent();
      await this.splashScreen.hide();
      this.appVersion.getVersionNumber().then(
        async (version) => {
          if (version) {
            this.appVersionNumber = version;
            this.CrudService.appVersionNumber = this.appVersionNumber;
            await this.storage.set('appVersionNumber', this.appVersionNumber);
          }
        },
        (err) => { }
      );

      await this.storage.get('isLoggedIn').then(async (isLoggedIn) => {
        console.log('Hi IsLoggedIn', isLoggedIn);
        if (isLoggedIn == true) {
          interval(600000).subscribe(x => this.initAndSyncReceive());
          console.log('Hi 60000');
          this.router.navigate(['menu'], {
            replaceUrl: true,
          });
        } else {
          this.router.navigate(['login'], {
            replaceUrl: true,
          });
        }
      });
      await this.storage.get('isLogOut').then((isLogOut) => {
        this.storage.get('appPin').then((appPin) => {
          // if (isLogOut == false && appPin && this.router.url != '/') {
          //   if (this.router.url == '/all-pt-schemes') {
          //     this.selectedIndex = 0;

          //     this.router.navigate(['/all-pt-schemes'], {
          //       replaceUrl: true,
          //     });
          //   } else if (this.router.url == '/individual-report') {
          //     this.selectedIndex = 1;

          //     this.router.navigate(['/individual-report'], {
          //       replaceUrl: true,
          //     });
          //   } else if (this.router.url == '/summary-report') {
          //     this.selectedIndex = 2;

          //     this.router.navigate(['/summary-report'], {
          //       replaceUrl: true,
          //     });
          //   } else if (this.router.url == '/change-password') {
          //     this.selectedIndex = 3;

          //     this.router.navigate(['/change-password'], {
          //       replaceUrl: true,
          //     });
          //   } else if (this.router.url == '/profile') {
          //     this.selectedIndex = 4;

          //     this.router.navigate(['/profile'], {
          //       replaceUrl: true,
          //     });
          //   } else if (this.router.url == '/login') {
          //     this.selectedIndex = 0;
          //     this.router.navigateByUrl('/app-password');
          //   } else {
          //     this.router.navigateByUrl(this.router.url);
          //   }
          // } else if (isLogOut == false && appPin && this.router.url == '/') {

          //   this.selectedIndex = 0;
          //   this.router.navigateByUrl('/enter-app-password');
          // } else if (isLogOut && !appPin) {
          //   this.selectedIndex = 0;
          //   this.router.navigateByUrl('/login');
          // } else {
          //   this.selectedIndex = 0;
          //   this.router.navigateByUrl('/login');
          // }
          if (isLogOut == false && appPin) {
            this.selectedIndex = 0;
            this.router.navigate(['//enter-app-password'], {
              replaceUrl: true,
            });
          } else if (isLogOut == false && !appPin) {
            this.selectedIndex = 0;
            this.router.navigate(['/app-password'], {
              replaceUrl: true,
            });
          } else if (isLogOut == true) {
            this.selectedIndex = 0;
            this.router.navigate(['/login'], {
              replaceUrl: true,
            });
          }
        });
      });
      this.events.subscribe('userName', (userJSON: any) => {
        this.userName = userJSON.userName;
        this.userRole = userJSON.userRole;
      });

      // start....need to comment this code while taking build since app version works in mobile.To check in browser we hardcoded...
      // if (!this.appVersionNumber) {
      //   this.appVersionNumber = '0.4.5';
      //   await this.storage.set('appVersionNumber', this.appVersionNumber);
      // }
      // end

      this.network.onDisconnect().subscribe(() => {
        this.events.publish('network:offline');
      });

      this.network.onConnect().subscribe(() => {
        this.events.publish('network:online');
      });


      this.platform.backButton.subscribeWithPriority(0, () => {
        const routerSplitURL = this.router.url.split(';');

        if (
          this.router.url === '/login' ||
          this.router.url === '/covid19-view-southsudan' ||
          this.router.url === '/enter-test-result' ||
          this.router.url === '/view-test-result' ||
          this.router.url === '/menu' ||
          this.router.url === '/profile'
        ) {
          this.alertService.confirmAlert(
            'VLSM',
            'Are you sure want to exit the app?',
            'appExitAlert'
          );
        } else if (
          this.router.url === '/covid19-add-southsudan' ||
          routerSplitURL[1] == 'data_mode=edit'
        ) {
          this.alertService.confirmAlert(
            'VLSM',
            'Are you sure you want to go back? Because the data you have entered will be lost',
            'addEditForm'
          );
        } else if (this.routerOutlet && this.routerOutlet.canGoBack()) {
          this.routerOutlet.pop();
        } else {
        }
      });

      this.events.subscribe('isBackForm', (result: any) => {
        if (result == true) {
          this.routerOutlet.pop();
        }
        if (this.router.url === '/covid19-add-southsudan') {
          this.router.navigate(['/covid19-view-southsudan']);
        }
      });
    });
  }
  async createUser() {
    const id = nanoid();
    this.CrudService.deviceID = id;
    console.log('nanoid device id', this.CrudService.deviceID);
  }
  consotest() {
    const currentDate = new Date();
    console.log('ten mins', currentDate);
  }

  initAndSyncReceive() {
    this.storage.get('isLoggedIn').then(async (isLoggedIn) => {
      if (isLoggedIn == true) {
        console.log('this is logged in function',isLoggedIn);
        await this.SyncReq.syncReceiveTestRequest('auto');
      }
    });
  }

  toggleMenu(value) {
   
    console.log(value,'value');
    if (value == 'sync') {
      this.SyncReq.syncReceiveTestRequest('menu');
      this.menu.toggle();
    }
    else if (value == 'syncall') {
      this.SyncReq.syncReceiveTestRequest('syncall');
      this.menu.toggle();
    } else {
      this.menu.toggle();
    }
  }

  


  logout() {
    this.presentAlertMultipleButtons(
      'Logout',
      '',
      'Are you sure you want to logout?',
      'Cancel',
      ' Yes (requires internet to login again)',
      'No, just exit app',
      'logoutAlert'
    );
    // this.alertService.alertWithCustomButtons('Logout', 'Cancel', ' Yes (requires internet to login again)', 'Are you sure you want to logout?', 'logoutAlert');
    // 'No, just lock app',
    
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
          cssClass: 'secondary',
          handler: () => {
            if (alertName == 'isChangedTestTypeResultPanel') {
              // this.eventCtrl.publish('isAcceptedTestResultData:false');
            }
            if (alertName == 'syncAlert') {
              this.router.navigate(['/enter-app-password'], {
                replaceUrl: true,
              });
              this.storage.set('isLogOut', false);
              this.storage.set('isLoggedIn', true);
              this.storage.remove('privileges');
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
              // navigator.app.exitApp();
            }
            if (alertName == 'formExitAlert') {
              this.router.navigate(['/menu'], {
                replaceUrl: true,
              });
            }
            if (alertName == 'invalidPIN') {
              this.storage.set('isLogOut', true);
              this.storage.set('isLoggedIn', false);
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
            if (alertName == 'syncAlert') {
              await this.SyncReq.syncReceiveTestRequest('menu');
              await this.router.navigate(['/login'], { replaceUrl: true });
              await this.storage.set('isLogOut', true);
              await this.storage.set('isLoggedIn', false);
              await this.storage.remove('privileges');
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
          handler: () => { },
        },
        {
          text: secondButtonText,
          cssClass: 'secondary',
          handler: async () => {
            if (alertName == 'logoutAlert') {
              await this.SyncReq.ionViewWillEnter('menu');
              if (
                this.SyncReq.UnSyncedOriginalEidArray.length ||
                this.SyncReq.UnSyncedOriginalKeyArray.length ||
                this.SyncReq.UnSyncedOriginalVlArray.length
              ) {
                this.presentAlertConfirm(
                  'Alert',
                  '',
                  'you have unsynced records,Sync them before logout?',
                  'Logout',
                  'Sync Records',
                  'syncAlert'
                );
              } else {
                this.router.navigate(['/login'], { replaceUrl: true });
                this.storage.set('isLogOut', true);
                this.storage.set('isLoggedIn', false);
                this.storage.remove('privileges');

                  this.selectedIndex = 0;
                this.storage.set('isLoggedIn', false);
                this.storage.set('isLogout', true);

              // Removing items
              const itemsToRemove = ['appPages', 'appPin', 'privileges', 'loginDetails'];
              this.commonservice.removeItems(itemsToRemove);
              }

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
              this.storage.set('isLoggedIn', true);
              // this.eventCtrl.publish('setLoggedOutFCM:true');
            }
          },
        },
      ],
    });

    await alert.present();
  }
  toggleLevel1(idx: string) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
    console.log("Toggled Level 1. showLevel1:", this.showLevel1);
  }
  
  isLevel1Shown(idx: string) {
    return this.showLevel1 === idx;
  }
  
  toggleLevel2(idx: string) {
    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = idx;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
    console.log("Toggled Level 2. showLevel1:", this.showLevel1, "showLevel2:", this.showLevel2);
  }
  
  isLevel2Shown(idx: string) {
    return this.showLevel2 === idx;
  }
  
  toggleLevel3(idx: string, item) {
    if (this.isLevel3Shown(idx)) {
      this.showLevel3 = null;
    } else {
      this.showLevel2 = idx;
      this.showLevel3 = idx;
    }
    console.log("Toggled Level 3. showLevel2:", this.showLevel2, "showLevel3:", this.showLevel3);
    if (item) {
      this.menu.toggle();
      this.router.navigate([item.url], {
        replaceUrl: true,
      });
      console.log("Navigated to:", item.url);
    }
  }
  
  isLevel3Shown(idx: string) {
    return this.showLevel3 === idx;
  }
  
}
