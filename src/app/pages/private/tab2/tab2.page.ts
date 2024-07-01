import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonLabel } from '@ionic/angular/standalone';
import { PhotoService } from 'src/app/services/photo.service';
import { Item } from 'src/app/model/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonLabel, IonChip, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonImg, IonHeader, IonToolbar, IonTitle, IonContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab2Page {
  currentCardFlipped: boolean = false;
  allowSlideCard: boolean = true;
  currentPics: string[] = [];
  slides: Item[] = [
    {
      id: 1,
      name: 'name1',
      maker: '',
      picture: '../../assets/book2.jpeg',
      type: 'type1',
      quantity: 1,
      tags: ['test1', 'test2']
    },
    {
      id: 2,
      name: 'name2',
      maker:'',
      picture: '',
      type: 'type2',
      quantity: 2,
      tags: ['test']
    },
    {
      id: 3,
      name: 'name3',
      maker:'',
      picture: '',
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
  }


  addToCointainer(i: number) {
    console.log(this.slides[i], 'swipeup');
  }

  openMenu(i: number) {
    console.log(this.slides[i], 'swipedown');
  }

}
