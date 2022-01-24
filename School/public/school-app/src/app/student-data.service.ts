import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Student } from './students/students.component';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  private baseUrl:string = 'http://localhost:3000/api/';

  constructor(private http:HttpClient) { }

  public getStudents():Promise<Student[]> {
    const url = this.baseUrl + "students";
    return this.http.get(url).toPromise()
                .then(response => response as Student[])
                .catch(this._handleError);
  }

  public getStudent(studentId: string):Promise<Student> {
    const url = this.baseUrl + "students/" + studentId;
    return this.http.get(url).toPromise()
                .then(response => response as Student)
                .catch(this._handleError);
  }

  private _handleError(err: any): Promise<any> {
    console.log("Service error", err);
    return Promise.reject(err.message || err);
  }
}
