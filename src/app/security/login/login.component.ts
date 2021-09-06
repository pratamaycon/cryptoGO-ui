import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastyService: ToastyService,
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  autenticar(): void {
    this.authService
      .autenticacao(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .subscribe(
        (_) => {
          this.router.navigate(['/dashboard']);
        },
        (erro: any) => {
          console.log(erro);
          this.toastyService.error({
            title: 'Usuário não autenticado',
            timeout: 5000,
            msg: erro,
            showClose: true,
          });
        }
      );
  }
}
