import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const expectedRole = route.data['role'];
  const userRole = authService.getUserRole();
  

  if (userRole === expectedRole) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
