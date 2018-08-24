import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { TrackerService } from '../../services/tracker.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-excersice',
  templateUrl: './edit-excersice.component.html',
  styleUrls: ['./edit-excersice.component.css']
})
export class EditExcersiceComponent implements OnInit {

  excersice:any = {
    name : "",
    lastWeightUsed: 0,
    restingTime: 90,
    reps: 5,
    sets: 5,
    difficulty: ""
  }

  title:string = "";

  id:string = "";

  constructor(public location: Location,
    public api:apiService,
    public activatedRoute:ActivatedRoute,
    public router:Router,
    private tracker:TrackerService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe( params => {
      this.api.getExcersices(data => {
          this.excersice = data.filter(ex => ex._id === params['id'])[0];
          this.id = params['id'];
        });
    });
  }

  // placeholder error handler
  fieldsAreValid():boolean {
    if (isNaN(Number(this.excersice.lastWeightUsed.toString().replace(/\,/,".")))) {
      alert("Weight not valid!");
      return false;
    }
    if (isNaN(Number(this.excersice.restingTime))) {
      alert("Resting time not valid!");
      return false;
    }
    if (isNaN(Number(this.excersice.reps))) {
      alert("Reps not valid!");
      return false;
    }
    if (isNaN(Number(this.excersice.sets))) {
      alert("Sets not valid!");
      return false;
    }

    this.excersice.lastWeightUsed = Number(this.excersice.lastWeightUsed.toString().replace(/\,/,"."));
    this.excersice.restingTime = Number(this.excersice.restingTime);
    this.excersice.reps = Number(this.excersice.reps);
    this.excersice.sets = Number(this.excersice.sets);

    return true;
  }

  save() : void {
    if(!this.fieldsAreValid()) return;

    this.excersice.name = this.excersice.name.toString().toLowerCase();
    this.excersice.difficulty = this.excersice.difficulty.toString().toLowerCase();

    // update excersice info in the tracker
    if (this.tracker.tracking) {
      for (let ex of this.tracker.excersices) {
        if (ex._id === this.id) {
          ex.name = this.excersice.name;
          ex.lastWeightUsed = this.excersice.lastWeightUsed;
          ex.restingTime = this.excersice.restingTime;
          ex.reps = this.excersice.reps;
          ex.sets = this.excersice.sets;
          ex.difficulty = this.excersice.difficulty;

          let temp = [];
          for (let i=0;i<ex.sets;i++) {
            temp.push(i);
          }
          this.tracker.workoutNumbers[this.id] = temp;
        }
      }
    }

    this.api.updateExcersice(this.id, this.excersice, data => {
      this.location.back();
    });
  }

  cancel() : void {
    this.location.back();
  }

}
