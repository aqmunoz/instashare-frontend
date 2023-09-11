import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private httpClient: HttpClient) { }

  sendSubscriptionToTheServer(suscription: PushSubscription) {
    return this.httpClient.post(`${BASE_URL}/files/suscription`, suscription);
  }
}
