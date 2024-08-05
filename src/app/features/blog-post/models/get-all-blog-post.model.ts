import { Category } from "../../category/models/get-category-request.model";

export interface getBlogPostRequest
{
    id: string;
    title:string;
    shortDescription:string;
    featuredImageUrl:string;
    content:string;
    urlHandle:string;
    author:string;
    publishedDate :Date;
    isVisible:boolean;
    categories : Category[];
}