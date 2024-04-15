import {Component, OnInit} from '@angular/core';
import { AddCardComponent} from "../../cards/add-card/add-card.component";
import {Router, RouterLink} from "@angular/router";
import {WeatherCardComponent} from "../../cards/weather-card/weather-card.component";
import {AsyncPipe, NgForOf} from "@angular/common";

import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AddCardComponent,
    WeatherCardComponent,
    NgForOf,
    AsyncPipe, RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(public auth: AuthService, public router: Router) { }

  cities: Object[] = [];

  ngOnInit() {
    this.cities = this.auth.getCities();
  }
}
