import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { FooterComponent } from '../../../shared/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-simulador-de-credito',
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './simulador-de-credito.component.html',
  styleUrl: './simulador-de-credito.component.css'
})


export class SimuladorDeCreditoComponent implements OnInit {

  shareUrl: string = '';
  copiado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const v = parseInt(params['v'], 10);
      const c = parseInt(params['c'], 10);
      const p = params['p'];
      if (v && c) {
        this.valorSolicitado = v;
        this.cuotas = c;
        if (p) this.plazo = p;
        // Auto-calcular si vino con params
        setTimeout(() => this.calcularCredito(), 100);
      }
    });
  }

  private actualizarURL() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        v: this.valorSolicitado,
        c: this.cuotas,
        p: this.plazo
      },
      queryParamsHandling: 'merge'
    });

    if (isPlatformBrowser(this.platformId)) {
      this.shareUrl = `${window.location.origin}${window.location.pathname}?v=${this.valorSolicitado}&c=${this.cuotas}&p=${encodeURIComponent(this.plazo)}`;
    }
  }

  copiarURL() {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(this.shareUrl).then(() => {
      this.copiado = true;
      setTimeout(() => this.copiado = false, 2500);
    });
  }

  compartirWhatsApp() {
    if (!isPlatformBrowser(this.platformId)) return;
    const msg = `Mira mi simulacion de credito en INVERSIONESJOG.CO:\n\n` +
      `Valor solicitado: ${this.formatearNumero(this.valorSolicitado || 0)}\n` +
      `Cuotas: ${this.cuotas}\n` +
      `Cuota mensual: ${this.formatearNumero(this.resultado.valorCuota)}\n` +
      `Cuota inicial: ${this.formatearNumero(this.resultado.cuotaInicial)}\n` +
      `Total a pagar: ${this.formatearNumero(this.resultado.totalCredito)}\n\n` +
      `Ver detalle completo: ${this.shareUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }


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



  valorSolicitado: number | null = 510000; // Valor por defecto
  cuotas: number = 3;
  plazo: string = 'Mensual';
  resultadoVisible: boolean = false;
  loading: boolean = false;

  // Resultados del cálculo
  resultado = {
    valorCuota: 0,        // cuota mensual = capital / n
    cuotaInicial: 0,      // pago inicial = aval+gastos + intereses
    desembolsoNeto: 0,    // valor venta - cuota inicial
    totalIntereses: 0,
    porcentajeAval: 12,   // 12% del capital
    ivaAval: 0,           // IVA 19% sobre el aval
    totalAval: 0,         // aval + IVA (12% * 1.19)
    totalCredito: 0,      // total a pagar
    tablaAmortizacion: [] as any[],
    tasaInteres: 1.99     // 1.99% mensual
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
      this.actualizarURL();
    }, 800);

    
  }

  private realizarCalculo() {
    const tasaInteresMensual = this.resultado.tasaInteres / 100; // 1.96%
    const capital = this.valorSolicitado!;
    const numeroCuotas = this.cuotas;

    // ── Intereses: amortización francesa (cuota fija) sobre el capital ──
    const cuotaAmortizada = this.calcularCuotaFija(capital, tasaInteresMensual, numeroCuotas);
    const interesesTotales = Math.round((cuotaAmortizada * numeroCuotas) - capital);

    // ── Aval + gastos = 12% del capital + IVA 19% sobre el aval ──
    const valorAvalSinIva = capital * (this.resultado.porcentajeAval / 100); // 12%
    const ivaAval = valorAvalSinIva * 0.19;
    const totalAval = Math.round(valorAvalSinIva + ivaAval); // 12% * 1.19 = 14.28%

    // ── Cuota inicial (pago upfront) = aval+gastos + intereses ──
    const cuotaInicial = totalAval + interesesTotales;

    // ── Valor cuota mensual = capital repartido en n cuotas ──
    const valorCuota = Math.round(capital / numeroCuotas);

    // ── Total a pagar = capital + aval+gastos + intereses ──
    const totalCredito = capital + totalAval + interesesTotales;

    // ── Tabla amortización (interés sobre saldo decreciente, informativa) ──
    let saldo = capital;
    const tabla = [];
    for (let i = 1; i <= numeroCuotas; i++) {
      const interesPeriodo = saldo * tasaInteresMensual;
      const abonoCapital = cuotaAmortizada - interesPeriodo;
      tabla.push({
        periodo: i,
        cuota: cuotaAmortizada,
        capital: abonoCapital,
        interes: interesPeriodo,
        saldo: saldo - abonoCapital
      });
      saldo -= abonoCapital;
    }

    this.resultado = {
      ...this.resultado,
      valorCuota: valorCuota,
      cuotaInicial: cuotaInicial,
      desembolsoNeto: capital - cuotaInicial,
      totalIntereses: interesesTotales,
      ivaAval: Math.round(ivaAval),
      totalAval: totalAval,
      totalCredito: totalCredito,
      tablaAmortizacion: tabla
    };

    this.cal();
  }

  // Cuota fija amortización francesa
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
    this.valorSolicitado = 510000;
    this.cuotas = 3;
    this.plazo = 'Mensual';
    this.resultadoVisible = false;
  }


  // Cuotas mensuales = capital repartido en n (sin intereses, ya cobrados en cuota inicial)
  cal() {
    this.cuotasPromedioAjustadas = [];
    const capital = this.valorSolicitado!;
    const base = Math.floor(capital / this.cuotas);
    let acumulado = 0;

    for (let i = 1; i <= this.cuotas; i++) {
      if (i < this.cuotas) {
        this.cuotasPromedioAjustadas.push(base);
        acumulado += base;
      } else {
        this.cuotasPromedioAjustadas.push(Math.round(capital - acumulado));
      }
    }
  }
  
  

}