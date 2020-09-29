import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

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
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { ConfirmDialogComponent } from './shared/components/app-confirm-dialog/app-confirm-dialog.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppSpinnerComponent } from './shared/components/app-spinner/app-spinner.component';

const FirebaseModules = [
  AngularFireModule.initializeApp(environment.firebase),
  AngularFirestoreModule
];

@NgModule({
  declarations: [
    AppComponent,
    CheckboxComponent,
    QuestionBankComponent,
    MultipleChoiceComponent,
    QuestionBankSettings,
    ConfirmDialogComponent,
    QuestionBankListComponent,
    AppSnackbarComponent,
    AppSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    AppMaterialModule,
    NgxSpinnerModule,
    ...FirebaseModules
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [QuestionBankSettings, ConfirmDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
