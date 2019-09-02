import { Component, OnInit } from "@angular/core";
import { AuthService } from "app/shared/services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  constructor(public auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.auth.signOut();

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "area/0";
    // get return url from route parameters or default to '/'
  }

  login() {
    this.auth.googleSignin(this.returnUrl);
  }
}
