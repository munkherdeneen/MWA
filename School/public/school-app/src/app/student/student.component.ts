import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentDataService } from '../student-data.service';
import { Student } from '../students/students.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student!: Student;

  constructor(private route:ActivatedRoute, private studentsService: StudentDataService) { }

  ngOnInit(): void {
    let studentId = this.route.snapshot.params["studentId"];
    this.studentsService.getStudent(studentId)
        .then(response => {this.student = response;})
        .catch(error => {console.log("Error", error)})
        ;
  }

}
