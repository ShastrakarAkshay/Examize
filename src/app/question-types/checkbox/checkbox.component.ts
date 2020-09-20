import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'question-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() data: any;

  constructor() { }

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

  addAnswerKeys(event, id) {
    if (event.checked) {
      this.data.answerKey.push(id);
    } else {
      this.data.answerKey = _.remove(this.data.answerKey, (item) => item !== id);
    }
  }

}
