import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../_service/product.service';
import { ProductImageService } from '../../_service/product-image.service';
import { Product } from '../../_model/product';
import { DtoProductList } from '../../_dto/dto-product-list';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { ProductImage } from '../../_model/product-image';
import { CategoryService } from '../../_service/category.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.css'
})
export class ProductCategoryComponent {

  product: Product = new Product();
  products: DtoProductList[] = [];

  productImages: { [key: number]: string } = {};
  
  id: number = 0;
  category: string = "";

  swal: SwalMessages = new SwalMessages();

  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
    // private router: Router
  ) { }

  ngOnInit() {

    this.id = +this.route.snapshot.paramMap.get('category_id')!;

    if (this.id) {
      this.getProductsByCategory();
      this.getCategory();
    } else {
      this.swal.errorMessage("Categoria_id invalido");
    }
  }

  getProductsByCategory() {

    this.productService.getProductsByCategory(this.id).subscribe({
      next: (v) => {
        this.products = v.body!;
        this.getProductImages();
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message);
      }
    });
  }

  getCategory() {

    this.categoryService.getCategory(this.id).subscribe({
      next: (v) => {
        this.category = v.body?.category!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message);
      }
    });
  }

  getProductImages() {
    this.products.forEach(product => {
      
      this.productImageService.getProductImages(product.product_id).subscribe({
        next: (v) => {

          let images = v.body!;

          if (images.length > 0) {
            this.productImages[product.product_id] = images[0].image;
          }
        },
        error: (e) => {
          console.log(e);
          this.swal.errorMessage(e.error!.message);
        }
      });
    });
  }

  getProductImage(id: number): string {
    return this.productImages[id] || 'assets/images/sakura.png';
  }

}
