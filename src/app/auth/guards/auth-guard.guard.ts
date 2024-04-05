import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { GuardServicesService } from '../../shared/services/guard-services.service'

export const authGuardGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const service = inject(GuardServicesService)

  console.log("router", router)
  if(service.decryptAndDisplay()){
    // if(service.getRoleCheck('admin')){
    //     console.log("Employe login")
    //     return true
    // }

  }
  return true;

};
