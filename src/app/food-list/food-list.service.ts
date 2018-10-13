import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IFood } from '../model/Food';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodListService {
  private foodUrl = environment.serverURL;

  constructor(private http: HttpClient) { }

  getFood(param: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.foodUrl + '/api/show/' + param, { headers: headers})
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addFood(item: IFood) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    console.log("add food item: ", item)
    const payload = {
      item: item
    }
    return this.http.post(this.foodUrl + '/api/new', payload, { headers: headers});
  }

  updateFood(item: IFood) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.foodUrl + '/api/put', item, { headers: headers});
  }

  removeFood(item: IFood) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(this.foodUrl + '/api/delete/' + item.upc, { headers: headers});
  }

  private handleError(err) {
    console.log("inside error handler", err)
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      console.log("check this out:", err.error)
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
  
}
