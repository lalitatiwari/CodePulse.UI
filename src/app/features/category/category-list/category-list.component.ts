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

  deleteSubscriprition?: Subscription;
  constructor(private categoryService: CategoryService,
    private router: Router) { }

  ngOnDestroy(): void {
    this.deleteSubscriprition?.unsubscribe();
  }

  categories: Category[] = []
  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    }

    )
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


}
