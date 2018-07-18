import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  states:any = {};

  constructor( public alerts : MessagesService ) { }

  ngOnInit() {
    $('.navbar-nav li').on("click", () => {
      $('.navbar-toggler').click();
    });

    setInterval(()=> {
      this.states = this.alerts.states;
      this.checkAlerts();
    }, 250);
  }

  checkAlerts() {

    if (this.states.animating && !this.states.animated) {
      if (this.states.success) {
        let $success = $('.success-alert');
        $success.show();
        this.states.animated = true;
      }

      if (this.states.error) {
        let $errorBox = $('.error-alert');
        $errorBox.show();
        this.states.animated = true;
      }
    }

    if (!this.states.animating) $('.alert').fadeOut();
  }

}
