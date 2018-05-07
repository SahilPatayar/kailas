import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

import { RestangularModule, Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular) { }

  // getPromotions(): Promotion[] {
  //   return PROMOTIONS;
  // }

  // getPromotion(id: number): Promotion {
  //   return PROMOTIONS.filter(promotion => promotion.id === id)[0];
  // }

  // getFeaturedPromotion(): Promotion {
  //   return PROMOTIONS.filter(promotion => promotion.featured)[0];
  // }

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  // getPromotion(id: number): Observable<Promotion> {
  //   return PROMOTIONS.filter(promotion => promotion.id === id)[0];
  // }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured: true}).map(promotions => promotions[0]);
  }
  
}
