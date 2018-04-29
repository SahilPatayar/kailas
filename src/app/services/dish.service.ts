import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response } from '@angular/http';
import {baseURL } from '../shared/baseUrl';

import { Dish } from '../shared/dish';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class DishService {
  constructor(
    private http: Http,
    private httpResponseProcessr: ProcessHttpmsgService
  ) {}

  getDishes(): Observable<Dish[]> {
    return this.http
      .get(baseURL + 'dishes')
      .map(res => this.httpResponseProcessr.extractData(res))
      .catch(error => this.httpResponseProcessr.handleError(error));
  }

  getDish(id: number): Observable<Dish> {
    return this.http
      .get(baseURL + 'dishes/' + id)
      .map(res => this.httpResponseProcessr.extractData(res))
      .catch(error => this.httpResponseProcessr.handleError(error));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get(baseURL + 'dishes?featured=true')
      .map(res => this.httpResponseProcessr.extractData(res)[0])
      .catch(error => this.httpResponseProcessr.handleError(error));
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes().map(dishes => dishes.map(dish => dish.id));
  }
}
