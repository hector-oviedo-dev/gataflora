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
  private WS_URL:string = "ws://gataflora.herokuapp.com/";

  private URL_BASE:string = "https://gataflora.herokuapp.com/";

  public events:Events;

  public UID;

  private ws:WebSocket;

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

    let objUID = {
      id:"UID",
      value:this.UID
    }
    data.push(objUID);

    return this.http.post(this.URL_BASE + service, data, {headers: headers});
  }
  public setUID(newUID) {
    this.UID = newUID;
  }
  public doGet(service, data) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    let url = this.URL_BASE + service;

    return this.http.get(url, {headers: headers});
  }
  /////////////////
  //WS/////////////
  public connect() {
    this.ws = new WebSocket(this.WS_URL, ['echo-protocol']);

    this.ws.onmessage = this.handleMessageReceived.bind(this);

    this.ws.onopen = this.handleConnected.bind(this);

    this.ws.onerror = this.handleError.bind(this);

    this.ws.onclose = this.handleClose.bind(this);
  }
  public disconnect() {
    this.ws.onmessage = function () {};

    this.ws.onopen = function () {};

    this.ws.onerror = function () {};

    this.ws.onclose = function () {};

    this.ws.close();

    this.ws = null;
  }
  private handleMessageReceived(data) {
    this.events.publish('onWSForm', data.data);
  }
  private handleConnected(data) {
    /*
    let msg = {
      uid:this.uid,
      msg:"connect"
    }
    this.ws.send(JSON.stringify(msg));*/
  }
  private handleClose(data) {
    this.connect();
  }
  private handleError(err) {
    this.events.publish('onerror', err);
  }
  public sendMessage(msg) {
    this.ws.send(msg);
  }
}
