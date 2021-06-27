import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {TokenStorageService} from "../service/token-storage.service";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  private constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private toastrService: ToastrService
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url = state.url;
    const loggedInUser = this.tokenStorageService.getUser();
    if (loggedInUser !== null) {
      let role = loggedInUser.roles[0];
      console.log(role)
      if (route.data.roles.indexOf(role) !== -1) {
        console.log(route.data.roles.indexOf(role))
        return true;
      } else {
        this.router.navigate(['/'])
        this.toastrService.warning(
          "Bạn không có quyền truy cập trang này",
          "Cảnh báo",
          {timeOut: 3000, extendedTimeOut: 1500}
        )
        return false
      }
    } else {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
      this.toastrService.warning(
        "Bạn không có quyền truy cập trang này",
        "Cảnh báo",
        {timeOut: 3000, extendedTimeOut: 1500}
      )
      return false
    }
  }
}
