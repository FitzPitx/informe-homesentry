import { Component,OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexDataLabels, ApexPlotOptions } from 'ng-apexcharts';
import { CategoriaMensualService } from '../../services/categoria-mensual/categoria-mensual.service';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-categoria-ventas',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './categoria-ventas.component.html',
  styleUrl: './categoria-ventas.component.scss'
})
export class CategoriaVentasComponent implements OnInit{

  public series: ApexAxisChartSeries = [];
  public chart: ApexChart = {
    type: 'bar',
    height: 350,
    toolbar: {
      show: true
    }
  };
  
  public xaxis: ApexXAxis = { categories: [] };
  public title: ApexTitleSubtitle = { text: 'Resumen de Ventas por Sucursal', align: 'center' };
  public dataLabels: ApexDataLabels = { enabled: false };
  public plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      dataLabels: {
        position: 'top'
      }
    }
  };

  constructor(private categoriaService: CategoriaMensualService) {}

    ngOnInit(): void {
    this.categoriaService.getResumen().subscribe(data => {
      const sucursales = [...new Set(data.map(item => item.sucursal))];
      const seriesData = [
        {
          name: 'Cantidad',
          data: sucursales.map(sucursal => {
            const item = data.find(d => d.sucursal === sucursal);
            return item ? item.totalCantidad : 0;
          })
        },
        {
          name: 'Valor',
          data: sucursales.map(sucursal => {
            const item = data.find(d => d.sucursal === sucursal);
            return item ? item.totalValor : 0;
          })
        },
        {
          name: 'Valor IVA',
          data: sucursales.map(sucursal => {
            const item = data.find(d => d.sucursal === sucursal);
            return item ? item.totalValorIva : 0;
          })
        },
        {
          name: 'Costo',
          data: sucursales.map(sucursal => {
            const item = data.find(d => d.sucursal === sucursal);
            return item ? item.totalCosto : 0;
          })
        }
      ];

      this.series = seriesData;
      this.xaxis = {
        categories: sucursales.map(sucursal => `Sucursal ${sucursal}`)
      };
    });
  }
}
