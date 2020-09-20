import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { IQuestionBank } from 'src/app/question-bank/interface/question-bank.interface';

@Component({
  selector: 'question-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() data: IQuestionBank;

  constructor() { }

  ngOnInit(): void {
    if (!_.size(this.data.options)) {
      this.addOption();
    }
  }

  addOption() {
    this.data.options.push({ id: Date.now(), name: '' });
  }

  removeOption(optionId: any) {
    this.data.options = _.remove(this.data.options, (item) => item.id !== optionId);
    this.data.answerKey = this.data.answerKey.filter((key) => key !== optionId);
  }

  addAnswerKeys(event: any, id: any) {
    if (event.checked) {
      this.data.answerKey.push(id);
    } else {
      this.data.answerKey = _.remove(this.data.answerKey, (item) => item !== id);
    }
  }

}
