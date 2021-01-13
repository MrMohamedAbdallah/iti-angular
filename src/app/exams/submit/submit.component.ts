import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  examForm: FormGroup;
  questions: any[] = [];
  examID: any = null;
  answersForm: FormGroup = null;

  constructor(private _http: HttpClient) { }

  ngOnInit(): void {
    this.examForm = new FormGroup({
      'exam_id': new FormControl('', {validators: [Validators.required]})
    });
  }

  getQuestions(){
    this.examID = this.examForm.value.exam_id;
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    const params = new HttpParams().set('exam_id', this.examID);
    this._http.get('http://127.0.0.1:5000/get_exam_questions', {
      headers,
      params,
    })
      .subscribe(
        (res: any)=>{
          this.questions = res.result;

          let inputs = {};

          for(let i = 0; i < this.questions.length; i++){
            inputs['ans_' + (i+1)] = new FormControl('', {validators: [Validators.required]}) 
            this.questions[i].inputName = 'ans_' + (i+1);
          }

          this.answersForm = new FormGroup(inputs);
        },
        (err)=>{
          console.log('Exam Error');
          console.error(err);
        }
      );
  }


  submitAnswers(){
    this._http.post('http://127.0.0.1:5000/store_students_questions', {
      'exam_id': this.examID,
      'student_id': 4,
      ...this.answersForm.value
    })
    .subscribe(
      (res)=>{
        console.log('Exam Answered');
        console.log(res);

        // Reseting
        this.questions = []
        this.examForm.reset();
        this.answersForm.reset();
      },
      (err)=>{
        console.log('Error In Answering The Exam');
        console.error(err);
      }
    )
  }

}
