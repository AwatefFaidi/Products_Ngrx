import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EditProductAction, UpdateProductAction, UpdateProductActionSuccess } from 'src/app/ngrx/products.actions';
import { ProductsState, ProductsStateEnum } from 'src/app/ngrx/products.reducer';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productID:number;
  formBuild:boolean=false;
   submitted:boolean=false;
  state:ProductsState|null=null;
  productFormGroup:FormGroup | null=null;
  readonly ProductsStateEnum=ProductsStateEnum;
  constructor(private activatedRoute:ActivatedRoute,private router:Router,
              private fb:FormBuilder, private store:Store<any>) { 
    //get product Id via url  
    this.productID=activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.store.dispatch (new EditProductAction(this.productID));
    //listen to store
    this.store.subscribe(state=>
      {// get state with infos about product
        this.state=state.catalogState;
        if(this.state?.dataState==ProductsStateEnum.LOADED)
        
        {
          if(this.state?.currentproduct!=null)
          { //create  form group to stock product static way
            this.productFormGroup=this.fb.group({
              id:[this.state.currentproduct.id],
              name:[this.state.currentproduct.name,Validators.required],
              price:[this.state.currentproduct.price,Validators.required],
              quantity:[this.state.currentproduct.quantity,Validators.required],
              selected:[this.state.currentproduct.selected],
              available:[this.state.currentproduct.available]
           });
           this.formBuild=true;
          }
        }
        
      }
      );
      /*
       // dynamic way 
        this.store.subscribe(state=>
        {
        this.state=state.catalogState;
        if(this.state?.dataState==ProductsStateEnum.LOADED)
          {
            this.productFormGroup=this.fb.group({});
            let data=this.state?.currentproduct;
            for (let f in data)
            {
              //@ts-ignore
              this.productFormGroup?.addControl(f,new FormControl(data[f],Validators.required));
            }
            this.formBuild=true;
          }
       
  }*/
}

okUpdated()
{
  this.router.navigateByUrl("/products");
}
onUpdateProduct()
{
  this.submitted=true;
  if(!this.productFormGroup?.valid)return
  this.store.dispatch(new UpdateProductAction(this.productFormGroup?.value));
}
}
