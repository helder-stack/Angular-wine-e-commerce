import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../../core/components/header/header.component';
import { FeedComponent } from '../../../core/components/feed/feed.component';
import { PaginationComponent } from '../../../core/components/pagination/pagination.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    HeaderComponent,
    FeedComponent,
    PaginationComponent
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { }

  cartAmount: number = 0;

  page = 1

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((value: any) => {
      const page = value.get("page") ?? 1
      this.page = page
    })
  }

  changeCartAmount(amount: number){
    this.cartAmount = amount
  }

}
