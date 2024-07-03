import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { IonIcon, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
  IonChip, IonLabel, IonCardSubtitle, IonAlert, IonButton, IonInput, IonItem, 
  IonThumbnail, IonItemOption,
} from "@ionic/angular/standalone";
import { Item } from 'src/app/model/interfaces';
import { PhotoService } from 'src/app/services/photo.service';
import { AlertService } from 'src/app/services/alert-service.service';
import { addIcons } from 'ionicons';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, musicalNotes,
  person, 
} from 'ionicons/icons';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  standalone: true,
  imports: [IonButton, IonAlert, IonCardSubtitle, IonLabel, 
    IonChip, IonCardContent, IonCardTitle, IonCardHeader, 
    IonCard, IonImg, IonInput, IonIcon, IonItem, IonThumbnail, 
    IonItemOption,
  ],
})
export class ItemCardComponent implements OnInit{
 
  @Input() isFlipped: boolean = false;
  @Input() item?: Item;
 
  @Output() flipCard = new EventEmitter<boolean>();

  @Input() thingMaker?: string;
  @Input() thingName?: string;
  @Input() typeIcon?: string;
  
  constructor(public photoService: PhotoService, public alertService: AlertService) {}
  ngOnInit(): void {
    this.item!.name = 'Name';
    this.item!.type = 'Type';
    this.item?.picture;
    this.item!.maker = 'Name';

    this.thingName = '';
    this.typeIcon ='';

    addIcons({book, build, calculator, brush, shirt, wine, film, dice, diamond, camera, 
      chatbubbles, medkit, images, extensionPuzzle, rocket, language, cube, gameController, 
      disc, thumbsUp, thumbsDown, home, checkmarkCircle, cash, musicalNotes, person}
    );
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
      {text: 'Cancel', role: 'cancel', handler: (alertData: any) => { console.log('addImg cancel', alertData); }}]
    );
  }
  openCamera(imgSource: string) {
    if (imgSource === 'camera') {
      this.photoService.picFromCamera().then((value) => {
        if (value.webviewPath && this.item) {
          this.item.picture = value.webviewPath;
          if ((this.item!.type === 'Type')){
          this.addType();
          //console.log(this.item!.picture);
          }
        }
      });
    } else if (imgSource === 'gallery') {
      this.photoService.picFromGallery().then((value) => {
        if (value.webviewPath && this.item) {
          this.item.picture = value.webviewPath;
          if ((this.item!.type === 'Type')){
          this.addType();
          //console.log(this.item!.picture);
          }
        }
      });
    }
  }

  alertLocked(){
    this.alertService.basicAlert(
      'Do you want to edit?', 'Double click the card!', 'Then, tap the item\'s icon or its thumbnail',
      [{text: 'Ok'}]
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
    console.log(this.item?.id, 'haptic');
  }

}


