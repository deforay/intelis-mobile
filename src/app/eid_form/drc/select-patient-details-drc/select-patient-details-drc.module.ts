import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPatientDetailsDrcPageRoutingModule } from './select-patient-details-drc-routing.module';

import { SelectPatientDetailsDrcPage } from './select-patient-details-drc.page';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    SharedModule,
    SelectPatientDetailsDrcPageRoutingModule
  ],
  declarations: [SelectPatientDetailsDrcPage]
})
export class SelectPatientDetailsDrcPageModule {}
