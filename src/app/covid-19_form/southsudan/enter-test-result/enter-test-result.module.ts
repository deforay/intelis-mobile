import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonCol, IonContent, IonGrid, IonMenuButton, IonRow, IonSearchbar, IonSkeletonText } from '@ionic/angular';

import { EnterTestResultPageRoutingModule } from './enter-test-result-routing.module';

import { EnterTestResultPage } from './enter-test-result.page';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from '../../../moment.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
// import { JwPaginationComponent } from 'src/app/component/jw-pagination/jw-pagination.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonCol, IonContent, IonGrid, IonMenuButton, IonRow, IonSearchbar, IonSkeletonText,
    MaterialModule,
    MomentModule,
    EnterTestResultPageRoutingModule,
    NgxPaginationModule, SharedModule
  ],
  declarations: [EnterTestResultPage,
    // JwPaginationComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnterTestResultPageModule {}
