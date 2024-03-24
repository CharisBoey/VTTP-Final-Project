import { Component, inject } from '@angular/core';
import { icon } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  private router = inject(Router)

  icons: icon[] = [{iconName: 'Service Request', value: 1}, {iconName: 'Request List', value: 2}, {iconName: 'Response Validation', value: 3}, {iconName: 'Project Timeline', value: 4}];  

  directToPage(iconName: string) {
    const replacedName = iconName.replace(/\s+/g, '-')
    this.router.navigate([ '/', replacedName ])
    //this.router.navigate("['/{{encodeURIComponent(i.iconName)}}']")
  }
}
