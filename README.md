# Custom Themes

- https://material.angular.io/guide/theming
- https://www.digitalocean.com/community/tutorials/angular-angular-material-custom-theme
- https://m2.material.io/design/color/the-color-system.html#tools-for-picking-colors

```scss
@use '@angular/material' as mat;

@include mat.core();


@import '@angular/material/theming';
@include mat-core();

$custom-app-primary: mat-palette($mat-blue);
```
# RXJS

- https://stackoverflow.com/questions/42345969/take1-vs-first
- https://stackoverflow.com/questions/69252124/how-to-initialize-observables-in-angular-strict-mode
- https://www.learnrxjs.io/learn-rxjs/operators/creation/of


# Componentes Inteligentes x Componentes de Apresentação

> Componentes Inteligentes - containers

- Possui lógica e consumo de serviços
- Courses e forms

> Apresentação - components

- apenas geram algo visual, como a tabela que recebe dados vindo do serviço



# FormArray
* fixes "Property 'controls' does not exist on type 'AbstractControl'"

- https://stackoverflow.com/questions/46926182/property-controls-does-not-exist-on-type-abstractcontrol-angular-4

You can fix it easily though. Outsource the "get the controls" logic into a method of your component code (the .ts file):

```ts
getControls() {
  return (this.recipeForm.get('controlName') as FormArray).controls;
}
```
In the template, you can then use:
```html
<div *ngFor="let ingredientCtrl of getControls(); let i = index"></div>
```
This adjustment is required due to the way TS works and Angular parses your templates (it doesn't understand TS there).


## Template perfomance

```html
<!-- get index improves performance -->
<div *ngFor="let lesson of getLessonsFormArray(); let i = index"></div>
```