import { Injectable } from '@angular/core';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Storage } from '@ionic/storage-angular';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '../service/providers';
@Injectable({
  providedIn: 'root',
})
export class DbMigrationService {
  appVersionNumber: any;
  migrationQueries: any = [];
  private storage: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  results: any;
  versionNumber: any = 0.0;
  currentVersion: any;
  migrationVersion: number;
  constructor(
    private appVersion: AppVersion,
    private lclstorage: Storage,
    private platform: Platform,
    private router: Router,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
    public alertService: AlertService
  ) { }

  async startMigration(from) {
    console.log('start Migration');
    this.migrationQueries = ['0.1'
      ,'0.2'
      ,'0.3',
      '0.4',
      // '0.5',
      // '0.6',
      // '0.7',
    ];
    this.migrationVersion = 0.4;
    await this.checkVersion(from);
  }
  async checkVersion(from) {
    console.log(from,'from login for dB');
    let date: any = new Date();
    date = date.toISOString();

    // loading the database from our sql file after the device is ready
    await this.platform.ready().then(async () => {
      await this.sqlite.create({
        name: 'vlsm_mobile.db',
        location: 'default',
      }).then(async (db: SQLiteObject) => {
        this.storage = db;
        if (from == 'login') {
          await this.storage.executeSql(`INSERT INTO version_history (versionNumber,updatedAt) VALUES ("${this.migrationVersion}","${date}")`).then(
            async (result) => {
              const data = await this.storage.executeSql('SELECT * FROM version_history', []);
              console.log(data, "version history insert", result);
            },
            async (error) => {
              const data = await this.storage.executeSql('SELECT * FROM version_history', []);
              console.log(data, "version history insert");
              for (let i = 0; i < data.rows.length; i++) {
                console.log(data.rows.item(i).versionNumber, "data in error",data, error);
              }
            }
          );
        }
        else if (from == 'menu') {
          // console.log(from, 'page directed to check if migration is needed');
          const dataTest = await this.storage.executeSql('CREATE TABLE IF NOT EXISTS "version_history"("versionNumber"	TEXT NOT NULL,"updatedAt"	TEXT NOT NULL);', []);
          const data1 = await this.storage.executeSql('SELECT MAX(versionNumber) AS maxVersion FROM version_history', []);
          for (let i = 0; i < data1.rows.length; i++) {
            this.currentVersion = data1.rows.item(i).maxVersion;
          console.log('Version history',data1.rows.item(i));
          }
          // console.log(dataTest,' createdTable Version history', this.currentVersion, data1.rows.length);
          let queryToExceuteFrom = 0, i = 0;
          if (this.currentVersion < this.migrationVersion) {
            queryToExceuteFrom = this.migrationQueries.indexOf(this.currentVersion);
            queryToExceuteFrom = queryToExceuteFrom + 1;
            // now we know where to exceute our migration files
            i = queryToExceuteFrom;
            console.log(queryToExceuteFrom, this.currentVersion, '<', this.migrationVersion);
          } else if (this.currentVersion == this.migrationVersion) {
            console.log(queryToExceuteFrom, this.currentVersion, '==', this.migrationVersion);
          }
          console.log(i, 'i', this.migrationQueries.length, i < this.migrationQueries.length);
          // migration queries is an array containing versions of database till now
          // query to exceute from decides from which index we need to use for loop to call migration files
          for (i; i < this.migrationQueries.length; i++) {
            let item = this.migrationQueries[i];
            console.log('currentVersion = ', this.currentVersion, 'migrationVersion = ', this.migrationVersion, 'item = ', item);
            // if the current version and  migration version are equal then the app and db are upto date
            if (this.currentVersion == item) {
              console.log('db is upto date, no update required ', item);
              // if the current version is greater than migration version then exceute migration files in order
            } else if (this.currentVersion < item) {
              console.log('db is updating into new version', item);
              // dynamic path of the file based on iteration f the for loop
              let text = 'assets/v(' + item + ').sql';

              this.httpClient.get(text, {
                responseType: 'text',
              }).subscribe(
                async (subData) => {
                  await this.sqlPorter.importSqlToDb(this.storage, subData).then(
                    async (subResponse) => {
                      this.isDbReady.next(true);
                      // after successful exceution of the migration file we need to insert it into version history table
                      await this.storage.executeSql(`INSERT INTO version_history (versionNumber,updatedAt) VALUES ("${item}","${date}")`).then(
                        async (result) => {
                          const data = await this.storage.executeSql('SELECT * FROM version_history', []);
                        },
                        async (error) => {
                          const data = await this.storage.executeSql('SELECT * FROM version_history', []);
                          for (let i = 0; i < data.rows.length; i++) {
                            // this.currentVersion = data.rows.item(i).maxVersion
                          }
                        }
                      );
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                },
                (error) => {
                  console.log(error);
                }
              );
              console.log('app version is updated', date);
            }
          }
          // if (i == this.migrationQueries.length) {
          //   data.serialize(function () {
          //     this.storage.all(
          //       "select name from vlsm_mobile where type='table'",
          //       function (err, tables) {
          //         console.log(tables);
          //       }
          //     );
          //   });
          // }
          // })
          // .catch((error) => {
          //   console.log(error, 'import sql to db error');
          // });
          // });
        }
      });
    });
  }
}
