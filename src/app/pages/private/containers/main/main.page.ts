import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  AlertController, IonRouterOutlet, LoadingController, 
  ModalController, ToastController, Config, IonContent, IonHeader, 
  IonTitle, IonToolbar, IonButtons, IonSegmentButton, IonButton, 
  IonIcon, IonList, IonItemGroup, IonItemDivider, IonLabel, 
  IonItemSliding, IonItem, IonItemOptions, IonItemOption, 
  IonListHeader, IonFab, IonFabButton, IonFabList, IonMenuButton, IonSearchbar, IonNav } from '@ionic/angular/standalone';
import { UserData } from '../../../../services/user-data.service';
import { addIcons } from 'ionicons';
import { book, brush, build, calculator, camera, chatbubbles, 
  checkmarkCircle, cube, diamond, dice, disc, extensionPuzzle, 
  film, gameController, home, images, language, medkit, rocket, 
  shirt, thumbsDown, thumbsUp, wine, cash, musicalNotes,
  person, logOut, logOutOutline, logOutSharp, helpCircle, 
  helpCircleOutline, send, informationCircleOutline,
  informationCircle, settings, mail, mailOutline,
  search, options
} from 'ionicons/icons';
import { NavController } from "@ionic/angular";

import { Subjects } from "../../../../model/interfaces";
import { SubjectsService } from "../../../../services/subjects.service";
import { LocatePage } from '../locate/locate.page';
import { CollectionsPage } from '../collections/collections.page';
import { BoxesPage } from '../boxes/boxes.page';
import { ListsPage } from '../lists/lists.page';
import { PeoplePage } from '../people/people.page';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonNav, IonSearchbar, IonFabList, IonFabButton, IonFab, 
    IonListHeader, IonItemOption, IonItemOptions, IonItem, IonItemSliding, 
    IonLabel, IonItemDivider, IonItemGroup, IonList, IonIcon, 
    IonButton, IonSegmentButton, IonButtons, IonContent, IonHeader, 
    IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton,
    LocatePage, PeoplePage, ListsPage, BoxesPage, CollectionsPage,
  ]
})
export class MainPage implements OnInit {
  public subjects!: Array <Subjects>;

  constructor(
    private navCtrl: NavController,
    private subjectsService: SubjectsService
  ) {}

  ngOnInit() {
    this.subjects = this.subjectsService.getSubjects();
    addIcons({book, build, calculator, brush, shirt, wine, film, dice, diamond, camera, 
      chatbubbles, medkit, images, extensionPuzzle, rocket, language, cube, gameController, 
      disc, thumbsUp, thumbsDown, home, checkmarkCircle, cash, musicalNotes, person, logOut, 
      logOutOutline, logOutSharp, helpCircle, helpCircleOutline, send, informationCircle, 
      informationCircleOutline, settings, mail, mailOutline, search, options, 
    });
  }

  public openSubject(subjectId: number): void {

    /* 
    if(subjectId === 1){
      this.navCtrl.navigateForward(["collections"]);
    } else {
    this.navCtrl.navigateForward(["details", subjectId]);
    }
    */
   console.log('selected: ', subjectId)
    switch (subjectId){
      case 1: this.navCtrl.navigateForward(["collections"]); break;
      case 2: this.navCtrl.navigateForward(["boxes"]); break;
      case 3: this.navCtrl.navigateForward(["lists"]); break;
      case 4: this.navCtrl.navigateForward(["people"]); break;
      case 5: this.navCtrl.navigateForward(["locate"]); break;
      /*  this.navCtrl.navigateForward(["details", subjectId]); */
    }
  
  }

  anotherAction(){
    console.log('whatever');
  }
}

  



