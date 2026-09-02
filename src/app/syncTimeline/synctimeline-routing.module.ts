import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SynctimelinePage } from './synctimeline.page';

const routes: Routes = [
  {
    path: '',
    component: SynctimelinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SynctimelinePageRoutingModule {}
