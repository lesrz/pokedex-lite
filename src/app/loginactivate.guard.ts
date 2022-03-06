import { User } from '@shared/models/user';
import { AuthService } from '@app/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginActivate implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLogged) {
      this.router.navigate(['login']);
    }
    return true;
  }
  // canActivate(): Observable<boolean> {
  //   return this.authService.user$.pipe(
  //     //@ts-ignore
  //     take(1),
  //     map((user: User) => (!user ? true : false))
  //   );
  // }
}
