import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { AddCardComponent} from "../../cards/add-card/add-card.component";
import {Router, RouterLink} from "@angular/router";
import {WeatherCardComponent} from "../../cards/weather-card/weather-card.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";

import {AuthService} from "../../services/auth.service";
import {BehaviorSubject} from "rxjs";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AddCardComponent,
    WeatherCardComponent,
    NgForOf,
    AsyncPipe, RouterLink, NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(public auth: AuthService, public router: Router, private ref: ChangeDetectorRef) { }

  cities: any = [];

  ngOnInit() {
    let array = this.auth.cards.subscribe((data) => {
      this.cities = data.slice();
    });
  }

}
