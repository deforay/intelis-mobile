import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonRow, IonSearchbar, IonToggle } from '@ionic/angular';
import { Covid19AddSouthsudanPageRoutingModule } from './covid19-add-southsudan-routing.module';
import { Covid19AddSouthsudanPage } from './covid19-add-southsudan.page';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from '../../../moment.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    Covid19AddSouthsudanPage,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonCol, IonContent, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonRow, IonSearchbar, IonToggle,
    MaterialModule,
    MomentModule,
    Covid19AddSouthsudanPageRoutingModule, SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Covid19AddSouthsudanPageModule {}
