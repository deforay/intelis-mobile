import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';
import {SyncTestRequestsService,
  AlertService,
} from '../../app/service/providers';
import {Storage} from '@ionic/storage-angular';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
    standalone: false
})
export class ProfilePage implements OnInit {

  profileForm = new FormGroup({
    name: new FormControl('', []), 
    role: new FormControl('', []),
    email: new FormControl('', []),
    phoneNo: new FormControl('', []),
  })
  testingLabsListArray:any=[];
  isDisabled: boolean = false;

  constructor(private storage: Storage,public SyncReq: SyncTestRequestsService,
    public alertService: AlertService,
    ) {
    console.log(this.isDisabled,'boolean = false;');
   }
  async ionViewWillEnter() {
    await this.storage.create();

    await this.storage.get('loginDetails').then(async (loginDetails) => {
      if (loginDetails) {
        console.log(loginDetails,'logindetails')
        this.profileForm.get('name').setValue(loginDetails['user'].user_name);
        this.profileForm.get('role').setValue(loginDetails['user'].role_name);
        this.profileForm.get('email').setValue(loginDetails['user'].email); 
        this.profileForm.get('phoneNo').setValue(loginDetails['user'].phone_number);
      }
    })
    let initArray = await this.storage.get("initArray");
    this.testingLabsListArray = initArray.testingLabsList;
  }

  ngOnInit() {
  }

  syncall(param){
    this.isDisabled = true;
    if (param == 'syncall') {
      this.SyncReq.syncReceiveTestRequest('syncall');
      // this.menu.toggle();
    }

  }

}
