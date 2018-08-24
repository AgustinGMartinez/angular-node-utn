//window.localStorage.clear();

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { log } from 'util';
import { subscribeOn } from '../../../../node_modules/rxjs/operators';
import { apiService } from "../../services/api.service"
import { Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TrackerService } from '../../services/tracker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  workouts:any[] = [];
  areWorkouts:boolean = true;
  tracking:boolean = false;
  trackedWorkout:string = "";
  loading:boolean = true;

  constructor(public api:apiService,
              private router:Router, private tracker:TrackerService) { }

  ngOnInit() {
    // get workouts
    this.api.getWorkouts(data => {
      this.workouts = data;

      // get excersices
      this.api.getExcersices(data => {
        let excersices = data;

        for (let workout of this.workouts) {
          // look for the name of currently tracking excersice if any
          if (workout._id == this.tracker.id) this.trackedWorkout = workout.name;
          // load excersice list for each workout
          // dunno why this is being saved into this.workout.details... it shouldnt work like that... or i'm really that
          // ignorant of how js works??...
          workout.details = [];
          for (let exercise of excersices) {
            if (workout.excersices.includes(exercise._id)) {
              workout.details.push(exercise.name);
            }
          }
        }
      });
      // set what to do if no workouts found
      if (this.workouts.length === 0) {
        this.areWorkouts = false;
      }
      // check if currently tracking
      this.tracking = this.tracker.tracking;
      // disable preloader
      this.loading = false;
    });
  }
  // start working up
  work(id:string) {
    this.router.navigate(['/workout/',id]);
  }

  quitWork() {
    if (confirm("Are you sure you want to quit the started workout?"))
    this.tracker.resetWorkout();
    this.tracker.resetTimer();
    this.tracking = false;
  }

}
