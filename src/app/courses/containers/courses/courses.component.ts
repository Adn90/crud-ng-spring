import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Observable, of } from 'rxjs';
import { catchError  } from 'rxjs/operators';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';

import { ICourse } from '../../model/course';
import { CoursesService } from '../../service/courses.service';
import { DialogService } from 'src/app/shared/components/error-dialog/services/dialog.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';


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
    private snackBar: MatSnackBar,
    private courseService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute, // referência da rota atual,
    public dialog: MatDialog,
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

  onError(error: any): void {
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

  onEdit(course: ICourse) {
    try {
      this.router.navigate(['edit', course._id], { relativeTo: this.activatedRoute });
    } catch (error) {
      this.onError(error)
    }
  }

  onDelete(course: ICourse) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: "Deseja remover o curso?"
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (!result) { return; }
      this.courseService.remove(course._id).subscribe(
        async data => {
          this.snackBar.open(`Curso ${course.name} removido com sucesso!`, 'X',  { 
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          await this.carregarTabela();
        }, 
        error => {
          this.onError(error)
        }
      );
    });    
  }
}
