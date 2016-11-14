import { Component } from '@angular/core';
import { Trip } from './trip';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './validation.service';
import { ControlMessagesComponent } from './control-messages.component';

@Component({
    selector: 'tw-trips',
    template: `
        <table class="table table-responsive table-striped" *ngIf='trips && trips.length'>
            <tr *ngFor='let trip of trips'>
                <td>{{ trip.name }}</td>
                <td>{{ trip.dateCreated | date : 'dd.MM.yyyy' }}</td>
                <td>
                    <a href="#" class="btn btn-sm btn-primary">Manage</a>
                </td>
            </tr>
        </table>

        <h1>Create trip</h1>
        <form (ngSubmit)="onSubmit()" [formGroup]="newTripForm">
        <div class="form-group">
            <label for="nameOfTrip">Name</label>
            <input formControlName="nameControl" [(ngModel)]="tripName" id="nameOfTrip" />
            <control-messages [control]="newTripForm.controls.nameControl"></control-messages>
        </div>
        <button type="submit" class="btn btn-default" [disabled]="!newTripForm.valid">Submit</button>
        </form>
    `
})
export class TripsComponent {
    trips: Trip[] = [ new Trip("US Trip", new Date()), new Trip("World Trip", new Date()) ];
    tripName: string = "";
    newTripForm: any;

    constructor(private builder: FormBuilder) {   
        this.newTripForm = new FormGroup({
        'nameControl': new FormControl('', [Validators.required, Validators.minLength(5), ValidationService.nameValidator ])
        }); 
    }
    
    onSubmit() { 
        this.trips.push(new Trip(this.tripName, new Date()));

        this.tripName = "";
    }
}