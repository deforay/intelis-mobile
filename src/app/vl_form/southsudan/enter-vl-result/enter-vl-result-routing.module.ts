import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterVlResultPage } from './enter-vl-result.page';

const routes: Routes = [
  {
    path: '',
    component: EnterVlResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterVlResultPageRoutingModule {}
