import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { studentModel } from 'src/app/shared/models/students.model';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  chart: any;
  user = JSON.parse(localStorage.getItem('user'));
  studentList: studentModel[] = [];

  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.dashboard.getStudentList().subscribe((resp) => {
      this.studentList = resp;
    });

    this.chart = document.getElementById('status_chart');
    Chart.register(...registerables);
    this.loadStudentsChart();

    this.chart = document.getElementById('company_chart');
    Chart.register(...registerables);
    this.loadCompanyChart();
  }

  loadStudentsChart(): void {
    new Chart(this.chart, {
      type: 'doughnut',
      data: {
        labels: ['Students with Company', 'Students without company'],
        datasets: [
          {
            data: [174, 28],
            backgroundColor: ['#F4D35E', '#73A580'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
    });
  }

  loadCompanyChart(): void {
    new Chart(this.chart, {
      type: 'bar',
      data: {
        labels: ['Company A', 'Company B', 'Company C', 'Company D'],
        datasets: [
          {
            data: [100, 28, 25, 34],
            backgroundColor: ['#FFE6E8', '#F2CCC3', '#E78F8E'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
      },
    });
  }
}
