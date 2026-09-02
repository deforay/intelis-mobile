import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewTestResultPage } from './view-test-result.page';

const routes: Routes = [
  {
    path: '',
    component: ViewTestResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewTestResultPageRoutingModule {}
