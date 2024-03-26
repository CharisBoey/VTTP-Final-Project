import { Component, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { GoogleMap, MapDirectionsService } from '@angular/google-maps';
import { PlaceSearchResult } from '../models';
import { BehaviorSubject, map } from 'rxjs';
import { MainService } from '../main.service';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrl: './map-display.component.css'
})
export class MapDisplayComponent implements OnInit{

  @ViewChild('map', { static: true })
  map!: GoogleMap;

  @Input()
  location: PlaceSearchResult | undefined;

  markerPositions: google.maps.LatLng[] = [];
  zoom = 5;
  mapId: string = "MAP_ID"
  
  protected errormsg : string =''
  private mainSvc = inject(MainService)


  directionsResult$ = new BehaviorSubject<
    google.maps.DirectionsResult | undefined
  >(undefined);

  constructor(private directionsService: MapDirectionsService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.errormsg=''

    const location = this.location?.location;
    //const toLocation = this.to?.location;

    if(location){
      this.gotoLocation(location)
      this.mainSvc.setLocationValid(true)
    } else {
      this.errormsg = "ERROR: Location not found"
      this.gotoLocation(new google.maps.LatLng({ lat: 0, lng: 0 }))
      this.mainSvc.setLocationValid(false)
    }

    // if (fromLocation && toLocation) {
    //   this.getDirections(fromLocation, toLocation);
    // } else if (fromLocation) {
    //   this.gotoLocation(fromLocation);
    // } else if (toLocation) {
    //   this.gotoLocation(toLocation);
    // }
  }

  gotoLocation(location: google.maps.LatLng) {
    this.markerPositions = [location];
    this.map.panTo(location);
    this.zoom = 17;
    this.directionsResult$.next(undefined);
    
  }

  getDirections(
    fromLocation: google.maps.LatLng,
    toLocation: google.maps.LatLng
  ) {
    const request: google.maps.DirectionsRequest = {
      destination: toLocation,
      origin: fromLocation,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService
      .route(request)
      .pipe(map((response) => response.result))
      .subscribe((res) => {
        this.directionsResult$.next(res);
        this.markerPositions = [];
      });
  }

}
