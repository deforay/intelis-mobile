import { AppUpdateService, PLAY_STORE_URL, playUpdates } from '../service/app-update/app-update.service';
import { SyncTestRequestsService } from '../service/syncTestRequests/sync-test-requests.service';
import { SynctimelinePage } from './../syncTimeline/synctimeline.page';
import {
  Component,
  OnInit,
  NgZone,
  ChangeDetectionStrategy
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
} from '@awesome-cordova-plugins/network/ngx';
// import {
//   DbService
// } from '../services/db.service';
// import {
//   SQLite,
//   SQLiteObject
// } from '@awesome-cordova-plugins/sqlite/ngx';
import {
  CrudOperationsService,
} from '../../app/service/providers';
import { DbMigrationService } from '../services/db-migration.service';
import { ModalController } from '@ionic/angular';
// ../app/services/db-migration.service
@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
  userName = '';
  // The country forms this app has: South Sudan only for now.
  readonly supportedFormIds = [1];

  get isFormUnsupported(): boolean {
    return this.formId != null && this.formId !== '' && !this.supportedFormIds.includes(Number(this.formId));
  }
  initArray: any;
  tmpPg: any = [];

  // The newer version published on Google Play, when there is one.
  newerVersion: string | null = null;
  // Play's own in-app update: 'available' to download in the background, 'downloading',
  // then 'ready' to restart into. Null when Play does not answer, as for a non-Play install;
  // the notice then links to the Play listing instead.
  playUpdate: 'available' | 'downloading' | 'ready' | null = null;
  playProgress = 0;
  readonly playStoreUrl = PLAY_STORE_URL;

  constructor(private multilevelService: MultilevelService,
    private appUpdate: AppUpdateService,
    private syncRequests: SyncTestRequestsService,
    private zone: NgZone,
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
    this.checkForNewerVersion();
    this.loadCounts();

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
        this.userName = loginDetails['user'].user_name;
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
      // The sync marks samples sent in handlers it does not wait for, so count again once they
      // have usually finished. A slower one shows on the next visit to this screen, which
      // counts again; awaiting those handlers is a separate change to the sync.
      this.loadCounts();
      setTimeout(() => this.loadCounts(), 4000);
      if (result) {
        this.lastSyncDateTime = result;
      }
    })

  }

  // Local request counts per test, for the home screen.
  counts: { [module: string]: { total: number; awaiting: number; unsynced: number } } = {};
  private static readonly TABLES = { 'VL': 'vl_request_form', 'EID': 'eid_form', 'COVID-19': 'form_covid19' };

  async loadCounts() {
    const sqlite = (window as any).sqlitePlugin;
    if (!sqlite) {
      return;
    }
    const loginDetails = await this.storage.get('loginDetails');
    const userId = loginDetails && loginDetails.user ? loginDetails.user.user_id : null;
    const db = sqlite.openDatabase({ name: 'vlsm_mobile.db', location: 'default' });
    const counts = {};
    for (const [module, table] of Object.entries(MenuPage.TABLES)) {
      counts[module] = await new Promise(resolve => db.executeSql(
        `SELECT COUNT(*) AS total,
                SUM(CASE WHEN IFNULL(is_sample_rejected, '') != 'yes' AND IFNULL(TRIM(result), '') = '' THEN 1 ELSE 0 END) AS awaiting,
                SUM(CASE WHEN is_synced = 'false' THEN 1 ELSE 0 END) AS unsynced
           FROM ${table} WHERE user_id = ?`, [userId],
        rs => { const r = rs.rows.item(0); resolve({ total: r.total || 0, awaiting: r.awaiting || 0, unsynced: r.unsynced || 0 }); },
        () => resolve({ total: 0, awaiting: 0, unsynced: 0 })));
    }
    this.counts = counts;
  }

  get unsyncedTotal(): number {
    return Object.values(this.counts).reduce((sum, c) => sum + (c.unsynced || 0), 0);
  }

  // With more than two tests each shows as one row, opened one at a time, so the home screen
  // stays short however many tests a server turns on.
  openModule: string | null = null;

  get visibleModules() {
    return (this.appPages || []).filter(p => p.access);
  }

  get compactModules(): boolean {
    return this.visibleModules.length > 2;
  }

  isModuleOpen(module): boolean {
    return !this.compactModules || this.openModule === module.name;
  }

  toggleModule(module) {
    if (this.compactModules) {
      this.openModule = this.openModule === module.name ? null : module.name;
    }
  }

  newRequestAction(module) {
    return this.actionsOf(module).find(a => a.name == 'Add New Request');
  }

  // The module's actions the user may take, flattened from the menu tree.
  actionsOf(module) {
    return (module.item || []).filter(group => group.access)
      .flatMap(group => (group.item || []).filter(action => action.access && (action.id != 1 || this.isTestingUser == 'yes')));
  }

  actionIcon(action): string {
    return { 'Add New Request': 'note_add', 'View Test Request': 'list_alt', 'Enter Test Result': 'edit_note', 'View Test Result': 'fact_check' }[action.name] || 'arrow_forward';
  }

  actionLabel(action): string {
    return { 'Add New Request': 'New request', 'View Test Request': 'Requests', 'Enter Test Result': 'Enter results', 'View Test Result': 'Results' }[action.name] || action.name;
  }

  openAction(action) {
    this.router.navigate([action.url], { replaceUrl: true });
  }

  syncNow() {
    this.syncRequests.syncReceiveTestRequest('menu');
  }

  async checkForNewerVersion() {
    if (this.appUpdate.dismissed) {
      return;
    }
    const [play, newer] = await Promise.all([
      this.playUpdate === 'downloading' ? Promise.resolve(null) : playUpdates.state(),
      this.appUpdate.newerPublishedVersion(await this.appUpdate.installedVersion()),
    ]);
    if (this.playUpdate !== 'downloading') {
      this.playUpdate = play;
    }
    // Later may have been tapped while the lookup ran.
    this.newerVersion = this.appUpdate.dismissed ? null : newer;
  }

  get showUpdateNotice(): boolean {
    return !this.appUpdate.dismissed && (!!this.playUpdate || !!this.newerVersion);
  }

  startPlayUpdate() {
    this.playUpdate = 'downloading';
    this.playProgress = 0;
    playUpdates.start((e) => this.zone.run(() => {
      if (e.status === 'downloading' && e.total > 0) {
        this.playProgress = Math.round((e.bytes / e.total) * 100);
      } else if (e.status === 'downloaded') {
        this.playUpdate = 'ready';
      } else if (e.status === 'canceled' || e.status === 'failed') {
        this.playUpdate = 'available';
      }
    }), () => this.zone.run(() => { this.playUpdate = 'available'; }));
  }

  restartIntoUpdate() {
    playUpdates.complete().catch(() => this.zone.run(() => { this.playUpdate = 'available'; }));
  }

  dismissNewerVersion() {
    this.appUpdate.dismissed = true;
    this.newerVersion = null;
    if (this.playUpdate !== 'downloading' && this.playUpdate !== 'ready') {
      this.playUpdate = null;
    }
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
