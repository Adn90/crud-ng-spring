import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../service/courses.service';
import { ICourse } from '../model/course';

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
    private location: Location,
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
      (data: ICourse) => this.onSucess(data), 
      (error: HttpErrorResponse) => {
        this.onError(error);
      } 
    );    
  }

  onCancel() { 
    this.snackBar.dismiss();
    this.location.back(); 
  }

  onError(error: HttpErrorResponse) {
    this.snackBar.open(error.message);
  }

  onSucess(data: ICourse) {
    this.snackBar.open(`Curso ${data.name} foi incluído com sucesso!`, "", { duration: 3000 } );
    setTimeout(() => {
      this.onCancel();
    }, 3000);    
    
  }

}