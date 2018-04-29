import { Component, OnInit, Inject } from '@angular/core';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';

import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes: Dish[];
  selectedDish: Dish;
  errorMessage: string;

  constructor(
    private dishService: DishService,
    @Inject('BaseURL') private BaseURL
  ) {}

  ngOnInit() {
    this.dishService
      .getDishes()
      .subscribe(
        dishes => (this.dishes = dishes),
        errorMessage => (this.errorMessage = <any>errorMessage)
      );
  }

  onSelect(dish: Dish): void {
    this.selectedDish = dish;
  }
}
