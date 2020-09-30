import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConfirmDialogService } from '../shared/services/app-confirm-dialog.service';
import { AppSnackBarService } from '../shared/services/app-snackbar.service';
import { QuestionBankService } from '../shared/services/question-bank.service';

@Component({
  selector: 'app-question-bank-list',
  templateUrl: './question-bank-list.component.html',
  styleUrls: ['./question-bank-list.component.scss']
})
export class QuestionBankListComponent implements OnInit {

  questionList: any = [] = [];
  mobileScreenWidth: number = 1024; // tablet screen
  isMobileView: boolean = false;
  isLoading: boolean = false;

  constructor(private _questionBankService: QuestionBankService,
    private _router: Router,
    private _ngxSpinnerService: NgxSpinnerService,
    private _appConfirmDialogService: AppConfirmDialogService,
    private _appSnackBarService: AppSnackBarService) {
  }

  ngOnInit(): void {
    this._showSpinner();
    this._alwaysShowDeleteButton();
    this._questionBankService.getAllQuestionBank().subscribe(res => {
      this.questionList = res.map((item) => {
        return { ...item.payload.doc.data(), showDelete: false, id: item.payload.doc.id };
      });
      this._hideSpinner();
      console.log(this.questionList)
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this._alwaysShowDeleteButton();
  }

  private _alwaysShowDeleteButton() {
    this.isMobileView = window.innerWidth <= this.mobileScreenWidth ? true : false;
    this.questionList = this.questionList.map(item => {
      return { ...item, showDelete: this.isMobileView ? true : false }
    })
  }

  calculateTotalMarks(question: any): number {
    let totalMarks = 0;
    this.questionList.forEach(item => {
      if (item.id === question.id) {
        item.questions.forEach(res => {
          totalMarks += res.points;
        })
      }
    })
    return totalMarks;
  }

  navigateToQuestionBank(id: any) {
    this._router.navigateByUrl('question-bank/' + id);
  }

  deleteQuestionBank(id: any) {
    this._appConfirmDialogService.confirm('Do you want to delete?').subscribe(res => {
      if (res) {
        this._questionBankService.deleteQuestionBank(id).then(result => {
          this._appSnackBarService.success('Delete successful !');
        })
      }
    });
  }

  private _showSpinner() {
    this._ngxSpinnerService.show();
    this.isLoading = true;
  }

  private _hideSpinner() {
    this._ngxSpinnerService.hide();
    this.isLoading = false;
  }

}
