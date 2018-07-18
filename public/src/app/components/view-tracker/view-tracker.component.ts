import { Component, OnInit } from '@angular/core';
import { TrackerService } from '../../services/tracker.service';

@Component({
  selector: 'app-view-tracker',
  templateUrl: './view-tracker.component.html',
  styleUrls: ['./view-tracker.component.css']
})
export class ViewTrackerComponent implements OnInit {

  check:any = {timer: false}
  timeWidth = "";

  constructor(public tracker:TrackerService ) { }

  ngOnInit() {
    setInterval(()=> {
      this.check = this.tracker;
      if (this.tracker.timer.activated && this.tracker.timer.limit !== 0) this.timeWidth = this.tracker.timer.passed * 100 / this.tracker.timer.limit + 'vw';
    }, 100);
  }

  cancelTimer() {
    this.tracker.stop();
  }

}
