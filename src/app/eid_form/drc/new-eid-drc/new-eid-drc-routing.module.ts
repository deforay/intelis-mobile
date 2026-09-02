import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewEidDrcPage } from './new-eid-drc.page';

const routes: Routes = [
  {
    path: '',
    component: NewEidDrcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewEidDrcPageRoutingModule {}
