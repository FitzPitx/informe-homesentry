import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: 'comparativo-ventas-3-anos', 
        loadComponent: () => import('./comparativo-ventas-3-anos/comparativo-ventas-3-anos.component').then(m => m.ComparativoVentas3AnosComponent)
      },
      { 
        path: 'comparativo-ventas-mensual-categoria', 
        loadComponent: () => import('./comparativo-ventas-mensual-categoria/comparativo-ventas-mensual-categoria.component').then(m => m.ComparativoVentasMensualCategoriaComponent)
      },
      { 
        path: 'informe-ventas-mes-categoria-proveedor', 
        loadComponent: () => import('./informe-ventas-mes-categoria-proveedor/informe-ventas-mes-categoria-proveedor.component').then(m => m.InformeVentasMesCategoriaProveedorComponent)
      },
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
      },
];
