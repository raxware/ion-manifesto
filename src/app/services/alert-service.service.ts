import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular/standalone'

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  toast: any; 
  loading: any;

  constructor(private alertCtrlr: AlertController, private toastCtrlr: ToastController, private loadingCtrlr: LoadingController) { }

  async basicAlert(header: string, subHeader: string, message: string, buttons: any){
    const confirm = await this.alertCtrlr.create({ header, subHeader, message, buttons});
    confirm.present();
    //cssClass: string
  }

  async inputAlert(header: string, inputs: any, buttons: any, ){
    const confirm = await this.alertCtrlr.create({ header, inputs, buttons });
    confirm.present();
    return confirm.inputs;
  }

  async presentToast(msg: any){
    this.toast = await this.toastCtrlr.create({
      message: msg, position: 'bottom', duration: 2000,
    });
    this.toast.present();
  }

  async dismissToast(){
    return this.toast.dismiss();
  } 
  
  async presentLoading(){
    this.loading = await this.loadingCtrlr.create({ message: 'Please await...', duration: 2000 });
    await this.loading.present();
    const { role, data } = await this.loading.onDidDismiss();
    console.log('Loading dismissed!');
  }
  
  async dismissDefaultLoading(){
    this.loading.dismiss
  }

}
