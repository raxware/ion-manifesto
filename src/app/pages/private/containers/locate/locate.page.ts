import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation'
import { NavController, IonContent, IonHeader, IonTitle, 
  IonToolbar, IonButtons, IonBackButton, IonFab, IonIcon, 
  IonFabList, IonFabButton, IonButton, IonGrid, IonSearchbar, 
  IonSegment, IonSegmentButton, IonLabel 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, musicalNotes, add,
  person, trash, trashBin, pencil, create, eye, code,
  sad, ellipsisVertical, ellipsisVerticalCircle, ellipseSharp,
  ellipseOutline, ellipsisVerticalCircleOutline, 
  ellipsisHorizontal, ellipsisHorizontalSharp,  
  ellipsisHorizontalCircle, ellipsisHorizontalCircleOutline,
  ellipsisHorizontalCircleSharp, ellipse, search,
  server, briefcase, archive, library, reorderFour, albums, bug,
  idCard, ellipsisVerticalCircleSharp, ellipsisHorizontalOutline,
} from 'ionicons/icons';
import {GoogleMap, MapAdvancedMarker, MapInfoWindow} from "@angular/google-maps";
import { AlertService } from 'src/app/services/alert-service.service';

@Component({
  selector: 'app-locate',
  templateUrl: './locate.page.html',
  styleUrls: ['./locate.page.scss'],
  standalone: true,
  imports: [MapInfoWindow, GoogleMap, MapAdvancedMarker, 
    IonLabel, IonSegmentButton, IonSegment, IonSearchbar, 
    IonGrid, IonButton, IonFabButton, IonFabList, IonIcon, 
    IonFab, IonBackButton, IonButtons, IonContent, IonHeader, 
    IonTitle, IonToolbar, FormsModule, 
  ],
})

export class LocatePage implements OnInit{

  center: google.maps.LatLngLiteral = {lat: 0, lng: 0};

  @Input() display!: google.maps.LatLngLiteral;
  @Input() options!: google.maps.MapOptions;

  constructor(public alertService: AlertService, private navCtrl: NavController,) {
    this.loadMarker(); 
    addIcons({book, build, calculator, brush, shirt, 
      wine, film, dice, diamond, camera, chatbubbles, 
      medkit, images, extensionPuzzle, rocket, language, 
      cube, gameController, disc, thumbsUp, thumbsDown, 
      home, checkmarkCircle, cash, musicalNotes, person,
      trash, trashBin, pencil, create, eye, code, add,
      sad, ellipse, ellipsisVertical, ellipsisVerticalCircle, 
      ellipseSharp, ellipseOutline, ellipsisVerticalCircleOutline, 
      ellipsisVerticalCircleSharp,ellipsisHorizontal, 
      ellipsisHorizontalSharp, ellipsisHorizontalOutline, 
      ellipsisHorizontalCircle, ellipsisHorizontalCircleOutline,
      ellipsisHorizontalCircleSharp, search, server, briefcase, archive, 
      library, reorderFour, albums, bug, idCard
    });
  }

  async loadMarker() {
    this.advancedMarkerElement = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
    this.showMap = true;
  }

  pinFlags = [
    {
      address: '',
      title: '',
      reference: '',
      geoCoordinates: {lat: 41.4036299, lng: 2.1743558}
    },
  ];

  advancedMarkerElement!: google.maps.MarkerLibrary;
  showMap = false;

  ngOnInit() {
   this.initMap();
  }

  async initMap() {
    const location: google.maps.LatLngLiteral = await this.getCurrentLocation();
    this.center = location;
    this.display = location;

    this.options = {
      zoom: 12
    };
  }

  openInfoWindow(marker: any, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }

  getPinElement() {
    const testPin = new this.advancedMarkerElement.PinElement({
      scale: 1.5,
      glyphColor: 'white',
    });
    return testPin.element;
  }

  getCurrentLocation(): Promise<google.maps.LatLngLiteral> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              console.log(
                'Latitude: ' +
                position.coords.latitude +
                'Longitude: ' +
                position.coords.longitude
              );
              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const location = {
                lat,
                lng,
              };
              resolve(location);
            }
          },
          (error) => console.log(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }


  toolbarShowHide(tbarToggle: string) {
    const searchToolbar = document.getElementById('searchToolbar');
    const segToolbar = document.getElementById('segToolbar');
    if (tbarToggle === 'searchToolbar'){
      if (segToolbar!.style.display === 'flex'){segToolbar!.style.display = 'none';}
      if (searchToolbar!.style.display === 'none') {searchToolbar!.style.display = 'flex';
      } else if (searchToolbar!.style.display === 'flex') {searchToolbar!.style.display = 'none';}
    } 
    else if(tbarToggle === 'segToolbar') {
      if (searchToolbar!.style.display === 'flex'){searchToolbar!.style.display = 'none';}
      if (segToolbar!.style.display === 'none') {segToolbar!.style.display = 'flex';
      } else if (segToolbar!.style.display === 'flex') {segToolbar!.style.display = 'none';}
    }
  }

  segmentChanged(event: CustomEvent){
    let activeSegment = event.detail.value;
    this.dummyToast('Segment ' + activeSegment)
    //console.log('msg: ');
  }

  dummyToast(msg: string){
    this.alertService.presentToast(msg);
  }

}


