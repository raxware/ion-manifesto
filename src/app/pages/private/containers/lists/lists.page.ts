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

@Injectable({
  providedIn: 'root'
})

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
  //outputtingThing!: itemData;
  thingPrototype!: FormGroup;
  //thing!: itemData;
  unit!: itemData;
  segElement!: string;
  status: boolean = false;

  @Input () segValue: string = 'All items';

  @Input({ required: true }) index!: number;

  @Input () set thingUnit(thingToEdit: itemData){
    this.unit = thingToEdit;
    this.editFormFiller(thingToEdit);
  };
  get thingUnit (){
    return this.unit;
  }
  
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
      if(event.detail.value === 'Custom'){this.segValue = ('Select items at your discretion to customize a list'); 
        this.chkBoxToggle(true);
      } else if (event.detail.value !== 'Custom'){
        this.chkBoxToggle(false); 
        this.segValue = ('List of '.concat(event.detail.value)); /*whatever else actions*/}
    }else{this.segValue = 'All items'; 
      this.chkBoxToggle(false); 
      /* whatever else actions*/};
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
    this.myThingsList = this.myThingsService.getThings();
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
  thingIndexer(index: number) {
    console.log(index);
    const thing = this.myThingsService.thingPicker(index);
    console.log(index!);
  //  this.route.navigate(['/private/edit', index]);
    console.log('editor: ', thing );
  }
  removeItem(index: number) {
    console.log(index);
    this.myThingsService.thingKicker(index);
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
  openEditor(index: number): void {
    this.navCtrl.navigateForward("card-back");
    this.paramS.changeData(index);
  }
}
