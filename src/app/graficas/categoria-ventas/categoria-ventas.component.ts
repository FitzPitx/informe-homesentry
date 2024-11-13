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
    height: 350
  };
  public xaxis: ApexXAxis = { categories: [] };
  public title: ApexTitleSubtitle = { text: '' };
  public dataLabels: ApexDataLabels = { enabled: false };
  public plotOptions: ApexPlotOptions = {};

  constructor(private categoriaService: CategoriaMensualService) {}

  ngOnInit(): void {
    this.categoriaService.getResumen().subscribe(data => {
      const sucursales = [...new Set(data.map(item => item.sucursal))];
      const seriesData = [
        {
          name: 'Cantidad',
          data: sucursales.map(sucursal => {
            const item = data.find(d => d.sucursal === sucursal);
            return item ? item.cantidad : 0;
          })
        },
        {
          name: 'Valor',
          data: sucursales.map(sucursal => {
            const item = data.find(d => d.sucursal === sucursal);
            return item ? item.valor : 0;
          })
        },
        {
          name: 'Valor IVA',
          data: sucursales.map(sucursal => {
            const item = data.find(d => d.sucursal === sucursal);
            return item ? item.valorIva : 0;
          })
        },
        {
          name: 'Costo',
          data: sucursales.map(sucursal => {
            const item = data.find(d => d.sucursal === sucursal);
            return item ? item.costo : 0;
          })
        }
      ];

      this.series = seriesData;
      this.chart = {
        type: 'bar',
        height: 350
      };
      this.xaxis = {
        categories: sucursales
      };
      this.title = {
        text: 'Resumen por Sucursal'
      };
      this.dataLabels = {
        enabled: false
      };
      this.plotOptions = {
        bar: {
          horizontal: false,
          columnWidth: '55%'
        }
      };
    });
  }

}
