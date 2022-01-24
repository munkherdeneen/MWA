import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesDataService } from '../companies-data.service';
import { Company, Person } from '../companies/companies.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  people!: Person[];
  company!: Company;

  constructor(private route:ActivatedRoute, private companiesService: CompaniesDataService) {
    this.people = [];
    this.company = new Company("", "", 0, "", this.people);
  }

  ngOnInit(): void {
    let companyId = this.route.snapshot.params["companyId"];
    this.companiesService.getCompany(companyId)
        .then(response => {this.company = response;})
        .then(response => {this.people = this.company.keyPeople})
        .catch(error => {console.log("Error", error)})
        ;
  }

  update(): void {
    this.companiesService.updateJob(this.company)
      .then(response => console.log("job updated"))
      .catch(error => console.log("error", error));
  }

  delete(): void {
    this.companiesService.deleteJob(this.company)
      .then(response => console.log("job deleted"))
      .catch(error => console.log("error", error));
  }

  deletePerson(companyId: string, personId: string): void {
    this.companiesService.deletePerson(companyId, personId)
      .then(response => console.log("person deleted"))
      .catch(error => console.log("error", error));
  }
}