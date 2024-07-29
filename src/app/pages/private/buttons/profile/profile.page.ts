
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert-service.service';
import { PhotoService } from 'src/app/services/photo.service';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
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
  IonTitle, IonToolbar, IonAvatar, IonToggle, ModalController, 
} from "@ionic/angular/standalone";
import { userData } from 'src/app/model/interfaces';
import { ModalProfilePage } from 'src/app/pages/private/shared/components/modal-profile/modal-profile.page'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, IonIcon, IonButton, IonCol, IonRow, 
    IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, 
    FormsModule, IonAvatar, IonToggle, IonItem, IonChip, IonLabel,
    ModalProfilePage, IonCard, IonCardContent,
  ]
})
export class ProfilePage implements OnInit{
  user!: userData;
  usrImage: string = '';
  usrEmail: string = '';
  usrName: string = 'Name or nickname';

  userAvatar: boolean = false;
  logoutOpt: boolean = false;
  disabled: boolean = true;

  backFace: string= ''; 
  @Input() isFlipped: boolean = false;
  @Output() flipCard = new EventEmitter<boolean>();

  message = '';

  constructor(
    private modalCtrl: ModalController,
    private alertService: AlertService, 
    private authService: AuthService, 
    private router: Router,
    private photoService: PhotoService,
    private storageService: StorageService,
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
        this.usrEmail = user.email;
        this.usrImage = user.avatarImg || '';
        if (this.usrImage !== ''){this.userAvatar = true} else {this.userAvatar = false};
      });
    }
  ngOnInit(): void {}

  /** ****************** LOGIC FOR CARD INTERFACE BEGINS HERE *************************** */

  flip() {
    this.isFlipped = !this.isFlipped;
    this.flipCard.emit(this.isFlipped);
  }
  bindComponent(component: string){
  this.backFace = component;
  this.flip();
  }
  logoutBtn(event: CustomEvent) {
    this.logoutOpt = !this.logoutOpt;
    const hiddenBtn = document.getElementById('logoutBtn');
    if (this.logoutOpt === true){hiddenBtn!.style.display = 'flex'}
    else {hiddenBtn!.style.display = 'none'}
  }
  editProfile(event: CustomEvent) {
    this.disabled = !this.disabled;
    //if (this.disabled === true){}
    //else {}
  }
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalProfilePage,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
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
		const image = await this.photoService.getBase64(imgSource);
		if (image) {
      const imgBase64String = image.base64String;
			const loading = await this.loadingController.create();
			await loading.present();
			const result = await this.storageService.uploadAvatarImage(image);
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
