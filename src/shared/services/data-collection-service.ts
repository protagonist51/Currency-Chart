import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {environment} from "../../environments/environment";
import {CurrencyObject} from "../dto/currencyObject";
import {DataCollectionApiService} from "./data-collection-api.service";

@Injectable()
export class DataCollectionService {

  constructor(private dataCollectionApiService : DataCollectionApiService<CurrencyObject>) {
  }

  getAllCurrencyData(): Observable<CurrencyObject[]> {

    let getAllCurrencyData : Observable<CurrencyObject[]> =this.dataCollectionApiService.getCurrencyDataFromApi();

    getAllCurrencyData.subscribe((data: CurrencyObject[]) => {
    },((error: any) => {
      return Observable.throw(error);
    }));
    return getAllCurrencyData;

  }



}
