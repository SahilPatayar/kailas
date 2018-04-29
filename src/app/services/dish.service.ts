import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
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
      .map(res => this.httpResponseProcessr.extractData(res));
  }

  getDish(id: number): Observable<Dish> {
    return this.http
      .get(baseURL + 'dishes/' + id)
      .map(res => this.httpResponseProcessr.extractData(res));
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http
      .get(baseURL + 'dishes?featured=true')
      .map(res => this.httpResponseProcessr.extractData(res));
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes().map(dishes => dishes.map(dish => dish.id));
  }
}
