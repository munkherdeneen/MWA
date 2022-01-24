import { Component } from '@angular/core';
import students from './_files/school.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'school-app';
  public studentList:{name:string, gpa:string}[] = students;
}