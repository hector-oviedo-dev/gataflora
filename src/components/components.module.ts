import { NgModule } from '@angular/core';
import { FormCompoundComponent } from './form-compound/form-compound';
import { FormWsComponent } from './form-ws/form-ws';
@NgModule({
	declarations: [FormCompoundComponent,
    FormWsComponent],
	imports: [],
	exports: [FormCompoundComponent,
    FormWsComponent]
})
export class ComponentsModule {}
