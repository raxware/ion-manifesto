import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonImg, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonChip, IonLabel, IonCardSubtitle } from "@ionic/angular/standalone";
import { Item } from 'src/app/model/interfaces';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonLabel, IonChip, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonImg],
})
export class ItemCardComponent {

  @Input() isFlipped: boolean = false;
  @Input() item?: Item;

  @Output() flipCard = new EventEmitter<boolean>();

  constructor(public photoService: PhotoService) { }

  flip(isFlipped: boolean) {
    this.flipCard.emit(isFlipped);
  }

  editForm() {
    console.log(this.item, 'press on name');
  }

  openCamera() {
    console.log(this.item, 'press on picture');
    this.photoService.addItemPicture().then((value) => {
      if (value.webviewPath && this.item) {
        this.item.picture = value.webviewPath;
      }
    });
  }

  addToCointainer() {
    console.log(this.item, 'swipeup');
  }

  openMenu() {
    console.log(this.item, 'swipedown');
  }

}
