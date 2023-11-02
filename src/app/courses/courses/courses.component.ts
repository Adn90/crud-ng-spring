import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';

import { Observable, of } from 'rxjs';
import { catchError  } from 'rxjs/operators';

import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';

import { ICourse } from '../model/course';
import { CoursesService } from '../service/courses.service';
import { DialogService } from 'src/app/shared/components/error-dialog/services/dialog.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<ICourse[]> = of([]);
  displayedColumns = ["name", "category"]

  errorHeader: string = "";

  // só é possível pois o CoursesService é @Injectable
  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private courseService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.carregarTabela(); 
  }

  async carregarTabela() {
    this.courses$ = this.courseService.list()
    .pipe(
      catchError((error: HttpErrorResponse ) => {
        console.log(error)
        this.onError(error)
        return of([]);
      })
    );
  }

  onError(error: HttpErrorResponse): void {
    this.dialogService.onError({
      title: String(`${error.status} - ${error.statusText}`),
      message: error.message
    })
  }

}
