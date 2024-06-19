import { Component } from '@angular/core';
import { IonImg, IonToolbar } from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonImg],
})
export class HeaderComponent {

  constructor() { }

}
