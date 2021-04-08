import {Product} from '../model/product.model';
import {ProductsActions, ProductsActionsTypes} from './products.actions';
import {Action} from '@ngrx/store';

export enum ProductsStateEnum{
  LOADING="Loading",
  LOADED="Loaded",
  ERROR="Error",
  INITIAL="Initial",
  NEW="NEW",
  EDIT="EDIT"
}
export interface ProductsState{
    products:Product[],
    errorMessage:string,
    dataState:ProductsStateEnum
}

const initState:ProductsState={
  products:[],
  errorMessage:"",
  dataState:ProductsStateEnum.INITIAL
}

export function productsReducer(state=initState, action:Action):ProductsState {
  switch (action.type) {
    case ProductsActionsTypes.GET_ALL_PRODUCTS:
      return {...state, dataState:ProductsStateEnum.LOADING }
    case ProductsActionsTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {...state, dataState:ProductsStateEnum.LOADED, products:(<ProductsActions>action).payload}
    case ProductsActionsTypes.GET_ALL_PRODUCTS_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload}
    /* Get Selected Products*/
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS:
      return {...state, dataState:ProductsStateEnum.LOADING }
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_SUCCESS:
      return {...state, dataState:ProductsStateEnum.LOADED, products:(<ProductsActions>action).payload}
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload}
    
    /* Search Products*/
    case ProductsActionsTypes.SEARCH_PRODUCTS:
      return {...state, dataState:ProductsStateEnum.LOADING}
    case ProductsActionsTypes.SEARCH_PRODUCTS_SUCCESS:
      return {...state, dataState:ProductsStateEnum.LOADED, products:(<ProductsActions>action).payload}
    case ProductsActionsTypes.SEARCH_PRODUCTS_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload}

      /* Select Product*/
    case ProductsActionsTypes.SELECT_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING}
    case ProductsActionsTypes.SELECT_PRODUCT_SUCCESS:
      // copy state in listproduct( state not allowed to change) 
      let product: Product=(<ProductsActions>action).payload;
      let listproduct=[...state.products];
      let data:Product[]=listproduct.map(p=>p.id==product.id?product:p);
      return {...state, dataState:ProductsStateEnum.LOADED, products:data}
    case ProductsActionsTypes.SELECT_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload}

       /* Delete Product*/
    case ProductsActionsTypes.DELETE_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING}
    case ProductsActionsTypes.DELETE_PRODUCT_SUCCESS:
      // copy state in listproduct( state not allowed to change) 
      let p: Product=(<ProductsActions>action).payload;
      let index=state.products.indexOf(p);
      let productslist=[...state.products];
      productslist.splice(index,1);
      return {...state, dataState:ProductsStateEnum.LOADED, products:productslist}
    case ProductsActionsTypes.DELETE_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload}
      /* New Product*/
    case ProductsActionsTypes.NEW_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING}
    case ProductsActionsTypes.NEW_PRODUCT_SUCCESS:
      return {...state, dataState:ProductsStateEnum.NEW}
    case ProductsActionsTypes.NEW_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload}
      /* Save Product*/
    case ProductsActionsTypes.SAVE_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING}
    case ProductsActionsTypes.SAVE_PRODUCT_SUCCESS:
      //add new product to list
      let prods=[...state.products];
      prods.push((<ProductsActions>action).payload);
      return {...state, dataState:ProductsStateEnum.LOADED,products:prods}
    case ProductsActionsTypes.SAVE_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload}
    default : return {...state}
  }
}