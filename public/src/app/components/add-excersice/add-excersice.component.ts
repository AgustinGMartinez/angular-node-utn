import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-excersice',
  templateUrl: './add-excersice.component.html',
  styleUrls: ['./add-excersice.component.css']
})
export class AddExcersiceComponent implements OnInit {

  excersice:any = {
    name : "",
    lastWeightUsed: 0,
    restingTime: 90,
    reps: 5,
    sets: 5,
    difficulty: ""
  }

  constructor(private location: Location,
    public api:apiService,
    public router:Router) { }

  ngOnInit() {
  }

  add() : void {
    this.excersice.name = this.excersice.name.toLowerCase();
    this.excersice.difficulty = this.excersice.difficulty.toLowerCase();

    console.log(this.excersice);

    this.api.newExcersice( this.excersice, data => {
      this.location.back();
    });
  }
  
  cancelar() : void {
    this.location.back();
  }
}
