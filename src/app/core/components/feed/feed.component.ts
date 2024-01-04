import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { NgFor } from '@angular/common';
import { wines } from '../../../data/wines';
import { GetWinesService } from '../../../shared/services/get-wines.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    ProductComponent,
    NgFor
  ],
  templateUrl: './feed.component.html',
  styleUrls: [
    './feed.large.component.css',
    './feed.medium.component.css',
    './feed.short.component.css'
  ]
})
export class FeedComponent implements OnInit {

  constructor(
    private readonly getWinesService: GetWinesService
  ) { }

  @Input()
  offset: number = 1

  @Output()
  cartChangeAmount = new EventEmitter<any>()

  cartAmount: number = 0

  productsLength: number = 0

  filteredWines: any[] = []

  filter(e: any) {
    const filter = e.target.value
    if (filter == '40') {
      this.filteredWines = wines.filter((wine: any) => wine.price <= 40)
    } else if (filter == "40-60") {
      this.filteredWines = wines.filter((wine: any) => wine.price >= 40 && wine.price <= 60)
    } else if (filter == "100-200") {
      this.filteredWines = wines.filter((wine: any) => wine.price >= 100 && wine.price <= 200)
    } else if (filter == "200-500") {
      this.filteredWines = wines.filter((wine: any) => wine.price >= 200 && wine.price <= 500)
    } else if (filter == ">500") {
      this.filteredWines = wines.filter((wine: any) => wine.price > 500)
    }
  }

  radioHandler(e: any) {
    if (e.target.getAttribute("aria-label") == "checked") {
      e.target.setAttribute("aria-label", "no_checked")
      e.target.checked = false
      this.filteredWines = wines
    } else {
      e.target.setAttribute("aria-label", "checked")
    }
  }

  async ngOnInit() {
    const wines = await this.getWinesService.getWines(this.offset)
    this.filteredWines = wines.wines
    this.productsLength = wines.length
  }

  changeCartAmount(amount: any){
    this.cartChangeAmount.emit(amount)
  }

}
