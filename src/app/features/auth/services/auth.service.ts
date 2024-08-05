import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/login-response.model';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request.model';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user= new BehaviorSubject<User| undefined>(undefined);
  constructor(private httpClient:HttpClient,
    private cookieService: CookieService
  ) { 

  }

  login(loginRequest :LoginRequest): Observable<LoginResponse>
  {
    return this.httpClient.post<LoginResponse>(`${environment.apiUrl}/auth/login`,loginRequest);
  }



  setUser(user : User):void{
    this.$user.next(user);
    localStorage.setItem('user-email',user.email);
    localStorage.setItem('user-roles',user.roles.join(','));

    
  }

  getUser():Observable<User|undefined>{

    return this.$user.asObservable();
  }


  //check if user is still logged in after refreshing the page
checkUser (): User|undefined{
  const email = localStorage.getItem('user-email');
  const roles = localStorage.getItem('user-roles');

  if(email && roles)
  {
    const user :User ={
      email:email,
      roles:roles?.split(','),
    };
    return user;
  }
  return undefined;
}

  logout():void{
    console.log("logging out")
    localStorage.clear();
    this.cookieService.delete('Authorization','/','localhost',true,'Strict');
    this.$user.next(undefined);

  }
}
