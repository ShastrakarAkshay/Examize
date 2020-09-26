import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-bank-list',
  templateUrl: './question-bank-list.component.html',
  styleUrls: ['./question-bank-list.component.scss']
})
export class QuestionBankListComponent implements OnInit {

  questionList: any = [] = [];
  mobileScreenWidth: number = 1024; // tablet screen
  isMobileView: boolean = false;

  constructor() {
  }

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
    this._alwaysShowDeleteButton();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._alwaysShowDeleteButton();
  }

  private _alwaysShowDeleteButton() {
    this.isMobileView = window.innerWidth <= this.mobileScreenWidth ? true : false;
    this.questionList = this.questionList.map(item => {
      return { ...item, showDelete: this.isMobileView ? true : false }
    })
  }

}
