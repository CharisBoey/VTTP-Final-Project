import { Component } from '@angular/core';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrl: './googlemap.component.css'
})
export class GooglemapComponent {

  center = { lat: 51.5074, lng: -0.1278 };

  zoom = 12; 
  
  options: google.maps.MapOptions = {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    fullscreenControl: false,
    streetViewControl: false,
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    }
  };


}