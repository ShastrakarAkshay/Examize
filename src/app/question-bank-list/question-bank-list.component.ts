import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSnackBarService } from '../shared/components/app-snackbar/services/app-snackbar.service';
import { QuestionBankService } from '../shared/components/app-snackbar/services/question-bank.service';

@Component({
  selector: 'app-question-bank-list',
  templateUrl: './question-bank-list.component.html',
  styleUrls: ['./question-bank-list.component.scss']
})
export class QuestionBankListComponent implements OnInit {

  questionList: any = [] = [];
  mobileScreenWidth: number = 1024; // tablet screen
  isMobileView: boolean = false;

  constructor(private _questionBankService: QuestionBankService,
    private _router: Router,
    private _appSnackBarService: AppSnackBarService) {
  }

  ngOnInit(): void {
    this._questionBankService.getAllQuestionBank().subscribe(res => {
      this.questionList = res.map((item) => {
        return { ...item.payload.doc.data(), showDelete: false, id: item.payload.doc.id };
      });
    })
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

  navigateToQuestionBank(data: any) {
    this._router.navigateByUrl('question-bank');
    this._questionBankService.setQuestionBankData(data);
  }

  deleteQuestionBank(id: any) {
    const res = confirm('Are you sure');
    if (res) {
      this._questionBankService.deleteQuestionBank(id).then(result => {
        this._appSnackBarService.success('Delete successful !');
      })
    }
  }

}
