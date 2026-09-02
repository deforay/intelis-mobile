import { ViewCovidPageRoutingModule } from './view-covid-routing.module';
import { ViewCovidPage } from './view-covid.page';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material.module';
import { MomentModule } from 'src/app/moment.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewCovidPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MomentModule,
    NgxPaginationModule,
    SharedModule,
  ],
  declarations: [ViewCovidPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewCovidPageModule {}
