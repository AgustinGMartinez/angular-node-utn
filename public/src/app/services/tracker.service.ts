import { Injectable } from '@angular/core';
import { Output, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  //dynamic data for all the application
  tracking:any = window.localStorage.getItem('tracking') || false;
  //only to store excersices property of workout component
  excersices:any[] = JSON.parse(window.localStorage.getItem('excersices')) || [];
  //only to store numbers property of workout component
  workoutNumbers:any[] = JSON.parse(window.localStorage.getItem('workoutNumbers')) || [];
  //only to store the id of the workout
  id:any = window.localStorage.getItem('tracked-id') || "";

  timer = {
    activated: false,
    passed: 0,
    limit: 0
  };

  interval:any = 0;

  constructor() { }

  //initializes the services on the route
  initTimer(){
    //checks for started workout
    if (this.tracking && this.timer.activated) {
      this.interval = setInterval(()=> {
        if (this.timer.passed < this.timer.limit) {
          this.timer.passed += 0.01;
        } else this.timer.passed = this.timer.limit;
      }, 10);
    }
  }

  resetTimer() {
    clearInterval(this.interval);
    this.timer.passed = 0;
    this.timer.activated = false;
  }

  save(tracking, trackedId, excersices, workoutNumbers) {
    window.localStorage.setItem('tracking', tracking);
    window.localStorage.setItem('tracked-id', trackedId);
    window.localStorage.setItem('excersices', JSON.stringify(excersices));
    window.localStorage.setItem('workoutNumbers', JSON.stringify(workoutNumbers));

  }

  update() {
    this.tracking = window.localStorage.getItem('tracking') || false;
    this.excersices = JSON.parse(window.localStorage.getItem('excersices')) || [];
    this.workoutNumbers = JSON.parse(window.localStorage.getItem('workoutNumbers')) || [];
    this.id = window.localStorage.getItem('tracked-id') || "";
  }

  resetWorkout() {
    window.localStorage.clear();
    this.tracking = false;
    this.excersices = [];
    this.workoutNumbers = [];
    this.id = "";
  }
}
