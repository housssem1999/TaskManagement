import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private user: UserService) { }

  ngOnInit(): void {
  }
  form: any = {
    username: null,
    password: null
  };
  errorMessage = ''
   onsubmit(){
     const {username, password} = this.form
     
     this.user.register(username, password).subscribe(data=>this.router.navigate(['/login']))
   }

}
