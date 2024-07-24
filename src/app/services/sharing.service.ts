import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { Share } from '@capacitor/share';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

  constructor(private http:  HttpClient, ) {}

  async basicShare(){
    await Share.share({
      title: 'See cool stuff',
      text: 'Really awesome thing you need to see right meow',
      url: 'http://ionicframework.com/',
      dialogTitle: 'Share with buddies',
    });
  };

  // Share text only
  async shareText(msg: string){
    await Share.share({
      text: msg,
    });
  };

  // Share url only
  async shareURL(){
    await Share.share({
      url: 'http://ionicframework.com/',
    });
  }

  // Share local file using url parameter
  async shareLocalFilePath(){
    const options = {resultType: CameraResultType.Uri,source: CameraSource.Camera,quality: 100,};
    const photo = await Camera.getPhoto(options);
    await Share.share({url: photo.path, });
  };

  // Share multiple files using files parameter
  async shareLocalFile(){
    const options = {resultType: CameraResultType.Uri,source: CameraSource.Camera,quality: 100,};
    const { photos } = await Camera.pickImages(options);
    await Share.share({files: photos.map(photo => photo.path!), });
  };

  /*async shareImageX(){

  }

  async shareLocalFileX(){

  }*/




}
