import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subscription, filter, map } from 'rxjs';
import { serviceRequest } from '../models';
import { MainService } from '../main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EvaluationComponent } from '../evaluation/evaluation.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit{

  protected reqList$!: Observable<serviceRequest[]>
  protected filteredList$!: Observable<serviceRequest[]>

  private router = inject(Router)
  private mainSvc = inject(MainService)
  protected activatedRoute = inject(ActivatedRoute);
  protected username: string = this.activatedRoute.snapshot.params['username'];
  protected userStatus: string= ""
  protected priorityListSet$!: Observable<number[]>;
  private fb = inject(FormBuilder)
  protected priorityForm!: FormGroup
  constructor(public dialog: MatDialog) {}
  protected filter: boolean = false;


  ngOnInit(): void {
    this.filter = false;
    this.reqList$ = this.mainSvc.getAllRequest()
  
    this.priorityListSet$ = this.mainSvc.getAllRequest().pipe(map
      (arr => { 
        const setPriority: number[]=[];
        for(let a = 0; a < arr.length; a++){
          if (!setPriority.includes(arr[a].priority)){
            setPriority.push(arr[a].priority);
          }
        }
        return setPriority.sort((n1,n2) => n1 - n2);
      }
      ))

      this.priorityForm = this.fb.group({priority: this.fb.control<number>(0, [Validators.required])})

    this.mainSvc.getUserStatus().subscribe(status => this.userStatus = status)
  }



  // ** only can for Admin!!!
  updateStatus(reqId: string) {
    const dialogRef = this.dialog.open(EvaluationComponent, {
      data: { reqId: reqId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.reqList$ = this.mainSvc.getAllRequest()
    });
  }

  //only can for contractor!!!
  scheduledate(requestId: string, locationaddress: string){
    this.router.navigate(['/Standard', this.username, 'Schedule-Date'], {
      queryParams: { requestId, locationaddress }// Pass scheduleDetails in the state object
    });
  }

  typeDropdown(priority:number){
    this.filter = true
    console.log("CHOSEN TYPE>>>",priority)
    //set the type 
    this.filteredList$ = this.reqList$.pipe(map(v => v.filter(x => x.priority
       === priority
    )))
  }
  
  cancelFilter(){
    this.filter = false;
  }

  
}
