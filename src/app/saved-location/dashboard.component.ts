import { HttpApiServiceService } from '../_services/http-api-service.service';
import { Data, Router } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { SearchService } from '../_services/search.service';
import * as moment from 'moment';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class SavedLocationComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  searchValue: string = '';
  afterSelected: boolean = true;
  today: number = new Date().getDay();
  forcastDetails: Array<any> = [];
  cityUniqueList: any[] = [];
  Sunset!: any;
  activeCityList: any[] = [];
  dailyForcastList: any[] = [];
  activeCity: boolean = true;
  activeCityIndex!: number;
  cityList: any[] = [];
  searchedCity: any[] = [];
  isAddCity: boolean = false;
  CitySearched: boolean = false;
  addCityValue: string = '';
  noActiveCity!: boolean;
  cityImage: string = '';
  weatherSwitch: boolean = true;
  buttonName: string = 'today';
  chartSeriesList: any[] = [];
  data: any[] = []

  xAxisData: any[] = [];
  yAxisData: any[] = [];
  dummyForm!: FormGroup;
  constructor(
    private router: Router,
    readonly search: SearchService,
    private apiService: HttpApiServiceService,
    private renderr: Renderer2,
    private fb: FormBuilder
  ) {

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const d = new Date();
    const dayName = days[d.getDay()];

    this.xAxisData = [];
    this.yAxisData= [];
  }

  ngOnInit(): void {
    this.dummyForm = this.fb.group({
      any: '',
    });
    console.log(this.chartSeriesList)
    // this.apiService.getCities()
    //   .subscribe(res => {
    //     console.log(res)
    //   })

    // this.cityImage = `https://lh3.googleusercontent.com/places/AKR5kUixqWHchPBoOGr383oG2Tf4OHDw3bmaWaFnBQlAiTqb-f6JIP7ILEEKUDSwBQWa6GypAaaUfQCZC8IkNJQz258Sy3WXLRdIfzM=s1600-w400`;

    // this.apiService.getApi("https://maps.googleapis.com/maps/api/place/photo", {
    //   photoreference: "ChIJi86Eoqy6qDsRYgW7w17Y7iw",
    //   maxwidth: 400,
    //   key: "AIzaSyBVkamxK-AbkQDbZlox2u_7RRHjGxviqok"
    // })
    //   .subscribe(res => console.log(res))

    this.cityList = [
      {
        ImgSrc: 'assets/Images/red-fort.svg',
        City: 'New Delhi',
        Country: 'India',
      },
      {
        ImgSrc: 'assets/Images/akash-selma-POyHFQj4_S4-unsplash.jpg',
        City: 'Almora',
        Country: 'India',
      },
      {
        ImgSrc: 'assets/Images/nikhil-sachan-Endc_e-V3jI-unsplash.jpg',
        City: 'Nainital',
        Country: 'India',
      },
    ];

    // this.searchedCity = [];
    // this.userLatitude, this.userLongitude
    // this.getCurrentCityWeather(this.cityList[2]["City"]);
    this.getCurrentCityWeather({
      cityNameQuery: this.cityList[0]['City'],
      lat: '',
      lon: '',
    });
  }

  // submit() {
  //   console.log(this.dummyForm.value.any);
  //   const string = this.dummyForm.value.any.replace(/\s*,\s*/g, ',');
  //   console.log(string.split(','));
  // }

  userAddress: string = '';
  userLatitude: string = '';
  userLongitude: string = '';

  handleAddressChange(address: any) {
    console.log(address);
    this.dailyForcastList = [];
    this.searchValue = '';
    this.CitySearched = true;
    this.userAddress = address.formatted_address;
    this.userLatitude = address.geometry.location.lat();
    this.userLongitude = address.geometry.location.lng();
    this.getCurrentCityWeather({
      cityNameQuery: '',
      lat: this.userLatitude,
      lon: this.userLongitude,
    });
  }

  onAddCity() {
    this.isAddCity = true;
  }

  // addCity(city: string, index: number) {
  addCity(city: string) {
    this.addCityValue = '';
    // console.log(city, index);
    this.dailyForcastList = [];

    // this.getCurrentCityWeather(city);
    this.getCurrentCityWeather({ cityNameQuery: city, lat: '', lon: '' });
    // this.activeCityIndex = index;
    // this.setCity(index);
    this.searchValue = '';
    this.afterSelected = false;
    this.cityList.push({
      ImgSrc: 'assets/Images/red-fort.svg',
      City: city,
      Country: this.forcastDetails[0]['Country'],
    });
    this.activeCity = true;

    console.log(this.cityList);
  }

  onInput() {
    this.afterSelected = true;
  }

  selectCity() {
    // this.getCurrentCityWeather(city);
    // this.getCurrentCityWeather({cityNameQuery: '', lat: this.userLatitude, lon: this.userLongitude});
    this.searchValue = '';
    this.afterSelected = false;
    this.activeCity = true;
    this.noActiveCity = true;
    // this.CitySearched = true;
    this.activeCityIndex = 98;
    // this.searchedCity = [
    //   {
    //     ImgSrc: 'assets/Images/red-fort.svg',
    //     City: this.userAddress,
    //     Country: this.forcastDetails[0]['Country'],
    //   },
    // ];

    console.log(this.cityList);
  }
  setCity(index: number) {
    this.activeCity = false;
    this.dailyForcastList = [];
    // this.getCurrentCityWeather(this.cityList[index].City);
    this.getCurrentCityWeather({
      cityNameQuery: this.cityList[index].City,
      lat: '',
      lon: '',
    });
    // this.getTodayForcast("Almora");
    this.activeCityIndex = index;
    console.log(this.cityList[index].City);
    // this.activeCity = true;
  }

  onWeatherSwitch(event: any, buttonName: string) {
    if (buttonName == 'today') {
      this.weatherSwitch = true;
      this.buttonName = buttonName;
    } else if (buttonName == 'daily') {
      this.weatherSwitch = false;
      this.buttonName = buttonName;
    }
  }

  // getCurrentCityWeather(cityNameQuery: string, lat: string, lon: string) {
  getCurrentCityWeather(params: {
    cityNameQuery?: string;
    lat?: string;
    lon?: string;
  }) {
    this.apiService
      .weatherForcast({
        q: params.cityNameQuery,
        lat: params.lat,
        lon: params.lon,
      })
      .subscribe((res: any) => {
        const forcast: any[] = res.list;
        forcast.forEach((el: any) => {
          this.forcastDetails.push({
            Country: res['city']['country'],
            Temp: Math.trunc(el['main']['temp']),
            FeelsLike: el['main']['feels_like'],
            MaxTemp: el['main']['temp_max'],
            MinTemp: el['main']['temp_min'],
            Humidity: el['main']['humidity'],
            Pressure: el['main']['pressure'],
            RainPrediction: el['pop'] * 100 + '%',
            SeaLevel: el['main']['sea_level'],
            WindSpeed: el['wind']['speed'],
            Icon: `http://openweathermap.org/img/wn/${el['weather'][0]['icon']}@4x.png`,
            weather: el['weather'][0]['description'],
            IconCode: el['weather'][0]['icon'],
            dateTxt: new Date(el['dt'] * 1000).toDateString(),
            date: new Date(el['dt'] * 1000).toDateString().substring(0, 4),
          });
        });

        const days = [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ];

        const todayDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

        forcast.forEach((el) => {
          if (
            todayDate ==
            new Date(el['dt'] * 1000).toJSON().slice(0, 10).replace(/-/g, '/')
          ) {
            this.chartSeriesList.push({
              name: (new Date(el['dt'] * 1000)
              .toJSON()
              .slice(10, 16)
              .replace('T', '')).toString(),
              value: Number(Math.trunc(el['main']['temp'])),
            })
            this.chartSeriesList.forEach(el => {
              this.xAxisData.push(el.value);
              this.yAxisData.push(el.name)
              // console.log('chart y', yAxisData)
              // console.log('chart x', xAxisData)
            })

            this.chartOptions = {
              series: [
                {
                  name: "Temperature",
                  data: this.xAxisData
                }
              ],
              chart: {
                height: 350,
                type: "line",
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: "straight"
              },
              title: {
                text: "Weather chart",
                align: "left"
              },
              grid: {
                row: {
                  colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                  opacity: 0.5
                }
              },
              xaxis: {
                categories: this.yAxisData,
              }
            };

            // console.log(this.chartSeriesList);

            this.data = [
              {
                xLabel: 'Time Span',
                yLabel: 'Temperature',
                name: 'Temperature',
                series: this.chartSeriesList,
              }
            ];

            this.dailyForcastList.push({
              Country: res['city']['country'],
              Temp: Math.trunc(el['main']['temp']),
              FeelsLike: el['main']['feels_like'],
              MaxTemp: el['main']['temp_max'],
              MinTemp: el['main']['temp_min'],
              Humidity: el['main']['humidity'],
              Pressure: el['main']['pressure'],
              RainPrediction: el['pop'] * 100 + '%',
              SeaLevel: el['main']['sea_level'],
              WindSpeed: el['wind']['speed'],
              Icon: `http://openweathermap.org/img/wn/${el['weather'][0]['icon']}@4x.png`,
              weather: el['weather'][0]['description'],
              IconCode: el['weather'][0]['icon'],
              dateTxt: new Date(el['dt'] * 1000).toDateString(),
              // date: new Date(el['dt'] * 1000).toDateString().substring(0,10) + " " + new Date(el['dt'] * 1000).getHours() +":" + new Date(el['dt'] * 1000).getMinutes(),
              date: new Date(el['dt'] * 1000)
                .toJSON()
                .slice(10, 16)
                .replace('T', ''),
            });
          }

          // const xAxisData: any[] = [this.dailyForcastList[0].date]

          // const yAxisData: any[] = [(this.dailyForcastList[0].Temp)]



        });

        // get unique daily forcast
        const getUniqueBy = (prop: string | number, list: any[]) => {
          const objUniq = list.reduce(
            (res: any, item: { [x: string]: any }) => ({
              ...res,
              [item[prop]]: item,
            }),
            {}
          );
          return Object.keys(objUniq).map((item) => objUniq[item]);
        };
        this.cityUniqueList = getUniqueBy('date', this.forcastDetails);
      });

    // current weather
    this.apiService
      // .currentWeather({ q: cityNameQuery })
      .currentWeather({
        q: params.cityNameQuery,
        lat: params.lat,
        lon: params.lon,
      })
      .subscribe((res: any) => {
        const cityDetails = res;
        this.activeCityList = [
          {
            ImgSrc: 'assets/Images/red-fort.svg',
            City: cityDetails['name'],
            Timezone: cityDetails['timezone'],
            Country: cityDetails['sys']['country'],
            Sunset: moment
              .utc(cityDetails['sys']['sunset'], 'X')
              .add(cityDetails['timezone'], 'Seconds')
              .format('HH:mm a'),
            Icon: `http://openweathermap.org/img/wn/${cityDetails['weather'][0]['icon']}@4x.png`,
            dateTxt: new Date(cityDetails['dt'] * 1000).toDateString(),
            Temp: Math.trunc(cityDetails['main']['temp']),
            FeelsLike: cityDetails['main']['feels_like'],
            weather: cityDetails['weather'][0]['description'],
            weatherMain: cityDetails['weather'][0]['main'],
            SeaLevel: cityDetails['main']['sea_level'],
            WindSpeed: (
              (cityDetails['wind']['speed'] * (60 * 60)) /
              1000
            ).toFixed(2),
            Pressure: cityDetails['main']['pressure'],
          },
        ];
        // console.log(this.activeCityList);
        this.getImages();
      });
  }

  getImages() {
    console.log(this.activeCityList[0]['weatherMain']);

    if (this.activeCityList[0]['weatherMain'] == 'rain') {
      return 'assets/Images/pexels-thiago-matos-3230019.jpg';
    } else if (this.activeCityList[0]['weatherMain'] == 'Clouds') {
      return 'assets/Images/pexels-pixabay-414659.jpg';
    } else {
      return 'assets/Images/pexels-pixabay-414659.jpg';
    }
  }
}
