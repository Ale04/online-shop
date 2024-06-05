import { Component } from '@angular/core';
import { DtoCartDetails } from '../../_dto/dto-cart-details';
import { Item } from '../../_model/item';
import { Cart } from '../../_model/cart';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { ProductService } from '../../../product/_service/product.service';
import { ProductImageService } from '../../../product/_service/product-image.service';
import { CartService } from '../../_service/cart.service';
import { InvoiceService } from '../../_service/invoice.service';
import { Product } from '../../../product/_model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cart: Cart = new Cart();
  item: Item = new Item();
  
  products: DtoCartDetails[] = [];
  productImages: { [key: number]: string } = {};

  swal: SwalMessages = new SwalMessages();
  
  constructor(
    private productService: ProductService,
    private productImageService: ProductImageService,
    private cartService: CartService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit() {
    this.getCart();
  }
  
  getCart() {

    this.cartService.getCart().subscribe({
      next: (v) => {
        this.products = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message);
      }
    });
  }

  removeFromCart(id: number) {

    this.cartService.removeFromCart(id).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message);
        this.getCart();
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message);
      }
    });
  }

  cleanCart() {

    this.cartService.clearCart().subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message);
      }
    });
  }
}
