import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EidSelectPatientDetailsPage } from './eid-select-patient-details.page';

const routes: Routes = [
  {
    path: '',
    component: EidSelectPatientDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EidSelectPatientDetailsPageRoutingModule {}
