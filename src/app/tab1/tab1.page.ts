import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { PhotoService } from '../services/photo.service';
import { Item } from '../model/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab1Page {
  currentCardFlipped: boolean = false;
  allowSlideCard: boolean = true;
  currentPics: string[] = [];
  slides: Item[] = [
    {
      id: 1,
      name: 'name1',
      pictures: ['../../assets/book1.png', '../../assets/book2.jpeg'],
      type: 'type1',
      quantity: 1,
      tags: ['test1', 'test2']
    },
    {
      id: 2,
      name: 'name2',
      pictures: [],
      type: 'type2',
      quantity: 2,
      tags: ['test']
    },
    {
      id: 3,
      name: 'name3',
      pictures: [],
      type: 'type3',
      quantity: 3,
      tags: []
    }];

  constructor(public photoService: PhotoService) {}

  flip(isFlipped: boolean) {
    this.currentCardFlipped = isFlipped;
    this.allowSlideCard = !isFlipped;
  }

  editForm(i: number) {
    console.log(this.slides[i], 'press on name');
  }

  openCamera(i: number) {
    console.log(this.slides[i], 'press on picture');
    this.photoService.addItemPicture().then((value) => {
      console.log(value);
    });
  }

  addToCointainer(i: number) {
    console.log(this.slides[i], 'swipeup');
  }

  openMenu(i: number) {
    console.log(this.slides[i], 'swipedown');
  }
}
