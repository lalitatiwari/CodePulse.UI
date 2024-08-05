import { Component, OnDestroy } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { OnInit } from '@angular/core';
import { Category } from '../models/get-category-request.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit, OnDestroy {

  searchText?: string
  totalCount?: number
  pageNumber = 1;
  pageSize = 3;
  list:number[]=[];

  deleteSubscriprition?: Subscription;
  constructor(private categoryService: CategoryService,
    private router: Router) { }

  ngOnDestroy(): void {
    this.deleteSubscriprition?.unsubscribe();
  }

  categories: Category[] = []
  ngOnInit(): void {


    //pagination
    this.categoryService.getCategoryCount().subscribe({
      next: (value) => {
        this.totalCount = value;
        this.list= new Array(Math.ceil(value/this.pageSize)) //11/5= 2.5 =3

        this.categoryService.getAllCategories(this.searchText, undefined,undefined,this.pageNumber,this.pageSize)
        .subscribe(data => {
          this.categories = data;
        })

      }
    }
    )
  }



  search(): void {
    this.ngOnInit();

    // this.categoryService.getAllCategories(this.searchText).subscribe({
    //   next:(response)=>{
    //     this.categories =response;

    //   }
    // })
    console.log(this.searchText);
  }

  deleteCategoryById(id: string) {//console.log(id);

    this.deleteSubscriprition = this.categoryService.deleteCategoryById(id).subscribe({
      next: (response) => {

        //this.router.navigateByUrl('/admin/categories');
        this.ngOnInit();
        console.log('deleted');
      }
    }
    );
  }

  sort(column?: string, sortDirection?: string) {
    this.categoryService.getAllCategories(this.searchText, column, sortDirection).subscribe({
      next: (response) => {
        this.categories = response;
        console.log('sorted');
      }
    })
  }

  setPage(pageNumber:number)
  {
    this.pageNumber= pageNumber;
    console.log("current page"+pageNumber)

    this.categoryService.getAllCategories(this.searchText, undefined,undefined,pageNumber,this.pageSize)
    .subscribe(data => {
      this.categories = data;
    })
  }

  getNextpage()
  { 
    if(this.pageNumber+1> this.list.length)
    {return;}
    this.setPage(this.pageNumber+1);
   // console.log("current page from Next"+this.pageNumber)
  }

  getPreviousPage()
  {
    if(this.pageNumber-1<1)
      {return;}
    this.setPage(this.pageNumber-1);
   // console.log("current page from previous"+this.pageNumber)

  }
}
