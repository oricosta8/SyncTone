import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private helper = new JwtHelperService();

  constructor(private http:HttpClient) { }

  toggleLogin(state:boolean):void{
    this.isLoggedIn.next(state)
  }

  status(){
    const localData:any = localStorage.getItem('user');
    if(!localData){
      this.isLoggedIn.next(false);
      console.log("User not Logged In!");
    }
    const token_expires_at = this.helper.getTokenExpirationDate(localData);
    const current_date = new Date();
    console.log(token_expires_at);
    console.log(current_date);
    if(token_expires_at > current_date){
      this.isLoggedIn.next(true);
    }else{
      this.isLoggedIn.next(false);
      console.log("Token Expires!!");
    }

    return this.isLoggedIn.asObservable();
  }

  login(email:string, password:string){
    return this.http.post('http://127.0.0.1:8000/api/login',{
      email:email,
      password:password
    });
  }

  register(name:string, email:string, password: string, password_confirmation:string){
    const data={
      name:name,
      email:email,
      password:password,
      password_confirmation:password_confirmation,

    }
    return this.http.post('http://127.0.0.1:8000/api/register', data);
  }

  logout(){
    const user:any = localStorage.getItem('user');
    const userObj:any = JSON.parse(user);
    const token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('http://127.0.0.1:8000/api/logout',{headers:headers});
  }


  posts(){
    const user:any = localStorage.getItem('user');
    const userObj:any = JSON.parse(user);
    const token = userObj.token;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get('http://127.0.0.1:8000/api/posts',{headers: headers});
  }
}
