import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Firebase } from '@ionic-native/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { ServicesProvider } from '../providers/services/services';

import { ContentAppComponent } from '../components/content-app/content-app';
import { ContentImageComponent } from '../components/content-image/content-image';
import { ContentTextComponent } from '../components/content-text/content-text';
import { ContentTitleComponent } from '../components/content-title/content-title';
import { FormAppComponent } from '../components/form-app/form-app';
import { FormButtonComponent } from '../components/form-button/form-button';
import { FormCompoundComponent } from '../components/form-compound/form-compound';
import { FormCheckComponent } from '../components/form-check/form-check';
import { FormCheckListComponent } from '../components/form-check-list/form-check-list';
import { FormDateComponent } from '../components/form-date/form-date';
import { FormInputComponent } from '../components/form-input/form-input';
import { FormQrComponent } from '../components/form-qr/form-qr';
import { FormRadioComponent } from '../components/form-radio/form-radio';
import { FormSelectComponent } from '../components/form-select/form-select';
import { FormTextareaComponent } from '../components/form-textarea/form-textarea';

const firebase = {
  apiKey:"AIzaSyBtvugBgochyN0v2OTusN2mpvsYJucX8xs",
  projectId:"flora-fe583"
}

@NgModule({
  declarations: [
    ContentAppComponent,
    ContentImageComponent,
    ContentTextComponent,
    ContentTitleComponent,
    FormAppComponent,
    FormButtonComponent,
    FormCompoundComponent,
    FormCheckComponent,
    FormCheckListComponent,
    FormDateComponent,
    FormInputComponent,
    FormQrComponent,
    FormRadioComponent,
    FormSelectComponent,
    FormTextareaComponent,
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebase), 
    AngularFirestoreModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ContentAppComponent,
    ContentImageComponent,
    ContentTextComponent,
    ContentTitleComponent,
    FormAppComponent,
    FormButtonComponent,
    FormCompoundComponent,
    FormCheckComponent,
    FormCheckListComponent,
    FormDateComponent,
    FormInputComponent,
    FormQrComponent,
    FormRadioComponent,
    FormSelectComponent,
    FormTextareaComponent,
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Firebase,
    UniqueDeviceID,
    ServicesProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
