import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './app-confirm-dialog.component.html',
  styles: [`* {
    font-family: "Didact Gothic", sans-serif;
  }`]
})

export class ConfirmDialogComponent {

  public message: string;

  constructor(public _dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    _dialogRef.disableClose = true;
    this.message = data.message;
  }

  close() {
    this._dialogRef.close();
  }
}
