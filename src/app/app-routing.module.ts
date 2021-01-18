import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './exams/login/login.component';
import { ProfileComponent } from './exams/profile/profile.component';
import { SubmitComponent } from './exams/submit/submit.component';
import { AuthGuard } from './guards/auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { PowerbiComponent } from './powerbi/powerbi.component';
import { QuestionsComponent } from './questions/questions.component';
import { DetailsComponent } from './students/details/details.component';
import { ShowAllComponent } from './students/show-all/show-all.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'questions', component: QuestionsComponent},
  {path: 'exams', component: SubmitComponent, canActivate: [AuthGuard]},
  {path: 'power-bi', component: PowerbiComponent},
  {path: 'students', component: ShowAllComponent},
  {path: 'students/:student', component: DetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
