import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { API_CLIENT_URL } from '../constants/url.constants';

// const API_URL = 'http://localhost:7070/client/';

@Injectable()
export class ClientService {
    constructor(private http: HttpClient) {
    }


    saveClient(userSetPayload): Observable<any> {
        return this.http.post(API_CLIENT_URL +"add",userSetPayload,{ responseType: 'text' }).pipe(
            map((response) => {
                return response;
            })
        );
        }

        editClient(userSetPayload): Observable<any> {

            return this.http.put(API_CLIENT_URL +"edit",userSetPayload).pipe(
                map((response) => {
                    
                    return response;
                })
            );
        }    

    deleteClient(payload:any): Observable<any> {
       
        let id = payload.id;
        return this.http.delete(API_CLIENT_URL +"delete/" +id,{ responseType: 'text' })
        .pipe(
          map((response) => {
                return response;
            })
        );
    }

    getAllClient(): Observable<any> {
       
        // return this.http.get(API_SECTION_URL + 'sectionlist').pipe(
        return this.http.get(API_CLIENT_URL +"getAllClient").pipe(
            map((response) => {
                return response;
            })
        );
    }

}