import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, Output, OnInit, inject, EventEmitter } from '@angular/core';
import { IonIcon, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
  IonChip, IonLabel, IonCardSubtitle, IonAlert, IonButton, IonInput, IonItem, 
  IonThumbnail, IonItemOption, IonSegment, IonGrid, IonRow, IonCol, IonTitle, 
  IonTextarea, IonSelect, IonSelectOption, IonHeader, IonToolbar, IonContent } from "@ionic/angular/standalone";
import { itemData } from 'src/app/model/interfaces';
import { PhotoService } from 'src/app/services/photo.service';
import { AlertService } from 'src/app/services/alert-service.service';
import { addIcons } from 'ionicons';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, musicalNotes,
  person, grid, gridOutline, gridSharp
} from 'ionicons/icons';
import { ItemService } from 'src/app/services/item.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from "@ionic/angular/standalone";
import { ParamsService } from "src/app/services/params.service";

@Component({
  selector: 'app-form-back',
  templateUrl: './form-back.page.html',
  styleUrls: ['./form-back.page.scss'],
  standalone: true,
  imports: [IonContent, IonToolbar, IonHeader, IonTextarea, FormsModule, ReactiveFormsModule, 
    IonTitle, IonCol, IonRow, IonGrid, IonButton, IonAlert, 
    IonCardSubtitle, IonLabel, IonChip, IonCardContent, 
    IonCardTitle, IonCardHeader, IonCard, IonImg, IonInput, 
    IonIcon, IonItem, IonSegment, IonThumbnail, IonItemOption,
    IonSelect, IonSelectOption
  ]
})
export class FormBackPage implements OnInit{
  //-----------------------------------
  myThingsService = inject(ItemService);
  //-----------------------------------
  myThingsList: itemData[] = [];

  @Input() item!: itemData;
  theThing!: itemData;
  unit!: itemData;
  //-----------------------------------
  @Input() thingPicture!: string; 
  @Input() typeIcon?: string; 
  @Input() defaultIcon: string = 'cube';

  thingPrototype!: FormGroup;

  @Input() thingType: string = 'Type';
  @Input() thingMaker: string = 'Maker'
  @Input() thingName: string = 'Name'
  @Input() thingQuantity: string = 'Quantity';
  @Input() thingStatus: string = 'Status';
  @Input() thingNotes: string = 'Notes';

  index!: string;
  //----------------------------------- 
  @Output () backButton = new EventEmitter<string>();
  //-----------------------------------  
  @Input () set thingUnit(thingToEdit: itemData){
    this.unit = thingToEdit;
  //  this.thingPicture = this.theThing.picture;
  //  this.formFiller(thingToEdit);
  }; get thingUnit (){ return this.unit; }
  //-----------------------------------

  constructor(
    public paramS: ParamsService,
    public photoService: PhotoService, 
    public alertService: AlertService,
    private navCtrl: NavController,
    public route: ActivatedRoute, )
  {
    this.emptyFormBuilder();
    addIcons({book, build, calculator, brush, shirt, wine, film, dice, diamond, camera, 
      chatbubbles, medkit, images, extensionPuzzle, rocket, language, cube, gameController, 
      disc, thumbsUp, thumbsDown, home, checkmarkCircle, cash, musicalNotes, person, grid, 
      gridOutline, gridSharp
    });
  }
  ngOnInit(): void {
    this.bringItBack();
                        console.log('ngOnInit: ', this.thingPicture);
  }

