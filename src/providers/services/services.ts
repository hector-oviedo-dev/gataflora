import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Events } from 'ionic-angular';
/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  private URL_BASE:string = "https://gataflora.herokuapp.com/";

  public events:Events;

  constructor(public http: HttpClient, private firebase:Firebase) {
    this.events = new Events();
    //this.connect();
  }
  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebase.onNotificationOpen();
  }
  public doExternal(service) {
    console.log("trying to open:",service)
    window.open(service, '_system', 'location=yes');
  }
  public doPost(service, data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.http.post(this.URL_BASE + service, data, {headers: headers});
  }
  public doGet(service, data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    let url = this.URL_BASE + service;

    return this.http.get(url, {headers: headers});
  }
}
