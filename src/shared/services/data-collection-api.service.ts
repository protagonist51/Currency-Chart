import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {CurrencyObject} from "../dto/currencyObject";

const API_URL = environment.currencyApi;

@Injectable()
export class DataCollectionApiService<T> {

  constructor(
    private http: Http
  ) {
  }

  //Get all the currency data from API
  public getCurrencyDataFromApi(): Observable<T[]> {
    return this.http.get(API_URL)
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.handleError);

  }

  private handleError (error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
