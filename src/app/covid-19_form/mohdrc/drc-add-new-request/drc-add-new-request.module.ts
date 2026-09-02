import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DRCAddNewRequestPageRoutingModule } from './drc-add-new-request-routing.module';
import { DRCAddNewRequestPage } from './drc-add-new-request.page';
import { MaterialModule } from 'src/app/material.module';
import { MomentModule } from 'src/app/moment.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    DRCAddNewRequestPage,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    DRCAddNewRequestPageRoutingModule,
     MatInputModule,
     CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    MomentModule,
    MatSelectModule,
    SharedModule
  ],
})
export class DRCAddNewRequestPageModule {}
