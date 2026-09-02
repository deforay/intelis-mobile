import { NewVlDrcPageRoutingModule } from './new-vl-drc-routing.module';
import { NewVlDrcPage } from './new-vl-drc.page';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MomentModule } from '../../../moment.module';
import { MaterialModule } from '../../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewVlDrcPageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
  ],schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [NewVlDrcPage]
})
export class NewVlDrcPageModule {}
