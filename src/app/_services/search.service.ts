import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { switchMap, debounceTime, shareReplay, delay } from 'rxjs/operators';
type Data = any;
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  where!: any;
  items: Observable<Data>;
  cityList!: Array<any>;
  private term: Subject<string> = new Subject<string>();
  constructor(private http: HttpClient) {
    

    this.http.get<Array<any>>(`https://parseapi.back4app.com/classes/Indiacities_india_cities_database?limit=all&keys=ascii_name,latitude,longitude`, {headers: {
      'X-Parse-Application-Id': 'JJNsRdAinmNHsMiD2kmcKxvDNBh4YYqv32O3IYlv',
      'X-Parse-REST-API-Key': 'RBd3r80dq6OGOz6xhquE3x73YZvcoVKDznP6Y96F',
    }}).subscribe((res: any) => {
      const data:Array<any> = res.results;
      const cityArray: any[] = [];
      data.forEach((e:any) => {
        // console.log(e.ascii_name);
        cityArray.push(e.ascii_name);
      })
      this.callbackFunc(cityArray);
      // console.log(cityArray)
    })
    

    this.items = this.term.pipe(
      debounceTime(250),
      switchMap((term: string) => {
        const data = this.cityList;
        const filtered = data.filter((item) => `${item}`.match(term));
        return of(filtered).pipe(delay(100));
      }),
      shareReplay(1)
    )
  }

  callbackFunc(cities: any) {
    // console.log(cities);
    this.cityList = cities;
  }

 

  search(term: string) {
    if(term) {
      return this.term.next(term);
    } 
    else if(term == "" || term == " ") {
      return;
    }
  }

  ngOnDestroy(): void {
    this.term.complete();
  }
}