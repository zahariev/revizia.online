import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppMaterialModule } from "./app.material.module";

import { HttpClientModule } from "@angular/common/http";

import { HttpService } from "./shared/services/http.service";
import { DataService } from "./shared/services/data.service";
import { RevService } from "./shared/services/rev.service";

import { CashPipe, BGNPipe } from "./shared/cash.pipe";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReviziaSheetComponent } from "./components/sheets/revizia/revizia-sheet.component";
import { SummarySheetComponent } from "./components/sheets/summary/summary-sheet.component";
import { TaraSheetComponent } from "./components/sheets/tara/tara-sheet.component";
import { MenuSheetComponent } from "./components/sheets/menu/menu-sheet.component";
import { CashSheetComponent } from "./components/sheets/cash/cash-sheet.component";
import { CashRevSheetComponent } from "./components/sheets/cash-rev/cash-sheet.component";
import { TabsMenuSheetComponent } from "./components/tabs/menu/menu-sheet.component";

import { TabsCashSheetComponent } from "./components/tabs/cash-edit/cash-sheet.component";
import { TabsCashRevComponent } from "./components/tabs/cash-rev/cash-sheet.component";
import { TabsRevSheetComponent } from "./components/tabs/revizia/rev-sheet.component";
import { TabsSumSheetComponent } from "./components/tabs/summary/sum-sheet.component";
import { TabsTaraSheetComponent } from "./components/tabs/tara/tara-sheet.component";

import { environment } from "../environments/environment";

import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireModule } from "angularfire2";

import { CdkLazyDropList, CdkLazyDrag } from "./shared/lazy-drag-drop";
import { SheetComponent } from "app/components/sheets/sheet.component";

@NgModule({
  declarations: [
    AppComponent,
    CashPipe,
    BGNPipe,
    SummarySheetComponent,
    ReviziaSheetComponent,
    MenuSheetComponent,
    TaraSheetComponent,
    CashSheetComponent,
    CashRevSheetComponent,
    TabsMenuSheetComponent,
    TabsCashSheetComponent,
    TabsCashRevComponent,
    TabsRevSheetComponent,
    TabsSumSheetComponent,
    TabsTaraSheetComponent,
    CdkLazyDropList,
    CdkLazyDrag,
    SheetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence()
  ],
  providers: [DataService, HttpService, RevService],
  bootstrap: [AppComponent]
})
export class AppModule {}
