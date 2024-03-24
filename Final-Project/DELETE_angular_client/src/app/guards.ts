// // import { inject } from "@angular/core";
// // import { CanActivateFn, CanDeactivateFn, Router } from "@angular/router";
// // import { RouteService } from "./route.service";
// // import { FormComponent } from "./components/form.component";

// import { inject } from "@angular/core";
// import { CanActivateFn, Router } from "@angular/router";
// import { MainService } from "./main.service";
// import { UserRoleStore } from "./userRole.store";
// import { userRoleState } from "./models";



// export const asAdmin: CanActivateFn = 
// (_route,_state)=>{

//     const userStore = inject(UserRoleStore)

//     const mainSvc = inject(MainService)
//     const router = inject(Router)

//     console.info('Admin Granted')

//     const role = userStore.getRole;
//         if (role === "ADMIN"){
//             //router.navigate(['/admin'])
//             return true;
//             //CHECK HOW TO "LOGOUT", E.G. change while testing

//         } 
//         return router.parseUrl('/user')

//     // const userRole = mainSvc.getUserRole();

//     //     if (userRole && userRole.adminPosition === true){
//     //         //router.navigate(['/admin'])
//     //         return true;
//     //         //CHECK HOW TO "LOGOUT", E.G. change while testing

//     //     } 
//     //     return router.parseUrl('/user')
//     //     // else {
//     //     //     router.navigate(['/user'])
//     //     // }
// }
