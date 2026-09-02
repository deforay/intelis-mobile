import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonMenuButton, IonRow, IonSkeletonText } from '@ionic/angular';
import { ViewVlResultDrcPageRoutingModule } from './view-vl-result-drc-routing.module';
import { ViewVlResultDrcPage } from './view-vl-result-drc.page';
import { MomentModule } from '../../../moment.module';
import { MaterialModule } from '../../../material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonCol, IonContent, IonGrid, IonMenuButton, IonRow, IonSkeletonText,
    ViewVlResultDrcPageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
    NgxPaginationModule, SharedModule
  ],
  declarations: [ViewVlResultDrcPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    // JwPaginationComponent
  ]
})
export class ViewVlResultDrcPageModule {}
