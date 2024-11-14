import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Importacion de componentes
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  
    HomeComponent,
    FormsModule,
    CommonModule,
    RouterLink, RouterLinkActive
  ],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'informe-homesentry';

}
