import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
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

  title:any = "";

  id:any = "";

  constructor(public location: Location,
    public api:apiService,
    public activatedRoute:ActivatedRoute,
    public router:Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe( params => {
      this.api.getExcersices(data => {
          this.excersice = data.filter(ex => ex._id === params['id'])[0];
          this.id = params['id'];
        });
    });
  }

  save() : void {
    this.excersice.name = this.excersice.name.toLowerCase();
    this.excersice.difficulty = this.excersice.difficulty.toLowerCase();

    this.api.updateExcersice(this.id, this.excersice, data => {
      this.location.back();
    });
  }

  cancel() : void {
    this.location.back();
  }

}
