import { Component } from '@angular/core';
import { ServicesProvider } from '../../providers/services/services';
import { Events } from 'ionic-angular';

/**
 * Generated class for the FormRadioComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'form-radio',
  templateUrl: 'form-radio.html'
})
export class FormRadioComponent {
  public _event_type:string = "onForm";

  public _compound_ID:string;

  public _ID:string;

  public _enabled:boolean;
  public _required:boolean;

  public _txt_required:string;

  public _label:string;

  public _options = [];

  public _valid:boolean;
  
  public _update:boolean = false;

  private events:Events;
  constructor(private services:ServicesProvider) {
    this.events = services.events;
  }
  public createForm() {
    this._valid = false;
    for (let i = 0; i < this._options.length; i++) if (this._options[i].check) this._valid = true;
  }
  public getValue() {
    return {
      id:this._ID,
      value:this._options
    }
  }
  public onChange(i) {
    for (let j = 0; j < this._options.length; j++) this._options[j].check = false;
    this._options[i].check = true;

    this._valid = false;
    for (let i = 0; i < this._options.length; i++) if (this._options[i].check) this._valid = true;

    let data = { id_compound:this._compound_ID, update:this._update, id:this._ID, valid:this._valid };
    this.events.publish(this._event_type, JSON.stringify(data));
  }
}
