import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}
  
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const expectedRoles = route.data['expectedRoles'] as string[];

    return this.authService.isAuthenticated$.pipe(
      take(1),
      switchMap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/signin']);
          return of(false);
        }

        // Check if the user has any of the expected roles
        return this.authService.hasAnyRole(expectedRoles).pipe(
          map(hasRequiredRole => {
            if (!hasRequiredRole) {
                window.alert('Access denied. You don\'t have permission to view this page');
                this.router.navigate(['/']);
            }
            return true;
          })
        );
      })
    );
  }
}
