import { Component, EventEmitter, Input, Output, OnInit  } from '@angular/core';
import { AlertService } from 'src/app/services/alert-service.service';
import { IonIcon, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
  IonChip, IonLabel, IonCardSubtitle, IonAlert, IonButton, IonInput, IonItem, 
  IonThumbnail, IonItemOption, IonSegment, IonHeader, IonToolbar, 
  IonTitle, IonContent, IonGrid, IonRow, IonCol 
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, musicalNotes,
  person, logOut, logOutOutline, logOutSharp, helpCircle, 
  helpCircleOutline, send, informationCircleOutline,
  informationCircle, settings, mail, mailOutline,
  personCircleOutline, personCircleSharp, personCircle,
} from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HelpPage } from '../buttons/help/help.page';
import { InfoPage } from '../buttons/info/info.page';
import { SettingsPage } from '../buttons/settings/settings.page';
import { FeedbackPage } from '../buttons/feedback/feedback.page';
import { SharePage } from '../buttons/share/share.page';
import { LogoutPage } from '../buttons/logout/logout.page';
import { MenuPage } from '../buttons/menu/menu.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonLabel, IonChip, IonCardContent, IonCardTitle, 
    IonCardHeader, IonCard, IonImg, IonHeader, IonToolbar, IonTitle, IonContent, 
    IonIcon, IonCardSubtitle, IonAlert, IonButton, IonInput, IonItem, IonThumbnail, 
    IonItemOption, IonSegment, HelpPage, InfoPage, SettingsPage, FeedbackPage, SharePage,
    LogoutPage, MenuPage,
  ],
})

export class Tab2Page implements OnInit{
  backFace: string= ''; 
  @Input() isFlipped: boolean = false;
  @Output() flipCard = new EventEmitter<boolean>();

  constructor(public alertService: AlertService, private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    addIcons({book, build, calculator, brush, shirt, wine, film, dice, diamond, camera, 
      chatbubbles, medkit, images, extensionPuzzle, rocket, language, cube, gameController, 
      disc, thumbsUp, thumbsDown, home, checkmarkCircle, cash, musicalNotes, person, logOut, 
      logOutOutline, logOutSharp, helpCircle, helpCircleOutline, send, informationCircle, 
      informationCircleOutline, settings, mail, mailOutline, personCircleOutline, personCircleSharp, 
      personCircle
    });
  }

  flip() {
    this.isFlipped = !this.isFlipped;
    this.flipCard.emit(this.isFlipped);
  }

  bindComponent(component: string){
  this.backFace = component;
  this.flip();
  }

  logOut() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    })
  }

  doSmthng(direction: any){
    console.log(direction)
    /*
    if(direction === 'up'){
      console.log('Smthng', direction);
    } else if(direction === 'down'){
      console.log('Smthng', direction);
    }
    */
  }
}
