import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  questionType: string = 'mcq';
  courses: any[] = [];
  topics: any[] = [];
  courseName: string = "";

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCourses();
    this.fetchTopics();
  }

  addCourse(){
    this._http.post("/add_course", {
      Topic_id: 5,
      course_name: this.courseName
    })
    .subscribe(
      (data)=>{
        console.log("Course Added");
        this.fetchCourses();
      },
      (err) => {
        console.log("ERROR In Post");
        console.log(err);
      }
    )
  }


  fetchCourses(){
    // Get courses from API
    this._http.get('get_courses') 
    .subscribe((data: any )=> {
      this.courses = data.result;
    })
  }


  fetchTopics(){
    // Get courses from API
    this._http.get('get_topics') 
    .subscribe((data: any )=> {
      this.topics = data.result;
    })
  }

}
