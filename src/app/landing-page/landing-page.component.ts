import { HttpApiServiceService } from './../_services/http-api-service.service';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  @ViewChild("main", {static: true}) main!: ElementRef;
  celcius!: number;
  City!: string;
  iconCode!: string;
  noDetails: boolean = false;

  // weatherDetails: Array<{ unit: string; icon: string; details: number }> = [];
  weatherDetails: Array<any> = [];
  icon!: string;
  constructor(private apiService: HttpApiServiceService, private renderr: Renderer2) {}

  ngOnInit(): void {
    this.getLocation();
    this.apiService.todayCurrentWeather$
      .subscribe(res => {
        console.log('data',res)
        this.weatherDetails = res;
      })
  }

  currentWeather(long: string = '', lat: string = '') {
    this.apiService
      .currentWeather({ lat: lat, lon: long })
      .subscribe((res: any) => {
        const cityDetails: any = res;
        console.log(cityDetails);
        
        this.weatherDetails = [{
          City: cityDetails["name"],
          Country: cityDetails["sys"]["country"],
          Icon: `http://openweathermap.org/img/wn/${cityDetails["weather"][0]["icon"]}.png`,
          dateTxt: (new Date(cityDetails["dt"]*1000)).toDateString(),
          Temp: cityDetails["main"]["temp"],
          FeelsLike: cityDetails["main"]["feels_like"],
          weather: cityDetails["weather"][0]["description"],
          SeaLevel: cityDetails["main"]["sea_level"],
          WindSpeed: cityDetails["wind"]["speed"],
          Pressure: cityDetails["main"]["pressure"],
          Humidity: cityDetails["main"]["humidity"],
          RainPrediction: ((cityDetails["pop"]*100) + "%"),
        }]

        console.log(this.weatherDetails);
        
      });
  }

  getLocation() {
    console.log(navigator.permissions);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const longtitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.currentWeather(longtitude, latitude);
      },  
      (error:any) => {
        this.noDetails = true;
      });
    } else if(!navigator.geolocation) {
      this.noDetails = true;
    }
  }

  geticon() {
    this.icon = `http://openweathermap.org/img/wn/${this.iconCode}.png`;
  }
}
