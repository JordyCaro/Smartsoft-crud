import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Papa, ParseResult } from 'ngx-papaparse';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.css']
})
export class CsvUploadComponent {

  @ViewChild('doughnutChart') doughnutChart!: ElementRef;
  chart: any;
  data: any[] = [];
  analyzedData: any[] = [];
  showUploadForm = true;
  chartLabels: any;

  constructor(private papa: Papa) {}

  // ngAfterViewInit(): void {
  //   this.createDoughnutChart();
  //  console.log(this.doughnutChart)
  // }

  onFileChange(event: any): void {
    const file = event?.target?.files?.[0];

    if (file) {
      this.showUploadForm = false;
      this.parseCsv(file);
    }
  }

  private parseCsv(file: File): void {
    this.papa.parse(file, {
      complete: (result: ParseResult<any>) => {
        this.data = result.data;
        this.analyzedData = this.analyzeData();
        // console.log(this.doughnutChart)
        // console.log('Resultados del análisis:', this.analyzedData);
        this.createDoughnutChart();
      },
      header: true,
    });
  }


  private analyzeData(): any[] {
    const groupedData = this.data.reduce((acc, result) => {
      const key = result.Province_State;

      if (!acc[key]) {
        acc[key] = { total: 0, results: [] };
      }

      acc[key].total += +result['4/27/21'] || 0;
      acc[key].results.push(result);

      return acc;
    }, {});

    const finalResults = Object.keys(groupedData).map(state => {
      return {
        state,
        lastResult: {
          '4/27/21': groupedData[state].total
        },
        results: groupedData[state].results
      };
    });

    return finalResults;
  }

  getStateWithHighestTotal(): any {
    let stateWithHighestTotal = null;
    let accumulatedHigher = -1;

    this.analyzedData.forEach(result => {
      const total = +result.lastResult?.['4/27/21'] || 0;

      if (total > accumulatedHigher) {
        accumulatedHigher = total;
        stateWithHighestTotal = result.state;
      }
    });

    return { state: stateWithHighestTotal, total: accumulatedHigher };
  }

  getStateWithLeastCumulative(): any {
    let stateWithLeastCumulative = null;
    let lowestTotal = Number.MAX_VALUE;

    this.analyzedData.forEach(result => {
      const total = +result.lastResult?.['4/27/21'] || 0;

      if (total < lowestTotal && total > 0) {
        lowestTotal = total;
        stateWithLeastCumulative = result.state;
      }
    });

    return stateWithLeastCumulative;
  }

  // Función para preparar datos para la gráfica
  prepareChartData(): { chartData: number[]; chartLabels: string[] } {
    const chartData = this.analyzedData.map(result => {
      const total = +result.lastResult?.['4/27/21'] || 0;
      return total;
    });

    const chartLabels = this.analyzedData.map(result => result.state);

    return { chartData, chartLabels };
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

  private createDoughnutChart(): void {
    if (this.doughnutChart) {
      const preparedChartData = this.prepareChartData();
  
      const backgroundColors = preparedChartData.chartLabels.map(() => this.getRandomColor());
  
      const ctx = this.doughnutChart.nativeElement.getContext('2d');
      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: preparedChartData.chartLabels,
          datasets: [
            {
              data: preparedChartData.chartData,
              backgroundColor: backgroundColors,
              hoverBackgroundColor: backgroundColors
            }
          ]
        }
      });
    } else {
      console.error('doughnutChart or its nativeElement is undefined.');
    }
  }
  
}
