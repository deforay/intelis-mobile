import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MohdrcSelectPatientDetailsPageRoutingModule } from './mohdrc-select-patient-details-routing.module';

import { MohdrcSelectPatientDetailsPage } from './mohdrc-select-patient-details.page';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    SharedModule,
    MohdrcSelectPatientDetailsPageRoutingModule
  ],
  declarations: [MohdrcSelectPatientDetailsPage]
})
export class MohdrcSelectPatientDetailsPageModule {}
