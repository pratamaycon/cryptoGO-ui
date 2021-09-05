import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-ranking-cryptos',
  templateUrl: './ranking-cryptos.component.html',
  styleUrls: ['./ranking-cryptos.component.scss']
})
export class RankingCryptosComponent implements OnInit {

  cryptos: any;
  public  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  displayedColumns: string[] = ['image', 'name', 'symbol', 'current_price', 'total_volume', 'price_change_percentage_24h', 'market_cap'];

  constructor(
    private service: DashboardService) {}

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    this.service.listarTodas().subscribe((cryptos: any) => {
      console.log(cryptos);
      this.cryptos = cryptos;
      this.dataSource = new MatTableDataSource(this.cryptos);
    });
  }
}
