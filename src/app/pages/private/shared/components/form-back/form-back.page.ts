import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
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
  person, 
} from 'ionicons/icons';
import { ItemService } from 'src/app/services/item.service';

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
  myThingsService = inject(ItemService);
  @Input() isFlipped: boolean = false;
  @Input() item!: itemData;
  @Output() flipCard = new EventEmitter<boolean>();

  @Output() outputtingThing = new EventEmitter<itemData>();

  thingPicture!: string;
  @Input() thingType: string = 'Type';

  @Input () set thingUnit(thingToEdit: itemData){
    this.unit = thingToEdit;
    this.editFormFiller(thingToEdit);
  }; get thingUnit (){
    return this.unit;
  }
      
  thingPrototype!: FormGroup;
  unit!: itemData;

  constructor(public photoService: PhotoService, public alertService: AlertService) {
    this.emptyFormBuilder();
  }

  ngOnInit(): void {
    addIcons({book, build, calculator, brush, shirt, wine, film, dice, diamond, camera, 
      chatbubbles, medkit, images, extensionPuzzle, rocket, language, cube, gameController, 
      disc, thumbsUp, thumbsDown, home, checkmarkCircle, cash, musicalNotes, person}
    );
  }

  emptyFormBuilder() {
    this.thingPrototype = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      maker: new FormControl(''),
      picture: new FormControl(''),
      quantity: new FormControl(''),
      status: new FormControl(''),
      notes: new FormControl(''),
      tags: new FormControl(''),
    });
  }

  updatePrototype(field: string) {
    if(field === 'type'){
      this.thingPrototype.patchValue({
        type: this.thingType,
      });
    } else if(field === 'picture'){
      this.thingPrototype.patchValue({
        picture: this.thingPicture,
      });
    }
  }

  thingTagger() {
    if (this.thingPrototype.valid){
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
      //this.outputtingThing.emit(justTaggedThing);
      this.saveThing(justTaggedThing);
    }
    else {
        console.log('thingPrototype is INVALID!!!');
    }
  }
  
  editFormFiller(thingToEdit: itemData){
    this.thingPrototype.patchValue({
      name: thingToEdit.name,
      type: thingToEdit.type,
      maker: thingToEdit.maker,
      picture: thingToEdit.picture,
      quantity: thingToEdit.quantity,
      status: thingToEdit.status,
      notes: thingToEdit.notes,
      tags: thingToEdit.tags,
    })
  }

  saveThing(yetTaggedThing: itemData) {
    this.myThingsService.setThing(yetTaggedThing);
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
    console.log(this.item!);
    this.photoService.addItemPicture(imgSource).then((value) => {
      if (value.webviewPath) {
        this.thingPicture = this.item!.picture = value.webviewPath;
        console.log(this.item!);
        console.log(this.thingPicture);
        if ((this.thingType === 'Type')){
          this.addType();
           
        }
        console.log('blob: ', this.item!.picture);   
      } else{
        console.log('no asigna imagen porque no cumple el "if"...');
      }

    });
  }

  alertLocked(){
    this.alertService.basicAlert(
      'Meant to edit?', '', 'Double click the card to flip it and then click its thumbnail.',
      [{text: 'Ok'}],
      ''
    );
  }

  addType(){
    if ((this.thingType === 'Type')){
      this.openType();
    } else{
      this.alertLocked();
    }
  }
  
  openType(){
    this.alertService.inputAlert(
      'What kind of Item is this?',
      [{ label: 'Disc', type: 'radio', value: 'Disc' },
       { label: 'Book', type: 'radio', value: 'Book' }, 
       { label: 'Tools', type: 'radio', value: 'Tools' },
       { label: 'Cloth', type: 'radio', value: 'Cloth' },
       { label: 'Comic', type: 'radio', value: 'Comic' },
       { label: 'Wine', type: 'radio', value: 'Wine'},
       { label: 'Currency', type: 'radio', value: 'Currency'},
      ],
      [{text: 'Cancel', role: 'cancel', handler: (alertData: string) => { this.item!.type = 'undefined'; console.log('addType cancel', alertData); }}, 
       {text: 'Ok', handler: (alertData: string) => { this.thingType = alertData; this.updatePrototype('type')}}
      ]
    )
  }

  addToContainer() {
    console.log(this.item?.id, 'swipeup');
  }

  openMenu() {
    console.log(this.item?.id, 'swipedown');
  }

  dummyToast(msg: string){
    this.alertService.presentToast(msg);
  }

}