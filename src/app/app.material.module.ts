import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { A11yModule } from "@angular/cdk/a11y";
import { DragDropModule } from "@angular/cdk/drag-drop";
// import { PortalModule } from "@angular/cdk/portal";
// import { ScrollingModule } from "@angular/cdk/scrolling";
// import { CdkStepperModule } from "@angular/cdk/stepper";
// import { CdkTableModule } from "@angular/cdk/table";
// import { CdkTreeModule } from "@angular/cdk/tree";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";
import { MatOptionModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSliderModule } from "@angular/material/slider";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  imports: [
    // PortalModule,
    // ScrollingModule,
    // A11yModule,
    // CdkStepperModule,
    // CdkTableModule,
    // CdkTreeModule,
    DragDropModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatChipsModule,
    MatOptionModule,
    MatGridListModule,
    MatProgressBarModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    // PortalModule,
    // ScrollingModule,
    // A11yModule,
    // CdkStepperModule,
    // CdkTableModule,
    // CdkTreeModule,
    DragDropModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatChipsModule,
    MatOptionModule,
    MatGridListModule,
    MatProgressBarModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AppMaterialModule {}
