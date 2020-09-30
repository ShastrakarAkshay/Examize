import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './app-empty-state.component.html',
  styleUrls: ['./app-empty-state.component.scss']
})
export class AppEmptyStateComponent implements OnInit {

  @Input() type: string;
  @Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
