import { Component, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonIcon, IonThumbnail, IonRippleEffect, IonImg } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonImg, IonRippleEffect, IonIcon, IonThumbnail, IonItemOption, IonItemOptions, IonLabel, IonItem, IonItemSliding, IonList, IonHeader, IonToolbar, IonTitle, IonContent],
})

export class Tab3Page {

  @Input() containerName: string='Box 1';

  public containersArray = new Array(3);

  constructor() {}
}