  /** ****************** LOGIC FOR ITEM MANAGER BEGINS HERE *************************** */
  bringItBack() {
    this.index = this.getThingId();
    this.myThingsService.getThingById(this.index).subscribe((item: itemData) => {
      this.theThing = item;
      this.formFiller(this.theThing);
      //this.updatePrototype();
      console.log('trae la foto? => ', this.theThing.picture);
    })
  }
  getThingId(){
    let params: any;
    this.paramS.serviceData.subscribe(data => (params = data));
    return params;
  }
  /** ****************** LOGIC FOR ITEM MANAGER ENDS HERE *************************** */
  /** ****************** LOGIC FOR CRUD BEGINS HERE *************************** */
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
  thingTagger() {
    if (this.thingPrototype.valid){
      this.updatePrototype();
      const justTaggedThing: itemData = {
        id: this.theThing.id,
        name: this.thingPrototype.get('name')!.value,
        type: this.thingPrototype.get('type')!.value,
        maker: this.thingPrototype.get('maker')!.value,
        picture: this.thingPrototype.get('picture')!.value,
        quantity: this.thingPrototype.get('quantity')!.value,
        status: this.thingPrototype.get('status')!.value,
        notes: this.thingPrototype.get('notes')?.value,
        tags: this.thingPrototype.get('tags')?.value,
        user: this.theThing.user,
      }
      this.saveChanges(justTaggedThing); 
      //console.log('patcheó la foto? => ', justTaggedThing.picture); 
    } else {console.log('thingPrototype is INVALID!!!');}
  }
  formFiller(thingToEdit: itemData){
    this.thingPrototype.patchValue({
      name: thingToEdit.name,
      type: thingToEdit.type,
      maker: thingToEdit.maker,
      picture: thingToEdit.picture,
      quantity: thingToEdit.quantity,
      status: thingToEdit.status,
      notes: thingToEdit.notes,
      tags: thingToEdit.tags,
    });
    this.typeSelector(thingToEdit.type);
  }
  updatePrototype() {
    this.thingPrototype.patchValue({
      type: this.theThing.type, 
      picture: this.theThing.picture,
    });
  }
  saveChanges(yetTaggedThing: itemData) {
    this.myThingsService.editThing(yetTaggedThing);
  }
  /** ****************** LOGIC FOR CRUD ENDS HERE *************************** */
  /** ****************** LOGIC FOR ITEM CONTENT MANAGER BEGINS HERE *************************** */
  editImage(){
    this.alertService.basicAlert(
      'Image Source', '', '',
      [{text: 'Photo Gallery', handler: () => { this.openCamera('gallery');  }},
      {text: 'Camera', handler: () => { this.openCamera('camera'); }},
      {text: 'Cancel', role: 'cancel', handler: (alertData: any) => { console.log('addImg cancel', alertData); }}],
    );
  }
  openCamera(imgSource: string) {
    console.log(this.item!);
    this.photoService.addItemPicture(imgSource).then((value) => {
      if (value.webviewPath) {
       this.thingPicture = value.webviewPath;
        console.log(this.item!);
        console.log(this.thingPicture);
        if ((this.thingType === 'Type')){this.editType();} // console.log('blob: ', this.thingPicture);   
      } else{console.log('no asigna imagen porque no cumple el "if"...'); }
    });
  }
  editType(){
    this.alertService.inputAlert(
      'What kind of Item is this?',
      [{ label: 'Disc', type: 'radio', value: 'Disc' },
       { label: 'Book', type: 'radio', value: 'Book' }, 
       { label: 'Tool', type: 'radio', value: 'Tool' },
       { label: 'Cloth', type: 'radio', value: 'Cloth' },
       { label: 'Comic', type: 'radio', value: 'Comic' },
       { label: 'Wine', type: 'radio', value: 'Wine'},
       { label: 'Currency', type: 'radio', value: 'Currency'},
      ],
      [{text: 'Cancel', role: 'cancel', handler: (alertData: string) => { this.item!.type = 'undefined'; console.log('addType cancel', alertData); }}, 
       {text: 'Ok', handler: (alertData: string) => { this.thingType = alertData; this.typeSelector(this.thingType) }}
      ]
    )
  }
  typeSelector(sellectedType: string){
    switch (sellectedType){
      case "Album": this.typeIcon = 'disc'; this.thingMaker = 'Artist'; this.thingName = sellectedType ; break;
      case "Book": this.typeIcon = 'book'; this.thingMaker = 'Author'; this.thingName = sellectedType ; break;
      case "Tool": this.typeIcon = 'build'; this.thingMaker = 'Brand'; this.thingName = sellectedType ; break;
      case "Cloth": this.typeIcon = 'shirt'; this.thingMaker = "Brand"; this.thingName = sellectedType ; break;
      case "Comic": this.typeIcon = 'chatbubbles'; this.thingMaker = "Author"; this.thingName = sellectedType ; break;
      case "Wine": this.typeIcon = 'wine'; this.thingMaker = "Producer"; this.thingName = sellectedType ; break;
      case "Currency": this.typeIcon = 'cash'; this.thingMaker = "Country"; this.thingName = sellectedType ; break;
      case "Human": this.typeIcon = 'person'; this.thingMaker = "Surname"; this.thingName = sellectedType ; break;
    }
  }
  /** ****************** LOGIC FOR ITEM CONTENT MANAGER ENDS HERE *************************** */
  /** ****************** LOGIC FOR AUX FUNCTIONS BEGINS HERE *************************** */
  updateTrigger(){
    this.thingTagger();
    //this.navCtrl.navigateBack("lists-page");
  }
  /* --------------------------------------------------------------------*/
  dummyToast(msg: string){
    this.alertService.presentToast(msg);
  }
  /* --------------------------------------------------------------------*/
  /** ****************** LOGIC FOR AUX FUNCTIONS ENDS HERE *************************** */
}