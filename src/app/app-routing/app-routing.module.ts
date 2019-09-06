import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "app/main/main.component";
import { UserProfileComponent } from "app/components/user-profile/user-profile.component";
import { Profile } from "selenium-webdriver/firefox";
import { AuthGuard } from "app/auth.guard";

const routes: Routes = [
  {
    path: "login",
    component: UserProfileComponent
  },
  {
    path: "area/:id",
    component: MainComponent,
    canActivate: [AuthGuard]
  },

  { path: "**", redirectTo: "area/0" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
