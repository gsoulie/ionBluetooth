import { Service } from './../models/service';
import { DevicePage } from './../pages/device/device';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BLE } from '@ionic-native/BLE';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DevicePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DevicePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BLE,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Service
  ]
})
export class AppModule {}
