import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

import { CryptoThresholdsService } from './../../../threshold/services/cryptos-thresholds.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-configurar-cryptos',
  templateUrl: './configurar-cryptos.component.html',
  styleUrls: ['./configurar-cryptos.component.scss']
})
export class ConfigurarCryptosComponent implements OnInit, OnChanges {

  @Output() emitter = new EventEmitter();

  @Input() selectedValue: string = '';

  secondFormGroup!: FormGroup;

  @Input() compra: number = 10;
  @Input() venda: number = 10;

  cryptos: any;
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  displayedColumns: string[] = ['codigo', 'threshold_minimo', 'threshold_maximo', 'data_atualizacao', 'criptoTipos'];

  constructor(
    private fb: FormBuilder,
    private service: CryptoThresholdsService
  ) {}

  ngOnChanges() {
    this.refresh(this.selectedValue);
  }

  ngOnInit() {
    this.secondFormGroup = this.fb.group({
      compra: new FormControl('', [Validators.required]),
      venda: new FormControl('', [Validators.required])
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.emitter.emit(this.secondFormGroup);
    });
  }

  private refresh(value?: string) {
    const page = {
      page: 0,
      size: 1000
    }
    this.service.listarTodas(page).subscribe((cryptos: any) => {
      this.cryptos = cryptos.content.filter((res: any) => {
        return res.criptoTipos.nome.includes(this.selectedValue)
      })
      this.dataSource = new MatTableDataSource(this.cryptos);
    });
  }

  cadastrar() {
  }
}
