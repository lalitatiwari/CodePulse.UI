import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/services/auth.service';
import { User } from '../../../features/auth/models/user.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  user?:User;

  constructor( private authService : AuthService,
    private router:Router){}
  ngOnInit(): void {
   this.authService.getUser().subscribe({
    next:(response)=>{
       this.user=response;

     // console.log(user);
    }
   });

   this.user= this.authService.checkUser();
  }

  logout(): void{
 this.authService.logout();
 this.router.navigateByUrl("/");

  }

}
