import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './app-spinner.component.html'
})
export class AppSpinnerComponent implements OnInit {

  constructor(private _ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void { }

  show(): boolean {
    this._ngxSpinnerService.show();
    return true;
  }

  hide(): boolean {
    this._ngxSpinnerService.hide();
    return false;
  }

}
