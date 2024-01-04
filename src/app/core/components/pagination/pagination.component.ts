import { Component, OnInit } from '@angular/core';
import { GetWinesService } from '../../../shared/services/get-wines.service';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor, NgStyle, NgClass],
  templateUrl: './pagination.component.html',
  styleUrls: [
    './pagination.large.component.css',
    './pagination.short.component.css'
  ] 
})
export class PaginationComponent implements OnInit {

  constructor(
    private readonly getWinesService: GetWinesService,
    private readonly router: ActivatedRoute,
    private readonly navigator: Router
  ) { }

  pages: number[] = [];
  currentPage: number = 1;

  async ngOnInit() {
    const pages = await this.getWinesService.getPages()
    this.pages = Array(pages)
    this.router.queryParams.subscribe((value: any) => {
      const { page } = value;
      if(!page){
        this.navigator.navigate(
          ['/catalog'],
          {queryParams: {
            page: 1
          }}
        )
      }
      this.currentPage = page;  
    })
  }

  redirect(page: number) {
    if (page <= this.pages.length) {
      this.navigator.navigate(
        ['/catalog'],
        { queryParams: { page } }
      );
    }else if(page >= this.pages.length){
      this.navigator.navigate(
        ['/catalog'],
        { queryParams: { page: this.pages.length } }
      );
    }else if(page <= 1){
      this.navigator.navigate(
        ['/catalog'],
        { queryParams: { page: 1 } }
      );
    }
  }

  showPage(page: number){
    console.log(page < this.pages.length, `page ${page}`)
    return page < this.pages.length
  }

}
