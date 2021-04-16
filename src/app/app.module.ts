import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es' ;
import { registerLocaleData } from '@angular/common';

registerLocaleData (localeEs , 'es') ;

@NgModule({

  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,HttpClientModule,IonicModule.forRoot(), AppRoutingModule],

  providers: [

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }  ,

    { provide : LOCALE_ID , useValue : 'es-MX' }

  ],

  bootstrap: [AppComponent],

})

export class AppModule {}
