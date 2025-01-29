import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import AddressDTO from 'src/app/models/AddressDTO';
import ProductDTO from 'src/app/models/ProductDTO';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<ProductDTO[]>([]);

  selectedAddress = new BehaviorSubject<AddressDTO | null>(null);

  constructor() { }

  getCartProducts() {
    return this.cart.asObservable();
  }

  addItem(prod: ProductDTO) {
    let prods = this.cart.getValue();
    if (prods.findIndex(x => x.id == prod.id) == -1) {
      prods.push(prod);
      this.cart.next(prods);
    } 
  }

  changeItemQuantity(prod: ProductDTO, operation: "add" | "decrease") {
    let products = this.cart.value;
    let index = products.findIndex(x => x.id == prod.id);

    if (products[index].quantity! == 1 && operation == "decrease") {
      this.removeProduct(prod);
      return;
    }
    operation == "add" ? products[index].quantity!++ : products[index].quantity!--;
  }


  removeProduct(prod: ProductDTO) {
    this.cart.next(this.cart.value.filter(x => x.id != prod.id));
  }

  totalValue() {
    return this.cart.value.reduce((acumulator, currentValue) => {
      return acumulator += currentValue.quantity! * Number.parseInt(currentValue.price!)
    }, 0)
  }

  selectAddress(address: AddressDTO) {
    this.selectedAddress.next(address);
  }


  emptyAfterOrderFinished() {
    this.cart.next([]);
    this.selectedAddress.next(null);
  }
}
