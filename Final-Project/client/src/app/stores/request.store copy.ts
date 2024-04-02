// import { Injectable } from "@angular/core";
// import { ServiceRequestSlice, serviceRequest } from "../models";
// import { ComponentStore } from "@ngrx/component-store";

// const SVC_REQ_STORE: ServiceRequestSlice = {
//     requestLists:[]
// }


// @Injectable()
// export class RequestStore extends ComponentStore<ServiceRequestSlice>{
//     constructor() { super (SVC_REQ_STORE) }

//     readonly addReq = this.updater<serviceRequest>(
//         (slice: ServiceRequestSlice, svcReq: serviceRequest) => {
         
//             return {
//             requestLists: [ ...slice.requestLists, svcReq ]
//             }

//         }
//       )

//     readonly getReq = this.select<serviceRequest[]>(
//         (slice: ServiceRequestSlice) => slice.requestLists

//     )

//     readonly deleteReq = this.updater<string>(
//         (slice: ServiceRequestSlice, requestIDInput: string) => {
//             return {
//             requestLists: slice.requestLists.filter(req => requestIDInput != req.requestID)
//             }
//         }
//     )

//     readonly getReqByID = (requestID: string) => {
//         return this.select<serviceRequest>(
//           (slice: ServiceRequestSlice) => {
//             return slice.requestLists.filter(req => req.requestID == requestID)[0]
//           }
//         )
//       }

//     // updateReq(requestUpdateSvcReq: serviceRequest){
//     //     this.deleteReq(requestUpdateSvcReq.requestID)
//     //     this.addReq(requestUpdateSvcReq)
//     // }
      
//     /* readonly resetReqStore = this.updater((slice: ServiceRequestSlice) => {
//         return { ...slice, requestLists: [] }
//       }) */

//     //readonly deleteTaskByDate = this.updater<string>(
//         //     (slice: TodoSlice, date: string) => {
//         //       return {
//         //         loadedOn: slice.loadedOn,
//         //         todos: slice.todos.filter(todo => date != todo.date)
//         //       }
//         //     }
//         //   )

    
    
//     //   readonly getNumberOfTodos = this.select<number>(
//     //     (slice: TodoSlice) => slice.todos.length
//     //   )
    
//     //   readonly getTodoByPriority = (priority: number) => {
//     //     return this.select<Todo[]>(
//     //       (slice: TodoSlice) => {
//     //         return slice.todos.filter(todo => todo.priority == priority)
//     //       }
//     //     )
//     //   }
    
//     //   // Mutators
//     //   readonly deleteTaskByDate = this.updater<string>(
//     //     (slice: TodoSlice, date: string) => {
//     //       return {
//     //         loadedOn: slice.loadedOn,
//     //         todos: slice.todos.filter(todo => date != todo.date)
//     //       }
//     //     }
//     //   )
    
      
   
// }
