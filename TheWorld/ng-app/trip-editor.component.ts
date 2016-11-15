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

        <form novalidate (ngSubmit)="onSubmit()" [formGroup]="newStopForm">
            <div class="form-group">
                <label for="nameOfStop">Location</label>
                <input formControlName="nameControl" [(ngModel)]="stopName" id="nameOfStop" />
                <control-messages [control]="newStopForm.controls.nameControl"></control-messages>
            </div>
            <div class="form-group">
                <label for="arrival">Arrival</label>
                <input formControlName="arrivalControl" [(ngModel)]="arrival" id="arrival" />
                <control-messages [control]="newStopForm.controls.arrivalControl"></control-messages>
            </div>
            <button type="submit" class="btn btn-default" [disabled]="!newStopForm.valid">Add Stop</button>
        </form>

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
      </div>
      <div class="col-md-6">
          <h1>The Map</h1>
          <div id="map"></div>
      </div>
    </div>
  `
})
export class TripEditorComponent implements OnInit {
  tripName : string = "";
  stopName: string = "";
  arrival: Date = null;
  errorMessage: string = "";
  stops: Stop[] = [];
  newStopForm: any;

  constructor(
    private _builder: FormBuilder, 
    private _route: ActivatedRoute, 
    private _router: Router, 
    private _tripService: TripService) {
      this.newStopForm = new FormGroup({
        'nameControl': new FormControl('', [Validators.required, Validators.minLength(3) ]),
        'arrivalControl': new FormControl('', [Validators.required, Validators.pattern("[0-9]{2}/[0-9]{2}/[0-9]{4}") ])
        }); 
    }

  ngOnInit(): void {
     this._route.params.subscribe(params => {
       this.tripName = params['tripName'];
    });

    this._tripService.getStops(this.tripName)
        .subscribe(stops => this.stops = stops, error => this.errorMessage = <any>error, () => {
            this.showMap(this.stops);
        });
  }

  showMap(stops): void {
      if (stops && stops.length > 0) {
          var mapStops = _.map(stops, function (stop) {
              return {
                  lat: stop.latitude,
                  long: stop.longitude,
                  info: stop.name
              }
          });

          travelMap.createMap({
              stops: mapStops,
              selector: "#map",
              currentStop: 1,
              initialZoom: 3
          });
      }
  }

  onSubmit() { 
        var newStop = new Stop(this.stopName, this.arrival);

        this._tripService.addStop(this.tripName, newStop)
          .subscribe(stop => this.stops.push(stop), error => this.errorMessage = <any>error);

        this.stopName = "";
        this.arrival = null;
    }
}