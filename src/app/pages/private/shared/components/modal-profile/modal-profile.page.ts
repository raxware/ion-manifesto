import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonImg,
  IonItem, IonInput, IonButton, IonButtons, ModalController, 
  IonGrid, IonCard, IonCardContent, IonRow, IonCol
 } from '@ionic/angular/standalone';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.page.html',
  styleUrls: ['./modal-profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, 
    CommonModule, FormsModule, IonInput, IonItem, IonButton,
    IonButtons, IonGrid, IonImg, IonCard, IonCardContent,
    IonRow, IonCol, 
  ]
})
export class ModalProfilePage implements OnInit {
  name!: string;
  strong!: boolean;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

}
