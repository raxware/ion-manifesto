import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { IonIcon, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
  IonChip, IonLabel, IonCardSubtitle, IonAlert, IonButton, IonInput, IonItem, 
  IonThumbnail, IonItemOption, IonSegment, IonGrid, IonRow, IonCol, IonTitle, 
  IonTextarea, IonSelect, IonSelectOption, 
} from "@ionic/angular/standalone";
import { itemData } from 'src/app/model/interfaces';
import { ItemService } from 'src/app/services/item.service';
import { PhotoService } from 'src/app/services/photo.service';
import { AlertService } from 'src/app/services/alert-service.service';
import { addIcons } from 'ionicons';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, musicalNotes,
  person, gridOutline
} from 'ionicons/icons';

@Component({
    selector: 'app-item-card',
    templateUrl: './item-card.component.html',
    styleUrls: ['./item-card.component.scss'],
    standalone: true,
    imports: [IonTextarea, FormsModule, ReactiveFormsModule, 
      IonTitle, IonCol, IonRow, IonGrid, IonButton, IonAlert, 
      IonCardSubtitle, IonLabel, IonChip, IonCardContent, 
      IonCardTitle, IonCardHeader, IonCard, IonImg, IonInput, 
      IonIcon, IonItem, IonSegment, IonThumbnail, IonItemOption,
      IonSelect, IonSelectOption
    ]
})
export class ItemCardComponent implements OnInit{
  myThingsService = inject(ItemService);
  @Input() defaultIcon: string = 'cube';
  @Input() typeIcon?: string;

  @Input() isFlipped: boolean = false;
  @Input() item?: itemData;

  @Output() flipCard = new EventEmitter<boolean>();

  @Input() thingPicture!: string;
  @Input() thingType: string = 'Type';
  @Input() thingMaker: string = 'Maker';
  @Input() thingName: string = 'Name';
  @Input() thingQuantity: string = 'Quantity';
  @Input() thingStatus: string = 'Status';
  @Input() thingNotes: string = 'Notes';
    
  thingPrototype!: FormGroup;
  unit!: itemData;
  savedData: boolean = false;

  constructor(public photoService: PhotoService, public alertService: AlertService) {
    this.emptyFormBuilder();
    addIcons({book, build, calculator, brush, shirt, wine, film, dice, diamond, camera, 
      chatbubbles, medkit, images, extensionPuzzle, rocket, language, cube, gameController, 
      disc, thumbsUp, thumbsDown, home, checkmarkCircle, cash, musicalNotes, person, gridOutline}
    );
  }
  ngOnInit(): void {
    this.item!.name = 'Name'; //shows off in the front card and inside Form Placeholder
    this.item!.picture = ''; // ??
    this.item!.maker = 'Maker'; //doesn't show off anywere
    this.thingName = 'Name'; //shows off in the Form Label/Animation
    this.typeIcon = this.defaultIcon;
    this.thingType = 'Type'; //??
  }
  /** ****************** CARD INTERFACE STARTS HERE *************************** */

  flip(face: string) {
    if(face === 'back') {
      if(this.thingPrototype.valid){
        if(this.savedData === false){
          this.thingTagger();
          this.savedData = true;
        } else {this.dummyAlert('This card already exists!', '', 'If you need to edit, complete its data or delete it, please do it from the menus \"Lists\", in the \"output\" tab.', 'Ok')};
      } else {this.dummyAlert('Card wasn\'t saved!', '', '\"Name\" field is mandatory', 'Ok')};
    } //else if(this.savedData = false) {this.dummyAlert('No data was entered', '', 'This card was not saved', 'Ok')};
    this.isFlipped = !this.isFlipped;
    this.flipCard.emit(this.isFlipped);
  }
  addToContainer() {
    console.log(this.item?.id, 'swipeup');
  }
  openMenu() {
    console.log(this.item?.id, 'swipedown');
  }
  
  /** ****************** CARD INTERFACE ENDS HERE *************************** */

  /** ****************** CRUD LOGIC STARTS HERE *************************** */

