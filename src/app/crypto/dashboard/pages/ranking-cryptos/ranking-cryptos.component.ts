import { Component, EventEmitter, OnInit, Output, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../services/dashboard.service';


@Component({
  selector: 'app-ranking-cryptos',
  templateUrl: './ranking-cryptos.component.html',
  styleUrls: ['./ranking-cryptos.component.scss']
})
export class RankingCryptosComponent implements OnInit, AfterViewInit {

  @Output() emitter = new EventEmitter();
  @Output() emitterSelected = new EventEmitter();
  @Output() minMaxPercentual = new EventEmitter();

  firstFormGroup!: FormGroup;

  cryptos: any;
  public  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  maximum!: number;
  minimum!: number;

  displayedColumns: string[] = ['image', 'name', 'symbol', 'current_price', 'total_volume', 'price_change_percentage_24h', 'market_cap'];

  constructor(
    private fb: FormBuilder,
    private service: DashboardService) {}

  ngOnInit() {
    this.firstFormGroup = this.fb.group({
      crypto: new FormControl('', [Validators.required])
    });
    this.refresh();

    this.parseRecomendacao();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.emitter.emit(this.firstFormGroup);
    });
  }

  private refresh() {
    this.service.listarTodas().subscribe((cryptos: any) => {
      this.changePercentage24H(cryptos);
      this.cryptos = cryptos;
      this.dataSource = new MatTableDataSource(this.cryptos);
    });
  }

  parseRecomendacao() {
    const resultString = localStorage.getItem('price_change_percentage_24h_array_values')?.replace(/[\[\]]/g, '').split(',')
    const resFloat = resultString?.map(v => parseFloat(v));

    this.maximum = this.getMaxOfArray(resFloat);
    this.minimum = this.getMinOfArray(resFloat);

    if (this.maximum && this.minimum) {
      const object = {
        min: this.minimum,
        max: this.maximum
      }
      this.minMaxPercentual.emit(object)
    }
  }

  onChange(event: MatSelectChange) {
    this.emitterSelected.emit(event.value);
  }

  changePercentage24H(cryptos: any) {
    let array: number[] = [];
    cryptos.forEach((res: any) => {
      array.push(
        Number(res.price_change_percentage_24h.toPrecision(2)))
    });
    localStorage.setItem("price_change_percentage_24h_array_values",
      JSON.stringify(array))
  }

  getMaxOfArray(numArray: any) {
    return Math.max.apply(null, numArray);
  }

  getMinOfArray(numArray: any) {
    return Math.min.apply(null, numArray);
  }
}
