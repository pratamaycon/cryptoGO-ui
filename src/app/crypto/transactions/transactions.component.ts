import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CryptoTipos } from './../../models/cryptoTipos';
import { CryptoService } from './services/crypto.service';
import { CadastroTransactionsComponent } from './cadastro-transactions/cadastro-transactions.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  displayedColumns: string[] = [];
  cryptos: CryptoTipos[] = [];
  dataSource: MatTableDataSource<CryptoTipos> = new MatTableDataSource<CryptoTipos>();

  public length = 0;
  public pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];

  edit = false;

  public page: any;

  /** Dynamically generated columns */
  dynamicColumns = [
    {
      columnDef: 'codigo',
      header: 'Código',
      cell: (row: { codigo: number }) => row.codigo,
    },
    {
      columnDef: 'nome',
      header: 'Nome',
      cell: (row: { nome: string }) => row.nome,
    },
    {
      columnDef: 'dataCadastro',
      header: 'Data Cadastro',
      cell: (row: { dataCadastro: string }) => row.dataCadastro,
    },
      {
      columnDef: 'valorCorrente',
      header: 'Valor Corrente',
      cell: (row: { criptoTransactions: Array<any> }) => {
        return row.criptoTransactions.map(res => ` R$ ${res.valorCorrente}`).join('\n  ')
      },
    },
      {
      columnDef: 'data',
      header: 'Data Transação',
      cell: (row: { criptoTransactions: Array<any> }) => {
        return row.criptoTransactions.map(res => res.data).join('\n  ')
      },
    }
  ];


  constructor(
    private service: CryptoService,
    public dialog: MatDialog,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.page = {
        page: 0,
        size: 5
    }
  }

  ngOnInit() {
    this.edit = false;
    this.refresh(this.page);
    this.displayedColumns = [
      ...this.dynamicColumns.map((x) => x.columnDef),
      'actions',
    ];
    this.changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private refresh(page?: any) {
    this.service.listarPaginadas(page).subscribe(crypto => {
      this.cryptos = crypto.content;

      this.length = crypto.totalElements;

      this.dataSource = new MatTableDataSource(this.cryptos);
    })
  }

  _onEdit(cryptos: CryptoTipos) {
    this.edit = true;
    this.service.signOut(cryptos);
    this.openDialog();
  }

  _onDelete(codigo: number) {
    this.service.excluir(codigo).subscribe(_ => {
      this.refresh(this.page)
    })
  }

  pageChangeEvent(page: PageEvent) {
    this.page.page = page.pageIndex;
    this.page.size = page.pageSize;
    this.refresh(this.page)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CadastroTransactionsComponent, {
      width: '448px',
      minHeight: 'auto',
      maxHeight: '690px',
      data: {
        edicao: this.edit,
      }
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.refresh();
      this.router.navigate(['/transactions']);
    });
  }
}
