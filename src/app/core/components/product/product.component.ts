import { Component, EventEmitter, Input, Output } from '@angular/core';
import { wines } from '../../../data/wines';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
  ],
  templateUrl: './product.component.html',
  styleUrls: [
    './product.large.component.css',
    './product.medium.component.css',
    './product.short.component.css'
  ]
})
export class ProductComponent {
  @Input()
  price: number = 0;
  @Input()
  name: string = ""
  @Input()
  discount: number = 0
  @Input()
  id: number = 0
  @Input()
  photo: string = ""
  @Input()
  slug: string = ""


  @Input()
  amount!: number;

  @Output()
  changeCartAmount = new EventEmitter<any>()

  constructor(
    private readonly navigator: Router
  ){}

  async addInCart(productId: number) {
    const product = await wines.find((wine: any) => wine.id == productId)
    const cartItems: any = localStorage.getItem("cart")

    if (cartItems) {
      const productsInCart = JSON.parse(cartItems)
      const itemInCard = this.productIsAlreadyInCart(product, productsInCart)

      if (itemInCard) {
        this.incrementItemInCart(itemInCard, productsInCart)
      } else {
        localStorage.setItem('cart', JSON.stringify([{
          ...product,
          amount: 1
        }, ...productsInCart]))
        this.changeCartAmountEvent(this.getCartItemsLength())
      }

    } else {
      this.createCartItem(product)
    }
  }

  createCartItem(product: any) {
    localStorage.setItem('cart', JSON.stringify([{
      ...product,
      amount: 1
    }]))
    this.changeCartAmountEvent(1)
  }

  incrementItemInCart(product: any, productsInCart: any) {
    const updatedProductsInCart = []
    for (const productInCart of productsInCart) {
      let amount = productInCart.amount
      if (productInCart.id == product.id) {
        amount += 1
      }
      updatedProductsInCart.push({
        ...productInCart,
        amount
      })
    }
    localStorage.setItem("cart", JSON.stringify(updatedProductsInCart))
    this.changeCartAmountEvent(this.getCartItemsLength())
  }

  changeCartAmountEvent(amount: number) {
    this.amount = amount
    this.changeCartAmount.emit(this.amount)
  }

  productIsAlreadyInCart(product: any, cartItems: any) {
    return cartItems?.find((item: any) => product.id == item.id)
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

  redirect(){
    this.navigator.navigate(
      [`/product/${this.slug}`],
    );
  }
}
