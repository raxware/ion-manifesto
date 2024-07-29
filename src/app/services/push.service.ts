import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { itemData, pushNotification } from '../model/interfaces';
import { ModalController } from '@ionic/angular/standalone';
import { UserService} from "./user.service";
import { ModalPushPage } from '../pages/private/shared/components/modal-push/modal-push.page';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(
    private modalCtrl: ModalController,
    private userService: UserService
  ){}

  async addListeners() {
    await PushNotifications.addListener('registration', token => {
      console.info('PUSH Registration token: ', token.value);
      this.userService.setUserPushToken(token.value);
    });
    await PushNotifications.addListener('registrationError', err => {
      console.error('PUSH Registration error: ', err.error);
    });
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('PUSH Push notification received: ', notification);
    });
    /*await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
    console.log('Push notification action performed', notification.actionId, notification.inputValue); */
    await PushNotifications.addListener('pushNotificationActionPerformed', (notification: pushNotification) => {
      console.log('PUSH Push notification action performed', JSON.stringify(notification));
      /*
      const item: itemData = {
        id: notification.notification.data.id,
        name: notification.notification.data.name,
        type: notification.notification.data.type,
        maker: notification.notification.data.maker,
        picture: notification.notification.data.picture,
        quantity: notification.notification.data.quantity,
        status: notification.notification.data.status,
      }
      console.log('item', item);
      this.openModal(item);
      */
    });
  }
  async registerNotifications() {
    let permStatus = await PushNotifications.checkPermissions();
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
    await PushNotifications.register();
  }
  async getDeliveredNotifications() {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('PUSH delivered notifications', JSON.stringify(notificationList.notifications));
  }
  async openModal(item: itemData) {
    const modal = await this.modalCtrl.create({
      component: ModalPushPage,
      componentProps: { item }
    }); modal.present();
  }
}
