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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MapAutocompleteComponent } from './map_autocomplete/map-autocomplete.component';
import { MapMapimageComponent } from './map_mapimage/map-mapimage.component';
import { MapMainComponent } from './map_main/map-main.component';
import { MaterialModuleModule } from './material/material.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { MainComponent } from './main/main.component';
import { MapDisplayComponent } from './map_display/map-display.component';
import { EvaluationComponent } from './evaluation/evaluation.component';




const appRoutes: Routes = [
  //change to use official way --> sunil's
  
]

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    LoginComponent,
    AdminComponent,
    StandardComponent,
    ServiceRequestComponent,
    ProjectTimelineComponent,
    ResponseValidationComponent,
    RequestListComponent,
    ProgressSubmissionComponent,
    MapAutocompleteComponent,
    MapMapimageComponent,
    MapMainComponent,
    MainComponent,
    MapDisplayComponent,
    EvaluationComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    FormsModule,
    MaterialModuleModule,
    GoogleMapsModule
    //WebcamModule,
    
  ],
  providers: [MainService, UserRoleStore, RequestStore, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
