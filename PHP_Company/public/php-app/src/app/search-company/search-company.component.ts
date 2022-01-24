import { Component, OnInit } from '@angular/core';
import { CompaniesDataService } from '../companies-data.service';
import { Company, Person } from '../companies/companies.component';

@Component({
  selector: 'app-search-company',
  templateUrl: './search-company.component.html',
  styleUrls: ['./search-company.component.css']
})
export class SearchCompanyComponent implements OnInit {

  companies: Company[] = [];
  newPeople: Person[] = [];
  searchCompany: Company = new Company("", "", 0, "", this.newPeople);
  searchText!: string;

  constructor(private companiesService: CompaniesDataService) { }

  ngOnInit(): void {
    this.companiesService.getCompanies()
      .then(response => this._setCompanies(response))
      .catch(error => this._errorHandler(error));
  }

  private _setCompanies(companies: Company[]): void {
    this.companies = companies;
  }

  private _errorHandler(error: any): void {
    console.log("Error while getting Companies");
  }

  search(): void {
    this.companiesService.getCompany(this.searchCompany._id)
      .then(response => console.log("company added"))
      .catch(error => console.log("error", error));
  }
}