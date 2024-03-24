import { ElementRef, Injectable, inject } from '@angular/core';
import { imagePreview, login, serviceRequest } from './models';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MainService {
  private http = inject(HttpClient)
  //Use observable/promise?
  processLogin(loginDetails: login): Promise<String>{
    
    return firstValueFrom(this.http.post<any>('/api/Login', loginDetails))
  }

  // private logout(): void{
  //   this.role.adminPosition();
  // }

  // private role: userRole={roleState: userRoleState.UNDETERMINIED};

  //   constructor() { }

  //   setUserRole(role: userRole): void {
  //       this.role = role;
  //   }

  //   getUserRole(): userRole {
  //       return this.role;
  //   }

    
  

  // constructor() { }

  private formValue: ElementRef | undefined;

  setFormValue(form: ElementRef) {
    this.formValue = form;
  }

  getFormValue() {
    return this.formValue;
  }

  
  sendImgToSB(reqId: string, photo:ElementRef): Promise<any> {
    const formData = new FormData();

    formData.set('requestID', reqId);
    formData.set('photo', photo.nativeElement.files[0]);

    return firstValueFrom(
      this.http.post<imagePreview>("/api/ImageUpload", formData)    
    )
  }

  /* getURL(payload : string){
    console.log("SVC",payload)
  } */

  /* sendServiceRequestToSB(ServiceRequestData: serviceRequest): Promise<any> {
    const formData = new FormData();


    formData.set('requestID', ServiceRequestData.requestID);
    formData.set('request',ServiceRequestData.request);
    formData.set('duedate',ServiceRequestData.duedate);
    formData.set('priority',ServiceRequestData.priority.toString());
    formData.set('photo',ServiceRequestData.photo);

    return firstValueFrom(
      this.http.post<imagePreview>("/api/ServiceRequest", formData)    
    )
  } */

  sendServiceRequestToSB(ServiceRequestData: serviceRequest): Promise<any>{
    
    return firstValueFrom(this.http.post<any>('/api/ServiceRequest', ServiceRequestData))
  }

  getAllRequest(): Observable<serviceRequest[]> {

    return this.http.get<serviceRequest[]>('/api/RequestList')
  }
  
}
