import { Component } from '@angular/core';
import { ServicesProvider } from '../../providers/services/services';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ContentImageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'content-image',
  templateUrl: 'content-image.html'
})
export class ContentImageComponent {
  public _orientation:string;

  public _source:string;

  public _label:string;
  public _description:string;

  public _width:Number;
  public _height:Number;

  public _link:string;
  public _link_type:string;
  public _section:string;
  public _section_data:any;

  public _valid:boolean = true;

  private events:Events;
  constructor(private services:ServicesProvider) {
    this.events = services.events;
  }
  public onClick() {
    switch (this._link_type)
    {
      case "LINK":
        this.services.doExternal(this._link);
        break;
      case "SECTION":
        this.services.doPost(this._section,this._section_data).subscribe(
          data => { this.onServiceResult(data); },
          err => { this.events.publish("onError", "404 Server Error"); }
        );
        break;
    }
  }
  public onServiceResult(result) {
    if (result.success == true) {
      this.events.publish("onSpinner", false);
      this.events.publish("onSuccess", result.message);
    } else this.events.publish("onError", result.message);
  }
}
