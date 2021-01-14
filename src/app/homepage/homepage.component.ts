import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  courses: any[] = [];
  topics: any[] = [];
  courseName: string = "";
  selectedCourse: any = null;
  TopicID: any = null;

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCourses();
    this.fetchTopics();
  }

  addCourse(){
    this._http.post("http://127.0.0.1:5000/add_course", {
      Topic_id: this.TopicID,
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
    this._http.get('http://127.0.0.1:5000/get_courses') 
    .subscribe((data: any )=> {
      this.courses = data.result;
    })
  }


  fetchTopics(){
    // Get courses from API
    this._http.get('http://127.0.0.1:5000/get_topics') 
    .subscribe((data: any )=> {
      this.topics = data.result;
    })
  }

}
