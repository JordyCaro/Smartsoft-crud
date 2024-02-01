import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loader: boolean = false;

  // FormGroup para gestionar el formulario (inicializado directamente)
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    // private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Función para manejar el envío del formulario
  submit() {
    console.log('Submit button clicked');
    this.router.navigateByUrl('/home');
    // this.loader = true;
    // setTimeout(() => {
    //   this.loader = false;
    //   this.router.navigateByUrl('/home');
    // }, 2000);
  }
}
