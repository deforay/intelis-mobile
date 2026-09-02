import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MohdrcEnterTestResultPage } from './mohdrc-enter-test-result.page';

const routes: Routes = [
  {
    path: '',
    component: MohdrcEnterTestResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MohdrcEnterTestResultPageRoutingModule {}
