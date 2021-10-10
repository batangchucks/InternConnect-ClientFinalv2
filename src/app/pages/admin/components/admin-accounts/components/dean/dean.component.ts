import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dean',
  templateUrl: './dean.component.html',
  styleUrls: ['./dean.component.scss']
})
export class DeanComponent implements OnInit {
  AssignIndicator: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toAssign() { 
    this.AssignIndicator = true;
  } 

  toCancel() {
    this.AssignIndicator = false;
  } 

}
