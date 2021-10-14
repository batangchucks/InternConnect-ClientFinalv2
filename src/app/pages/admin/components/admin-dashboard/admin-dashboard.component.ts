import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import {
  studentDashboardModel,
  studentModel,
} from 'src/app/shared/models/students.model';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  chart: any;
  user = JSON.parse(localStorage.getItem('user'));
  studentList: studentDashboardModel[] = [];

  studentsEnrolled: number;
  studentsWithCompany: number;
  studentsWithoutCompany: number;
  studentsWithRequests: number;

  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    this.dashboard.getStudentList().subscribe((resp) => {
      this.studentList = resp;
      console.log(resp);
      this.studentsWithCompany = resp.filter((student) => {
        return (
          student.submissions.slice(-1)[0].adminResponse.companyAgrees == true
        );
      }).length;
      this.studentsWithoutCompany = resp.filter((student) => {
        return student.submissions == null;
      }).length;
      console.log(resp);

      this.studentsWithRequests = resp.filter((student) => {
        return (
          student.submissions.slice(-1)[0].adminResponse.companyAgrees == false
        );
      }).length;
    });

    this.chart = document.getElementById('status_chart');
    Chart.register(...registerables);
    this.loadStudentsChart(
      this.studentsWithCompany,
      this.studentsWithoutCompany
    );

    this.chart = document.getElementById('company_chart');
    Chart.register(...registerables);
    this.loadCompanyChart();
  }

  loadStudentsChart(
    studentsWithCompany: number,
    studentsWithoutCompany: number
  ): void {
    new Chart(this.chart, {
      type: 'doughnut',
      data: {
        labels: ['Students with Company', 'Students without company'],
        datasets: [
          {
            data: [studentsWithCompany, 250],
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
