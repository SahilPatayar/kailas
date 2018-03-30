import { Component, OnInit } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  dish : Dish;

  constructor(private dishService: DishService,
     private location: Location,
     private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.activatedRoute.snapshot.params['id'];
    console.log(id);
    this.dish = this.dishService.getDish(id);
  }

  goBack() : void {
    this.location.back();
  }

}
