import { Component, OnInit } from '@angular/core';

import { JobsDataService } from '../jobs-data.service';

export class Job {
  #_id!: string;
  #title!: string;
  #salary!: number;
  #description!: string;
  #experience!: string;
  #postDate!: Date;
  #skills!: string[];

  get _id() { return this.#_id; }
  get title() { return this.#title; }
  set title(title: string) { this.#title = title; }
  get salary() { return this.#salary; }
  set salary(salary: number) { this.#salary = salary; }
  get description() { return this.#description; }
  set description(description: string) { this.#description = description; }
  get experience() { return this.#experience; }
  set experience(experience: string) { this.#experience = experience; }
  get postDate() { return this.#postDate; }
  set postDate(postDate: Date) { this.#postDate = postDate; }
  get skills() { return this.#skills; }
  set skills(skills: string[]) { this.#skills = skills; }

  constructor(_id: string, title: string, salary: number, description: string, experience: string, postDate: Date, skills: string[]) {
    this.#_id = _id;
    this.#title = title;
    this.#salary = salary;
    this.#description = description;
    this.#experience = experience;
    this.#postDate = postDate;
    this.#skills = skills;
  }
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs: Job[] = [];
  date: Date = new Date();
  newJob: Job = new Job("", "", 0, "", "", this.date, []);
  
  constructor(private jobsService: JobsDataService) { }

  ngOnInit(): void {
    this.jobsService.getJobs()
      .then(response => this._setJob(response))
      .catch(error => this._errorHandler(error));
  }

  save(): void {
    console.log(this.newJob);
    this.jobsService.addJob(this.newJob)
      .then(response => console.log("job added"))
      .catch(error => console.log("error", error));
  }

  private _setJob(jobs: Job[]): void {
    this.jobs = jobs;
  }

  private _errorHandler(error: any): void {
    console.log("Error while getting Jobs");
  }
}
