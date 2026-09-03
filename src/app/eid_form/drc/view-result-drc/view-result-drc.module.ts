import { ViewResultDrcPageRoutingModule } from './view-result-drc-routing.module';
import { ViewResultDrcPage } from './view-result-drc.page';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonMenuButton, IonRow, IonSkeletonText } from '@ionic/angular';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from '../../../moment.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
// import { JwPaginationComponent } from 'src/app/component/jw-pagination/jw-pagination.component';
// import { SortingPopoverComponent } from 'src/app/component/sorting-popover/sorting-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonCol, IonContent, IonGrid, IonMenuButton, IonRow, IonSkeletonText,
    ViewResultDrcPageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
    NgxPaginationModule, SharedModule
  ],
  declarations: [ViewResultDrcPage,
    // JwPaginationComponent, SortingPopoverComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ViewResultDrcPageModule {}
