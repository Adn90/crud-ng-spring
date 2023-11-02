import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog.component';
import { IDialog } from './dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  onError(data: IDialog): void {
    this.dialog.open(ErrorDialogComponent, {
      data,
      disableClose: true
    });

  }
}
