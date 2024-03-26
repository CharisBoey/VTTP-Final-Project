import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-response-validation',
  templateUrl: './response-validation.component.html',
  styleUrl: './response-validation.component.css'
})
export class ResponseValidationComponent {
  activatedRoute = inject(ActivatedRoute);
  username: string = this.activatedRoute.snapshot.params['username'];
}
