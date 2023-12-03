import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../service/courses.service';
import { ICourse } from '../../model/course';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit {

  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: [''],      
  });
  titulo: string = "";

  disabledOnSubmit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    ) {
  }

  ngOnInit(): void {
    this.titulo = "Detalhes do Curso";
    this.loadingData();
  }

  loadingData() {
    // get data from route
    // this.activatedRoute.snapshot.data['course'] - the ['course'] was defined in the resolver - routing file
    // with forms, its need to use setValue or patch
    const course: ICourse = this.activatedRoute.snapshot.data['course'];
    console.log(course)
    if (!this.checkEmpty(course)) {
      this.form.setValue({
        _id: course._id,
        name: course.name,
        category: course.category,
      })
    }
  }

  onSubmit() {
    this.snackBar.dismiss();
    if (this.checkEmpty(this.form.value)) {
      this.snackBar.open(`Campos não foram preenchidos!`, "", { duration: 3000 } );
      return;
    }
    this.courseService.save(this.form.value).subscribe(
      (data: ICourse) => {
        this.onSucess(data);
        this.disabledOnSubmit = true;
      }, 
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

  checkEmpty(form: any) {
    for (var key in form) {
      if (form[key] === null || form[key] == "")
        return true;
    }
    return false;
  }

}