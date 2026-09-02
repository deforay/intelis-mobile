import { Router } from '@angular/router';
import { PrivilegeService } from './../privilage/privilege.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Events } from '../providers';

@Injectable({
  providedIn: 'root',
})
export class MultilevelService {
  // path = '../../../assets/multi-accordion-with drc.json';
  path = '../../../assets/multi-accordion.json';
  pagesArray: any = [];
  formId: any;
  constructor(
    private httpClient: HttpClient,
    private privilegeService: PrivilegeService,
    private storage:Storage,public events:Events,private router:Router
  ) {

  }
 async ionViewWillEnter() {


    await this.storage.create();
    await this.storage.get('loginDetails').then(async (loginDetails) => {
      if (loginDetails) {
        this.formId = loginDetails['form'];
      }
    })

  }

  async fetchMenuItems() {
    await this.storage.create();
    await this.storage.get('loginDetails').then(async (loginDetails) => {
      if (loginDetails) {
        this.formId = loginDetails['form'];
      }else{
        this.router.navigate(['/login']);
       }
    })
    return new Promise(async (resolve, reject) => {
      await this.privilegeService.init();
      let data = this.getData();
      await this.getData().subscribe(async(data) => {
        this.pagesArray = data;
       await this.pagesArray.map(async(obj) => {
          if (obj.name == 'COVID-19') {
            if (this.privilegeService.isCovidPrivilege) {
              obj.access = true;
              obj.item.map((types) => {
                if (types.name == 'Test Requests'&&this.privilegeService.canCovidRequest) {
                  if ( this.privilegeService.canCovidRequestAdd || this.privilegeService.canCovidRequestView) {
                    types.access = true;
                    types["item"].map((crud) => {
                      if (crud.name == 'Add New Request') {
                        if (this.privilegeService.canCovidRequestAdd) {
                          crud.access = true;
                        }
                         if (this.formId=='1'||this.formId==1) {
                          crud.url='/covid19-add-southsudan'
                          // console.log('covid19-add-southsudan');
                        }else if (this.formId=='3'||this.formId==3) {
                          crud.url='/mohdrc-add-new-request'
                          // console.log('mohdrc-add-new-request');

                        }
                      }
                       if (crud.name == 'View Test Request') {
                        if (this.privilegeService.canCovidRequestView) {
                          crud.access = true;
                        }
                        if (this.formId=='1'||this.formId==1) {
                          crud.url='/covid19-view-southsudan'
                          // console.log('covid19-view-southsudan');
                        }else if (this.formId=='3'||this.formId==3) {
                          crud.url='/mohdrc-view-test-request'
                          // console.log('mohdrc-view-test-request');

                        }
                      }
                    });
                  }
                }
                  if (types.name == 'Test Results'&&this.privilegeService.canCovidResult) {
                    types.access = true;
                    types["item"].map((crud) => {
                      if (crud.name == 'Enter Test Result') {
                        if (this.privilegeService.canCovidResultEnterResultManually) {
                          crud.access = true;
                        }
                      }
                       if (crud.name == 'View Test Result') {
                        if (this.privilegeService.canCovidResultEnterResultManually) {
                          crud.access = true;
                        }
                      }
                    });

                }
              });
            }
          }
          if (obj.name == 'EID') {
             if (this.privilegeService.isEIDPrivilege) {
              obj.access = true;
              obj.item.map((types) => {
                if (types.name == 'Test Requests'&&this.privilegeService.canEIDRequest) {
                  if (
                    this.privilegeService.canEIDRequestAdd ||
                    this.privilegeService.canEIDRequestView
                  ) {
                    types.access = true;
                    types["item"].map((crud) => {
                      if (crud.name == 'Add New Request') {
                        if (this.privilegeService.canEIDRequestAdd) {
                          crud.access = true;
                        }
                         if (this.formId=='1'||this.formId==1) {
                          crud.url='/add-new-request'
                          // console.log('add-new-request');

                        }else if (this.formId=='3'||this.formId==3) {
                          crud.url='/new-eid-drc'
                          // console.log('new-eid-drc');

                        }
                      }
                       if (crud.name == 'View Test Request') {
                        if (this.privilegeService.canEIDRequestView) {
                          crud.access = true;
                        }
                        if (this.formId=='1'||this.formId==1) {
                          crud.url='/eid-view-southsudan'
                          // console.log('eid-view-southsudan');

                        }else if (this.formId=='3'||this.formId==3) {
                          crud.url='/eid-view-drc'
                          // console.log('eid-view-drc');

                        }
                      }
                    });
                  }
                }
                  if (types.name == 'Test Results'&&this.privilegeService.canEIDResult) {
                  // if (
                  //   this.privilegeService.canEIDResultsAdd ||
                  //   this.privilegeService.canCovidRequestView
                  // ) {
                    types.access = true;
                    types["item"].map((crud) => {
                      if (crud.name == 'Enter Test Result') {
                        if (this.privilegeService.canEIDResultsEnterResultManually) {
                          crud.access = true;
                        }
                      }
                      if (crud.name == 'View Test Result') {
                        if (this.privilegeService.canEIDResultsEnterResultManually) {
                          crud.access = true;
                        }
                      }
                    });
                  // }
                }
              });
            }
          }
          if (obj.name == 'VL') {
             if (this.privilegeService.isVLPrivilege) {
              obj.access = true;
              obj.item.map((types) => {
                if (types.name == 'Test Requests'&&this.privilegeService.canVLRequest) {
                  if (
                    this.privilegeService.canVLRequestAdd ||
                    this.privilegeService.canVLRequestView
                  ) {
                    types.access = true;
                    types["item"].map((crud) => {
                      if (crud.name == 'Add New Request') {
                        if (this.privilegeService.canVLRequestAdd) {
                          crud.access = true;
                        }
                         if (this.formId=='1'||this.formId==1) {
                          crud.url='/vl-new-request'
                          // console.log('vl-new-request');

                        }else if (this.formId=='3'||this.formId==3) {
                          crud.url='/new-vl-drc'
                          // console.log('new-vl-drc');

                        }
                      }
                       if (crud.name == 'View Test Request') {
                        if (this.privilegeService.canVLRequestView) {
                          crud.access = true;
                        }
                        if (this.formId=='1'||this.formId==1) {
                          crud.url='/vl-view-southsudan'
                          // console.log('vl-view-southsudan');

                        }else if (this.formId=='3'||this.formId==3) {
                          crud.url='/view-vl-drc'
                          // console.log('view-vl-drc');

                        }
                      }

                    });
                  }
                }if (types.name == 'Test Results'&&this.privilegeService.canVLResult) {
                  // if (
                  //   this.privilegeService.canEIDResultsAdd ||
                  //   this.privilegeService.canCovidRequestView
                  // ) {
                    types.access = true;
                    types["item"].map((crud) => {
                      if (crud.name == 'Enter Test Result') {
                        if (this.privilegeService.canVLResultEnterManually) {
                          crud.access = true;
                        }
                      }
                      if (crud.name == 'View Test Result') {
                        if (this.privilegeService.canVLResultEnterManually) {
                          crud.access = true;
                        }
                      }
                    });
                  // }
                }

              });
            }
          }
        } );
        //
        
        this.pagesArray.map( data => {
          // console.log(data,'dataPagesArray');
          if ( data.access && data.item.length == 1 ) {
            if ( data.item[0].access ) {
            } else {
              data.access = false;
            }
          }
        })
        // console.log("this.pagesArray",this.pagesArray)
        this.events.publish('privilege',this.pagesArray)
        resolve( this.pagesArray)
      });
    });
  }
  getData() {
    return this.httpClient.get(this.path);
  }
}
