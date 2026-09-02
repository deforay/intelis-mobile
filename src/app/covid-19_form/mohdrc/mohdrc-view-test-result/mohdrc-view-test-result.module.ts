import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MohdrcViewTestResultPageRoutingModule } from './mohdrc-view-test-result-routing.module';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from '../../../moment.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { MohdrcViewTestResultPage } from './mohdrc-view-test-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    MomentModule,
    NgxPaginationModule, SharedModule,
    MohdrcViewTestResultPageRoutingModule
  ],
  declarations: [MohdrcViewTestResultPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MohdrcViewTestResultPageModule {}
