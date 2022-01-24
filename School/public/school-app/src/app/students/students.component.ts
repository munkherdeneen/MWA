import { Component, OnInit } from '@angular/core';
import { StudentDataService } from '../student-data.service';

export class Student {
  #_id!: string;
  #name!: string;
  #gpa!: number;

  get _id() { return this.#_id; }
  get name() { return this.#name; }
  set name(name: string) { this.#name = name; }
  get gpa() { return this.#gpa; }
  set gpa(gpa: number) { this.#gpa = gpa; }

  constructor(_id: string, name: string, gpa: number) {
    this.#_id = _id;
    this.#name = name;
    this.#gpa = gpa;
  }
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];

  constructor(private studentsService: StudentDataService) { }

  ngOnInit(): void {
    this.studentsService.getStudents()
      .then(response => this._setCompanies(response))
      .catch(error => this._errorHandler(error));
  }

  private _setCompanies(students: Student[]): void {
    this.students = students;
  }

  private _errorHandler(error: any): void {
    console.log("Error while getting Companies");
  }
}
