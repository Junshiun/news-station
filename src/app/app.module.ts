import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { GaugeModule } from 'angular-gauge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HeaderComponent } from './components/header/header.component';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherFetchServiceService } from './services/weatherFetchService/weather-fetch-service.service';
import { TopNewsComponent } from './components/top-news/top-news.component';
import { TopNewsSideComponent } from './components/top-news-side/top-news-side.component';
import { TopNewsBottomComponent } from './components/top-news-bottom/top-news-bottom.component';
import { MainCategoriesComponent } from './components/main-categories/main-categories.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherComponent,
    TopNewsComponent,
    TopNewsSideComponent,
    TopNewsBottomComponent,
    MainCategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    GaugeModule.forRoot(),
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule
  ],
  providers: [
    WeatherFetchServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
