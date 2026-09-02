import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewVlDrcPage } from './new-vl-drc.page';

const routes: Routes = [
  {
    path: '',
    component: NewVlDrcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewVlDrcPageRoutingModule {}
