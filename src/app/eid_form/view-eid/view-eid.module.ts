import { ViewEidPageRoutingModule } from './view-eid-routing.module';
import { ViewEidPage } from './view-eid.page';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonMenuButton, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSkeletonText } from '@ionic/angular';
import { MaterialModule } from 'src/app/material.module';
import { MomentModule } from '../../moment.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonCol, IonContent, IonGrid, IonMenuButton, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSkeletonText,
    ViewEidPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MomentModule,
    NgxPaginationModule,
    SharedModule
  ],
  declarations: [ViewEidPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewEidPageModule {}
