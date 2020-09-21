import { isNgTemplate, ReadPropExpr } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { CQuestionTypes } from '../question-types/question-type.constant';
import { IQuestionBank, IQuestionOptions, IQuizModal } from './interface/question-bank.interface';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankComponent implements OnInit {

  questionBank: IQuestionBank[];
  questionType = CQuestionTypes;
  readonly: boolean = true;
  quizName: string;
  quizDescription: string;

  constructor() { }

  ngOnInit(): void {
    this.questionBank = [
      {
        id: 10001,
        question: 'Who is PM of inida?',
        questionType: 1, // 1. multiple choice 2. checkbox etc
        options: [
          {
            id: 1,
            name: 'Narendara Modi'
          },
          {
            id: 2,
            name: 'Lalu Yadav'
          }
        ],
        answerKey: [1],
        points: 2,
        required: false,
        readonly: true
      },
      {
        id: 10002,
        question: 'What is capital of maharashtra?',
        questionType: 2, // 1. multiple choice 2. checkbox etc
        options: [
          {
            id: 1,
            name: 'Nagpur'
          },
          {
            id: 2,
            name: 'Mumbai'
          }
        ],
        answerKey: [2],
        points: 2,
        required: false,
        readonly: true
      },
      {
        id: 10003,
        question: 'What is capital of india?',
        questionType: 1, // 1. multiple choice 2. checkbox etc
        options: [
          {
            id: 1,
            name: 'Delhi'
          },
          {
            id: 2,
            name: 'Mumbai'
          }
        ],
        answerKey: [1],
        points: 2,
        required: true,
        readonly: true
      }
    ];
    this._initializeQuesitonBank();
  }

  private _initializeQuesitonBank() {
    const emptyQuestion: IQuestionBank = {
      id: new Date(),
      question: '',
      questionType: 1,
      options: [],
      answerKey: [],
      points: 0,
      required: false,
      readonly: false
    }
    if (!_.size(this.questionBank)) {
      this.questionBank.push(emptyQuestion);
    }
  }

  editQuestion(data: IQuestionBank) {
    this.readonly = true;
    if (!data.readonly) {
      return;
    }
    this.questionBank.forEach(item => {
      item.readonly = item.id === data.id ? false : true;
    })
  }

  editHeader() {
    if (!this.readonly) {
      return;
    }
    this.readonly = false;
  }

  deleteQuestion(questionId: any) {
    this.questionBank = _.remove(this.questionBank, (item) => item.id !== questionId);
    this._initializeQuesitonBank();
  }


  addQuestion(index: number) {
    const newQuestion = {
      id: Date.now(),
      question: '',
      questionType: 1,
      options: [],
      answerKey: [],
      points: 0,
      required: false,
      readonly: false
    }
    this.questionBank = this.questionBank.map(item => {
      return { ...item, readonly: true }
    })
    this.questionBank.splice(index + 1, 0, newQuestion);
  }

  addMarks(id: any) {
    this.questionBank.forEach(item => {
      if (item.id === id) {
        item.points = item.points + 1;
      }
    })

  }

  minusMarks(id: any) {
    this.questionBank.forEach(item => {
      if (item.id === id && item.points !== 0) {
        item.points = item.points - 1;
      }
    })
  }

  calculateTotalMarks(): number {
    let totalMarks = 0;
    this.questionBank.forEach(item => {
      totalMarks = totalMarks + item.points;
    })
    return totalMarks;
  }

  submit() {
    // remove question that has blank question name
    const filteredQuestions = this.questionBank.filter(item => item.question.trim() !== "");
    //remove options that has blank option name
    const questionData = filteredQuestions.map(item => {
      return { ...item, options: item.options.filter(option => option.name.trim() !== "") }
    })
    const quiz: IQuizModal = {
      quizName: this.quizName,
      quizDescription: this.quizDescription,
      questions: questionData,
      settings: {
        shuffleQuestions: true,
        negativeMarking: {},
        showResultToParticipants: false
      }
    }
    console.log(quiz)
  }

}
