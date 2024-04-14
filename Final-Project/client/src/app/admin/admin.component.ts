import { Component, inject } from '@angular/core';
import { icon } from '../models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  private router = inject(Router)
  activatedRoute = inject(ActivatedRoute);
  username: string = this.activatedRoute.snapshot.params['username'];

  icons: icon[] = [{iconName: 'Service Request', value: 1}, {iconName: 'Request List', value: 2}, {iconName: 'Project Timeline', value: 3}, {iconName: 'Email', value: 4} ];  

  directToPage(iconName: string) {
    const replacedName = iconName.replace(/\s+/g, '-')
    this.router.navigate([ '/Admin/', this.username, replacedName ])

    
    //this.router.navigate("['/{{encodeURIComponent(i.iconName)}}']")
  }

 


  
}
