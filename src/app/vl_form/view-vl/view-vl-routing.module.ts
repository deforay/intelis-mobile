import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewVlPage } from './view-vl.page';

const routes: Routes = [
  {
    path: '',
    component: ViewVlPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewVlPageRoutingModule {}
