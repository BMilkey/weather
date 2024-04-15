import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterModule, RouterOutlet, RouterLink} from '@angular/router';
import {NgClass} from "@angular/common";
import {SwitchThemeService} from "./services/switch-theme.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NgClass, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  showMenu:  boolean = false;
  darkModeActive: boolean = false;

  now: Date = new Date();
  today: string = `${this.now.getDate()}.${this.now.getMonth() + 1}.${this.now.getFullYear()}`;

  subscriber: any;

  constructor(public switchTheme: SwitchThemeService, public router: Router) { }

  userEmail: string = 'sochioneface@gmail.com';

  ngOnInit() {
    this.subscriber = this.switchTheme.darkModeState.subscribe((value: boolean) => {
      this.darkModeActive = value;
    });
  }

  switchMenu() {
    this.showMenu = !this.showMenu;
  }

  modeSwitch() {
    this.switchTheme.darkModeState.next(!this.darkModeActive);
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
