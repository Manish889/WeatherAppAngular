import { HttpApiServiceService } from './../_services/http-api-service.service';
import { Data, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../_services/search.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  searchValue: string = "";
  afterSelected: boolean = true;
  today: number = new Date().getDay();
  citydetals: Array<any> = [];
  forcastDetails: Array<any> = [];
  cityUniqueList: any[] = [];
  constructor(private router: Router, 
    readonly search: SearchService, private apiService: HttpApiServiceService) { 
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const d = new Date();
      const dayName = days[d.getDay()];
    }

  ngOnInit(): void {
    // this.getCurrentCityWeather("Almora");
  }

  onInput() {
    this.afterSelected = true;
  }

  selectCity(city: string) {
    this.getCurrentCityWeather(city);
    this.searchValue = '';
    this.afterSelected = false;
  }
  setCity() {
    this.getCurrentCityWeather("Almora");
    console.log(this.cityUniqueList);
  }

  getCurrentCityWeather(cityNameQuery: string) {
    console.log(cityNameQuery);
    this.apiService.weatherForcast({q: cityNameQuery})
      .subscribe((res: any) => {
        const cityDetails: any = res;
          this.citydetals.push(
            {
              City: cityDetails["city"]["name"],
              Sunset: cityDetails["city"]["sunset"],
              Country: cityDetails["city"]["country"]
            }
          )
        const forcast: any[] = res.list;
        forcast.forEach((el:any) => {
          this.forcastDetails.push(
            {
              Temp: el["main"]["temp"],
              FeelsLike: el["main"]["feels_like"],
              MaxTemp: el["main"]["temp_max"],
              MinTemp: el["main"]["temp_min"],
              Icon: el["weather"][0]["icon"],
              // date: el["dt_txt"],
              date: (new Date((el["dt"])*1000)).toDateString(),
            }
          );
        })
        const getUniqueBy = (prop: string | number, list: any[]) => {
          const objUniq = list.reduce((res: any, item: { [x: string]: any; }) => ({ ...res, [item[prop]]: item }), {})
          return Object.keys(objUniq).map(item => objUniq[item])
      };
      this.cityUniqueList = getUniqueBy("date", this.forcastDetails);
      console.log(this.cityUniqueList);
      })
  }

  uniqueCityCallback(list: any[]) {
    const getUniqueBy = (prop: string | number, list: any[]) => {
      const objUniq = list.reduce((res: any, item: { [x: string]: any; }) => ({ ...res, [item[prop]]: item }), {})
      return Object.keys(objUniq).map(item => objUniq[item])
  };
  const uniqueList = getUniqueBy("date", list);
  this.cityUniqueList = uniqueList
  console.log(list)
  console.log(uniqueList);
  console.log(this.cityUniqueList);
  
  }

}