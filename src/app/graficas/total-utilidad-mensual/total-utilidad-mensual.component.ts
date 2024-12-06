import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-total-utilidad-mensual',
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './total-utilidad-mensual.component.html',
  styleUrl: './total-utilidad-mensual.component.scss'
})
export class TotalUtilidadMensualComponent implements OnInit {

  @Input() searchYearChild: number = 0;
  @Input() searchSucursalChild: number = 0;

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
      this.categoriaService.getTotalProfitComparisonByMonth(this.searchYearChild, this.searchSucursalChild).subscribe((data: any) => {
        const month = data.map((item: any) => item.month);
        const totalProfitCurrentYear = data.map((item: any) => item.totalProfitCurrentYear);
        const totalProfitLastYear = data.map((item: any) => item.totalProfitLastYear);

        this.chartOptions = {
          series: [
            {
              name: 'Año Actual',
              data: totalProfitCurrentYear
            },
            {
              name: 'Año Anterior',
              data: totalProfitLastYear
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
            categories: month
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
          text: 'Comparativo de Utilidad por Mes',
          align: 'center',
        },
      }
      });
  }

}
