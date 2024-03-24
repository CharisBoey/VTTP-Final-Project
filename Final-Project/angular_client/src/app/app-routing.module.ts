import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
//import { asAdmin } from './guards';
import { AdminComponent } from './admin/admin.component';
import { StandardComponent } from './standard/standard.component';
import { ServiceRequestComponent } from './service_request/service-request.component';
import { ResponseValidationComponent } from './response_validation/response-validation.component';
import { ProjectTimelineComponent } from './project_timeline/project-timeline.component';
import { RequestListComponent } from './request_list/request-list.component';
import { ProgressSubmissionComponent } from './progress_submission/progress-submission.component';

const routes: Routes = [
  {path: '', component: LoginComponent, title: 'Login Page'},
  //{path: 'login', component: LoginComponent, title: 'Login Page'},
  {path: 'Admin', component: AdminComponent, title: 'Admin Access Page'},
  //{path: 'Service Request', component: ServiceRequestComponent, title: 'Service Request Page'},
  {path: 'Service-Request', component: ServiceRequestComponent, title:'Service Request Page'},
  {path: 'Response-Validation', component: ResponseValidationComponent, title:'Response Validation Page'},
  {path: 'Request-List', component: RequestListComponent, title:'Request List Page'},
  {path: 'Project-Timeline', component: ProjectTimelineComponent, title:'Project Timeline Page'},
  {path: 'Progress-Submission', component: ProgressSubmissionComponent, title:'Progress Submission Page'},
  {path: 'Standard', component: StandardComponent, title: 'Standard Page'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }



/* const routes: Routes = [
  {path: '', component: MainComponent, title: 'MAINNNNNNN'},
  {path: 'login', component: LoginComponent, title: 'Login Page', canActivate: [ asAdmin ]},
  {path: 'admin', component: AdminComponent, canActivate: [ asAdmin ]},
  //{path: 'admin', component: AdminComponent, title: 'Admin Page'},
  {path: 'standard', component: StandardComponent, title: 'User Page'},

  //canDeactivate: [ asUser ] },
  //{path: 'posts/:tag/:duration', component: NewslistComponent},
  {path: '**', redirectTo: ''}
]; */