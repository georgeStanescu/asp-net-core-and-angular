import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TripService } from './trip.service';
import { Stop } from './stop';

@Component({
  template: `
    <div>
      <a [routerLink]="['/']" class="btn btn-sm btn-default">
        <i class="fa fa-angle-left"></i> Back
      </a>
      <div class="col-md-6">
        <h1>{{ tripName }}</h1>
        <div class="alert alert-danger" *ngIf='errorMessage'>{{errorMessage}}</div>

        <table class="table table-responsive table-striped" *ngIf='stops && stops.length'>
          <tr>
            <th>Location</th>
            <th>Arrival</th>
          </tr>

          <tr *ngFor="let stop of stops">
            <td>{{ stop.name }}</td>
            <td>{{ stop.arrival | date: shortDate }}</td>
          </tr>
        </table>

        <div>
            <div class="form-group">
                <label>Date</label>
                <input class="form-control" />
            </div>
            <div class="form-group">
                <label>Location</label>
                <input class="form-control" />
            </div>
            <div class="form-group">
                <input type="submit" value="Add" class="btn btn-success" />
            </div>
        </div>
      </div>
      <div class="col-md-6">
          <h1>The Map</h1>

      </div>
    </div>
  `
})
export class TripEditorComponent implements OnInit {
  tripName : string = "";
  errorMessage: string = "";
  stops: Stop[] = [];

  constructor(private _route: ActivatedRoute, private _router: Router, private _tripService: TripService) {}

  ngOnInit(): void {
     this._route.params.subscribe(params => {
       this.tripName = params['tripName'];
    });

    this._tripService.getStops(this.tripName)
            .subscribe(stops => this.stops = stops, error => this.errorMessage = <any>error, () => { });
  }
}