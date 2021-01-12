import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss']
})
export class UpdateCourseComponent implements OnInit {

  @Input('course') course: any;
  @Input('topics') topics: any[] = [];
  @Output('updated') updated: EventEmitter<any> = new EventEmitter<any>();
  noti: string = '';
  newTopicID: number;


  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.newTopicID = this.course.TopicId;
  }


  updateCourse(){
    this._http.post('update_course', {
      "crs_id": this.course.CrsId,
      "topic_id": this.newTopicID,
      "crs_name": this.course.CrsName
    })
    .subscribe((data) => {
      console.log(data);
      this.noti = "Course updated successfully.";
      setTimeout(()=>{
        this.noti = '';
      }, 5000);

      // this.updated.emit();
    },
      (err) => {
        console.log("Course Update Error");
        console.error(err);
      }
    );
  }

}
