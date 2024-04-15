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

 /*  protected requestcompNum: string[]=[]
  protected requestNo: number=0
  private mainSvc = inject(MainService)
  

  ngOnInit(): void {
    this.requestNo = 1
    this.requestcompNum.push("Req No."+ this.requestNo)
  }

  addRequest(){
    this.requestNo += 1
    this.requestcompNum.push("Req No."+ this.requestNo)
    console.log(">>>",this.requestcompNum)
  }

  process(){
    console.log("!!!", this.mainSvc.getFormValue)
    
  } */

  private reqStore = inject(RequestStore)
  private mainSvc = inject(MainService)
  activatedRoute = inject(ActivatedRoute);
  protected req$!: Observable<serviceRequest[]>
  protected allReq$!: Subscription;
  //url to error maybe?
  protected imageTitle: string='no img'
  //protected webcamOn: boolean = false
  //protected previewOn: boolean = false
  protected uploaded: boolean = false
  protected trial:boolean = false

 /*  protected trigger$!: Observable<void>
  protected triggerSub = new Subject<void>() */
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
  // protected checkValid:boolean = false;

  //protected username$!: Observable<string>
  // protected usnm: string =''
  //private canUpload = false

  capturedImage = ''
  
  @ViewChild('photoElem')
  photoElem!: ElementRef;

  @ViewChild('autocomplete3')
  autocomplete3!: MapMainComponent;

  
  ngOnInit(): void {
    this.serviceRequestForm = this.createServiceRequestForm()  

    // this.req$ = this.reqStore.select(
    //   (slice: ServiceRequestSlice) => slice.requestLists
    // )
    this.reqStore.getReq.subscribe({
      next: (result) => {
        for (let i = 0; i<result.length; i++){
          const svcReq: serviceRequest = result[i];
          if(!this.listOfReqIDs.includes(svcReq.requestID)){
            this.listOfReqIDs.push(svcReq.requestID);
            this.listOfReq.push(svcReq);
          }
          // if (this.listOfReq.includes(svcReq.requestID)){}
          // this.sentence = result[i].adminname+ result[i].photo
        }
        //this.reqStore.resetReqStore()
      },
    })

    //this.trigger$ = this.triggerSub.asObservable()
    
    //this.username$ = this.mainSvc.getUsername()
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
    
      // console.log("090980809808", this.serviceRequestForm.value.confirm)
      
    return this.serviceRequestForm.invalid || dateInput < dateNow || !this.locationValid || !this.serviceRequestForm.value.confirm
  }
  

  saveData(){
    console.log("clicked")
    this.allReq$ = this.reqStore.getReq.subscribe({
      next: (result) => {
        for (let i = 0; i<result.length; i++){
          this.mainSvc.sendServiceRequestToSB(result[i]);
          this.reqStore.deleteReq(result[i].requestID)
          // this.reqStore.reset()
        }
        //this.reqStore.resetReqStore()
      },
      error: (err) => { console.log(err) },
      complete: () => { this.allReq$.unsubscribe() }
    });
    this.mainSvc.slackNotification("@ContractorTeam New Service Request Submitted!\n RequestIDs: " + this.listOfReqIDs.toString() + ", ")

    this.listOfReq=[];
    this.listOfReqIDs=[];
    // this.mainSvc.slackNotification("New Service Request Submitted!")
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
        //this.mainSvc.getURL(JSON.stringify(response));
        console.log("Image URL",response.imageURL);
        request.photo = response.imageURL;

        //this.router.navigate(['/'])
      })
      .catch(error => {
        alert(JSON.stringify(error));
        console.log("ERROR RESPONSE>>>", error);
      });
    //this.previewOn = false

    // this.serviceRequestForm.reset()
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
  
    const response = this.mainSvc.slackNotification(message); // If using a service
    response.then(data => console.log(data)).catch(error => console.log(error))
    
  }
 

  
  

  /* webcam(){
    this.webcamOn=true
  }*/

  //webcam
  /* snap() {
    this.triggerSub.next()
    this.webcamOn = false
    this.previewOn = true
  } */

  //webcam
  /* captured(image: WebcamImage) {
    this.capturedImage = image.imageAsDataUrl
    // Convert the data url to binary/blob
    console.info('>>> ', this.capturedImage)
    //this.canUpload = true
    this.serviceRequestForm.get('photo')?.setValue(image)
    //get('photo').setValue(image);
    
  } */

  //webcam
  /* clear() {
    //this.canUpload = false
    this.previewOn = false
    this.capturedImage = ''
  } */

/*   cannotUpl(){
    return false;
  } */

 

  /* upload() {
    if (!this.canUpload)
      return
    this.uploadSvc.upload(this.capturedImage)
      .then(result => {
        console.info('response: ', result)
      })
  } */
  
  /* diaryStore = inject(DiaryStore)
  entries$!: Observable<DiaryEntry[]>

  ngOnInit(): void {
    this.entries$ = this.diaryStore.onEntries.asObservable()
        // .pipe(
        //  map(e => e.map(v => ({ text: v.text, date: v.date}))
        // ))
  } */

}
