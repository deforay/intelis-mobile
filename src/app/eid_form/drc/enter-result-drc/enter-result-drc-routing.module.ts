import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterResultDrcPage } from './enter-result-drc.page';

const routes: Routes = [
  {
    path: '',
    component: EnterResultDrcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterResultDrcPageRoutingModule {}
