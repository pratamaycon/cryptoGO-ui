import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from './services/usuario.service';
import { CadastroUsuarioComponent } from '../../security/cadastro-usuario/cadastro-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = [];
  usuarios: Usuario[] = [];
  length: number = 0;
  public dataSource!: MatTableDataSource<Usuario>;

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

  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  constructor(private service: UsuarioService, public dialog: MatDialog) {}

  ngOnInit() {
    this.service.listarTodas().subscribe((users: Usuario[]) => {
      this.usuarios = users;
      this.length = users.length;
      this.dataSource = new MatTableDataSource(this.usuarios);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.displayedColumns = [
      ...this.dynamicColumns.map((x) => x.columnDef),
      'actions',
    ];
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  _onEdit(_video: any) {
    this.onEdit.emit(_video);
  }
  _onDelete(_video: any) {
    this.onDelete.emit(_video);
  }

  openDialog() {
    this.dialog.open(CadastroUsuarioComponent, {
      data: {
        showCadastro: true
      }
    });
  }
}
