import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TacheService } from './services/tache.service';
import { UserService } from './services/user.service';
import { TacheComponent } from './tache/tache.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private user: UserService){}
  canActivate() {
    if (!this.user.logined()) {
        return true;
    } else {
        this.router.navigate(['/login']);
        return false;
    }
  }
}
  
