import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Covid19AddSouthsudanPage } from './covid19-add-southsudan.page';
const routes: Routes = [
  {
    path: '',
    component: Covid19AddSouthsudanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Covid19AddSouthsudanPageRoutingModule {}
