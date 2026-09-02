import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-synctimeline',
    templateUrl: './synctimeline.page.html',
    styleUrls: ['./synctimeline.page.scss'],
    standalone: false
})
export class SynctimelinePage implements OnInit {
syncTimelineArray:any=[];
  constructor(private storage:Storage,private modalController:ModalController) { }

  ngOnInit() {
    this.storage.get('syncTimeline').then((data) => {
      if (data) {
        this.syncTimelineArray=data;
        this.syncTimelineArray.reverse();
      }
    });
  }
back(){
       this.modalController.dismiss(close);

}
}
