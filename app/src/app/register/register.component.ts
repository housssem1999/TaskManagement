import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit(): void {
  }
  form: any = {
    username: null,
    password: null
  };
  errorMessage = ''
   onsubmit(){
     const {username, password} = this.form
     
     this.user.register(username, password).subscribe(data=>console.log(data))
   }

}
