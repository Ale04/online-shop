import { Component } from '@angular/core';
import { CategoryService } from '../../../product/_service/category.service';
import { AuthenticationService } from '../../../authentication/_service/authentication.service';
import { SwalMessages } from '../../../commons/_dto/swal-messages';
import { Category } from '../../../product/_model/category';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  categories: Category[] = [];

  loggedIn = false;
  isAdmin = false;

  swal: SwalMessages = new SwalMessages();

  constructor(
    private categoryService: CategoryService,
    private servicioAutenticacion: AuthenticationService
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

    this.getCategories();
  }


  getCategories() {
    this.categoryService.getActiveCategories().subscribe({
      next: (v) => {
        this.categories = v.body!;
      },
      error: (e) => {
        console.log(e);
        this.swal.errorMessage(e.error!.message);
      }
    });
  }

  logout() {
    this.servicioAutenticacion.logOut();
    this.loggedIn = false;
    window.location.reload();
  }

  showLoginModal() {
    $("#loginModal").modal("show");
  }

  showRegisterModal() {
    $("#registerModal").modal("show");
  }


}
