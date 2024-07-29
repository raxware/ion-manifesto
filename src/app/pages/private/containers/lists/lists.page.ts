import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit, } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, 
  IonImg, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonCard, 
  IonGrid, IonRow, IonCol, IonLabel, IonBackButton, IonSearchbar
} from '@ionic/angular/standalone';
import {Injectable} from '@angular/core';
import {NavController} from '@ionic/angular/standalone';
import {Router} from '@angular/router';
import { SharingService } from 'src/app/services/sharing.service'
import { PhotoService } from 'src/app/services/photo.service';
import { AlertService } from 'src/app/services/alert-service.service';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, musicalNotes,
  person, trash, trashBin, pencil, create, eye, alert, code,
  sad, ellipsisVertical, ellipsisVerticalCircle, ellipseSharp,
  ellipseOutline, ellipsisVerticalCircleOutline, ellipsisVerticalCircleSharp,
  ellipsisHorizontal, ellipsisHorizontalSharp, ellipsisHorizontalOutline, 
  ellipsisHorizontalCircle, ellipsisHorizontalCircleOutline,
  ellipsisHorizontalCircleSharp, ellipse, search, add, shareOutline
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ItemService } from 'src/app/services/item.service';
import { itemData } from 'src/app/model/interfaces';
import { ActivatedRoute } from '@angular/router';
import { ParamsService } from "src/app/services/params.service";
//import { filter } from 'rxjs';

@Injectable({providedIn: 'root'})

@Component({
  selector: 'app-lists',
  templateUrl: './lists.page.html',
  styleUrls: ['./lists.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonLabel, IonCol, IonRow, IonGrid,
    IonCard, IonIcon, IonButton, IonCardTitle,
    IonCardHeader, IonImg, IonCardContent,
    IonContent, IonHeader, IonTitle, IonToolbar,
    FormsModule, IonSearchbar
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListsPage implements OnInit {
  myThingsService = inject(ItemService);
  myThingsList: itemData[] = [];
  thingPrototype!: FormGroup;
  unit!: itemData;
  segElement!: string;
  status: boolean = false;

  @Input () segValue: string = 'All items';

  constructor(
    public paramS: ParamsService,
    public photoService: PhotoService, 
    public alertService: AlertService, 
    private navCtrl: NavController,
    public route: ActivatedRoute,
    public sharingService: SharingService, 
    private router: Router,) {
    addIcons({book, build, calculator, brush, shirt, 
      wine, film, dice, diamond, camera, chatbubbles, 
      medkit, images, extensionPuzzle, rocket, language, 
      cube, gameController, disc, thumbsUp, thumbsDown, 
      home, checkmarkCircle, cash, musicalNotes, person,
      trash, trashBin, pencil, create, eye, alert, code,
      sad, ellipse, ellipsisVertical, ellipsisVerticalCircle, 
      ellipseSharp, ellipseOutline, ellipsisVerticalCircleOutline, 
      ellipsisVerticalCircleSharp,ellipsisHorizontal, 
      ellipsisHorizontalSharp, ellipsisHorizontalOutline, 
      ellipsisHorizontalCircle, ellipsisHorizontalCircleOutline,
      ellipsisHorizontalCircleSharp, search, add, shareOutline
    });
  }

  ngOnInit(): void {
    this.getThings();
  }

  toolbarShowHide(tbarToggle: string) {
    const searchToolbar = document.getElementById('searchToolbar');
    const segToolbar = document.getElementById('segToolbar');
    if (tbarToggle === 'searchToolbar'){
      if (segToolbar!.style.display === 'flex'){segToolbar!.style.display = 'none';}
      if (searchToolbar!.style.display === 'none') {searchToolbar!.style.display = 'flex';} 
      else if (searchToolbar!.style.display === 'flex') {searchToolbar!.style.display = 'none';}
    } 
    else if(tbarToggle === 'segToolbar') {
      const shareBtn = document.getElementById('shareBtn');
      if (searchToolbar!.style.display === 'flex'){searchToolbar!.style.display = 'none';}
      if (segToolbar!.style.display === 'none') {segToolbar!.style.display = 'flex'; shareBtn!.style.display = 'flex'; /* whatever else actions*/} 
      else if (segToolbar!.style.display === 'flex') {segToolbar!.style.display = 'none'; shareBtn!.style.display = 'none'; /* whatever else actions*/}
    }
  }
  segmentChanged(event: CustomEvent){
    this.segElement = event.detail.value;
    if(event.detail.value !== 'All'){
      if(event.detail.value === 'Custom'){this.segValue = ('Get a list of checked items'); 
        this.chkBoxToggle(true);
      } else if (event.detail.value !== 'Custom'){
        this.chkBoxToggle(false); 
        this.segValue = ('List of '.concat(event.detail.value)); /*whatever else actions*/}
    } else {this.segValue = 'All items'; 
      this.chkBoxToggle(false); 
      /* whatever else actions*/
    };
  }
  chkBoxToggle(status: boolean){
    const chkBoxArray = document.querySelectorAll<HTMLElement>('.hiddenItem');
    if (status){ for (let index = 0; index < chkBoxArray.length; index++) {chkBoxArray[index].style.display = 'flex'; }} 
    else { for (let index = 0; index < chkBoxArray.length; index++) {chkBoxArray[index].style.display = 'none'; }}
  };
  shareElement(){
    this.segElement;
    let toBeImproved: string = 'This is it for the moment... \n\n';
    toBeImproved = (toBeImproved.concat('Soon it will be improved \n and I\'ll share a List of \n'));
    toBeImproved = (toBeImproved.concat(this.segElement, ' with you.'));
    toBeImproved = (toBeImproved.concat('\n\n See you soon!!'));
    this.sharingService.shareText(toBeImproved);
  }
  dummyToast(msg: string){
    this.alertService.presentToast(msg);
  }

  /** 
   ****************** CRUD LOGIC ********************************************************************************** 
  */

  getThings() {
     this.myThingsService.getThings().subscribe((items: itemData[]) => {
      this.myThingsList = items;
     });
  }
  removeItem(index: string) {   //<-- (thing.id is passed as parameter. Must change it to number later, when 'id' type is set to number too)
    this.alertService.basicAlert(
      'CAUTION!!', '', 'Are you sure you want to delete this thing for ever?',
      [{text: 'Yes, go ahead!', handler: () => { this.myThingsService.thingKicker(index); this.getThings();}},
      {text: 'Cancel', role: 'cancel', handler: (alertData: any) => { console.log('The dialog was closed'); }}],
    );
  }
  openEditor(index: string): void {   //<--  (thing.id is passed as parameter. Must change it to number later, when 'id' type is set to number too)
    this.navCtrl.navigateForward("card-back");
    this.paramS.changeData(index);
  }
}
