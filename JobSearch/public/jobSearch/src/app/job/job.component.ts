import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { JobsDataService } from '../jobs-data.service';
import { Job } from '../jobs/jobs.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  date: Date = new Date();
  job!: Job;
  selectedJob!: Job;
  
  constructor(private route:ActivatedRoute, private jobService:JobsDataService) {
    this.job = new Job("", "", 0, "", "", this.date, []);
  }

  ngOnInit(): void {
    let jobId = this.route.snapshot.params["jobId"];
    jobId = "61eb2195c3ed783ebe4ece4c";
    this.jobService.getJob(jobId)
        .then(response => {this.job = response;})
        .catch(error => {console.log("Error", error)})
        ;
  }

  update(): void {
    console.log(this.selectedJob);
    this.jobService.updateJob(this.selectedJob)
      .then(response => console.log("job updated"))
      .catch(error => console.log("error", error));
  }

  delete(): void {
    this.jobService.deleteJob(this.selectedJob)
      .then(response => console.log("job deleted"))
      .catch(error => console.log("error", error));
  }

}
