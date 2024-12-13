# Proyecto: Módulo Reportes HomeSentry

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6.

## Introducción

El proyecto **Módulo Reportes Homesentry** es una aplicación web desarrollada en Angular que permite visualizar y comparar las ventas mensuales por categoría. La aplicación consume servicios proporcionados por un Backend desarrollado con *Spring Boot* y presenta la información en tablas y gráficos interactivos, facilitando el análisis del desempeño de ventas.

## Tecnologías Utilizadas

* **Angular**: Framework principal para el desarrollo de la aplicación web.
* **Boostrap 5.3**: Biblioteca CSS para el diseño y estilos responsivos.
* **TypeScript**: Lenguaje de programación utilizado en el desarrollo de Angular.
* **ExcelJS**: Biblioteca para la exportación de datos a archivos Excel.
* **FileSaver**: Biblioteca para guardar archivos generados en el navegador.

## Instalación y Configuración

### Requisitos Previos

* **Node.js** y **npm** instalados.
* **Angular CLI** instalado globalmente.

### Pasos de Instalación

1.**Clonar el repositorio**:

~~~ git clone [URL_DEL_REPOSITORIO]
    cd informe-homesentry
~~~

2.**Instalar dependencias**:

~~~ npm install
~~~

3.**Ejecutar la aplicación**:

~~~ ng serve
~~~

La aplicación estará disponible en `http://localhost:4200/`.

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:

* **src/app/**:
  * **components/**: Contiene los componentes de la aplicación.
    * **comparativo-ventas-mensual-categoria/**: Componente principal que muestra la tabla comparativa de ventas.
    * **graficas/**: Contiene componentes para los gráficos.
  * **services/**: Contiene los servicios para consumir APIs.
    * **categoria-mensual.service.ts**: para obtener los datos de ventas por categoría.
  * **models/**: Define las interfaces y modelos de datos utilizados.
  
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
