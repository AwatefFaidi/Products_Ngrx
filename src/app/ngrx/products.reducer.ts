import {Product} from '../model/product.model';
import {ProductsActions, ProductsActionsTypes} from './products.actions';
import {Action} from '@ngrx/store';

export enum ProductsStateEnum{
  LOADING="Loading",
  LOADED="Loaded",
  ERROR="Error",
  INITIAL="Initial",
  NEW="NEW",
  EDIT="EDIT",
  UPDATED="UPDATED"
}
export interface ProductsState{
    products:Product[],
    errorMessage:string,
    dataState:ProductsStateEnum,
    currentproduct:Product |null,
    currentAction:ProductsActions|null
}

const initState:ProductsState={
  products:[],
  errorMessage:"",
  dataState:ProductsStateEnum.INITIAL,
  currentproduct:null,
  currentAction:null,
}

export function productsReducer(state=initState, action:Action):ProductsState {
  switch (action.type) {
    case ProductsActionsTypes.GET_ALL_PRODUCTS:
      return {...state, dataState:ProductsStateEnum.LOADING, currentAction:<ProductsActions>action }
    case ProductsActionsTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {...state, dataState:ProductsStateEnum.LOADED, products:(<ProductsActions>action).payload,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.GET_ALL_PRODUCTS_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload,currentAction:<ProductsActions>action }
    /* Get Selected Products*/
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS:
      return {...state, dataState:ProductsStateEnum.LOADING,currentAction:<ProductsActions>action  }
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_SUCCESS:
      return {...state, dataState:ProductsStateEnum.LOADED, products:(<ProductsActions>action).payload,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload,currentAction:<ProductsActions>action }
    
    /* Search Products*/
    case ProductsActionsTypes.SEARCH_PRODUCTS:
      return {...state, dataState:ProductsStateEnum.LOADING,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.SEARCH_PRODUCTS_SUCCESS:
      return {...state, dataState:ProductsStateEnum.LOADED, products:(<ProductsActions>action).payload,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.SEARCH_PRODUCTS_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload, currentAction:<ProductsActions>action }

      /* Select Product*/
    case ProductsActionsTypes.SELECT_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.SELECT_PRODUCT_SUCCESS:
      // copy state in listproduct( state not allowed to change) 
      let product: Product=(<ProductsActions>action).payload;
      let listproduct=[...state.products];
      let data:Product[]=listproduct.map(p=>p.id==product.id?product:p);
      return {...state, dataState:ProductsStateEnum.LOADED, products:data,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.SELECT_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload,currentAction:<ProductsActions>action }

       /* Delete Product*/
    case ProductsActionsTypes.DELETE_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.DELETE_PRODUCT_SUCCESS:
      // copy state in listproduct( state not allowed to change) 
      let p: Product=(<ProductsActions>action).payload;
      let index=state.products.indexOf(p);
      let productslist=[...state.products];
      productslist.splice(index,1);
      return {...state, dataState:ProductsStateEnum.LOADED, products:productslist,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.DELETE_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload,currentAction:<ProductsActions>action }
      /* New Product*/
    case ProductsActionsTypes.NEW_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.NEW_PRODUCT_SUCCESS:
      return {...state, dataState:ProductsStateEnum.NEW,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.NEW_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload,currentAction:<ProductsActions>action }
      /* Save Product*/
    case ProductsActionsTypes.SAVE_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.SAVE_PRODUCT_SUCCESS:
      //add new product to list
      let prods=[...state.products];
      prods.push((<ProductsActions>action).payload);
      return {...state, dataState:ProductsStateEnum.LOADED,products:prods,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.SAVE_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload,currentAction:<ProductsActions>action }

       /* EDIT Product*/
    case ProductsActionsTypes.EDIT_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.EDIT_PRODUCT_SUCCESS:
      return {...state, dataState:ProductsStateEnum.LOADED,currentproduct:(<ProductsActions>action).payload,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.EDIT_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload,currentAction:<ProductsActions>action }

      /* UPDATE Product*/
    case ProductsActionsTypes.UPDATE_PRODUCT:
      return {...state, dataState:ProductsStateEnum.LOADING,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.UPDATE_PRODUCT_SUCCESS:
      let updatedProduct:Product=(<ProductsActions>action).payload;
      //with map no need to copy state
      let updatedproductslist:Product[]=state.products.map(p=>(p.id==updatedProduct.id)?updatedProduct:p);
      return {...state, dataState:ProductsStateEnum.UPDATED, products:updatedproductslist,currentAction:<ProductsActions>action }
    case ProductsActionsTypes.UPDATE_PRODUCT_ERROR:
      return {...state, dataState:ProductsStateEnum.ERROR, errorMessage:(<ProductsActions>action).payload,currentAction:<ProductsActions>action }
    default : return {...state}
  }
}