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
  selector: 'app-enter-vl-result',
  templateUrl: './enter-vl-result.page.html',
  styleUrls: ['./enter-vl-result.page.scss'],
})
export class EnterVlResultPage implements OnInit {
  isNoRecord: boolean = false;
  userTestRequestOrgArray: any = [];
  loggedUserArray: any = [];
  userVlPendingResultArray: any = [];
  userID: any;
  skeltonArray: any = [];
  searchTerm: string;
  isNoRecordText: string;
  filtereduserVlPendingResultArray: any[] = [];

  constructor(private storage: Storage, public events: Events,
    public sql: SQLite) {

  }

  ngOnInit() {
  }

  async ionViewWillEnter() {

    await this.storage.create();

    await this.storage.remove('selectedVlTestReq');

    await this.storage.get('loginDetails').then(async (loginDetails) => {
      if (loginDetails) {
        this.userID = loginDetails['user'].user_id;
      }
    })
    await this.getSQLLiteVlData();
  }


  public getSQLLiteVlData() {
    this.skeltonArray = [{}, {}, {}, {}, {}, {}, {}, {}];
    this.sql.create({
      name: 'vlsm_mobile.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return new Promise((resolve, reject) => {
        db.executeSql('SELECT * FROM vl_request_form INNER JOIN user_details ON vl_request_form.user_id=user_details.user_id', []).then(async data => {
          this.userTestRequestOrgArray = [];
          for (let i = 0; i < data.rows.length; i++) {
            let item = data.rows.item(i);
            this.userTestRequestOrgArray.push(item);
          }
         
          this.userTestRequestOrgArray = this.userTestRequestOrgArray.sort(function (a, b) {
            return new Date(b.last_modified_datetime ? b.last_modified_datetime : b.request_created_datetime).getTime() - new Date(a.last_modified_datetime ? a.last_modified_datetime : a.request_created_datetime).getTime()
          });

          this.skeltonArray = [];

          this.userVlPendingResultArray = await this.userTestRequestOrgArray.filter(item => (item.result == null || item.result == '') && (item.is_sample_rejected != 'yes'));
          
  
          this.filtereduserVlPendingResultArray = this.userVlPendingResultArray;

          resolve(this.userVlPendingResultArray);
          console.log(this.userVlPendingResultArray, 'Vl new');

          this.events.publish('userVlPendingResultArray', 'loadedTrue');

          if (this.userTestRequestOrgArray.length == 0 || data.rows.length == 0 || this.userVlPendingResultArray.length == 0) {
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
    let filteredArray = [...this.userVlPendingResultArray];
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const searchTermLower = this.searchTerm.toLowerCase();
      filteredArray = filteredArray.filter(item => 
        (item.patient_art_no && item.patient_art_no.toString().toLowerCase().includes(searchTermLower)) ||
        (item.patient_first_name && item.patient_first_name.toString().toLowerCase().includes(searchTermLower)) ||
        (item.remote_sample_code && item.remote_sample_code.toString().toLowerCase().includes(searchTermLower))
      );
    }
    filteredArray = filteredArray.sort((a, b) => {
      const dateA = new Date(a.last_modified_datetime || a.request_created_datetime).getTime();
      const dateB = new Date(b.last_modified_datetime || b.request_created_datetime).getTime();
      return dateB - dateA; 
    });
    this.filtereduserVlPendingResultArray = filteredArray;
    if (this.filtereduserVlPendingResultArray.length === 0) {
      this.isNoRecord = true;
      this.isNoRecordText = "No pending test results found";
    } else {
      this.isNoRecord = false;
    }
    this.events.publish('userVlPendingResultArray', 'loadedTrue');
    console.log('Filtered Pending Results:', this.filtereduserVlPendingResultArray);
  }

  getSkeltonColor() {
    // var colors = ['#50C878', '#f6cd61', '#ff726f'];
    // return colors[Math.floor(Math.random() * colors.length)];

    return ['#50C878', '#f6cd61', '#ff726f'];
  }

}