  emptyFormBuilder() {
    this.thingPrototype = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl(''),
      maker: new FormControl(''),
      picture: new FormControl(''),
      quantity: new FormControl(''),
      status: new FormControl(''),
      notes: new FormControl(''),
      tags: new FormControl(''),
    });
  }
  updatePrototype() {
    this.thingPrototype.patchValue({
      type: this.thingType, 
      picture: this.thingPicture,
    });
  }
  thingTagger() {
    if (this.thingPrototype.valid){
      this.updatePrototype();
      const justTaggedThing: itemData = {
        name: this.thingPrototype.get('name')!.value,
        type: this.thingPrototype.get('type')!.value,
        maker: this.thingPrototype.get('maker')!.value,
        picture: this.thingPrototype.get('picture')!.value,
        quantity: this.thingPrototype.get('quantity')!.value,
        status: this.thingPrototype.get('status')!.value,
        notes: this.thingPrototype.get('notes')?.value,
        tags: this.thingPrototype.get('tags')?.value,
      }
      this.saveThing(justTaggedThing);
    }
    else {
        console.log('thingPrototype is INVALID!!!');
    }
  }
  saveThing(yetTaggedThing: itemData) {
    this.myThingsService.setThing(yetTaggedThing);
  }

  /** ****************** CRUD LOGIC ENDS HERE *************************** */

  /** ****************** ITEM CONTENT MANAGER STARTS  HERE*************************** */
  
  addImage(){
    if (!(this.item!.picture ==='')) {this.dummyAlert('Meant to edit?', '', 'Double click the card to flip it and then click its thumbnail.', 'Ok'); }
    else{this.editImage(); }
  }
  editImage(){
    this.alertService.basicAlert(
      'Image Source', '', '',
      [{text: 'Photo Gallery', handler: () => { this.openCamera('gallery');  }},
      {text: 'Camera', handler: () => { this.openCamera('camera'); }},
      {text: 'Cancel', role: 'cancel', handler: (alertData: any) => { console.log('addImg cancel', alertData); }}],
    );
  }
  openCamera(imgSource: string) {
    this.photoService.addItemPicture(imgSource).then((value) => {
      if (value.webviewPath && this.item) {
        this.thingPicture = this.item.picture = value.webviewPath;
        if ((this.thingType === 'Type')){
          this.addType();
        }
      }
    });
  }
  addType(){
    this.alertService.inputAlert(
      'What kind of Item is this?',
      [{ label: 'Disc', type: 'radio', value: 'Album' },
       { label: 'Book', type: 'radio', value: 'Book' }, 
       { label: 'Tool', type: 'radio', value: 'Tool' },
       { label: 'Cloth', type: 'radio', value: 'Cloth' },
       { label: 'Comic', type: 'radio', value: 'Comic' },
       { label: 'Wine', type: 'radio', value: 'Wine'},
       { label: 'Currency', type: 'radio', value: 'Currency'},
      ],
      [{text: 'Cancel', role: 'cancel', handler: (alertData: string) => { this.item!.type = 'undefined'; console.log('addType cancel', alertData); }}, 
       {text: 'Ok', handler: (alertData: string) => { this.thingType = this.item!.type = alertData; this.typeSelector(this.thingType);}}
      ]
    )
  }
  typeSelector(sellectedType: string){
    switch (sellectedType){
      case "Album": this.typeIcon = 'disc'; this.thingMaker = 'Artist'; this.thingName = sellectedType; 
      this.thingStatus = 'Status'; this.thingQuantity = "Quantity"; this.thingNotes = "Notes"; break;
      case "Book": this.typeIcon = 'book'; this.thingMaker = 'Author'; this.thingName = sellectedType; 
      this.thingStatus = 'Status'; this.thingQuantity = "Quantity"; this.thingNotes = "Notes"; break;
      case "Tool": this.typeIcon = 'build'; this.thingMaker = 'Brand'; this.thingName = sellectedType; 
      this.thingStatus = 'Status'; this.thingQuantity = "Quantity"; this.thingNotes = "Notes"; break;
      case "Cloth": this.typeIcon = 'shirt'; this.thingMaker = "Brand"; this.thingName = sellectedType; 
      this.thingStatus = 'Status'; this.thingQuantity = "Quantity"; this.thingNotes = "Notes"; break;
      case "Comic": this.typeIcon = 'chatbubbles'; this.thingMaker = "Author"; this.thingName = sellectedType; 
      this.thingStatus = 'Status'; this.thingQuantity = "Quantity"; this.thingNotes = "Notes"; break;
      case "Wine": this.typeIcon = 'wine'; this.thingMaker = "Producer"; this.thingName = sellectedType; 
      this.thingStatus = 'Status'; this.thingQuantity = "Quantity"; this.thingNotes = "Notes"; break;
      case "Currency": this.typeIcon = 'cash'; this.thingMaker = "Country"; this.thingName = sellectedType; 
      this.thingStatus = 'Status'; this.thingQuantity = "Quantity"; this.thingNotes = "Notes"; break;
    /*  default: this.typeIcon = 'grid-outline'; this.thingMaker = 'Maker'; this.thingName = "Name"; 
      this.thingStatus = 'Status'; this.thingQuantity = "Quantity"; this.thingNotes = "Notes"; break;
    */
    }
  }

  /** ****************** ITEM CONTENT MANAGER ENDS HERE *************************** */

  dummyToast(msg: string){this.alertService.presentToast(msg); }

  alertLocked(){
    this.alertService.basicAlert(
      'Meant to edit?', '', 'Double click the card to flip it and then click its thumbnail.',
      [{text: 'Ok'}],
    );
  }

  dummyAlert(head: string, sub: string, msg: string, btn: any){
    this.alertService.basicAlert(head, sub, msg, [{text: btn}]);
  }

}




