import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize } from "rxjs/operators";
import { LoaderService } from "../services/loader.service";

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor  {

  constructor(private loader: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loader.show()
    return next.handle(req).pipe(
      finalize(() => this.loader.hide())
    );
  }
}
