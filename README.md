# Proyecto: Módulo Reportes HomeSentry

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.6 and upgraded to 19.0.1 version.

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

~~~pwsh
    git clone [URL_DEL_REPOSITORIO]
    cd informe-homesentry
~~~

2.**Instalar dependencias**:

~~~pwsh
    npm install
~~~

3.**Ejecutar la aplicación**:

~~~pwsh
    ng serve
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

## Componentes Principales

### comparativo-ventas-mensual-categoria.componente.ts

Este componenete es responsable de mostrar la tabla comparativo de ventas mensuales por categoría. Incluye funcionalidades como:

* **Filtrado** por código y nombre de categoría.
* **Paginación** y ajuste del número de filas mostradas.
* **Exportación** de la tabla a Excel.
* **Visualización** de totales y variaciones.

## Características Clave

* **Filtros**: Implementados con dropdowns de Boostrap para filtrar los datos por `codigoCategoria` y `nombreCategoria`.
* **Tabla**: Utiliza una tabla de Boostrap con columnas sticky para mantener visibles las columnas de código y categoría.
* **Responsive Design**: Se adapta a diferentes tamaños de pantalla, deshabilitando la funcionalidad sticky en pantallas pequeñas.
* **Exportación a Excel**: Usa `ExcelJS` y `FileSaver` para generar y descargar un archivo Excel con los datos mostrados.

## Métodos Importantes

* `ngOnInit()`: Inicializa el componente y carga los datos iniciales.
* `feedDataSource(data: any)`: Transforma y asigna los datos al origen de datos de la tabla.
* `applyFilter(columnNmae: string, filterValue:string)`: Aplica filtros a las columnas especificadas.
* `getTotalByColumn()`: Calcula los totales para cada columna.
* `exportToExcel()`: Genera y descarga el archivo Excel con los datos actuales de la tabla.

## Código de Ejemplo

~~~typescript
// Aplicar filtro a una columna
applyFilter(columnName: string, filterValue: string) {
  this.filterValues[columnName as keyof typeof this.filterValues] = filterValue;
  this.listaVentasDataSource.filter = JSON.stringify(this.filterValues);
}
~~~

### `categoria-mensual.service.ts`

Servicio encargado de realizar llamadas HTTP al backend para obtener los datos.

## Métidos Principales

* `getResumenMensual(year: number, sucursal?: number)`: Obtiene el resumen mensual de ventas por categoría para el año y sucursal especificados.

## Código de Ejemplo 2

~~~js
getResumenMensual(year: number, sucursal?: number): Observable<any> {
  let params = new HttpParams().set('year', year.toString());
  if (sucursal) {
    params = params.set('sucursal', sucursal.toString());
  }
  return this.http.get(`${this.apiUrl}/resumen-mensual-categoria`, { params });
}
~~~

## Arquitectura y Flujo de Datos

1.**Petición de Datos**: Al inicializar el componente o aplicar filtros, se realiza una petición al servicio `CategoriaMensualService` para obtener los datos actualizados.

2.**Procesamiento de Datos**: Los datos recibidos se transforman para adaptarse al formato requerido por la tabla y los gráficos.

3.**Visualización**: Los datos procesados se muestran en la tabla con opciones de filtrado y paginación. Los totales y variaciones se calculan y muestran en el pie de la tabla.

4.**interacción del Usuario**: El usuario puede filtrar los datos, cambiar el número de filas mostradas, navegar entre páginas y exportar los datos a Excel.

## Instrucciones de Usuario

### Filtrado de Datos

* **Por Código**: Utiliza el dropdown en la columna "Código" para filtrar los datos por código de categoría.
* **Por Categoría**: Utiliza el dropdown en la columna "Categoría" para filtrar los datos por nombre de categoría.

### Paginación

* Selecciona el número de filas a mostrar mediante el selector ubicado encima de la tabla.
* Navega entre páginas utilizando los controles de paginación al final de la tabla.

## Exportación a Excel

* Haz clic en el botón. "Exportar a Excel" para descargar un archivo con los datos actualmente mostrados en la tabla.

## Desarrollo y Personalización

### Añadir Nuevas funcionalidades

* **NuevosF Filtros**: Para agregar filtros adicionales, sigue el patrón utilizado en `applyFilter()` y actualiza el template con los nuevos dropdowns.
* **Columnas Personalizadas**: Puedes modificar las columnas mostradas ajustando las listas `months` y `metricsColumns` en el componente.

### Estilos Personlizados

* Los estilos específicos del componente se encuentran en `comparativo-ventas-mensual-categoria.component.scss`. Aquí puede añadir o modificar estilos para ajustar la apariencia de la tabla y otros elementos.

### Ejemplo de Estilos sticky

~~~scss
.sticky-col {
  position: sticky;
  background-color: white;
  z-index: 2;

  &.first-col {
    left: 0;
  }

  &.second-col {
    left: 100px;
  }
}

@media screen and (max-width: 613px) {
  .sticky-col {
    position: static !important;
    left: auto !important;
  }
}
~~~

## Ejecución de Pruebas

* **Pruebas Unitarias**: Utiliza el comand `ng test` para ejecutar las pruebas unitarias del proyecto.
* **Pruebas E2E**: Puedes ejecutar pruebas de extremo a extremo con `ng e2e` si dispones de un Framework de pruebas instalado como Protactor o Cypress.

## Despliegue

Para desplegar la aplicación en un entorno de producción:

1.**Generar una build optimizada**:

~~~pwsh
ng build --prod
~~~

2.**Servir los archivos estáticos**:

Los archivos generados se encuentran en la carpeta `dist`. Puedes servir estos archivos desde cualquier servidor web estático como Nginx, Apache, etc.

## Dependencias

Asegúrate de que las siguientes dependencias estén correctamente configuradas en el `package.json`:

~~~json
"dependencies": {
  "@angular/core": "^12.0.0",
  "bootstrap": "^5.3.0",
  "exceljs": "^4.4.0",
  "file-saver": "^2.0.5"
},
"devDependencies": {
  "@types/file-saver": "^2.0.7"
}
~~~

### Recursos Externos

* **Documentación Angular**: [Angular](https://angular.io/docs)
* **Boostrap 5**: [Boostrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
* **ExcelJS**: [ExcelJS](https://github.com/exceljs/exceljs)
* **FileSaver**: [FileSaver](https://github.com/eligrey/FileSaver.js/)

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
