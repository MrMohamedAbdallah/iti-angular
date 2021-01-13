import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  updateForm: FormGroup;


  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.newTopicID = this.course.TopicId;

    this.updateForm = new FormGroup({
      'TF': new FormControl(''),
      'MCQ': new FormControl(''),
      // 'date': new FormControl('')
    });
  }


  updateCourse(){
    this._http.post('http://127.0.0.1:5000/update_course', {
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

  submitCreateExam(){
    this._http.post('http://127.0.0.1:5000/generate_exam', {
      'course_id': this.course.CrsId,
      ...this.updateForm.value
    }).subscribe(
      (res)=>{
        console.log('Exam Generated');
        console.log(res);
        this.updateForm.reset();
      },
      (err)=>{
        console.log('Generate Exam Error');
        console.error(err);
      }
    )
  }

}
