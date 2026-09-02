import {
  Injectable
} from '@angular/core';
import {
  Network
} from '@awesome-cordova-plugins/network/ngx';
import {
   Events
 } from '../../../app/service/providers';
import {
  Storage
} from '@ionic/storage';
// import {
//   ToastService,
//   AlertService
// } from '../../app/service/providers';
@Injectable({
  providedIn: 'root'
})

export class NetworkService {

  eventOnline: boolean = false;
  eventOffline: boolean = false;
  constructor(
    public network: Network,
    private storage: Storage,
    public eventCtrl: Events,
  //  public ToastService: ToastService,
  //  public alertService: AlertService,
  ) {}

  public getNetworkType() {
    return this.network.type;
  }

  public initializeNetworkEvents(): void {

    this.network.onDisconnect().subscribe(() => {
      alert("service offline")
      this.eventOffline = true;
      this.storage.set('networkConnectivity', false);
      this.eventCtrl.publish('network:offline');
    })


    this.network.onConnect().subscribe(() => {
      alert("service offline")
      this.storage.set('networkConnectivity', true);
      this.eventOnline = true;
      this.eventCtrl.publish('network:online');
    });

  }
}