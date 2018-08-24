import { Component, OnInit, Output, EventEmitter, OnDestroy  } from '@angular/core';
import { apiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TrackerService } from '../../services/tracker.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit, OnDestroy {

  id:string = '';
  workout:any = {}
  excersices:any[] = [];
  numbers:any[] = [];
  allDone:boolean = false;
  loading:boolean = true;


  constructor(public api:apiService,
    private activatedRoute:ActivatedRoute,
    public router:Router,
    private location:Location, private tracker : TrackerService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe( params => {
      this.id = params['id'];
      this.api.getWorkouts(data => {
          this.workout = data.filter(w => w._id === params['id'])[0];

          if (this.tracker.tracking && this.id === this.tracker.id) {
            this.excersices = this.tracker.excersices;
            this.numbers = this.tracker.workoutNumbers;
            this.checkAllDone();
          } else {
            this.api.getExcersices(data => {
              let i = -1;
              for (let ex of data) {
                if (this.workout.excersices.includes(ex._id)) {
                  i++;
                  this.excersices.push(ex);
                  this.excersices[i]['done'] = [];
                  let temp = [];
                  for (let i=0;i<ex.sets;i++) {
                    temp.push(i);
                  }
                  this.numbers.push(temp);
                }
              }
            });
          }
        });
    });
    // removes loader
    this.loading = false;
  }

  registerSet(i, n) {
    if (this.excersices[i].done.includes(n+1)) {
      this.excersices[i].done.splice(this.excersices[i].done.indexOf(n+1),1);
      this.checkAllDone();
      return false;
    }
    else {
      this.excersices[i].done.push(n+1);
      this.checkAllDone();
      return true;
    }
  }

  checkSet(i, n) {
    return (this.excersices[i].done.includes(n+1));
  }

  checkAllDone() {
      let readyToGo = true;

      for (let i in this.excersices) {
        if (this.excersices[i].done.length !== this.excersices[i].sets) readyToGo = false;
      }

      this.allDone = readyToGo;
  }

  editWorkout() {
    this.activatedRoute.params.subscribe( params => {
      this.router.navigate(['workout/edit/',params['id']]);
    });
  }

  editExcersice(id) {
    this.router.navigate(['excersice/edit',id]);
  }

  checkAll() {
    if (confirm("Are you sure you want to mark all sets as finished?")) {
      for (let excersice of this.excersices) {
        excersice.done = [];

        for (let i = 1; i <= excersice.sets; i++) {
          excersice.done.push(i);
        }
      }
    }
    this.tracker.save(true, this.id, this.excersices, this.numbers);
    this.checkAllDone();
  }

  triggerTracker(restingTime, i, n) {
    if (this.tracker.id !== "" && this.tracker.id !== this.id && this.tracker.tracking) {
      alert("Finish or quit the started workout first!");
      return;
    }
    // if user is removing a set done, we shouldn't restart the timer
    if (!this.registerSet(i, n)) {
      return;
    }
    this.tracker.resetTimer();
    this.tracker.save(true, this.id, this.excersices, this.numbers);
    this.tracker.update();
    this.tracker.timer.limit = restingTime;
    this.tracker.timer.activated = true;
    this.tracker.timer.passed = 0;
    this.tracker.initTimer();
  }

  finish() {
    this.tracker.resetWorkout();
    this.tracker.resetTimer();
    this.tracker.update();
    let workout =  this.workout;
    workout.lastDone = Date.now();
    this.api.updateWorkout(this.id, workout, data => {
      this.router.navigate(['home']);
    });
  }

  ngOnDestroy() {
    if (this.id === this.tracker.id) {
      this.tracker.save(true, this.tracker.id, this.excersices, this.numbers);
      this.tracker.update();
    }
  }
}
