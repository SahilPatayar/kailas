import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response } from '@angular/http';
import { RestangularModule, Restangular } from 'ngx-restangular';
import {baseURL } from '../shared/baseUrl';

import { Dish } from '../shared/dish';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable()
export class DishService {
  constructor(
    private restangular: Restangular,
    private httpResponseProcessr: ProcessHttpmsgService
  ) {}

  getDishes(): Observable<Dish[]> {
    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    return this.restangular.one('dishes', id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    return this.restangular.all('dishes').getList({featured: true}).map(dishes => dishes[0]);
  }

  getDishIds(): Observable<number[]> {
    return this.getDishes().map(dishes => dishes.map(dish => dish.id));
  }

  // getDishes(): Observable<Dish[]> {
  //   return Observable.of(DISHES).delay(2000);
  // }

  // getDish(id: number): Observable<Dish> {
  //  return Observable.of(DISHES.filter(dish => dish.id === id)[0]).delay(2000);
  // }

  // getFeaturedDish(): Observable<Dish> {
  //    return Observable.of(DISHES.filter(dish => dish.featured)[0]).delay(2000);
  // }

  // getDishIds(): Observable<number[]> {
  //   return this.getDishes().map(dishes => dishes.map(dish => dish.id));
  // }


}
