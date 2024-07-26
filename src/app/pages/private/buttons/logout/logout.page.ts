
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from 'src/app/services/alert-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { PhotoService } from 'src/app/services/photo.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LoadingController } from '@ionic/angular';
import { AvatarService } from 'src/app/services/avatar.service';

import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, musicalNotes, person,
  logOut, helpCircle, helpCircleOutline, informationCircle,
  informationCircleOutline, logOutOutline, logOutSharp, mail,
  mailOutline, send, settings, 
} from 'ionicons/icons';
import { IonIcon, IonImg, IonCard, IonCardHeader, IonCardTitle, 
  IonCardContent, IonChip, IonLabel, IonCardSubtitle, IonAlert, 
  IonButton, IonInput, IonItem, IonThumbnail, IonItemOption, 
  IonCol, IonRow, IonGrid, IonCheckbox, IonContent, IonHeader, 
  IonTitle, IonToolbar, IonAvatar, 
} from "@ionic/angular/standalone";
import { userData } from 'src/app/model/interfaces';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonButton, IonCol, IonRow, IonGrid, 
    IonContent, IonHeader, IonTitle, IonToolbar, 
    FormsModule, IonAvatar
  ]
})
export class LogoutPage implements OnInit{
  user!: userData;
  usrImage: string = '';
  userAvatar: boolean = false;

  backFace: string= ''; 
  @Input() isFlipped: boolean = false;
  @Output() flipCard = new EventEmitter<boolean>();

  constructor(
    public alertService: AlertService, 
    private authService: AuthService, 
    private router: Router,
    private photoService: PhotoService,
    private avatarService: AvatarService,
    private userService: UserService,
		private loadingController: LoadingController,
  ){
      addIcons({book, build, calculator, brush, shirt, wine, film, dice, diamond, camera, 
        chatbubbles, medkit, images, extensionPuzzle, rocket, language, cube, gameController, 
        disc, thumbsUp, thumbsDown, home, checkmarkCircle, cash, musicalNotes, person, logOut, 
        logOutOutline, logOutSharp, helpCircle, helpCircleOutline, send, informationCircle, 
        informationCircleOutline, settings, mail, mailOutline
      });
      this.userService.getUser().subscribe((user: userData) => {
        this.user = user;
        this.usrImage = user.avatarImg || '';
        if (this.usrImage !== ''){this.userAvatar = true} else {this.userAvatar = false};
      });
    }
  ngOnInit(): void {
  }

  /** ****************** LOGIC FOR CARD INTERFACE BEGINS HERE *************************** */
  flip() {
    this.isFlipped = !this.isFlipped;
    this.flipCard.emit(this.isFlipped);
  }

  bindComponent(component: string){
  this.backFace = component;
  this.flip();
  }
  /** ****************** LOGIC FOR CARD INTERFACE ENDS HERE *************************** */
  /** ****************** LOGIC FOR AVATAR BEGINS HERE *************************** */

  changeImage(){
    this.alertService.basicAlert(
      'Image Source', '', '',
      [{text: 'Photo Gallery', handler: () => { this.getImage('gallery');  }},
      {text: 'Camera', handler: () => { this.getImage('camera'); }},
      {text: 'Cancel', role: 'cancel', handler: (alertData: any) => { console.log('addImg cancel', alertData); }}],
    );
  }

  async getImage(imgSource: string) {

    /*

    this.photoService.getBase64(imgSource).then((value) => {
      if (value.webviewPath && this.item) {
        this.thingPicture = this.item.picture = value.webviewPath;
        if ((this.thingType === 'Type')){
          this.addType();
        }
      }
    });
  }
    
    */

		const image = await this.photoService.getBase64(imgSource);
    /*
    await Camera.getPhoto({
			quality: 90,
			allowEditing: false,
			resultType: CameraResultType.Base64,
			source: CameraSource.Photos // Camera, Photos or Prompt!
		});
    */

		if (image) {
      const imgBase64String = image.base64String;

			const loading = await this.loadingController.create();
			await loading.present();

			const result = await this.avatarService.uploadImage(image);
      if (result) this.usrImage = result; loading.dismiss();
			if (!result) { this.dummyAlert('Upload failed', '', 'There was a problem uploading your avatar.', [{text: 'Ok'}] ); }
		}
	}

  /** ****************** LOGIC FOR AVATAR ENDS HERE *************************** */
  /** ****************** LOGIC FOR SESSION BEGINS HERE *************************** */
    logOut() {
      this.authService.logout().then(() => {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      })
    }

  /*  
  async logOut() {
		await this.authService.logout();
		this.router.navigateByUrl('/', { replaceUrl: true });
	}
  */
  /** ****************** LOGIC FOR SESSION ENDS HERE *************************** */

  dummyAlert(head: string, sub: string, msg: string, btn: any){
    this.alertService.basicAlert(head, sub, msg, [{text: btn}]);
  }

}
