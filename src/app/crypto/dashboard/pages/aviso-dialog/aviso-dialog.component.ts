import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CryptoTipos } from '../../../../models/cryptoTipos';

export interface DialogData {
  parametros: {
    usuario: string;
    thresholds: any;
    criptoTipos: CryptoTipos;
    confirmacao: boolean
  }
  teveVenda: boolean;
  teveCompra: boolean;
}

@Component({
  selector: 'app-aviso-dialog',
  templateUrl: './aviso-dialog.component.html',
  styleUrls: ['./aviso-dialog.component.scss']
})
export class AvisoDialogComponent implements OnInit {

  valor!: number | undefined;
  tituloOP: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData){}

  ngOnInit() {
    if (this.data.teveVenda) {
      this.valor = this.data.parametros.thresholds.venda;
      this.tituloOP = 'venda';
    }

    if (this.data.teveCompra) {
      this.valor = this.data.parametros.thresholds.compra;
      this.tituloOP = 'compra';
    }
    localStorage.setItem("alerta", JSON.stringify(this.data));
  }
}
