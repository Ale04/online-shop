import { Component } from '@angular/core';
import { CategoryService } from '../../_service/category.service';
import { Category } from '../../_model/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  categories: Category[] = [];

  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    acronym: ["", [Validators.required]]
  });

  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categories = this.getCategories();
  }

  getCategories() {
    return this.categoryService.getCategories();
  }

  showModalForm() {
    $("#modalForm").modal("show");
    this.submitted = false;
    this.form.reset();
  }

  hideModalForm() {
    $("#modalForm").modal("hide");
  }

  onSummit() {

    this.submitted = true;

    if (this.form.invalid) { return; }

    let id = this.categories.length + 1;

    let category = new Category(id, this.form.controls["category"].value!, this.form.controls["acronym"].value!, 0);
    this.categories.push(category);

    this.hideModalForm();

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      toast: true,
      text: 'La categoría ha sido registrada',
      background: '#E8F8F8',
      showConfirmButton: false,
      timer: 2000
    });

  }
}
