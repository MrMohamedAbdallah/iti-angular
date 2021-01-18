import { Component, OnInit } from '@angular/core';
import { AuthService } from '../exams/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  darktheme: boolean = false;
  isLogged: boolean = false;
  username: string = '';
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {

    let stored = localStorage.getItem('darktheme');
    if(stored){
      this.darktheme = stored == 'true' ? false : true;
      this.toggle();
    }

    this.isLogged = this._auth.isLogged;
    this.username = this._auth.username;
    this._auth.userStatus.subscribe(status => {
      this.isLogged = status
      this.username = this._auth.username;
    });
  }

  toggle(){
    this.darktheme = !this.darktheme;
    if(this.darktheme){
      this.add();
    } else {
      this.remove();
    }

    localStorage.setItem('darktheme', this.darktheme ? 'true' : 'false');
  }


  add(){
    document.querySelector('body').classList.add('darktheme');
    document.querySelector('.navbar').classList.add('darktheme');
  }

  remove(){
    document.querySelector('body').classList.remove('darktheme');
    document.querySelector('.navbar').classList.remove('darktheme');
  }

  
  logout(){
    this._auth.logout();
  }
  
}
