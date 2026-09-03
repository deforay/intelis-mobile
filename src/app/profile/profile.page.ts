import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import {SyncTestRequestsService,
  AlertService,
} from '../../app/service/providers';
import {Storage} from '@ionic/storage-angular';
import { CrudOperationsService } from '../service/crud/crud-operations.service';
@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ProfilePage implements OnInit {

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', []),
    email: new FormControl('', [Validators.email]),
    phoneNo: new FormControl('', []),
  })
  testingLabsListArray:any=[];
  isDisabled: boolean = false;
  isSaving = false;
  private loginDetails: any;

  constructor(private storage: Storage,public SyncReq: SyncTestRequestsService,
    public alertService: AlertService,
    private CrudService: CrudOperationsService,
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

  /**
   * Save name, email and phone through the v2 profile endpoint (InteLIS 5.7.51+).
   * The user's own token may edit only its own profile; role and login id are not sent.
   */
  async saveProfile() {
    if (this.profileForm.invalid || !this.loginDetails) {
      this.alertService.alertWithSingleButton('Alert', 'OK', 'Enter a name, and a valid email address if you add one.', '');
      return;
    }
    const v = this.profileForm.value;
    const body = {
      profile: {
        userId: String(this.loginDetails.user.user_id),
        userName: (v.name || '').trim(),
        email: (v.email || '').trim(),
        phoneNo: (v.phoneNo || '').trim(),
      },
    };
    this.isSaving = true;
    try {
      const res: any = await this.CrudService.postDataWithLoader('/api/v2/user/profile', body, this.loginDetails.api_token, false);
      if (res && res.status === 'success') {
        this.loginDetails.user.user_name = body.profile.userName;
        this.loginDetails.user.email = body.profile.email;
        this.loginDetails.user.phone_number = body.profile.phoneNo;
        await this.storage.set('loginDetails', this.loginDetails);
        this.alertService.alertWithSingleButton('Profile', 'OK', 'Profile saved.', '');
      } else {
        this.alertService.alertWithSingleButton('Alert', 'OK', (res && res.error && res.error.message) || 'The server did not accept the profile.', '');
      }
    } catch (err: any) {
      const msg = (err && err.serverMessage)
        || (err && err.status === 404 ? 'This server does not support profile updates yet. Ask your administrator to update InteLIS.'
                                      : 'Could not save the profile. Check your connection and try again.');
      this.alertService.alertWithSingleButton('Alert', 'OK', msg, '');
    } finally {
      this.isSaving = false;
    }
  }

  syncall(param){
    this.isDisabled = true;
    if (param == 'syncall') {
      this.SyncReq.syncReceiveTestRequest('syncall');
      // this.menu.toggle();
    }

  }

}
