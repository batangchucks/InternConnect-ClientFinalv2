import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { logsModel } from 'src/app/shared/models/logs.model';
import { createAccount } from 'src/app/shared/services/createAcc.service';

@Component({
  selector: 'app-admin-logs',
  templateUrl: './admin-logs.component.html',
  styleUrls: ['./admin-logs.component.scss'],
})
export class AdminLogsComponent implements OnInit {
  p: number = 1;
  constructor(private Acc: createAccount,private date:DatePipe) {}
  user = JSON.parse(localStorage.getItem('user'));
  logs: logsModel[] = [];
  coordLogs: logsModel[];
  delayedStart: boolean = false;
  sampleLog: logsModel[];

  ngOnInit(): void {
    if (this.user.admin.authId == 1) {
      this.Acc.getAllLogs().subscribe(
        (profile) => {
          this.logs = profile;
        },
        (err: Error) => {

          this.ngOnInit();
        }
      );
    }

    if (this.user.admin.authId == 3) {
      this.Acc.getLogsByAdminId(this.user.admin.id).subscribe((resp) => {
        this.coordLogs = resp;
      });
    }
  }
  convertToDate(dateTime: string): string {
    return this.date.transform(dateTime,"MMM d, y, h:mm:ss a")
  }
}
