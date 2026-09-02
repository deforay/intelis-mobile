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
  IonicModule,
  IonicRouteStrategy
} from '@ionic/angular';
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
} from '@ionic-native/app-version/ngx';
import {
  HttpClientModule
} from '@angular/common/http';
import {
  IonicStorageModule
} from '@ionic/storage-angular';
import {
  SplashScreen
} from '@ionic-native/splash-screen/ngx';
import {
  StatusBar
} from '@ionic-native/status-bar/ngx';
import {
  MomentModule
} from '../../src/app/moment.module';
import {
  Network
} from '@ionic-native/network/ngx';
import { NetworkService} from '../app/service/network/network.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { JwPaginationComponent } from './component/jw-pagination/jw-pagination.component';
import { Device } from '@ionic-native/device/ngx';

import {
  MatIconModule
} from '@angular/material/icon';
@NgModule( {
  declarations: [AppComponent],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    MaterialModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,MatSelectModule,MatIconModule
  ],
  providers: [
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
    }
  ],
  exports: [MatFormFieldModule, MatInputModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
