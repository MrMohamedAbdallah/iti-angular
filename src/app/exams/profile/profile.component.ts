import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userID: number = null;

  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
    this.userID = this._auth.userID;
  }

}
