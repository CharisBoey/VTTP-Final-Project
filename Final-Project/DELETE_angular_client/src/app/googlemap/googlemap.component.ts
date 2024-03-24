import { Component, OnInit, Output, ViewChild, inject } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrl: './googlemap.component.css'
})
export class GooglemapComponent implements OnInit {
  

  @ViewChild('searchtext') 
  searchtext: any;

  @Output()
  searchQ = new Subject<string>()

  protected searchinput: string = ''
  private fb = inject(FormBuilder)
  protected searchForm!: FormGroup
  
  private createSearch(): FormGroup{
    return this.fb.group({
      search: this.fb.control<string>('')
    })
  }

  ngOnInit(): void {
    this.searchForm = this.createSearch()
  }


  sub(){
    console.log("Change>>> ",this.searchForm.value)
    this.searchinput = this.searchForm.value
    //this.searchQ.next(this.searchinput)
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.searchtext.nativeElement,
        {
            componentRestrictions: { country: 'SG' },
            types: [this.searchtext]  // 'establishment' / 'address' / 'geocode'
        });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        //this.searchQ.next(place)
        console.log("MMM", place)
    });
}

}


// center = { lat: 51.5074, lng: -0.1278 };

  // zoom = 12; 
  
  // options: google.maps.MapOptions = {
  //   mapTypeId: google.maps.MapTypeId.ROADMAP,
  //   fullscreenControl: false,
  //   streetViewControl: false,
  //   zoomControl: true,
  //   zoomControlOptions: {
  //     position: google.maps.ControlPosition.TOP_RIGHT
  //   }
  // };
  // private fb = inject(FormBuilder)
  // protected searchForm!: FormGroup
  
  // private createSearch(): FormGroup{
  //   return this.fb.group({
  //     search: this.fb.control<string>('')
  //   })
  // }

  // ngOnInit(): void {
  //   this.searchForm = this.createSearch()
  // }

  // sub(){
  //   console.log("Change>>> ",this.searchForm.value)
  // }

  // constructor(geocoder: MapGeocoder) {
  //   geocoder.geocode({
  //     address: '1600 Amphitheatre Parkway, Mountain View, CA'
  //   }).subscribe(({results}) => {
  //     console.log(results);
  //   });
  // }


  //---------------------------------------

//   apiLoaded!: Observable<boolean>;
//   options!: google.maps.MapOptions;
//   //markerOptions!: google.maps.MarkerOptions;
//   //markerPositions!: google.maps.LatLngLiteral[];


//   //isLoading: boolean = true;

//   //service = inject(CommcatService);
// //  mapSub$!: Subscription;
//   //markerSub$!: Subscription;

//   // @ViewChild(MapInfoWindow)
//   // infoWindow!: MapInfoWindow;

//   ngOnInit(): void {

//     // this.mapSub$ = this.service.getCoordinates().subscribe({
//     //   next: (result) => {
//     //     this.markerPositions = result.map(item => ({
//     //       lat: item.lat,
//     //       lng: item.lng
//     //     }))
//     //   },
//     //   error: (err) => { console.log(err); },
//     //   complete: () => { this.mapSub$.unsubscribe(); }
//     // });

//     this.searchForm = this.createSearch()

//     this.loadGoogleMapsApi().subscribe(() => {
//       this.apiLoaded = of(true);

//       this.options = {
//         mapId: 'b155309acfe67a51',
//         center: { lat: 1.34, lng: 103.82 },
//         zoom: 11.5,
//         disableDefaultUI: true
//       };
//     })
//   }

//   private fb = inject(FormBuilder)
//   protected searchForm!: FormGroup
  
//   private createSearch(): FormGroup{
//     return this.fb.group({
//       search: this.fb.control<string>('')
//     })
//   }

//   sub(){
    
//       console.log("Change>>> ",this.searchForm.value)
//     }

//   loadGoogleMapsApi(): Observable<void> {
//     return new Observable<void>((observer) => {
//       const script = document.createElement('script');
//       script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDSXOg-emPOlzRnb2Z-d5Js9l_6Hy4BCRg';
//       script.async = true;
//       script.defer = true;

//       script.onload = () => {
//         observer.next();
//         observer.complete();
//       };

//       script.onerror = (error) => {
//         observer.error(error);
//       };

//       document.body.appendChild(script);
//     });
//   }

//   loadAutocomplete(): void {
//     const autocomplete = new google.maps.places.Autocomplete(
//       document.getElementById('search') as HTMLInputElement
//     );
  
//     autocomplete.addListener('place_changed', () => {
//       const place = autocomplete.getPlace();
//       // Use the place object to retrieve location details
//       console.log("Selected Place:", place);
//     });
//   }