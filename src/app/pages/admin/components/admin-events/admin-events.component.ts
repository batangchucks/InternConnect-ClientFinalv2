import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit {

  DeleteIndicator: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toCancel(){
    this.DeleteIndicator = false;
  }

}
