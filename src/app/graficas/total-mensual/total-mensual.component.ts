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
  selector: 'app-total-mensual',
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './total-mensual.component.html',
  styleUrl: './total-mensual.component.scss'
})
export class TotalMensualComponent implements OnInit {

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
      this.categoriaService.getTotalSummayGraph(this.searchYearChild).subscribe((data) => {
        const month = data.map((item: any) => item.month);
        const totalSaleCurrentYear = data.map((item: any) => item.totalSaleCurrentYear);
        const totalSaleLastYear = data.map((item: any) => item.totalSaleLastYear);


        this.chartOptions = {
          series: [
            {
              name: 'Año Actual',
              data: totalSaleCurrentYear
            },
            {
              name: 'Año Anterior',
              data: totalSaleLastYear
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
          text: 'Comparativo de Ventas por Mes',
          align: 'center',
        },
      };
    });
  }
}
