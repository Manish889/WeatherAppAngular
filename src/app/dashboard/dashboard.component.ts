import { HttpApiServiceService } from '../_services/http-api-service.service';
import { Data, Router } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  Renderer2,
  ElementRef,
  ViewContainerRef,
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
  ApexGrid,
  ApexYAxis,
  ApexLegend,
  ApexTooltip,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexMarkers
} from "ng-apexcharts";

// import { Chart } from "G:/MyAngularProjects/weather-app/node_modules/chart.js/dist/types"
// import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  fill: ApexFill;
  markers: ApexMarkers;
  yaxis: ApexYAxis;
  labels: string[];
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  title: ApexTitleSubtitle;
};

export type PressureChart = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  @ViewChild("chart") pressurechart: ChartComponent;
  public PressureChart: Partial<PressureChart>;

  @ViewChild("chart") airqualitychart: ChartComponent;
  public airqualityChart: Partial<PressureChart>;
  @ViewChild("chart") gaugechart: any;
  dummyForm!: FormGroup;
  dailyForcastList: any[] = []
  searchValue: string | undefined;
  CitySearched: boolean | undefined;
  userAddress: any;
  userLatitude: any;
  userLongitude: any;
  activeCityList: any[] = [];
  afterSelected: boolean = false;
  activeCity: boolean = false;
  noActiveCity: boolean = false;
  activeCityIndex: number | undefined;
  forcastDetails: any[] = [];
  chartSeriesList: any;
  xAxisData: any;
  yAxisData: any;
  data: { xLabel: string; yLabel: string; name: string; series: any; }[];
  cityUniqueList: any[];
  avgRainchanges: string | number;
  avgRainchancesText: string;
  UvIndex: any;
  UvIndexText: any;

  hideme=[]
  hideme1=[]

  constructor(
    readonly search: SearchService,
    private apiService: HttpApiServiceService
  ) {
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "Temp",
    //       data: [23.44,34,45]
    //     }
    //   ],
    //   grid: {
    //     show: false
    //   },

    //   tooltip: {
    //     enabled: false,
    //     theme: "dark"
    //   },
    //   chart: {
    //     type: "line",
    //     width: "100%",
    //     // height: "300",
    //     zoom: {
    //       enabled: false
    //     },
    //     toolbar: {
    //       show: false
    //     },
    //   },
    //   dataLabels: {
    //     enabled: true,
    //   //   formatter: function (val: any, opts) {
    //   //     return Math.trunc(val) + "°"
    //   // },
    //   style: {
    //     fontFamily: "Inter",
    //     colors: ["#1c3879"]
    //   },
    //   background: {
    //     enabled: false,
    //     borderRadius: 50,


    //   }
    //   },
    //   stroke: {
    //     curve: "smooth",
    //     colors: ["#fff"],
    //     // width: 2
    //   },

    //   title: {
    //     // text: "Temperature",
    //     // align: "left",
    //     // style: {
    //     //   fontFamily: "Inter",
    //     //   // fontSize: "1rem",
    //     //   color: "#fff",
    //     //   fontWeight: "400"
    //     // }
    //   },
    //   subtitle: {
    //     // text: "Price Movements",
    //     align: "left"
    //   },
    //   fill: {
    //   },
    //   labels: ["06:00 PM", "07:00 AM", "09:00 PM"],
    //   xaxis: {
    //     type: "category",
    //     labels: {
    //       // offsetX: 5
    //     }
    //   },
    //   yaxis: {
    //     tickAmount: 5,
    //     show: false,

    //   },
    //   legend: {
    //     horizontalAlign: "left"
    //   }
    // };

    this.chartOptions = {
      series: [
        {
          name: "Temperature",
          data: []
        }
      ],
           tooltip: {
        enabled: true,
        theme: "dark"
      },
         dataLabels: {
        enabled: false,
        formatter: function (val: any, opts) {
          return Math.trunc(val) + "°"
      },
    },
      grid: {
        show: false
      },
      chart: {
        height: 300,
        type: "line",
        toolbar: {
          show: false
        }
      },
      stroke: {
        width: 3,
        curve: "smooth",
        colors: ["#1c3879"]
      },
      xaxis: {
        type: "category",
        categories: [],
        // min: 0
      },
      title: {
       text: "Temperature",
        align: "left",
        style: {
          fontFamily: "Inter",
          // fontSize: "1rem",
          color: "#fff",
          fontWeight: "400"
        }
      },
      fill: {
        // type: "gradient",
        // gradient: {
        //   shade: "dark",
        //   gradientToColors: ["#FDD835"],
        //   shadeIntensity: 1,
        //   type: "horizontal",
        //   opacityFrom: 1,
        //   opacityTo: 1,
        //   stops: [0, 100, 100, 100]
        // }
      },
      markers: {
        size: 4,
        colors: ["#FFA41B"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      yaxis: {
        show: true,
        min: 0,
        max: 40,
        tickAmount: 5,
        labels: {
          formatter: function (val: any, opts) {
            return val
        },
        }
        // title: {
        //   text: "Engagement"
        // }
      }
    };

    this.PressureChart = {
      series: [40],
      chart: {
        type: "radialBar",
        offsetY: -20,
        width: 280
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "100%",
            margin: 15, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: "22px",
              formatter: function(val) {
                if(val < 50) {
                  return "Low"
                } else if(val > 50 && val < 75) {
                  return "Medium"
                } else {
                 return "High"
                }
              },
            }
          }
        }
      },
      fill: {
        type: "gradient",
        colors: ["#D2001A"],
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#367E18"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      labels: ["Average Results"]
    };

    this.airqualityChart = {
      series: [90],
      chart: {
        type: "radialBar",
        offsetY: -20,
        width: 280
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "100%",
            margin: 15, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: -2,
              fontSize: "22px",
              formatter: function(val) {
                if(val == 20) {
                  return "Good"
                } else if(val == 40) {
                  return "Fair"
                } else if(val == 60) {
                 return "Moderate"
                } else if(val == 80) {
                  return "Poor"
                 } else if(val == 100) {
                  return "Very Poor"
                 } else {
                  return "No Data"
                 }
              },
            }
          }
        }
      },
      fill: {
        type: "gradient",
        colors: ["#D2001A"],
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#367E18"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      labels: ["Average Results"]
    };
  }

  ngOnInit(): void {

    const cityList = [
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
    // this.getCurrentCityWeather(cityList[2]["City"]);

    this.getCurrentCityWeather({
      cityNameQuery: cityList[1]['City'],
      lat: '',
      lon: '',
    });

    // this.getUVIndex({
    //   cityNameQuery: cityList[1]['City'],
    //   lat: '',
    //   lon: '',
    // })

  }

  getUVIndex(params: {
    cityNameQuery?: string;
    lat?: string;
    lon?: string;
  }) {
    this.apiService.getCordinates({q: params.cityNameQuery})
      .subscribe(res => {
        console.log(res[0]);

        this.apiService.weatherbitapi({
          lat: res[0].lat,
          lon: res[0].lon,
        })
          .subscribe(res => {
            this.UvIndex = Math.trunc(res.data[0].uv);
            if(this.UvIndex <= 2) {
              this.UvIndexText = "Low";
            } else if(this.UvIndex >= 2 && this.UvIndex <= 5) {
              this.UvIndexText = "Moderate";
            } else if(this.UvIndex >= 5 && this.UvIndex <= 7) {
              this.UvIndexText = "High";
            } else if(this.UvIndex >= 7 && this.UvIndex <= 10) {
              this.UvIndexText = "Very High";
            } else if(this.UvIndex >= 10)  {
              this.UvIndexText = "Extreme";
            } else {
              this.UvIndexText = "No Data";
            }
          })
      })
  }

  getuvcolors() {
    if(this.UvIndex <= 2) {
      return "#367E18"
    } else if(this.UvIndex >= 2 && this.UvIndex <= 5) {
      return "#FD841F"
    } else if(this.UvIndex >= 5 && this.UvIndex <= 7) {
      return "#E14D2A"
    } else if(this.UvIndex >= 7 && this.UvIndex <= 10) {
      return "#D2001A"
    } else if(this.UvIndex >= 10)  {
      return "#9C2C77"
    } else {
      return "#34b3f160"
    }
  }

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

        const todayDate = new Date().toDateString();
        let chartlabeldata: any[] = [];
        let chartseriesdata = [];
        let rainchances = [];

        forcast.forEach((el) => {
          if (
            todayDate ==
            new Date(el['dt'] * 1000).toDateString()
          )
          {


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
              // dateTxt: new Date(el['dt'] * 1000).toDateString(),
              dateTxt: new Date(el['dt'] * 1000).toLocaleTimeString(),
              // date: new Date(el['dt'] * 1000).toDateString().substring(0,10) + " " + new Date(el['dt'] * 1000).getHours() +":" + new Date(el['dt'] * 1000).getMinutes(),
              date: new Date(el['dt'] * 1000).toTimeString()
                .slice(0, 8)
                .replace('T', ''),

              });
              rainchances.push((el['pop'] * 100));

              function formatAMPM(date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0'+minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return strTime;
              }
              chartlabeldata.push(formatAMPM(new Date(el['dt'] * 1000))
              // .slice(0, 5)
              // .replace('T', '')
              )
              chartseriesdata.push(el['main']['temp_max']);

            }


          });

          this.avgRainchanges = Number(rainchances.reduce((p:any,c:any) => p + c, 0) / rainchances.length);
          // this.chartOptions.xaxis.categories = chartlabeldata;
          this.chartOptions.labels = chartlabeldata;
          console.log(this.chartOptions);


          if(this.avgRainchanges < 50) {
            this.avgRainchancesText = "Low"
          } else if(this.avgRainchanges > 50 && this.avgRainchanges < 75) {
            this.avgRainchancesText = "Medium"
          } else if(this.avgRainchanges > 75) {
            this.avgRainchancesText = "High"
          }
          this.chartOptions.series = [{name: "Temperature", data: chartseriesdata}]

          // console.log(this.chartOptions);

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

        // console.log(this.cityUniqueList)

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
        const aqi: any[] = [];
        // console.log(cityDetails);
          // this.apiService.getCordinates({q: params.cityNameQuery})
          //   .subscribe((res: any) => {
              this.apiService.airQualityApi({
                // q: params.cityNameQuery,
                lat: cityDetails.coord.lat,
                lon: cityDetails.coord.lon,
              })
                .subscribe((res: any) => {
                  aqi.push(res.list[0].main.aqi);
                  // this.activeCityList[0].push({AQI: aqi})
                  let aqiPercentage = (res.list[0].main.aqi / 5) * 100
                  this.airqualityChart.series = [aqiPercentage];
                  // console.log(aqi);

                  // console.log(this.airqualityChart);

                })
                // })

                // console.log(aqi);
        this.activeCityList = [
          {
            aqi: aqi,
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
            windDirection: cityDetails['wind']["deg"] + "deg",
            Pressure: cityDetails['main']['pressure'],
          },

        ];
        let pressure = Math.trunc(cityDetails['main']['pressure'] / 1084.8 * 100);
        this.PressureChart.series = [pressure]
        // console.log(this.activeCityList);

      });

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

}


}
