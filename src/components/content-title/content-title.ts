import { Component } from '@angular/core';

/**
 * Generated class for the ContentTitleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'content-title',
  templateUrl: 'content-title.html'
})
export class ContentTitleComponent {
  public _label:string;
  public _align:string;
  
  public _valid:boolean = true;
  constructor() {
  }
}
