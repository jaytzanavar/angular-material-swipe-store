import { Cart } from './../models/cart.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>({ items: [] })
  constructor(private _snackbar: MatSnackBar) { }

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemsInCart = items.find((_item) => _item.id === item.id)
    if (itemsInCart) { itemsInCart.quantity += 1 }
    else { items.push(item) }

    this.cart.next({ items })
    this._snackbar.open('1 item added to cart.', 'Ok', { duration: 3000 })
  }

  removeItem(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;
    let filteredItems = this.cart.value.items.map(_item => {
      if (_item.id === item.id) {
        _item.quantity--;
      }
      if (_item.quantity === 0) {
        itemForRemoval = _item
      }
      return _item
    })

    if (itemForRemoval)
      filteredItems = this.removeFromCart(itemForRemoval, false)

    this.cart.next({ items: filteredItems })
    this._snackbar.open('Item quantity reduced from cart.', 'Ok', { duration: 3000 })

  }

  removeFromCart(el: CartItem, update = true) {
    const items = [...this.cart.value.items];
    const updateItems = items.filter(it => it.id !== el.id);
    if (update) {
      this.cart.next({ items: updateItems })
      this._snackbar.open('Item removed from cart.', 'Ok', { duration: 3000 })
    }
    return updateItems

  }

  clearCart(): void {
    this.cart.next({ items: [] })
    this._snackbar.open('You cleared your cart.', 'Ok', { duration: 3000 })
  }
}
