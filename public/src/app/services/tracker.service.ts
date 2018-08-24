import { Injectable } from '@angular/core';
import { Output, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  //dynamic data for all the application
  tracking:any = localStorage.getItem('tracking') || false;
  //only to store excersices property of workout component
  excersices:any[] = JSON.parse(localStorage.getItem('excersices')) || [];
  //only to store numbers property of workout component
  workoutNumbers:any[] = JSON.parse(localStorage.getItem('workoutNumbers')) || [];
  //only to store the id of the workout
  id:any = localStorage.getItem('tracked-id') || "";

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
    localStorage.setItem('tracking', tracking);
    localStorage.setItem('tracked-id', trackedId);
    localStorage.setItem('excersices', JSON.stringify(excersices));
    localStorage.setItem('workoutNumbers', JSON.stringify(workoutNumbers));
  }

  update() {
    this.tracking = localStorage.getItem('tracking') || false;
    this.excersices = JSON.parse(localStorage.getItem('excersices')) || [];
    this.workoutNumbers = JSON.parse(localStorage.getItem('workoutNumbers')) || [];
    this.id = localStorage.getItem('tracked-id') || "";
  }

  resetWorkout() {
    localStorage.clear();
    this.tracking = false;
    this.excersices = [];
    this.workoutNumbers = [];
    this.id = "";
  }
}
