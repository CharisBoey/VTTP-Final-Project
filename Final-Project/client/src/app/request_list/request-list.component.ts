import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { serviceRequest } from '../models';
import { MainService } from '../main.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit{

  protected reqList$!: Observable<serviceRequest[]>
  private mainSvc = inject(MainService)
  activatedRoute = inject(ActivatedRoute);
  username: string = this.activatedRoute.snapshot.params['username'];

  ngOnInit(): void {
    this.reqList$ = this.mainSvc.getAllRequest()
  }

}
