import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { IonIcon, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
  IonChip, IonLabel, IonCardSubtitle, IonAlert, IonButton, IonInput, IonItem, 
  IonThumbnail, IonItemOption, IonSegment, IonGrid, IonRow, IonCol, IonTitle, 
  IonTextarea, IonSelect, IonSelectOption, LoadingController
} from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, musicalNotes,
  person, gridOutline
} from 'ionicons/icons';
import { itemData, userData } from 'src/app/model/interfaces';
import { ItemService } from 'src/app/services/item.service';
import { PhotoService } from 'src/app/services/photo.service';
import { AlertService } from 'src/app/services/alert-service.service';
import { StorageService } from 'src/app/services/storage.service'; //<----------------
import { UserService } from 'src/app/services/user.service';

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

  @Input() item!: itemData;
  theThing!: itemData[];  
  unit!: itemData;

  user!: userData;

  storagedImage: string = '';

  defaultIcon: string = 'cube';
  typeIcon?: string;

  @Output() flipCard = new EventEmitter<boolean>();
  @Input() isFlipped: boolean = false;
  savedData: boolean = false;

  //@Input() thingPicture!: string;

  @Input() thingType: string = 'Type';
  @Input() thingMaker: string = 'Maker';
  @Input() thingName: string = 'Name';
  @Input() thingQuantity: string = 'Quantity';
  @Input() thingStatus: string = 'Status';
  @Input() thingNotes: string = 'Notes';
    
  thingPrototype!: FormGroup;

  constructor(
    private photoService: PhotoService, 
    private alertService: AlertService,
    private loadingController: LoadingController,
    private userService: UserService,
    private storageService: StorageService,  //<----------------
  ){
    this.emptyFormBuilder();
    addIcons({book, build, calculator, brush, shirt, wine, film, dice, diamond, camera, 
      chatbubbles, medkit, images, extensionPuzzle, rocket, language, cube, gameController, 
      disc, thumbsUp, thumbsDown, home, checkmarkCircle, cash, musicalNotes, person, gridOutline}
    );
  }

  ngOnInit(): void {
    this.item!.name = ''; //shows off in the front card and inside Form Placeholder
    this.item!.picture = ''; // ??
    this.item!.maker = ''; //doesn't show off anywere

    this.typeIcon = this.defaultIcon;
    this.thingName = 'Name'; //shows off in the Form Label/Animation
    this.thingType = 'Type'; //??

    console.log('item: ', this.item.id);
    //console.log('picture: ', this.item.picture);
    
    /*this.myThingsService.getThings().subscribe((items: itemData[]) => {
      for (let index = 0; index < items.length; index++) {
        this.item = items[index];
        console.log('this item id: ', items[index].id, ' is the number: ', index, ' of ', items.length);
        //this.formFiller(item);
        //this.thingPicture = items[index].picture;
      }
    })*/
    /*
      bringItBack() {
    this.index = this.getThingId();
    this.myThingsService.getThingById(this.index).subscribe((item: itemData) => {
      this.theThing = item;
      this.formFiller(this.theThing);
      this.thingPicture = this.theThing.picture;
      //this.updatePrototype();
      //console.log('trae la foto? => ', this.theThing.picture);
    })
  }
    */

  }
  /** ****************** LOGIC FOR CARD INTERFACE BEGINS HERE *************************** */
  flip(face: string) {
    if( this.item.picture !== '' ){
    this.isFlipped = !this.isFlipped;
    this.flipCard.emit(this.isFlipped);
    this.formFiller(this.item);
    }
    /*
    if(face === 'back') {
      if(this.thingPrototype.valid){
        if(this.savedData === false){
          this.thingTagger();
          this.savedData = true;
        } else {this.dummyAlert('This card already exists!', '', 'If you need to edit or delete it, do it from the menu \"Lists\", in the \"output\" tab.', 'Ok')};
      } else {this.dummyAlert('Card wasn\'t saved!', '', '\"Name\" field is mandatory', 'Ok')};
    } //else if(this.savedData = false) {this.dummyAlert('No data was entered', '', 'This card was not saved', 'Ok')};
    */
  
  }

  addToContainer() { console.log('swipeup'); }
  openMenu() { console.log('swipedown'); }

  /** ****************** LOGIC FOR CARD INTERFACE ENDS HERE *************************** */
  /** ****************** LOGIC FOR CRUD BEGINS HERE *************************** */
  emptyFormBuilder() {
    this.thingPrototype = new FormGroup({
      name: new FormControl('', /*[Validators.required]*/),
      type: new FormControl(''),
      maker: new FormControl(''),
      picture: new FormControl(''),
      quantity: new FormControl(''),
      status: new FormControl(''),
      notes: new FormControl(''),
      tags: new FormControl(''),
    });
  }
  formFiller(displayItem: itemData){
    this.thingPrototype.patchValue({
      name: displayItem.name,
      type: displayItem.type,
      maker: displayItem.maker,
      picture: displayItem.picture,
      quantity: displayItem.quantity,
      status: displayItem.status,
      notes: displayItem.notes,
      tags: displayItem.tags,
    });
    this.typeSelector(displayItem.type);
  }

  thingTagger(action: string) {
    if (this.thingPrototype.valid){
      const justTaggedThing: itemData = {
      id: this.item.id,
      user: this.item.user,
      name: this.thingPrototype.get('name')!.value,
      type: this.thingType,
      maker: this.thingPrototype.get('maker')!.value,
      picture: this.storagedImage,
      quantity: this.thingPrototype.get('quantity')!.value,
      status: this.thingPrototype.get('status')!.value,
      notes: this.thingPrototype.get('notes')?.value,
      tags: this.thingPrototype.get('tags')?.value,
      }
      if(action === 'save'){ this.saveThing(justTaggedThing); }
      else if(action === 'edit'){ this.editThing(justTaggedThing); }
    } else { console.log('thingPrototype is INVALID!!!'); }
  }
  /*
  updatePrototype() {
    this.thingPrototype.patchValue({
      type: this.thingType, 
      picture: this.thingPicture,
    });
  }
    */
  saveThing(yetTaggedThing: itemData) {
    this.myThingsService.setThing(yetTaggedThing);
  }
  editThing(yetTaggedThing: itemData) {
    this.myThingsService.setThing(yetTaggedThing);
  }

  /** ****************** LOGIC FOR CRUD ENDS HERE *************************** */
  /** ****************** LOGIC FOR IMAGES MGMT BEGINS HERE *************************** */

  addImage(){
    if (!(this.item.picture ==='')) {this.dummyAlert('Meant to edit?', '', 'Double click the card to flip it and then click its thumbnail.', 'Ok'); }
    else{ this.pickImage('add') }
  }

  pickImage(option: string){
    this.alertService.basicAlert(
      'Image Source', '', '',
      [{text: 'Photo Gallery', handler: () => { this.storeImage('gallery', option);  }},
      {text: 'Camera', handler: () => { this.storeImage('camera', option); }},
      {text: 'Cancel', role: 'cancel', handler: (alertData: any) => { console.log('addImg cancel', alertData); }}],
    );
  }
  
    async storeImage(imgSource: string, option: string) {
      const image = await this.photoService.getBase64(imgSource);
      if (image) {
        //const imgBase64String = image.base64String;
        const loading = await this.loadingController.create();
        await loading.present();
        const result = await this.storageService.uploadItemImage(image); // llama al servicio que hace upload de la foto y devuelve... 
        if (result) {this.storagedImage = result; loading.dismiss(); // la string que contiene la ruta del storage para esa foto => se le pasa a 'item.picture' !!!
          if(option === 'edit'){
            this.item.picture = this.storagedImage;
            this.myThingsService.editThing(this.item);
          }else if( option === 'add' ){
            if ((this.thingType === 'Type')){this.addType()}
            else {this.thingTagger('save')}
          }
        } 
        if (!result) { this.dummyAlert('Upload failed', '', 'There was a problem uploading this image.', [{text: 'Ok'}] ); }
      }
    }
  
  /** ****************** LOGIC FOR AVATAR ENDS HERE *************************** */
  /** ****************** LOGIC FOR ITEM CONTENT MANAGER BEGINS HERE *************************** */

  /*
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
  }*/

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
      [{text: 'Cancel', role: 'cancel', handler: (alertData: string) => { this.item.type = 'undefined'; console.log('addType cancel', alertData); }}, 
       {text: 'Ok', handler: (alertData: string) => { this.thingType = this.item.type = alertData; this.typeSelector(this.thingType); this.thingTagger('edit'); }}
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
  /** ****************** LOGIC FOR ITEM CONTENT MANAGER ENDS HERE *************************** */
  /** ****************** LOGIC FOR AUX FUNCTIONS BEGINS HERE *************************** */
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




