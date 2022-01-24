import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Company, Person } from './companies/companies.component';

@Injectable({
  providedIn: 'root'
})
export class CompaniesDataService {
  private baseUrl:string = 'http://localhost:3000/api/';

  constructor(private http:HttpClient) { }

  public getCompanies():Promise<Company[]> {
    const url = this.baseUrl + "companies";
    return this.http.get(url).toPromise()
                .then(response => response as Company[])
                .catch(this._handleError);
  }

  public getCompany(companyId: string):Promise<Company> {
    const url = this.baseUrl + "companies/" + companyId;
    return this.http.get(url).toPromise()
                .then(response => response as Company)
                .catch(this._handleError);
  }

  public addCompany(company: Company):Promise<Company> {    
    const url: string = this.baseUrl + "companies";
    return this.http.post(url, JSON.stringify(company)).toPromise()
                  .then(response => response)
                  .catch(this._handleError);
  }

  public updateJob(company: Company):Promise<Company> {
    const url: string = this.baseUrl + "companies/" + company._id;
    return this.http.patch(url, company).toPromise()
                  .then(response => response)
                  .catch(this._handleError);
  }

  public deleteJob(company: Company):Promise<Company> {
    const url: string = this.baseUrl + "companies/" + company._id;
    return this.http.delete(url).toPromise()
                  .then(response => response)
                  .catch(this._handleError);
  }  

  public updatePerson(companyId: string, person: Person):Promise<Company> {
    const url: string = this.baseUrl + "companies/" + companyId + "/keypeople/" + person._id;
    return this.http.patch(url, person).toPromise()
                  .then(response => response)
                  .catch(this._handleError);
  } 

  public deletePerson(companyId: string, personId: string):Promise<Company> {
    const url: string = this.baseUrl + "companies/" + companyId + "/keypeople/" + personId;
    return this.http.delete(url).toPromise()
                  .then(response => response)
                  .catch(this._handleError);
  } 

  public getPerson(companyId: string, personId: string):Promise<Person> {
    const url = this.baseUrl + "companies/" + companyId + "/keypeople/" + personId;
    return this.http.get(url).toPromise()
                .then(response => response as Person)
                .catch(this._handleError);
  }

  private _handleError(err: any): Promise<any> {
    console.log("Service error", err);
    return Promise.reject(err.message || err);
  }
}
