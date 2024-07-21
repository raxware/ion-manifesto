import { Component, Input, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { AlertService } from 'src/app/services/alert-service.service';
import { addIcons } from 'ionicons';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, add, library, eye,
  person, trash, trashBin, pencil, create, code, server, search,
  sad, ellipsisVertical, ellipsisVerticalCircle, ellipseSharp,
  ellipseOutline, ellipsisVerticalCircleOutline, briefcase,
  ellipsisHorizontal, ellipsisHorizontalSharp, musicalNotes,
  ellipsisHorizontalCircle, ellipsisHorizontalCircleOutline,
  ellipsisHorizontalCircleSharp, ellipse, reorderFour, archive, 
  ellipsisVerticalCircleSharp, ellipsisHorizontalOutline,  

} from 'ionicons/icons';
import { NavController, IonSearchbar, IonSegment, IonSegmentButton,
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
  IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, 
  IonIcon, IonThumbnail, IonRippleEffect, IonImg, IonButtons, 
  IonBackButton, IonGrid, IonRow, IonCol, IonItemDivider, 
  IonButton, IonFab, IonFabButton, IonFabList 
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.page.html',
  styleUrls: ['./boxes.page.scss'],
  standalone: true,
  imports: [IonFabList, IonFabButton, IonFab, IonSegmentButton, IonSegment, IonSearchbar, IonButton, IonItemDivider, IonCol, IonRow, IonGrid, 
    IonBackButton, IonButtons, IonImg, IonRippleEffect, 
    IonIcon, IonThumbnail, IonItemOption, IonItemOptions,
    IonLabel, IonItem, IonItemSliding, IonList, IonHeader, 
    IonToolbar, IonTitle, IonContent,
  ]
})
export class BoxesPage implements OnInit {
  public containersArray = new Array(5);
  @Input() containerName: string = ('Box');
    
  constructor(public photoService: PhotoService, public alertService: AlertService, private navCtrl: NavController,) {
    addIcons({book, build, calculator, brush, shirt, 
      wine, film, dice, diamond, camera, chatbubbles, 
      medkit, images, extensionPuzzle, rocket, language, 
      cube, gameController, disc, thumbsUp, thumbsDown, 
      home, checkmarkCircle, cash, musicalNotes, person,
      trash, trashBin, pencil, create, eye, code,
      sad, ellipse, ellipsisVertical, ellipsisVerticalCircle, 
      ellipseSharp, ellipseOutline, ellipsisVerticalCircleOutline, 
      ellipsisVerticalCircleSharp,ellipsisHorizontal, 
      ellipsisHorizontalSharp, ellipsisHorizontalOutline, 
      ellipsisHorizontalCircle, ellipsisHorizontalCircleOutline,
      ellipsisHorizontalCircleSharp, search, server, briefcase, archive, 
      library, reorderFour, add
    });
  }
  ngOnInit(): void {
  }

  toolbarShowHide(tbarToggle: string) {
    const searchToolbar = document.getElementById('searchToolbar');
    const segToolbar = document.getElementById('segToolbar');
    if (tbarToggle === 'searchToolbar'){
      if (segToolbar!.style.display === 'flex'){segToolbar!.style.display = 'none';}
      if (searchToolbar!.style.display === 'none') {searchToolbar!.style.display = 'flex';
      } else if (searchToolbar!.style.display === 'flex') {searchToolbar!.style.display = 'none';}
    } 
    else if(tbarToggle === 'segToolbar') {
      if (searchToolbar!.style.display === 'flex'){searchToolbar!.style.display = 'none';}
      if (segToolbar!.style.display === 'none') {segToolbar!.style.display = 'flex';
      } else if (segToolbar!.style.display === 'flex') {segToolbar!.style.display = 'none';}
    }
  }

  segmentChanged(event: CustomEvent){
    let activeSegment = event.detail.value;
    this.dummyToast('Segment ' + activeSegment)
    //console.log('msg: ');
  }

  dummyToast(msg: string){
    this.alertService.presentToast(msg);
  }






}
