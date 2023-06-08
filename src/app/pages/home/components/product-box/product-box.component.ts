import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styles: [
  ]
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;

  @Output() updateCart = new EventEmitter();
  @Input() product: Product | undefined;
  //   = {
  //   image: 'https://via.placeholder.com/150',
  //   title: 'snickers',
  //   price: 150,
  //   description: "this is a prod desc",
  //   category: 'shoes',
  //   id: 1,

  // }

  addToCart(): void {
    this.updateCart.emit(this.product)
  }

}
