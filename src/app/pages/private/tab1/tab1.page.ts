import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, 
  IonSegment, IonGrid, IonRow, IonCol, IonAlert
} from '@ionic/angular/standalone';
import { Item } from 'src/app/model/interfaces';
import { ItemCardComponent } from 'src/app/shared/components/item-card/item-card.component';
import { HeaderComponent } from 'src/app/pages/private/shared/header/header.component';
import { AlertService } from 'src/app/services/alert-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, 
    HeaderComponent, ItemCardComponent, IonSegment, IonGrid,
    IonRow, IonCol, IonAlert, 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page {
  currentCardFlipped: boolean = false;
  allowSlideCard: boolean = true;
  tabBarElement: any;
  segmentValue: any;

  constructor(public alertService: AlertService) {}

  slides: Item[] = [
    {
      id: 1,
      name: '',
      maker: '',
      picture: '',
      type: '',
      quantity: 1,
      tags: ['test1', 'test2']
    },
    {
      id: 2,
      name: '',
      maker: '',
      picture: '',
      type: '',
      quantity: 2,
      tags: ['test1', 'test2', 'test3']
    },
  ];

  flip(isFlipped: boolean) {
    this.currentCardFlipped = isFlipped;
    this.allowSlideCard = !isFlipped;
  }

  segmentChanged(event: CustomEvent){
    let activeSegment = event.detail.value;
    this.dummyToast('Segment ' + activeSegment)
    //console.log('msg: ');
  }

  dummyToast(msg: string){
    this.alertService.presentToast('' + msg);
  }

  public segmentShowHide() {
    const segToolbar = document.getElementById('dynToolbar');
      if (segToolbar!.style.display == 'none') {
        segToolbar!.style.display = 'flex';
      } else if (segToolbar!.style.display == 'flex') {
        segToolbar!.style.display = 'none';
      }
    }

}

