import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EidSelectPatientDetailsPageRoutingModule } from './eid-select-patient-details-routing.module';

import { EidSelectPatientDetailsPage } from './eid-select-patient-details.page';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    SharedModule,
    EidSelectPatientDetailsPageRoutingModule
  ],
  declarations: [EidSelectPatientDetailsPage]
})
export class EidSelectPatientDetailsPageModule {}
