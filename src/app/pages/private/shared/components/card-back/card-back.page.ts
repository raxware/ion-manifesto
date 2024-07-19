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

@Component({
  selector: 'app-card-back',
  templateUrl: './card-back.page.html',
  styleUrls: ['./card-back.page.scss'],
  standalone: true,
  imports: [IonLabel, IonCol, IonRow, IonGrid, 
    IonCard, IonIcon, IonButton, IonCardTitle, 
    IonCardHeader, IonImg, IonCardContent, 
    IonContent, IonHeader, IonTitle, IonToolbar, 
    FormsModule, FormBackPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardBackPage implements OnInit{

  myThingsService = inject(ItemService);
  myThingsList: itemData[]=[];
 
  @Input() isFlipped: boolean = false;
  @Input() item?: itemData;
 
  @Output() flipCard = new EventEmitter<boolean>();

  @Input() thingMaker?: string;
  @Input() thingName?: string;
  @Input() typeIcon?: string;

  constructor(public photoService: PhotoService, public alertService: AlertService) {}

  slides: itemData[] = [
    {
      id: 1,
      name: '',
      maker: '',
      picture: '',
      type: '',
      quantity: 1,
      status: '',
      tags: ['#unboxed', '#audio'],
      barcode: '',
      notes: '',
    },
  ];

  ngOnInit(): void {
    this.getThings();
    /*    this.item!.name = 'Name';
      this.item!.type = 'Type';
      this.item?.picture;
      this.item!.maker = 'Name';

      this.thingName = '';
      this.typeIcon ='cube';
    */
    addIcons({book, build, calculator, brush, shirt, 
      wine, film, dice, diamond, camera, chatbubbles, 
      medkit, images, extensionPuzzle, rocket, language, 
      cube, gameController, disc, thumbsUp, thumbsDown, 
      home, checkmarkCircle, cash, musicalNotes, person,
      trash, trashBin, pencil
    });
  }

  flip() {
    this.isFlipped = !this.isFlipped;
    this.flipCard.emit(this.isFlipped);
  }
  
  addImage(){
    if (!(this.item!.picture =='')){
      this.alertLocked();
    }else{
      this.editImage();
    }
  }
  editImage(){
    this.alertService.basicAlert(
      'Image Source', '', '',
      [{text: 'Photo Gallery', handler: () => { this.openCamera('gallery');  }},
      {text: 'Camera', handler: () => { this.openCamera('camera'); }},
      {text: 'Cancel', role: 'cancel', handler: (alertData: any) => { console.log('addImg cancel', alertData); }}],
      ''
    );
  }
  
  openCamera(imgSource: string) {

      this.photoService.addItemPicture(imgSource).then((value) => {
        if (value.webviewPath && this.item) {
          this.item.picture = value.webviewPath;
          if ((this.item!.type === 'Type')){
          this.addType();
          //console.log(this.item!.picture);
          }
        }
      });
  }

  alertLocked(){
    this.alertService.basicAlert(
      'Meant to edit?', 'Double click the card!', 'Then, press the item\'s icon or its thumbnail',
      [{text: 'Ok'}],
      ''
    );
  }

  addType(){
    if ((this.item!.type === 'Type')){
      this.openType();
    } else{
      this.alertLocked();
    }
  }
  openType(){
    this.alertService.inputAlert(
      'What kind of Item is this?',
      [{ label: 'Music', type: 'radio', value: 'Album' },
       { label: 'Book', type: 'radio', value: 'Book' }, 
       { label: 'Tools', type: 'radio', value: 'Tools' },
       { label: 'Cloth', type: 'radio', value: 'Cloth' },
       { label: 'Comic', type: 'radio', value: 'Comic' },
       /*
       { label: 'Comic', type: 'radio', value: 'Comic' },
       { label: 'Wine', type: 'radio', value: 'Wine'},
       { label: 'Currency', type: 'radio', value: 'Currency'},
       { label: 'Human', type: 'radio', value: 'Human' },
       */
      ],
      [{text: 'Cancel', role: 'cancel', handler: (alertData: string) => { this.item!.type = 'undefined'; console.log('addType cancel', alertData); }}, 
       {text: 'Ok', handler: (alertData: string) => { this.item!.type = alertData; this.typeSelector(this.item!.type);}}
      ]
    )
  }
  typeSelector(sellectedType: string){
    switch (sellectedType){
      case "Album": this.typeIcon = 'disc'; this.thingMaker = 'Artist'; this.thingName = sellectedType ; break;
      case "Book": this.typeIcon = 'book'; this.thingMaker = 'Author'; this.thingName = sellectedType ; break;
      case "Tools": this.typeIcon = 'build'; this.thingMaker = 'Brand'; this.thingName = sellectedType ; break;
      case "Cloth": this.typeIcon = 'shirt'; this.thingMaker = "Brand"; this.thingName = sellectedType ; break;
      case "Comic": this.typeIcon = 'chatbubbles'; this.thingMaker = "Author"; this.thingName = sellectedType ; break;
      case "Wine": this.typeIcon = 'wine'; this.thingMaker = "Producer"; this.thingName = sellectedType ; break;
      case "Currency": this.typeIcon = 'cash'; this.thingMaker = "Country"; this.thingName = sellectedType ; break;
      case "Human": this.typeIcon = 'person'; this.thingMaker = "Surname"; this.thingName = sellectedType ; break;
    }
  }

  addToContainer() {
    console.log(this.item?.id, 'swipeup');
  }

  openMenu() {
    console.log(this.item?.id, 'swipedown');
  }
  
  callSomethingElse(){
    console.log(this.item?.id, 'smthng else');
  }

  dummyAlert(){
    this.alertService.basicAlert(
      'This is an alert', 'but it does nothing...', 'but a test',
      {text: 'Ok'},
      ''
    )
  }

  dummyToast(msg: string){
    this.alertService.presentToast(msg);
  }
  /** 
   ****************** CRUD LOGIC ********************************************************************************** 
  */

  getThings() {
    this.myThingsList = this.myThingsService.getThings();
  }
  saveThing(yetTaggedThing: itemData) {
    this.myThingsService.setThing(yetTaggedThing);
    this.getThings();
  }
  thingIndexer(index: number) {
    const selectedThing = this.myThingsService.thingPicker(index);
    //this.route.navigate(['/private/edit', index]);
  }

  removeItem(index: number) {
    /*  const dialogRef = this.dialog.open(BasicDialogComponent, {
      data: {message: 'Are you sure you want to delete this thing for ever?'},
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed', result);
      if(result) {
      */
        this.myThingsService.thingKicker(index);
        this.getThings();
    //  }
    //});
  }

}