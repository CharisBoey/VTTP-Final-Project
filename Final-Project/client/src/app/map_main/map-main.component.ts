import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { PlaceSearchResult } from '../models';
import { MapAutocompleteComponent } from '../map_autocomplete/map-autocomplete.component';
import { MainService } from '../main.service';

@Component({
  selector: 'app-map-main',
  templateUrl: './map-main.component.html',
  styleUrl: './map-main.component.css'
})
export class MapMainComponent{

  location: PlaceSearchResult = { address: '' };
  locationReset: PlaceSearchResult = { address: '' };


  @ViewChild('autocomplete2')
  autocomplete2!: MapAutocompleteComponent;
  
}
