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
    path: 'new-eid-drc',
    loadChildren: () => import('../app/eid_form/drc/new-eid-drc/new-eid-drc.module').then( m => m.NewEidDrcPageModule)
  },
  {
    path: 'eid-view-drc',
    loadChildren: () => import('../app/eid_form/view-eid/view-eid.module').then( m => m.ViewEidPageModule)
  },
  {
    path: 'enter-result-drc',
    loadChildren: () => import('../app/eid_form/drc/enter-result-drc/enter-result-drc.module').then( m => m.EnterResultDrcPageModule)
  },
  {
    path: 'view-result-drc',
    loadChildren: () => import('../app/eid_form/drc/view-result-drc/view-result-drc.module').then( m => m.ViewResultDrcPageModule)
  },
  {
    path: 'new-vl-drc',
    loadChildren: () => import('../app/vl_form/drc/new-vl-drc/new-vl-drc.module').then( m => m.NewVlDrcPageModule)
  },
  {
    path: 'view-vl-drc',
    loadChildren: () => import('../app/vl_form/view-vl/view-vl.module').then( m => m.ViewVlPageModule)
  },
  {
    path: 'vl-result-drc',
    loadChildren: () => import('../app/vl_form/drc/vl-result-drc/vl-result-drc.module').then( m => m.VlResultDrcPageModule)
  },
  {
    path: 'view-vl-result-drc',
    loadChildren: () => import('../app/vl_form/drc/view-vl-result-drc/view-vl-result-drc.module').then( m => m.ViewVlResultDrcPageModule)
  },
  {
    path: 'mohdrc-add-new-request',
    loadChildren: () => import('../app/covid-19_form/mohdrc/drc-add-new-request/drc-add-new-request.module').then( m => m.DRCAddNewRequestPageModule)
  },
  {
    path: 'mohdrc-view-test-request',
    loadChildren: () => import('../app/covid-19_form/view-covid/view-covid.module').then( m => m.ViewCovidPageModule)
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
    path: 'mohdrc-enter-test-result',
    loadChildren: () => import('./covid-19_form/mohdrc/mohdrc-enter-test-result/mohdrc-enter-test-result.module').then( m => m.MohdrcEnterTestResultPageModule)
  },
  {
    path: 'mohdrc-view-test-result',
    loadChildren: () => import('./covid-19_form/mohdrc/mohdrc-view-test-result/mohdrc-view-test-result.module').then( m => m.MohdrcViewTestResultPageModule)
  },
  {
    path: 'mohdrc-select-patient-details',
    loadChildren: () => import('./covid-19_form/mohdrc/mohdrc-select-patient-details/mohdrc-select-patient-details.module').then( m => m.MohdrcSelectPatientDetailsPageModule)
  },
  {
    path: 'select-patient-details-drc',
    loadChildren: () => import('./eid_form/drc/select-patient-details-drc/select-patient-details-drc.module').then( m => m.SelectPatientDetailsDrcPageModule)
  },
  {
    path: 'vl-select-patient-details',
    loadChildren: () => import('./vl_form/drc/vl-select-patient-details/vl-select-patient-details.module').then( m => m.VlSelectPatientDetailsPageModule)
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
