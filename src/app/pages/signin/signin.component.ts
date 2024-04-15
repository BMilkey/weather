import {Component, Input} from '@angular/core';
import {FormBuilder, FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {first, from, Observable} from "rxjs";

@Component({
  selector: 'signin',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SignInComponent {

  constructor(public auth: AuthService, public router: Router) {}

  @Input()email: string = "";
  @Input()password: string = "";


  signIn(e: any) {
    console.log(this.email);
    from(this.auth.signIn(e.target.email.value, e.target.password.value)).pipe(first()).subscribe({
      next:() => {
        this.router.navigateByUrl('');
      },
      error(err: any) {
        alert("all is bad");
        let errorMessage = err;
        setTimeout(() => errorMessage = '', 2000);
      }
    });
  }
}
