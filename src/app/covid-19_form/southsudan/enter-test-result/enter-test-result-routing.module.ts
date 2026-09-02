import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterTestResultPage } from './enter-test-result.page';

const routes: Routes = [
  {
    path: '',
    component: EnterTestResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterTestResultPageRoutingModule {}
