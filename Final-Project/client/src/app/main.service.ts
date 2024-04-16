import { ElementRef, Injectable, inject } from '@angular/core';
import { imagePreview, login, serviceRequest, updateServiceRequest } from './models';
import { Observable, Subject, Subscription, firstValueFrom, takeUntil } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRoleStore } from './stores/userRole.store';

@Injectable({
  providedIn: 'root'
})

export class MainService {

  protected proceed: boolean = true;
  private userRoleStore = inject(UserRoleStore);
  private readonly ngUnsubscribe = new Subject();

  getUserStatus(): Observable<string>{
    return this.userRoleStore.getRole.pipe(takeUntil(this.ngUnsubscribe));
  }
  
  private http = inject(HttpClient)


  processLogin(loginDetails: login): Promise<String>{
    
    return firstValueFrom(this.http.post<any>('/api/Login', loginDetails))
  }

  //formvalue -----------------------------
  private formValue: ElementRef | undefined;

  setFormValue(form: ElementRef) {
    this.formValue = form;
  }

  getFormValue() {
    return this.formValue;
  }


  //locationvalid -------------------------
  private locationValid: boolean = false;

  setLocationValid(valid: boolean) {
    this.locationValid = valid;
  }

  getLocationValid() : boolean {
    return this.locationValid;
  }
  
  
  sendImgToSB(reqId: string, photo:ElementRef): Promise<any> {
    const formData = new FormData();

    formData.set('requestID', reqId);
    formData.set('photo', photo.nativeElement.files[0]);

    return firstValueFrom(
      this.http.post<imagePreview>("/api/ImageUpload", formData)    
    )
  }
  

  sendResolvedImgtoSB(reqId: string, photo:ElementRef): Promise<any> {
    const formData = new FormData();

    formData.set('requestID', reqId);
    formData.set('photo', photo.nativeElement.files[0]);

    return firstValueFrom(
      this.http.post<imagePreview>("/api/ResolvedImageUpload", formData)    
    )
  }


  sendServiceRequestToSB(ServiceRequestData: serviceRequest): Promise<any>{
    return firstValueFrom(this.http.post<any>('/api/ServiceRequest', ServiceRequestData))
  }

  updServiceRequestToSB(ServiceRequestData: serviceRequest): Promise<any>{ 
    return firstValueFrom(this.http.post<any>('/api/UpdateServiceRequest', ServiceRequestData))
  }

  updServiceRequestStatusToSB(ServiceRequestData: serviceRequest): Promise<any>{
    return firstValueFrom(this.http.post<any>('/api/UpdateServiceRequestStatus', ServiceRequestData))
  }
  
  getAllRequest(): Observable<serviceRequest[]> {
    return this.http.get<serviceRequest[]>('/api/RequestList')
  }

  getAllRequestByID(requestID: string): Observable<serviceRequest> {
    return this.http.get<serviceRequest>(`/api/RequestListByID/${requestID}`)
  }
  

  slackNotification(message: string): Promise<any> {
    const payload = {
      text: message, 
      channel: '#developertesting',
      username: 'NotificationBot',
      icon_emoji: ':Loudspeaker:' 
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }); 

    return firstValueFrom(this.http.post("https://hooks.slack.com/services/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", payload, { headers }));
  }
  
}
