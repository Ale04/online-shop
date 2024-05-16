import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SwalMessages } from '../../../commons/_dto/swal-messages';

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categories: Category[] = [];

  categoryToUpdate: number = 0;

  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    acronym: ["", [Validators.required]]
  });

  submitted = false;

  swal: SwalMessages = new SwalMessages();

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  disableCategory(id: number) {

    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la desactivación de la categoria',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {
      
      if (result.isConfirmed) {

        this.categoryService.disableCategory(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getCategories();
          },

          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  enableCategory(id: number) {
    
    this.swal.confirmMessage.fire({
      title: 'Favor de confirmar la activación de la categoria',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar',
    }).then((result: any) => {

      if (result.isConfirmed) {

        this.categoryService.enableCategory(id).subscribe({
          next: (v) => {
            this.swal.successMessage(v.body!.message); // show message
            this.getCategories();
          },
          error: (e) => {
            console.error(e);
            this.swal.errorMessage(e.error!.message); // show message
          }
        });
      }
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({

      next: (v) => {
        this.categories = v.body!
      },
      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message);
      }
    });
  }

  showModalForm() {
    $("#modalForm").modal("show");
    this.submitted = false;
    this.form.reset();
    this.categoryToUpdate = 0;
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  updateCategory(category: Category) {
    this.categoryToUpdate = category.category_id;

    this.form.reset();
    this.form.controls['category'].setValue(category.category);
    this.form.controls['acronym'].setValue(category.acronym);

    this.submitted = false;
    $("#modalForm").modal("show")
  }

  onSummit() {

    this.submitted = true;

    if (this.form.invalid) return;
    this.submitted = false;

    if (this.categoryToUpdate == 0)
      this.onSubmitCreate();
    else
      this.onSubmitUpdate();
  }



  onSubmitCreate() {

    this.categoryService.createCategory(this.form.value).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message);
        this.getCategories();
        this.hideModalForm();

      },

      error: (e) => {
        this.swal.errorMessage(e.error!.message);
      }
    });

  }

  onSubmitUpdate() {
    this.categoryService.updateCategory(this.form.value, this.categoryToUpdate).subscribe({
      next: (v) => {
        this.swal.successMessage(v.body!.message);
        this.getCategories();
        this.hideModalForm();
        this.categoryToUpdate = 0;
      },

      error: (e) => {
        console.error(e);
        this.swal.errorMessage(e.error!.message);
      }
    })

  }

}
