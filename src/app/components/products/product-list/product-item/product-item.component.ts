import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from 'src/app/model/product.model';
import { SelectProductAction } from 'src/app/ngrx/products.actions';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product:Product|null=null;
  constructor(private store:Store<any>) { }

  ngOnInit() {
  }

  onSelect(product:Product)
  {
    this.store.dispatch(new SelectProductAction(product))
  }
}
