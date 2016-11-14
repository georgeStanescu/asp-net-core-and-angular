import { Injectable } from "@angular/core";
import { Trip } from "./trip";
import { Http, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class TripService {
  private tripsUrl = "/api/trips";

  constructor(private http: Http) {
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get(this.tripsUrl)
    .map((response: Response) => <Trip[]> response.json())
    .do(data => console.log('All: ' + JSON.stringify(data)))
    .catch(this.handleErrors);
  }

  private handleErrors(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'server error');
  }
}