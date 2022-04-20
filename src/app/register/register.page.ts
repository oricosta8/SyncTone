import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  errors = {
    name:null,
    email:null,
    password:null,
  }
  constructor(private router:Router, private auth:AuthenticationService) { }

  ngOnInit() {
  }

  loginPage(){
    this.router.navigate(['/login'])
  }


  onSubmit(form:NgForm){
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const password_confirmation = form.value.password_confirmation;
    console.log(form);
    this.auth.register(name,email,password,password_confirmation).subscribe((res)=>{
      console.log(res);
    },
    (err)=>{
      this.errors = err.error.errors
      console.log(err.error.errors);
    }
    )

  }
}
