import { Component, OnInit } from '@angular/core';
import { apiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-excersices',
  templateUrl: './manage-excersices.component.html',
  styleUrls: ['./manage-excersices.component.css']
})
export class ManageExcersicesComponent implements OnInit {

  excersices:any[] = [];

  constructor(public api:apiService,
              public router:Router) { }

  ngOnInit() {
    this.api.getExcersices(data => {

      for (let ex of data) {
        this.excersices = data;
      }

      this.excersices.sort(function (a, b) {
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

  edit(id : string) {
    this.router.navigate(['/excersice/edit',id]);
  }

  delete(id:string, name:string) {

    if (confirm("are you sure you want to delete" + name + "?")) {
      this.api.deleteExcersice(id, data => {
        console.log(data);

        if (data.msg === "deleted") {
          for (let i = 0; i < this.excersices.length; i++) {
            if (this.excersices[i]._id === id) this.excersices.splice(i, 1);
          }
        }
      });
    }

    else return;
  }

}
