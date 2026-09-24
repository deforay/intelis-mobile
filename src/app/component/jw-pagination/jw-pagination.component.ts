import { PrivilegeService } from './../../service/privilage/privilege.service';
import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { Events } from '../../../app/service/providers';
import { CommonService } from '../../service/common/common.service';
@Component({
    selector: 'app-jw-pagination',
    templateUrl: './jw-pagination.component.html',
    styleUrls: ['./jw-pagination.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class JwPaginationComponent implements OnInit {
  @Input() items: Array<any>;
  @Input() page: string;
  @Input() search: string;
  resultCondition: any;
  cp: number = 1;
  formCondition: any;
  navToPage: any;
  itemsArray: any = [];
  c19TestsKeysArray: any = [];
  showEdit = false;
  showView = false;
  resultArray: any = [];
  constructor(
    private storage: Storage,
    private router: Router,
    public events: Events,
    public privilegeService: PrivilegeService,
    public commonservice: CommonService
  ) {
    
    console.log(this.router.url, 'this.router.url in Pagination Component');

    if (this.router.url == '/eid-view-southsudan' || this.router.url == '/eid-test-result') {
      this.formCondition = 'eid';
    } 
    else if (this.router.url == '/covid19-view-southsudan' || this.router.url == '/enter-test-result') {
      this.formCondition = 'covid';
    } 

    else if (this.router.url == '/vl-view-southsudan' || this.router.url == '/enter-vl-result') {
      this.formCondition = 'vl';
    }

    this.events.subscribe('userTestRequestArray', (result: any) => {
      if (result == 'loadedTrue') {
        this.ngOnInit();
      }
    });
    this.events.subscribe('userTestPendingResultArray', (result: any) => {
      if (result == 'loadedTrue') {
        this.ngOnInit();
      }
    });
    this.events.subscribe('userEidPendingResultArray', (result: any) => {
      if (result == 'loadedTrue') {
        this.ngOnInit();
      }
    });
    this.events.subscribe('userVlPendingResultArray', (result: any) => {
      if (result == 'loadedTrue') {
        this.ngOnInit();
      }
    });
      this.events.subscribe('isSyncWithServer',async (result:any)=>{
        //
        if (result) {
         await this.ngOnInit();

        this.navToPage = this.router.url;
     await this.router.navigate([
        this.navToPage,
        {
          previuosPageURL: this.router.url.split(';'),
        },
      ]);
        }
      })
    this.setPrivilege();
  }
  async ngOnInit() {
  
    this.itemsArray = [];
    const initArray = await this.storage.get('initArray');

    if (this.formCondition == 'covid') {
      this.resultArray = initArray.covid19.resultsList;
      console.log(this.resultArray)
    }
    else if (this.formCondition == 'eid') {
      this.resultArray = initArray.eid.resultsList;
    }
    else if (this.formCondition == 'vl') {
      this.resultArray = initArray.vl.resultsList;
    }
    if (this.page != 'search') {
      await this.getOriginalKeyArray(this.items);
    } else {
      this.itemsArray = this.items;
    }
    this.itemsArray.forEach(element => {
      // Kept for the card's colour: the lookup below does not know VL copy numbers.
      // COVID-19 lists carry the result as testResult.
      if (element.rawResult === undefined) {
        element.rawResult = element.result ?? element.testResult;
      }
      if (this.resultArray) {
        this.resultArray.forEach(Object => {
          if (parseInt(element.result) === Object.value) {
            element.showResult = Object.show;
          }
        });
        element.result = this.resultArray[parseInt(element.result)]
      }
    });
  }
  async actionTestReqForm(item, mode) {
    if (this.router.url == '/eid-view-southsudan' || this.router.url == '/eid-test-result') {
      if (this.router.url == '/eid-test-result' && mode != 'view') {
        mode = 'result edit';
      }
      console.log(item); 
      await this.storage.set('selectedEidTestReq', item);
      this.navToPage = 'add-new-request';
    }
    else if (this.router.url == '/covid19-view-southsudan' || this.router.url == '/view-test-result' || this.router.url == '/enter-test-result') {
      if (this.router.url == '/enter-test-result' && mode != 'view') {
        mode = 'result edit';
      }
      await this.storage.set('selectedCovid19TestReq', item);
      this.navToPage = 'covid19-add-southsudan';
    } 
    else if (this.router.url == '/vl-view-southsudan' || this.router.url == '/enter-vl-result') {
      if (this.router.url == '/enter-vl-result' && mode != 'view') {
        mode = 'result edit';
      }
      console.log(item); 
      await this.storage.set('selectedVlTestReq', item);
      this.navToPage = 'vl-new-request';
    }

    this.router.navigate([ this.navToPage, { data_mode: mode, previuosPageURL: this.router.url.split(';'), }, ]);
  }
  async setPrivilege() {
    console.log(this.router.url, 'this.router.url');
    if (this.router.url == '/covid19-view-southsudan') {
      if (this.privilegeService.canCovidRequestEdit) {
        this.showEdit = true;
      }
      if (this.privilegeService.canCovidRequestView) {
        this.showView = true;
      }
    }
    else if (this.router.url == '/view-test-result') {
      if (this.privilegeService.canCovidResultEnterResultManually) {
        this.showView = true;
      }
    }
     else if (this.router.url == '/enter-test-result') {
      if (this.privilegeService.canCovidResultEnterResultManually) {
        this.showEdit = true;
        this.showView = true;
      }
    } 

    else if (this.router.url == '/eid-view-southsudan') {
      if (this.privilegeService.canEIDRequestEdit) {
        this.showEdit = true;
      } if (this.privilegeService.canEIDRequestView) {
        this.showView = true;
      }
    } 
    else if (this.router.url == '/eid-test-result') {
      if (this.privilegeService.canEIDResultsEnterResultManually) {
        this.showEdit = true;
        this.showView = true;
      }
    } 
    else if (this.router.url == '/vl-view-southsudan') {
      if (this.privilegeService.canVLRequestEdit) {
        this.showEdit = true;
      } if (this.privilegeService.canVLRequestView) {
        this.showView = true;
      }
    } 
    else if (this.router.url == '/enter-vl-result') {
       if (this.privilegeService.canVLRequestEdit) {
        this.showEdit = true;
      } if (this.privilegeService.canVLRequestView) {
        this.showView = true;
      }
    }
  }
  async getOriginalKeyArray(items) {

    if (this.formCondition == 'covid') {
      this.itemsArray = await this.commonservice.covidKeysArray(items);
    } else if (this.formCondition == 'eid') {
      this.itemsArray = await this.commonservice.eidKeysArray(items);
    } else if (this.formCondition == 'vl') {
      this.itemsArray = await this.commonservice.vlKeysArray(items);
    }

  }
  // A request is rejected, has a result, or is waiting for one; the card's stripe and chip show it.
  statusOf(item): 'rejected' | 'result' | 'waiting' {
    if (item.isSampleRejected === 'yes') {
      return 'rejected';
    }
    const result = item.rawResult ?? item.result ?? item.testResult;
    return result !== null && result !== undefined && String(result).trim() !== '' ? 'result' : 'waiting';
  }

  statusLabel(item): string {
    return { rejected: 'Rejected', result: 'Result', waiting: 'Awaiting result' }[this.statusOf(item)];
  }


}
