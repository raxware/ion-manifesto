import { Component, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, 
  IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, 
  IonIcon, IonThumbnail, IonRippleEffect, IonImg } from '@ionic/angular/standalone';
import { ProtoCardPage } from '../shared/proto-card/proto-card.page';
import { BoxesPage } from "../containers/boxes/boxes.page";
import { LocatePage } from '../containers/locate/locate.page';
import { MainPage } from '../containers/main/main.page';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
    standalone: true,
    imports: [IonImg, IonRippleEffect, IonIcon,
    IonThumbnail, IonItemOption, IonItemOptions,
    IonLabel, IonItem, IonItemSliding, IonList,
    IonHeader, IonToolbar, IonTitle, IonContent,
    ProtoCardPage, BoxesPage, LocatePage, MainPage]
})

export class Tab3Page {
  
}


