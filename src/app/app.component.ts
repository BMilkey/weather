import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private auth: AuthService) { }

  signUp(email: string, password: string) {
    this.auth.signUp(email , password);
  }
}
