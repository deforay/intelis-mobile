import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DRCAddNewRequestPage } from './drc-add-new-request.page';

const routes: Routes = [
  {
    path: '',
    component: DRCAddNewRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DRCAddNewRequestPageRoutingModule {}
