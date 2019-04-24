import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  createForm: FormGroup;
  constructor(private productService: ProductService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  addProduct(name, type, price){
    this.productService.addProduct(name, type, price).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

}
