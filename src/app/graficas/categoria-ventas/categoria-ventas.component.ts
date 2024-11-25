import { Component,OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle,
} from "ng-apexcharts";
import { CategoriaMensualService } from '../../services/categoria-mensual/categoria-mensual.service';
import { NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-categoria-ventas',
    imports: [
        NgApexchartsModule
    ],
    standalone: true,
    templateUrl: './categoria-ventas.component.html',
    styleUrl: './categoria-ventas.component.scss'
})
export class CategoriaVentasComponent implements OnInit{
  public chartOptions!: Partial<ChartOptions>;
  
  constructor(private categoriaService: CategoriaMensualService){}

  ngOnInit(): void {
    this.categoriaService.getResumenCategoria().subscribe((data) => {
      const categories = data.map((item: any) => item.nombreCategoria);
      const totalCantidad = data.map((item: any) => item.totalCantidad);
      const totalValor = data.map((item: any) => item.totalValor);
      const totalValorIva = data.map((item: any) => item.totalValorIva);
      const totalCosto = data.map((item: any) => item.totalCosto);

      this.chartOptions = {
        series: [
          {
            name: 'Total Cantidad',
            data: totalCantidad,
          },
          {
            name: 'Total Valor',
            data: totalValor,
          },
          {
            name: 'Total Valor IVA',
            data: totalValorIva,
          },
          {
            name: 'Total Costo',
            data: totalCosto,
          },
        ],
        chart: {
          type: 'bar',
          height: 450,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: categories,
        },
        yaxis: {
          title: {
            text: 'Valores',
          },
          labels: {
            formatter: (val: number) => {
              return val.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              });
            },
          },
        },
        tooltip: {
          y: {
            formatter: (val: number) => val.toLocaleString(),
          },
        },
        legend: {
          position: 'top',
        },
        title: {
          text: 'Resumen de Ventas por Categoría',
          align: 'center',
        },
      };
    });
  }
}
