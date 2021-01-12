import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss']
})
export class UpdateCourseComponent implements OnInit {

  @Input('course') course: any;
  noti: string = '';

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    console.log(this.course);
  }


  updateCourse(){
    this._http.post('update_course', {
      "crs_id": this.course.CrsId,
      "topic_id": this.course.TopicId,
      "crs_name": this.course.CrsName
    })
    .subscribe((data) => {
      console.log(data);
      this.noti = "Course updated successfully.";
      setTimeout(()=>{
        this.noti = '';
      }, 5000);
    },
      (err) => {
        console.log("Course Update Error");
        console.error(err);
      }
    );
  }

}
