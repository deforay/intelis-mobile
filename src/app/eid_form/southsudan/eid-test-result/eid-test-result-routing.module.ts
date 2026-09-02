import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EidTestResultPage } from './eid-test-result.page';

const routes: Routes = [
  {
    path: '',
    component: EidTestResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EidTestResultPageRoutingModule {}
