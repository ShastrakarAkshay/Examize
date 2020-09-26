import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxComponent } from './question-types/checkbox/checkbox.component';
import { MultipleChoiceComponent } from './question-types/multiple-choice/multiple-choice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionBankComponent, QuestionBankSettings } from './question-bank/question-bank.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuestionBankListComponent } from './question-bank-list/question-bank-list.component';
import { AppMaterialModule } from './material.module';
import { AppSnackbarComponent } from './shared/components/app-snackbar/app-snackbar.component';

const FirebaseModules = [];

@NgModule({
  declarations: [
    AppComponent,
    CheckboxComponent,
    QuestionBankComponent,
    MultipleChoiceComponent,
    QuestionBankSettings,
    QuestionBankListComponent,
    AppSnackbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    AppMaterialModule,
    ...FirebaseModules
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [QuestionBankSettings]
})
export class AppModule { }
