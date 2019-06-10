import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';

import { PagesComponent } from './pages/pages.component';
import { APP_ROUTES } from './app.routes';

import { SharedModule } from './shared/shared.module';
import { PagesModule } from './pages/pages.module';

import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PagesComponent,


  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    APP_ROUTES,
    PagesModule,
    SharedModule,
    ComponentsModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
