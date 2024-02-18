import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  getErrorMessageFromField(field: FormControl) {
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

  getErrorMessage(formGroup: FormGroup, fieldName: string): string {
    const field = formGroup.get(fieldName) as FormControl;
    return this.getErrorMessageFromField(field);
  }

  getFormArryFieldErrorMessage(
    formGroup: FormGroup, 
    formArrayName: string,
    fieldName: string,
    index: number
  ) {
    const formArray =  (formGroup.get(formArrayName) as FormArray);
    const field = formArray.controls[index].get(fieldName) as FormControl;
    return this.getErrorMessageFromField(field);
    
  }

  isFormArrayRequired(formGroup: FormGroup, formArrayName: string): boolean {
    const formArray =  (formGroup.get(formArrayName) as FormArray);
    return !formArray.valid && formArray.hasError('required') && formArray.touched;
  }

  validadteAllFormFields(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
    
      if (control instanceof FormControl) {
        control?.markAsDirty;
        // just touch the control itself, not it's children
        // this way obsarvables just will trigger when necessary
        // when reach control, will break recursion
        control?.markAsTouched({ onlySelf: true }); 
      }
      else if (control instanceof FormGroup || control instanceof FormArray) {
        control?.markAsTouched({ onlySelf: true });
        this.validadteAllFormFields(control);
      }
    })
  }

}
// aula 55