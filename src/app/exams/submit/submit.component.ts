import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

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
  coursesForm: FormGroup = null;
  currentQuestion: number = 0;
  courses: any[] = [];
  selectedCourse: any = "";
  exams: any[] = [];
  noti: string = "";
  username: string = '';
  userID: number = null;
  isLoading: boolean = false;
  submitLoading: boolean = false;
  

  constructor(private _http: HttpClient, private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this.examForm = new FormGroup({
      'exam_id': new FormControl('', {validators: [Validators.required, Validators.min(0)]})
    });

    this.coursesForm = new FormGroup({
      'course_id': new FormControl('', {validators: [Validators.required]})
    });

    // Subscribe to course_id changes
    this.coursesForm.valueChanges.subscribe(value => {
      if(!this.coursesForm.valid) return;

      this.exams = [];
      this.fetchExams(this.coursesForm.value.course_id);
    })
    
    // Subscribe to login
    this.username = this._auth.username;
    this.userID = this._auth.userID;
    this._auth.userStatus.subscribe(status => {
      if(!status){
        this._router.navigate(['/login']);
      }
    })
    
    // Fetch Student Courses
    this.fetchCourses();

  }

  getQuestions(){
    this.examID = this.examForm.value.exam_id;
    const headers = new HttpHeaders().set('Content-Type', 'application/json;charset=utf-8');
    const params = new HttpParams().set('exam_id', this.examID);
    this._http.get('http://127.0.0.1:5000/get_exam_questions/' + this.examID, {
      headers,
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
          this.currentQuestion = 0;
          this.noti = "";
        },
        (err)=>{
          console.log('Exam Error');
          console.error(err);
        }
      );
  }


  submitAnswers(){
    this.submitLoading = true;
    let headers = new HttpHeaders().set('x-access-tokens', this._auth.token)

    this._http.post('http://127.0.0.1:5000/store_students_questions', {
      'exam_id': this.examID,
      'student_id': this.userID,
      ...this.answersForm.value
    }, {
      headers,
    })
    .subscribe(
      (res: any)=>{
        console.log('Exam Answered');
        console.log(res);

        // Reseting
        this.questions = []
        this.examForm.reset();
        this.answersForm.reset();
        this.coursesForm.reset();

        this.noti = 'You got ' + res.result.GRADE;
        this.submitLoading = false;
      },
      (err)=>{
        console.log('Error In Answering The Exam');
        console.error(err);
        this.submitLoading = false;
      }
    )
  }

  
  next(){
    if(this.currentQuestion == this.questions.length - 1) 
      return;

    this.currentQuestion += 1;
  }

  previous(){
    if(this.currentQuestion == 0) 
      return;
    this.currentQuestion -= 1
  }

  moveTo(i: number){
    this.currentQuestion = i;
  }


  fetchCourses(){
    // Get courses from API
    this._http.get('http://127.0.0.1:5000/students_courses/' + this.userID) 
    .subscribe((data: any )=> {
      this.courses = data.result;
    })
  }

  fetchExams(course_id){
    this.examForm.reset();
    this.isLoading = true;
    // Get courses from API
    this._http.get('http://127.0.0.1:5000/exams_of_students/' + course_id + '/' + this.userID) 
    .subscribe((data: any )=> {
      this.exams = data.result;
      console.log(this.exams);
      this.isLoading = false;
    })
  }

}
