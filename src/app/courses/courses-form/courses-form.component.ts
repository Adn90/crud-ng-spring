import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../service/courses.service';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  titulo: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CoursesService,
    private snackBar: MatSnackBar,
    ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],      
    });
  }

  ngOnInit(): void {
    this.titulo = "Detalhes do Curso";
  }

  onSubmit() {
    this.snackBar.dismiss();
    this.courseService.save(this.form.value).subscribe(
      data => console.log(data), 
      (error: HttpErrorResponse) => {
        this.onError(error);
      } 
    );    
  }

  onCancel() {}

  onError(error: HttpErrorResponse) {
    this.snackBar.open(error.message);
  }

}