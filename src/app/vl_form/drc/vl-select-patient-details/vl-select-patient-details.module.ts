import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VlSelectPatientDetailsPageRoutingModule } from './vl-select-patient-details-routing.module';

import { VlSelectPatientDetailsPage } from './vl-select-patient-details.page';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    SharedModule,
    VlSelectPatientDetailsPageRoutingModule
  ],
  declarations: [VlSelectPatientDetailsPage]
})
export class VlSelectPatientDetailsPageModule {}
