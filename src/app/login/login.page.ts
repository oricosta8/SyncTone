import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor( private router:Router, private auth:AuthenticationService) { }

  registerPage(){
    this.router.navigate(['/register'])
  }

  ngOnInit():void {
  }

  onSubmit(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;

    //console.log(email,password);
    this.auth.login(email, password).subscribe((res:any)=>{
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res))
      //redirigim cap a la pagina home
      this.router.navigate(['/navbar']);
    },
    err=>{
      console.log(err);
    })
  }

}
