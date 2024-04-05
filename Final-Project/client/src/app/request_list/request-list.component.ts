import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceRequest } from '../models';
import { MainService } from '../main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EvaluationComponent } from '../evaluation/evaluation.component';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit{

  protected reqList$!: Observable<serviceRequest[]>
  private router = inject(Router)
  private mainSvc = inject(MainService)
  activatedRoute = inject(ActivatedRoute);
  username: string = this.activatedRoute.snapshot.params['username'];
  

  ngOnInit(): void {
    this.reqList$ = this.mainSvc.getAllRequest()
  }

  constructor(public dialog: MatDialog) {}


  // ** only can if admin!!!
  updateStatus(reqId: string) {
    const dialogRef = this.dialog.open(EvaluationComponent, {
      data: { reqId: reqId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.reqList$ = this.mainSvc.getAllRequest()
    });
  }

  //only can if contractor
  scheduledate(requestId: string, locationaddress: string){
    // const scheduleDetails = {
    //   reqId: requestId,
    //   locationAdd: locationAddress
    // }

    // this.router.navigate(['/Standard/', this.username, 'Schedule-Date' ] , {state: {scheduleDetails}})

    //console.log("!@#$", requestId, locationAddress)
    this.router.navigate(['/Standard', this.username, 'Schedule-Date'], {
      queryParams: { requestId, locationaddress }// Pass scheduleDetails in the state object
    });
  }

  // slack(){
  //   console.log("SLACK")
  //   this.mainSvc.slackNotification("TESTING SLACK MESSAGE")
  // }

  

  
}
