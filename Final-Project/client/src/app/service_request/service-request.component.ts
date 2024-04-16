import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestStore } from '../stores/request.store';
import { ServiceRequestSlice, approvalStatus, serviceRequest } from '../models';
import { Observable, Subscription } from 'rxjs';
//import { WebcamImage } from 'ngx-webcam';
import { MainService } from '../main.service';
import { v4 as uuidv4 } from 'uuid';
import { MapMainComponent } from '../map_main/map-main.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrl: './service-request.component.css'
})
export class ServiceRequestComponent implements OnInit, Validators{

  private reqStore = inject(RequestStore)
  private mainSvc = inject(MainService)
  activatedRoute = inject(ActivatedRoute);
  protected req$!: Observable<serviceRequest[]>
  protected allReq$!: Subscription;
  protected imageTitle: string='no img'
  protected uploaded: boolean = false
  protected trial:boolean = false
  private fb = inject(FormBuilder)
  protected serviceRequestForm!: FormGroup
  protected message: string = ""
  protected locationValid: boolean = false
  protected username: string = this.activatedRoute.snapshot.params['username']
  protected contractorname: string = ''
  protected fixedphoto: string = ''
  protected completeddate: string = ''
  protected rejectreason: string = ''
  protected listOfReq: serviceRequest[]=[];
  protected listOfReqIDs: string[]=[];

  capturedImage = ''
  
  @ViewChild('photoElem')
  photoElem!: ElementRef;

  @ViewChild('autocomplete3')
  autocomplete3!: MapMainComponent;

  
  ngOnInit(): void {
    this.serviceRequestForm = this.createServiceRequestForm()  

    this.reqStore.getReq.subscribe({
      next: (result) => {
        for (let i = 0; i<result.length; i++){
          const svcReq: serviceRequest = result[i];
          if(!this.listOfReqIDs.includes(svcReq.requestID)){
            this.listOfReqIDs.push(svcReq.requestID);
            this.listOfReq.push(svcReq);
          }
        }
      },
    })
  }

  private createServiceRequestForm(): FormGroup{
    this.message=""
    return this.fb.group({
      request: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      duedate: this.fb.control<string>('', [Validators.required]),
      priority: this.fb.control<number>(0, [Validators.required, Validators.min(0), Validators.max(5)]),
      photo: this.fb.control('', [Validators.required]),
      confirm:this.fb.control<boolean>(false)
    })
  }

  confirmlocation() {
    this.locationValid = this.mainSvc.getLocationValid()
    console.log(">>>Location Valid: ", this.locationValid)
  }
  

  isInvalid(): boolean{
    const request = this.serviceRequestForm.value as serviceRequest
    
    const dateNow = new Date()
    const dateInput = new Date(request.duedate)
      if(dateInput<dateNow){
        this.message = "Invalid Date, must be future date"
      } else {
        this.message = ""
      }
    return this.serviceRequestForm.invalid || dateInput < dateNow || !this.locationValid || !this.serviceRequestForm.value.confirm
  }
  

  saveData(){
    console.log("clicked")
    this.allReq$ = this.reqStore.getReq.subscribe({
      next: (result) => {
        for (let i = 0; i<result.length; i++){
          this.mainSvc.sendServiceRequestToSB(result[i]);
          this.reqStore.deleteReq(result[i].requestID)
        }
      },
      error: (err) => { console.log(err) },
      complete: () => { this.allReq$.unsubscribe() }
    });
    this.mainSvc.slackNotification("@ContractorTeam New Service Request Submitted!\n RequestIDs: " + this.listOfReqIDs.toString() + ", ")

    this.listOfReq=[];
    this.listOfReqIDs=[];
  }

  addRequest(){
    const request = this.serviceRequestForm.value as serviceRequest
    console.log(request)
    //add uuid
    const uuid = uuidv4().substring(0, 8)
    console.log("ID...",uuid)
    request.requestID = uuid
    request.locationaddress = this.autocomplete3.location.address
    request.adminname = this.username    
    request.contractorname = this.contractorname
    request.fixedphoto = this.contractorname
    request.completeddate = this.completeddate
    request.approvalstatus = approvalStatus.PENDING
    request.rejectreason = this.rejectreason
    //Reformatdate
    const dateObject = new Date(request.duedate);
    request.duedate = dateObject.toISOString().slice(0,10)

    this.reqStore.addReq(request)
  
    this.mainSvc.sendImgToSB(request.requestID, this.photoElem)
      .then(response => { 
        alert(JSON.stringify(response));
        console.log("Image URL",response.imageURL);
        request.photo = response.imageURL;

      })
      .catch(error => {
        alert(JSON.stringify(error));
        console.log("ERROR RESPONSE>>>", error);
      });

    this.serviceRequestForm = this.createServiceRequestForm()  
    this.uploaded = false
    this.mainSvc.setLocationValid(false)
  }

  deleteRequest(requestID:string){
    this.reqStore.deleteReq(requestID)
  }

  uploadedTrue(){
    this.uploaded = true
  } 

  slack(message: string) {
    const response = this.mainSvc.slackNotification(message);
    response.then(data => console.log(data)).catch(error => console.log(error))
    
  }
}