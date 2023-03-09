import { WeathermapComponent } from './weathermap/weathermap.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SavedLocationComponent } from './saved-location/dashboard.component';

const routes: Routes = [
  {path: "", component: DashboardComponent},
  {path: "homepage", component: LandingPageComponent},
  {path: "dashboard", component: DashboardComponent},
  {path: "map", component: WeathermapComponent},
  {path: "saved-location", component: SavedLocationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
