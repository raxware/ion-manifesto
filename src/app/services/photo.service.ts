import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }

  public async picFromCamera():Promise<UserPhoto> {
    // Take a photo
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      })
    return await this.savePicture(capturedPhoto);
  }
  public async picFromGallery():Promise<UserPhoto> {
    // Select photo from gallery
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
        quality: 100
      })
    return await this.savePicture(capturedPhoto);
  }

/*---------------------------------------------DISCUSS WITH RAMÓN---------------------------------------------*/
/*
  public async addItemPicture(imgSource: string):Promise<UserPhoto> {
    // Take a photo or select it from photo gallery
    if (imgSource === 'camera') {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
//        width: 374,
//        height: 374,
      });
    } 
  //  else if (imgSource === 'gallery') {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
        quality: 100,
//        width: 374,
//        height: 374,
      });
  //}
    return await this.savePicture(capturedPhoto);
  }
*/
  /*
    public async addItemPicture(imgSource: string):Promise<UserPhoto> {
    // Take a photo or select it from photo gallery
    let capturedPhoto: Photo;
    switch (imgSource){
      case 'camera': capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      }); break;
      case 'gallery': capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
        quality: 100
      }); break;
    }
    return await this.savePicture(capturedPhoto: Photo)
  }
  */
 /*---------------------------------------------------------------------------------------------------------*/

  // Save picture to file on device
  private async savePicture(photo: Photo): Promise<UserPhoto> {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = 'manifesto_' + Date.now() + '.jpeg';
    //console.log(fileName, 'picture name');
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath
      };
    }
  }

  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path!
      });
      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
