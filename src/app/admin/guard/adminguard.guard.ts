import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { GuardServicesService } from '../../shared/services/guard-services.service'


export const adminguardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const service = inject(GuardServicesService)

  if(service.decryptAndDisplay()){
    if(service.getRoleCheck('admin')){
        return true
    }
  }
  service.logout()
  return false;
};
