import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import AddressDTO from 'src/app/models/AddressDTO';
import AuthenticatedDTO from 'src/app/models/AuthenticatedDTO';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }


  async getUserAddresses(): Promise<AddressDTO[]> {
    let user = JSON.parse(localStorage.getItem("user")!) as AuthenticatedDTO;

    return await firstValueFrom(
      this.http.get<AddressDTO[]>(environment.api + `Address/GetAllUserAddresses/${user.id!}`, {
        headers: {
          Authorization: `Bearer ${user.token!}`
        }
      })
    )
  }
}
