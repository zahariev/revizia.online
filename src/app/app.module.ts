import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppMaterialModule } from "./app.material.module";

import { HttpService } from "./shared/services/http.service";
import { DataService } from "./shared/services/data.service";
// import { RevService } from "./shared/services/rev.service";

import { CashPipe, RoundPipe } from "./table-editable/cash.pipe";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TableEditableComponent } from "./table-editable/table-editable.component";
import { TableNonEditableComponent } from "./table-nonEditable/table-nonEditable.component";

@NgModule({
  declarations: [
    AppComponent,
    TableEditableComponent,
    TableNonEditableComponent,
    CashPipe,
    RoundPipe
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppMaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
