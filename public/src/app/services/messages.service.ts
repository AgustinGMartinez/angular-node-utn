import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  states = {
    success : false,
    error : false,
    warning : false,
    animating: false,
    animated: false
  }

  constructor() { }

  success() {
    this.states.success = true;
    this.states.animating = true;

    setTimeout(()=> {
      this.states.success = false;
      this.states.animating = false;
      this.states.animated = false;
    }, 5000);
  }

  error() {
    this.states.error = true;
    this.states.animating = true;

    setTimeout(()=> {
      this.states.error = false;
      this.states.animating = false;
      this.states.animated = false;
    }, 5000);
  }
}
