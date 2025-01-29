import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import AuthenticatedDTO, { LoginDTO } from 'src/app/models/AuthenticatedDTO';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) { }

  async login(loginDTO: LoginDTO) {
    return await firstValueFrom(this.http.post(environment.api + "Authentication/login", loginDTO));
  }

  async validateLogin() {
    let user: string | null | AuthenticatedDTO = localStorage.getItem("user");
    if (user == null) return false;
    user = JSON.parse(user) as AuthenticatedDTO;
    return await firstValueFrom(this.http.get(environment.api + "Authentication/validateToken", {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }))
    .then(res => {
      console.log(res);
      
      return true;
    })
    .catch(err => {
      console.warn(err);
      
      return false;
    })
  }
}
