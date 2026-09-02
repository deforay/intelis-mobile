import { ViewEidPageRoutingModule } from './view-eid-routing.module';
import { ViewEidPage } from './view-eid.page';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material.module';
import { MomentModule } from '../../moment.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewEidPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MomentModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    SharedModule
  ],
  declarations: [ViewEidPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewEidPageModule {}
