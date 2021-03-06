import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ContentImageComponent } from '../content-image/content-image';
import { ContentTextComponent } from '../content-text/content-text';
import { ContentTitleComponent } from '../content-title/content-title';
import { FormButtonComponent } from '../form-button/form-button';
import { FormCheckComponent } from '../form-check/form-check';
import { FormCheckListComponent } from '../form-check-list/form-check-list';
import { FormCompoundComponent } from '../form-compound/form-compound';
import { FormDateComponent } from '../form-date/form-date';
import { FormInputComponent } from '../form-input/form-input';
import { FormQrComponent } from '../form-qr/form-qr';
import { FormRadioComponent } from '../form-radio/form-radio';
import { FormSelectComponent } from '../form-select/form-select';
import { FormTextareaComponent } from '../form-textarea/form-textarea';
import { FormWsComponent } from '../form-ws/form-ws';

import { ServicesProvider } from '../../providers/services/services';
import { Events } from 'ionic-angular';
/**
 * Generated class for the FormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'form-app',
  templateUrl: 'form-app.html'
})
export class FormAppComponent {
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  public components = [];

  public values = [];
  public _label_submit:string;

  public _action:string;

  public _valid:boolean = false;

  public _controls = [];

  private events:Events;

  private onFormEvt;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private services:ServicesProvider) {
    this.events = this.services.events;

    this.onFormEvt = this.events.subscribe('onForm', (obj) => { this.onForm(obj); });
  }
  public ngOnDestroy() {
    try { this.onFormEvt.unsubscribe(); } catch (e) { console.log("event already destroyed") };
  }
  public onForm(objSTR) {
    let obj = JSON.parse(objSTR);
    this._valid = true;
    for (let i = 0; i < this._controls.length;i++) {
      if (this._controls[i].id == obj.id) this._controls[i].valid = obj.valid;
      if (!this._controls[i].valid) this._valid = false;

      console.log(i,this._controls[i].valid)
    }
  }
  public submitClick() {
    if (this._action == "") {
      this.events.publish("onPopupClose", "");
      this.events.publish("onSpinner", true);
      return;
    }
    let data = [];
    for (var i = 0; i < this.components.length; i++) {
      var value;
      try { value = this.components[i].instance.getValue(); } catch (e) { console.log(e); }
      if (value) data.push(value);
    }

    this.services.doPost(this._action,data).subscribe(
      resp => { this.onServiceResult(resp); },
      err => { this.events.publish("onError", "404 Server Error"); }
    );
  }
  public onServiceResult(data) {
    if (data.success) {
      this.events.publish("onSpinner", false);
      this.events.publish("onContent", data);
    } else console.log("error!!!!!!: ",JSON.stringify(data));
  }
  public startProcess() {
    for (var i = 0; i < this.values.length; i++) {
      let control = { id:this.values[i].id , valid:false };

      let arr = [];
      let result;

      switch (this.values[i].type) {
        case "WIDGET":
          arr = ["id","action","controls"];
          result = (this.validateComponent(this.values[i],arr));
          if (!result.valid) {
            let msg = "MalFormed: Missing at object of type: " + this.values[i].type + " objects: " + result.missing;
            this.events.publish("onError", msg);
            return;
          } else this.addCompoundFormComponent(this.values[i]);
          break;
          case "WSWIDGET":
          arr = ["id","action","controls"];
          result = (this.validateComponent(this.values[i],arr));
          if (!result.valid) {
            let msg = "MalFormed: Missing at object of type: " + this.values[i].type + " objects: " + result.missing;
            this.events.publish("onError", msg);
            return;
          } else this.addWsFormComponent(this.values[i]);
          break;
        case "QR":
          arr = ["id","value","required","txt_required","btn_label","label","placeholder"];
          result = (this.validateComponent(this.values[i],arr));
          if (!result.valid) {
            let msg = "MalFormed: Missing at object of type: " + this.values[i].type + " objects: " + result.missing;
            this.events.publish("onError", msg);
            return;
          } else this.addQr(this.values[i]);
          break;
        case "IMAGE":
          arr = ["source","orientation","width","height","label","description","link_type","section"];
          result = (this.validateComponent(this.values[i],arr));
          if (!result.valid) {
            let msg = "MalFormed: Missing at object of type: " + this.values[i].type + " objects: " + result.missing;
            this.events.publish("onError", msg);
            return;
          } else this.addImage(this.values[i]);
          break;
        case "TEXT":
          arr = ["label","align"];
          result = (this.validateComponent(this.values[i],arr));
          if (!result.valid) {
            let msg = "MalFormed: Missing at object of type: " + this.values[i].type + " objects: " + result.missing;
            this.events.publish("onError", msg);
            return;
          } else this.addText(this.values[i]);
          break;
        case "TITLE":
          arr = ["label","align"];
          result = (this.validateComponent(this.values[i],arr));
          if (!result.valid) {
            let msg = "MalFormed: Missing at object of type: " + this.values[i].type + " objects: " + result.missing;
            this.events.publish("onError", msg);
            return;
          } else this.addTitle(this.values[i]);
          break;
        case "BUTTON":
          arr = ["label","link","link_type","section"];
          result = (this.validateComponent(this.values[i],arr));
          if (!result.valid) {
            let msg = "MalFormed: Missing at object of type: " + this.values[i].type + " objects: " + result.missing;
            this.events.publish("onError", msg);
            return;
          } else this.addButton(this.values[i]);
          break;
        case "INPUT":
          arr = ["id","value","input_type","hidden","enabled","required","txt_required","min","max","label","placeholder"];
          result = (this.validateComponent(this.values[i],arr));
          if (!result.valid) {
            let msg = "MalFormed: Missing at object of type: " + this.values[i].type + " objects: " + result.missing;
            this.events.publish("onError", msg);
            return;
          } else this.addInput(this.values[i]);

          break;
        case "TEXTAREA":
          arr = ["id","value","enabled","required","txt_required","min","max","label","placeholder"];
          result = (this.validateComponent(this.values[i],arr));
          if (!result.valid) {
            let msg = "MalFormed: Missing at object of type: " + this.values[i].type + " objects: " + result.missing;
            this.events.publish("onError", msg);
            return;
          } else this.addTextarea(this.values[i]);

          break;
        case "CHECKBOX":
          control.valid = true;

          arr = ["id","value","enabled","required","label"];
          result = (this.validateComponent(this.values[i],arr));
          if (!result.valid) {
            let msg = "MalFormed: Missing at object of type: " + this.values[i].type + " objects: " + result.missing;
            this.events.publish("onError", msg);
            return;
          } else this.addCheckbox(this.values[i]);

          break;
        case "CHECKBOXLIST":
          arr = ["id","enabled","required","txt_required","min","max","label"];
          result = (this.validateComponent(this.values[i],arr));

          if (!result.valid) {
            let msg = "MalFormed: Missing at object of type: " + this.values[i].type + " objects: " + result.missing;
            //this.navCtrl.push(ErrorPage, data);
            this.events.publish("onError", msg);
            return;
          } else this.addCheckboxlist(this.values[i]);

          break;
        case "RADIO":
          arr = ["id","enabled","required","txt_required","label","values"];
          result = (this.validateComponent(this.values[i],arr));

          if (!result.valid) {
            let msg = "MalFormed: Missing at object of type: " + this.values[i].type + " objects: " + result.missing;
            this.events.publish("onError", msg);
            return;
          } else this.addRadio(this.values[i]);

          break;
        case "SELECT":
          arr = ["id","enabled","required","txt_required","label","placeholder","values"];
          result = (this.validateComponent(this.values[i],arr));

          if (!result.valid) {
            let msg = "MalFormed: Missing at object of type: " + this.values[i].type + " objects: " + result.missing
            this.events.publish("onError", msg);
            return;
          } else this.addSelect(this.values[i]);

          break;
          case "DATE":
            arr = ["id","hidden","enabled","required","txt_required","label"];
            result = (this.validateComponent(this.values[i],arr));

            if (!result.valid) {
              let msg = "MalFormed: Missing at object of type: " + this.values[i].type + " objects: " + result.missing;
              this.events.publish("onError", msg);
              return;
            } else this.addDate(this.values[i]);

            break;
      }
      if (this.values[i].hidden || this.values[i].type == "IMAGE" || this.values[i].type == "TITLE" || this.values[i].type == "TEXT" || this.values[i].type == "BUTTON") control.valid = true;
      this._controls.push(control);
    }
    if (this._action == "") this._valid = true;
    this.events.publish("onLoadSection","onLoadSection");

  }
  public validateComponent(obj, arr) {
    let result = {valid:true, missing:[] }
    for (let i = 0; i < arr.length; i++) if (!obj.hasOwnProperty(arr[i])) result.missing.push(arr[i]);

    if (result.missing.length) result.valid = false;

    return result;
  }
  public addQr(value:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormQrComponent);
    const component = this.container.createComponent(componentFactory);

    (<FormQrComponent>component.instance)._ID          = value.id;
    (<FormQrComponent>component.instance)._value       = value.value;

    (<FormQrComponent>component.instance)._required    = value.required;

    (<FormQrComponent>component.instance)._txt_required= value.txt_required;

    (<FormQrComponent>component.instance)._label       = value.label;
    (<FormQrComponent>component.instance)._btn_label   = value.btn_label;
    (<FormQrComponent>component.instance)._placeholder = value.placeholder;

    (<FormQrComponent>component.instance).createForm();

    this.components.push(component);
    return true;
  }
  public addImage(value:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContentImageComponent);
    const component = this.container.createComponent(componentFactory);

    (<ContentImageComponent>component.instance)._orientation = value.orientation;
    (<ContentImageComponent>component.instance)._source      = value.source;
    (<ContentImageComponent>component.instance)._label       = value.label;
    (<ContentImageComponent>component.instance)._description = value.description;

    (<ContentImageComponent>component.instance)._width       = value.width;
    (<ContentImageComponent>component.instance)._height      = value.height;

    (<ContentImageComponent>component.instance)._link        = value.link;
    (<ContentImageComponent>component.instance)._link_type   = value.link_type;
    (<ContentImageComponent>component.instance)._section     = value.section;

    this.components.push(component);
    return true;
  }
  public addText(value:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContentTextComponent);
    const component = this.container.createComponent(componentFactory);

    (<ContentTextComponent>component.instance)._label       = value.label;
    (<ContentTextComponent>component.instance)._align       = value.align;

    this.components.push(component);
    return true;
  }
  public addTitle(value:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContentTitleComponent);
    const component = this.container.createComponent(componentFactory);

    (<ContentTitleComponent>component.instance)._label       = value.label;
    (<ContentTitleComponent>component.instance)._align       = value.align;

    this.components.push(component);
    return true;
  }
  public addButton(value:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormButtonComponent);
    const component = this.container.createComponent(componentFactory);

    (<FormButtonComponent>component.instance)._label       = value.label;

    (<FormButtonComponent>component.instance)._link        = value.link;
    (<FormButtonComponent>component.instance)._link_type   = value.link_type;
    (<FormButtonComponent>component.instance)._section     = value.section;

    this.components.push(component);
    return true;
  }
  public addInput(value:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormInputComponent);
    const component = this.container.createComponent(componentFactory);

    (<FormInputComponent>component.instance)._ID          = value.id;
    (<FormInputComponent>component.instance)._value       = value.value;

    (<FormInputComponent>component.instance)._input_type  = value.input_type;
    (<FormInputComponent>component.instance)._hidden      = value.hidden;
    (<FormInputComponent>component.instance)._enabled     = value.enabled;
    (<FormInputComponent>component.instance)._required    = value.required;

    (<FormInputComponent>component.instance)._txt_required= value.txt_required;

    (<FormInputComponent>component.instance)._min         = value.min;
    (<FormInputComponent>component.instance)._max         = value.max;

    (<FormInputComponent>component.instance)._label       = value.label;
    (<FormInputComponent>component.instance)._placeholder = value.placeholder;

    (<FormInputComponent>component.instance).createForm();

    this.components.push(component);
    return true;
  }
  public addTextarea(value:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormTextareaComponent);
    const component = this.container.createComponent(componentFactory);

    (<FormTextareaComponent>component.instance)._ID          = value.id;
    (<FormTextareaComponent>component.instance)._value       = value.value;

    (<FormTextareaComponent>component.instance)._enabled     = value.enabled;
    (<FormTextareaComponent>component.instance)._required    = value.required;

    (<FormTextareaComponent>component.instance)._txt_required= value.txt_required;

    (<FormTextareaComponent>component.instance)._min         = value.min;
    (<FormTextareaComponent>component.instance)._max         = value.max;

    (<FormTextareaComponent>component.instance)._label       = value.label;
    (<FormTextareaComponent>component.instance)._placeholder = value.placeholder;

    (<FormTextareaComponent>component.instance).createForm();

    this.components.push(component);
    return true;
  }
  public addDate(value:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormDateComponent);
    const component = this.container.createComponent(componentFactory);

    (<FormDateComponent>component.instance)._ID          = value.id;
    (<FormDateComponent>component.instance)._value       = value.value;

    (<FormDateComponent>component.instance)._hidden      = value.hidden;
    (<FormDateComponent>component.instance)._enabled     = value.enabled;
    (<FormDateComponent>component.instance)._required    = value.required;

    (<FormDateComponent>component.instance)._txt_required= value.txt_required;
    (<FormDateComponent>component.instance)._txt_error   = value.txt_error;

    (<FormDateComponent>component.instance)._hideTime    = value.hideTime;

    (<FormDateComponent>component.instance)._label       = value.label;
    (<FormDateComponent>component.instance)._labelTime   = value.labelTime;
    (<FormDateComponent>component.instance)._placeholder = value.placeholder;
    (<FormDateComponent>component.instance)._placeholderTime = value.placeholderTime;

    this.components.push(component);
    return true;
  }
  public addCheckbox(value:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormCheckComponent);
    const component = this.container.createComponent(componentFactory);

    (<FormCheckComponent>component.instance)._ID          = value.id;
    (<FormCheckComponent>component.instance)._value       = value.value;

    (<FormCheckComponent>component.instance)._enabled     = value.enabled;
    (<FormCheckComponent>component.instance)._required    = value.required;

    (<FormCheckComponent>component.instance)._label       = value.label;

    this.components.push(component);
    return true;
  }
  public addCheckboxlist(value:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormCheckListComponent);
    const component = this.container.createComponent(componentFactory);

    (<FormCheckListComponent>component.instance)._ID          = value.id;

    (<FormCheckListComponent>component.instance)._enabled     = value.enabled;
    (<FormCheckListComponent>component.instance)._required    = false;

    (<FormCheckListComponent>component.instance)._txt_required= value.txt_required;

    (<FormCheckListComponent>component.instance)._min         = value.min;
    (<FormCheckListComponent>component.instance)._max         = value.max;

    (<FormCheckListComponent>component.instance)._label       = value.label;

    for (let i = 0; i < value.values.length; i++) {
      let option = {
        label:value.values[i].label,
        value:value.values[i].value,
        check:value.values[i].check
      };

      (<FormCheckListComponent>component.instance)._options.push(option);
    }
    this.components.push(component);

    return true;
  }
  public addRadio(value:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormRadioComponent);
    const component = this.container.createComponent(componentFactory);

    (<FormRadioComponent>component.instance)._ID          = value.id;

    (<FormRadioComponent>component.instance)._enabled     = value.enabled;
    (<FormRadioComponent>component.instance)._required    = value.required;

    (<FormRadioComponent>component.instance)._txt_required= value.txt_required;

    (<FormRadioComponent>component.instance)._label       = value.label;

    for (let i = 0; i < value.values.length; i++) {
      let option = {
        label:value.values[i].label,
        value:value.values[i].value,
        check:value.values[i].check
      };

      (<FormRadioComponent>component.instance)._options.push(option);
    }

    (<FormRadioComponent>component.instance).createForm();

    this.components.push(component);
    return true;
  }
  public addSelect(value:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormSelectComponent);
    const component = this.container.createComponent(componentFactory);

    (<FormSelectComponent>component.instance)._ID          = value.id;
    (<FormSelectComponent>component.instance)._value       = value.value;

    (<FormSelectComponent>component.instance)._enabled     = value.enabled;
    (<FormSelectComponent>component.instance)._required    = value.required;

    (<FormSelectComponent>component.instance)._txt_required= value.txt_required;

    (<FormSelectComponent>component.instance)._label       = value.label;
    (<FormSelectComponent>component.instance)._placeholder = value.placeholder;

    (<FormSelectComponent>component.instance).createForm();

    for (let i = 0; i < value.values.length; i++) {
      let option = {
        label:value.values[i].label,
        value:value.values[i].value
      };
      if (value.values[i].check) (<FormSelectComponent>component.instance)._value = value.values[i].value;

      (<FormSelectComponent>component.instance)._options.push(option);
    }

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
    return true;
  }
  ///Add Form View
  public addCompoundFormComponent(data:any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormCompoundComponent);
    const component = this.container.createComponent(componentFactory);

    (<FormCompoundComponent>component.instance)._ID           = data.id;

    (<FormCompoundComponent>component.instance)._action       = data.action;

    (<FormCompoundComponent>component.instance).values        = data.controls;

    (<FormCompoundComponent>component.instance).startProcess();

    this.components.push(component);
    return true;
  }
    ///Add Form View
    public addWsFormComponent(data:any) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FormWsComponent);
      const component = this.container.createComponent(componentFactory);
  
      (<FormWsComponent>component.instance)._ID           = data.id;
  
      (<FormWsComponent>component.instance)._action       = data.action;
  
      (<FormWsComponent>component.instance).values        = data.controls;
  
      (<FormWsComponent>component.instance).startProcess();
  
      this.components.push(component);
      return true;
    }
}
