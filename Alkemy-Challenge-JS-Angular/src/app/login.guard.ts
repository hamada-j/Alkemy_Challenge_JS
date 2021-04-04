import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import * as moment from "moment";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    const date1 = moment();
    const date2 = localStorage.getItem("token_since");
    const difference = date1.diff(date2, "minutes");
    if (localStorage.getItem("token") && difference <= 45) {
      return true;
    } else {
      this.router.navigate(["/"]);
      return false;
    }
  }
}
