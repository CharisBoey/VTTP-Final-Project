import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { userRole, userRoleState } from "../models";


const USERROLE_STORE: userRole = {
    roleState: userRoleState.UNDETERMINED
};


@Injectable()
export class UserRoleStore extends ComponentStore<userRole>{
    constructor() { super (USERROLE_STORE) }

    readonly setAdmin = this.updater(
        (slice: userRole) => {
            return {
              ...slice,
              roleState: userRoleState.ADMIN
            }
          }
    )

    readonly setStandard = this.updater(
        (slice: userRole) => {
            return {
              ...slice,
              roleState: userRoleState.STANDARD
            }
          }
    )

    readonly reset = this.updater(
        (slice: userRole) => {
            return {
              ...slice,
              roleState: userRoleState.UNDETERMINED
            }
          }
    )

    readonly getRole = this.select<userRoleState>(
        (slice: userRole) => slice.roleState
    )
   
}
