import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  darktheme: boolean = false;
  constructor() { }

  ngOnInit(): void {

    let stored = localStorage.getItem('darktheme');
    if(stored){
      this.darktheme = stored == 'true' ? false : true;
      this.toggle();
    }
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

}
