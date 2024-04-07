import { Component, inject } from '@angular/core';
import { icon } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  private router = inject(Router)
  activatedRoute = inject(ActivatedRoute);
  username: string = this.activatedRoute.snapshot.params['username'];

  icons: icon[] = [{iconName: 'Service Request', value: 1}, {iconName: 'Request List', value: 2}, {iconName: 'Response Validation', value: 3}, {iconName: 'Project Timeline', value: 4}];  

  directToPage(iconName: string) {
    const replacedName = iconName.replace(/\s+/g, '-')
    this.router.navigate([ '/Admin/', this.username, replacedName ])

    
    //this.router.navigate("['/{{encodeURIComponent(i.iconName)}}']")
  }

 
  async send(){
    emailjs.init('rayelJTKYKRy_K73S')
    let response = await emailjs.send("service_vttpfinalproject","template_vly3jbj",{
      from_name: "a",
      to_name: "b",
      from_email: "c@mail.com",
      subject: "asdf",
      message: "asdf",
      });

    // const templateParams = {
    //   name:'JJJ',
    //   notes:'CHECK IT'
    // }

    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', '#myForm').then(
    //   (response) => {
    //     console.log('SUCCESS!', response.status, response.text);
    //   },
    //   (error) => {
    //     console.log('FAILED...', error);
    //   },
    // );

  }

  
}
