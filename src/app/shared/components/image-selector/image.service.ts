import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlogImage } from '../../models/blog-image.model';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageService {


  selectedImage : BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id:'',
    fileExtension:'',
    title:'',
    fileName:'',
    url:''
  })
  constructor(private httpClient :HttpClient) { }

uploadImage(file:File, fileName: string, title:string):Observable<BlogImage>
{
  const formData = new FormData();
  formData.append('file',file);
  formData.append('fileName',fileName)
  formData.append('title',title)
  console.log("inside image service");
 return this.httpClient.post<BlogImage>(`${environment.apiUrl}/images`,formData);
}

getAllImages(): Observable<BlogImage[]>
{
  return this.httpClient.get<BlogImage[]>(`${environment.apiUrl}/images`);

}


// Emit values through the Subject
selectImage(image: BlogImage):void
{
  this.selectedImage.next(image);

}

onSelectImage():Observable<BlogImage>
{
  return this.selectedImage.asObservable();
}
}
