import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get(this.url + '/products');
  }

  getProductById(id){
    return this.http.get(this.url + '/products' + id);
  }

  addProduct(name, type, price){
    const product = {
      name: name,
      type: type,
      price: price
    };
    return this.http.post(this.url + '/products/add', product);
  }

  updateProduct(id, name, type, price){
    const product = {
      name: name,
      type: type,
      price: price
    };
    return this.http.post(this.url + '/products/update/' + id, product);
  }

  deleteProduct(id){
    return this.http.get(this.url + 'products/delete/' + id);
  }
}
