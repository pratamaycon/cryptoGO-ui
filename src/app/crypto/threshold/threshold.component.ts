import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { CryptoThresholds } from '../../models/cryptoThresholds';
import { CadastroThresholdComponent } from './cadastro-threshold/cadastro-threshold.component';
import { CryptoThresholdsService } from './services/cryptos-thresholds.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-threshold',
  templateUrl: './threshold.component.html',
  styleUrls: ['./threshold.component.scss']
})
export class ThresholdComponent implements OnInit {

  displayedColumns: string[] = [];
  cryptoThresholds: CryptoThresholds[] = [];
  public  dataSource: MatTableDataSource<CryptoThresholds> = new MatTableDataSource<CryptoThresholds>();

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
      columnDef: 'threshold_minimo',
      header: 'Threshold Mínimo',
      cell: (row: { threshold_minimo: number }) => row.threshold_minimo,
    },
    {
      columnDef: 'threshold_maximo',
      header: 'Threshold Máximo',
      cell: (row: { threshold_maximo: number }) => row.threshold_maximo,
    },
    {
      columnDef: 'data_atualizacao',
      header: 'Data Atualização',
      cell: (row: { data_atualizacao: Date }) => row.data_atualizacao,
    },
    {
      columnDef: 'usuario',
      header: 'Usuário',
      cell: (row: { usuario: Usuario }) => row.usuario.nome,
    },
    {
      columnDef: 'cryptoTipos',
      header: 'CryptosTipo',
      cell: (row: { criptoTipos: any }) => row.criptoTipos.nome,
    },
  ];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private service: CryptoThresholdsService,
    public dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router) {
      this.page = {
        page: 0,
        size: 5
      }
    }

  ngOnInit() {
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
    this.service.listarTodas(page).subscribe((cryptoThresholdsUrl: any) => {
      this.cryptoThresholds = cryptoThresholdsUrl.content;
      this.length = cryptoThresholdsUrl.totalElements;
      this.dataSource = new MatTableDataSource(this.cryptoThresholds);
    });
  }

  pageChangeEvent(page: PageEvent) {
    this.page.page = page.pageIndex;
    this.page.size = page.pageSize;
    this.refresh(this.page)
  }

  _onEdit(cryptoThresholds: CryptoThresholds) {
    this.edit = !this.edit;
    this.service.signOut(cryptoThresholds);
    this.openDialog();
  }

  _onDelete(codigo: number) {
    this.service.excluir(codigo).subscribe(_ => {
      this.refresh(this.page)
    })
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CadastroThresholdComponent, {
      data: {
        edicao: this.edit
      }
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.refresh();
      this.router.navigate(['/threshold']);
    });
  }

}
