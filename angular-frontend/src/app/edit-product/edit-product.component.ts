import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Product } from './../product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id: String;
  product: any = {};
  updateForm: FormGroup;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { 
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.productService.getProductById(this.id).subscribe(res => {
        this.product = res;
        this.updateForm.get('name').setValue(this.product.name);
        this.updateForm.get('type').setValue(this.product.type);
        this.updateForm.get('price').setValue(this.product.price);
      });
    });
  }

  createForm(){
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  updateProduct(name, type, price){
    this.productService.updateProduct(this.id, name, type, price).subscribe(() => {
      console.log('Product is updated...');
    });
  }


}
