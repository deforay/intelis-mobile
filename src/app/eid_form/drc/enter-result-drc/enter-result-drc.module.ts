import { EnterResultDrcPageRoutingModule } from './enter-result-drc-routing.module';
import { EnterResultDrcPage } from './enter-result-drc.page';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../../../material.module';
import { MomentModule } from '../../../moment.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared/shared.module';
// import { JwPaginationComponent } from 'src/app/component/jw-pagination/jw-pagination.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnterResultDrcPageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    MomentModule,
    NgxPaginationModule, SharedModule
  ],
  declarations: [EnterResultDrcPage,
    // JwPaginationComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnterResultDrcPageModule {}
