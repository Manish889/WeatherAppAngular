import { HttpApiServiceService } from './../_services/http-api-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weathermap',
  templateUrl: './weathermap.component.html',
  styleUrls: ['./weathermap.component.scss']
})
export class WeathermapComponent implements OnInit {
  MapImg: string;
  constructor(private apiService: HttpApiServiceService) { }

  ngOnInit(): void {
    this.MapImg = "https://tile.openweathermap.org/map/clouds_new/20/7/2.png?appid=5197772713655d7d3e96a32c4b186eb4"
    this.apiService.weathermap("clouds_new", 25,10, 15)
      .subscribe(res => {
        console.log(res);

      })

    console.log(this.MapImg);

  }

}
