import { Component, ViewChild } from '@angular/core';
import { PlaceSearchResult } from '../models';
import { MapAutocompleteComponent } from '../map_autocomplete/map-autocomplete.component';

@Component({
  selector: 'app-map-main',
  templateUrl: './map-main.component.html',
  styleUrl: './map-main.component.css'
})
export class MapMainComponent {

  location: PlaceSearchResult = { address: '' };
  

  @ViewChild('autocomplete2')
  autocomplete2!: MapAutocompleteComponent;

  fromValue: PlaceSearchResult = { address: '' };
  toValue: PlaceSearchResult = { address: '' };
  
}
