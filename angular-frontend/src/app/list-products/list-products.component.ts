import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from './../product.model';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  products: Product[];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.fetchProduct();
  }

  fetchProduct(){
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
      console.log('Data requested ...');
    });
  }

  editProduct(id) {
    this.router.navigate([`/edit/` + id]);
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.fetchProduct();
    });
  }
}
