import { VlViewResultPageRoutingModule } from './vl-view-result-routing.module';
import { VlViewResultPage } from './vl-view-result.page';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from '../../../moment.module';
import { NgxPaginationModule } from 'ngx-pagination';
// import { JwPaginationComponent } from '../../../component/jw-pagination/jw-pagination.component';
import { SharedModule } from 'src/app/shared/shared.module';
// import { SortingPopoverComponent } from 'src/app/component/sorting-popover/sorting-popover.component';

@NgModule({
  imports: [
    VlViewResultPageRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    MomentModule,
    NgxPaginationModule,
    SharedModule,
  ],
  declarations: [VlViewResultPage, 
    // JwPaginationComponent, SortingPopoverComponent
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    // JwPaginationComponent
  ]
})
export class VlViewResultPageModule {}
