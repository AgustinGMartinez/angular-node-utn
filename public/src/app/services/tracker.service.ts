import { Injectable } from '@angular/core';
import { Output, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  //dynamic data for all the application
  tracking:boolean = false;
  //only to store excersices property of workout component
  excersices:any[] = [];
  //only to store numbers property of workout component
  workoutNumbers:any[] = [];
  //only to store the id of the workout
  id:string = "";

  timer = {
    activated: false,
    passed: 0,
    limit: 0
  };

  interval:any = 0;

  constructor() { }

  //initializes the services on the route
  init(){
    //checks for started workout
    if (this.tracking) {
      //checks for activated timer
      if (this.timer.activated) {

        this.interval = setInterval(()=> {
          if (this.timer.passed < this.timer.limit) {
            this.timer.passed += 0.01;
          } else this.timer.passed = this.timer.limit;
        }, 10);
      }
    }
  }

  stop() {
    clearInterval(this.interval);
    this.timer.passed = 0;
    this.timer.activated = false;
  }
}
