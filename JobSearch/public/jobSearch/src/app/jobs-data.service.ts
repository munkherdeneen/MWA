import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Job } from './jobs/jobs.component';

@Injectable({
  providedIn: 'root'
})
export class JobsDataService {

  private baseUrl:string = 'http://localhost:3000/api/';

  constructor(private http:HttpClient) { }

  public getJobs():Promise<Job[]> {
    const url = this.baseUrl + "jobs";
    return this.http.get(url).toPromise()
                .then(response => response as Job[])
                .catch(this._handleError);
  }

  public getJob(id: string):Promise<Job> {
    const url = this.baseUrl + "jobs/"+id;
    return this.http.get(url).toPromise()
                .then(response => response as Job)
                .catch(this._handleError);
  }

  public addJob(job: Job):Promise<Job> {
    const url: string = this.baseUrl + "jobs/";
    return this.http.post(url, JSON.stringify(job)).toPromise()
                  .then(response => response)
                  .catch(this._handleError);
  }

  public updateJob(job: Job):Promise<Job> {
    const url: string = this.baseUrl + "jobs/" + job._id;
    return this.http.patch(url, JSON.stringify(job)).toPromise()
                  .then(response => response)
                  .catch(this._handleError);
  }

  public deleteJob(job: Job):Promise<Job> {
    const url: string = this.baseUrl + "jobs/" + job._id;
    return this.http.delete(url).toPromise()
                  .then(response => response)
                  .catch(this._handleError);
  }  

  private _handleError(err: any): Promise<any> {
    console.log("Service error", err);
    return Promise.reject(err.message || err);
  }
}