import { NgModule }      from '@angular/core';
import { HttpModule }      from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent }   from './app.component';
import { TripsComponent }   from './trips.component';
import { TripEditorComponent }   from './trip-editor.component';
import { ControlMessagesComponent } from './control-messages.component';
import { ValidationService } from './validation.service';

@NgModule({
  imports:      [ 
    BrowserModule, 
    ReactiveFormsModule, 
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: TripsComponent },
      { path: 'App/Trips', component: TripsComponent },
      { path: 'tripEditor/:tripName', component: TripEditorComponent }
    ]) ],
  declarations: [ AppComponent, TripsComponent, ControlMessagesComponent, TripEditorComponent ],
  providers: [ 
    ValidationService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }