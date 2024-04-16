import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass, NgIf} from "@angular/common";
import {SwitchThemeService} from "../../services/switch-theme.service";

@Component({
  selector: 'add-card',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgClass
  ],
  templateUrl: './add-card.component.html',
  styleUrl: './add-card.component.scss'
})
export class AddCardComponent implements OnInit, OnDestroy{
  darkModeActive: boolean = false;
  subscriber: any;

  constructor(public switchTheme: SwitchThemeService,) {}

  ngOnInit() {
    this.subscriber = this.switchTheme.darkModeState.subscribe((isDark) => {
      this.darkModeActive = isDark;
    })
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
