import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectPatientDetailsDrcPage } from './select-patient-details-drc.page';

const routes: Routes = [
  {
    path: '',
    component: SelectPatientDetailsDrcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectPatientDetailsDrcPageRoutingModule {}
