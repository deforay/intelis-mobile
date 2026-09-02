import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { CrudOperationsService, Events, ToastService, AlertService, } from '../../../app/service/providers';
import { syncDataLimit } from '../../service/constant';
import { syncAllDataLimit } from '../../service/constant';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { CommonService } from '../../service/common/common.service';
@Injectable( {
  providedIn: 'root',
} )
export class SyncTestRequestsService {
  networkType: any;
  appVersionNumber: any;
  deviceOSVersion: any;
  uuid: any;
  UnLoggedUserArray: any = [];
  localStorageSyncedArray: any = [];
  syncedTestReqIndex: any;
  copylocalStorageUnSyncedArray = [];
  subListRespSuccessCount: number = 0;
  subListRespErrorCount: number = 0;
  testRequestSubListArray = [];
  userTestRequestArray: any = [];
  localStorageUnSyncedArray = [];
  failureAlertCount: number = 0;
  errSyncAllCount: number = 0;
  authFailAlertCount: number = 0;
  totSyncArrayLength: number = 0;
  syncLength: number = 0;
  responseSuccessCount: number = 0;
  successCount: number = 0;
  responseErrorCount: number = 0;
  errorCount: number = 0;
  sampleResultSuccessCount: number = 0;
  syncDataCount: number = 0;
  syncLimit: number = 0;
  syncTestRequestJSON = {};
  resultArray = [];
  loggedUserArray: any = [];
  authToken: any;
  formattedDateTime: string;
  userID: any;
  c19UniqueIDArray: any = [];
  eidUniqueIDArray: any = [];
  vlUniqueIDArray: any = [];
  unSyncedSampleResultArray: any = [];
  sampleResultArray: any = [];
  messageArray: any = [];
  unSyncedRequestsArray: any = [];
  editedTestReq: any = [];
  UnSyncedOriginalKeyArray: any = [];
  newTestReq: any = [];
  updatedSyncedArray: any = [];
  private dbStorage: SQLiteObject;
  testresults: any = [];
  c19Array: any = [];
  c19TestsArray: any = [];
  results: any = [];
  unSyncedEidArray: any = [];
  UnSyncedOriginalEidArray: any = [];
  unSyncedEidResultArray: any = [];
  eidtestresults: any = [];
  eidSampleCodeArray: any = [];
  eidSampleResultSuccessCount: number;
  eidSampleResultArray: any = [];
  totSyncEidLength: number = 0;
  copylocalStorageUnSyncedEid = [];
  syncDataEidCount: number = 0;
  responseSuccessEidCount: number = 0;
  responseErrorEidCount: number = 0;
  syncTestEidJSON = {};
  resultEidArray = [];
  updatedSyncedEidArray: any = [];
  editedTestEid: any = [];
  newTestEid: any = [];
  subListRespSuccessEidCount: number = 0;
  subListRespErrorEidCount: number = 0;
  authFailAlertEidCount: number = 0;
  failureAlertEidCount: number = 0;
  errSyncAllEidCount: number = 0;
  testRqstEidSubListArray = [];

  unSyncedVlArray: any = [];
  UnSyncedOriginalVlArray: any = [];
  unSyncedVlResultArray: any = [];
  vltestresults: any = [];
  vlSampleCodeArray: any = [];
  vlSampleResultSuccessCount: number;
  vlSampleResultArray: any = [];
  totSyncVlLength: number = 0;
  copylocalStorageUnSyncedVl = [];
  syncDataVlCount: number = 0;
  responseSuccessVlCount: number = 0;
  responseErrorVlCount: number = 0;
  syncTestVlJSON = {};
  resultVlArray = [];
  updatedSyncedVlArray: any = [];
  editedTestVl: any = [];
  newTestVl: any = [];
  subListRespSuccessVlCount: number = 0;
  subListRespErrorVlCount: number = 0;
  authFailAlertVlCount: number = 0;
  failureAlertVlCount: number = 0;
  errSyncAllVlCount: number = 0;
  testRqstVlSubListArray = [];
  c19SymptomsArray: any[];
  c19reasonsArray: any;
  previousPageUrl: any;
  initArray: any = [];

  constructor(
    public CrudService: CrudOperationsService,
    public commonservice: CommonService,
    public alertService: AlertService,
    public network: Network,
    public toastService: ToastService,
    private storage: Storage,
    private router: Router,
    public events: Events,
    public sql: SQLite
  ) { }

  async ionViewWillEnter( param ) {
    this.networkType = this.network.type;
    await this.storage.create();
    await this.storage.remove( 'selectedCovid19TestReq' );
    await this.storage.get( 'loginDetails' ).then( async ( loginDetails ) => {
      if ( loginDetails ) {
        this.authToken = loginDetails['api_token'];
        this.userID = loginDetails['user'].user_id;
      }
    } );

    if ( param == 'syncall' ) {
      await this.sql.create( {
        name: 'vlsm_mobile.db',
        location: 'default',
      } ).then( ( db: SQLiteObject ) => {
        return new Promise( async ( resolve, reject ) => {
          await db.executeSql( 'SELECT * FROM form_covid19 where user_id=?', [this.userID] ).then( async ( result ) => {
            this.unSyncedRequestsArray = [];
            for ( let i = 0; i < result.rows.length; i++ ) {
              let item = result.rows.item( i );
              this.unSyncedRequestsArray.push( item );
            }
            this.UnSyncedOriginalKeyArray = await this.commonservice.covidSyncArray( this.unSyncedRequestsArray );
            await this.UnSyncedOriginalKeyArray.forEach( async ( element, index ) => {
              await db.executeSql( 'SELECT * FROM covid19_tests where covid19_id=?', [element.covid19Id] ).then( async ( data ) => {
                this.c19TestsArray = [];
                let selectedc19TestsLength = data.rows.length;
                for ( let i = 0; i < selectedc19TestsLength; i++ ) {
                  let outerItem = data.rows.item( i );
                  this.c19TestsArray.push( outerItem );
                }
                element.c19Tests = await this.commonservice.getc19TestsKeysArray( this.c19TestsArray );


              } ).catch( ( e ) => {
                console.log( e );
              } );
              await db.executeSql( 'SELECT * FROM covid19_patient_symptoms where covid19_id=?', [element.covid19Id] ).then( async ( data ) => {
                this.c19SymptomsArray = [];
                let selectedcc19SymptomsLength = data.rows.length;
                for ( let i = 0; i < selectedcc19SymptomsLength; i++ ) {
                  let outerItem = data.rows.item( i );
                  this.c19SymptomsArray.push( outerItem );
                }
                element.covid19PatientSymptomsArray = await this.commonservice.getc19SymptomsKeysArray( this.c19SymptomsArray );

              } ).catch( ( e ) => {
                console.log( e );
              } );

              
              await db.executeSql( 'SELECT * FROM covid19_reasons_for_testing where covid19_id=?', [element.covid19Id] ).then( async ( data ) => {
                this.c19reasonsArray = [];
                let selectedc19ReasonsLength = data.rows.length;
                console.log(selectedc19ReasonsLength);
                for ( let i = 0; i < selectedc19ReasonsLength; i++ ) {
                  let outerItem = data.rows.item( i );
                  this.c19reasonsArray.push( outerItem );
                }
                element.reasonDetails = await this.commonservice.getc19ReasonsKeysArray( this.c19reasonsArray );

              } ).catch( ( e ) => {
                console.log( e );
              } );
            } );
          } ).catch( ( e ) => {
            console.log( e );
          } );
          resolve( this.unSyncedRequestsArray );
        } );
      } );
      await this.sql.create( {
        name: 'vlsm_mobile.db',
        location: 'default',
      } ).then( ( db: SQLiteObject ) => {
        return new Promise( ( resolve, reject ) => {
          db.executeSql( 'SELECT * FROM eid_form where user_id=?', [this.userID] ).then( async ( result ) => {
            this.unSyncedEidArray = [];
            for ( let i = 0; i < result.rows.length; i++ ) {
              let item = result.rows.item( i );
              this.unSyncedEidArray.push( item );
            }
            this.UnSyncedOriginalEidArray = await this.commonservice.eidSyncArray( this.unSyncedEidArray );
            resolve( this.unSyncedEidArray );
          } ).catch( ( e ) => {
            console.log( e );
          } );
        } );
      } );
      await this.sql.create( {
        name: 'vlsm_mobile.db',
        location: 'default',
      } ).then( ( db: SQLiteObject ) => {
        return new Promise( ( resolve, reject ) => {
          db.executeSql( 'SELECT * FROM vl_request_form where user_id=?', [this.userID] ).then( async ( result ) => {
            this.unSyncedVlArray = [];
            for ( let i = 0; i < result.rows.length; i++ ) {
              let item = result.rows.item( i );
              this.unSyncedVlArray.push( item );
            }
            this.UnSyncedOriginalVlArray = await this.commonservice.vlSyncsArray( this.unSyncedVlArray );
            resolve( this.unSyncedVlArray );
          } ).catch( ( e ) => {
            console.log( e );
          } );
        } );
      } );
    }
    else {
      await this.sql.create( {
        name: 'vlsm_mobile.db',
        location: 'default',
      } ).then( ( db: SQLiteObject ) => {
        return new Promise( async ( resolve, reject ) => {
          await db.executeSql( 'SELECT * FROM form_covid19 where user_id=? and is_synced="false"', [this.userID] ).then( async ( result ) => {
            this.unSyncedRequestsArray = [];
            for ( let i = 0; i < result.rows.length; i++ ) {
              let item = result.rows.item( i );
              this.unSyncedRequestsArray.push( item );
            }
            this.UnSyncedOriginalKeyArray = await this.commonservice.covidSyncArray( this.unSyncedRequestsArray );
            await this.UnSyncedOriginalKeyArray.forEach( async ( element, index ) => {
              await db.executeSql( 'SELECT * FROM covid19_tests where covid19_id=?', [element.covid19Id] ).then( async ( data ) => {
                this.c19TestsArray = [];
                let selectedc19TestsLength = data.rows.length;
                for ( let i = 0; i < selectedc19TestsLength; i++ ) {
                  let outerItem = data.rows.item( i );
                  this.c19TestsArray.push( outerItem );
                }
                element.c19Tests = await this.commonservice.getc19TestsKeysArray( this.c19TestsArray );

              } ).catch( ( e ) => {
                console.log( e );
              } );
              await db.executeSql('SELECT * FROM covid19_patient_symptoms where covid19_id=?', [element.covid19Id]).then(async (data) => {
                this.c19SymptomsArray = [];
                let selectedcc19SymptomsLength = data.rows.length;
                for (let i = 0; i < selectedcc19SymptomsLength; i++) {
                    let outerItem = data.rows.item(i);
                    this.c19SymptomsArray.push(outerItem);
                }
            
                // Await the Promise and directly assign the resolved value
                element.covid19PatientSymptomsArray = await this.commonservice.getc19SymptomsKeysArray(this.c19SymptomsArray);
            }).catch((e) => {
                console.log(e);
            });
              await db.executeSql( 'SELECT * FROM covid19_reasons_for_testing where covid19_id=?', [element.covid19Id] ).then( async ( data ) => {
                this.c19reasonsArray = [];
                let selectedc19ReasonsLength = data.rows.length;
                for ( let i = 0; i < selectedc19ReasonsLength; i++ ) {
                  let outerItem = data.rows.item( i );
                  this.c19reasonsArray.push( outerItem );
                }
                element.reasonDetails = await this.commonservice.getc19ReasonsKeysArray( this.c19reasonsArray );
                console.log(this.c19reasonsArray, 'element.reasonDetails', element.reasonDetails);

              } ).catch( ( e ) => {
                console.log( e );
              } );
            } );
          } ).catch( ( e ) => {
            console.log( e );
          } );
          resolve( this.unSyncedRequestsArray );
        } );
      } );
      await this.sql.create( {
        name: 'vlsm_mobile.db',
        location: 'default',
      } ).then( ( db: SQLiteObject ) => {
        return new Promise( ( resolve, reject ) => {
          db.executeSql( 'SELECT * FROM eid_form where user_id=? and is_synced="false"', [this.userID] ).then( async ( result ) => {
            this.unSyncedEidArray = [];
            for ( let i = 0; i < result.rows.length; i++ ) {
              let item = result.rows.item( i );
              this.unSyncedEidArray.push( item );
            }
            console.log(this.unSyncedEidArray,'this.unSyncedEidArray');
            this.UnSyncedOriginalEidArray = await this.commonservice.eidSyncArray( this.unSyncedEidArray );
            resolve( this.unSyncedEidArray );
          } ).catch( ( e ) => {
            console.log( e );
          } );
        } );
      } );
      await this.sql.create( {
        name: 'vlsm_mobile.db',
        location: 'default',
      } ).then( ( db: SQLiteObject ) => {
        return new Promise( ( resolve, reject ) => {
          db.executeSql( 'SELECT * FROM vl_request_form where user_id=? and is_synced="false"', [this.userID] ).then( async ( result ) => {
            this.unSyncedVlArray = [];
            for ( let i = 0; i < result.rows.length; i++ ) {
              let item = result.rows.item( i );
              this.unSyncedVlArray.push( item );
            }
            this.UnSyncedOriginalVlArray = await this.commonservice.vlSyncsArray( this.unSyncedVlArray );
            resolve( this.unSyncedVlArray );
          } ).catch( ( e ) => {
            console.log( e );
          } );
        } );
      } );

    }
  }

  // async syncReceiveTestRequest( param ) {
  //   this.messageArray = [];

  //   this.networkType = this.network.type;
  //   console.log( this.networkType, 'this.networkType', param );
  //   if ( ( this.network.type == 'none' && param != 'auto' ) || ( this.network.type == 'unknown' && param != 'auto' ) ) {
  //     this.alertService.alertWithSingleButton( 'Alert', 'OK', 'You are offline. Please connect to a network to sync.' );
  //   }
  //   else {
  //     console.log( this.networkType, 'this.GotIn', param );
  //     if ( this.network.type != 'none' && this.network.type != 'unknown' ) {
  //       await this.ionViewWillEnter( param );
  //       await this.syncTestRequest( param );
  //       await this.checkSampleResult( param );
  //       await this.initAuto();
  //     }
  //     // await this.events.publish('isSyncWithServer', true);
  //   }
  // }

  async syncReceiveTestRequest(param) {
 
    this.messageArray = [];
    this.networkType = this.network.type;
  
    
    if (navigator.onLine) {
      console.log('Network is connected. Proceeding with sync:', this.networkType, param);
      await this.ionViewWillEnter(param);
      await this.syncTestRequest(param);
      await this.checkSampleResult(param);
      await this.initAuto();
    } else {
      
      console.log('Network is offline. Cannot proceed with sync.');
      this.alertService.alertWithSingleButton('Alert', 'OK', 'You are offline. Please connect to a network to sync.');
    }
  }
  
  

  async syncTestRequest( param ) {

    if ( param == 'menu' || param == 'syncall' ) {
      var postData = 'postDataWithLoader';
    } else {
      var postData = 'postDataWithoutLoader';
    }
    this.responseSuccessCount = 0;
    this.responseErrorCount = 0;
    this.totSyncArrayLength = 0;

    if ( this.UnSyncedOriginalKeyArray.length == 0 ) {

    } else {
      this.appVersionNumber = await this.storage.get( 'appVersionNumber' );
      this.totSyncArrayLength = this.UnSyncedOriginalKeyArray.length;
      this.copylocalStorageUnSyncedArray = Array.from(
        this.UnSyncedOriginalKeyArray
      );


      if ( param == 'syncall' ) {
        if ( this.totSyncArrayLength > syncAllDataLimit ) {
          this.syncDataCount = Math.floor( this.totSyncArrayLength / syncAllDataLimit ) + ( this.totSyncArrayLength % syncAllDataLimit );
          this.syncLimit = syncAllDataLimit;
        } else if ( this.totSyncArrayLength <= syncAllDataLimit ) {
          this.syncDataCount = 1;
        } else {
        }
      }
      else {
        if ( this.totSyncArrayLength > syncDataLimit ) {
          this.syncDataCount = Math.floor( this.totSyncArrayLength / syncDataLimit ) + ( this.totSyncArrayLength % syncDataLimit );
          this.syncLimit = syncDataLimit;
        } else if ( this.totSyncArrayLength <= syncDataLimit ) {
          this.syncDataCount = 1;
        } else {
        }
      }

      if ( this.syncDataCount == 1 ) {
        this.syncTestRequestJSON = {
          appVersion: this.appVersionNumber,
          data: this.UnSyncedOriginalKeyArray,
        };

        this.CrudService[postData]( '/api/v1.1/covid-19/save-request.php', this.syncTestRequestJSON, this.authToken, true).then( async ( mainResult ) => {
          if ( mainResult['token'] != null ) {
            this.authToken = mainResult['token'];
            this.commonservice.tokenUpdate( mainResult['token'] );
          }
          if ( mainResult['status'] == 'success' ) {
            this.resultArray = [];
            this.resultArray = mainResult['data'];

            this.resultArray.forEach( async ( resultAPI, index ) => {
              if ( resultAPI.status == 'success' ) {
                this.responseSuccessCount = this.responseSuccessCount + 1;
                await this.sql
                  .create( {
                    name: 'vlsm_mobile.db',
                    location: 'default',
                  } )
                  .then( ( db: SQLiteObject ) => {
                    return new Promise( async ( resolve, reject ) => {

                      await db.executeSql( `UPDATE form_covid19 set is_synced = "true" where user_id="${this.userID}" and remote_sample_code="${resultAPI.sampleCode}"`, [] ).then( async ( result ) => {
                        // tslint:disable-next-line: no-debugger

                        for ( let i = 0; i < result.rows.length; i++ ) {
                          let item = result.rows.item( i );
                          this.updatedSyncedArray.push( item );
                        }
                        await db.executeSql( 'SELECT * FROM form_covid19 where user_id=? and remote_sample_code=?', [this.userID, resultAPI.sampleCode] ).then( async ( result ) => {
                          this.editedTestReq = [];

                          for ( let i = 0; i < result.rows.length; i++ ) {
                            let item = result.rows.item( i );
                            this.editedTestReq.push( item );
                          }
                          if ( this.editedTestReq.length == 0 ) {
                            await db.executeSql( `UPDATE form_covid19 set is_synced = "true",sample_code="${resultAPI.sampleCode}" where user_id="${this.userID}" and app_sample_code="${resultAPI.appSampleCode}"`, [] ).then( async ( res ) => {
                              await db.executeSql( 'SELECT * FROM form_covid19 where user_id=? and sample_code=?', [this.userID, resultAPI.sampleCode] ).then( async ( result ) => {
                                this.newTestReq = [];

                                for ( let i = 0; i < result.rows.length; i++ ) {
                                  let item = result.rows.item( i );
                                  this.newTestReq.push( item );
                                }
                              } )
                                .catch( ( e ) => {

                                  console.log( e );
                                } );
                            } )
                              .catch( ( e ) => {

                                console.log( e );
                              } );
                          }
                        } )
                          .catch( ( e ) => {

                            console.log( e );
                          } );
                      } )
                        .catch( ( e ) => {

                          console.log( e );
                        } );
                      resolve( this.updatedSyncedArray );
                    } );
                  } );
              } else {

                this.responseErrorCount = this.responseErrorCount + 1;
              }
            } );
            // this.loggedUserArray[0].lastSyncDateTime = this.dateTimeFormat(new Date);

            if ( this.UnSyncedOriginalEidArray.length == 0 && this.UnSyncedOriginalVlArray.length == 0 ) {
              if ( this.responseSuccessCount + this.responseErrorCount == this.totSyncArrayLength ) {
                if ( this.responseSuccessCount != 0 && this.responseErrorCount == 0 ) {
                  // console.log( 'single alert call' );
                  this.singleAlert( 'OK', this.responseSuccessCount, 'synced', 'success', 'syncProcessAlert', '', '' );
                }

                if ( this.responseSuccessCount != 0 && this.responseErrorCount != 0 ) {
                  // console.log( 'single alert call' );
                  this.singleAlert( 'OK', this.responseSuccessCount, 'synced', 'success&error', 'syncProcessAlert', this.responseErrorCount, 'unsynced' );
                }

                if ( this.responseSuccessCount == 0 && this.responseErrorCount != 0 ) {
                  // console.log( 'single alert call' );
                  this.singleAlert( 'OK', this.responseErrorCount, 'unsynced', 'error', 'syncProcessAlert', '', '' );
                }
              }
            }
          } else if ( mainResult['status'] == 'auth-fail' ) {
            this.alertService.alertWithSingleButton( 'Alert', 'OK', mainResult['message'] );
            this.storage.set( 'isLogOut', true );
            this.router.navigate( ['/login'] );
          } 
          else {
            // this.alertService.alertWithSingleButton( 'Alert', 'OK', mainResult['message'] );
          }
        },
          ( err ) => {
            this.alertService.alertWithSingleButton( 'Alert', 'OK', 'Something went wrong.Please try again later.' );
          }
        );
      } else {
        this.authFailAlertCount = 0;
        this.failureAlertCount = 0;
        this.errSyncAllCount = 0;

        _.times( this.syncDataCount, () => {
          this.testRequestSubListArray =
            this.copylocalStorageUnSyncedArray.splice( 0, this.syncLimit );
          if ( this.testRequestSubListArray.length != 0 ) {
            this.syncTestRequestJSON = {
              appVersion: this.appVersionNumber,
              data: this.testRequestSubListArray,
            };

            this.CrudService[postData]( '/api/v1.1/covid-19/save-request.php', this.syncTestRequestJSON, this.authToken, true ).then( ( mainResult ) => {
              if ( mainResult['token'] != null ) {
                this.authToken = mainResult['token'];
                this.commonservice.tokenUpdate( mainResult['token'] );
              }
              if ( mainResult['status'] == 'success' ) {
                this.resultArray = [];
                this.resultArray = mainResult['data'];
                this.resultArray.forEach( async ( resultAPI, index ) => {
                  if ( resultAPI.status == 'success' ) {
                    this.responseSuccessCount = this.responseSuccessCount + 1;
                    await this.sql.create( {
                      name: 'vlsm_mobile.db',
                      location: 'default',
                    } ).then( ( db: SQLiteObject ) => {
                      return new Promise( async ( resolve, reject ) => {
                        await db.executeSql( `UPDATE form_covid19 set is_synced= "true" where user_id="${this.userID}" and sample_code="${resultAPI.sampleCode}"`, [] ).then( async ( res ) => {
                          await db.executeSql( 'SELECT * FROM form_covid19 where user_id=? and sample_code=?', [this.userID, resultAPI.sampleCode] ).then( async ( result ) => {
                            this.editedTestReq = [];
                            for ( let i = 0; i < result.rows.length; i++ ) {
                              let item = result.rows.item( i );
                              this.editedTestReq.push( item );
                            }
                            if ( this.editedTestReq.length == 0 ) {
                              await db.executeSql( `UPDATE form_covid19 set is_synced= "true",sample_code="${resultAPI.sampleCode}" where user_id="${this.userID}" and app_sample_code="${resultAPI.appSampleCode}"`, [] ).then( async ( res ) => {
                                await db.executeSql( 'SELECT * FROM form_covid19 where user_id=? and sample_code=?', [this.userID, resultAPI.sampleCode,] ).then( async ( result ) => {
                                  this.newTestReq = [];
                                  for ( let i = 0; i < result.rows.length; i++ ) {
                                    let item = result.rows.item( i );
                                    this.newTestReq.push( item );
                                  }
                                } ).catch( ( e ) => {
                                  console.log( e );
                                } );
                              } ).catch( ( e ) => {
                                console.log( e );
                              } );
                            }
                          } ).catch( ( e ) => {
                            console.log( e );
                          } );
                        } ).catch( ( e ) => {
                          console.log( e );
                        } );
                      } );
                    } );
                  } else {
                    this.responseErrorCount = this.responseErrorCount + 1;
                  }
                } );

                // this.loggedUserArray[0].lastSyncDateTime = this.dateTimeFormat(new Date);
                if ( this.UnSyncedOriginalEidArray.length == 0 && this.UnSyncedOriginalVlArray.length == 0 ) {
                  if ( this.responseSuccessCount + this.responseErrorCount == this.totSyncArrayLength ) {
                    if ( this.responseSuccessCount != 0 && this.responseErrorCount == 0 ) {
                      // console.log( 'single alert call' );
                      this.singleAlert( 'OK', this.responseSuccessCount, 'synced', 'success', 'syncProcessAlert', '', '' );
                    }

                    if ( this.responseSuccessCount != 0 && this.responseErrorCount != 0 ) {
                      // console.log( 'single alert call' );
                      this.singleAlert( 'OK', this.responseSuccessCount, 'synced', 'success&error', 'syncProcessAlert', this.subListRespErrorCount, 'unsynced' );
                    }

                    if ( this.responseSuccessCount == 0 && this.responseErrorCount != 0 ) {
                      // console.log( 'single alert call' );
                      this.singleAlert( 'OK', this.responseSuccessCount, 'unsynced', 'error', 'syncProcessAlert', '', '' );
                    }
                  }
                }
              } else if ( mainResult['status'] == 'auth-fail' ) {
                if ( this.authFailAlertCount == 0 ) {
                  this.alertService.alertWithSingleButton( 'Alert', 'OK', mainResult['message'] );
                  this.authFailAlertCount++;
                  this.storage.set( 'isLogOut', true );
                  this.router.navigate( ['/login'] );
                }
              } else {
                if ( this.failureAlertCount == 0 ) {
                  // this.alertService.alertWithSingleButton(
                  //   'Alert',
                  //   'OK',
                  //   mainResult['message']
                  // );
                  this.failureAlertCount++;
                }
              }
            },
              ( err ) => {
                if ( this.errSyncAllCount == 0 ) {
                  this.alertService.alertWithSingleButton(
                    'Alert',
                    'OK',
                    'Something went wrong.Please try again later.'
                  );
                  this.errSyncAllCount++;
                }
              }
            );
          }
        } );
      }
    }
    if ( this.UnSyncedOriginalEidArray.length == 0 ) {
      // if( this.UnSyncedOriginalKeyArray.length == 0){
      //   this.singleAlert('OK', '0', '0', 'success', 'syncProcessAlert', '', '');
      // }
    } else {
      this.appVersionNumber = await this.storage.get( 'appVersionNumber' );
      this.totSyncEidLength = this.UnSyncedOriginalEidArray.length;
      this.copylocalStorageUnSyncedEid = Array.from(
        this.UnSyncedOriginalEidArray
      );

      if ( param == 'syncall' ) {
        if ( this.totSyncEidLength > syncAllDataLimit ) {
          this.syncDataEidCount = Math.floor( this.totSyncEidLength / syncAllDataLimit ) + ( this.totSyncEidLength % syncAllDataLimit );
          this.syncLimit = syncAllDataLimit;
        } else if ( this.totSyncEidLength <= syncAllDataLimit ) {
          this.syncDataEidCount = 1;
        } else {
        }
      }
      else {
      if (this.totSyncEidLength > syncDataLimit) {
          this.syncDataEidCount = Math.floor( this.totSyncEidLength / syncDataLimit ) + ( this.totSyncEidLength % syncDataLimit );
          this.syncLimit = syncDataLimit;
      } else if (this.totSyncEidLength <= syncDataLimit) {
          this.syncDataEidCount = 1;
        } else {
        }
      }

      this.totSyncArrayLength = this.totSyncEidLength + this.totSyncArrayLength; //ForCommonAlertCompare

      if ( this.syncDataEidCount == 1 ) {
        this.syncTestEidJSON = {
          appVersion: this.appVersionNumber,
          data: this.UnSyncedOriginalEidArray,
        };

        this.CrudService[postData](
          '/api/v1.1/eid/save-request.php',
          this.syncTestEidJSON,
          this.authToken, true
        ).then(
          async ( mainEidResult ) => {
            if ( mainEidResult['token'] != null ) {
              this.authToken = mainEidResult['token'];
              this.commonservice.tokenUpdate( mainEidResult['token'] );
            }
            if ( mainEidResult['status'] == 'success' ) {
              this.resultEidArray = [];
              this.resultEidArray = mainEidResult['data'];

              this.resultEidArray.forEach( async ( resultAPI, index ) => {
                if ( resultAPI.status == 'success' ) {
                  this.responseSuccessCount = this.responseSuccessCount + 1;
                  await this.sql
                    .create( {
                      name: 'vlsm_mobile.db',
                      location: 'default',
                    } )
                    .then( ( db: SQLiteObject ) => {
                      return new Promise( async ( resolve, reject ) => {
                        await db.executeSql( `UPDATE eid_form set is_synced= "true" where user_id="${this.userID}" and sample_code="${resultAPI.sampleCode}"`, [] ).then( async ( result ) => {
                          for ( let i = 0; i < result.rows.length; i++ ) {
                            let item = result.rows.item( i );
                            this.updatedSyncedEidArray.push( item );
                          }

                          await db.executeSql( 'SELECT * FROM eid_form where user_id=? and sample_code=?', [this.userID, resultAPI.sampleCode] ).then( async ( result ) => {
                            this.editedTestEid = [];
                            for ( let i = 0; i < result.rows.length; i++ ) {
                              let item = result.rows.item( i );
                              this.editedTestEid.push( item );
                            }

                            if ( this.editedTestEid.length == 0 ) {
                              await db.executeSql( `UPDATE eid_form set is_synced= "true",sample_code="${resultAPI.sampleCode}" where user_id="${this.userID}" and app_sample_code="${resultAPI.appSampleCode}"`, [] ).then( async ( res ) => {
                                await db.executeSql( 'SELECT * FROM eid_form where user_id=? and sample_code=?', [this.userID, resultAPI.sampleCode] ).then( async ( result ) => {
                                  this.newTestEid = [];
                                  for ( let i = 0; i < result.rows.length; i++ ) {
                                    let item = result.rows.item( i );
                                    this.newTestEid.push( item );
                                  }
                                } )
                                  .catch( ( e ) => {
                                    console.log( e, 'catchE' );
                                  } );
                              } )
                                .catch( ( e ) => {
                                  console.log( e, 'catchE' );
                                } );
                            }
                          } )
                            .catch( ( e ) => {
                              console.log( e, 'catchE' );
                            } );
                        } )
                          .catch( ( e ) => {
                            console.log( e, 'catchE' );
                          } );
                        resolve( this.updatedSyncedEidArray );
                      } );
                    } );
                } else {
                  this.responseErrorCount = this.responseErrorCount + 1;
                }
              } );

              //  this.loggedUserArray[0].lastSyncDateTime = this.dateTimeFormat(new Date);

              if ( this.UnSyncedOriginalVlArray.length == 0 ) {
                if ( this.responseSuccessCount + this.responseErrorCount == this.totSyncArrayLength ) {
                  if ( this.responseSuccessCount != 0 && this.responseErrorCount == 0 ) {
                    // console.log( 'single alert call' );
                    this.singleAlert( 'OK', this.responseSuccessCount, 'synced', 'success', 'syncProcessAlert', '', '' );
                  }

                  if ( this.responseSuccessCount != 0 && this.responseErrorCount != 0 ) {
                    // console.log( 'single alert call' );
                    this.singleAlert( 'OK', this.responseSuccessCount, 'synced', 'success&error', 'syncProcessAlert', this.responseErrorEidCount, 'unsynced' );
                  }

                  if ( this.responseSuccessCount == 0 && this.responseErrorCount != 0 ) {
                    // console.log( 'single alert call' );
                    this.singleAlert( 'OK', this.responseErrorEidCount, 'unsynced', 'error', 'syncProcessAlert', '', '' );
                  }
                }
              }
            } else if ( mainEidResult['status'] == 'auth-fail' ) {
              this.alertService.alertWithSingleButton( 'Alert', 'OK', 'Something went wrong.Please try again later.' );
              this.storage.set( 'isLogOut', true );
              this.router.navigate( ['/login'] );
            } else {
              // this.alertService.alertWithSingleButton( 'Alert', 'OK', 'Something went wrong.Please try again later.' );
            }
          },
          ( err ) => {
            this.alertService.alertWithSingleButton( 'Alert', 'OK', 'Something went wrong.Please try again later.' );
          }
        );
      } else {
        this.authFailAlertEidCount = 0;
        this.failureAlertEidCount = 0;
        this.errSyncAllEidCount = 0;

        _.times( this.syncDataEidCount, () => {
          this.testRqstEidSubListArray =
            this.copylocalStorageUnSyncedEid.splice( 0, this.syncLimit );

          if ( this.testRqstEidSubListArray.length != 0 ) {
            this.syncTestEidJSON = {
              appVersion: this.appVersionNumber,
              data: this.testRqstEidSubListArray,
            };

            this.CrudService[postData]( '/api/v1.1/eid/save-request.php', this.syncTestEidJSON, this.authToken, true ).then( ( mainEidResult ) => {
              if ( mainEidResult['token'] != null ) {
                // console.log( mainEidResult['token'], 'result[token]', this.authToken );
                this.authToken = mainEidResult['token'];
                this.commonservice.tokenUpdate( mainEidResult['token'] );
              }
              if ( mainEidResult['status'] == 'success' ) {
                this.resultEidArray = [];
                this.resultEidArray = mainEidResult['data'];

                this.resultEidArray.forEach( async ( resultAPI, index ) => {
                  if ( resultAPI.status == 'success' ) {
                    this.responseSuccessCount = this.responseSuccessCount + 1;

                    await this.sql.create( {
                      name: 'vlsm_mobile.db',
                      location: 'default',
                    } ).then( ( db: SQLiteObject ) => {
                      return new Promise( async ( resolve, reject ) => {
                        await db.executeSql( `UPDATE eid_form set is_synced= "true" where user_id="${this.userID}" and sample_code="${resultAPI.sampleCode}"`, [] ).then( ( res ) => {
                          db.executeSql( 'SELECT * FROM eid_form where user_id=? and sample_code=?', [this.userID, resultAPI.sampleCode] ).then( async ( result ) => {
                            this.editedTestEid = [];
                            for ( let i = 0; i < result.rows.length; i++ ) {
                              let item = result.rows.item( i );
                              this.editedTestEid.push( item );
                            }
                            if ( this.editedTestEid.length == 0 ) {
                              await db.executeSql( `UPDATE eid_form set is_synced= "true",sample_code="${resultAPI.sampleCode}" where user_id="${this.userID}" and app_sample_code="${resultAPI.appSampleCode}"`, [] ).then( async ( res ) => {
                                await db.executeSql( 'SELECT * FROM eid_form where user_id=? and sample_code=?', [this.userID, resultAPI.sampleCode] ).then( async ( result ) => {
                                  this.newTestEid = [];
                                  for ( let i = 0; i < result.rows.length; i++ ) {
                                    let item = result.rows.item( i );
                                    this.newTestEid.push( item );
                                  }
                                } ).catch( ( e ) => {
                                  console.log( e, 'catchE' );
                                } );
                              } ).catch( ( e ) => {
                                console.log( e, 'catchE' );
                              } );
                            }
                          } ).catch( ( e ) => {
                            console.log( e, 'catchE' );
                          } );
                        } ).catch( ( e ) => {
                          console.log( e, 'catchE' );
                        } );
                      } );
                    } );
                  } else {
                    this.responseErrorCount = this.responseErrorCount + 1;
                  }
                } );

                if ( this.UnSyncedOriginalVlArray.length == 0 ) {
                  if ( this.responseSuccessCount + this.responseErrorCount == this.totSyncArrayLength ) {
                    if ( this.responseSuccessCount != 0 && this.responseErrorCount == 0 ) {
                      // console.log( 'single alert call' );
                      this.singleAlert( 'OK', this.responseSuccessCount, 'synced', 'success', 'syncProcessAlert', '', '' );
                    }

                    if ( this.responseSuccessCount != 0 && this.responseErrorCount != 0 ) {
                      // console.log( 'single alert call' );
                      this.singleAlert( 'OK', this.responseSuccessCount, 'synced', 'success&error', 'syncProcessAlert', this.subListRespErrorEidCount, 'unsynced' );
                    }

                    if ( this.responseSuccessCount == 0 && this.responseErrorCount != 0 ) {
                      // // console.log( 'single alert call' );
                      this.singleAlert( 'OK', this.responseSuccessCount, 'unsynced', 'error', 'syncProcessAlert', '', '' );
                    }
                  }
                }
              } else if ( mainEidResult['status'] == 'auth-fail' ) {
                if ( this.authFailAlertEidCount == 0 ) {
                  // this.alertService.alertWithSingleButton( 'Alert', 'OK', mainEidResult['message'] );
                  this.authFailAlertEidCount++;
                  this.storage.set( 'isLogOut', true );
                  this.router.navigate( ['/login'] );
                }
              } else {
                if ( this.failureAlertEidCount == 0 ) {
                  // this.alertService.alertWithSingleButton( 'Alert', 'OK', mainEidResult['message'] );
                  this.failureAlertEidCount++;
                }
              }
            },
              ( err ) => {
                if ( this.errSyncAllEidCount == 0 ) {
                  this.alertService.alertWithSingleButton( 'Alert', 'OK', 'Something went wrong.Please try again later.' );
                  this.errSyncAllEidCount++;
                }
              }
            );
          }
        } );
      }
    }
    if ( this.UnSyncedOriginalVlArray.length == 0 ) {
      if ( this.UnSyncedOriginalKeyArray.length == 0 && this.UnSyncedOriginalEidArray.length == 0 ) {
        this.singleAlert( 'OK', '0', '0', 'success', 'syncProcessAlert', '', '' );
      }
    } else {
      this.appVersionNumber = await this.storage.get( 'appVersionNumber' );
      this.totSyncVlLength = this.UnSyncedOriginalVlArray.length;
      this.copylocalStorageUnSyncedVl = Array.from( this.UnSyncedOriginalVlArray );

      if ( param == 'syncall' ) {
        if ( this.totSyncVlLength > syncAllDataLimit ) {
          this.syncDataVlCount = Math.floor( this.totSyncVlLength / syncAllDataLimit ) + ( this.totSyncVlLength % syncAllDataLimit );
          this.syncLimit = syncAllDataLimit;
        } else if ( this.totSyncVlLength <= syncAllDataLimit ) {
          this.syncDataVlCount = 1;
        } else {
        }
      }
      else {
        if ( this.totSyncVlLength > syncDataLimit ) {
          this.syncDataVlCount = Math.floor( this.totSyncVlLength / syncDataLimit ) + ( this.totSyncVlLength % syncDataLimit );
          this.syncLimit = syncDataLimit;
        } else if ( this.totSyncVlLength <= syncDataLimit ) {
          this.syncDataVlCount = 1;
        } else {
        }
      }





      this.totSyncArrayLength = this.totSyncVlLength + this.totSyncArrayLength; //ForCommonAlertCompare

      if ( this.syncDataVlCount == 1 ) {
        this.syncTestVlJSON = {
          appVersion: this.appVersionNumber,
          data: this.UnSyncedOriginalVlArray,
        };

        console.log(this.authToken,'this.authToken');
        this.CrudService[postData](
          '/api/v1.1/vl/save-request.php',
          this.syncTestVlJSON,
          this.authToken, true
        ).then(
          async ( mainVlResult ) => {
            if ( mainVlResult['token'] != null ) {
              this.authToken = mainVlResult['token'];
              this.commonservice.tokenUpdate( mainVlResult['token'] );
            }

            if ( mainVlResult['status'] == 'success' ) {
              this.resultVlArray = [];
              this.resultVlArray = mainVlResult['data'];

              this.resultVlArray.forEach( async ( resultAPI, index ) => {
                if ( resultAPI.status == 'success' ) {
                  this.responseSuccessCount = this.responseSuccessCount + 1;
                  await this.sql.create( {
                    name: 'vlsm_mobile.db',
                    location: 'default',
                  } ).then( ( db: SQLiteObject ) => {
                    return new Promise( async ( resolve, reject ) => {
                      await db.executeSql( `UPDATE vl_request_form set is_synced= "true" where user_id="${this.userID}" and sample_code="${resultAPI.sampleCode}"`, [] ).then( async ( result ) => {
                        for ( let i = 0; i < result.rows.length; i++ ) {
                          let item = result.rows.item( i );
                          this.updatedSyncedVlArray.push( item );
                        }
                        await db.executeSql( 'SELECT * FROM vl_request_form where user_id=? and sample_code=?', [this.userID, resultAPI.sampleCode] ).then( async ( result ) => {
                          this.editedTestVl = [];
                          for ( let i = 0; i < result.rows.length; i++ ) {
                            let item = result.rows.item( i );
                            this.editedTestVl.push( item );
                          }

                          if ( this.editedTestVl.length == 0 ) {
                            await db.executeSql( `UPDATE vl_request_form set is_synced= "true",sample_code="${resultAPI.sampleCode}" where user_id="${this.userID}" and app_sample_code="${resultAPI.appSampleCode}"`, [] ).then( async ( res ) => {
                              await db.executeSql( 'SELECT * FROM vl_request_form where user_id=? and sample_code=?', [this.userID, resultAPI.sampleCode] ).then( async ( result ) => {
                                this.newTestVl = [];
                                for ( let i = 0; i < result.rows.length; i++ ) {
                                  let item = result.rows.item( i );
                                  this.newTestVl.push( item );
                                }
                              } ).catch( ( e ) => {
                                console.log( e, 'catchE' );
                              } );
                            } ).catch( ( e ) => {
                              console.log( e, 'catchE' );
                            } );
                          }
                        } ).catch( ( e ) => {
                          console.log( e, 'catchE' );
                        } );
                      } ).catch( ( e ) => {
                        console.log( e, 'catchE' );
                      } );
                      resolve( this.updatedSyncedVlArray );
                    } );
                  } );
                } else {
                  this.responseErrorCount = this.responseErrorCount + 1;
                }
              } );

              //  this.loggedUserArray[0].lastSyncDateTime = this.dateTimeFormat(new Date);
              if ( this.responseSuccessCount + this.responseErrorCount == this.totSyncArrayLength ) {
                if ( this.responseSuccessCount != 0 && this.responseErrorCount == 0 ) {
                  // console.log( 'single alert call' );
                  this.singleAlert( 'OK', this.responseSuccessCount, 'synced', 'success', 'syncProcessAlert', '', '' );
                }

                if ( this.responseSuccessCount != 0 && this.responseErrorCount != 0 ) {
                  // console.log( 'single alert call' );
                  this.singleAlert( 'OK', this.responseSuccessCount, 'synced', 'success&error', 'syncProcessAlert', this.responseErrorVlCount, 'unsynced' );
                }

                if ( this.responseSuccessCount == 0 && this.responseErrorCount != 0 ) {
                  // console.log( 'single alert call' );
                  this.singleAlert( 'OK', this.responseErrorVlCount, 'unsynced', 'error', 'syncProcessAlert', '', '' );
                }
              }
            } else if ( mainVlResult['status'] == 'auth-fail' ) {
              // this.alertService.alertWithSingleButton( 'Alert', 'OK', mainVlResult['message'] );
              this.storage.set( 'isLogOut', true );
              this.router.navigate( ['/login'] );
            } else {
              // this.alertService.alertWithSingleButton( 'Alert', 'OK', 'Something went wrong.Please try again later.' );
            }
          },
          ( err ) => {
            this.alertService.alertWithSingleButton( 'Alert', 'OK', 'Something went wrong.Please try again later.' );
          }
        );
      } else {
        this.authFailAlertVlCount = 0;
        this.failureAlertVlCount = 0;
        this.errSyncAllVlCount = 0;

        _.times( this.syncDataVlCount, () => {
          this.testRqstVlSubListArray = this.copylocalStorageUnSyncedVl.splice( 0, this.syncLimit );
          if ( this.testRqstVlSubListArray.length != 0 ) {
            this.syncTestVlJSON = { appVersion: this.appVersionNumber, data: this.testRqstVlSubListArray, };

            console.log(this.authToken,'this.authToken');
            this.CrudService[postData]( '/api/v1.1/vl/save-request.php', this.syncTestVlJSON, this.authToken, true ).then( ( mainVlResult ) => {
              if ( mainVlResult['token'] != null ) {
                this.authToken = mainVlResult['token'];
                this.commonservice.tokenUpdate( mainVlResult['token'] );
              }
              if ( mainVlResult['status'] == 'success' ) {
                this.resultVlArray = [];
                this.resultVlArray = mainVlResult['data'];

                this.resultVlArray.forEach( async ( resultAPI, index ) => {
                  if ( resultAPI.status == 'success' ) {
                    this.responseSuccessCount = this.responseSuccessCount + 1;

                    await this.sql.create( {
                      name: 'vlsm_mobile.db',
                      location: 'default',
                    } ).then( ( db: SQLiteObject ) => {
                      return new Promise( async ( resolve, reject ) => {
                        await db.executeSql( `UPDATE vl_request_form set is_synced= "true" where user_id="${this.userID}" and sample_code="${resultAPI.sampleCode}"`, [] ).then( async ( res ) => {
                          await db.executeSql( 'SELECT * FROM vl_request_form where user_id=? and sample_code=?', [this.userID, resultAPI.sampleCode] ).then( async ( result ) => {
                            this.editedTestVl = [];
                            for ( let i = 0; i < result.rows.length; i++ ) {
                              let item = result.rows.item( i );
                              this.editedTestVl.push( item );
                            }
                            if ( this.editedTestVl.length == 0 ) {
                              await db.executeSql( `UPDATE vl_request_form set is_synced= "true",sample_code="${resultAPI.sampleCode}" where user_id="${this.userID}" and app_sample_code="${resultAPI.appSampleCode}"`, [] ).then( async ( res ) => {
                                await db.executeSql( 'SELECT * FROM vl_request_form where user_id=? and sample_code=?', [this.userID, resultAPI.sampleCode] ).then( async ( result ) => {
                                  this.newTestVl = [];
                                  for ( let i = 0; i < result.rows.length; i++ ) {
                                    let item = result.rows.item( i );
                                    this.newTestVl.push( item );
                                  }
                                } ).catch( ( e ) => {
                                  console.log( e, 'catchE' );
                                } );
                              } ).catch( ( e ) => {
                                console.log( e, 'catchE' );
                              } );
                            }
                          } ).catch( ( e ) => {
                            console.log( e, 'catchE' );
                          } );
                        } ).catch( ( e ) => {
                          console.log( e, 'catchE' );
                        } );
                      } );
                    } );
                  } else {
                    console.log( this.responseErrorCount, resultAPI, resultAPI.status, resultAPI.sampleCode, 'resultAPI.status' );
                    this.responseErrorCount = this.responseErrorCount + 1;
                  }
                } );

                //  this.loggedUserArray[0].lastSyncDateTime = this.dateTimeFormat(new Date);

                if ( this.responseSuccessCount + this.responseErrorCount == this.totSyncArrayLength ) {
                  if ( this.responseSuccessCount != 0 && this.responseErrorCount == 0 ) {
                    // console.log( 'single alert call' );
                    this.singleAlert( 'OK', this.responseSuccessCount, 'synced', 'success', 'syncProcessAlert', '', '' );
                  }

                  if ( this.responseSuccessCount != 0 && this.responseErrorCount != 0 ) {
                    console.log( 'single alert call', this.responseSuccessCount, this.responseErrorCount );
                    this.singleAlert( 'OK', this.responseSuccessCount, 'synced', 'success&error', 'syncProcessAlert', this.subListRespErrorVlCount, 'unsynced' );
                  }

                  if ( this.responseSuccessCount == 0 && this.responseErrorCount != 0 ) {
                    // console.log( 'single alert call' );
                    this.singleAlert( 'OK', this.responseSuccessCount, 'unsynced', 'error', 'syncProcessAlert', '', '' );
                  }
                }
              } else if ( mainVlResult['status'] == 'auth-fail' ) {
                if ( this.authFailAlertVlCount == 0 ) {
                  // this.alertService.alertWithSingleButton( 'Alert', 'OK', mainVlResult['message'] );
                  this.authFailAlertVlCount++;
                  this.storage.set( 'isLogOut', true );
                  this.router.navigate( ['/login'] );
                }
              } else {
                if ( this.failureAlertVlCount == 0 ) {
                  // this.alertService.alertWithSingleButton( 'Alert', 'OK', mainVlResult['message'] );
                  this.failureAlertVlCount++;
                }
              }
            },
              ( err ) => {
                if ( this.errSyncAllVlCount == 0 ) {
                  this.alertService.alertWithSingleButton( 'Alert', 'OK', 'Something went wrong.Please try again later.' );
                  this.errSyncAllVlCount++;
                }
              }
            );
          }
        } );
      }
    }
  }

