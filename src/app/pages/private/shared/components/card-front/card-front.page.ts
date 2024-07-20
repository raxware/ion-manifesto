import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, inject, Input, OnInit, Output,  } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
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
  myThingsService = inject(ItemService);
  myThingsList: itemData[] = [];
  //outputtingThing!: itemData;
  thingPrototype!: FormGroup;
  //thing!: itemData;
  unit!: itemData;

  @Input({ required: true }) index!: number; 

  @Input () set thingUnit(thingToEdit: itemData){
    this.unit = thingToEdit;
    this.editFormFiller(thingToEdit);
  };
  get thingUnit (){
    return this.unit;
  }
  
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

  editFormFiller(thingToEdit: itemData){
    this.thingPrototype.patchValue({
      name: thingToEdit.name,
      maker: thingToEdit.maker,
      quantity: thingToEdit.quantity,
      status: thingToEdit.status,
      notes: thingToEdit.notes,
      id: thingToEdit.id,
      type: thingToEdit.type,
      picture: thingToEdit.picture,
      tags: thingToEdit.tags,
      barcode: thingToEdit.barcode,
    })
  }

  thingIndexer(index?: number) {
    console.log(index!);
    const thing = this.myThingsService.thingPicker(index!);
    console.log(index!);
  //  this.route.navigate(['/private/edit', index]);
    console.log('editor: ', thing );
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


