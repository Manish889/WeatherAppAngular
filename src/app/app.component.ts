import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'weather-app';
  ondashboard: boolean = true;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url == '/dashboard') {
          this.ondashboard = false;
        } else if(event.url == '/') {
          this.ondashboard = true;
        }
      });
  }
}
