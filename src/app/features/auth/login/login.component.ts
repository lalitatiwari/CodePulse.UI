import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  model:LoginRequest;

  constructor( private authService: AuthService,
    private cookieService :CookieService,
    private route: Router
  )
  {
    this.model =
    {
      email:"",
      password:""
    }
  }

  onSubmit(): void
  {
   this.authService.login(this.model).subscribe({
      next:(response)=>{
       // console.log(response);

       //set Auth token value into Cookie

       this.cookieService.set('Authorization',`Bearer ${response.token}`,
        undefined,'/',undefined,true,'Strict');

        //set the user
        this.authService.setUser({
          email: response.email,
          roles: response.roles
        });
       
        // Redirect back to home page
        this.route.navigateByUrl("/");

      }
    })
    

  }
}
