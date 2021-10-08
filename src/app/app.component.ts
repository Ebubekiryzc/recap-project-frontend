import { NavigationEnd, Router } from '@angular/router';
import { Component } from '@angular/core';
import { NgsRevealConfig } from 'ngx-scrollreveal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NgsRevealConfig],
})
export class AppComponent {
  url: string;
  constructor(config: NgsRevealConfig, private router: Router) {
    config.distance = '60';
    config.duration = 2500;
    config.delay = 400;
    config.reset = true;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
  }
}
