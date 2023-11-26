import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { MatDialog } from '@angular/material/dialog';

import { Observable, of } from 'rxjs';
import { catchError  } from 'rxjs/operators';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';

import { ICourse } from '../../model/course';
import { CoursesService } from '../../service/courses.service';
import { DialogService } from 'src/app/shared/components/error-dialog/services/dialog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<ICourse[]> = of([]);
  displayedColumns = ["name", "category", "action"];

  errorHeader: string = "";

  // só é possível pois o CoursesService é @Injectable
  constructor(
    private dialogService: DialogService,
    private courseService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute, // referência da rota atual
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

  viewContact(row: any) {
    console.log(row)
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
