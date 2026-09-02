import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VlNewRequestPageRoutingModule } from './vl-new-request-routing.module';
import { VlNewRequestPage } from './vl-new-request.page';
import { MomentModule } from '../../../moment.module';
import { MaterialModule } from '../../../material.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VlNewRequestPageRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [VlNewRequestPage]
})
export class VlNewRequestPageModule {}
