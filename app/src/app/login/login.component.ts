import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,private user: UserService) { }

  ngOnInit(): void {
  }
  result: any
  form: any = {
    username: null,
    password: null,
    id: null
  };
  isLoggedIn2 = false;

  onSubmit(): void {
    const { username, password } = this.form;
    this.user.login(username, password).subscribe(
      data =>{
        console.log(data)
        this.isLoggedIn2=true
        this.result = 'isLoggedIn'
        window.sessionStorage.setItem('USER_KEY', JSON.stringify(data))
        setInterval(()=>{
          this.router.navigate(['/'])
        }, 1000)
      },err =>{
        console.log(err)
        this.isLoggedIn2=true
        this.result = 'Email or password are not valid'
      }
    )

}
}