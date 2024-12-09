import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  imports: [RouterModule, CommonModule],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.scss'
})
export class LeftSidebarComponent {

  isLefSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: 'comparativo-ventas-mensual-categoria',
      icon: 'bi bi-graph-up-arrow',
      label: 'Comparativo Ventas'
    },
    {
      routeLink: 'home',
      icon: 'bi bi-house',
      label: 'Dashboard'
    }
  ]

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLefSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
