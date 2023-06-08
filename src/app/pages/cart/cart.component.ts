import { Component } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { UtilitiesService } from '../../services/getTotalService';
import { CartService } from 'src/app/services/cart.service';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent {
  stripe: any;

  constructor(
    private http: HttpClient,
    public utilitiesService: UtilitiesService, private cartService: CartService) {
  }

  cart: Cart | undefined;
  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]


  ngOnInit() {
    this.cartService.cart.subscribe(_cart => {
      this.cart = _cart;
      this.dataSource = [..._cart.items]
    })

  }


  ClearAll(): void {
    this.cartService.clearCart();
  }

  clearSelected(element: CartItem): void {
    this.cartService.removeFromCart(element);
  }

  removeProdQuantity(item: CartItem) {
    this.cartService.removeItem(item)
  }
  addProdQuantity(item: CartItem) {
    this.cartService.addToCart(item)
  }

  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart?.items
    }).subscribe(async (res: any) => {
      console.log('res', res);
      let stripe = await loadStripe('pk_test_51NGPLMJlh0ztKacFiR5ZOjfB9XW7wrlpLhwIBihBySosoPnKKFptNZZaxcWKhfZA8iaW2XpC7XICGmP0uCHKIMT2006i432h7j')
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }
}
