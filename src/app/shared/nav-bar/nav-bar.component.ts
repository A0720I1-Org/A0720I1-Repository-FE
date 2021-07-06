import {Component, DoCheck, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {ShareService} from "../../service/share.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../../home/login/login.component";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  username: string;
  role: string;
  isLoggedIn : boolean = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private shareService: ShareService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.shareService.getClickEvent().subscribe(() => {
      this.load()
    })
  }

  load() {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().account.username;
      this.role = this.tokenStorageService.getUser().roles[0];
    }
    this.isLoggedIn =  this.username != null;
  }

  ngOnInit(): void {
    this.load();
  }

  logOut(){
    this.tokenStorageService.signOut();
    this.role = null;
    this.username = null;
    this.ngOnInit();
    this.router.navigateByUrl("/")
  }


  logIn() {
    const dialogRef = this.dialog.open(LoginComponent, {width: '400px'})
  }
}
