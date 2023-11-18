import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  titulo: string = "";

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],      
    });
  }

  ngOnInit(): void {
    this.titulo = "Detalhes do Curso";
  }

  onSubmit() {}
  onCancel() {}

}
