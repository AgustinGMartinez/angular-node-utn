import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import 'rxjs/Rx';
import { MessagesService } from './messages.service'
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class apiService {

  workouts: any[]=[];
  excersices: any[]=[];

  workout: any = {};
  excersice: any = {};


  constructor(public http: HttpClient, public alerts: MessagesService) { }

  getWorkouts(callback: (data) => void) {
    let url = "https://agustin-utn.herokuapp.com/workouts";

    return this.http.get(url)
    .subscribe(res => {
      callback(res);
    });

  }

  getExcersices(callback: (data) => void) {
    let url = "https://agustin-utn.herokuapp.com/excersices";

    return this.http.get(url)
    .subscribe(res => {
      callback(res);
    });

  }

  newWorkout(workout, callback: (data) => void) {
    let url = "https://agustin-utn.herokuapp.com/workouts";

    return this.http.post(url, workout)
    .subscribe(res => {
      callback(res);
      this.alerts.success();
    }, err => {
      this.alerts.error();
      console.log("There is a connection error", err);
    });
  }

  newExcersice(excersice, callback: (data) => void) {
    let url = "https://agustin-utn.herokuapp.com/excersices";

    return this.http.post(url, excersice)
    .subscribe(res => {
      callback(res);
      this.alerts.success();
    }, err => {
      this.alerts.error();
      console.log("There is a connection error", err);
    });
  }

  updateWorkout(id, workout, callback: (data) => void) {
    let url = "https://agustin-utn.herokuapp.com/workout/" + id;

    return this.http.put(url, workout)
    .subscribe(res => {
      callback(res);
      this.alerts.success();
    }, err => {
      this.alerts.error();
      console.log("There is a connection error", err);
    });
  }

  updateExcersice(id, excersice, callback: (data) => void) {
    let url = "https://agustin-utn.herokuapp.com/excersice/" + id;

    return this.http.put(url, excersice)
    .subscribe(res => {
      callback(res);
      this.alerts.success();
    }, err => {
      this.alerts.error();
      console.log("There is a connection error", err);
    });
  }

  deleteWorkout(id, callback: (data) => void) {
    let url = window.location.protocol + '//' + window.location.host + "/workout/" + id;

    return this.http.delete(url)
    .subscribe(res => {
      callback(res);
      this.alerts.success();
    }, err => {
      this.alerts.error();
      console.log("There is a connection error", err);
    });
  }

  deleteExcersice(id, callback: (data) => void) {
    let url = window.location.protocol + '//' + window.location.host + "/excersice/" + id;

    return this.http.delete(url)
    .subscribe(res => {
      callback(res);
      this.alerts.success();
    }, err => {
      this.alerts.error();
      console.log("There is a connection error", err);
    });
  }

}
