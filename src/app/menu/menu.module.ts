import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonContent, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonTitle, IonToolbar, IonRouterLink, IonRouterLinkWithHref } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent, IonFooter, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonTitle, IonToolbar, IonRouterLink, IonRouterLinkWithHref,
    MaterialModule,
    MenuPageRoutingModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
