import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';

import { CryptoThresholds } from '../../../models/cryptoThresholds';
import { CryptoThresholdsService } from '../services/cryptos-thresholds.service';

export interface DialogData {
  edicao: boolean;
}

@Component({
  selector: 'app-cadastro-threshold',
  templateUrl: './cadastro-threshold.component.html',
  styleUrls: ['./cadastro-threshold.component.scss']
})
export class CadastroThresholdComponent implements OnInit {

  public loginForm!: FormGroup;
  public loading = false;
  criptoTransactions!: FormArray;

  cryptoThresholds!: CryptoThresholds;

  constructor(
    private fb: FormBuilder,
    private service: CryptoThresholdsService,
    private router: Router,
    public dialog: MatDialog,
    private toastyService: ToastyService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.service.isAuth$().subscribe((cryptos: CryptoThresholds) => {
      this.cryptoThresholds = cryptos;
    })
    const { threshold_minimo, threshold_maximo, data_atualizacao, usuario, criptoTipos } = this.cryptoThresholds;
    this.loginForm = this.fb.group({
      codigo: new FormControl(null),
      threshold_minimo: new FormControl(threshold_minimo, [Validators.required]),
      threshold_maximo: new FormControl(threshold_maximo, [Validators.required]),
      data_atualizacao: new FormControl(data_atualizacao, [Validators.required]),
      usuario: new FormGroup({
        codigo: new FormControl(usuario?.codigo),
        nome: new FormControl(usuario?.nome),
        sobrenome: new FormControl(usuario?.sobrenome),
        login: new FormControl(usuario?.login),
        senha: new FormControl(usuario?.senha),
        email: new FormControl(usuario?.email)
      }),
      criptoTipos: new FormGroup({
        codigo: new FormControl(criptoTipos?.codigo),
        nome: new FormControl(criptoTipos?.nome),
        dataCadastro: new FormControl(criptoTipos?.dataCadastro),
        criptoTransactions: new FormControl(criptoTipos?.criptoTransactions)
      }),
    });
  }

  cadastrar() {
    if(this.data.edicao === false) {
      const { threshold_minimo, threshold_maximo, data_atualizacao, usuario, criptoTipos } = this.loginForm.controls;
      console.log();
      this.service
        .adicionar(
          new CryptoThresholds(threshold_minimo.value, threshold_maximo.value, data_atualizacao.value, usuario.value, criptoTipos.value))
        .subscribe((_) => {
          this.toastyService.success({
            title: 'Adicionado',
            timeout: 5000,
            msg: 'Threshold adicionado com sucesso!',
            showClose: true,
          });
          this.router.navigate(['/transactions']);
          this.dialog.closeAll();
        }, (_) => {
          this.toastyService.error({
            title: 'Erro',
            timeout: 5000,
            msg: 'Threshold n??o adicionado',
            showClose: true,
          });
        });
    }
    else {
      this.service.atualizar(this.cryptoThresholds.codigo, this.loginForm.value)
      .subscribe((_) => {
        this.toastyService.success({
          title: 'Atualizado',
          timeout: 5000,
          msg: 'Threshold atualizado com sucesso!',
          showClose: true,
        });
        this.router.navigate(['/transactions']);
        this.dialog.closeAll();
      },
        (_) => {
          this.toastyService.error({
            title: 'Erro',
            timeout: 5000,
            msg: 'Threshold n??o atualizado',
            showClose: true,
          });
        });
    }
  }
}
