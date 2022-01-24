import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StudentsComponent } from './students/students.component';
import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    ErrorPageComponent,
    NavigationComponent,
    StudentsComponent,
    StudentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,    
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        path: 'student/:studentId',
        component: StudentComponent,
      },
      {
        path: '**',
        component: ErrorPageComponent,
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
