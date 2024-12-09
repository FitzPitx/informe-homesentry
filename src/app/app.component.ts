import { Component, HostListener, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// Importacion de componentes
import { CommonModule } from '@angular/common';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { HomeComponent } from './home/home.component';
@Component({
    selector: 'app-root',
    imports: [
        FormsModule,
        CommonModule,
        LeftSidebarComponent,
        HomeComponent
    ],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'informe-homesentry';
  
  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  @HostListener('window:resize')
  onResize(): void {
    this.screenWidth.set(window.innerWidth);
    if(this.screenWidth() < 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
  }

  changeIsLeftSidebarCollapsed(isLefSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLefSidebarCollapsed);
  }
}
