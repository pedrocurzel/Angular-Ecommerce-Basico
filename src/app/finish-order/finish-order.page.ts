import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonCard, IonButton } from '@ionic/angular/standalone';
import { CartService } from '../services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import CreateOrderDTO from '../models/CreateOrderDTO';
import AuthenticatedDTO from '../models/AuthenticatedDTO';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish-order',
  templateUrl: './finish-order.page.html',
  styleUrls: ['./finish-order.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonCard, IonButton]
})
export class FinishOrderPage implements OnInit {

  cartService = inject(CartService);
  router = inject(Router);

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }


  async finishOrder() {
    try {
      let user = JSON.parse(localStorage.getItem("user")!) as AuthenticatedDTO;
      let createOrderDTO = new CreateOrderDTO(user.id!, this.cartService.selectedAddress.value!.id!, this.cartService.cart.value);
      console.log(JSON.stringify(createOrderDTO));
      
      let res = await firstValueFrom(
        this.http.post(environment.api + `Order/createOrder`, JSON.parse(JSON.stringify(createOrderDTO)), {
          headers: {
            Authorization: `Bearer ${user.token!}`
          }
        })
      );

      this.cartService.emptyAfterOrderFinished();
      this.router.navigateByUrl("home", {replaceUrl: true});
    } catch(error) {
      console.log(error);
      
      alert("error finishing order")
    }
    
  }

}
