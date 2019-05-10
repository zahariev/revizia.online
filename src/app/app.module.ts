import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HttpService } from "./shared/services/http.service";
import { DataService } from "./shared/services/data.service";
// import { RevService } from "./shared/services/rev.service";

import { CashPipe, RoundPipe } from "./table-editable/cash.pipe";

import { AppComponent } from "./app.component";
import { TableEditableComponent } from "./table-editable/table-editable.component";

@NgModule({
  declarations: [AppComponent, TableEditableComponent, CashPipe, RoundPipe],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
