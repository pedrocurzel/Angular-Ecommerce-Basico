import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonLabel, IonItem, IonIcon, IonMenu, IonButtons, IonMenuButton, IonButton, IonMenuToggle} from '@ionic/angular/standalone';
import { cart, checkmark } from 'ionicons/icons';
import { ProductsService } from '../products/products.service';
import ProductDTO from '../models/ProductDTO';
import { CartService } from '../services/cart/cart.service';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonLabel, IonMenu, IonIcon, IonMenuToggle, IonButton],
})
export class HomePage implements OnInit {

  productsService = inject(ProductsService);
  cartService = inject(CartService);
  router = inject(Router);

  constructor() {
    addIcons({
      cart,
      checkmark
    })
  }

  products: ProductDTO[] = [];

  async ngOnInit() {
   this.products = await  this.productsService.getProducts();
  }

  openDrawer() {

  }

  addProduct(prod: ProductDTO) {
    this.cartService.addItem(prod);
  }

  getTotalProductValue(prod: ProductDTO) {
    return (prod.quantity! * Number.parseInt(prod.price!)).toString();
  }

  selectAddress() {
    if (this.cartService.totalValue() > 0) {
      this.router.navigateByUrl("select-address")
      return;
    }
  }

}

