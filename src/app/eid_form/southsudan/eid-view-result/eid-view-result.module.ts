import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonMenuButton, IonRow, IonSkeletonText } from '@ionic/angular';
import { EidViewResultPageRoutingModule } from './eid-view-result-routing.module';
import { EidViewResultPage } from './eid-view-result.page';

import { MaterialModule } from '../../../material.module';
import { MomentModule } from '../../../moment.module';
import { NgxPaginationModule } from 'ngx-pagination';
// import { JwPaginationComponent } from '../../../component/jw-pagination/jw-pagination.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import { SortingPopoverComponent } from 'src/app/component/sorting-popover/sorting-popover.component';

@NgModule({
  imports: [
    EidViewResultPageRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonCol, IonContent, IonGrid, IonMenuButton, IonRow, IonSkeletonText,
    MaterialModule,
    MomentModule,
    NgxPaginationModule,
    SharedModule,
    // JwPaginationComponent
  ],
  declarations: [EidViewResultPage, 
    // JwPaginationComponent, SortingPopoverComponent
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    // JwPaginationComponent
  ]
})
export class EidViewResultPageModule {}
