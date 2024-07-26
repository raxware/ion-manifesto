import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { AlertService } from 'src/app/services/alert-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-front',
  templateUrl: './card-front.page.html',
  styleUrls: ['./card-front.page.scss'],
  standalone: true,
  imports: [IonContent, FormsModule],
})
export class CardFrontPage implements OnInit{
  constructor(public alertService: AlertService, private router: Router) {
  }
  ngOnInit(): void {}

  hexOut(){
    const id1 = Math.floor((Math.random() * (9999 - 1000 + 1)) + 1000);
      const id2 = Math.floor((Math.random() * (9999 - 1000 + 1)) + 1000);
      //window.crypto.randomUUID()
      let now: Date = new Date(); let year: number = now.getFullYear(); 
      let code: string = 'mnf-'; code = (code.concat(year.toString()));
      code = (code.concat('-')); code =(code.concat(id1.toString())); 
      code = (code.concat('-')); code = (code.concat(id2.toString()));
      //console.log(code);
    this.dummyBasic('Ostara has a gift for you!', 'Send us this code to redeem it:', code, 'Ok');
  }

  dummyAlert(head: string, sub: string, msg: string, btn: any){
    this.alertService.basicAlert(head, sub, msg, [{text: btn}]);
  }

  dummyBasic(head: string, sub: string, msg: string, btn: any){
    let path: any = this.router.navigateByUrl('/', { replaceUrl: true });
    this.alertService.basicAlert(head, sub, msg, [{text: btn, handler: () => { path }}]);
  }
}


