import { Component } from '@angular/core';
import { TripService } from './trip.service';

@Component({
  selector: 'tw-app',
  template: `
    <router-outlet></router-outlet>
  `,
  providers: [ TripService ]
})
export class AppComponent { }