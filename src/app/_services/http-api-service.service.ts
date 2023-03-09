import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class HttpApiServiceService {
  private apiKey: string = '5197772713655d7d3e96a32c4b186eb4';
  private weatherBitKey: string = 'f95aef23f76a43c185c07f127fb3137a';

  public todayCurrentWeather$: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(private http: HttpClient) {}

  // postAPI(api: String ,data: object): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}${EnvVariables.VERSION}` + api, data)
  // }

  getCities(): Observable<any>{
    const headers = new Headers();
    headers.append('X-CSCAPI-KEY', 'API_KEY');

    const requestOptions = {
      method: 'GET',
      headers: headers,
      redirect: 'follow',
    };
    return this.http.get<any>(`https://api.countrystatecity.in/v1/countries/IN/states/UK/cities`, {headers: {
        'X-CSCAPI-KEY': 'Ukc4UHB1eGNXOWdOMEdoWnJmSWlFMXdTcE9rQlFWaHJjTEtlQ2R3bA=='
    }});
  }

//   getPlacesPicture() {
//     return this.http.get(`https://maps.googleapis.com/maps/api/place/photo`);
//   }

  currentWeather(obj: any): Observable<any> {
    let params = new HttpParams();
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        params = params.append(key, obj[key]);
      }
    }
    return this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/weather?appid=${this.apiKey}&units=metric`,
      { params: params }
    );
  }

  airQualityApi(obj: any): Observable<any> {
    let params = new HttpParams();
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        params = params.append(key, obj[key]);
      }
    }
    return this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/air_pollution?appid=${this.apiKey}&units=metric`,
      { params: params }
    );
  }

  getCordinates(obj: any): Observable<any> {
    let params = new HttpParams();
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        params = params.append(key, obj[key]);
      }
    }
    return this.http.get<any>(
      `http://api.openweathermap.org/geo/1.0/direct?appid=${this.apiKey}`,
      { params: params }
    );
  }

  weatherbitapi(obj: any): Observable<any> {
    let params = new HttpParams();
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        params = params.append(key, obj[key]);
      }
    }
    return this.http.get<any>(
      `https://api.weatherbit.io/v2.0/current?key=ab8317505e44486aaa3b725feaa72a5f`,
      { params: params }
    );
  }

  weathermap(layer: any,z?:number,x?:number, y?:number) {
    return this.http.get<any>(`https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${this.apiKey}`)
  }

  getApi(api: string, obj: any): Observable<any> {
    let params = new HttpParams();
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        params = params.append(key, obj[key]);
      }
    }
    return this.http.get<any>(`${api}`, { params: params });
  }

  weatherForcast(obj: any) {
    let params = new HttpParams();
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        params = params.append(key, obj[key]);
      }
    }
    return this.http.get<any>(
      `https://api.openweathermap.org/data/2.5/forecast?appid=${this.apiKey}&units=metric`,
      { params: params }
    );
  }
}
