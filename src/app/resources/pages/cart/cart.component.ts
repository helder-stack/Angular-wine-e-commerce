import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { NgFor } from '@angular/common';
import { CartItemComponent } from '../../../core/components/cart-item/cart-item.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    HeaderComponent,
    NgFor,
    CartItemComponent
  ],
  templateUrl: './cart.component.html',
  styleUrls: [
    './cart.large.component.css',
    './cart.medium.component.css',
    './cart.short.component.css'
  ]
})
export class CartComponent implements OnInit {

  products: any = [];
  cartAmount: number = 0;

  ngOnInit(): void {
    const products = localStorage.getItem("cart")
    if (products) {
      this.products = JSON.parse(products);
      this.cartAmount = this.getCartItemsLength()
    }
  }

  changeCartAmount(amount: number){
    this.cartAmount = this.getCartItemsLength()
  }

  getCartItemsLength() {
    let amountOfProductsInCart = 0
    const cartItems: any = localStorage.getItem("cart")
    const productsInCart = JSON.parse(cartItems)
    for (const product of productsInCart) {
      amountOfProductsInCart += product.amount
    }
    return amountOfProductsInCart;
  }

}
