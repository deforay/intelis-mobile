import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  RouteReuseStrategy
} from '@angular/router';
import {
  AppComponent
} from './app.component';
import {
  AppRoutingModule
} from './app-routing.module';
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
  MaterialModule
} from './material.module';
import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {
  AppVersion
} from '@awesome-cordova-plugins/app-version/ngx';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {
  IonicStorageModule
} from '@ionic/storage-angular';
import {
  SplashScreen
} from '@awesome-cordova-plugins/splash-screen/ngx';
import {
  StatusBar
} from '@awesome-cordova-plugins/status-bar/ngx';
import {
  MomentModule
} from '../../src/app/moment.module';
import {
  Network
} from '@awesome-cordova-plugins/network/ngx';
import { NetworkService} from '../app/service/network/network.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { JwPaginationComponent } from './component/jw-pagination/jw-pagination.component';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { IonApp, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonMenu, IonRouterOutlet, IonRow, IonSplitPane, IonTitle, IonToolbar, IonRouterLink, IonRouterLinkWithHref, IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';

import {
  MatIconModule
} from '@angular/material/icon';
@NgModule( { declarations: [AppComponent],
    exports: [MatFormFieldModule, MatInputModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent], imports: [NgxPaginationModule,
        BrowserModule,
        MaterialModule,
        IonApp, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonMenu, IonRouterOutlet, IonRow, IonSplitPane, IonTitle, IonToolbar, IonRouterLink, IonRouterLinkWithHref,
        IonicStorageModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule, MatSelectModule, MatIconModule], providers: [provideIonicAngular(), 
        Device,
        AppVersion,
        StatusBar,
        SplashScreen,
        MomentModule,
        Network,
        NetworkService,
        SQLite,
        SQLitePorter,
        FingerprintAIO,
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule {}
