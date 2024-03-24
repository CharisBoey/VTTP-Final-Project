import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadersComponent } from './headers/headers.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MainService } from './main.service';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { AdminComponent } from './admin/admin.component';
import { StandardComponent } from './standard/standard.component';
import { UserRoleStore } from './stores/userRole.store';
import { FormsModule } from '@angular/forms';
import { ServiceRequestComponent } from './service_request/service-request.component';
import { ProjectTimelineComponent } from './project_timeline/project-timeline.component';
import { ResponseValidationComponent } from './response_validation/response-validation.component';
import { RequestListComponent } from './request_list/request-list.component';
import { RequestStore } from './stores/request.store';
//import { WebcamModule } from 'ngx-webcam';
import { ProgressSubmissionComponent } from './progress_submission/progress-submission.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglemapComponent } from './googlemap/googlemap.component';


const appRoutes: Routes = [
  //change to use official way --> sunil's
  
]

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    LoginComponent,
    MainComponent,
    AdminComponent,
    StandardComponent,
    ServiceRequestComponent,
    ProjectTimelineComponent,
    ResponseValidationComponent,
    RequestListComponent,
    ProgressSubmissionComponent,
    GooglemapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    FormsModule,
    GoogleMapsModule
    //WebcamModule,
    
  ],
  providers: [MainService, UserRoleStore, RequestStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
