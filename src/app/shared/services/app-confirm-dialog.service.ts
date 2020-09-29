import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/app-confirm-dialog/app-confirm-dialog.component';

@Injectable({
    providedIn: 'root'
})
export class AppConfirmDialogService {

    constructor(private _matDialog: MatDialog) { }

    confirm(messege: string): Observable<any> {
        let dialogRef = this._matDialog.open(ConfirmDialogComponent, {
            data: { message: messege },
            autoFocus: false
        })
        return dialogRef.afterClosed();
    }
}
