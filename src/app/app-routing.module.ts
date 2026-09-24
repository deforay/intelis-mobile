import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'covid19-add-southsudan',
    loadChildren: () => import('../app/covid-19_form/southsudan/add_new_request/covid19-add-southsudan.module').then( m => m.Covid19AddSouthsudanPageModule)
  },
  {
    path: 'select-patient-details',
    loadChildren: () => import('../app/covid-19_form/southsudan/select-patient-details/select-patient-details.module').then( m => m.SelectPatientDetailsPageModule)
  },
  {
    path: 'covid19-view-southsudan',
    loadChildren: () => import('../app/covid-19_form/view-covid/view-covid.module').then( m => m.ViewCovidPageModule)
  },
  {
    path: 'setup',
    loadChildren: () => import('./setup/setup.module').then( m => m.SetupPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'enter-test-result',
    loadChildren: () => import('../app/covid-19_form/southsudan/enter-test-result/enter-test-result.module').then( m => m.EnterTestResultPageModule)
  },
  {
    path: 'view-test-result',
    loadChildren: () => import('../app/covid-19_form/southsudan/view-test-result/view-test-result.module').then( m => m.ViewTestResultPageModule)
  },
  {
    path: 'add-new-request',
    loadChildren: () => import('../app/eid_form/southsudan/add-new-request/add-new-request.module').then( m => m.AddNewRequestPageModule)
  },
  {
    path: 'eid-view-southsudan',
    loadChildren: () => import('../app/eid_form/view-eid/view-eid.module').then( m => m.ViewEidPageModule)
  },
  {
    path: 'vl-new-request',
    loadChildren: () => import('../app/vl_form/southsudan/vl-new-request/vl-new-request.module').then( m => m.VlNewRequestPageModule)
  },
  {
    path: 'vl-view-southsudan',
    loadChildren: () => import('../app/vl_form/view-vl/view-vl.module').then( m => m.ViewVlPageModule)
  },
  {
    path: 'eid-test-result',
    loadChildren: () => import('../app/eid_form/southsudan/eid-test-result/eid-test-result.module').then( m => m.EidTestResultPageModule)
  },
  {
    path: 'enter-vl-result',
    loadChildren: () => import('../app/vl_form/southsudan/enter-vl-result/enter-vl-result.module').then( m => m.EnterVlResultPageModule)
  },
  {
    path: 'app-password',
    loadChildren: () => import('./app-password/app-password.module').then( m => m.AppPasswordPageModule)
  },
  {
    path: 'enter-app-password',
    loadChildren: () => import('./enter-app-password/enter-app-password.module').then( m => m.EnterAppPasswordPageModule)
  },
  {
    path: 'synctimeline',
    loadChildren: () => import('./syncTimeline/synctimeline.module').then( m => m.SynctimelinePageModule)
  },
  {
    path: 'eid-view-result',
    loadChildren: () => import('../app/eid_form/southsudan/eid-view-result/eid-view-result.module').then( m => m.EidViewResultPageModule)
  },
  {
    path: 'vl-view-result',
    loadChildren: () => import('../app/vl_form/southsudan/vl-view-result/vl-view-result.module').then( m => m.VlViewResultPageModule)
  },
  {
    path: 'view-vl',
    loadChildren: () => import('../app/vl_form/view-vl/view-vl.module').then( m => m.ViewVlPageModule)
  },
  {
    path: 'view-eid',
    loadChildren: () => import('../app/eid_form/view-eid/view-eid.module').then( m => m.ViewEidPageModule)
  },
  {
    path: 'view-covid',
    loadChildren: () => import('../app/covid-19_form/view-covid/view-covid.module').then( m => m.ViewCovidPageModule)
  },
  {
    path: 'eid-select-patient-details',
    loadChildren: () => import('./eid_form/southsudan/eid-select-patient-details/eid-select-patient-details.module').then( m => m.EidSelectPatientDetailsPageModule)
  },
  {
    path: 'select-patient-details-vl',
    loadChildren: () => import('./vl_form/southsudan/select-patient-details-vl/select-patient-details-vl.module').then( m => m.SelectPatientDetailsVlPageModule)
  },
  
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
