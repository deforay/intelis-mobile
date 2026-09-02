import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EidTestResultPageRoutingModule } from './eid-test-result-routing.module';
import { EidTestResultPage } from './eid-test-result.page';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from '../../../moment.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
// import { JwPaginationComponent } from 'src/app/component/jw-pagination/jw-pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    MomentModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    EidTestResultPageRoutingModule,
    SharedModule
  ],
  declarations: [EidTestResultPage,
    // JwPaginationComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EidTestResultPageModule {}
