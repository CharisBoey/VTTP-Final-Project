import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-progress-submission',
  templateUrl: './progress-submission.component.html',
  styleUrl: './progress-submission.component.css'
})
export class ProgressSubmissionComponent {

  /* private fb = inject(FormBuilder)
  protected progressSubmissionForm!: FormGroup
  
  private createProgressSubmissionForm(): FormGroup{
    return this.fb.group({
      requestID: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      contractorName: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      completionDate: this.fb.control<string>('', [Validators.required]),
      photo: this.fb.control('', [Validators.required]),
    })
  } */
}
