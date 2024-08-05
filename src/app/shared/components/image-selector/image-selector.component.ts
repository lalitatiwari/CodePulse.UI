import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { ImageService } from './image.service';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.css'
})
export class ImageSelectorComponent implements OnInit {
  /**
   *
   */
  private file?: File;
  fileName: string ='';
  title : string='';
  blogImage?: BlogImage
  blogImages?: BlogImage[]

  @ViewChild('form', { static: false }) imageForm?: NgForm;
  constructor(private imageService: ImageService) {
   
  }
  ngOnInit(): void {
    this.getImages();
   
  }

  onFileUploadChange(event : Event): void{
    
  const element= event.currentTarget as HTMLInputElement;
  this.file=element.files?.[0];

  }

  uploadImage(): void{

    if(this.file && this.fileName !='' && this.title != '')
    {
      //image service to upload image
      console.log("inside image method");
      this.imageService.uploadImage(this.file,this.fileName,this.title).subscribe({
        next:(response)=>{
        //  this.blogImage=response
         // console.log(response);
         this.imageForm?.resetForm();
          this.getImages();

        }
        }
      )
    }

  }

  selectImage(image:BlogImage) : void{

    this.imageService.selectImage(image);
  }

  private getImages(): void{
    this.imageService.getAllImages().subscribe({
      next:(response)=>{
        this.blogImages=response;
      }
    })
  }

}
