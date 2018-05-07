import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
import { baseURL } from '../shared/baseUrl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  errorMessageLeader: string;
  errorMessagePromotion: string;
  errorMessageDish: string;

  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL
  ) {}

  ngOnInit() {
    this.dishService
      .getFeaturedDish()
      .subscribe(
        dish => (this.dish = dish),
        errorMessage => (this.errorMessageDish = <any>errorMessage.message)
      );

      this.promotionService
      .getFeaturedPromotion()
      .subscribe(
        promotion => (this.promotion = promotion),
        error => this.errorMessagePromotion = <any>error.message);

    this.leaderService
      .getFeaturedLeader()
      .subscribe(
        leader => ( this.leader = leader),
        error => (this.errorMessageLeader = <any>error.message)
      );
      // this.leader = leader;
  }
}
