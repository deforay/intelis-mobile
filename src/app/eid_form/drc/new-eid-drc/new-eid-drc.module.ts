import { NewEidDrcPageRoutingModule } from './new-eid-drc-routing.module';

import { NewEidDrcPage } from './new-eid-drc.page';

import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonIcon, IonMenuButton, IonRow, IonSearchbar } from '@ionic/angular';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from '../../../moment.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonCol, IonContent, IonGrid, IonIcon, IonMenuButton, IonRow, IonSearchbar,
    NewEidDrcPageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [NewEidDrcPage]
})
export class NewEidDrcPageModule {}
