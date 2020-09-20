import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { QuestionBankComponent } from './question-bank/question-bank.component';

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
  MatTooltipModule
]

const FirebaseModules = [];

@NgModule({
  declarations: [
    AppComponent,
    CheckboxComponent,
    QuestionBankComponent,
    MultipleChoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ...MaterialModules,
    ...FirebaseModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
