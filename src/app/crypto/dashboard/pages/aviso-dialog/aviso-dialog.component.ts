import { Component, OnInit } from '@angular/core';
import { CryptoThresholds } from '../../../../models/cryptoThresholds';
import { CryptoTipos } from '../../../../models/cryptoTipos';

export interface DialogData {
  parametros: {
    usuario: string;
    thresholds: CryptoThresholds;
    criptoTipos: CryptoTipos;
    confirmacao: boolean
  }
}

@Component({
  selector: 'app-aviso-dialog',
  templateUrl: './aviso-dialog.component.html',
  styleUrls: ['./aviso-dialog.component.scss']
})
export class AvisoDialogComponent implements OnInit {

  constructor(){}

  ngOnInit() {
  }

}
