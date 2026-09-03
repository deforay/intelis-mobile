import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortingPopoverComponent } from '../component/sorting-popover/sorting-popover.component';
import { JwPaginationComponent } from '../component/jw-pagination/jw-pagination.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { IonButton, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/angular';

@NgModule({
  declarations: [SortingPopoverComponent, JwPaginationComponent],
  imports: [IonButton, IonCol, IonGrid, IonIcon, IonItem, IonLabel, IonList, IonRow, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, CommonModule,NgxPaginationModule],
  exports: [SortingPopoverComponent,JwPaginationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
