import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectPatientDetailsVlPage } from './select-patient-details-vl.page';

const routes: Routes = [
  {
    path: '',
    component: SelectPatientDetailsVlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectPatientDetailsVlPageRoutingModule {}
