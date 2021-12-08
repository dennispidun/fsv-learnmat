import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserGuard implements CanActivate {
  

  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const token = route.queryParamMap.get('token') || "";
      if (token === null || token === '') {
        return this.router.parseUrl('/'); 
      }

      return this.auth.validate(token).then(valid => {
        if (!valid) {
          return this.router.parseUrl('/'); 
        } else {
          return true;
        }
      });

      

      
  }
  
}
