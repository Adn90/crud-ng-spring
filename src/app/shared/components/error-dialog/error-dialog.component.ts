import { Component, Inject, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { IDialog } from './services/dialog';

interface ITeste {
  title: string;
  message: string;
}
@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDialog) { }

  ngOnInit(): void {
  }

}
