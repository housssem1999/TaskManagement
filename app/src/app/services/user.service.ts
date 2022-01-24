import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

const AUTH_API = 'http://localhost:3000/users/';


 /* HttpHeaders({ 'Content-Type': 'application/json' })*/
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
    login(username: string, password: string) {
      return this.http.post(AUTH_API + 'login', {username, password});
    }
    register(username: string, password: string) {
      return this.http.post(AUTH_API + 'register', {username, password});
    }
    logined(){
      return (!window.sessionStorage.getItem('USER_KEY'))
    }
    getusers(){
      return this.http.get('http://localhost:3000/getusers')
    }
  }