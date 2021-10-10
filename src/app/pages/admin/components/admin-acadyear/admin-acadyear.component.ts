import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-acadyear',
  templateUrl: './admin-acadyear.component.html',
  styleUrls: ['./admin-acadyear.component.scss']
})
export class AdminAcadyearComponent implements OnInit {
  AcadYearIndicator: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  toConfirm() { 
    this.AcadYearIndicator = true;
  } 

  toCancel() {
    this.AcadYearIndicator = false;
  } 

}
