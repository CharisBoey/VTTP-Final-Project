import { ElementRef, Injectable, inject } from '@angular/core';
import { imagePreview, login, serviceRequest, updateServiceRequest } from './models';
import { Observable, Subject, firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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


  private locationValid: boolean = false;

  setLocationValid(valid: boolean) {
    this.locationValid = valid;
  }

  getLocationValid() : boolean {
    return this.locationValid;
  }


 /*  private username = new Subject<string>();

  setUsername(username: string) {
    this.username.next(username);
  }

  getUsername(): Observable<string> {
    return this.username.asObservable();
  }
   */
  
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
  
//   POST https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
// Content-type: application/json
// {
//     "text": "Gotta get the bread and milk!"
// }
  // slackNotification(text: string):Promise<any>{
  //   const payload = {text: text};
    
  //   // const headers = new HttpHeaders({
  //   //   'Content-Type': 'application/json'
  //   // });

  //   return firstValueFrom(this.http.post<any>('https://hooks.slack.com/services/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', payload))
  // }
  
  // slackNotification(text: string): Promise<any> {
  //   const payload = {
  //     text: text
  //   };

  //   // const headers = new HttpHeaders({
  //   //   'Content-Type': 'application/json'
  //   // });

  //   //const slackAccessToken = { token: "xoxb-6902130349319-6930608810129-LbjvDEO8b9ibLAwNywmvj9e0"};

  //   return firstValueFrom(this.http.post<any>(
  //     'https://hooks.slack.com/services/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',
  //     payload
  //     // { headers: headers }, 
  //   ));
  // }

  // slackNotification(message: string): Promise<any> {
  //   const payload = {
  //     channel: '#developertesting', // Replace with your desired channel
  //     username: 'webhookbot',
  //     text: message,
  //     icon_emoji: ':ghost:'
  //   };

  //   const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  //   return firstValueFrom(this.http.post("https://hooks.slack.com/services/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", new URLSearchParams(payload), { headers }));
  // }

  slackNotification(message: string): Promise<any> {
    const payload = {
      text: message, // Ensure required field is present
      channel: '#developertesting',
      username: 'NotificationBot',
      icon_emoji: ':Loudspeaker:' // Optional field (replace with your desired channel)
    };

    // username\": \"webhookbot\", \"text\": \"This is posted to #developertesting and comes from a bot named webhookbot.\", \"icon_emoji\": \":ghost:\"}" 

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }); // Set correct Content-Type

    return firstValueFrom(this.http.post("https://hooks.slack.com/services/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", payload, { headers }));
  }
  
  
  /* updateServiceRequestToSB(UpdateServiceRequestData: updateServiceRequest): Promise<any>{
    const formData = new FormData();

    formData.set('requestID', UpdateServiceRequestData.requestID);
    formData.set('completeddate', UpdateServiceRequestData.completeddate);
    formData.set('fixedphoto', UpdateServiceRequestData.fixedphoto);
    formData.set('contractorname', UpdateServiceRequestData.contractorname);

    return firstValueFrom(
      this.http.post<updateServiceRequest>("/api/UpdateServiceRequest", formData)    
    )

  } */

}
