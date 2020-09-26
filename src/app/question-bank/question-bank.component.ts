import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Inject, Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { CQuestionTypes } from '../question-types/question-type.constant';
import { AppSnackbarComponent } from '../shared/components/app-snackbar/app-snackbar.component';
import { IQuestionBank, IQuizModal, IQuizSettings } from './interface/question-bank.interface';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionBankComponent implements OnInit {

  quizData: IQuizModal;
  questionType = CQuestionTypes;
  readonly: boolean = true;
  private _emptyQuestion: IQuestionBank = {
    id: new Date(),
    question: '',
    questionType: 1,
    options: [],
    answerKey: [],
    points: 0,
    required: false,
    readonly: false
  }

  constructor(private _matBottomSheet: MatBottomSheet, private _matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.startsOver();
  }

  private _initializeQuesitonBank() {
    if (!_.size(this.quizData.questions)) {
      this.quizData.questions.push({ ...this._emptyQuestion, id: Date.now() });
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
    this.quizData.questions = _.remove(this.quizData.questions, (item) => item.id !== questionId);
    this._initializeQuesitonBank();
  }


  addQuestion(index: number) {
    this.readonly = true;
    this.quizData.questions = this.quizData.questions.map(item => {
      return { ...item, readonly: true }
    })
    this.quizData.questions.splice(index + 1, 0, { ...this._emptyQuestion, id: Date.now() });
    const card = document.getElementById('card' + index);
    card.scrollIntoView({ behavior: 'smooth' });
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
    if (data.question.trim() === "" || _.size(invalidOptions) || !_.size(data.options)) {
      return true;
    }
    return false;
  }

  submit() {
    // remove question that has blank question name
    const filteredQuestions = this.quizData.questions.filter(item => item.question.trim() !== "");
    // remove options that has blank option name
    const filteredOptions = filteredQuestions.map(item => {
      return { ...item, options: item.options.filter(option => option.name.trim() !== "") }
    })
    // @todo: remove answer key ids if options is removed

    // remove question that has empty options array
    this.quizData.questions = filteredOptions.filter(item => item.options.length > 0);
    console.log(this.quizData)
    this._matSnackBar.openFromComponent(AppSnackbarComponent, {
      duration: 2000,
      verticalPosition: 'top',
      data: { messege: 'Saved Successfully !', icon: 'success' }
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
      questions: []
    }
    this._initializeQuesitonBank();
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
