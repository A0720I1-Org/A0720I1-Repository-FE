import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd, NavigationError,
  NavigationStart,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
  RouterEvent
} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Hệ Thống Quản Lý Trường Học';
  loading: boolean;

  // constructor(private router: Router) {
  //   this.loading = false;
  //
  //   router.events.subscribe(
  //     (event: RouterEvent): void => {
  //       if (event instanceof RouteConfigLoadStart) {
  //         this.loading = true;
  //       } else if (event instanceof RouteConfigLoadEnd) {
  //         this.loading = false;
  //       }
  //     }
  //   );
  // }
  showLoadingIndicator = true;

  // Inject the Angular Router
  constructor(private _router: Router) {
    // Subscribe to the router events observable
    this._router.events.subscribe((routerEvent: RouterEvent) => {

      // On NavigationStart, set showLoadingIndicator to ture
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      // On NavigationEnd or NavigationError or NavigationCancel
      // set showLoadingIndicator to false
      if (routerEvent instanceof NavigationEnd ||
        routerEvent instanceof NavigationError ||
        routerEvent instanceof NavigationCancel) {
        this.showLoadingIndicator = false;
      }

    });
  }
}
