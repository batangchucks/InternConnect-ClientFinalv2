import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { CompanyOccurence } from 'src/app/shared/models/dashboard.model';
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

  companyNameWithOccurence: CompanyOccurence[];

  constructor(private dashboard: DashboardService) {}

  ngOnInit(): void {
    // this.dashboard
    //   .getCompanyWithHighestOccurence('whole', 0)
    //   .subscribe((resp) => {
    //     this.chart = document.getElementById('company_chart');
    //     Chart.register(...registerables);
    //     this.loadCompanyChart(resp);
    //   });

    if (this.user.admin.authId == 1 || this.user.admin.authId == 4) {
      this.dashboard
        .getCompanyWithHighestOccurence('whole', 0)
        .subscribe((resp) => {
          this.companyNameWithOccurence = resp;
          this.chart = document.getElementById('company_chart');
          Chart.register(...registerables);
          this.loadCompanyChart(resp);
        },(err:Error)=> {
          alert("An error has occured");
          this.ngOnInit();
        });

      this.dashboard.getStudentList('whole', 0).subscribe((resp) => {
        this.studentList = resp;

        var studentsWithSubmissions = resp.filter((student) => {
          return student.submissions.length > 0;
        });

        this.studentsWithCompany = studentsWithSubmissions.filter((student) => {
          return (
            student.submissions.slice(-1)[0].adminResponse.companyAgrees == true
          );
        }).length;
        this.studentsWithoutCompany = resp.filter((student) => {
          return (
            student.submissions.length <= 0 ||
            (student.submissions.slice(-1)[0].adminResponse.companyAgrees ==
              false &&
              student.submissions.slice(-1)[0].adminResponse.comments != null)
          );
        }).length;

        this.studentsWithRequests = studentsWithSubmissions.filter(
          (student) => {
            return (
              student.submissions.slice(-1)[0].adminResponse.companyAgrees ==
              false
            );
          }
        ).length;
        this.chart = document.getElementById('status_chart');
        Chart.register(...registerables);
        this.loadStudentsChart(
          this.studentsWithCompany,
          this.studentsWithoutCompany
        );
      });
    }

    if (this.user.admin.authId == 2) {
      this.dashboard
        .getCompanyWithHighestOccurence('program', this.user.admin.programId)
        .subscribe((resp) => {
          this.companyNameWithOccurence = resp;

          this.chart = document.getElementById('company_chart');
          Chart.register(...registerables);
          this.loadCompanyChart(resp);
        },(err:Error)=> {
          alert("An error has occured");
          this.ngOnInit();
        });
      this.dashboard
        .getStudentList('program', this.user.admin.programId)
        .subscribe((resp) => {
          this.studentList = resp;

          var studentsWithSubmissions = resp.filter((student) => {
            return student.submissions.length > 0;
          });

          this.studentsWithCompany = studentsWithSubmissions.filter(
            (student) => {
              return (
                student.submissions.slice(-1)[0].adminResponse.companyAgrees ==
                true
              );
            }
          ).length;
          this.studentsWithoutCompany = resp.filter((student) => {
            return (
              student.submissions.length <= 0 ||
              (student.submissions.slice(-1)[0].adminResponse.companyAgrees ==
                false &&
                student.submissions.slice(-1)[0].adminResponse.comments != null)
            );
          }).length;

          this.studentsWithRequests = studentsWithSubmissions.filter(
            (student) => {
              return (
                student.submissions.slice(-1)[0].adminResponse.companyAgrees ==
                false
              );
            }
          ).length;
          this.chart = document.getElementById('status_chart');
          Chart.register(...registerables);
          this.loadStudentsChart(
            this.studentsWithCompany,
            this.studentsWithoutCompany
          );
        },(err:Error)=> {
          alert("An error has occured");
          this.ngOnInit();
        });
    }
    if (this.user.admin.authId == 3) {
      this.dashboard
        .getCompanyWithHighestOccurence('section', this.user.admin.sectionId)
        .subscribe((resp) => {
          this.companyNameWithOccurence = resp;
          this.chart = document.getElementById('company_chart');
          Chart.register(...registerables);
          this.loadCompanyChart(resp);
        },(err:Error)=> {
          alert("An error has occured");
          this.ngOnInit();
        });
      this.dashboard
        .getStudentList('section', this.user.admin.sectionId)
        .subscribe((resp) => {
          this.studentList = resp;

          var studentsWithSubmissions = resp.filter((student) => {
            return student.submissions.length > 0;
          });

          this.studentsWithCompany = studentsWithSubmissions.filter(
            (student) => {
              return (
                student.submissions.slice(-1)[0].adminResponse.companyAgrees ==
                true
              );
            }
          ).length;
          this.studentsWithoutCompany = resp.filter((student) => {
            return (
              student.submissions.length <= 0 ||
              (student.submissions.slice(-1)[0].adminResponse.companyAgrees ==
                false &&
                student.submissions.slice(-1)[0].adminResponse.comments != null)
            );
          }).length;

          this.studentsWithRequests = studentsWithSubmissions.filter(
            (student) => {
              return (
                student.submissions.slice(-1)[0].adminResponse.companyAgrees ==
                false
              );
            }
          ).length;
          this.chart = document.getElementById('status_chart');
          Chart.register(...registerables);
          this.loadStudentsChart(
            this.studentsWithCompany,
            this.studentsWithoutCompany
          );
        },(err:Error)=> {
          alert("An error has occured");
          this.ngOnInit();
        });
    }
  }

  loadStudentsChart(withCompany: number, withoutCompany: number): void {
    new Chart(this.chart, {
      type: 'doughnut',
      data: {
        labels: ['Students with Company', 'Students without company'],
        datasets: [
          {
            data: [withCompany, withoutCompany],
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

  loadCompanyChart(companyNameWithOccurence: CompanyOccurence[]): void {
    new Chart(this.chart, {
      type: 'bar',
      data: {
        labels: [
          companyNameWithOccurence[0].companyName,
          companyNameWithOccurence[1].companyName,
          companyNameWithOccurence[2].companyName,
          companyNameWithOccurence[3].companyName,
        ],
        datasets: [
          {
            data: [
              companyNameWithOccurence[0].numberOfOccurence,
              companyNameWithOccurence[1].numberOfOccurence,
              companyNameWithOccurence[2].numberOfOccurence,
              companyNameWithOccurence[3].numberOfOccurence,
            ],
            label: 'Number of submissions',
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
