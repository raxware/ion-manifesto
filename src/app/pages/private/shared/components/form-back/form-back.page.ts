import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, Output, OnInit, inject } from '@angular/core';
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
  myThingsService = inject(ItemService);
  myThingsList: itemData[] = [];
  thingPrototype!: FormGroup;
  unit!: itemData;
  index!: number;
  
  @Input() item!: itemData;
  @Input() thingPicture!: string;
  @Input() thingType: string = 'Type';
  
  @Input () set thingUnit(thingToEdit: itemData){
    this.unit = thingToEdit;
    this.thingPicture = this.myThingsList[this.index].picture;
    this.formFiller(thingToEdit);
  }; get thingUnit (){
    return this.unit;
  }

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
                          //console.log('onINit: ', this.thingPicture);
  }
  /* --------------------------------------------------------------------*/
  bringItBack() {
    this.index = this.getThingId();
    this.myThingsList = this.myThingsService.getThings();
    this.formFiller(this.myThingsList[this.index]);
  } 
  getThingId(){
    let params: any;
    this.paramS.serviceData.subscribe(data => (params = data));
    return params;
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
    })
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
      this.saveChanges(justTaggedThing);
    } else {console.log('thingPrototype is INVALID!!!');}
  }
  updatePrototype() {
    this.thingPrototype.patchValue({
      type: this.thingType, 
      picture: this.thingPicture,
    });
  }
  saveChanges(yetTaggedThing: itemData) {
    this.myThingsService.editThing(this.index, yetTaggedThing);
  }
  /* --------------------------------------------------------------------*/
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
       { label: 'Tools', type: 'radio', value: 'Tools' },
       { label: 'Cloth', type: 'radio', value: 'Cloth' },
       { label: 'Comic', type: 'radio', value: 'Comic' },
       { label: 'Wine', type: 'radio', value: 'Wine'},
       { label: 'Currency', type: 'radio', value: 'Currency'},
      ],
      [{text: 'Cancel', role: 'cancel', handler: (alertData: string) => { this.item!.type = 'undefined'; console.log('addType cancel', alertData); }}, 
       {text: 'Ok', handler: (alertData: string) => { this.thingType = alertData; }}
      ]
    )
  }
  /* --------------------------------------------------------------------*/
  updateTrigger(){
    this.thingTagger();
    //this.navCtrl.navigateBack("lists-page");
  }

  /* --------------------------------------------------------------------*/
  dummyToast(msg: string){
    this.alertService.presentToast(msg);
  }
  /* --------------------------------------------------------------------*/
}