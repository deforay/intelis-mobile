import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewVlResultDrcPage } from './view-vl-result-drc.page';

const routes: Routes = [
  {
    path: '',
    component: ViewVlResultDrcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewVlResultDrcPageRoutingModule {}
