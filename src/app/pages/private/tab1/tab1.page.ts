import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, 
  IonSegment, IonGrid, IonRow, IonCol, 
} from '@ionic/angular/standalone';
import { Item } from 'src/app/model/interfaces';
import { ItemCardComponent } from 'src/app/shared/components/item-card/item-card.component';
import { HeaderComponent } from 'src/app/pages/private/shared/header/header.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, 
    HeaderComponent, ItemCardComponent, IonSegment, IonGrid,
    IonRow, IonCol, 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page {
  currentCardFlipped: boolean = false;
  allowSlideCard: boolean = true;
  tabBarElement: any;

  constructor() {}

  showHideTabs() {
    console.log('swipedown anywere in tab1');
  }

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
      tags: ['test']
    },
    {
      id: 3,
      name: '',
      maker: '',
      picture: '',
      type: '',
      quantity: 3,
      tags: []
    },
    {
      id: 4,
      name: '',
      maker: '',
      picture: '',
      type: '',
      quantity: 1,
      tags: ['test1', 'test2']
    },
    {
      id: 5,
      name: '',
      maker: '',
      picture: '',
      type: '',
      quantity: 2,
      tags: ['test']
    },
    {
      id: 6,
      name: '',
      maker: '',
      picture: '',
      type: '',
      quantity: 3,
      tags: []
    }
  ];

  flip(isFlipped: boolean) {
    this.currentCardFlipped = isFlipped;
    this.allowSlideCard = !isFlipped;
  }

}

