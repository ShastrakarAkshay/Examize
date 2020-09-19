import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxComponent } from './shared-components/checkbox/checkbox.component';
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
import { ManageQuestionsComponent } from './manage-questions/manage-questions.component';
import { MultipleChoiceComponent } from './shared-components/multiple-choice/multiple-choice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

@NgModule({
  declarations: [
    AppComponent,
    CheckboxComponent,
    ManageQuestionsComponent,
    MultipleChoiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ...MaterialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
