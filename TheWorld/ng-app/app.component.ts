import { Component } from '@angular/core';
import { TripService } from './trip.service';

@Component({
  selector: 'tw-app',
  template: `
  <tw-trips></tw-trips>
  `,
  providers: [ TripService ]
})
export class AppComponent { }