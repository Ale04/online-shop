import { Component } from '@angular/core';
import { DtoProductList } from '../../_dto/dto-product-list';
import { Category } from '../../_model/category';
import { FormBuilder, Validators } from '@angular/forms';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { CategoryService } from '../../_service/category.service';
import { ProductService } from '../../_service/product.service';
import { ProductImage } from '../../_model/product-image';
import { ProductImageService } from '../../_service/product-image.service';
import { Product } from '../../_model/product';
import { NgxCroppedEvent, NgxPhotoEditorService } from "ngx-photo-editor";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication/_service/authentication.service';
import { CartService } from '../../../invoice/_service/cart.service';
import { Cart } from '../../../invoice/_model/cart';


declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  cart: Cart = new Cart();

  images: ProductImage[] = [];

  product: Product = new Product();
  gtin: string = "";

  submitted = false;

  loggedIn = false;
  isAdmin = false;

  quantity = 1;

  swal: SwalMessages = new SwalMessages();

  form = this.formBuilder.group({
    product: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: [0, [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: [0, [Validators.required]],
  });

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private productImageService: ProductImageService,
    private formBuilder: FormBuilder,
    private service: NgxPhotoEditorService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    if (localStorage.getItem("token")) {
      this.loggedIn = true;
    }

    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user")!);

      if (user.rol == "ADMIN") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    }

    this.gtin = this.route.snapshot.paramMap.get('gtin')!;

    if (this.gtin) {
      this.getProduct();
    } else {
      this.swal.errorMessage("Gtin invalido");
    }
  }

  getProduct() {

    this.productService.getProduct(this.gtin).subscribe({
      next: (v) => {
        this.product = v.body!;
        this.getProductImages(this.product.product_id);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  updateProduct() {

    this.form.reset();
    this.submitted = false;

    this.form.controls['product'].setValue(this.product.product);
    this.form.controls['gtin'].setValue(this.product.gtin);
    this.form.controls['price'].setValue(this.product.price);
    this.form.controls['stock'].setValue(this.product.stock);
    this.form.controls['category_id'].setValue(this.product.category_id);
    this.form.controls['description'].setValue(this.product.description);

    this.showModalForm();

  }

  getProductImages(id: number) {

    this.productImageService.getProductImages(id).subscribe({
      next: (v) => {
        this.images = v.body!;
        console.log(this.images);
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  deleteProductImage(productImage: ProductImage) {
    this.swal.confirmMessage.fire({

      title: 'Favor de confirmar la eliminación de la imagen',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'

    }).then((result: any) => {

      if (result.isConfirmed) {

        this.productImageService.deleteProductImage(productImage.product_image_id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getProductImages(productImage.product_id); // reload products
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  createProductImage(image: string) {

    let productImage = new ProductImage();

    productImage.image = image;
    productImage.product_id = this.product.product_id;

    this.productImageService.createProductImage(productImage).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message); // show message
        this.getProductImages(this.product.product_id); // reload products
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); // show message
      }
    });
  }

  fileChangeHandler($event: any) {

    this.service.open($event, {
      aspectRatio: 7 / 8,
      autoCropArea: 1,
      resizeToWidth: 315,
      resizeToHeight: 360,
    }).subscribe(data => {
      this.createProductImage(data.base64!);
    });
  }

  redirect(url: string[]) {
    this.router.navigate(url);
  }

  hideModalForm() {
    $("#modalForm").modal("hide")
  }

  showModalForm() {
    $("#modalForm").modal("show")
  }

  increment() {
    if (this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    this.cart.gtin = this.gtin;
    this.cart.quantity = this.quantity;

    this.cartService.addToCart(this.cart).subscribe({
      next: (v) => {
        this.swal.successMessage("El artículo ha sido agregado"); // v.body!.message); 
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message); 
      }
    });
  }

}
