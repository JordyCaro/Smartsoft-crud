import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loader: boolean = false;

  // FormGroup
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Envío del formulario
  submit() {
    this.loader = true;
    const { email, password } = this.loginForm.value;
    this.loginService.login(email, password).subscribe(
      (success: boolean) => {
        this.loader = false;
        if (success) {
          // this.router.navigateByUrl('/home');
          this.router.navigateByUrl('/csv-upload');
          console.log('Autenticado');
        } else {
          console.error('Credenciales inválidas');
        }
      },
      (error) => {
        console.error('Error en el servicio de login', error);
        this.loader = false;
      }
    );
  }

}
