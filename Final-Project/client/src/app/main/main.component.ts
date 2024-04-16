import { Component, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserRoleStore } from '../stores/userRole.store';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  
  private mainSvc = inject(MainService);
  protected activatedRoute = inject(ActivatedRoute);
  protected username: string = this.activatedRoute.snapshot.params['username'];

  protected userStatus: String= ""

  ngOnInit(): void {
    this.mainSvc.getUserStatus().subscribe(status => this.userStatus = status)
  }

}
