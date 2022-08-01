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

  weatherDetails: Array<{ unit: string; icon: string; details: number }> = [];
  icon!: string;
  constructor(private apiService: HttpApiServiceService, private renderr: Renderer2) {}

  ngOnInit(): void {
    this.getLocation();
  }

  currentWeather(long: string = '', lat: string = '') {
    this.apiService
      .currentWeather({ lat: lat, lon: long })
      .subscribe((res: any) => {
        this.iconCode = res['weather'][0].icon;
        this.celcius = res['main']['temp'];
        this.City = res['name'];
        this.weatherDetails.push(
          {
            unit: 'Kmph',
            icon: 'assets/Images/weather.svg',
            details: Number((res['wind']['speed'] * 1.609).toFixed(2)),
          },
          {
            unit: 'Millibars',
            icon: 'assets/Images/weather (1).svg',
            details: Number(res['main']['pressure']),
          },
          {
            unit: 'g.m-3',
            icon: 'assets/Images/snowflake.svg',
            details: Number(res['main']['humidity']),
          }
        );
        this.geticon();
      });
  }

  getLocation() {
    console.log(navigator.permissions);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const longtitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        this.currentWeather(longtitude, latitude);
      },  (error:any) => {
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
