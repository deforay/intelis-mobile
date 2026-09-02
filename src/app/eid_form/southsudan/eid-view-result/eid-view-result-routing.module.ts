import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EidViewResultPage } from './eid-view-result.page';

const routes: Routes = [
  {
    path: '',
    component: EidViewResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EidViewResultPageRoutingModule {}
