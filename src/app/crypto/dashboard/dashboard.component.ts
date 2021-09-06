import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AvisoDialogComponent } from './pages/aviso-dialog/aviso-dialog.component';
import { CryptoThresholds } from '../../models/cryptoThresholds';
import { CryptoThresholdsService } from '../threshold/services/cryptos-thresholds.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  isLinear = false;

  selectValue: string = '';
  maximum!: number;
  minimum!: number;

  parametros: any;
  cryptoThresholds: CryptoThresholds = new CryptoThresholds();

  public page: any;

  constructor(
    private service: CryptoThresholdsService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.page = {
      page: 0,
      size: 1000
    }
  }

  ngOnInit() {
    this.parametros = localStorage.getItem("alerta");
    this.parametros = JSON.parse(this.parametros);

    this.service.listarTodas(this.page).subscribe((cryptoThresholdsUrl: any) => {
      this.cryptoThresholds = cryptoThresholdsUrl.content.find((res: any) => {
        return res.usuario.nome === this.parametros.usuario ? res : null;
      });
    });

    if (this.parametros.confirmacao && (this.cryptoThresholds.threshold_minimo === this.parametros.venda ||
        this.cryptoThresholds.threshold_maximo === this.parametros.compra)) {
      this.dialog.open(AvisoDialogComponent, {
        minWidth: '400px',
        maxWidth: 'auto',
        minHeight: '200px',
        maxHeight: 'auto',
        data: {
          parametros: this.parametros
        }
      });
    }

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  firstForm(form: FormGroup) {
    this.firstFormGroup = form;
    this.isLinear = true;
  }

  selectedValue(value: string) {
    this.selectValue = value;
  }

  minMax(event: any) {
    this.maximum = event.max;
    this.minimum = event.min;
  }
}
