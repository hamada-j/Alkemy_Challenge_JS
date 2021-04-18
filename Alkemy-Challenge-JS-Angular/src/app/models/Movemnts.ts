export class Movements {
  id: number;
  concepto: string;
  tipo: string;
  cantidad: any;
  fecha: Date;

    constructor(pId: number, pConcepto: string, pTipo: string, pCantidad: number, pFecha: Date) {
      this.id = pId;
      this.concepto = pConcepto;
      this.tipo = pConcepto;
      this.cantidad = pCantidad;
      this.fecha = pFecha;
    }

}
