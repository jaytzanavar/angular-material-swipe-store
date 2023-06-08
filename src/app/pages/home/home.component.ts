import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12'
  productsSubscription: Subscription | undefined;

  constructor(private cartSevice: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts()
  }



  getProducts(): void {
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category).subscribe(_products => {
      this.products = _products
    })
  }

  onColumnsCountChange(columnsNum: number): void {
    this.cols = columnsNum;
  }

  onShowCategory(category: string): void {
    this.category = category;
    this.getProducts()
  }

  onUpdateToCart(product: Product): void {
    this.cartSevice.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      id: product.id,
      quantity: 1
    })

  }

  onItemsCountChange(items: number): void {
    this.count = items.toString();
    this.getProducts()

  }

  onSortChange(sort: string): void {
    this.sort = sort;
    this.getProducts()
  }

  ngOnDestroy(): void {
    if (this.productsSubscription)
      this.productsSubscription.unsubscribe()
  }

}
