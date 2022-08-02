import { LoaderService } from './../_services/loader.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.loader.generateLoaderComponent();
      

    return next.handle(request).pipe(
      tap(() => {
        this.loader.removeLoaderComponent();
      }),
    )
    

    // return next.handle(request);
}
}
