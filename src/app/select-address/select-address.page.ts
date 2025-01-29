import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonIcon, IonButton, IonRadio, IonRadioGroup, IonCard } from '@ionic/angular/standalone';
import { arrowForward, checkmark } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AddressService } from '../services/address/address.service';
import AddressDTO from '../models/AddressDTO';
import { CartService } from '../services/cart/cart.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.page.html',
  styleUrls: ['./select-address.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonBackButton, IonIcon, IonButton, IonRadio, IonRadioGroup,IonCard]
})
export class SelectAddressPage implements OnInit {

  addressService = inject(AddressService);
  cartService = inject(CartService);
  router = inject(Router);

  addresses: AddressDTO[] = [];
  ready = false;

  //selectedAddress: AddressDTO | null = null;

  constructor() { 
    addIcons({
      arrowForward,
      checkmark
    })
  }

  async ngOnInit() {
    this.ready = false;
    this.addresses = await this.addressService.getUserAddresses();
    this.ready = true;
  }


  selectAddress(address: AddressDTO) {
    this.cartService.selectAddress(address);
  }

  finishOrder() {
    if (this.cartService.selectedAddress.value) {
      this.router.navigateByUrl("finish-order");
      return;
    }
  }

}
