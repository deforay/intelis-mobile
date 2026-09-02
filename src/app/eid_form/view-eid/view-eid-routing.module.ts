import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewEidPage } from './view-eid.page';

const routes: Routes = [
  {
    path: '',
    component: ViewEidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewEidPageRoutingModule {}
