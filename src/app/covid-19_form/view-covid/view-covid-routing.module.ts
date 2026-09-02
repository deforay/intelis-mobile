import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCovidPage } from './view-covid.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCovidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCovidPageRoutingModule {}
