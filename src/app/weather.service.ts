import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICurrentWeather,ICurrentWeatherResponse } from './interfaces';
import { HttpClient } from "@angular/common/http";
import { HttpParams, HttpHeaders } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';


// for currentWeather$ subject way
export const defaultWeather: ICurrentWeather = {
    city: '--',
    country: '--',
    date: Date.now(),
    image: '',
    temperature: 0,
    description: '',
  }

// interface show what the service do 
export interface IWeatherService {
    readonly currentWeather$: BehaviorSubject<ICurrentWeather>
    getCurrentWeather(search: string, country?: string): Observable<ICurrentWeather>
    updateCurrentWeather(search: string, country?: string): void
  }


@Injectable({
    providedIn: 'root'
})

export class WeatherService implements IWeatherService{
    // for  BehaviorSubject way
    readonly currentWeather$ = new BehaviorSubject<ICurrentWeather>(defaultWeather)


    constructor(private httpClient: HttpClient) { }

  public  getCurrentWeather(searchText: string, country?: string): Observable<ICurrentWeather> {
      // other  headers  from the https://rapidapi.com/ example it seem they are oprinal cuse it work!! :)
      // .set("content-type","application/octet-stream")
      // .set("x-rapidapi-host","community-open-weather-map.p.rapidapi.com")
      // .set('useQueryString','true')
        const params = new HttpParams().set('q',  country ? `${searchText},${country}` : searchText)
        const headers = new HttpHeaders()
        .set("x-rapidapi-key",environment.xRapidapiKey);
        return this.httpClient.get<ICurrentWeatherResponse>(`${environment.weatherApiBaseUrl}/weather`, { 'headers':headers, 'params':params })
        .pipe( map((data) => this.transformToICurrentWeather(data)))
    }


    // for BehaviorSubject way
    public updateCurrentWeather(search: string, country?: string): void {
        this.getCurrentWeather(search, country).subscribe((weather) =>
          this.currentWeather$.next(weather)
        )
      }


    private transformToICurrentWeather(data: ICurrentWeatherResponse): ICurrentWeather {
        return {
          city: data.name,
          country: data.sys.country,
          date: data.dt * 1000,
          image: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
          temperature: this.convertKelvinToFahrenheit(data.main.temp),
          description: data.weather[0].description,
        }
    }
    
    private convertKelvinToFahrenheit(kelvin: number): number {
        return (kelvin * 9) / 5 - 459.67
    }
      

}
