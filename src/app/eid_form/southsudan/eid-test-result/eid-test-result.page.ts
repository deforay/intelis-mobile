import { Component, OnInit } from '@angular/core';
import {
  Storage
} from '@ionic/storage-angular';
import {
  SQLite,
  SQLiteObject
} from '@awesome-cordova-plugins/sqlite/ngx';
import {
  Events
} from '../../../../app/service/providers';
@Component({
  selector: 'app-eid-test-result',
  templateUrl: './eid-test-result.page.html',
  styleUrls: ['./eid-test-result.page.scss'],
})
export class EidTestResultPage implements OnInit {
  isNoRecord: boolean = false;
  userTestRequestOrgArray: any = [];
  loggedUserArray: any = [];
  userEidPendingResultArray: any = [];
  userTestPendingResultArray:any=[];
  userID: any;
  skeltonArray: any = [];
  searchTerm: string;
  isNoRecordText: string;
  filteredUserTestPendingResultArray: any[] = [];

  constructor(private storage: Storage, public events: Events,
    public sql: SQLite) {

  }

  ngOnInit() {
  }

  async ionViewWillEnter() {

    await this.storage.create();

    await this.storage.remove('selectedEidTestReq');

    await this.storage.get('loginDetails').then(async (loginDetails) => {
      if (loginDetails) {
        this.userID = loginDetails['user'].user_id;
      }
    })
    await this.getSQLLiteEidData();
  }



  public getSQLLiteEidData() {
    this.skeltonArray = [{}, {}, {}, {}, {}, {}, {}, {}];
    this.sql.create({
      name: 'vlsm_mobile.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return new Promise((resolve, reject) => {
        db.executeSql('SELECT * FROM eid_form INNER JOIN user_details ON eid_form.user_id=user_details.user_id', []).then(async data => {
          this.userTestRequestOrgArray = [];
          for (let i = 0; i < data.rows.length; i++) {
            let item = data.rows.item(i);
            this.userTestRequestOrgArray.push(item);
          }
         
          this.userTestRequestOrgArray = this.userTestRequestOrgArray.sort(function (a, b) {
            return new Date(b.last_modified_datetime ? b.last_modified_datetime : b.request_created_datetime).getTime() - new Date(a.last_modified_datetime ? a.last_modified_datetime : a.request_created_datetime).getTime()
          });

          this.skeltonArray = [];

          this.userTestPendingResultArray = await this.userTestRequestOrgArray.filter(item => (item.result == null || item.result == '') && (item.is_sample_rejected != 'yes'));
          
  
          this.filteredUserTestPendingResultArray = this.userTestPendingResultArray;

          resolve(this.userTestPendingResultArray);
          console.log(this.userTestPendingResultArray, 'Eid new');

          this.events.publish('userTestPendingResultArray', 'loadedTrue');

          if (this.userTestRequestOrgArray.length == 0 || data.rows.length == 0 || this.userTestPendingResultArray.length == 0) {
            this.skeltonArray = [];
            this.isNoRecord = true;
          }
        }, (error) => {
          reject(error);
          console.log(error);
        });
      });
    }).catch(e => {
      console.log(e);
    });
  }

 

  public async filterItems() {
    let filteredArray = [...this.userTestPendingResultArray];
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const searchTermLower = this.searchTerm.toLowerCase();
      filteredArray = filteredArray.filter(item => 
        (item.child_id && item.child_id.toString().toLowerCase().includes(searchTermLower)) ||
        (item.child_name && item.child_name.toString().toLowerCase().includes(searchTermLower)) ||
        (item.sample_code && item.sample_code.toString().toLowerCase().includes(searchTermLower))
      );
    }
    filteredArray = filteredArray.sort((a, b) => {
      const dateA = new Date(a.last_modified_datetime || a.request_created_datetime).getTime();
      const dateB = new Date(b.last_modified_datetime || b.request_created_datetime).getTime();
      return dateB - dateA; 
    });
    this.filteredUserTestPendingResultArray = filteredArray;
    if (this.filteredUserTestPendingResultArray.length === 0) {
      this.isNoRecord = true;
      this.isNoRecordText = "No pending test results found";
    } else {
      this.isNoRecord = false;
    }
    this.events.publish('userTestPendingResultArray', 'loadedTrue');
    console.log('Filtered Pending Results:', this.filteredUserTestPendingResultArray);
  }

  getSkeltonColor() {
    // var colors = ['#50C878', '#f6cd61', '#ff726f'];
    // return colors[Math.floor(Math.random() * colors.length)];

    return ['#50C878', '#f6cd61', '#ff726f'];
  }

}
