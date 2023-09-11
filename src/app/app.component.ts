import { Component, OnInit } from '@angular/core';
import { SwPush } from "@angular/service-worker";
import { environment } from 'src/environments/environment.development';
import { PushNotificationService } from './services/push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'InstaShare';

  constructor(
    private _swPush: SwPush,
    private pushNotification: PushNotificationService
  ){}

  ngOnInit(): void {
    this.requestSuscription();
    this._swPush.messages.subscribe((data) => console.log('Resp: ', data));
  }

  requestSuscription() {
    if (!this._swPush.isEnabled) {
      return console.log("Notification is not enabled.");
    }

    this._swPush.requestSubscription({
      serverPublicKey: environment.VAPID_KEY_PUBLIC
    })
      .then((suscription) => {
        this.pushNotification.sendSubscriptionToTheServer(suscription)
          .subscribe();
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
