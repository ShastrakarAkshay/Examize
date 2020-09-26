import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-app-snackbar',
  templateUrl: './app-snackbar.component.html',
  styleUrls: ['./app-snackbar.component.scss']
})
export class AppSnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any, private _snackRef: MatSnackBarRef<any>) { }

  ngOnInit(): void { }

  get getIcon() {
    switch (this.data.icon) {
      case 'success':
        return { iconName: 'done', bgColor: 'bg-success' };
      case 'error':
        return { iconName: 'error', bgColor: 'text-danger' };
      case 'warning':
        return { iconName: 'warning', bgColor: 'text-danger' };
      case 'info':
        return { iconName: 'info', bgColor: 'text-info' };
      default:
        return { iconName: 'done', bgColor: 'bg-success' };
    }
  }

  dismiss(){
    this._snackRef.dismiss();
  }
}
