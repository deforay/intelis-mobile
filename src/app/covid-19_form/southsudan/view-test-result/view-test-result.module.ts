import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewTestResultPageRoutingModule } from './view-test-result-routing.module';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from '../../../moment.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ViewTestResultPage } from './view-test-result.page';
import { NgxPaginationModule } from 'ngx-pagination';
// import { JwPaginationComponent } from '../../../component/jw-pagination/jw-pagination.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import { SortingPopoverComponent } from 'src/app/component/sorting-popover/sorting-popover.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    MomentModule,
    Ng2SearchPipeModule,
    ViewTestResultPageRoutingModule,
    NgxPaginationModule, SharedModule,
  ],
  declarations: [ViewTestResultPage,
    // JwPaginationComponent,
    // SortingPopoverComponent
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    // JwPaginationComponent
  ]
})
export class ViewTestResultPageModule {}
