import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewRequestPage } from './add-new-request.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewRequestPageRoutingModule {}
