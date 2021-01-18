import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './exams/login/login.component';
import { SubmitComponent } from './exams/submit/submit.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PowerbiComponent } from './powerbi/powerbi.component';
import { QuestionsComponent } from './questions/questions.component';
import { DetailsComponent } from './students/details/details.component';
import { ShowAllComponent } from './students/show-all/show-all.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'questions', component: QuestionsComponent},
  {path: 'exams', component: SubmitComponent},
  {path: 'power-bi', component: PowerbiComponent},
  {path: 'students', component: ShowAllComponent},
  {path: 'students/:student', component: DetailsComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
