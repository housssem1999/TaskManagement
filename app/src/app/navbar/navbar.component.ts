import { Component, Input, OnInit } from '@angular/core';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  @Input () isLoggedIn: boolean = false;
  username?: any;
  active="home";
  tache:any

  constructor(private tacheService: TacheService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!window.sessionStorage.getItem('USER_KEY');

    if (this.isLoggedIn) {
      const user = window.sessionStorage.getItem('USER_KEY');
    }
  
  }
 
  logout(): void {
    window.sessionStorage.removeItem('USER_KEY')
    window.location.reload();
    this.SetActive("home")
  }
  SetActive(Nactive: any){
    this.active=Nactive;
  }
  search(){
    this.tacheService.get_tache_from_searchbar('souheil').subscribe(data=>{
      this.tache = data
      console.log(this.tache)
    })
  }
}
