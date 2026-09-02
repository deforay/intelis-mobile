import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewResultDrcPage } from './view-result-drc.page';

const routes: Routes = [
  {
    path: '',
    component: ViewResultDrcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewResultDrcPageRoutingModule {}
