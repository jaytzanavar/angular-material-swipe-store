import { Component, Input } from '@angular/core';
import { Cart } from '../models/cart.model';
import { UtilitiesService } from '../services/getTotalService';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  constructor(public utilitiesService: UtilitiesService, private cartService: CartService) { }
  private _cart: Cart = { items: [] }
  itemsQuantity = 0;

  @Input() get cart(): Cart {
    return this._cart
  }

  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((acc, curr) => acc + curr, 0)
  }

  public trackingFunction(index: any, item: any) {
    if (!item) return null;
    return item.id;
  }

  clearCart() {
    this.cartService.clearCart()
  }

  // public 
}
