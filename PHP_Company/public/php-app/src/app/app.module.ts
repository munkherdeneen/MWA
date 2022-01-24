import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyComponent } from './company/company.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PersonComponent } from './person/person.component';
import { SearchCompanyComponent } from './search-company/search-company.component';
// search module
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    FooterComponent,
    HomeComponent,
    CompaniesComponent,
    CompanyComponent,
    NavigationComponent,
    PersonComponent,
    SearchCompanyComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,    
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'companies',
        component: CompaniesComponent,
      },
      {
        path: 'company/:companyId',
        component: CompanyComponent,
      },
      {
        path: 'search',
        component: SearchCompanyComponent,
      },
      {
        path: 'companies/:companyId/person/:personId',
        component: PersonComponent,
      },
      {
        path: '**',
        component: ErrorPageComponent,
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
