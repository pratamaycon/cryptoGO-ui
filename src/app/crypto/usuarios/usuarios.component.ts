import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from './services/usuario.service';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = [];
  usuarios: Usuario[] = [];
  public  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();

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
      columnDef: 'sobrenome',
      header: 'Sobrenome',
      cell: (row: { sobrenome: string }) => row.sobrenome,
    },
    {
      columnDef: 'login',
      header: 'Login',
      cell: (row: { login: string }) => row.login,
    },
    {
      columnDef: 'email',
      header: 'E-mail',
      cell: (row: { email: string }) => row.email,
    },
  ];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private service: UsuarioService,
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
    this.service.listarTodas(page).subscribe((users: any) => {
      this.usuarios = users.content;
      this.length = users.totalElements;
      this.dataSource = new MatTableDataSource(this.usuarios);
    });
  }

  pageChangeEvent(page: PageEvent) {
    this.page.page = page.pageIndex;
    this.page.size = page.pageSize;
    this.refresh(this.page)
  }

  _onEdit(usuario: Usuario) {
    this.edit = !this.edit;
    this.service.signOut(usuario);
    this.openDialog();
  }

  _onDelete(login: string) {
    this.service.excluir(login).subscribe(_ => {
      this.refresh(this.page)
    })
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CadastroUsuarioComponent, {
      data: {
        showCadastro: true,
        edicao: this.edit,
      }
    });

    dialogRef.afterClosed().subscribe(_ => {
      this.refresh();
      this.router.navigate(['/usuarios']);
    });
  }
}
