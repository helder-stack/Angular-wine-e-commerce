import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { GetWinesService } from '../../../shared/services/get-wines.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgFor,
    HeaderComponent
  ],
  templateUrl: './product.component.html',
  styleUrls: [
    './product.large.component.css',
    './product.medium.component.css',
    './product.short.component.css'
  ]
})
export class ProductComponent implements OnInit {
  constructor(
    private readonly router: ActivatedRoute,
    private readonly winesService: GetWinesService,
    private readonly navigator: Router
  ) { }


  @Input()
  product: any;

  cartAmount: number = 0;
  amount: number = 1;


  stars: Array<number> = []

  amountIncrement() {
    this.amount++
  }

  amountDecrement() {
    if (this.amount > 1) {
      this.amount--
    }
  }

  addItemInCart() {
    const cart = localStorage.getItem("cart")
    if (!cart) {
      localStorage.setItem("cart", JSON.stringify([]));
      this.addItemInCart()
    } else {
      let cartObject = JSON.parse(cart)
      const itemInCart = cartObject.find((item: any) => item.id == this.product.id)
      if (itemInCart) {
        cartObject = cartObject.map((item: any) => {
          if (item.id == this.product.id) {
            return {
              ...item,
              amount: item.amount + this.amount
            }
          }
          return item
        })
      } else {
        cartObject.push({
          ...this.product,
          amount: this.amount
        })
      }
      localStorage.setItem("cart", JSON.stringify(cartObject))
      this.cartAmount = this.getCartItemsLength()
    }

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

  ngOnInit() {
    this.router.paramMap.subscribe(async value => {
      const slug = value.get("slug");
      const wines = await this.winesService.getAll();
      const wine = wines.find((wine: any)=> wine.slug == slug)
      if(wine){
        this.product = wine
        this.stars = new Array(this.product.stateRate)
      }
    })
  }

  redirect(){
    this.navigator.navigate(
      ["/catalog"],
      {
        queryParams: {
          page: 1
        }
      }
    )
  }
}
