import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { MainService } from "./main.service";


  export const canProceedAdmin: CanActivateFn =
  (_route, _state) => {
    const mainSvc = inject(MainService)
    const router = inject(Router)
    let userStatus: String= "";

    console.info('Admin Proceed...')
    mainSvc.getUserStatus().subscribe(status => userStatus = status)
    if (userStatus==="Admin"){
      
      return true;
    }
    return router.parseUrl('/')
  }; 

  export const canProceedStandard: CanActivateFn =
  (_route, _state) => {
    const mainSvc = inject(MainService)
    const router = inject(Router)
    let userStatus: String= "";
    console.info('Standard Proceed...')

    mainSvc.getUserStatus().subscribe(status => userStatus = status)
    if (userStatus==="Standard"){
      return true;
    }
    return router.parseUrl('/')
  }