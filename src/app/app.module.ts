import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxComponent } from './question-types/checkbox/checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MultipleChoiceComponent } from './question-types/multiple-choice/multiple-choice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionBankComponent, QuestionBankSettings } from './question-bank/question-bank.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';

const MaterialModules = [
  MatCheckboxModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatButtonModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatRadioModule,
  MatSnackBarModule,
  MatInputModule,
  MatIconModule,
  MatTooltipModule,
  MatBottomSheetModule,
  MatListModule
]

const FirebaseModules = [];

@NgModule({
  declarations: [
    AppComponent,
    CheckboxComponent,
    QuestionBankComponent,
    MultipleChoiceComponent,
    QuestionBankSettings
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    ...MaterialModules,
    ...FirebaseModules
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [QuestionBankSettings]
})
export class AppModule { }
