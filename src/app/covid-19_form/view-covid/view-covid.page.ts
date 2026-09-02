import { Component, OnInit,ChangeDetectorRef, NgZone } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { PopoverController } from '@ionic/angular';
import { SortingPopoverComponent } from 'src/app/component/sorting-popover/sorting-popover.component';
import { Events } from 'src/app/service/providers';
import { Storage } from '@ionic/storage-angular';
import _ from "lodash";

@Component({
  selector: 'app-view-covid',
  templateUrl: './view-covid.page.html',
  styleUrls: ['./view-covid.page.scss'],
})
export class ViewCovidPage implements OnInit {
  userID: any;
  loginDetails: any;
  authToken: any;
  userTestRequestArray: any = [];
  appVersionNumber: any;
  isNoRecord = false;
  loggedUserArray: any = [];
  isTestingUser: string;
  userName: any;
  selectedTheme: String;
  userTestResultArray: any = [];
  userTestPendingResultArray: any = [];
  userTestSampleRejectedArray: any = [];
  sortedData: any;
  skeltonArray: any = [];
  totalRequestsCount: number;
  isNoRecordText: string;
  isFiltered = true;
  totalToggle = true;
  totalStatus = 'Enable';
  withResultToggle = false;
  withResultStatus = 'Disable';
  withoutResultToggle = false;
  withoutResultStatus = 'Disable';
  rejectedToggle = false;
  rejectedStatus = 'Disable';
  searchTerm: string;
  userTestRequestOrgArray: any = [];
  innerItem: any = [];
  outerLength: number;
  covid19id: Promise<any>;
  localStorageUnSyncedArray: any;
  localStorageSyncedArray: any;
  userTestRequestArray1: any[];
  constructor(private ngZone: NgZone,private changeDetectorRef: ChangeDetectorRef,private storage: Storage, public popoverController: PopoverController, public sql: SQLite, public events: Events) { }

  async ionViewWillEnter() {

    this.userTestRequestArray = [];

    await this.storage.create();

    await this.storage.remove('selectedCovid19TestReq');

    await this.storage.get('loginDetails').then(async (loginDetails) => {
      if (loginDetails) {

        this.userID = loginDetails['user'].user_id;
        this.authToken = loginDetails['api_token'];
        this.isTestingUser = loginDetails['user'].testing_user;
        this.userName = loginDetails['user'].user_name;
        this.selectedTheme = '';
        if (this.isTestingUser == 'yes') {
          this.selectedTheme = 'secondary';
        } else {
          this.selectedTheme = 'primary';
        }
      }
    })
    await this.storage.set('previousPageUrl', '/view-covid');
    await this.getSQLLiteCovid19Data();

    this.events.subscribe('isSyncWithCovid', async (result: any) => {
      if (result == true) {
        await this.getSQLLiteCovid19Data();
      }
    });

  }


