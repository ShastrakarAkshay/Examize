import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSnackbarComponent } from '../components/app-snackbar/app-snackbar.component';

@Injectable({
    providedIn: 'root'
})
export class AppSnackBarService {

    constructor(private _matSnackBar: MatSnackBar) { }

    open(messege: string, icon: string) {
        this._matSnackBar.openFromComponent(AppSnackbarComponent, {
            duration: 2000,
            verticalPosition: 'top',
            data: { messege: messege, icon: icon }
        })
    }

    success(messege: string) {
        this.open(messege, 'success');
    }

    warning(messege: string) {
        this.open(messege, 'warning');
    }

    info(messege: string) {
        this.open(messege, 'info');
    }

    error(messege: string) {
        this.open(messege, 'error');
    }



}
