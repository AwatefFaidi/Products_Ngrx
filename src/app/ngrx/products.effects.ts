import {Injectable} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {Action} from '@ngrx/store';
import {
  DeleteProductActionError,
  DeleteProductActionSuccess,
  EditProductActionError,
  EditProductActionSuccess,
  GetAllProductsActionError,
  GetAllProductsActionSuccess, GetSelectedProductsActionError,
  GetSelectedProductsActionSuccess,
  NewProductActionError,
  NewProductActionSuccess,
  ProductsActions,
  ProductsActionsTypes,
  SaveProductActionError,
  SaveProductActionSuccess,
  SearchProductsActionError,
  SearchProductsActionSuccess,
  SelectProductActionError,
  SelectProductActionSuccess,
  UpdateProductActionError,
  UpdateProductActionSuccess
} from './products.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';

@Injectable()
export class ProductsEffects {
  constructor(private productService:ProductService, private effectActions:Actions) {
  }

  getAllProductsEffect:Observable<Action>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_ALL_PRODUCTS),
      mergeMap((action)=>{
            return this.productService.getProducts()
              .pipe(
                map((products)=> new GetAllProductsActionSuccess(products)),
                catchError((err)=>of(new GetAllProductsActionError(err.message)))
              )
      })
    )
  );

  /* Get Selected Products*/
  getSelectedProductsEffect:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_SELECTED_PRODUCTS),
      mergeMap((action:ProductsActions)=>{
        return this.productService.getSelectedProducts()
          .pipe(
            map((products)=> new GetSelectedProductsActionSuccess(products)),
            catchError((err)=>of(new GetSelectedProductsActionError(err.message)))
          )
      })
    )
  );

   /* Search Products*/
   SearchProductsEffect:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.SEARCH_PRODUCTS),
      mergeMap((action:ProductsActions)=>{
        return this.productService.searchProducts(action.payload)
          .pipe(
            map((products)=> new SearchProductsActionSuccess(products)),
            catchError((err)=>of(new SearchProductsActionError(err.message)))
          )
      })
    )
  );

  /* Select Product*/
  SelectProductEffect:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.SELECT_PRODUCT),
      mergeMap((action:ProductsActions)=>{
        return this.productService.setSelected(action.payload)
          .pipe(
            map((product)=> new SelectProductActionSuccess(product)),
            catchError((err)=>of(new SelectProductActionError(err.message)))
          )
      })
    )
  );

   /* Delete Product*/
   DeleteProductEffect:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.DELETE_PRODUCT),
      mergeMap((action:ProductsActions)=>{
        return this.productService.delete(action.payload.id)
          .pipe(
            map(()=> new DeleteProductActionSuccess(action.payload)),
            catchError((err)=>of(new DeleteProductActionError(err.message)))
          )
      })
    )
  );

  /* New Product*/
 NewProductEffect:Observable<ProductsActions>=createEffect(
    ()=>this.effectActions.pipe(
      ofType(ProductsActionsTypes.NEW_PRODUCT),
      map((action:ProductsActions)=>
      {
        // pas besoin de service puisque on ne recupere pas donnees
        return new NewProductActionSuccess({});
      })
    )
  );

  /* Save Product*/
 SaveProductEffect:Observable<ProductsActions>=createEffect(
  ()=>this.effectActions.pipe(
    ofType(ProductsActionsTypes.SAVE_PRODUCT),
    mergeMap((action:ProductsActions)=>{
      return this.productService.save(action.payload)
        .pipe(
          map((product)=> new SaveProductActionSuccess(product)),
          catchError((err)=>of(new SaveProductActionError(err.message)))
        )
    })
  )
);

/* Edit Product*/
EditProductEffect:Observable<ProductsActions>=createEffect(
  ()=>this.effectActions.pipe(
    ofType(ProductsActionsTypes.EDIT_PRODUCT),
    mergeMap((action:ProductsActions)=>{
      return this.productService.getProductById(action.payload)
        .pipe(
          map((product)=> new EditProductActionSuccess(product)),
          catchError((err)=>of(new EditProductActionError(err.message)))
        )
    })
  )
);



/* Update Product*/
UpdateProductEffect:Observable<ProductsActions>=createEffect(
  ()=>this.effectActions.pipe(
    ofType(ProductsActionsTypes.UPDATE_PRODUCT),
    mergeMap((action:ProductsActions)=>{
      return this.productService.update(action.payload)
        .pipe(
          map((product)=> new UpdateProductActionSuccess(product)),
          catchError((err)=>of(new UpdateProductActionError(err.message)))
        )
    })
  )
);
}