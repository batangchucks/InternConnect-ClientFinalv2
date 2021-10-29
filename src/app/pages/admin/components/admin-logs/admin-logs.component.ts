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
  constructor(private Acc: createAccount) {}
  user = JSON.parse(localStorage.getItem('user'));
  logs: logsModel[] = [];
  coordLogs: logsModel[]
  delayedStart: boolean = false
  sampleLog: logsModel[]

  ngOnInit(): void {
      this.Acc.getAllLogs().subscribe((profile) => {
        this.logs = profile;
        this.coordLogs =
          profile.filter((log) => {
            return log.actorEmail.toUpperCase() == this.user.email;
          });
      },(err:Error)=> {
        alert("An error has occured");
        this.ngOnInit();
      });
  }
}
