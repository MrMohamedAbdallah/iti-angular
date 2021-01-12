import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  courses: any[] = [];
  form: FormGroup;

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    // Initial form group
    this.form = new FormGroup({
      'course_id': new FormControl(''),
      'question': new FormControl(''),
      'question_type': new FormControl('MCQ'),
      'answer': new FormControl(''),
      'ans_a': new FormControl(''),
      'ans_b': new FormControl(''),
      'ans_c': new FormControl(''),
      'ans_d': new FormControl('')
    });

    console.log(this.form.value);

    this.fetchCourses();
  }

  fetchCourses(){
    // Get courses from API
    this._http.get('http://127.0.0.1:5000/get_courses') 
    .subscribe((data: any )=> {
      this.courses = data.result;
    })
  }

  submitQuestion(){
    this._http.post("http://127.0.0.1:5000/add_question", this.form.value)
              .subscribe((data)=>{
                  console.log("Question Added")
                  console.log(data);
                  this.form.reset({
                    'question_type': 'MCQ'
                  });
              },(err)=>{
                console.log("Question Adding Error");
                console.error(err)
              });
  }

}
