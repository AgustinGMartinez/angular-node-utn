import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-workout',
  templateUrl: './edit-workout.component.html',
  styleUrls: ['./edit-workout.component.css']
})
export class EditWorkoutComponent implements OnInit {

  workout:any = {};
  id:string = "";
  excersices:any[] = [];

  constructor(public api:apiService,
              public router:Router,
              public activatedRoute:ActivatedRoute,
              public location:Location) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
      this.api.getWorkouts( data => {
        for (let w of data) {
          if (w._id === params['id']) {
            this.workout = w;
          }
        }
      });
    });

    this.api.getExcersices(data => {

      for (let ex of data) {
        this.excersices.push({
          name: ex.name,
          id: ex._id,
          selected: false
        });
      }

      for (let ex of this.excersices) {
        if (this.workout.excersices.includes(ex.id)) {
          ex.selected = true;
        }
      }

      this.excersices.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    });
  }

  save() : void {
    let workout = {
      name: this.workout.name,
      excersices: [],
      lastDone: this.workout.lastDone
    }

    for (let ex of this.excersices.filter(ex => ex.selected)) {
      workout.excersices.push(ex.id);
    }

    if (workout.name == null) workout.name = "no name";

    this.api.updateWorkout(this.workout._id, workout, data => {
      console.log(data);
      this.location.back();
    });
  }

  deleteWorkout() {
    if (confirm('you sure to delete this?')) {
      this.api.deleteWorkout(this.id, data => {
        console.log(data);
        this.router.navigate(['home/']);
      });
    }
  }

  cancel() {
    this.location.back();
  }

}
