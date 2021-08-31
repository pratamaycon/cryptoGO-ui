import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
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
        }
      );
  }
}
