import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobComponent } from './job/job.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ErrorPageComponent,
    FooterComponent,
    HomeComponent,
    JobsComponent,
    JobComponent
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
        path: 'jobs',
        component: JobsComponent,
      },
      {
        path: 'job/:jobId',
        component: JobComponent,
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
