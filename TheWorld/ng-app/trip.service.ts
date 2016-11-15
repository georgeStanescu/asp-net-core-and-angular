import { Injectable } from "@angular/core";
import { Trip } from "./trip";
import { Stop } from "./stop";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
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

  addTrip(newTrip: Trip) : Observable<Trip> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(this.tripsUrl, newTrip, options)
      .map((response: Response) => <Trip> response.json())
      .catch(this.handleErrors);
  }

  getStops(tripName: string){
    var stopsUrl = "/api/trips/" + tripName + "/stops";

    return this.http.get(stopsUrl)
    .map((response: Response) => <Stop[]> response.json())
    .catch(this.handleErrors);
  }

  private handleErrors(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'server error');
  }
}