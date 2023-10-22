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
