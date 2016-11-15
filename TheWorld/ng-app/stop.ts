export class Stop {
  name: string;
  latitude: number;
  longitude: number;
  order: number;
  arrival: Date;

  constructor(name: string, arrival: Date) {
    this.name = name;
    this.arrival = arrival;    
  }
}