  async checkSampleResult( param ) {
    if ( param == 'syncall' ) {
      await this.toastService.presentToastWithoutOptions( 'All requests synced successfully!!' );
    }
    this.sampleResultSuccessCount = 0;
    if ( param == 'menu' || param == 'syncall' ) {
      var postData = 'postDataWithLoader';
    } else {
      var postData = 'postDataWithoutLoader';
    }
    this.sql
      .create( {
        name: 'vlsm_mobile.db',
        location: 'default',
      } )
      .then( async ( db: SQLiteObject ) => {
        // AND (sample_code<>"" OR remote_sample_code<>"")
        await db
          .executeSql(
            'SELECT unique_id FROM form_covid19 WHERE (is_sample_rejected=="" || is_sample_rejected == null)',
            []
          )
          .then( async ( data ) => {

            this.unSyncedSampleResultArray = [];
            for ( let i = 0; i < data.rows.length; i++ ) {
              let item = data.rows.item( i );
              this.unSyncedSampleResultArray.push( item );
            }

            if ( this.unSyncedSampleResultArray.length != 0 ) {

              this.c19UniqueIDArray = [];

              this.unSyncedSampleResultArray.forEach( ( element, index ) => {
                this.c19UniqueIDArray.push( element.unique_id );
              } );

              let checkSampleResultJSON = {
                uniqueId: this.c19UniqueIDArray,
                facility: [],
                sampleCollectionDate: [],
              };

              await this.CrudService[postData](
                '/api/v1.1/covid-19/fetch-results.php',
                checkSampleResultJSON,
                this.authToken, true
              ).then( ( result ) => {
                if ( result['token'] != null ) {
                  this.authToken = result['token'];
                  this.commonservice.tokenUpdate( result['token'] );
                }
                this.sampleResultArray = [];

                if ( result['status'] == 'success' ) {
                  this.sampleResultArray = result['data'];


                  if ( this.sampleResultArray.length != 0 ) {
                    this.sql.create( {
                      name: 'vlsm_mobile.db',
                      location: 'default',
                    } ).then( ( db: SQLiteObject ) => {
                      this.sampleResultArray.forEach( async ( item ) => {
                        await db.executeSql( `UPDATE form_covid19 set sample_received_at_vl_lab_datetime="${item.sampleReceivedDate}",lab_id="${item.labId}",lab_name="${item.labName}",sample_condition="${item.sampleCondition}",lab_technician="${item.labTechnician}",lab_technician_name="${item.labTechnicianName}",is_sample_rejected="${item.sampleRejected}",reason_for_sample_rejection="${item.rejectionReason}",rejection_on="${item.rejectionDate}",tested_by="${item.testedBy}",tested_by_name="${item.testedByName}",is_result_authorised="${item.isAuthorised}",authorized_by="${item.authorisedBy}",authorized_on="${item.authorisedOn}",result= "${item.result}" where sample_code="${item.sampleCode}"`, [] ).then( async ( res ) => {
                          this.sampleResultSuccessCount = this.sampleResultSuccessCount + 1;
                          await db.executeSql( 'SELECT * FROM form_covid19 WHERE sample_code=?', [item.sampleCode] ).then( ( data ) => {
                            this.testresults = [];
                            for ( let i = 0; i < data.rows.length; i++ ) {
                              let item = data.rows.item( i );
                              this.testresults.push( item );
                            }
                          } );
                        } );
                      } );

                      this.dbStorage = db;
                      let data = [];
                      let rowArgs = [];

                      var query =
                        'INSERT INTO covid19_tests (covid19_id,facility_id,test_name,tested_by,sample_tested_datetime,testing_platform,kitLotNo,kitExpiryDate,result) VALUES ';

                      this.sampleResultArray.forEach( function ( item ) {
                        if ( item.c19Tests.length > 0 ) {
                          for ( var i = 0; i < item.c19Tests.length; i++ ) {
                            rowArgs.push( '(?, ?, ?, ?, ?, ?, ?, ?, ?)' );
                            data.push( item.c19Tests[i].covid19Id );
                            data.push( item.c19Tests[i].facilityId );
                            data.push( item.c19Tests[i].testName );
                            data.push( item.testedByName );
                            data.push( item.c19Tests[i].testDate );
                            data.push( item.c19Tests[i].testingPlatform );
                            data.push( item.c19Tests[i].kitLotNo );
                            data.push( item.c19Tests[i].kitExpiryDate );
                            data.push( item.c19Tests[i].testResult );
                          }
                        }
                      } );
                      query += rowArgs.join( ', ' );
                      // console.log( query );

                      return this.dbStorage
                        .executeSql( query, data )
                        .then( ( res ) => {

                          return this.dbStorage
                            .executeSql( 'SELECT * FROM covid19_tests', [] )
                            .then( ( data ) => {

                              this.testresults = [];
                              for ( let i = 0; i < data.rows.length; i++ ) {
                                let item = data.rows.item( i );
                                this.testresults.push( item );
                              }

                            } );
                        } )
                        .catch( ( error ) => {
                          console.log( error );
                        } );
                    } );
                  }
                }
              } );
            }
          } )
          .catch( ( error ) => {
            console.log( error );
          } );
      } );

    this.sql
      .create({
        name: 'vlsm_mobile.db',
        location: 'default',
      })
      .then(async (db: SQLiteObject) => {
        await db
          .executeSql(
            'SELECT * FROM eid_form where sample_code != "" and is_sample_rejected != "yes" and result=""',
            []
          )
          .then(async (result) => {
            this.unSyncedEidResultArray = [];
            for (let i = 0; i < result.rows.length; i++) {
              let item = result.rows.item(i);
              this.unSyncedEidResultArray.push(item);
            }
            if (this.unSyncedEidResultArray.length > 0) {
              this.eidUniqueIDArray = [];

              this.unSyncedEidResultArray.forEach((element, index) => {
                this.eidUniqueIDArray.push(element.unique_id);
              });

              let checkEidSampleResultJSON = {
                uniqueId: this.eidUniqueIDArray,
                // "sampleCode": ["REID0821006"],
                facility: [],
                sampleCollectionDate: [],
              };
              // console.log(checkEidSampleResultJSON, 'checkEidSampleResultJSON', this.authToken);

              this.CrudService[postData](
                '/api/v1.1/eid/fetch-results.php',
                checkEidSampleResultJSON,
                this.authToken, true
              ).then( ( result ) => {
                if ( result['token'] != null ) {
                  this.authToken = result['token'];
                  this.commonservice.tokenUpdate(result['token']);
                }
                this.eidSampleResultArray = [];
                if (result['status'] == 'success') {
                  this.eidSampleResultArray = result['data'];


                  if ( this.eidSampleResultArray.length != 0 ) {
                    this.sql.create( {
                      name: 'vlsm_mobile.db',
                      location: 'default',
                    } ).then( ( db: SQLiteObject ) => {
                      this.eidSampleResultArray.forEach( async ( item ) => {
                        await db.executeSql( `UPDATE eid_form set sample_received_at_vl_lab_datetime="${item.sampleReceivedDate}",lab_id="${item.labId}",is_sample_rejected="${item.isSampleRejected}",reason_for_sample_rejection="${item.rejectionReason}",tested_by="${item.testedBy}",result_approved_by="${item.approvedBy}",result_approved_datetime="${item.approvedOn}",result= "${item.result}" where sample_code="${item.sampleCode}"`, [] ).then( async ( res ) => {
                          this.sampleResultSuccessCount = this.sampleResultSuccessCount + 1;
                          await db.executeSql( 'SELECT * FROM eid_form WHERE sample_code=?', [item.sampleCode] ).then( ( data ) => {
                            this.eidtestresults = [];
                                  for (let i = 0; i < data.rows.length; i++) {
                                    let item = data.rows.item(i);
                                    this.eidtestresults.push(item);
                            }
                                });
                            });
                        });
                      });
                  }
                }
              } );
            }
          } ).catch( ( e ) => {
            console.log( e );
          } );
      } );

    this.sql
      .create({
        name: 'vlsm_mobile.db',
        location: 'default',
      })
      .then(async (db: SQLiteObject) => {
        await db
          .executeSql(
            'SELECT * FROM vl_request_form where sample_code != "" and is_sample_rejected != "yes" and result=""',
            []
          )
          .then(async (result) => {
            this.unSyncedVlResultArray = [];
            for (let i = 0; i < result.rows.length; i++) {
              let item = result.rows.item(i);
              this.unSyncedVlResultArray.push(item);
            }
            if ( this.unSyncedVlResultArray.length > 0 ) {

              this.vlUniqueIDArray = [];

              this.unSyncedVlResultArray.forEach((element, index) => {
                this.vlUniqueIDArray.push(element.unique_id);
              });

              let checkVlSampleResultJSON = {
                uniqueId: this.vlUniqueIDArray,
                facility: [],
                sampleCollectionDate: [],
              };
              // console.log(checkVlSampleResultJSON, 'checkVlSampleResultJSON');

              this.CrudService[postData](
                '/api/v1.1/vl/fetch-results.php',
                checkVlSampleResultJSON,
                this.authToken, true
              ).then( ( result ) => {
                if ( result['token'] != null ) {
                  this.authToken = result['token'];
                  this.commonservice.tokenUpdate(result['token']);
                }
                this.vlSampleResultArray = [];

                if (result['status'] == 'success') {
                  this.vlSampleResultArray = result['data'];
                  if ( this.vlSampleResultArray.length != 0 ) {
                    this.sql.create( {
                      name: 'vlsm_mobile.db',
                      location: 'default',
                    } ).then( ( db: SQLiteObject ) => {
                      this.vlSampleResultArray.forEach( async ( item ) => {
                        await db.executeSql( `UPDATE vl_request_form set sample_received_at_vl_lab_datetime="${item.sampleReceivedDate}",lab_id="${item.labId}",is_sample_rejected="${item.isSampleRejected}",reason_for_sample_rejection="${item.rejectionReason}",tested_by="${item.testedBy}",result_approved_by="${item.approvedBy}",result_approved_datetime="${item.approvedOn}",result= "${item.result}" where sample_code="${item.sampleCode}"`, [] ).then( async ( res ) => {
                          this.sampleResultSuccessCount = this.sampleResultSuccessCount + 1;
                          await db.executeSql( 'SELECT * FROM vl_request_form WHERE sample_code=?', [item.sampleCode] ).then( ( data ) => {
                            this.vltestresults = [];
                            for ( let i = 0; i < data.rows.length; i++ ) {
                              let item = data.rows.item( i );
                              this.vltestresults.push( item );
                            }
                          } );
                        } );
                      } );
                    } );
                  }
                }
              });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      });

    console.log( this.sampleResultArray, this.eidSampleResultArray, 'check sample Result Alert', this.vlSampleResultArray );
    if ( this.sampleResultArray.length > 0 || this.eidSampleResultArray.length > 0 || this.vlSampleResultArray.length > 0 ) {
      if ( param == 'menu' || param == 'syncall' ) {
        this.singleAlert( 'OK', +this.sampleResultSuccessCount, 'synced', 'success', 'sampleResult', '', '' );
      }
    } else {
      if ( param == 'menu' || param == 'syncall' ) {
        this.singleAlert( 'OK', '0', '0', 'success', 'sampleResult', '', '' );
      }
    }
  }

  // async singleAlert( ok, recCount, syncedUnsynced, type, alertName, errorCount, unsynced ) {

  //   console.log( ok, recCount, syncedUnsynced, type, alertName, errorCount, unsynced, '' );
    
  //   let syncMessage = '', syncTime = new Date();
    

  //   // this.loggedUserArray[0].lastSyncDateTime = this.dateTimeFormat(new Date);
  //   await this.events.publish('syncDateTimeChanged', this.dateTimeFormat(syncTime));

  //   await this.storage.set('syncDateTimeChanged', syncTime);
  //   if (this.UnSyncedOriginalVlArray.length == 0 && this.UnSyncedOriginalKeyArray.length == 0 && this.UnSyncedOriginalEidArray.length == 0) {
  //     if (syncedUnsynced == 'fromLogin') {
  //       syncMessage = 'Sync Successful. ' + recCount + ' Test Results synced and No new requests available';
  //       this.toastService.presentToastWithoutOptions(syncMessage);

  //       // this.toastService.presentToastWithoutOptions("Sync Successful."+ recCount+ " are available to send test requests and receive test results");
  //     }
  //   } else if (this.unSyncedEidResultArray.length == 0 && this.unSyncedSampleResultArray.length == 0 && this.unSyncedVlResultArray.length == 0) {
  //     if (syncedUnsynced == 'fromLogin') {
  //       syncMessage = 'Sync Successful. ' + recCount + ' Test Results synced and No new requests available';
  //       this.toastService.presentToastWithoutOptions(syncMessage);
  //       // this.toastService.presentToastWithoutOptions("Sync Successful."+ recCount+ " are available to send test requests and receive test results");
  //     }
  //   } 
  //   else {
  //     if ( alertName == 'syncProcessAlert' ) {
  //       await this.messageArray.push( { sync: { recCount: recCount, syncedUnsynced: syncedUnsynced, type: type, errorCount: errorCount, unsynced: unsynced } } );
        
  //     }
  //     if ( alertName == 'sampleResult' ) {
  //       await this.messageArray.push( { sampleResult: { recCount: recCount, syncedUnsynced: syncedUnsynced, type: type, errorCount: errorCount, unsynced: unsynced } } );
  //     }
  //     // console.log(this.messageArray, 'singleAlert', this.messageArray.length, recCount, syncedUnsynced, type, alertName, errorCount, unsynced);

  //     if (this.messageArray.length == 2) {
  //       if (this.messageArray[1].sync['type'] == 'success' && this.messageArray[1].sync['recCount'] != 0 && this.messageArray[0].sampleResult['type'] == 'success' && this.messageArray[0].sampleResult['recCount'] != 0) {

  //         syncMessage = 'Sync Successful. ' + this.messageArray[1].sync['recCount'] + ' Test Requests and ' + this.messageArray[0].sampleResult['recCount'] + ' Test Results synced.';
  //         this.toastService.presentToastWithoutOptions(syncMessage);

  //       } 
  //       else if (this.messageArray[1].sync['type'] == 'success' && this.messageArray[1].sync['recCount'] != 0 && this.messageArray[0].sampleResult['type'] == 'success' && this.messageArray[0].sampleResult['recCount'] == 0) {

  //         syncMessage = 'Sync Successful. ' + this.messageArray[1].sync['recCount'] + ' Test Requests synced and No new results available';
  //         this.toastService.presentToastWithoutOptions(syncMessage);

  //       } 
  //       else if (this.messageArray[1].sync['type'] == 'success' && this.messageArray[1].sync['recCount'] == 0 && this.messageArray[0].sampleResult['type'] == 'success' && this.messageArray[0].sampleResult['recCount'] != 0) {

  //         syncMessage = 'Sync Successful. ' + this.messageArray[0].sampleResult['recCount'] + ' Test Results synced and No new requests available';
  //         this.toastService.presentToastWithoutOptions(syncMessage);

  //       } 
  //       else if (this.messageArray[1].sync['type'] == 'success' && this.messageArray[1].sync['recCount'] != 0 && this.messageArray[0].sampleResult['type'] == 'success' && this.messageArray[0].sampleResult['recCount'] == 0 && this.messageArray[0].sampleResult['syncedUnsynced'] == 'synced') {

  //         syncMessage = 'Sync Successful.No new results available';
  //         this.toastService.presentToastWithoutOptions(syncMessage);

  //       } 
  //       else if (this.messageArray[1].sync['type'] == 'success' && this.messageArray[1].sync['recCount'] == 0 && this.messageArray[0].sampleResult['type'] == 'success' && this.messageArray[0].sampleResult['recCount'] == 0 && this.messageArray[0].sampleResult['syncedUnsynced'] == 'synced') {

  //         syncMessage = 'Sync Successful. No new results or requests available';
  //         this.toastService.presentToastWithoutOptions(syncMessage);

  //       } 
  //       else if (this.messageArray[1].sync['type'] == 'success' && this.messageArray[1].sync['syncedUnsynced'] == 0 && this.messageArray[0].sampleResult['type'] == 'success' && this.messageArray[0].sampleResult['syncedUnsynced'] == 0) {

  //         syncMessage = 'Sync Successful.No records are available to send test requests and receive test results';
  //         this.toastService.presentToastWithoutOptions(syncMessage);

  //       }
  //     }
  //   }
  //   await this.syncTimelineMethod(syncTime, syncMessage);
  //   await this.refreshView();
  // }

  async singleAlert(ok, recCount, syncedUnsynced, type, alertName, errorCount, unsynced) {
   
    console.log(ok, recCount, syncedUnsynced, type, alertName, errorCount, unsynced, '');

    let syncMessage = '';
    let syncTime = new Date();

    await this.events.publish('syncDateTimeChanged', this.dateTimeFormat(syncTime));
    await this.storage.set('syncDateTimeChanged', syncTime);

    if (this.UnSyncedOriginalVlArray.length === 0 &&
        this.UnSyncedOriginalKeyArray.length === 0 &&
        this.UnSyncedOriginalEidArray.length === 0 &&
        this.unSyncedEidResultArray.length === 0 &&
        this.unSyncedSampleResultArray.length === 0 &&
        this.unSyncedVlResultArray.length === 0) {
        
        if (syncedUnsynced === 'fromLogin') {
            syncMessage = `Sync Successful. ${recCount} Test Results synced and No new requests available`;
            this.toastService.presentToastWithoutOptions(syncMessage);
        }
    } 
    else {
        if (alertName === 'syncProcessAlert') {
            this.messageArray.push({ sync: { recCount, syncedUnsynced, type, errorCount, unsynced } });
        }
        if (alertName === 'sampleResult') {
            this.messageArray.push({ sampleResult: { recCount, syncedUnsynced, type, errorCount, unsynced } });
        }

        if (this.messageArray.length === 2) {
          const syncMessageConditions = [
            {
                condition: (msg) => msg[1]?.sync?.type === 'success' && msg[1]?.sync?.recCount !== 0 && msg[0]?.sampleResult?.type === 'success' && msg[0]?.sampleResult?.recCount !== 0,
                message: (msg) => `Sync Successful. ${msg[1].sync.recCount} Test Requests and ${msg[0].sampleResult.recCount} Test Results synced.`
            },
            {
                condition: (msg) => msg[1]?.sync?.type === 'success' && msg[1]?.sync?.recCount !== 0 && msg[0]?.sampleResult?.type === 'success' && msg[0]?.sampleResult?.recCount === 0,
                message: (msg) => `Sync Successful. ${msg[1].sync.recCount} Test Requests synced and No new results available`
            },
            {
                condition: (msg) => msg[1]?.sync?.type === 'success' && msg[1]?.sync?.recCount === 0 && msg[0]?.sampleResult?.type === 'success' && msg[0]?.sampleResult?.recCount !== 0,
                message: (msg) => `Sync Successful. ${msg[0].sampleResult.recCount} Test Results synced and No new requests available`
            },
            {
                condition: (msg) => msg[1]?.sync?.type === 'success' && msg[1]?.sync?.recCount !== 0 && msg[0]?.sampleResult?.type === 'success' && msg[0]?.sampleResult?.recCount === 0 && msg[0]?.sampleResult?.syncedUnsynced === 'synced',
                message: () => 'Sync Successful. No new results available'
            },
            {
                condition: (msg) => msg[1]?.sync?.type === 'success' && msg[1]?.sync?.recCount === 0 && msg[0]?.sampleResult?.type === 'success' && msg[0]?.sampleResult?.recCount === 0 && msg[0]?.sampleResult?.syncedUnsynced === 'synced',
                message: () => 'Sync Successful. No new results or requests available'
            },
            {
                condition: (msg) => msg[1]?.sync?.type === 'success' && msg[1]?.sync?.syncedUnsynced === 0 && msg[0]?.sampleResult?.type === 'success' && msg[0]?.sampleResult?.syncedUnsynced === 0,
                message: () => 'Sync Successful. No records are available to send test requests and receive test results'
            }
        ];
        

            for (let cond of syncMessageConditions) {
                if (cond.condition(this.messageArray)) {
                    syncMessage = cond.message(this.messageArray);
                    this.toastService.presentToastWithoutOptions(syncMessage);
                    break;
                }
            }
        }
    }

    await this.syncTimelineMethod(syncTime, syncMessage);
    await this.refreshView();
}

  async refreshView(){
    this.previousPageUrl = await this.storage.get('previousPageUrl');
      console.log(this.previousPageUrl,'previ');
    if(this.previousPageUrl == '/view-vl'){
      this.events.publish('isSyncWithVl', true);
    }
    else if (this.previousPageUrl == '/view-eid'){
      this.events.publish('isSyncWithEid', true);
    }
    else if (this.previousPageUrl == '/view-covid'){
      this.events.publish('isSyncWithCovid', true);
    }    
  }
  async syncTimelineMethod(date, message) {
    if (date && message != '') {

      let obj = {
        syncedOn: date,
        syncMessage: message,
      };
      await this.storage.get('syncTimeline').then(async (data) => {
        if (data) {
          data.push(obj);
          await this.storage.set('syncTimeline', data);
        } else {
          let array = [];
          array.push(obj);
          await this.storage.set('syncTimeline', array);
        }
      });
    }
  }
  dateTimeFormat(dateObj) {
    var month = new Array();
    month[0] = 'Jan';
    month[1] = 'Feb';
    month[2] = 'Mar';
    month[3] = 'Apr';
    month[4] = 'May';
    month[5] = 'Jun';
    month[6] = 'Jul';
    month[7] = 'Aug';
    month[8] = 'Sep';
    month[9] = 'Oct';
    month[10] = 'Nov';
    month[11] = 'Dec';

    var mydate = new Date(dateObj);

    return (this.formattedDateTime =
      ('0' + mydate.getDate()).slice(-2) +
      '-' +
      month[mydate.getMonth()] +
      '-' +
      mydate.getFullYear() +
      ' ' +
      ('0' + mydate.getHours()).slice(-2) +
      ':' +
      ('0' + mydate.getMinutes()).slice(-2) +
      ':00');
  }
 async initAuto(){
    const initJSON = {
      // appVersion: this.appVersionNumber,
      // deviceOSVersion: '',
      // uuid: ''
    };
    this.appVersionNumber = await this.storage.get( 'appVersionNumber' );
    this.deviceOSVersion = await this.storage.get('deviceOSVersion');
    this.uuid = await this.storage.get('deviceuuid');
    // initJSON.deviceOSVersion = this.deviceOSVersion;
    // initJSON.uuid = this.uuid;
      console.log('initAuto initAuto',this.authToken);
      this.CrudService.postDataWithoutLoader(
        '/api/v1.1/init.php',
        initJSON,
        this.authToken ,true
      ).then(
        async ( result: any ) => {
          if ( result.status == '1' ) {
            this.initArray = result.data;
            
            console.log( 'result.status1' );
            this.insertFacilitiesDetails();
          }
          if ( result.status == '2' ) {
            console.log( 'result.status2' );
          }
        }
      );
    }
   
    insertFacilitiesDetails() {
      this.sql
        .create({
          name: 'vlsm_mobile.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.dbStorage = db;
          const data = [];
          const rowArgs = [];
          let query =
            'INSERT OR REPLACE INTO facility_details (facility_id,facility_name,facility_code,facility_state,facility_state_id,facility_district,facility_district_id,other_id,testing_points,status) VALUES ';
          this.initArray.facilitiesList.forEach( function ( item ) {
            rowArgs.push( '(? ,?, ?, ?, ?, ?, ?, ?, ?, ?)' );
  
            data.push(item.facility_id);
            data.push(item.facility_name);
            data.push(item.facility_code);
            data.push(item.facility_state);
            data.push(item.facility_state_id);
            data.push(item.facility_district);
            data.push(item.facility_district_id);
            data.push(item.other_id);
            data.push(item.testing_points);
            data.push(item.status);
          });
          query += rowArgs.join(', ');
  
          return this.dbStorage
            .executeSql(query, data)
            .then((res) => {
              // console.log('inserted facility details table');
  
              return this.dbStorage
                .executeSql('SELECT * FROM facility_details', [])
                .then((data) => {
                  // console.log(data);
                  this.results = [];
                  for ( let i = 0; i < data.rows.length; i++ ) {
                    const item = data.rows.item( i );
                    this.results.push( item );
                  }
                  // console.log(this.results, 'facility_details');
                });
            })
            .catch((error) => {
              console.log(error);
            });
        });
    } 
  
}
