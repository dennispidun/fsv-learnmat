import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserGuard implements CanActivate {
  

  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {
      
      const token = route.queryParamMap.get('token') || "";
      if (token === null || token === '') {
        return this.router.parseUrl('/'); 
      }

      return this.auth.validate(token).pipe(map(resp => {
          if(resp.status == 200) {
            return true;
          } else {
            return this.router.parseUrl('/'); 
          }
      }));
  }
  
}
