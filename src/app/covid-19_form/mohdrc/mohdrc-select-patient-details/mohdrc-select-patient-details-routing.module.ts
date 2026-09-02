import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MohdrcSelectPatientDetailsPage } from './mohdrc-select-patient-details.page';

const routes: Routes = [
  {
    path: '',
    component: MohdrcSelectPatientDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MohdrcSelectPatientDetailsPageRoutingModule {}
