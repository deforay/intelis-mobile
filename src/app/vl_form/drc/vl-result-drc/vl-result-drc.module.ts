import { VlResultDrcPageRoutingModule } from './vl-result-drc-routing.module';
import { VlResultDrcPage } from './vl-result-drc.page';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonMenuButton, IonRow, IonSearchbar, IonSkeletonText } from '@ionic/angular';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from '../../../moment.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
// import { JwPaginationComponent } from 'src/app/component/jw-pagination/jw-pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonCol, IonContent, IonGrid, IonMenuButton, IonRow, IonSearchbar, IonSkeletonText,
    VlResultDrcPageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,    
    NgxPaginationModule, SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [VlResultDrcPage,
    // JwPaginationComponent
  ]
})
export class VlResultDrcPageModule {}
