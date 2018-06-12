import { Component } from '@angular/core';
import { ServicesProvider } from '../../providers/services/services';
import { Events } from 'ionic-angular';
/**
 * Generated class for the FormDateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'form-date',
  templateUrl: 'form-date.html'
})
export class FormDateComponent {
  public _event_type:string = "onForm";

  public config = {
    hours24Format: 'HH',
    minutesFormat: 'mm',
    showTwentyFourHours: true,
  };

  public _compound_ID:string;

  public _valid:boolean;
  public _ID:string;
  public _value:any;
  public _valueDate:any;
  public _valueTime:any;

  public _hideTime:boolean = false;

  public _hidden:boolean;
  public _enabled:boolean;
  public _required:boolean;

  public _txt_required:string;
  public _txt_error:string;

  public _label:string = "";
  public _labelTime:string = "";
  public _placeholder:string = "";
  public _placeholderTime:string = "";

  public date;
  public dateTime;
  
  public _update:boolean = false;

  private events:Events;
  constructor(private services:ServicesProvider) {
    this.events = services.events;
  }
  public getValue() {
    return {
      id:this._ID,
      value:this._value
    }
  }
  public onChange(e) {
    this.date = new Date(this._valueDate);

    if (!this._hideTime) this.dateTime = new Date(this._valueTime);
    else this.dateTime = new Date(this._valueDate);

    if (isNaN(this.date.getTime()) || isNaN(this.dateTime.getTime())) console.log("invalid");
    else {
      this.date.setHours(this.dateTime.getHours());
      this.date.setMinutes(this.dateTime.getMinutes());

      var options = { hour12: false, hour: '2-digit', minute:'2-digit' };


      this._placeholder = this.date.toLocaleDateString();
      this._placeholderTime = this.dateTime.toLocaleTimeString('en-US', options);

      this._valid = true;
      this._value = this.date;
    }

    let data = { id_compound:this._compound_ID, update:this._update, id:this._ID, valid:this._valid };
    this.events.publish(this._event_type, JSON.stringify(data));
    
  }
}
