import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simulador-de-credito',
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './simulador-de-credito.component.html',
  styleUrl: './simulador-de-credito.component.css'
})


export class SimuladorDeCreditoComponent  {


  formatearInput(valor: number | any): string {
    if (valor === null || isNaN(valor)) return '';
    return '$' + valor.toLocaleString('es-CO');
  }
  
  actualizarValorSolicitado(event: Event) {
    const input = event.target as HTMLInputElement;
    const limpio = input.value.replace(/\D/g, ''); // Quitar todo lo que no sea dígito
    this.valorSolicitado = limpio ? parseInt(limpio, 10) : null;
  }
  
  

  cuotasPromedioAjustadas: number[] = [];



  valorSolicitado: number | null = 1000000; // Valor por defecto como en la imagen
  cuotas: number = 6; // 6 meses como en la imagen
  plazo: string = 'Mensual';
  resultadoVisible: boolean = false;
  loading: boolean = false;
  
  // Resultados del cálculo (ajustados a los valores de la imagen)
  resultado = {
    valorCuota: 0,
    totalIntereses: 0,
    porcentajeAval: 13, // 13% como en la imagen
    ivaAval: 0, // IVA del 19% sobre el aval
    totalAval: 0,
    totalCredito: 0,
    tablaAmortizacion: [] as any[],
    tasaInteres: 1.91 // 1.91% mensual como en la imagen
  };

  calcularCredito() {
    // Validaciones
    if (!this.valorSolicitado || this.valorSolicitado <= 0) {
      alert('Por favor ingrese un valor válido para el crédito');
      return;
    }

    if (this.cuotas <= 0) {
      alert('El número de cuotas debe ser mayor a cero');
      return;
    }

    this.loading = true;
    this.resultadoVisible = false;

    // Simulamos un pequeño retraso para mejor UX
    setTimeout(() => {
      this.realizarCalculo();
      this.loading = false;
      this.resultadoVisible = true;
    }, 800);

    
  }

  private realizarCalculo() {
    const tasaInteresMensual = this.resultado.tasaInteres / 100;
    const valorSolicitado = this.valorSolicitado!;
    const numeroCuotas = this.cuotas;
    
    // Cálculo de la cuota usando la fórmula de cuota fija
    const valorCuota = this.calcularCuotaFija(valorSolicitado, tasaInteresMensual, numeroCuotas);
    
    // Calcular intereses totales
    const interesesTotales = (valorCuota * numeroCuotas) - valorSolicitado;
    
    // Calcular aval (13% del valor solicitado + IVA 19%)
    const valorAvalSinIva = valorSolicitado * (this.resultado.porcentajeAval / 100);
    const ivaAval = valorAvalSinIva * 0.19;
    const totalAval = valorAvalSinIva + ivaAval;
    
    // Generar tabla de amortización
    let saldo = valorSolicitado;
    const tabla = [];
    
    for (let i = 1; i <= numeroCuotas; i++) {
      const interesPeriodo = saldo * tasaInteresMensual;
      const abonoCapital = valorCuota - interesPeriodo;
      
      tabla.push({
        periodo: i,
        cuota: valorCuota,
        capital: abonoCapital,
        interes: interesPeriodo,
        saldo: saldo - abonoCapital
      });
      
      saldo -= abonoCapital;
    }

    // Guardar resultados
    this.resultado = {
      ...this.resultado,
      valorCuota: valorCuota,
      totalIntereses: interesesTotales,
      ivaAval: ivaAval,
      totalAval: totalAval,
      totalCredito: (valorCuota * numeroCuotas) + totalAval,
      tablaAmortizacion: tabla
    };

    this.cal()
  }

  // Método para calcular la cuota fija usando la fórmula de anualidad
  private calcularCuotaFija(valorPrestamo: number, tasaInteres: number, numeroCuotas: number): number {
    const factor = Math.pow(1 + tasaInteres, numeroCuotas);
    return valorPrestamo * (tasaInteres * factor) / (factor - 1);
  }

  formatearNumero(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(valor);
  }

  resetearSimulador() {
    this.valorSolicitado = 1000000; // Restablecer al valor de ejemplo
    this.cuotas = 6;
    this.plazo = 'Mensual';
    this.resultadoVisible = false;
  }


  cal() {
    this.cuotasPromedioAjustadas = [];
    const total = this.resultado.totalCredito!;
    const promedioAproximado = Math.floor(total / this.cuotas);
    let acumulado = 0;
  
    for (let i = 1; i <= this.cuotas; i++) {
      if (i < this.cuotas) {
        this.cuotasPromedioAjustadas.push(promedioAproximado);
        acumulado += promedioAproximado;
      } else {
        this.cuotasPromedioAjustadas.push(Math.round(total - acumulado));
      }
    }
  }
  
  

}