  async getSQLLiteCovid19Data() {
    this.skeltonArray = [{}, {}, {}, {}, {}, {}, {}, {}];
    await this.sql.create({
      name: 'vlsm_mobile.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return new Promise((resolve, reject) => {
        db.executeSql('SELECT * FROM form_covid19 where user_id=? ORDER BY last_modified_datetime DESC', [this.userID]).then(async data => {
          this.userTestRequestOrgArray = [];
          this.outerLength = data.rows.length;
          for (let i = 0; i < this.outerLength; i++) {
            let outerItem = data.rows.item(i);
            // console.log(outerItem)
            this.userTestRequestOrgArray.push(outerItem);
          }

          resolve(this.userTestRequestOrgArray);
        }).catch(e => {
          console.log(e);
        })
      })
    })
    await this.pushUserTestArray();
  }

  async pushUserTestArray() {
    this.userTestRequestArray = [];
    this.userTestRequestOrgArray = this.userTestRequestOrgArray.sort((a, b) => {
      return new Date(b.last_modified_datetime || b.request_created_datetime).getTime() - new Date(a.last_modified_datetime || a.request_created_datetime).getTime();
    });
    this.userTestRequestArray = [...this.userTestRequestOrgArray];
    await this.events.publish('userTestRequestArray', 'loadedTrue');
    this.skeltonArray = [];
  
    this.processTestRequests(this.userTestRequestOrgArray);
  
    if (this.userTestRequestOrgArray.length === 0 || this.outerLength === 0) {
      this.skeltonArray = [];
      this.isNoRecord = true;
      this.isNoRecordText = "No view test request found";
    }
  }
  


  async searchUserTestRequests() {
    let filteredArray = [...this.userTestRequestOrgArray];
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      const searchTermLower = this.searchTerm.toLowerCase();
      filteredArray = filteredArray.filter(item =>
        (item.patient_id && item.patient_id.toLowerCase().includes(searchTermLower)) ||
        (item.patient_name && item.patient_name.toLowerCase().includes(searchTermLower)) ||
        (item.sample_code && item.sample_code.toLowerCase().includes(searchTermLower))
      );
    }
    filteredArray = filteredArray.sort((a, b) => {
      return new Date(b.last_modified_datetime || b.request_created_datetime).getTime() - new Date(a.last_modified_datetime || a.request_created_datetime).getTime();
    });
    this.userTestRequestArray = filteredArray;
    if (this.userTestRequestArray.length === 0) {
      this.isNoRecord = true;
      this.isNoRecordText = "No view test request found";
    } else {
      this.isNoRecord = false;
    }
    await this.events.publish('userTestRequestArray', 'loadedTrue');
    console.log('Filtered Data:', this.userTestRequestArray);
    this.processTestRequests(this.userTestRequestArray);
  }
  
  
  
  async processTestRequests(testArray: any[]) {
    this.totalRequestsCount = await testArray.length;
    console.log(this.totalRequestsCount)
    this.userTestResultArray = await testArray.filter(item => item.result);
    console.log(this.userTestResultArray)
    this.userTestPendingResultArray = await testArray.filter(item => (item.result == null || item.result === '') && item.is_sample_rejected !== 'yes');
    console.log(this.userTestPendingResultArray);
    this.userTestSampleRejectedArray = await testArray.filter(item => item.is_sample_rejected === 'yes');
    console.log(this.userTestSampleRejectedArray);
  }

  
  


  

  ngOnInit() {

  }

  async presentSortingPopover(ev: any) {
    this.skeltonArray = [{}, {}, {}, {}];
  
    if (!this.sortedData) {
      this.sortedData = { order: 'des', value: '' }; // Default values
    }
  
    console.log('Before creating popover, sortedData:', this.sortedData);
  
    const popover = await this.popoverController.create({
      component: SortingPopoverComponent,
      componentProps: {
        sortedData: this.sortedData // Pass the whole sortedData object
      },
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
  
    console.log('Creating popover with:', this.sortedData);
  
    await popover.present();
  
    const { data } = await popover.onDidDismiss();
    console.log('Popover dismissed with data:', data);
  
    if (data) {
      this.sortedData = data;
  
      // Manually trigger change detection
      this.changeDetectorRef.detectChanges();
  
      this.userTestRequestArray = [];
  
      setTimeout(() => {
        if (this.sortedData) {
          if (this.sortedData.order === 'asc' && this.sortedData.value === 'lastModified') {
            this.userTestRequestArray = this.userTestRequestOrgArray.sort((a, b) =>
              new Date(a.last_modified_datetime || a.request_created_datetime).getTime() -
              new Date(b.last_modified_datetime || b.request_created_datetime).getTime()
            );
          } else if (this.sortedData.order === 'des' && this.sortedData.value === 'lastModified') {
            this.userTestRequestArray = this.userTestRequestOrgArray.sort((a, b) =>
              new Date(b.last_modified_datetime || b.request_created_datetime).getTime() -
              new Date(a.last_modified_datetime || a.request_created_datetime).getTime()
            );
          } else if (this.sortedData.order === 'asc' && this.sortedData.value === 'sampleCollectionDate') {
            this.userTestRequestArray = this.userTestRequestOrgArray.sort((a, b) =>
              new Date(a.sample_collection_date || a.sample_collection_date).getTime() -
              new Date(b.sample_collection_date || b.sample_collection_date).getTime()
            );
          } else if (this.sortedData.order === 'des' && this.sortedData.value === 'sampleCollectionDate') {
            this.userTestRequestArray = this.userTestRequestOrgArray.sort((a, b) =>
              new Date(b.sample_collection_date || b.sample_collection_date).getTime() -
              new Date(a.sample_collection_date || a.sample_collection_date).getTime()
            );
          } else if (this.sortedData.order === 'asc' && this.sortedData.value === 'sampleCode') {
            this.userTestRequestArray = this.userTestRequestOrgArray.sort((a, b) => {
              let aSampleCodeLength = a.sample_code.length;
              let bSampleCodeLength = b.sample_code.length;
              return (a.sample_code.substring(aSampleCodeLength - 3)) -
                (b.sample_code.substring(bSampleCodeLength - 3));
            });
          } else if (this.sortedData.order === 'des' && this.sortedData.value === 'sampleCode') {
            this.userTestRequestArray = this.userTestRequestOrgArray.sort((a, b) => {
              let aSampleCodeLength = a.sample_code.length;
              let bSampleCodeLength = b.sample_code.length;
              return (b.sample_code.substring(bSampleCodeLength - 3)) -
                (a.sample_code.substring(aSampleCodeLength - 3));
            });
          } else {
            this.userTestRequestArray = this.userTestRequestOrgArray.sort((a, b) =>
              new Date(b.last_modified_datetime || b.request_created_datetime).getTime() -
              new Date(a.last_modified_datetime || a.request_created_datetime).getTime()
            );
          }
        }
      }, 500);
  
      setTimeout(() => {
        this.skeltonArray = [];
      }, 1500);
    }
  }


  // async presentSortingPopover(ev: any) {

  //   this.skeltonArray = [{}, {}, {}, {}];

  //   const popover = await this.popoverController.create({
  //     component: SortingPopoverComponent,
  //     componentProps: {
  //       order: this.sortedData ? this.sortedData.order : '',
  //       value: this.sortedData ? this.sortedData.value : ''
  //     },
  //     cssClass: 'my-custom-class',
  //     event: ev,
  //     translucent: true
  //   });
  //   await popover.present();

  //   popover.onDidDismiss()
  //     .then((result) => {

  //       console.log(result['data'], this.userTestRequestArray, 'this.userTestRequestArray sort');
  //       if (result['data']) {
  //         this.sortedData = result['data'];
  //         this.userTestRequestArray = [];
  //       }

  //       setTimeout(() => {
  //         if (this.sortedData) {

  //           if (this.sortedData.order == 'asc' && this.sortedData.value == 'lastModified') {

  //             this.userTestRequestArray = this.userTestRequestOrgArray.sort(function (a, b) {
  //               return new Date(a.last_modified_datetime ? a.last_modified_datetime : a.request_created_datetime).getTime() - new Date(b.last_modified_datetime ? b.last_modified_datetime : b.request_created_datetime).getTime()
  //             });
  //           } else if (this.sortedData.order == 'des' && this.sortedData.value == 'lastModified') {
  //             this.userTestRequestArray = this.userTestRequestOrgArray.sort(function (a, b) {
  //               return new Date(b.last_modified_datetime ? b.last_modified_datetime : b.request_created_datetime).getTime() - new Date(a.last_modified_datetime ? a.last_modified_datetime : a.request_created_datetime).getTime()
  //             });
  //           } else if (this.sortedData.order == 'asc' && this.sortedData.value == 'sampleCollectionDate') {

  //             this.userTestRequestArray = this.userTestRequestOrgArray.sort(function (a, b) {
  //               return new Date(a.sample_collection_date ? a.sample_collection_date : a.sample_collection_date).getTime() - new Date(b.sample_collection_date ? b.sample_collection_date : b.sample_collection_date).getTime()
  //             });
  //           } else if (this.sortedData.order == 'des' && this.sortedData.value == 'sampleCollectionDate') {

  //             this.userTestRequestArray = this.userTestRequestOrgArray.sort(function (a, b) {
  //               return new Date(b.sample_collection_date ? b.sample_collection_date : b.sample_collection_date).getTime() - new Date(a.sample_collection_date ? a.sample_collection_date : a.sample_collection_date).getTime()
  //             });

  //           } else if (this.sortedData.order == 'asc' && this.sortedData.value == 'sampleCode') {

  //             this.userTestRequestArray = this.userTestRequestOrgArray.sort(function (a, b) {

  //               let aSampleCodeLength = a.sample_code.length;
  //               let bSampleCodeLength = b.sample_code.length;
  //               return (a.sample_code.substring(aSampleCodeLength - 3)) -
  //                 (b.sample_code.substring(bSampleCodeLength - 3))

  //             });
  //           } else if (this.sortedData.order == 'des' && this.sortedData.value == 'sampleCode') {

  //             this.userTestRequestArray = this.userTestRequestOrgArray.sort(function (a, b) {

  //               let aSampleCodeLength = a.sample_code.length;
  //               let bSampleCodeLength = b.sample_code.length;
  //               return (b.sample_code.substring(bSampleCodeLength - 3)) -
  //                 (a.sample_code.substring(aSampleCodeLength - 3))

  //             });
  //           } else {
  //             this.userTestRequestArray = this.userTestRequestOrgArray.sort(function (a, b) {
  //               return new Date(b.last_modified_datetime ? b.last_modified_datetime : b.request_created_datetime).getTime() - new Date(a.last_modified_datetime ? a.last_modified_datetime : a.request_created_datetime).getTime()
  //             });
  //           }

  //         }
  //       }, 500);

  //       setTimeout(() => {
  //         this.skeltonArray = [];
  //       }, 1500);
  //     });
  // }

  getSkeltonColor() {
    // var colors = ['#50C878', '#f6cd61', '#ff726f'];
    // return colors[Math.floor(Math.random() * colors.length)];
    return ['#50C878', '#f6cd61', '#ff726f']
  }





  filterTotalRequests() {
    this.totalToggle = true;
    this.withResultToggle = false;
    this.withoutResultToggle = false;
    this.rejectedToggle = false;
    this.totalStatus = 'Enable';
    this.withResultStatus = 'Disable';
    this.withoutResultStatus = 'Disable';
    this.rejectedStatus = 'Disable';
    this.userTestRequestArray = [];
    this.skeltonArray = [{}, {}, {}, {}];
    this.isFiltered = false;
  
    setTimeout(async () => {
      let filteredArray = this.userTestRequestOrgArray;
      if (this.searchTerm && this.searchTerm.trim() !== '') {
        const searchTermLower = this.searchTerm.toLowerCase();
        filteredArray = filteredArray.filter(item =>
          (item.patient_id && item.patient_id.toLowerCase().includes(searchTermLower)) ||
          (item.patient_name && item.patient_name.toLowerCase().includes(searchTermLower)) ||
          (item.sample_code && item.sample_code.toLowerCase().includes(searchTermLower))
        );
      }
      await new Promise((resolve) => {
        this.events.publish('userTestRequestArray', 'loadedTrue');
        resolve(true);
      });
      this.userTestRequestArray = filteredArray.sort((a, b) => {
        return new Date(b.last_modified_datetime || b.request_created_datetime).getTime() -
               new Date(a.last_modified_datetime || a.request_created_datetime).getTime();
      });
      if (this.userTestRequestArray.length == 0) {
        this.isNoRecord = true;
        this.isNoRecordText = "No total requests found";
      } else {
        this.isNoRecord = false;
      }
    }, 1000);
  
    setTimeout(() => {
      this.skeltonArray = [];
      this.isFiltered = true;
    }, 1500);
  }
  
  
  filterWithResults() {
    this.withResultToggle = true;
    this.withoutResultToggle = false;
    this.totalToggle = false;
    this.rejectedToggle = false;
    this.totalStatus = 'Disable';
    this.withoutResultStatus = 'Disable';
    this.rejectedStatus = 'Disable';
    this.withResultStatus = 'Enable';
    this.userTestRequestArray = [];
    this.skeltonArray = [{}, {}, {}, {}];
    this.isFiltered = false;
  
    setTimeout(async () => {
      let filteredArray = this.userTestRequestOrgArray.filter(item => item.result);
      if (this.searchTerm && this.searchTerm.trim() !== '') {
        const searchTermLower = this.searchTerm.toLowerCase();
        filteredArray = filteredArray.filter(item =>
          (item.patient_id && item.patient_id.toLowerCase().includes(searchTermLower)) ||
          (item.patient_name && item.patient_name.toLowerCase().includes(searchTermLower)) ||
          (item.sample_code && item.sample_code.toLowerCase().includes(searchTermLower))
        );
      }
      await new Promise((resolve) => {
        this.events.publish('userTestRequestArray', 'loadedTrue');
        resolve(true);
      });
      this.userTestRequestArray = filteredArray;
      if (this.userTestRequestArray.length == 0) {
        this.isNoRecord = true;
        this.isNoRecordText = "No records with result found";
      } else {
        this.isNoRecord = false;
      }
    }, 1000);
  
    setTimeout(() => {
      this.skeltonArray = [];
      this.isFiltered = true;
    }, 2000);
  }
  
  filterWithoutResults() {
    this.withoutResultToggle = true;
    this.totalToggle = false;
    this.withResultToggle = false;
    this.rejectedToggle = false;
    this.totalStatus = 'Disable';
    this.withResultStatus = 'Disable';
    this.rejectedStatus = 'Disable';
    this.withoutResultStatus = 'Enable';
    this.userTestRequestArray = [];
    this.skeltonArray = [{}, {}, {}, {}];
    this.isFiltered = false;
  
    setTimeout(async () => {
      let filteredArray = this.userTestRequestOrgArray.filter(item => 
        (item.result == null || item.result === '') && item.is_sample_rejected !== 'yes'
      );
      if (this.searchTerm && this.searchTerm.trim() !== '') {
        const searchTermLower = this.searchTerm.toLowerCase();
        filteredArray = filteredArray.filter(item =>
          (item.patient_id && item.patient_id.toLowerCase().includes(searchTermLower)) ||
          (item.patient_name && item.patient_name.toLowerCase().includes(searchTermLower)) ||
          (item.sample_code && item.sample_code.toLowerCase().includes(searchTermLower))
        );
      }

      await new Promise((resolve) => {
        this.events.publish('userTestRequestArray', 'loadedTrue');
        resolve(true);
      });
  
  
      this.userTestRequestArray = filteredArray;
  
      if (this.userTestRequestArray.length == 0) {
        this.isNoRecord = true;
        this.isNoRecordText = "No records without result found";
      } else {
        this.isNoRecord = false;
      }
    }, 1000);
  
    setTimeout(() => {
      this.skeltonArray = [];
      this.isFiltered = true;
    }, 2000);
  }
  
  filterRejectedResults() {
    this.rejectedToggle = true;
    this.withoutResultToggle = false;
    this.totalToggle = false;
    this.withResultToggle = false;
    this.totalStatus = 'Disable';
    this.withResultStatus = 'Disable';
    this.withoutResultStatus = 'Disable';
    this.rejectedStatus = 'Enable';
    this.userTestRequestArray = [];
    this.skeltonArray = [{}, {}, {}, {}];
    this.isFiltered = false;
  
    setTimeout(async () => {
      let filteredArray = this.userTestRequestOrgArray.filter(item => item.is_sample_rejected === 'yes');
      if (this.searchTerm && this.searchTerm.trim() !== '') {
        const searchTermLower = this.searchTerm.toLowerCase();
        filteredArray = filteredArray.filter(item =>
          (item.patient_id && item.patient_id.toLowerCase().includes(searchTermLower)) ||
          (item.patient_name && item.patient_name.toLowerCase().includes(searchTermLower)) ||
          (item.sample_code && item.sample_code.toLowerCase().includes(searchTermLower))
        );
      }
      await new Promise((resolve) => {
        this.events.publish('userTestRequestArray', 'loadedTrue');
        resolve(true);
      });
      this.userTestRequestArray = filteredArray;
      if (this.userTestRequestArray.length == 0) {
        this.isNoRecord = true;
        this.isNoRecordText = "No rejected records found";
      } else {
        this.isNoRecord = false;
      }
    }, 1000);
  
    setTimeout(() => {
      this.skeltonArray = [];
      this.isFiltered = true;
    }, 2000);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.userTestRequestArray = this.userTestRequestOrgArray.sort(function (a, b) {
        return new Date(b.last_modified_datetime ? b.last_modified_datetime : b.request_created_datetime).getTime() - new Date(a.last_modified_datetime ? a.last_modified_datetime : a.request_created_datetime).getTime()
      });
      event.target.complete();
    }, 2000);
  }
}