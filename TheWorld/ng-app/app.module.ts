import { NgModule }      from '@angular/core';
import { HttpModule }      from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent }   from './app.component';
import { TripsComponent }   from './trips.component';
import { ControlMessagesComponent } from './control-messages.component';
import { ValidationService } from './validation.service';

@NgModule({
  imports:      [ 
    BrowserModule, 
    ReactiveFormsModule, 
    HttpModule,
    RouterModule.forRoot([
      { path: 'App/Trips', component: TripsComponent },
      { path: '', redirectTo: 'App/Trips', pathMatch: 'full' },
      { path: '**', redirectTo: 'App/Trips', pathMatch: 'full' }
    ]) ],
  declarations: [ AppComponent, TripsComponent, ControlMessagesComponent ],
  providers: [ ValidationService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }