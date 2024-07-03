import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { IonIcon, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonLabel } from '@ionic/angular/standalone';
import { PhotoService } from 'src/app/services/photo.service';
import { Item } from 'src/app/model/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { addIcons } from 'ionicons';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, musicalNotes,
  person, logOut, logOutOutline, logOutSharp, helpCircle, 
  helpCircleOutline, send, informationCircleOutline,
  informationCircle, settings, mail, mailOutline
} from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonLabel, IonChip, IonCardContent, IonCardTitle, 
    IonCardHeader, IonCard, IonImg, IonHeader, IonToolbar, 
    IonTitle, IonContent, IonIcon,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab2Page {
  currentCardFlipped: boolean = false;
  allowSlideCard: boolean = true;
  currentPics: string[] = [];
  slides: Item[] = [
    {
      id: 1,
      name: 'name1',
      maker: '',
      picture: '../../assets/book2.jpeg',
      type: 'type1',
      quantity: 1,
      tags: ['test1', 'test2']
    },
    {
      id: 2,
      name: 'name2',
      maker:'',
      picture: '',
      type: 'type2',
      quantity: 2,
      tags: ['test']
    },
    {
      id: 3,
      name: 'name3',
      maker:'',
      picture: '',
      type: 'type3',
      quantity: 3,
      tags: []
    }];

  constructor (private authService: AuthService,
    private router: Router)  {
      addIcons({book, build, calculator, brush, shirt, wine, film, dice, diamond, camera, 
        chatbubbles, medkit, images, extensionPuzzle, rocket, language, cube, gameController, 
        disc, thumbsUp, thumbsDown, home, checkmarkCircle, cash, musicalNotes, person, logOut, 
        logOutOutline, logOutSharp, helpCircle, helpCircleOutline, send, informationCircle, 
        informationCircleOutline, settings, mail, mailOutline
      });
    }

  flip(isFlipped: boolean) {
    this.currentCardFlipped = isFlipped;
    this.allowSlideCard = !isFlipped;
  }

  editForm(i: number) {
    console.log(this.slides[i], 'press on name');
  }

  openCamera(i: number) {
    console.log(this.slides[i], 'press on picture');
  }


  addToCointainer(i: number) {
    console.log(this.slides[i], 'swipeup');
  }

  openMenu(i: number) {
    console.log(this.slides[i], 'swipedown');
  }

  logOut() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    })
  }
}
