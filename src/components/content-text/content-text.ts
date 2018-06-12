import { Component } from '@angular/core';

/**
 * Generated class for the ContentTextComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'content-text',
  templateUrl: 'content-text.html'
})
export class ContentTextComponent {
  public _label:string;
  public _align:string;
  
  public _valid:boolean = true;
  constructor() {
  }
}
