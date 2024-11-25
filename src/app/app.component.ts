import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Importacion de componentes
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,
        FormsModule,
        CommonModule,
        RouterLink
    ],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'informe-homesentry';

}
