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
  //protected updated$!: Subscription;
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
      // contractorName: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      // completionDate: this.fb.control<string>('', [Validators.required]),
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
    //this.reqListIDs$ = this.mainSvc.getAllRequest().pipe(takeUntil(this.ngUnsubscribe)).subscribe(ID => this.reqListIDs$ = ID);
    this.reqListIDs$ = this.mainSvc.getAllRequest()

    /* this.updatedReq$ = this.reqStore.select(
      (slice: ServiceRequestSlice) => slice.requestLists
    ).pipe(takeUntil(this.ngUnsubscribe)); */

    // this.updatedReq$ = this.reqStore.select(
    //   (slice: ServiceRequestSlice) => slice.requestLists
    // )


    this.reqStore.getReq.subscribe({
      next: (result) => {
        for (let i = 0; i<result.length; i++){
          const svcReq: serviceRequest = result[i];
          if(!this.listOfReqIDs.includes(svcReq.requestID)){
            this.listOfReqIDs.push(svcReq.requestID);
            this.listOfReq.push(svcReq);
            console.log("..,.,.,.,.", this.listOfReqIDs.forEach.toString())
          }
          // if (this.listOfReq.includes(svcReq.requestID)){}
          // this.sentence = result[i].adminname+ result[i].photo
        }
        //this.reqStore.resetReqStore()
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
          // this.reqStore.reset()

        }
        //this.reqStore.resetReqStore()
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


    // console.log("!@#$", this.progressSubmissionForm.get("fixedphoto")?.value)

    //requestUpdateSvcReq.requestID = this.requestID.nativeElement.value
    requestUpdateSvcReq.completeddate = new Date().toISOString().split('T')[0]   
    requestUpdateSvcReq.contractorname = this.username

    const fixedPhotoRequestID = requestUpdateSvcReq.requestID

    console.log(fixedPhotoRequestID, this.photoElem.nativeElement.value)
    this.mainSvc.sendResolvedImgtoSB(fixedPhotoRequestID, this.photoElem)
      .then(response => { 
        alert("Successfully uploaded to Digital Ocean: "+ JSON.stringify(response));
        //this.mainSvc.getURL(JSON.stringify(response));
        console.log("Image URL",response.imageURL);
        requestUpdateSvcReq.fixedphoto = response.imageURL;
      })
      .catch(error => {
        alert("Error unsuccessful: "+JSON.stringify(error));
        console.log("ERROR RESPONSE>>>", error);
      });
    
    // this.reqList$ = this.mainSvc.getAllRequest()

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


    //   this.serviceRequestForm = this.createServiceRequestForm()  
    // this.uploaded = false
    // this.mainSvc.setLocationValid(false)
  }

  deleteRequest(requestID:string){
    this.reqStore.deleteReq(requestID)
  }
  
}






  // click(){
  //   console.log(">>> ", this.progressSubmissionForm)
  //   console.log("<<< ", this.requestID.nativeElement.value)

  //   this.updatedReq$ = this.reqStore.select(
  //     (slice: ServiceRequestSlice) => slice.requestLists
  //   )

  // }


  // process(){
  //   console.log(">>> ", this.progressSubmissionForm)
  //   console.log("<<< ", this.requestID.nativeElement.value)

  //   const requestUpdate = this.progressSubmissionForm.value as updateServiceRequest

  //   requestUpdate.requestID = this.requestID.nativeElement.value
  //   requestUpdate.completeddate = new Date().toISOString().split('T')[0]

  //   this.mainSvc.updateServiceRequestToSB(requestUpdate)
  //   .then(response => { 
  //     alert(JSON.stringify(response));
  //   })
  //   .catch(error => {
  //     alert(JSON.stringify(error));
  //     console.log("ERROR RESPONSE>>>", error);
  //   });
  // }