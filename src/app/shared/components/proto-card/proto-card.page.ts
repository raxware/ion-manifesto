import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert-service.service';
import { addIcons } from 'ionicons';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, musicalNotes,
  person, 
} from 'ionicons/icons';
import { IonIcon, IonImg, IonCard, IonCardHeader, IonCardTitle, 
  IonCardContent, IonChip, IonLabel, IonCardSubtitle, IonAlert, 
  IonButton, IonInput, IonItem, IonThumbnail, IonItemOption, IonCol, IonRow, IonGrid, IonCheckbox } from "@ionic/angular/standalone";

@Component({
  selector: 'app-proto-card',
  templateUrl: './proto-card.page.html',
  styleUrls: ['./proto-card.page.scss'],
  standalone: true,
  imports: [IonCheckbox, IonGrid, IonRow, IonCol, IonButton, IonAlert, IonCardSubtitle, IonLabel, 
    IonChip, IonCardContent, IonCardTitle, IonCardHeader, 
    IonCard, IonImg, IonInput, IonIcon, IonItem, IonThumbnail, 
    IonItemOption,
  ],
})

export class ProtoCardPage implements OnInit{

  @Input() isFlipped: boolean = false;
 
  @Output() flipCard = new EventEmitter<boolean>();
  
  constructor(public alertService: AlertService) {}
  ngOnInit(): void {
    addIcons({book, build, calculator, brush, shirt, wine, film, dice, diamond, camera, 
      chatbubbles, medkit, images, extensionPuzzle, rocket, language, cube, gameController, 
      disc, thumbsUp, thumbsDown, home, checkmarkCircle, cash, musicalNotes, person}
    );
  }

  flip() {
    this.isFlipped = !this.isFlipped;
    this.flipCard.emit(this.isFlipped);
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

