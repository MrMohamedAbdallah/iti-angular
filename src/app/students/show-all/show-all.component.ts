import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.scss']
})
export class ShowAllComponent implements OnInit {

  students: any[] = [];

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.getStudents();
  }


  getStudents(){
    this._http.get('http://127.0.0.1:5000/students')
              .subscribe(
                (data: any)=>{
                  console.log("Student");
                  this.students = data.result;
                },
                (err)=>{
                  console.log("Students Error");
                  console.error(err);
                }
                )
  }

}
