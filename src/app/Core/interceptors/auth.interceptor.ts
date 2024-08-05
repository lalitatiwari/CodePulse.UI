import {  HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


export const authInterceptor: HttpInterceptorFn = (req , next) => {

 const urlRequirenAuth: boolean = req.urlWithParams.indexOf('addAuth=true',0)>-1?true:false;
 
 if(urlRequirenAuth)
 {
  const cookieService = inject(CookieService)
  const authToken = cookieService.get('Authorization'); //'your-auth-token';
 // console.log("your auth token "+ authToken)
  const authReq = req.clone({
    setHeaders: {
      Authorization: `${authToken}`,
    },
  });
  return next(authReq);
}
return next(req);
};

// private shouldInterceptRequest(request:HttpRequest<any>) :boolean{

//   return request.urlWithParams.indexof('addAuth=true',0)>-1?true:false;
// }


