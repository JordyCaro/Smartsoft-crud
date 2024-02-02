// app/csv/csv-upload/csv-upload.component.ts

import { Component } from '@angular/core';
import { Papa, ParseResult } from 'ngx-papaparse';

@Component({
  selector: 'app-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.css']
})
export class CsvUploadComponent {

  data: any[] = [];
  analyzedData: any[] = [];
  showUploadForm = true;

  constructor(private papa: Papa) {}

  onFileChange(event: any): void {
    const file = event?.target?.files?.[0];

    if (file) {
      this.showUploadForm = false; // Oculta el formulario al cargar el archivo
      this.parseCsv(file);
    }
  }

  private parseCsv(file: File): void {
    this.papa.parse(file, {
      complete: (result: ParseResult<any>) => {
        this.data = result.data;
        this.analyzedData = this.analyzeData();
        console.log('Resultados del análisis:', this.analyzedData);
      },
      header: true,
    });
  }

  private analyzeData(): any[] {
    // Agrupar resultados por Province_State y sumar los totales
    const groupedData = this.data.reduce((acc, result) => {
      const key = result.Province_State;

      if (!acc[key]) {
        acc[key] = { total: 0, results: [] };
      }

      acc[key].total += +result['4/27/21'] || 0;
      acc[key].results.push(result);

      return acc;
    }, {});

    // Crear un array con los resultados finales
    const resultadosFinales = Object.keys(groupedData).map(estado => {
      return {
        estado,
        ultimoResultado: {
          '4/27/21': groupedData[estado].total
        },
        results: groupedData[estado].results
      };
    });

    return resultadosFinales;
  }

  // Funciones adicionales para responder a las preguntas específicas

  getEstadoConMayorAcumulado(): any {
    let estadoMayorAcumulado = null;
    let acumuladoMayor = -1;

    this.analyzedData.forEach(result => {
      const acumulado = +result.ultimoResultado?.['4/27/21'] || 0;

      if (acumulado > acumuladoMayor && acumulado > 0) {
        acumuladoMayor = acumulado;
        estadoMayorAcumulado = result.estado;
      }
    });

    return estadoMayorAcumulado;
  }

  // Función para obtener el estado con el menor acumulado
  getEstadoConMenorAcumulado(): any {
    let estadoMenorAcumulado = null;
    let acumuladoMenor = Number.MAX_VALUE;

    this.analyzedData.forEach(result => {
      const acumulado = +result.ultimoResultado?.['4/27/21'] || 0;

      if (acumulado < acumuladoMenor && acumulado > 0) {
        acumuladoMenor = acumulado;
        estadoMenorAcumulado = result.estado;
      }
    });

    return estadoMenorAcumulado;
  }

  // Función para preparar datos para la gráfica
  prepareChartData(): { chartData: number[]; chartLabels: string[] } {
    const chartData = this.analyzedData.map(result => {
      const acumulado = +result.ultimoResultado?.['4/27/21'] || 0;
      return acumulado;
    });

    const chartLabels = this.analyzedData.map(result => result.estado);

    return { chartData, chartLabels };
  }

}
