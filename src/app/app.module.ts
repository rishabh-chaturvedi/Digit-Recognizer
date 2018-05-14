import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import * as tf from '@tensorflow/tfjs';
// import { DrawableDirective } from '../pages/home'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChartComponent } from '../components/chart/chart';
import { DrawableDirective } from '../directives/drawable/drawable';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DrawableDirective,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    //DrawableDirective,
    ChartComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
