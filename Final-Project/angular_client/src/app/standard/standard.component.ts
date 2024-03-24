import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { icon } from '../models';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrl: './standard.component.css'
})
export class StandardComponent {

  private router = inject(Router)

  icons: icon[] = [{iconName: 'Request List', value: 1}, {iconName: 'Progress Submission', value: 2}, {iconName: 'Project Timeline', value: 4}];  

  directToPage(iconName: string) {
    const replacedName = iconName.replace(/\s+/g, '-')
    this.router.navigate([ '/', replacedName ])
    //this.router.navigate("['/{{encodeURIComponent(i.iconName)}}']")
  }
  
}
