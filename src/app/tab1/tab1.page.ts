import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { Item } from '../model/interfaces';
import { ItemCardComponent } from '../shared/components/item-card/item-card.component';
import { HeaderComponent } from '../shared/components/header/header.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, HeaderComponent, ItemCardComponent],
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

