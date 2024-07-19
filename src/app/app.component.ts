import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private router : Router, private platform : Platform) {
    this.initializeApp(); 
  }

  initializeApp() {
/*    this.platform.ready().then(() => {
      this.router.navigateByUrl('splash');
    });*/
  }

}
