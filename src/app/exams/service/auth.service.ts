import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged: boolean = false;
  token: string = null;
  username: string = null;
  userID: number = null;

  userStatus: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor() {

    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.username = localStorage.getItem('username');
      this.userID = parseInt(localStorage.getItem('userID'));
      this.isLogged = true;
    }

    this.updateStatus(true);
  }

  login(token: any, username: any, userID: any){
    this.token = token;
    this.username = username;
    this.userID = userID;

    localStorage.setItem('token', this.token);
    localStorage.setItem('username', this.username);
    localStorage.setItem('userID', this.userID.toString());

    this.updateStatus(true);
  }

  logout(){
    localStorage.clear();
    
    this.updateStatus(false);
  }

  private updateStatus(status: boolean){
    this.isLogged = status;
    this.userStatus.emit(status);
  }

}
