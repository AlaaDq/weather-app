import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store'
import { Observable, merge } from 'rxjs'

import { ICurrentWeather } from '../interfaces'
import { WeatherService } from '../weather.service'
import * as appStore from '../reducers'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {
  current$: Observable<ICurrentWeather>

  constructor(private weatherService: WeatherService, private store: Store<appStore.State>)
     { 
        this.current$ =
         merge(
            this.store.pipe(select(appStore.selectCurrentWeather)),
            this.weatherService.currentWeather$
          )
     }

  ngOnInit(): void {
  }


  getOrdinal(date: number) {
    const n = new Date(date).getDate()
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : ''
  }

}


