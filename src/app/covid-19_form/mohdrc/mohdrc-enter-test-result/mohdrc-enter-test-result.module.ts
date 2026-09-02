import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MohdrcEnterTestResultPageRoutingModule } from './mohdrc-enter-test-result-routing.module';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from '../../../moment.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
import { MohdrcEnterTestResultPage } from './mohdrc-enter-test-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    MomentModule,
    Ng2SearchPipeModule,
    NgxPaginationModule, SharedModule,
    MohdrcEnterTestResultPageRoutingModule
  ],
  declarations: [MohdrcEnterTestResultPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MohdrcEnterTestResultPageModule {}
