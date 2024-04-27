import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../_service/authentication.service';


export const authenticationGuard: CanActivateFn = (route, state) => {
  
  let isLogged: boolean = inject(AuthenticationService).isUserLoggedIn();

  if (!isLogged) {
    
    console.log('Redirigiendo a inicio de sesion');
    inject(Router).navigate(['login']);
    
    return false;
  }
  return true;
};
