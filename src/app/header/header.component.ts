import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public matDialog: MatDialog) { }

  ngOnInit() {
  }

  openLoginForm()  {
    this.matDialog.open(LoginComponent, {width: '350px', height: '300px'});
  }

}
