import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';

import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../service/courses.service';
import { ICourse } from '../../model/course';
import { ActivatedRoute } from '@angular/router';
import { ILesson } from '../../model/lesson';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit {

  form!: FormGroup; // var!: type => ignores ready initialization
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
    this.initializeForm(course);    
  }

  initializeForm(course: ICourse) {
    // resolver will return the data, empty or not
    this.form = this.formBuilder.group({
      _id: [course._id],
      name: [course.name, [
        Validators.required, 
        Validators.minLength(5), 
        Validators.maxLength(100),
        Validators.pattern(/[\S]/g)] // whitespace
      ],
      category: [course.category, [Validators.required]],      
    });

    // old set way
    // console.log(course)
    // this.form.setValue({
    //   _id: course._id,
    //   name: course.name,
    //   category: course.category,
    // })
  }

  onSubmit() {
    this.snackBar.dismiss();
    console.log(this.form.status)
    console.log(this.form)
    if (this.form.status != "VALID") {
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
    // just use form.status
    for (var key in form) {
      if (key == '_id') { continue; } // ignore id.
      if (form[key] === null || form[key] == "")
        return true;
    }
    return false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return "Campo Obrigatório";
    }

    if (field?.hasError('minlength')) {
      // acess props field.errors['minlength']['requiredLength']
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 5;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }

    if (field?.hasError('maxlength')) {
      // acess props field.errors['minlength']['requiredLength']
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 5;
      return `Tamanho máximo execido de ${requiredLength} caracteres.`;
    }

    return "Campo Inválido";
  }

  private createLesson(lesson: ILesson = { id: '', name: '', youtubeUrl: '' }): FormGroup { // valores padrão, caso lesson seja null
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name],
      youtubeUrl: [lesson.youtubeUrl],
    });
  }

  private retriveLesson(course: ICourse) {
    const lesson: FormGroup[] = [];
    if (course?.lessons) {
      course.lessons.forEach(lesson => this.createLesson(lesson));
    } else {
      lesson.push(this.createLesson()); // create new lesson
    }
    return lesson;
  }

}