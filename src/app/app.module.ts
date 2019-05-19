import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppMaterialModule } from "./app.material.module";

import { HttpService } from "./shared/services/http.service";
import { DataService } from "./shared/services/data.service";
import { RevService } from "./shared/services/rev.service";

import { CashPipe, BGNPipe } from "./components/tabs/table-sheet/cash.pipe";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TableSheetComponent } from "./components/tabs/table-sheet/table-sheet.component";
import { CashComponent } from "./components/tabs/cash-tab/cash.component";
import { CashSheetComponent } from './app/components/tabs/cash-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    TableSheetComponent,
    CashPipe,
    BGNPipe,
    CashComponent,
    CashSheetComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppMaterialModule],
  providers: [DataService, HttpService, RevService],
  bootstrap: [AppComponent]
})
export class AppModule {}
