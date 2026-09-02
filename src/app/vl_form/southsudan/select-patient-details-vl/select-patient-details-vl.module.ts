import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonCol, IonContent, IonGrid, IonRow, IonSearchbar } from '@ionic/angular';

import { SelectPatientDetailsVlPageRoutingModule } from './select-patient-details-vl-routing.module';

import { SelectPatientDetailsVlPage } from './select-patient-details-vl.page';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonCol, IonContent, IonGrid, IonRow, IonSearchbar,
    MaterialModule,
    SharedModule,
    SelectPatientDetailsVlPageRoutingModule
  ],
  declarations: [SelectPatientDetailsVlPage]
})
export class SelectPatientDetailsVlPageModule {}
