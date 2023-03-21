import { Injectable } from '@angular/core';
import {Donut} from "../models/donut.model";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, delay, map, of, retry, retryWhen, take, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DonutService {

  // donuts: Donut[] = [
  //   {
  //     id: 'y8z0As',
  //     name: 'Just Chocolate',
  //     icon: 'just-chocolate',
  //     price: 119,
  //     promo: 'New',
  //     description: 'For the pure chocoholic.'
  //   },
  //   {
  //     id: '3u98K1',
  //     name: 'Glazed Fudge',
  //     icon: 'glazed-fudge',
  //     price: 129,
  //     promo: 'Limited',
  //     description: 'Sticky perfection.'
  //   },
  //   {
  //     id: 'ae098s',
  //     name: 'Caramel Swirl',
  //     icon: 'caramel-swirl',
  //     price: 129,
  //     description: 'Chocolate drizzled with caramel.'
  //   }
  // ];

  donuts:  Donut[] = [];
  constructor(private http: HttpClient) { }


  read() {
    let headers = new HttpHeaders({
      'Content-Type': 'Application/json'
    });
    headers = headers.append( 'Api-Token',  'tokenIchABC');
    const options = {
      headers: headers
    };
    // return this.donuts;
    if (this.donuts.length) {
      // return of(this.donuts);
    }
   return this.http.get<Donut[]>(`/api/donuts`, options).pipe(
     tap((donuts)  => {
       this.donuts = donuts;
     }),
     retry({delay: 1000, count: 2}),
     catchError(this.handleError)
   );
  }

  // readOne(id: string) {
  //   return this.read().find((donut: Donut) => donut.id === id
  //   );
  // }
  readOne(id: string |  null) {
    return this.read().pipe(
      map((donuts) => {
        const donut = donuts.find((donut) => donut.id === id);
        if (donut) {
          return donut;
        }
        return {name: '', icon: '', price: 0, description: ''};
      })
    );
  }


  create(payload: Donut) {
    return this.http.post<Donut>(`api/donuts`, payload).pipe(
      tap(()=> {
      this.donuts = [...this.donuts, payload];
    }),
      catchError(this.handleError)
    );
    // this.donuts = [...this.donuts, payload];
    // console.log('Create Donut Service',this.donuts);
  }

  update(payload: Donut) {
    return this.http.put(`/api/donuts/${payload.id}`, payload).pipe(
      tap((donuts) => {
        this.donuts = this.donuts.map((item: Donut) => {
          if (item.id === payload.id) {
            return payload;
          }
          return item;
        })
      }),
    catchError(this.handleError)
    );
    // this.donuts = this.donuts.map((donut: Donut) => {
    //   if (donut.id === payload.id) {
    //     return payload;
    //   }
    //   return donut;
    // });
    // console.log('Update Donut Service', this.donuts);
  }


  delete(payload: Donut) {
    return this.http.delete(`/api/donuts/${payload.id}`).pipe(
      tap((donuts) =>  {
        this.donuts =  this.donuts.filter((donut:Donut) => donut.id !== payload.id);
      }),
      catchError(this.handleError)
    )
    // this.donuts = this.donuts.filter((donut:Donut) => donut.id !== payload.id);
    // console.log('Delete Donut Service', this.donuts);
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.warn('Client side', error.message);
    } else {
      console.warn('Serve side', error.message);
    }
    return throwError(() => new Error(error.message));
  }
}
