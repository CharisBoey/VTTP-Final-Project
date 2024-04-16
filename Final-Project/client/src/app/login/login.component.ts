import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { UserRoleStore } from '../stores/userRole.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb: FormBuilder = inject(FormBuilder)
  loginForm!: FormGroup
  private mainSvc = inject(MainService)
  private router = inject(Router)
  private userRoleStore = inject(UserRoleStore)

  private createLoginForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control<string>('', [ Validators.required ]),
      password: this.fb.control<string>('', [ Validators.required ]),
    })
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm()
    this.userRoleStore.reset()
  }

  async processForm(){
    console.log(">>>>>FORM OUTPUT", this.loginForm.value)
    
    this.mainSvc.processLogin(this.loginForm.value).then(resp => {
      console.info('>>> resp: ', resp)

        const adminPosition = resp
        if (adminPosition.toString()=="true"){
          this.userRoleStore.setAdmin()
          console.log("Welcome Management Team")
          this.router.navigate(['/Admin', this.loginForm.get("username")?.value])

        } else {
          this.userRoleStore.setStandard()
          console.log("Welcome Contractor Team")
          this.router.navigate(['/Standard', this.loginForm.get("username")?.value])
        }
  
    })
    .catch(err => alert("ERROR: "+JSON.stringify(err.error)))

  }

}
