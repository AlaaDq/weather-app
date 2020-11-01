import { Component, OnInit } from '@angular/core';
import {WeatherService} from './weather.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather-app';
  constructor(private ws:WeatherService){}
  ngOnInit(){   
    this.ws.getCurrentWeathersearchText('London','uk')
    .subscribe(
        (data)=> console.log(data),
        (err)=>  console.log(err)
    )
   
  }
}
