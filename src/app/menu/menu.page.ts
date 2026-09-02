import { SynctimelinePage } from './../syncTimeline/synctimeline.page';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  Events,
  AlertService,
  MultilevelService
} from '../../app/service/providers';
import {
  Router
} from '@angular/router';
import {
  Storage
} from '@ionic/storage-angular';
import {
  Network
} from '@ionic-native/network/ngx';
// import {
//   DbService
// } from '../services/db.service';
// import {
//   SQLite,
//   SQLiteObject
// } from '@ionic-native/sqlite/ngx';
import {
  CrudOperationsService,
} from '../../app/service/providers';
import { ModalController } from '@ionic/angular';
import { DbMigrationService } from '../services/db-migration.service';
// ../app/services/db-migration.service
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  showLevel1 = null;
  showLevel2 = null;
  showLevel3 = null;
  public appPages: any = [];
  isTestingUser: any;
  appMenuName: any;
  networkType: any;
  userID: any;
  lastSyncDateTime: any;
  appVersionNumber: any;
  authToken: any;
  formId: any;
  initArray: any;
  tmpPg: any = [];

  constructor(private multilevelService: MultilevelService,
    private router: Router,
    public alertService: AlertService,
    private storage: Storage,
    public network: Network,
    public events: Events,
    // private db: DbService,
    // private sqlite: SQLite,
    public modalController: ModalController,
    public CrudService: CrudOperationsService,
    private dbMigrationService: DbMigrationService
  ) {

  }

  async ionViewWillEnter() {

    console.log("Menu hit");
    await this.dbMigrationService.startMigration('menu');
    this.tmpPg = [];
    this.appPages = [];
    await this.multilevelService.fetchMenuItems().then((data: any )=>{
      this.storage.get('initArray').then(async (initArray) => {
      console.log("Menu hit",data,initArray.activeModule);

        if (initArray) {
          initArray.activeModule = initArray.activeModule.replace(/['"]+/g, '');
          for(var i = 0; i < data.length ; i++){
            var result = data.filter(obj => {
              if(initArray.activeModule.indexOf(data[i].activeModule) != -1){
                return data[i].activeModule;
              }
            })
            if(initArray.activeModule.indexOf(data[i].activeModule) != -1){
              if(result[i].formID == initArray.formId){
                this.tmpPg.push(result[i]);
                this.appPages = this.tmpPg;
              }
            }
          }
        }
        
      }) 
    })

    await this.storage.create();
    await this.storage.get('loginDetails').then(async (loginDetails) => {
      if (loginDetails) {
        this.isTestingUser = loginDetails['user'].testing_user;
        this.userID = loginDetails['user'].user_id;
        this.appMenuName = loginDetails.appMenuName;
        this.authToken = loginDetails['api_token'];
        this.formId = loginDetails['form'];
      }
    })
    await this.storage.get('syncDateTimeChanged').then(async(time)=>{

      if(time){

        this.lastSyncDateTime = this.dateTimeFormat(time);
      }
    })

    this.networkType = this.network.type;

    this.events.subscribe('network:offline', (data) => {
      this.networkType = this.network.type;
    })

    this.events.subscribe('network:online', () => {
      this.networkType = this.network.type;
    })

    this.events.subscribe('syncDateTimeChanged', (result: any) => {
      if (result) {
        this.lastSyncDateTime = result;
      }
    })

  }

  ngOnInit() {

  }
  logout() {
    debugger;
    this.showLevel1 = null;
    this.showLevel2 = null;
    this.showLevel3 = null;

    this.alertService.alertWithCustomButtons('Logout', 'Cancel', ' Yes (requires internet to login again)', 'Are you sure you want to logout?', 'logoutAlert');

    
}


  toggleLevel1(idx: string) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
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
    if (item) {
      this.router.navigate([item.url], {
        replaceUrl: true
      });
    }
  }

  isLevel3Shown(idx: string) {
    return this.showLevel3 === idx;
  }
  dateTimeFormat(dateObj) {

    var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var mydate = (new Date(dateObj));

    return  ('0' + (mydate.getDate())).slice(-2) + '-' + (month[mydate.getMonth()]) + '-' + (mydate.getFullYear()) + ' ' + ('0' + mydate.getHours()).slice(-2) + ':' + ('0' + mydate.getMinutes()).slice(-2) + ':00';

  }
  async showSyncTimeline(){
  const modal = await this.modalController.create({
      component: SynctimelinePage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
