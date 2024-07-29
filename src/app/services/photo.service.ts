import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Platform } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private platform: Platform;

  constructor(platform: Platform) {
    this.platform = platform;
  }

  public async getBase64(imgSource: string):Promise<Photo> {
    let source: CameraSource = CameraSource.Camera;
    if (imgSource === 'gallery') { source= CameraSource.Photos;      
    } 
    const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Base64,
    source,
    quality: 90,
    allowEditing: false,
    }); return capturedPhoto;
  }

  public async addItemPicture(imgSource: string):Promise<UserPhoto> {
    // Take a photo or select it from photo gallery
    let source: CameraSource = CameraSource.Camera;
    //console.log(imgSource);
    if (imgSource === 'gallery') { source= CameraSource.Photos; } 
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source,
        quality: 100,
      });
    return await this.savePicture(capturedPhoto);
  }

  // Save picture to file on device
  private async savePicture(photo: Photo): Promise<UserPhoto> {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = 'manifesto_' + Date.now() + '.jpeg';  // construye la string 'fileName'
    //console.log(fileName, 'picture name');
    const savedFile = await Filesystem.writeFile({  // tipo WriteFileResult: 'savedFile'   
      path: fileName,                               // con el nombre dado por 'fileName'
      data: base64Data,                             // como base64,
      directory: Directory.Data                     // directorio de destino
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,                                  // filepath contiene el uri del fichero salvado en directorio local
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),     // webviewPath contiene la aruta del fichero salvado convertido a src
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,                                       // filepath contiene unicamente la string 'fileName'
        webviewPath: photo.webPath!                               // webviewPath contiene la ruta 'efímera' al fichero alocado en memoria, sin salvar
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
  webviewPath: string;
}
