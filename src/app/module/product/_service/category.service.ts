import { Injectable } from '@angular/core';
import { Category } from '../_model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getCategories() {

    let categories: Category[] = [];

    categories.push(new Category(1, "Fantasía", "F", 1));
    categories.push(new Category(2, "Terror", "T", 0));
    categories.push(new Category(3, "Romance", "R", 1));

    return categories;
  }
}
