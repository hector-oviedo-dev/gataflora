import { Component, ViewChild } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Events, NavController, ToastController, Content } from 'ionic-angular';
import { tap } from 'rxjs/operators';
import { ServicesProvider } from '../../providers/services/services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  @ViewChild("container") container;

  public id;
  public token;

  public stats;
  private events:Events;

  public hidden:boolean = true;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private services:ServicesProvider, private uid: UniqueDeviceID, private firebase:Firebase) {
    this.events = services.events;
  }
  ionViewDidLoad() {
    this.events.subscribe("onRefresh", (obj) => { this.onRefresh(obj); });
    this.events.subscribe("onHide", (obj) => { this.onHide(obj); });

    this.uid.get()
    .then((uuid: any) => this.services.setUID(uuid))
    .catch((error: any) => this.services.setUID("INVALID"));

    this.services.doPost("getflora",null).subscribe(
        res => { this.onServiceResult(res); },
        err => { this.stats = "Error: 404 Server Error"; }
      );
/*
    this.services.listenToNotifications().pipe(
          tap(msg => {
            // show a toast
            const toast = this.toastCtrl.create({
              message: msg.body,
              duration: 6000
            });
            toast.present();
          })
        ).subscribe();

    this.stats = "Conectando...";

    this.uid.get()
      .then((uuid: any) => {
        this.id = uuid;

        //getting the TOKEN
        this.firebase.getToken()
          .then(tokenTMP => {
            this.stats = "Actualizando...";
            this.token = tokenTMP;

            this.doService();
          })
          .catch((error) => { this.stats = "ERROR:" + error; } );

        this.firebase.onTokenRefresh()
          .subscribe((tokenTMP) => {
            this.stats = "Actualizando...";
            this.token = tokenTMP;

            this.doService();
          });
      })
      .catch((error) => { this.stats = "ERROR:" + error; } );*/
  }
  public doService() {
    let data = {
      uid:this.id,
      token:this.token
    }
    this.services.doPost("updatetoken",data).subscribe(
        res => { this.onServiceResult(res); },
        err => { this.stats = "Error: 404 Server Error"; }
      );
  }
  public onServiceResult(data) {
    if (data.success) this.events.publish("onContent",data);
    else this.stats = "Error: Success false";
  }
  public onHide(data) {
    this.hidden = true;
  }
  public onRefresh(data) {
    this.hidden = false;
    this.content.resize();
    this.content.scrollTo(0, 0, 0);
  }
}
