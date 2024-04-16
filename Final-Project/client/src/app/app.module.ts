import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { RequestListComponent } from './request_list/request-list.component';
import { RequestStore } from './stores/request.store';
import { ProgressSubmissionComponent } from './progress_submission/progress-submission.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MapAutocompleteComponent } from './map_autocomplete/map-autocomplete.component';
import { MapMainComponent } from './map_main/map-main.component';
import { MaterialModuleModule } from './material/material.module';
import { GoogleMapsModule } from '@angular/google-maps';
import { MainComponent } from './main/main.component';
import { MapDisplayComponent } from './map_display/map-display.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { ScheduleDateComponent } from './schedule_date/schedule-date.component';
import { EmailComponent } from './email/email.component';

const appRoutes: Routes = []

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    StandardComponent,
    ServiceRequestComponent,
    ProjectTimelineComponent,
    RequestListComponent,
    ProgressSubmissionComponent,
    MapAutocompleteComponent,
    MapMainComponent,
    MainComponent,
    MapDisplayComponent,
    EvaluationComponent,
    ScheduleDateComponent,
    EmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    FormsModule,
    MaterialModuleModule,
    GoogleMapsModule,    
  ],
  providers: [MainService, UserRoleStore, RequestStore, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
