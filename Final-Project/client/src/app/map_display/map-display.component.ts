import { Component, Input, ViewChild, inject } from '@angular/core';
import { GoogleMap, MapDirectionsService } from '@angular/google-maps';
import { PlaceSearchResult } from '../models';
import { BehaviorSubject, map } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrl: './map-display.component.css'
})
export class MapDisplayComponent {

  @ViewChild('map', { static: true })
  map!: GoogleMap;

  @Input()
  location: PlaceSearchResult | undefined;

  markerPositions: google.maps.LatLng[] = [];
  zoom = 5;
  mapId: string = "MAP_ID"
  
  protected errormsg : string =''
  private mainSvc = inject(MainService)

  directionsResult$ = new BehaviorSubject< google.maps.DirectionsResult | undefined >(undefined);

  ngOnChanges() {
    this.errormsg=''

    const location = this.location?.location;

    if(location){
      this.gotoLocation(location)
      this.mainSvc.setLocationValid(true)
    } else {
      this.errormsg = "ERROR: Location not found"
      this.gotoLocation(new google.maps.LatLng({ lat: 0, lng: 0 }))
      this.mainSvc.setLocationValid(false)
    }
  }

  gotoLocation(location: google.maps.LatLng) {
    this.markerPositions = [location];
    this.map.panTo(location);
    this.zoom = 17;
    this.directionsResult$.next(undefined);
    
  }
}
