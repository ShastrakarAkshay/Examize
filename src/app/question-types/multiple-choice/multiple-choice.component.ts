import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { IQuestionBank } from 'src/app/question-bank/interface/question-bank.interface';

@Component({
  selector: 'question-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit {

  @Input() data: IQuestionBank;

  constructor() {}
  ngOnInit(): void {
    if (!_.size(this.data.options)) {
      this.addOption();
    }
  }

  addOption() {
    this.data.options.push({ id: new Date(), name: '' });
  }

  removeOption(optionId: any) {
    this.data.options = _.remove(this.data.options, (item) => item.id !== optionId);
  }

}
