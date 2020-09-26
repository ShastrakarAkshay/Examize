import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-bank-list',
  templateUrl: './question-bank-list.component.html',
  styleUrls: ['./question-bank-list.component.scss']
})
export class QuestionBankListComponent implements OnInit {

  questionList: any = [] = [];

  constructor() { }

  ngOnInit(): void {
    this.questionList = [
      {
        id: 1,
        showDelete: false
      },
      {
        id: 2,
        showDelete: false
      },
      {
        id: 3,
        showDelete: false
      },
      {
        id: 4,
        showDelete: false
      },
      {
        id: 5,
        showDelete: false
      },
      {
        id: 6,
        showDelete: false
      }
    ]
  }

}
