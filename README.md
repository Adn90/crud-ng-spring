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