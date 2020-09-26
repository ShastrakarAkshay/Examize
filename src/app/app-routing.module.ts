import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { QuestionBankListComponent } from './question-bank-list/question-bank-list.component';
import { QuestionBankComponent } from './question-bank/question-bank.component';


const routes: Routes = [
  {
    path: '',
    component: QuestionBankListComponent
  },
  {
    path: 'question-bank',
    component: QuestionBankComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
