import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VlNewRequestPage } from './vl-new-request.page';

const routes: Routes = [
  {
    path: '',
    component: VlNewRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VlNewRequestPageRoutingModule {}
