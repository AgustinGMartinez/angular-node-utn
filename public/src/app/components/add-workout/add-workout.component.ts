import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent implements OnInit {

  workout:any = {
    name : null,
    excersices : [],
    lastDone : 0
  };

  excersices:any[] = [];

  constructor(private api:apiService, private router:Router, private messages:MessagesService) { }

  ngOnInit():void {

    this.api.getExcersices(data => {

      for (let ex of data) {
        this.excersices.push({
          name: ex.name,
          id: ex._id,
          selected: false
        });
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

  add() : void {
    let workout = this.workout;

    for (let ex of this.excersices.filter(ex => ex.selected)) {
      workout.excersices.push(ex.id);
    }

    if (workout.name == null) workout.name = "noname";

    this.api.newWorkout(workout, data => {
      console.log(data);
      this.router.navigate(['/home']);
    });
  }

  cancel() : void {
    this.router.navigate(['/home']);
  }

}
