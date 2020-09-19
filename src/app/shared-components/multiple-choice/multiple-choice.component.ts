import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'question-multiple-choice',
  templateUrl: './multiple-choice.component.html',
  styleUrls: ['./multiple-choice.component.scss']
})
export class MultipleChoiceComponent implements OnInit {

  @Input() data: any;

  constructor() {}
  ngOnInit(): void {
    if (!_.size(this.data.options)) {
      this.addOption();
    }
  }

  addOption() {
    this.data.options.push({ id: new Date(), name: '' });
  }

  removeOption(optionId) {
    this.data.options = _.remove(this.data.options, (item) => item.id !== optionId);
  }

}
