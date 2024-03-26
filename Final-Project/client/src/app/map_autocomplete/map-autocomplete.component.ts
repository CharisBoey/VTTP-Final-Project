import { Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import { PlaceSearchResult } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-map-autocomplete',
  templateUrl: './map-autocomplete.component.html',
  styleUrl: './map-autocomplete.component.css'
})
export class MapAutocompleteComponent {

  
  @ViewChild('inputField')
  inputField!: ElementRef;

  @Input() 
  placeholder = 'Enter location...';

  @Output() 
  placeChanged = new Subject<PlaceSearchResult>();

  autocomplete: google.maps.places.Autocomplete | undefined;

  listener: any;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement
    );

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete?.getPlace();
        const result: PlaceSearchResult = {
          address: this.inputField.nativeElement.value,
          name: place?.name,
          location: place?.geometry?.location,
          imageUrl: this.getPhotoUrl(place),
          iconUrl: place?.icon,
        };

        this.placeChanged.next(result);
      });
    });
  }

  getPhotoUrl(
    place: google.maps.places.PlaceResult | undefined
  ): string | undefined {
    return place?.photos && place?.photos.length > 0
      ? place?.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }

  ngOnDestroy() {
    if (this.autocomplete) {
      google.maps.event.clearInstanceListeners(this.autocomplete);
    }
  }

  // locationDetails(){
  //   console.log(">>>Location: ",this.inputField.nativeElement.value)

  // }
  

  
}
