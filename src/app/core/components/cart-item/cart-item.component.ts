import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './cart-item.component.html',
  styleUrls: [
    './cart-item.large.component.css',
    './cart-item.short.component.css'
  ] 
})
export class CartItemComponent {
  @Input()
  product: any;

  @Output()
  changeCartAmount = new EventEmitter<any>()

  addItem() {
    const cart: any = localStorage.getItem('cart')
    let productsInCart = JSON.parse(cart)
    productsInCart = productsInCart.map((item: any) => {
      return {
        ...item,
        amount: item.id == this.product.id ? item.amount + 1 : item.amount
      }
    })
    this.product = {
      ...this.product,
      amount: this.product.amount+1
    }
    localStorage.setItem("cart", JSON.stringify(productsInCart))
    this.changeCartAmountEvent(this.getCartItemsLength())
  }

  removeItem() {
      const cart: any = localStorage.getItem('cart')
      let productsInCart = JSON.parse(cart)
      productsInCart = productsInCart.map((item: any) => {
        const amount = item.amount - 1
        if (amount > 0) {
          return {
            ...item,
            amount: item.id == this.product.id ? amount : item.amount
          }
        }
      }).filter((item: any) => item)
      this.product = {
        ...this.product,
        amount: this.product.amount-1
      }
      localStorage.setItem("cart", JSON.stringify(productsInCart))
      this.changeCartAmountEvent(this.getCartItemsLength())
  }

  changeCartAmountEvent(amount: number){
    this.changeCartAmount.emit(amount)
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
