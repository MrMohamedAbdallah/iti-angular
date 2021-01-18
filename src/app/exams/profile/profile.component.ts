import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userID: number = null;

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {

    this._auth.userStatus.subscribe(status => {
      if(!status){
        this._router.navigate(['/login']);
      }
    })

    this.userID = this._auth.userID;
  }

}
