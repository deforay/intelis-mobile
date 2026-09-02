import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonMenuButton, IonRow, IonSearchbar, IonSkeletonText } from '@ionic/angular';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from '../../../moment.module';
import { EnterVlResultPageRoutingModule } from './enter-vl-result-routing.module';
import { EnterVlResultPage } from './enter-vl-result.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
// import { JwPaginationComponent } from 'src/app/component/jw-pagination/jw-pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonCol, IonContent, IonGrid, IonMenuButton, IonRow, IonSearchbar, IonSkeletonText,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,    
    NgxPaginationModule,
    EnterVlResultPageRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [EnterVlResultPage, 
    // JwPaginationComponent
    ]
})
export class EnterVlResultPageModule {}
