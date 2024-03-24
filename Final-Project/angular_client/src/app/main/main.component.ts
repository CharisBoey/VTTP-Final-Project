import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserRoleStore } from '../stores/userRole.store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit{
  private readonly ngUnsubscribe = new Subject();
  private userRoleStore = inject(UserRoleStore)

  userStatus: String= ""

  ngOnInit(): void {
    this.userRoleStore.getRole.pipe(takeUntil(this.ngUnsubscribe)).subscribe(status => this.userStatus = status);
  }
}
