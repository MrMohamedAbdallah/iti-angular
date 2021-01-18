import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  wrongInfo: boolean = false;
  isLoading: boolean = false;

  constructor(private _http: HttpClient, private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
      'password': new FormControl('', {validators: [Validators.required, Validators.minLength(6)]})
    });

    this._auth.userStatus.subscribe((status)=>{
      if(status){
        this._router.navigate(['/profile']);
      }
    })

    if(this._auth.isLogged){
      this._router.navigate(['/profile']);
    }
  }

  login(){
    this.isLoading = true;
    this._http.post('http://127.0.0.1:5000/login_user', {
      "type": "StudentView",
      ...this.loginForm.value
    })
    .subscribe(
      (res: any)=>{
        this.isLoading = false;
        if(res.status == 401){
          this.wrongInfo = true;
          return;
        }
        
        this.wrongInfo = false;
        let userdata = res.userdata;
        this._auth.login(userdata.token, userdata.username, userdata.id);
      },
      (err)=>{
        console.log('Login Error')
        console.error(err);
        this.isLoading = false;
      }
    )
  }

}
