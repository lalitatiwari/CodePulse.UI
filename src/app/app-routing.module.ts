import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AppComponent } from './app.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogPostComponent } from './features/blog-post/edit-blog-post/edit-blog-post.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';
import {jwtDecode} from 'jwt-decode';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'blog/:url', component:BlogDetailsComponent},
  {path: "admin/categories", component: CategoryListComponent, canActivate:[authGuard]},
  {path:"admin/categories/add", component:AddCategoryComponent, canActivate:[authGuard]},
  {path:"admin/categories/:id", component:EditCategoryComponent, canActivate:[authGuard]},
  {path:"admin/blogposts", component:BlogpostListComponent, canActivate:[authGuard]},
  {path:"admin/blogposts/add", component:AddBlogpostComponent, canActivate:[authGuard]},
  {path:"admin/blogposts/:id", component:EditBlogPostComponent, canActivate:[authGuard]},
  {path:"login", component:LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
