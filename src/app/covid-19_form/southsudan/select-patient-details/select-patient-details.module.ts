import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPatientDetailsPageRoutingModule } from './select-patient-details-routing.module';

import { SelectPatientDetailsPage } from './select-patient-details.page';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    SelectPatientDetailsPageRoutingModule, SharedModule
  ],
  declarations: [SelectPatientDetailsPage]
})
export class SelectPatientDetailsPageModule {}
