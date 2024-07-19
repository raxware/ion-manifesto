import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, 
  IonImg, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonCard, 
  IonGrid, IonRow, IonCol, IonLabel 
} from '@ionic/angular/standalone';

import { PhotoService } from 'src/app/services/photo.service';
import { AlertService } from 'src/app/services/alert-service.service';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, musicalNotes,
  person, trash, trashBin, pencil
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

import { ItemService } from 'src/app/services/item.service';
import { itemData } from 'src/app/model/interfaces';

import { FormBackPage } from './../form-back/form-back.page'
import { ItemCardComponent } from "../item-card/item-card.component";
import { CardBackPage } from "../card-back/card-back.page";

@Component({
  selector: 'app-card-front',
  templateUrl: './card-front.page.html',
  styleUrls: ['./card-front.page.scss'],
  standalone: true,
  imports: [IonLabel, IonCol, IonRow, IonGrid,
    IonCard, IonIcon, IonButton, IonCardTitle,
    IonCardHeader, IonImg, IonCardContent,
    IonContent, IonHeader, IonTitle, IonToolbar,
    FormsModule, FormBackPage, ItemCardComponent, CardBackPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardFrontPage implements OnInit{
  @Input({ required: true }) index!: number; 
  myThingsService = inject(ItemService);
  myThingsList: itemData[] = [];
  outputtingThing!: itemData;
  thing!: itemData;
  

  constructor(public photoService: PhotoService, public alertService: AlertService) {
  }

  ngOnInit(): void {
    this.getThings();
    addIcons({book, build, calculator, brush, shirt, 
      wine, film, dice, diamond, camera, chatbubbles, 
      medkit, images, extensionPuzzle, rocket, language, 
      cube, gameController, disc, thumbsUp, thumbsDown, 
      home, checkmarkCircle, cash, musicalNotes, person,
      trash, trashBin, pencil
    });
  }

  dummyToast(msg: string){
    this.alertService.presentToast(msg);
  }

    /** 
   ****************** CRUD LOGIC ********************************************************************************** 
  */
  getThings() {
    this.myThingsList = this.myThingsService.getThings();
    console.log(this.myThingsList);
  }
  
  saveThing(yetTaggedThing: itemData) {
    this.myThingsService.setThing(yetTaggedThing);
    this.getThings();
  }
  thingIndexer(index?: number) {
    console.log(index!);
    this.myThingsService.thingPicker(index!);
  //  this.route.navigate(['/private/edit', index]);
  }

  removeItem(index?: number) {
    console.log(index!);
    this.myThingsService.thingKicker(index!);
    this.getThings();
  }

  /* ----- Full version, with confirmation message: 
  removeItem(index: number) {
      const dialogRef = this.dialog.open(BasicDialogComponent, {
      data: {message: 'Are you sure you want to delete this thing for ever?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
      if(result) {
      
        this.myThingsService.thingKicker(index);
        this.getThings();
      }
    });
    
  }*/

}


