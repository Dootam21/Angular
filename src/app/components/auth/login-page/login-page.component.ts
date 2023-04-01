import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap, BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  
  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  
  constructor(private authService:AuthenticationService, private router: Router){
    // this._isLoggedIn$ = this._isLoggedIn$.asObservable();
    const token = localStorage.getItem('user_auth');
    this._isLoggedIn$.next(!!token);
  }

  submitForm() {
    if(this.form.invalid){
      return ;
    }
    let username = this.form.get('username')?.value;
    let password = this.form.get('password')?.value;
    this.loginUser(username!, password!).subscribe((response) => this.router.navigate(['research'])
    )
  }
  
  loginUser(username?: string, password?: string) : Observable<any>{
    return this.authService.loginUser(username, password).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem('user_auth', response.token);
      })
    )
  }

}
