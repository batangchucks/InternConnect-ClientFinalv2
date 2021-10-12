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

  ngOnInit(): void {
    this.Acc.getLogs(this.user.admin.id).subscribe((profile) => {
      this.logs = profile;
    });
  }
}
