import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SynctimelinePageRoutingModule } from './synctimeline-routing.module';

import { SynctimelinePage } from './synctimeline.page';
import { MaterialModule } from '../material.module';
import { MomentModule } from '../moment.module';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    SynctimelinePageRoutingModule,
     CommonModule,
    FormsModule,
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,MatTableModule
  ],
  declarations: [SynctimelinePage]
})
export class SynctimelinePageModule {}
