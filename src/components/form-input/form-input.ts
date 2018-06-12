import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesProvider } from '../../providers/services/services';
import { Events } from 'ionic-angular';

/**
 * Generated class for the FormImputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'form-input',
  templateUrl: 'form-input.html'
})
export class FormInputComponent {
    public _event_type:string = "onForm";

    public _compound_ID:string;

    public _ID:string;
    public _value:string;

    public _hidden:boolean;
    public _enabled:boolean;
    public _required:boolean;

    public _input_type:string;

    public _txt_required:string;

    public _min:number;
    public _max:number;

    public _label:string;
    public _placeholder:string;

    public _form:FormGroup;

    public _update:boolean = false;
    
    private events:Events;
    constructor(private _fb:FormBuilder, private services:ServicesProvider) {
      this.events = services.events;
    }
    public createForm() {
      this._form = this._fb.group({data:[""]});

      if (this._hidden) return;

      let validators = [];
      if (this._required) validators.push(Validators.required);
      if (this._required) validators.push(Validators.minLength(this._min));
      if (this._required) validators.push(Validators.maxLength(this._max));
      this._form.controls["data"].setValidators(validators);

      if (!this._enabled) this._form.controls["data"].disable();
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

      let data = { id_compound:this._compound_ID, update:this._update, id:this._ID, valid:this._form.controls['data'].valid };
      this.events.publish(this._event_type, JSON.stringify(data));
    }
  }
