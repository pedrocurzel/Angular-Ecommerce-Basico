import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton } from '@ionic/angular/standalone';
import AuthenticatedDTO, { LoginDTO } from '../models/AuthenticatedDTO';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, IonInput, IonButton, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  form = this.formBuilder.group({
    //Name: ["", Validators.required],
    Email: ["pedrocurzel@gmail.com", [Validators.required, Validators.email]],
    Password: ["1234", Validators.required]
  });

  ngOnInit() {
  }

  async login() {
    if (this.form.valid) {
      let loginDTO: LoginDTO = this.form.getRawValue() as LoginDTO;
      try {
        let res = await this.authService.login(loginDTO) as AuthenticatedDTO;
        console.log(res);

        localStorage.setItem("user", JSON.stringify(res));

        this.router.navigateByUrl("/home", {replaceUrl: true});
        return;
      } catch(error) {

        console.warn(error);
      }
    }
  }
}
