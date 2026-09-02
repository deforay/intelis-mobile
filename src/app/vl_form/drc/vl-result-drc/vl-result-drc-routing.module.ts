import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VlResultDrcPage } from './vl-result-drc.page';

const routes: Routes = [
  {
    path: '',
    component: VlResultDrcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VlResultDrcPageRoutingModule {}
