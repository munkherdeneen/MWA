import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompaniesDataService } from '../companies-data.service';
import { Person } from '../companies/companies.component';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  person!: Person;

  constructor(private route:ActivatedRoute, private companiesService: CompaniesDataService) { 
    this.person = new Person("", "", "");
  }

  ngOnInit(): void {
    let personId = this.route.snapshot.params["personId"];
    let companyId = this.route.snapshot.params["companyId"];
    this.companiesService.getPerson(companyId, personId)
        .then(response => {this.person = response;})
        .catch(error => {console.log("Error", error)})
        ;
  }

  update(): void {
    this.companiesService.updatePerson("", this.person)
      .then(response => console.log("person updated"))
      .catch(error => console.log("error", error));
  }

  delete(): void {
    this.companiesService.deletePerson("", this.person._id)
      .then(response => console.log("person deleted"))
      .catch(error => console.log("error", error));
  }
}
