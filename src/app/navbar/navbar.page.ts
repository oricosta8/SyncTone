import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export class NavbarPage implements OnInit {

  loggedIn:boolean = false;
  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.auth.status().subscribe((res)=>{
      this.loggedIn = res;
      console.log(this.loggedIn);
    }, (err) =>{
      console.log(err);
    })
  }

}
