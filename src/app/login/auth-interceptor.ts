import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import {Injectable} from '@angular/core'


@Injectable()


export class AuthInterceptor implements HttpInterceptor{

    constructor(private loginService:LoginService){}

    intercept(req:HttpRequest<any>,next:HttpHandler){
       
       const authToken = this.loginService.getToken();
       console.log("in interceptor",authToken);
       const authRequest = req.clone({
           headers:req.headers.set("authorization","Bearer " + authToken)
       });
        return next.handle(req);
    }
}