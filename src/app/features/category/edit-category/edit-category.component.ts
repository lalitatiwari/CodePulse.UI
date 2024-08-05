import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/get-category-request.model';
import { FormGroup } from '@angular/forms';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  category?: Category;
  editSubscription? :Subscription;


  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
  private router:Router) { }
  ngOnDestroy(): void {

    this.paramsSubscription?.unsubscribe();
    this.editSubscription?.unsubscribe();
  }
  ngOnInit(): void {

    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) { //get the data

          this.categoryService.getCategoryById(this.id).subscribe({
            next: (response) => {
              this.category = response;
            }
          });

        }

      }
    })
  }

  onSubmit():void
  { //console.log(this.category);
    const updateCategoryRequest: UpdateCategoryRequest =
    {
      name: this.category?.name??'',
      urlHandle: this.category?.urlHandle ?? ''
    };
if(this.id)
this.editSubscription =   this.categoryService.updateCategoryById(this.id,updateCategoryRequest).subscribe({
  
  next:(response)=>
  {
    this.router.navigateByUrl('/admin/categories');

  }});
    }
   
 

}
