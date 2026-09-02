import { CommonModule } from '@angular/common';

import { ViewVlPageRoutingModule } from './view-vl-routing.module';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../material.module';
import { MomentModule } from '../../moment.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

import { ViewVlPage } from './view-vl.page';

@NgModule({
  imports: [
    ViewVlPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    MomentModule,
    NgxPaginationModule,
    SharedModule

  ],
  declarations: [ViewVlPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewVlPageModule {}
