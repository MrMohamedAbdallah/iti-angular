import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  courses: any[] = [];

  constructor(private _http: HttpClient, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let student = params['student'];

      this.getStudentCourses(student);

    });
  }

  getStudentCourses(studentID: any){
    this._http.get('http://127.0.0.1:5000/students_courses/' + studentID)
              .subscribe(
                (data: any)=>{
                  this.courses = data.result;
                  console.log(this.courses);
                },
                (err)=>{
                  console.log("Get Courses Error");
                  console.error(err);
                }
              )
  }

}
