import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPatientDetailsVlPageRoutingModule } from './select-patient-details-vl-routing.module';

import { SelectPatientDetailsVlPage } from './select-patient-details-vl.page';
import { MaterialModule } from '../../../material.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    Ng2SearchPipeModule,
    SharedModule,
    SelectPatientDetailsVlPageRoutingModule
  ],
  declarations: [SelectPatientDetailsVlPage]
})
export class SelectPatientDetailsVlPageModule {}
