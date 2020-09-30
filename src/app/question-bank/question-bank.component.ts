import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Inject, Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CQuestionTypes } from '../question-types/question-type.constant';
import { AppConfirmDialogService } from '../shared/services/app-confirm-dialog.service';
import { AppSnackBarService } from '../shared/services/app-snackbar.service';
import { QuestionBankService } from '../shared/services/question-bank.service';
import { IQuestionBank, IQuizModal, IQuizSettings } from './interface/question-bank.interface';
import { remove, size } from 'lodash';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankComponent implements OnInit {

  quizID: any;
  quizData: IQuizModal;
  questionType = CQuestionTypes;
  readonly: boolean = true;
  isLoading: boolean = false;


  constructor(private _matBottomSheet: MatBottomSheet,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _ngxSpinnerService: NgxSpinnerService,
    private _appConfirmDialogService: AppConfirmDialogService,
    private _questionBankService: QuestionBankService,
    private _appSnackBarService: AppSnackBarService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(param => {
      this.quizID = param.get('id');
      if (this.quizID && this.quizID !== "0") {
        this._questionBankService.getQuestionBankById(this.quizID).subscribe(res => {
          this.quizData = res.payload.data();
        })
      } else {
        this.startsOver();
        this.quizID = null;
      }
    })
  }

  startsOver() {
    this.quizData = {
      quizName: '',
      quizDescription: '',
      settings: {
        timer: {
          status: false,
          duration: 30
        },
        negativeMarking: false,
        showResult: false,
        shuffleQuestions: true
      },
      questions: [],
      createdOn: '',
      modifiedOn: ''
    }
    this._initializeQuesitonBank();
  }

  private _initializeQuesitonBank() {
    const emptyQuestion: IQuestionBank = {
      id: Date.now(),
      question: '',
      questionType: 1,
      options: [],
      answerKey: [],
      points: 0,
      required: false,
      readonly: false
    }

    if (!size(this.quizData.questions)) {
      this.quizData.questions.push(emptyQuestion);
    }
  }

  editQuestion(data: IQuestionBank) {
    this.readonly = true;
    if (!data.readonly) {
      return;
    }
    this.quizData.questions.forEach(item => {
      item.readonly = item.id === data.id ? false : true;
    })
  }

  deleteQuestion(questionId: any) {
    this.quizData.questions = remove(this.quizData.questions, (item) => item.id !== questionId);
    this._initializeQuesitonBank();
  }


  addQuestion(index: number) {
    this.readonly = true;
    const emptyQuestion: IQuestionBank = {
      id: Date.now(),
      question: '',
      questionType: 1,
      options: [],
      answerKey: [],
      points: 0,
      required: false,
      readonly: false
    }
    this.quizData.questions = this.quizData.questions.map(item => {
      return { ...item, readonly: true }
    })
    this.quizData.questions.splice(index + 1, 0, emptyQuestion);
    if (index >= 0) {
      const card = document.getElementById('card' + index);
      card.scrollIntoView({ behavior: 'smooth' });
    }
  }

  addMarks(id: any) {
    this.quizData.questions.forEach(item => {
      if (item.id === id) {
        item.points = item.points + 1;
      }
    })

  }

  minusMarks(id: any) {
    this.quizData.questions.forEach(item => {
      if (item.id === id && item.points !== 0) {
        item.points = item.points - 1;
      }
    })
  }

  calculateTotalMarks(): number {
    let totalMarks = 0;
    this.quizData.questions.forEach(item => {
      totalMarks = totalMarks + item.points;
    })
    return totalMarks;
  }

  isQuestionValid(data: IQuestionBank): boolean {
    const invalidOptions = data.options.filter(option => option.name.trim() === "")
    if (data.question.trim() === "" || size(invalidOptions) || !size(data.options)) {
      return true;
    }
    return false;
  }

  submit() {
    this._appConfirmDialogService.confirm('Do you want to save?').subscribe(res => {
      if (res) {
        this._showSpinner();
        // remove question that has blank question name
        const filteredQuestions = this.quizData.questions.filter(item => item.question.trim() !== "");

        const filteredOptions = filteredQuestions.map(item => {
          // remove answer key ids if option name is empty
          item.options.forEach(opt => {
            if (opt.name.trim() === '') {
              item.answerKey = item.answerKey.filter(key => key !== opt.id);
            }
          })
          // remove options that has blank option name
          return { ...item, readonly: true, options: item.options.filter(option => option.name.trim() !== "") }
        })

        // remove question that has empty options array
        this.quizData.questions = filteredOptions.filter(item => item.options.length > 0);


        if (!size(this.quizData.questions)) {
          this._appSnackBarService.error('No data to save.');
          this._hideSpinner();
        } else if (this.quizID) {
          // update
          this._questionBankService.updateQuestionBank(this.quizID, this.quizData).then(res => {
            this._hideSpinner();
            this._router.navigateByUrl('/');
            this._appSnackBarService.success('Update Successful !');
          })
        } else {
          // save
          this._questionBankService.saveQuestionBank(this.quizData).then(res => {
            this._hideSpinner();
            this._router.navigateByUrl('/');
            this._appSnackBarService.success('Save Successful !');
          })
        }
      }
    })
  }

  openSettings() {
    const settingsPanel = this._matBottomSheet.open(QuestionBankSettings, {
      data: this.quizData.settings
    });
    settingsPanel.afterDismissed().subscribe(res => {
      if (res) {
        this.quizData.settings = res;
      }
    })
  }

  dragDropQuestion(event: CdkDragDrop<any>) {
    moveItemInArray(this.quizData.questions, event.previousIndex, event.currentIndex);
  }

  questionTypeChanged(event: any, data: any) {
    this.quizData.questions = this.quizData.questions.filter(item => {
      item.answerKey = item.answerKey.slice(0, 1);
      return item;
    })
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

@Component({
  selector: 'app-question-bank-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankSettings implements OnInit {
  settings: IQuizSettings;
  constructor(private _bottomSheetRef: MatBottomSheetRef<QuestionBankSettings>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }
  ngOnInit() {
    this.settings = this.data;
  }
  settingsDismiss(data: IQuizSettings) {
    this._bottomSheetRef.dismiss(data);
  }
}
