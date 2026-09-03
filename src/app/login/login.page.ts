import { PrivilegeService } from './../service/privilage/privilege.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  CrudOperationsService,
  ToastService,
  LoaderService,
  Events,
  themeService,
  AlertService,
  SyncTestRequestsService,
} from '../../app/service/providers';
// import urlExist from "url-exist"
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { CommonService } from '../service/common/common.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { trimmedCharsValidator } from '../../validators/validators';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import _ from 'lodash';
import { DbService } from '../services/db.service';
import { InitDataService } from '../service/init-data/init-data.service';
import { BootstrapService } from '../service/bootstrap/bootstrap.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { MenuController } from '@ionic/angular';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
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
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class LoginPage implements OnInit {
  appVersionNumber: any;
  deviceOSVersion: any;
  uuid: any;
  deviceInfoObj = {};
  userNameFormControl = new FormControl('', [
    Validators.required,
    trimmedCharsValidator.checkTrimmedThreeChars,
  ]);
  pswdFormControl = new FormControl('', [
    Validators.required,
    trimmedCharsValidator.checkTrimmedThreeChars,
  ]);
  serverHostFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  pswdhide = true;
  loginDetailsArray: any = [];
  submitted = false;
  initArray: any = [];
  userName: any;
  selectedTheme: String;
  UnLoggedUserArray: any = [];
  loggedUserArray: any = [];
  userTestRequestArray: any = [];
  webSamplesArray: any = [];
  vlSamplesArray: any = [];
  userID: any;
  localTestRequestFormArray: any = [];
  authToken: any;
  userRole: any;
  networkType: any;
  private dbStorage: SQLiteObject;
  results: any = [];
  testresults: any = [];
  formID: any;
  covid19WebArray: any = [];
  count: number;
  offTestReqID: any;
  lcltstrqidloop: any;
  lcltstrqid: any;

  constructor(
    public menu: MenuController,
    public commonservice: CommonService,
    private storage: Storage,
    private router: Router, public http: HttpClient,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    public CrudService: CrudOperationsService,
    public events: Events,
    public themeService: themeService,
    public alertService: AlertService,
    public network: Network,
    public SyncReq: SyncTestRequestsService,
    private db: DbService,
    private initData: InitDataService,
    private bootstrap: BootstrapService,
    private sqlite: SQLite,
    public privilege: PrivilegeService
  ) {
    this.themeService
      .getActiveTheme()
      .subscribe((val) => (this.selectedTheme = val));
  }

  ngOnInit() { }

  async ionViewDidEnter() {
    // the root left menu should be disabled on this page
    this.menu.enable(false);
  }

  async ionViewWillEnter() {
    // Logout must leave no data on the device: rebuild the database now, so the
    // next login does not have to.
    if (await this.storage.get('isLogOut')) {
      await this.LoaderService.show('Clearing local data...');
      try {
        await this.db.wipeDatabase();
        await this.initData.clearSyncMarker();
      } finally {
        await this.LoaderService.hide();
      }
    }
    await this.storage.create();
    await this.storage.get('localTestRequestForm').then(async (result) => {
      if (result == null) {
        await this.storage.set('localTestRequestForm', []);
      }
    });
    // this.serverHostFormControl.setValue('https://vlsm.deforay.dev');
    // this.userNameFormControl.setValue("admin");
    // this.pswdFormControl.setValue('123');
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
  }
  async getData(URL) {
    return new Promise(async (resolve, reject) => {
      // let apiURL = await this.storage.get("apiUrl");
      // if (apiURL) {
      // this.http.get(URL + '/api/v1.1/xyz.php')

      const checkLegacyVersionEndpoint = () => this.http.get(URL + '/api/v1.1/version.php').subscribe(async (resp: any) => {
        console.log(resp);
        if (resp) {
          const res: any = resp;
          if (res.version != undefined && res.version != null && res.version != '') {
            resolve(true);
          } else {
            this.CrudService.alertWithSingleButton('Alert', 'OK', 'Please enter a valid cloud VLSM URL. Contact your VLSM system administrator for help or guidance', '');
          }
        }
      }, async (err) => {
        console.log(err.status);

        // if (err.status == 401) {
        this.CrudService.alertWithSingleButton('Alert', 'OK', 'Please enter a valid cloud VLSM URL. Contact your VLSM system administrator for help or guidance', '');
        // await this.storage.set("isLoggedIn", false);
        // this.router.navigate(['/login']);
        // }
        reject(err);
      });

      // Prefer the health endpoint. Older InteLIS servers only have version.php, so fall back to it.
      // Health answers 200 {status:"ok"} normally and 503 {status:"unavailable"} when the
      // server's database is down; it may also carry the minimum app version the server accepts.
      this.http.get(URL + '/api/v1.1/health').subscribe((health: any) => {
        if (!health || health.status !== 'ok') {
          checkLegacyVersionEndpoint();
          return;
        }
        if (health.minAppVersion && this.isVersionBelow(this.appVersionNumber, health.minAppVersion)) {
          this.CrudService.alertWithSingleButton('Update required', 'OK',
            'This version of the app (' + this.appVersionNumber + ') is no longer supported by your server. Please update the app from Google Play.', '');
          reject('app-version-unsupported');
          return;
        }
        resolve(true);
      }, (err) => {
        if (err && err.status === 503 && err.error && err.error.status === 'unavailable') {
          this.CrudService.alertWithSingleButton('Alert', 'OK', 'The InteLIS server is reachable but its database is unavailable. Please try again later.', '');
          reject(err);
          return;
        }
        checkLegacyVersionEndpoint();
      });

      // }
    });
  }
  /** True when `current` is an older dotted version than `minimum` (e.g. "1.4.2" < "1.5.0"). */
  private isVersionBelow(current: string, minimum: string): boolean {
    const parse = (v: string) => String(v || '').replace(/^v/i, '').split('.').map(p => parseInt(p, 10) || 0);
    const a = parse(current), b = parse(minimum);
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const x = a[i] || 0, y = b[i] || 0;
      if (x !== y) { return x < y; }
    }
    return false;
  }

  async login() {
    this.LoaderService.show('Signing in...');
    await this.db.loadSQLFile('login');
    this.networkType = this.network.type;

    // if (this.network.type == 'none' || this.network.type == 'unknown') {

    //   this.alertService.alertWithSingleButton('Alert', 'OK', "You need internet connection to login to the VLSM app for the first time. Please connect to the internet to proceed with one time setup process.");

    // } else {

    this.userNameFormControl.setValue(this.userNameFormControl.value.trim());
    this.pswdFormControl.setValue(this.pswdFormControl.value.trim());
    this.submitted = true;
    // this.LoaderService.hide();
    if (this.userNameFormControl.invalid || this.pswdFormControl.invalid || this.serverHostFormControl.invalid) {
      // this.LoaderService.show();
      this.alertService.alertWithSingleButton('Alert', 'OK', "Invalid Credentials", '');
      this.LoaderService.hide();
    } else {
      let apiUrl = '';
      if (this.serverHostFormControl.value.indexOf('http://') == 0 || this.serverHostFormControl.value.indexOf('https://') == 0) {
        apiUrl = this.serverHostFormControl.value;
      } else {
        apiUrl = 'https://' + this.serverHostFormControl.value;
      }
      await this.storage.set('apiUrl', apiUrl.trim());
      // await this.getData(apiUrl);

      // let access = await urlExist(apiUrl);
      const access = await this.getData(apiUrl);
      if (access) {
        this.appVersionNumber = await this.storage.get('appVersionNumber');

        const loginJSON = {
          userName: this.userNameFormControl.value,
          password: this.pswdFormControl.value,
          appVersion: this.appVersionNumber,
        };
      
        this.CrudService.postDataWithoutAuthToken('/api/v1.1/user/login.php', loginJSON).then(
          async (result) => {
            console.log(result['status'],'resultStatus');
            if (result['status'] == '1') {
              await this.storage.set('isLoggedIn', true);
              await this.storage.set('isLogOut', false);
              await this.storage.set('loginDetails', result['data']);

              this.loginDetailsArray = [];
              this.loginDetailsArray = result['data'];
              await this.storage.set('privileges', this.loginDetailsArray.access.privileges);
              await this.storage.set('isLoggedIn', true);
              await this.storage.get('loginDetails').then(async (loginDetails) => {
                if (loginDetails) {
                  this.authToken = loginDetails['api_token'];
                  this.userName = loginDetails['user'].user_name;
                  this.userID = loginDetails['user'].user_id;
                  this.userRole = loginDetails['user'].role_name;
                  this.formID = loginDetails['form'];
                  let userJSON = { userName: this.userName, userRole: this.userRole, };
                  this.events.publish('userName', userJSON);
                  this.db.insertUserDetails(this.loginDetailsArray);
                }
              });
              this.events.publish(
                'setTheme',
                this.loginDetailsArray.user.testing_user
              );
              if (this.loginDetailsArray.user.testing_user == 'yes') {
                this.selectedTheme = 'blue-theme';
                this.themeService.setActiveTheme('blue-theme');
              } else {
                this.selectedTheme = 'red-theme';
                this.themeService.setActiveTheme('red-theme');
              }

              // Everything after the credential check runs inside the app on the setup
              // screen, so the user sees progress instead of a spinner on the login form.
              this.bootstrap.start(this.loginDetailsArray);
              await this.LoaderService.hide();
              this.router.navigate(['/setup'], { replaceUrl: true });
            }
            else if (result['status'] == '2') {
              this.LoaderService.hide();
              this.alertService.presentAlert('Alert', result["message"], '');
            }

          },
          (err) => {
            this.LoaderService.hide();
            // A real HTTP error from login: show what the server said, or a generic message.
            this.alertService.presentAlert('Alert', (err && err.serverMessage) || 'Could not sign in. Please check your connection and try again.', '');
            // if (this.serverHostFormControl.value.indexOf('https://') != 0) {
            //   this.alertService.alertWithSingleButton(
            //     'Alert',
            //     'OK',
            //     'Invalid Server Url',
            //     ''
            //   );
            // } else if (
            //   this.serverHostFormControl.value.indexOf('https://') == 0 ||
            //   this.serverHostFormControl.value.indexOf('http://') == 0
            // ) {
            //   if (
            //     this.serverHostFormControl.value ==
            //       'https://vlsm.labsinformatics.com' ||
            //     this.serverHostFormControl.value == 'https://vlsm-test.mohdrc.com'
            //   ) {
            //     this.alertService.alertWithSingleButton(
            //       'Alert',
            //       'OK',
            //       'Invalid Credentials',
            //       ''
            //     );
            //   } else {
            //     this.alertService.alertWithSingleButton(
            //       'Alert',
            //       'OK',
            //       'Invalid Server Url',
            //       ''
            //     );
            //   }
            // }
          }
        );
      } else {
        this.CrudService.alertWithSingleButton('Alert', 'OK', 'Please enter a valid cloud VLSM URL. Contact your VLSM system administrator for help or guidance', '');
      }
    }
    // }
  }

  


}
