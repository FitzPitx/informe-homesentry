import { Component, OnInit, Input } from '@angular/core';
import { CategoriaMensualService } from '../../services/categoria-mensual/categoria-mensual.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip,
  ApexTitleSubtitle,
} from "ng-apexcharts";
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
  selector: 'app-total-mensual-categoria',
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './total-mensual-categoria.component.html',
  styleUrl: './total-mensual-categoria.component.scss'
})
export class TotalMensualCategoriaComponent implements OnInit {

  @Input() searchYearChild: number = 0;

  public chartOptions: Partial<ChartOptions> ={
    series: [],
    chart: {
      type: 'bar',
      height: 350
    },
    xaxis: {
      categories: []
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: true
    }
  };

  constructor(private categoriaService: CategoriaMensualService){}

  ngOnInit(): void {
      this.categoriaService.getTotalSummaryGraphByCategory(this.searchYearChild).subscribe((data) => {
        const codigoCategoria = data.map((item: any) => item.codigoCategoria);
        const nombreCategoria = data.map((item: any) => item.nombreCategoria);
        const totalVentasActual = data.map((item: any) => item.totalVentasActual);
        const totalVentasAnterior = data.map((item: any) => item.totalVentasAnterior);

        this.chartOptions = {
          series: [
            {
              name: 'Año Actual',
              data: totalVentasActual
            },
            {
              name: 'Año Anterior',
              data: totalVentasAnterior
            }
          ],
          chart: {
            type: 'bar',
            height: 350
          },
          plotOptions: {
            bar:
            {
              horizontal: false,
              columnWidth: '55%',
              borderRadius: 2,
              borderRadiusApplication: 'end'
            },
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: nombreCategoria
          },
          yaxis: {
            title: {
              text: 'Ventas'
            },
            labels: {
              formatter: (val: number) => {
                return val.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
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
          text: 'Comparativo de Ventas por Categoría',
          align: 'center',
        },
      }
    });
  }

}
