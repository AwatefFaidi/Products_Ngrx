import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewProductComponent } from './components/products/new-product/new-product.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = 
 [
  {
    path:"products", component:ProductsComponent
  },
  {
    path:"newProduct",component:NewProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
