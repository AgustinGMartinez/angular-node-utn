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

  workouts:any = [];
  areWorkouts:boolean = true;
  tracking:boolean = false;
  tracked:string = "";

  constructor(public api:apiService,
              private router:Router, private tracker:TrackerService) { }

  ngOnInit() {
    this.api.getWorkouts(data => {
      this.workouts = data;

      let excersices;

      this.api.getExcersices(data => {
        excersices = data;

        for (let workout of this.workouts) {
          if (workout._id === this.tracker.id) this.tracked = workout.name;
          workout.details = [];
          for (let exercise of excersices) {
            if (workout.excersices.includes(exercise._id)) {
              workout.details.push(exercise.name);
            }
          }
        }

      });

      if (this.workouts.length === 0) {
        this.areWorkouts = false;
      }

      this.tracking = this.tracker.tracking;
    });


  }

  work(id:string) {
    this.router.navigate(['/workout/',id]);
  }

}
