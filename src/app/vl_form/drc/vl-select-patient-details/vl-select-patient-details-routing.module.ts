import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VlSelectPatientDetailsPage } from './vl-select-patient-details.page';

const routes: Routes = [
  {
    path: '',
    component: VlSelectPatientDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VlSelectPatientDetailsPageRoutingModule {}
