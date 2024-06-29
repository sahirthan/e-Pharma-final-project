import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css']
})
export class ProductManageComponent {

  addProductForm?: FormGroup<any>;
  selectedProduct?: Product;

  constructor(private productService: ProductService, private fb: FormBuilder) { }

  products: Product[] = [];

  async ngOnInit() {
    await this.loadProducts();

    this.productService.refreshTable.subscribe(refresh => {
      if (refresh) {
        this.loadProducts();
      }
    })

    this.addProductForm = this.fb.group({
      product_id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      benefits: new FormControl('', [Validators.required]),
      image_url: new FormControl('',[Validators.required]),
      price: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
    });
    this.productService.selectedProduct.subscribe(product => {
      this.selectedProduct = product;
      this.addProductForm!.controls['product_id'].setValue(product.product_id);
      this.addProductForm!.controls['name'].setValue(product.name);
      this.addProductForm!.controls['description'].setValue(product.description);
      this.addProductForm!.controls['benefits'].setValue(product.benefits);
      this.addProductForm!.controls['image_url'].setValue(product.image_url);
      this.addProductForm!.controls['price'].setValue(product.price);
      this.addProductForm!.controls['category'].setValue(product.category);
    })
  }

  async loadProducts() {
    this.productService.getProducts().then(products => {
      products.subscribe(products => {
        this.products = products;
      })
    })
  }

  async addProduct() {

    const alertPlaceholder = document.getElementById('alert-placeholder');

    const showAlertWarning = (message: string, type: string) => {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
      alertDiv.role = 'alert';
      alertDiv.innerHTML = `
      <i class="fa-solid fa-triangle-exclamation mx-4"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      `;
      alertPlaceholder?.appendChild(alertDiv);

      setTimeout(() => {
        alertDiv.classList.remove('show');
        alertDiv.classList.add('fade');
        setTimeout(() => alertDiv.remove(), 150);
      }, 3000);
    };

    const showAlertSuccess = (message: string, type: string) => {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
      alertDiv.role = 'alert';
      alertDiv.innerHTML = `
      <i class="fa-solid fa-circle-check"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      `;
      alertPlaceholder?.appendChild(alertDiv);

      setTimeout(() => {
        alertDiv.classList.remove('show');
        alertDiv.classList.add('fade');
        setTimeout(() => alertDiv.remove(), 150);
      }, 3000);
    };

    if (this.addProductForm?.invalid) {
      showAlertWarning("Please Fill All Product Details.", "warning");
    } else {
      if (this.selectedProduct == null || this.selectedProduct == undefined) {
        await this.productService.addProduct(this.addProductForm?.getRawValue()).then(result => {
          this.addProductForm?.reset();
          console.log(this.addProductForm?.getRawValue());
          showAlertSuccess("Product Added successfully", "success");
        });
      } else {
        await this.productService.updateProduct(this.addProductForm!.getRawValue()).then(result => {
          this.addProductForm?.reset();
          showAlertSuccess("Product Update successfully", "success");
        });
      }
    }
  }

  updateProduct(product: Product) {
    this.productService.setSelectedProduct(product);
  }

  async deleteProduct(product: Product) {
    await this.productService.deleteProduct(product.product_id).then(data => {
      this.loadProducts();
    },)
  }


}
