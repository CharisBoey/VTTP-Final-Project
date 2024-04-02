import { Component, Inject, OnInit, inject } from '@angular/core';
import { ServiceRequestSlice, approvalStatus, serviceRequest } from '../models';
import { MainService } from '../main.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestStore } from '../stores/request.store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrl: './evaluation.component.css'
})
export class EvaluationComponent implements OnInit{

  protected rejected: boolean = false
  protected clicked: boolean = false
  protected reason: string = ''
  private mainSvc = inject(MainService)
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
  // protected updatedReq$!: Observable<serviceRequest[]>
  // protected allReqUpd$!: Subscription;


  protected requestUpdateSvcReqStatus: serviceRequest = {
    requestID: '',
    request: '',
    duedate: '',
    completeddate: '',
    priority: 0,
    photo: '',
    fixedphoto: '',
    locationaddress: '',
    adminname: '',
    contractorname: '',
    approvalstatus: approvalStatus.PENDING,
    rejectreason: ''
  };


  ngOnInit() {
    console.log('Request ID:', this.data.reqId);
    this.requestUpdateSvcReqStatus.requestID = this.data.reqId
    // this.updatedReq$ = this.reqStore.select(
    //   (slice: ServiceRequestSlice) => slice.requestLists
    // )
  }

  updateApproved(){
    console.log("...approved")
    this.requestUpdateSvcReqStatus.approvalstatus = approvalStatus.APPROVED
    this.requestUpdateSvcReqStatus.rejectreason = ''
    this.mainSvc.updServiceRequestStatusToSB(this.requestUpdateSvcReqStatus)
  }

  processReject(){
    this.rejected = true
    this.clicked = true
  }

  updateReject(){
    console.log("...reject", this.reason)
    this.requestUpdateSvcReqStatus.approvalstatus = approvalStatus.REJECTED
    this.requestUpdateSvcReqStatus.rejectreason = this.reason
    
    // this.mainSvc.getAllRequestByID(this.requestUpdateSvcReqStatus.requestID).subscribe({
    //   next: (svcReq) => {

    //     this.requestUpdateSvcReqStatus.request = svcReq.request
    //     this.requestUpdateSvcReqStatus.duedate = svcReq.duedate
    //     this.requestUpdateSvcReqStatus.completeddate = svcReq.completeddate
    //     this.requestUpdateSvcReqStatus.priority = svcReq.priority
    //     this.requestUpdateSvcReqStatus.photo = svcReq.photo
    //     this.requestUpdateSvcReqStatus.fixedphoto = svcReq.fixedphoto
    //     this.requestUpdateSvcReqStatus.locationaddress = svcReq.locationaddress
    //     this.requestUpdateSvcReqStatus.adminname = svcReq.adminname
    //     this.requestUpdateSvcReqStatus.contractorname = svcReq.contractorname

    //     console.log("HERE")
    //   },
    //   error: (err) => { console.log(err) }
    //   });

      this.mainSvc.updServiceRequestStatusToSB(this.requestUpdateSvcReqStatus)
  }

  

  

  // addUpdatedImg(){

  //   const requestUpdateSvcReq = this.progressSubmissionForm.value as serviceRequest

  //   requestUpdateSvcReq.requestID = this.requestID.nativeElement.value
  //   requestUpdateSvcReq.completeddate = new Date().toISOString().split('T')[0]   
  //   requestUpdateSvcReq.contractorname = this.username

  //   const fixedPhotoRequestID = "fixed" + this.requestID.nativeElement.value

  //   console.log(fixedPhotoRequestID, this.photoElem.nativeElement.value)
  //   this.mainSvc.sendImgToSB(fixedPhotoRequestID, this.photoElem)
  //     .then(response => { 
  //       alert(JSON.stringify(response));
  //       //this.mainSvc.getURL(JSON.stringify(response));
  //       console.log("Image URL",response.imageURL);
  //       requestUpdateSvcReq.fixedphoto = response.imageURL;
  //     })
  //     .catch(error => {
  //       alert(JSON.stringify(error));
  //       console.log("ERROR RESPONSE>>>", error);
  //     });
    
  //   // this.reqList$ = this.mainSvc.getAllRequest()


  //   this.mainSvc.getAllRequestByID(requestUpdateSvcReq.requestID).subscribe({
  //     next: (svcReq) => {
  //       requestUpdateSvcReq.request = svcReq.request
  //       requestUpdateSvcReq.duedate = svcReq.duedate
  //       requestUpdateSvcReq.priority = svcReq.priority
  //       requestUpdateSvcReq.photo = svcReq.photo
  //       requestUpdateSvcReq.locationaddress = svcReq.locationaddress
  //       requestUpdateSvcReq.adminname = svcReq.adminname
  //       console.log("RESULT#>>>")
  //       this.reqStore.addReq(requestUpdateSvcReq)

  //     },
  //     error: (err) => { console.log(err) }
  //     });
      
  //     this.updatedReq$ = this.reqStore.select(
  //       (slice: ServiceRequestSlice) => slice.requestLists
  //     )
  // }
}
