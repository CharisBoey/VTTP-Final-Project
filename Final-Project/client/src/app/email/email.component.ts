import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import emailjs from '@emailjs/browser';
import { Subject } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailComponent implements OnInit{

  private fb = inject(FormBuilder)
  protected emailForm!: FormGroup
  activatedRoute = inject(ActivatedRoute);
  protected username: string = this.activatedRoute.snapshot.params['username']
  private mainSvc = inject(MainService);
  protected userStatus: String= ""


  private createEmailForm(): FormGroup{
    return this.fb.group({
      fromEmail: this.fb.control<string>('', [Validators.required, Validators.email]),
      subject: this.fb.control('', [Validators.required, Validators.minLength(5)]),
      message:this.fb.control('', [Validators.required, Validators.minLength(5)])
    })
  }

  ngOnInit(): void {
    this.emailForm = this.createEmailForm();
    this.mainSvc.getUserStatus().subscribe(status => this.userStatus = status)
  }


  async sendManagement(){
    console.log("Sent to Management!")
    emailjs.init('rayelJTKYKRy_K73S')
    let response = await emailjs.send("service_vttpfinalproject","template_vly3jbj",{
      from_name: this.username,
      to_name: "Management Team",
      from_email: this.emailForm.value.fromEmail,
      subject: this.emailForm.value.subject,
      message: this.emailForm.value.message,
      });
    this.emailForm = this.createEmailForm();
  }

  async sendContractor(){
    console.log("Sent to Contractor Team!")
    emailjs.init('rayelJTKYKRy_K73S')
    let response = await emailjs.send("service_vttpfinalproject","template_vly3jbj",{
      from_name: this.username,
      to_name: "Contractor Team",
      from_email: this.emailForm.value.fromEmail,
      subject: this.emailForm.value.subject,
      message: this.emailForm.value.message,
      });
    this.emailForm = this.createEmailForm();
  }
}
