import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Geolocation } from '@capacitor/geolocation'
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import {GoogleMap, MapAdvancedMarker, MapInfoWindow} from "@angular/google-maps";

@Component({
  selector: 'app-locate',
  templateUrl: './locate.page.html',
  styleUrls: ['./locate.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, 
    IonToolbar, CommonModule, FormsModule,
    MapInfoWindow, GoogleMap, MapAdvancedMarker,
  ],
})

export class LocatePage implements OnInit{

  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };
  display!: google.maps.LatLngLiteral;
  options!: google.maps.MapOptions;

  constructor() { }

  pinFlags = [
    {
      address: '',
      title: '',
      reference: '',
      geoCoordinates: {lat: 41.4036299, lng: 2.1743558}
    },
  ];

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

}


