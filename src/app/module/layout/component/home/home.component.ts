import { Component } from '@angular/core';
import { DtoProductList } from '../../../product/_dto/dto-product-list';
import { Product } from '../../../product/_model/product';
import { ProductService } from '../../../product/_service/product.service';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { SwalMessages } from '../../../commons/_dto/swal-messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  product: Product = new Product();
  products: DtoProductList[] = [];

  productImages: { [key: number]: string } = {};
  
  id: number = 0;

  swal: SwalMessages = new SwalMessages();

  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {

    this.productService.getProducts().subscribe({
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

  getProductImages() {

    for (let i = 0; i < Math.min(this.products.length, 3); i++) {
        let product = this.products[i];
      
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
    }
}


  getProductImage(id: number): string {
    return this.productImages[id] || 'assets/images/un-pan.png';
  }

}
