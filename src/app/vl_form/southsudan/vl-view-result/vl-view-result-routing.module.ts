import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VlViewResultPage } from './vl-view-result.page';

const routes: Routes = [
  {
    path: '',
    component: VlViewResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VlViewResultPageRoutingModule {}
