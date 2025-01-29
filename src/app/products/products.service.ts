import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ProductDTO from '../models/ProductDTO';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import AuthenticatedDTO from '../models/AuthenticatedDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  async getProducts(): Promise<ProductDTO[]> {
    let user: string | null | AuthenticatedDTO = localStorage.getItem("user");
    if (user == null) return [];
    user = JSON.parse(user) as AuthenticatedDTO;

    return await firstValueFrom(
      this.http.get(environment.api + "Product/listProducts/0", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
    ) as ProductDTO[];
  }
}
