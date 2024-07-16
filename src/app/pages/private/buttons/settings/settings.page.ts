import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from 'src/app/services/alert-service.service';
import { addIcons } from 'ionicons';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, musicalNotes,
  person, airplane, wifi, bluetooth, call, colorPalette,
  colorPaletteSharp, colorPaletteOutline, contrast, bulb,
  megaphone, notificationsCircle, notificationsOffCircle, key,
  idCard,
} from 'ionicons/icons';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, 
  IonImg, IonRow, IonCol, IonToggle, IonList, IonItem, IonInput, 
  IonLabel, IonNote, IonIcon, IonRange, IonCheckbox, IonSegment, 
  IonSegmentButton, IonItemDivider, IonSelect, IonSelectOption,
  IonAlert
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonItemDivider, IonSegmentButton, IonSegment, IonCheckbox, 
    IonRange, IonIcon, IonNote, IonLabel, IonInput, IonItem, IonList, 
    IonToggle, IonCol, IonRow, IonImg, IonGrid, IonContent, IonHeader, 
    IonTitle, IonToolbar, CommonModule, FormsModule, IonSelect, 
    IonSelectOption, IonAlert, 
  ]
})
export class SettingsPage implements OnInit {

  constructor(public alertService: AlertService) { }

  ngOnInit() {
    addIcons({book, build, calculator, brush, shirt, wine, film, dice, diamond, camera, 
      chatbubbles, medkit, images, extensionPuzzle, rocket, language, cube, gameController, 
      disc, thumbsUp, thumbsDown, home, checkmarkCircle, cash, musicalNotes, person, airplane, 
      wifi, bluetooth, call, colorPalette, colorPaletteSharp, colorPaletteOutline, contrast, 
      bulb, megaphone, notificationsCircle, notificationsOffCircle, key, idCard, 
    });
  }

  segmentChanged(event: CustomEvent){
    let activeSegment = event.detail.value;
    this.dummyToast('Segment ' + activeSegment)
    //console.log('msg: ');
  }

  dummyToast(msg: string){
    this.alertService.presentToast('' + msg);
  }




}
