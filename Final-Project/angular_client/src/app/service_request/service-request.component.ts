import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestStore } from '../stores/request.store';
import { ServiceRequestSlice, serviceRequest } from '../models';
import { Observable, Subject, Subscription } from 'rxjs';
//import { WebcamImage } from 'ngx-webcam';
import { v4 as uuidv4 } from 'uuid';
import { MainService } from '../main.service';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrl: './service-request.component.css'
})
export class ServiceRequestComponent implements OnInit{

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
  protected req$!: Observable<serviceRequest[]>
  protected allReq$!: Subscription;
  //url to error maybe?
  protected imageTitle: string='no img'
  //protected webcamOn: boolean = false
  //protected previewOn: boolean = false
  protected uploaded: boolean = false
  protected width: number = 300
  protected height: number = 300
  protected trial:boolean=false

 /*  protected trigger$!: Observable<void>
  protected triggerSub = new Subject<void>() */
  private fb = inject(FormBuilder)
  protected serviceRequestForm!: FormGroup
  protected message: string = ""
  //private canUpload = false

  capturedImage = ''
  
  @ViewChild('photoElem')
  photoElem!: ElementRef;

  
  ngOnInit(): void {
    this.serviceRequestForm = this.createServiceRequestForm()  

    this.req$ = this.reqStore.select(
      (slice: ServiceRequestSlice) => slice.requestLists
    )
    //this.trigger$ = this.triggerSub.asObservable()
  }

  private createServiceRequestForm(): FormGroup{
    return this.fb.group({
      request: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      duedate: this.fb.control<string>('', [Validators.required]),
      priority: this.fb.control<number>(0, [Validators.required, Validators.min(0), Validators.max(5)]),
      photo: this.fb.control('', [Validators.required]),
    })
  }

  isInvalid(dateInputString: string): boolean{
    const dateNow = new Date()
    const dateInput = new Date(dateInputString)
      if(dateInput<dateNow){
        this.message = "Invalid Date, must be future date"
      } else {
        this.message = ""
      }
      return this.serviceRequestForm.invalid || dateInput < dateNow
  }

  saveData(){
    console.log("clicked")
    this.allReq$ = this.reqStore.getReq.subscribe({
      next: (result) => {
        for (let i = 0; i<result.length; i++){
          this.mainSvc.sendServiceRequestToSB(result[i]);
          this.reqStore.deleteReq(result[i].requestID)

        }
        //this.reqStore.resetReqStore()
      },
      error: (err) => { console.log(err) },
      complete: () => { this.allReq$.unsubscribe() }
    });

  }

  addRequest(){
    const request = this.serviceRequestForm.value as serviceRequest
    console.log(request)
    //add uuid
    const uuid = uuidv4().substring(0, 8)
    console.log("ID...",uuid)
    request.requestID = uuid
    
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

    this.serviceRequestForm.reset()
    this.uploaded = false
  }

  deleteRequest(requestID:string){
    this.reqStore.deleteReq(requestID)
  }
  deleteUploadedPhoto(){
    this.serviceRequestForm.get('photo')?.reset();
    this.uploaded = false; 
  }

  uploadedTrue(){
    this.uploaded = true
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