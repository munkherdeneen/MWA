import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'welcomeComponent-app';
  showAbout:boolean = false;
  showWelcome:boolean = true;

  onClickBtn() {
    this.showWelcome = false;
    this.showAbout = true;
  }
}
