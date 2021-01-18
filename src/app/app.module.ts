import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateCourseComponent } from './course/update-course/update-course.component';
import { QuestionsComponent } from './questions/questions.component';
import { CreateComponent } from './questions/create/create.component';
import { SubmitComponent } from './exams/submit/submit.component';
import { PowerbiComponent } from './powerbi/powerbi.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShowAllComponent } from './students/show-all/show-all.component';
import { DetailsComponent } from './students/details/details.component';
import { LoginComponent } from './exams/login/login.component';
import { AuthService } from './exams/service/auth.service';
import { ProfileComponent } from './exams/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    UpdateCourseComponent,
    QuestionsComponent,
    CreateComponent,
    SubmitComponent,
    PowerbiComponent,
    NavbarComponent,
    ShowAllComponent,
    DetailsComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
