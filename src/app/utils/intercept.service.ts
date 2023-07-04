// Angular
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// RxJS
import { Observable, observable, throwError } from 'rxjs';
import { tap,map } from 'rxjs/operators';
import { ErrorModel } from '../models/_error.model';
import { MatButtonToggleGroupMultiple } from '@angular/material';
import { environment } from '../../../../../environments/environment'
import { Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

/**
 * More information there => https://medium.com/@MetonymyQT/angular-http-interceptors-what-are-they-and-how-to-use-them-52e060321088
 */

@Injectable()
export class InterceptService implements HttpInterceptor {
	// intercept request and add token	
	private returnUrl: string;
	constructor(private router: Router,private tosterService:ToastrService){

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.returnUrl = event.url;
			}
		});

	}
	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {				
		if(localStorage.getItem(environment.authTokenKey)!=null){	
			let headers=new HttpHeaders()
			headers= headers.set(environment.authTokenKey,localStorage.getItem(environment.authTokenKey)),	 
			request = request.clone({		
				headers:request.headers.set(environment.authTokenKey,localStorage.getItem(environment.authTokenKey))
			});										   
		}			
		return next.handle(request).pipe(
			tap(
				event => {																			
					 if (event instanceof HttpResponse) {	
																		
						if(event.body.status==="FAILED"){
							let errorModel= new  ErrorModel([])
							errorModel.errorCodes=event.body.gmsErrors
							
							
						}																
					}
				},
				error => {					
					if(error instanceof HttpErrorResponse){																	
						if(error.status==403){
							localStorage.removeItem(environment.authTokenKey)
							this.router.navigate(['/login'], {queryParams: {auth:"expired"}});
						}	else if(error.status==401){
							localStorage.removeItem(environment.authTokenKey)
							this.router.navigate(['/login'], {queryParams: {auth:"unauth"}});
						}	else if(error.status==0){
							localStorage.removeItem(environment.authTokenKey)
							this.router.navigate(['/login'], {queryParams: {auth:"unavailable"}});
						}
						else{						
							let errorModel= new  ErrorModel([])
							errorModel.errorCode=error.status.toString()
							throw errorModel;
						}
						let errorModel= new  ErrorModel([])	
						throw errorModel;													
										
					}									
				}
			),
			map((event)=>{
				if (event instanceof HttpResponse){
					if(event.headers.get(environment.authTokenKey)){
						event.body.data.accessToken = event.headers.get(environment.authTokenKey)
					}
				}
				return event;
				
			})	
		);
	}

}
