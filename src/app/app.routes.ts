import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {AddCityComponent} from "./pages/add-city/add-city.component";
import {DetailsComponent} from "./pages/details/details.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'add-city', component: AddCityComponent},
  {path: 'details/:city', component: DetailsComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];
