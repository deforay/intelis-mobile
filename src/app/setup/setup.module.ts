import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonSpinner } from '@ionic/angular';
import { SetupPage } from './setup.page';

const routes: Routes = [{ path: '', component: SetupPage }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonSpinner],
  declarations: [SetupPage],
})
export class SetupPageModule {}
