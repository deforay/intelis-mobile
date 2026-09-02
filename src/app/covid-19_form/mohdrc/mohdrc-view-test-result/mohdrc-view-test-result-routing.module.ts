import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MohdrcViewTestResultPage } from './mohdrc-view-test-result.page';

const routes: Routes = [
  {
    path: '',
    component: MohdrcViewTestResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MohdrcViewTestResultPageRoutingModule {}
