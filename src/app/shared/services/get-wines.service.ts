import { Injectable } from '@angular/core';
import { wines } from '../../data/wines';

@Injectable({
  providedIn: 'root'
})
export class GetWinesService {

  constructor() { }

  getPages() {
    return Math.ceil(wines.length / 9)
  }

  getWines(offset: number) {
    const filteredWines = wines.filter(wine => wine.id >= (offset * 9) - 8 && wine.id <= offset * 9)
    return {
      wines: filteredWines,
      length: wines.length,
      pages: Math.ceil(wines.length / 9)
    }
  }

  getAll(){
    return wines
  }
}
