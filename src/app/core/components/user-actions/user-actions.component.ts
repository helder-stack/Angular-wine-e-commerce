import { NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-actions',
  standalone: true,
  imports: [NgStyle, NgIf],
  templateUrl: './user-actions.component.html',
  styleUrls: [
    './user-actions.large.component.css',
    './user-actions.medium.component.css',
    './user-actions.short.component.css'
  ]
})
export class UserActionsComponent implements OnInit {
  items: any;
  showItemsAmount: boolean = false

  @Input()
  itemsAmount: number = 0;

  constructor(
    private readonly router: Router
  ){}

  ngOnInit(): void {
    const cart: any = localStorage.getItem('cart')
    this.items = JSON.parse(cart)
    this.itemsAmount = this.getCartItemsLength()
    if (this.itemsAmount >= 1) {
      this.showItemsAmount = true
    }
  }

  redirect(route: string){
    this.router.navigateByUrl(route)
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
