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
    // this.mainSvc.setUsername(this.loginForm.get("username")?.value);

  }

  processForm(){
    console.log(">>>>>FORM OUTPUT", this.loginForm.value)
    
    this.mainSvc.processLogin(this.loginForm.value).then(resp => {
      console.info('>>> resp: ', resp)

      //this.mainSvc.setUsername(this.loginForm.get("username")?.value);

      const adminPosition = resp
      if (adminPosition.toString()=="true"){
        //this.mainSvc.setUserRole({adminPosition: true})
        this.userRoleStore.setAdmin()
        alert("Admin Granted")
        this.router.navigate(['/Admin', this.loginForm.get("username")?.value])

        //ADD IN THAT IT IS ADMIN!!!!!!!!
      } else {
        this.userRoleStore.setStandard()
        //this.mainSvc.setUserRole({adminPosition: false})
        alert("Admin Not Granted")
        this.router.navigate(['/Standard', this.loginForm.get("username")?.value])
      }
      
      //alert(JSON.stringify(resp))
      //this.router.navigate(['/'])
  
    })
    .catch(err => alert("ERROR: "+JSON.stringify(err.error)))
  }

  // isTodoInvalid(): boolean {
  //   return this.loginForm.invalid || this.taskArray.length <= 0
  // }

}
