import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
declare var createGoogleEvent: any;
declare var gapiLoaded: any;

@Component({
  selector: 'app-schedule-date',
  templateUrl: './schedule-date.component.html',
  styleUrl: './schedule-date.component.css'
})
export class ScheduleDateComponent implements OnInit{
  
  private fb = inject(FormBuilder)
  protected scheduleForm!: FormGroup
  protected requestId!: string;
  protected locationaddress!: string;
  protected message: string='';
  private router = inject(Router)
  activatedRoute = inject(ActivatedRoute);
  username: string = this.activatedRoute.snapshot.params['username'];

  ngOnInit() {
    this.scheduleForm = this.createScheduleForm()  
    
    this.activatedRoute.queryParams.subscribe(params => {
      this.requestId = params['requestId'];
      this.locationaddress = params['locationaddress'];
    });
    console.log(">>>", this.requestId, this.locationaddress);
    
    gapiLoaded()

  }

  private createScheduleForm(): FormGroup{
    return this.fb.group({
      summary: ['', Validators.required],
      details: ['', Validators.required],
      scheduleTime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    })
  }
  
  isInvalid(dateInputString: string): boolean{
    const dateNow = new Date()
    const dateInput = new Date(dateInputString)
      if(dateInput<dateNow){
        this.message = "Invalid Date, must be future date"
      } else {
        this.message = ""
      }
    return this.scheduleForm.invalid || dateInput < dateNow
  }

  scheduleMeeting() {
    let scheduleTime = new Date(this.scheduleForm.value.scheduleTime);
    const startTime = scheduleTime.toISOString().slice(0, 18) + '+08:00';
    const endTime = this.getEndTime(scheduleTime);
    const eventDetails = {
      summary:  "[" + this.requestId + "] " + this.scheduleForm.value.summary,
      location: this.locationaddress,
      details: this.scheduleForm.value.details,
      email: this.scheduleForm.value.email,
      startTime: startTime,
      endTime: endTime,
    };
    console.info(eventDetails);
    try {
      createGoogleEvent(eventDetails);
      this.router.navigate(['/Standard', this.username, 'Request-List']);
    } catch (error) {
      alert("Unsuccessful, try again")
    }
  }

  getEndTime(scheduleTime: Date) {
    // Add one hour to the date
    scheduleTime.setHours(scheduleTime.getHours() + 1);
    const endTime = scheduleTime.toISOString().slice(0, 18) + '+08:00';
    return endTime;
  }

  generateICSFile() {
    const datetimeValue = this.scheduleForm.value.scheduleTime;
    const date = new Date(datetimeValue);
    const endTime = new Date(date);
    endTime.setHours(endTime.getHours() + 1);
    const formattedStartDate = date
      .toISOString()
      .replace(/-/g, '')
      .replace(/:/g, '')
      .slice(0, -5);
    const formattedEndDate = endTime
      .toISOString()
      .replace(/-/g, '')
      .replace(/:/g, '')
      .slice(0, -5);
    const eventName = 'name';
    const eventDescription = 'description';
    const location = 'location';
    const icsContent = `BEGIN:VCALENDAR
    VERSION:2.0
    BEGIN:VEVENT
    DTSTAMP:${formattedStartDate}Z
    DTSTART:${formattedStartDate}Z
    DTEND:${formattedEndDate}Z
    SUMMARY:${eventName}
    DESCRIPTION:${eventDescription}
    LOCATION:${location}
    END:VEVENT
    END:VCALENDAR`;
    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'event.ics';
    downloadLink.click();
  }

}
