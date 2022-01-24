import { Component, OnInit } from '@angular/core';
import { CompaniesDataService } from '../companies-data.service';

export class Company {
  #_id!: string;
  #name!: string;
  #rank!: number;
  #industry!: string;
  #keyPeople!: Person[];

  get _id() { return this.#_id; }
  get name() { return this.#name; }
  set name(name: string) { this.#name = name; }
  get rank() { return this.#rank; }
  set rank(rank: number) { this.#rank = rank; }
  get industry() { return this.#industry; }
  set industry(industry: string) { this.#industry = industry; }
  get keyPeople() { return this.#keyPeople; }
  set keyPeople(keyPeople: Person[]) { this.#keyPeople = keyPeople; }

  constructor(_id: string, name: string, rank: number, industry: string, people: Person[]) {
    this.#_id = _id;
    this.#name = name;
    this.#rank = rank;
    this.#industry = industry;
    this.#keyPeople = people;
  }
}

export class Person {
  #_id!: string;
  #name!: string;
  #title!: string;

  get _id() { return this.#_id; }
  get name() { return this.#name; }
  set name(name: string) { this.#name = name; }
  get title() { return this.#title; }
  set title(title: string) { this.#title = title; }

  constructor(_id: string, name: string, title: string) {
    this.#_id = _id;
    this.#name = name;
    this.#title = title;
  }
}

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Company[] = [];
  newPeople: Person[] = [];
  newCompany: Company = new Company("", "", 0, "", this.newPeople);

  constructor(private companiesService: CompaniesDataService) { }

  ngOnInit(): void {
    this.companiesService.getCompanies()
      .then(response => this._setCompanies(response))
      .catch(error => this._errorHandler(error));
  }

  save(): void {
    this.companiesService.addCompany(this.newCompany)
      .then(response => console.log("company added"))
      .catch(error => console.log("error", error));
  }

  private _setCompanies(companies: Company[]): void {
    this.companies = companies;
  }

  private _errorHandler(error: any): void {
    console.log("Error while getting Companies");
  }
}
