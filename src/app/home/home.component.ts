import { Component, ViewChild } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgApexchartsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Ventas Retail",
          data: [784913, 484168, 748199, 487963, 999159, 784135, 454812, 500000, 1000000]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Total Ventas Anual"
      },
      xaxis: {
        categories: ["Ene", "Feb",  "Mar",  "Abr",  "May",  "Jun",  "Jul",  "Ago", "Sep"]
      }
    };
  }

}
