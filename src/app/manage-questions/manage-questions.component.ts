import { isNgTemplate, ReadPropExpr } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { IQuestionType } from '../interface/question-type.interface';
import * as _ from 'lodash';

@Component({
  selector: 'app-manage-questions',
  templateUrl: './manage-questions.component.html',
  styleUrls: ['./manage-questions.component.scss']
})
export class ManageQuestionsComponent implements OnInit {

  questionData: IQuestionType[];

  constructor() { }

  ngOnInit(): void {
    this.questionData = [
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
  }

  matCardClicked(data) {
    if (!data.readonly) {
      return;
    }
    this.questionData.forEach(item => {
      item.readonly = item.id === data.id ? false : true;
    })
  }

  deleteQuestion(questionId: any) {
    this.questionData = _.remove(this.questionData, (item) => item.id !== questionId);
  }


  addQuestion() {
    const newQuestion = {
      id: new Date(),
      question: '',
      questionType: 1,
      options: [],
      answerKey: [],
      points: 0,
      required: false,
      readonly: false
    }
    this.questionData = this.questionData.map(item => {
      return { ...item, readonly: true }
    })
    this.questionData.push(newQuestion);
  }

  addMarks(id) {
    this.questionData.forEach(item => {
      if (item.id === id) {
        item.points = item.points + 1;
      }
    })

  }

  minusMarks(id) {
    this.questionData.forEach(item => {
      if (item.id === id && item.points !== 0) {
        item.points = item.points - 1;
      }
    })
  }

}
