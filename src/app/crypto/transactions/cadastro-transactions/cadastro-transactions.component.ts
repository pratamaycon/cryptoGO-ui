import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { CryptoService } from '../services/crypto.service';
import { CryptoTipos } from '../../../models/cryptoTipos';
import { CriptoTransactions } from 'src/app/models/criptoTransactions';

export interface DialogData {
  edicao: boolean;
}

@Component({
  selector: 'app-cadastro-transactions',
  templateUrl: './cadastro-transactions.component.html',
  styleUrls: ['./cadastro-transactions.component.scss'],
})
export class CadastroTransactionsComponent implements OnInit {

  public loginForm!: FormGroup;
  public loading = false;
  criptoTransactions!: FormArray;

  cryptos!: CryptoTipos;

  constructor(
    private fb: FormBuilder,
    private cryptoService: CryptoService,
    private router: Router,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.cryptoService.isAuth$().subscribe((cryptos: CryptoTipos) => {
      this.cryptos = cryptos;
    })
    const { nome, criptoTransactions} = this.cryptos;
    this.loginForm = this.fb.group({
      nome: new FormControl(nome, [Validators.required]),
      criptoTransactions: this.fb.array([this.createItem()]),
    });

    return criptoTransactions?.map((_) => {
      this.addNewAddressGroup(criptoTransactions)
      return this.employees.patchValue(
        criptoTransactions
      );
    })
  }

  cadastrar() {
    if(!this.data.edicao) {
      const { nome, criptoTransactions } = this.loginForm.controls;
      this.cryptoService
        .adicionar(new CryptoTipos(nome.value, criptoTransactions.value))
        .subscribe((_) => {
          this.router.navigate(['/transactions']);
          this.dialog.closeAll();
        });
    } else {

      this.cryptoService.atualizar(this.cryptos.codigo, this.loginForm.value)
      .subscribe((_) => {
        this.router.navigate(['/transactions']);
        this.dialog.closeAll();
      },
        (erro: any) => {}
        );
    }
  }

  addNewAddressGroup(criptoTransactions?: CriptoTransactions[]) {
    this.criptoTransactions = this.loginForm.get('criptoTransactions') as FormArray;
    this.criptoTransactions.push(this.createItem());
    if (criptoTransactions) {
      this.criptoTransactions.removeAt( criptoTransactions?.length - 1);
    }
  }

  deleteAddressGroup(index: number) {
    const add = this.loginForm.get('criptoTransactions') as FormArray;
    add.removeAt(index);
  }

  getControls() {
    return (this.loginForm.get('criptoTransactions') as FormArray).controls;
  }

  createItem(): FormGroup {
    return this.fb.group({
      data: new FormControl('', [Validators.required]),
      valorCorrente: new FormControl('', [Validators.required]),
    });
  }

  get employees(): FormArray {
    return this.loginForm.get('criptoTransactions') as FormArray;
 }
}
