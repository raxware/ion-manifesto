import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit,  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent, 
  IonImg, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonCard, 
  IonGrid, IonRow, IonCol, IonLabel, IonBackButton
} from '@ionic/angular/standalone';
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular/standalone";
import { AlertService } from 'src/app/services/alert-service.service';
import { FormBackPage } from './../form-back/form-back.page'

@Component({
  selector: 'app-card-back',
  templateUrl: './card-back.page.html',
  styleUrls: ['./card-back.page.scss'],
  standalone: true,
  imports: [IonLabel, IonCol, IonRow, IonGrid, 
    IonCard, IonIcon, IonButton, IonCardTitle, 
    IonCardHeader, IonImg, IonCardContent, 
    IonContent, IonHeader, IonTitle, IonToolbar, 
    FormsModule, FormBackPage, IonBackButton, 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CardBackPage implements OnInit{

  constructor(public alertService: AlertService, private navCtrl: NavController, public route: ActivatedRoute,) {}

  ngOnInit(): void {}

  dummyToast(msg: string){ this.alertService.presentToast(msg); }


  updateTrigger(updateItem: Event){
    
  }





}

