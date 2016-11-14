import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }   from '@angular/forms';

import { AppComponent }   from './app.component';
import { TripsComponent }   from './trips.component';
import { ControlMessagesComponent } from './control-messages.component';
import { ValidationService } from './validation.service';

@NgModule({
  imports:      [ BrowserModule, ReactiveFormsModule ],
  declarations: [ AppComponent, TripsComponent, ControlMessagesComponent ],
  providers: [ ValidationService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }