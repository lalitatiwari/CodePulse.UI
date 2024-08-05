import { Component, OnDestroy, OnInit } from '@angular/core';
import { getBlogPostRequest } from '../models/get-all-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/get-category-request.model';
import { updateBlogPost } from '../models/update-blog-post.model';
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blog-post',
  templateUrl: './edit-blog-post.component.html',
  styleUrl: './edit-blog-post.component.css'
})
export class EditBlogPostComponent implements OnInit, OnDestroy {


  blog?: getBlogPostRequest;
  id: string | null = '';
  routerSubscription?: Subscription
  categories?: Category[];
  categorySubscription?: Subscription;
  selectedCategories?: string[];
  updateSubscription?: Subscription
  getBlogPostsubscription?: Subscription
  isImageSelectorVisible: boolean = false
  imageSelectSubscription?: Subscription

  constructor(private blogPostService: BlogPostService,
    private activatedRoute: ActivatedRoute, private categoryService: CategoryService,
    private router: Router, private imageService: ImageService
  ) {


  }
  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.categorySubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
    this.getBlogPostsubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
  ngOnInit(): void {
    this.routerSubscription = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.getBlogPostsubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.blog = response;
              this.selectedCategories = response.categories.map(x => x.id);
            }
          });
        }
      }
    })

    this.categorySubscription = this.categoryService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response
      }
    })


    //image selector
    this.imageSelectSubscription= this.imageService.onSelectImage().subscribe({
      next: (response) => {
        if (this.blog) {
          this.blog.featuredImageUrl = response.url;
          //console.log("inside edit blog img service "+this.blog.featuredImageUrl);
          this.isImageSelectorVisible = false;
        }
      }
    })
  }

  onSubmit(): void {

    if (this.blog && this.id) {
      var updateBlogPost: updateBlogPost =
      {
        title: this.blog.title,
        author: this.blog.author,
        shortDescription: this.blog.shortDescription,
        content: this.blog.content,
        featuredImageUrl: this.blog.featuredImageUrl,
        isVisible: this.blog.isVisible,
        publishedDate: this.blog.publishedDate,
        urlHandle: this.blog.urlHandle,

        categories: this.selectedCategories ?? []

      }


      this.updateSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost).subscribe({
        next: (response) => {
          console.log(updateBlogPost)
          this.router.navigateByUrl("/admin/blogposts");
        }
      })
    }
  }
  openImageSelectorModal(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelectorModal(): void {
    this.isImageSelectorVisible = false;
  }

}
