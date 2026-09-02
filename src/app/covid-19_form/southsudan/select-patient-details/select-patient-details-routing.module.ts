import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectPatientDetailsPage } from './select-patient-details.page';

const routes: Routes = [
  {
    path: '',
    component: SelectPatientDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectPatientDetailsPageRoutingModule {}
