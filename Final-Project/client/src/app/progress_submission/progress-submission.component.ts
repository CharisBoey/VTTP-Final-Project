import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { MainService } from '../main.service';
import { ServiceRequestSlice, serviceRequest, updateServiceRequest } from '../models';
import { ActivatedRoute } from '@angular/router';
import { RequestStore } from '../stores/request.store';
import { ServiceRequestComponent } from '../service_request/service-request.component';

@Component({
  selector: 'app-progress-submission',
  templateUrl: './progress-submission.component.html',
  styleUrl: './progress-submission.component.css'
})
export class ProgressSubmissionComponent implements OnInit{
[x: string]: any;

  private fb = inject(FormBuilder)
  protected progressSubmissionForm!: FormGroup
  protected uploaded: boolean = false
  protected reqListIDs$!: Observable<serviceRequest[]>
  private mainSvc = inject(MainService)
  protected updatedReq$!: Observable<serviceRequest[]>
  protected sub$!: Subscription;
  protected allReqUpd$!: Subscription;
  protected listOfReq: serviceRequest[]=[];
  protected listOfReqIDs: string[]=[];


  private reqStore = inject(RequestStore)

  @ViewChild('requestID')
  requestID!: ElementRef;

  @ViewChild('photoElem')
  photoElem!: ElementRef;

  activatedRoute = inject(ActivatedRoute);
  username: string = this.activatedRoute.snapshot.params['username'];
  userStatus="Standard"

  
  private createProgressSubmissionForm(): FormGroup{
    return this.fb.group({
      requestID: this.fb.control<string>('', [Validators.required]),
      fixedphoto: this.fb.control('', [Validators.required]),
    })
  }

  deleteUploadedPhoto(){
    this.progressSubmissionForm.get('photo')?.reset();
    this.uploaded = false; 
  }

  uploadedTrue(){
    this.uploaded = true
  } 

  ngOnInit(): void {
    this.progressSubmissionForm = this.createProgressSubmissionForm()
    this.reqListIDs$ = this.mainSvc.getAllRequest()

    this.reqStore.getReq.subscribe({
      next: (result) => {
        for (let i = 0; i<result.length; i++){
          const svcReq: serviceRequest = result[i];
          if(!this.listOfReqIDs.includes(svcReq.requestID)){
            this.listOfReqIDs.push(svcReq.requestID);
            this.listOfReq.push(svcReq);
            console.log("IDs", this.listOfReqIDs.forEach.toString())
          }
          
        }
      },
    })

  }

  saveUpdatedData(){
    console.log("clicked")
    this.allReqUpd$ = this.reqStore.getReq.subscribe({
      next: (result) => {
        for (let i = 0; i<result.length; i++){
          this.mainSvc.updServiceRequestToSB(result[i]);
          this.reqStore.deleteReq(result[i].requestID)
        }
      },
      error: (err) => { console.log(err) },
      complete: () => { this.allReqUpd$.unsubscribe() }
    });
    
    this.mainSvc.slackNotification("@ManagementTeam New Progress Submission Submitted!\n RequestIDs: " + this.listOfReqIDs.toString() + ", ")

    this.listOfReq=[];
    this.listOfReqIDs=[];
  }
    
  addUpdatedImg(){

    const requestUpdateSvcReq = this.progressSubmissionForm.value as serviceRequest
    
    console.log("ID>>>", requestUpdateSvcReq.requestID)

    requestUpdateSvcReq.completeddate = new Date().toISOString().split('T')[0]   
    requestUpdateSvcReq.contractorname = this.username

    const fixedPhotoRequestID = requestUpdateSvcReq.requestID

    console.log(fixedPhotoRequestID, this.photoElem.nativeElement.value)
    this.mainSvc.sendResolvedImgtoSB(fixedPhotoRequestID, this.photoElem)
      .then(response => { 
        alert("Successfully uploaded to Digital Ocean: "+ JSON.stringify(response));
        console.log("Image URL",response.imageURL);
        requestUpdateSvcReq.fixedphoto = response.imageURL;
      })
      .catch(error => {
        alert("Error unsuccessful: "+JSON.stringify(error));
        console.log("ERROR RESPONSE>>>", error);
      });
    
    this.mainSvc.getAllRequestByID(requestUpdateSvcReq.requestID).subscribe({
      next: (svcReq) => {
        requestUpdateSvcReq.request = svcReq.request
        requestUpdateSvcReq.duedate = svcReq.duedate
        requestUpdateSvcReq.priority = svcReq.priority
        requestUpdateSvcReq.photo = svcReq.photo
        requestUpdateSvcReq.locationaddress = svcReq.locationaddress
        requestUpdateSvcReq.adminname = svcReq.adminname
        console.log("RESULT#>>>")
        this.reqStore.addReq(requestUpdateSvcReq)

      },
      error: (err) => { console.log(err) }
      });
      
      this.updatedReq$ = this.reqStore.select(
        (slice: ServiceRequestSlice) => slice.requestLists
      )
      
      this.progressSubmissionForm = this.createProgressSubmissionForm()

  }

  deleteRequest(requestID:string){
    this.reqStore.deleteReq(requestID)
  }
  
}
