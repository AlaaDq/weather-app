import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CurrentWeatherEffects } from './effects/current-weather.effects';
import { CurrentWeatherComponent } from './current-weather/current-weather.component';
import { CitySearchComponent } from './city-search/city-search.component';


// import { metaReducers, reducers } from './reducers'
// import { StoreDevtoolsModule } from '@ngrx/store-devtools'
// import { environment } from '../environments/environment'
import {FlexLayoutModule } from '@angular/flex-layout' 
import {  reducers } from './reducers'

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherComponent,
    CitySearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    // StoreModule.forRoot({}, {}),
    // EffectsModule.forRoot([CurrentWeatherEffects]),
    StoreModule.forRoot(reducers, {
        // metaReducers,
        runtimeChecks: { strictStateImmutability: true, strictActionImmutability: true },
      }),
    EffectsModule.forRoot([CurrentWeatherEffects]),
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
