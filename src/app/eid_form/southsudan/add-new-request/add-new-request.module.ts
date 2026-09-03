
import { AddNewRequestPageRoutingModule } from './add-new-request-routing.module';
import { AddNewRequestPage } from './add-new-request.page';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonCol, IonContent, IonGrid, IonIcon, IonMenuButton, IonRow, IonSearchbar } from '@ionic/angular';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from '../../../moment.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonCol, IonContent, IonGrid, IonIcon, IonMenuButton, IonRow, IonSearchbar,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
    AddNewRequestPageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AddNewRequestPage]
})
export class AddNewRequestPageModule {}
