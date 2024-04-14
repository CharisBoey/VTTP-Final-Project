import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../main.service';

@Component({
  selector: 'app-project-timeline',
  templateUrl: './project-timeline.component.html',
  styleUrl: './project-timeline.component.css'
})
export class ProjectTimelineComponent implements OnInit{
  private mainSvc = inject(MainService)
  protected activatedRoute = inject(ActivatedRoute);
  protected username: string = this.activatedRoute.snapshot.params['username'];
  protected userStatus: String= ""

  ngOnInit(): void {
    this.mainSvc.getUserStatus().subscribe(status => this.userStatus = status)
  }
}
