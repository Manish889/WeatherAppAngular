import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpApiServiceService } from '../_services/http-api-service.service';
import { SearchService } from '../_services/search.service';
import * as moment from 'moment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchValue: string = "";
  afterSelected: boolean = true;
  activeCityList: any[] = [];

  constructor(public router: Router, private route: ActivatedRoute,
    readonly search: SearchService, private apiService: HttpApiServiceService) { }

  ngOnInit(): void {
    console.log(this.router.url);
  }

  onSearch() {
    console.log('fsdfs')
  }

  onInput() {
    this.afterSelected = true;
  }

  selectCity(city: string) {
    this.getCurrentCityWeather(city);
    this.searchValue = '';
    this.afterSelected = false;
    
  }

  getCurrentCityWeather(cityNameQuery: string) {
    this.apiService.weatherForcast({q: cityNameQuery})
      .subscribe((res: any) => {
        const cityDetails: any = res;
        const forcast: any[] = res.list;
          this.activeCityList = [(
            {
              City: cityDetails["city"]["name"],
              Country: cityDetails["city"]["country"],
              Icon: `http://openweathermap.org/img/wn/${forcast[0]["weather"][0]["icon"]}.png`,
              dateTxt: (new Date(forcast[0]["dt"]*1000)).toDateString(),
              Temp: forcast[0]["main"]["temp"],
              FeelsLike: forcast[0]["main"]["feels_like"],
              weather: forcast[0]["weather"][0]["description"],
              SeaLevel: forcast[0]["main"]["sea_level"],
              WindSpeed: forcast[0]["wind"]["speed"],
              Pressure: forcast[0]["main"]["pressure"],
              Humidity: forcast[0]["main"]["humidity"],
              RainPrediction: ((forcast[0]["pop"]*100) + "%"),
            }
          )]
          this.apiService.todayCurrentWeather$.next(this.activeCityList);
      })
      
  }
}
