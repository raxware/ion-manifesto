import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
  IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, 
  IonIcon, IonThumbnail, IonRippleEffect, IonImg, IonButtons, IonBackButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, musicalNotes,
  person, logOut, logOutOutline, logOutSharp, helpCircle, 
  helpCircleOutline, send, informationCircleOutline,
  informationCircle, settings, mail, mailOutline, eye, create, 
  trash, 
} from 'ionicons/icons';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.page.html',
  styleUrls: ['./boxes.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonImg, IonRippleEffect, IonIcon,
    IonThumbnail, IonItemOption, IonItemOptions,
    IonLabel, IonItem, IonItemSliding, IonList,
    IonHeader, IonToolbar, IonTitle, IonContent,
  ]
})
export class BoxesPage implements OnInit {

  @Input() containerName: string='Box 1';

  public containersArray = new Array(12);

  constructor() {}

  ngOnInit(): void {
    addIcons({book, build, calculator, brush, shirt, wine, film, dice, diamond, camera, 
      chatbubbles, medkit, images, extensionPuzzle, rocket, language, cube, gameController, 
      disc, thumbsUp, thumbsDown, home, checkmarkCircle, cash, musicalNotes, person, logOut, 
      logOutOutline, logOutSharp, helpCircle, helpCircleOutline, send, informationCircle, 
      informationCircleOutline, settings, mail, mailOutline, eye, create, trash
    });
  }

}
