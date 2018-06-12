import { Component } from '@angular/core';
import { ServicesProvider } from '../../providers/services/services';
import { Events } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';


/**
 * Generated class for the FormQrComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'form-qr',
  templateUrl: 'form-qr.html'
})
export class FormQrComponent {
  public _event_type:string = "onForm";

  public _compound_ID:string;

  public _ID:string;
  public _value:string;

  public _required:boolean;

  public _txt_required:string;
  public _label:string;
  public _btn_label:string;
  public _placeholder:string;
  
  public _update:boolean = false;

  public _valid:boolean;

  private events:Events;
  constructor(private services:ServicesProvider, public brScanner: BarcodeScanner) {
    this.events = services.events;
  }
  public createForm() {
    
  }
  public getValue() {
    return {
      id:this._ID,
      value:this._value
    }
  }
  public onChange(event) {
    console.log(this._value)
    //this._value = event

    let data = { id_compound:this._compound_ID, update:this._update, id:this._ID, valid:this._valid };
    this.events.publish(this._event_type, JSON.stringify(data));
  }
  //scan QR
  public onScanClick() {
    this.brScanner.scan().then(barcodeData => {
      this._valid = true;
      this._value = barcodeData.text;
    }, (err) => {
      this._valid = false;
      this._value = "";
    });
    
    let data = { id_compound:this._compound_ID, update:this._update, id:this._ID, valid:this._valid };
    this.events.publish(this._event_type, JSON.stringify(data));
  }
}
