import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
import { Comment } from '../shared/comment';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.scss']
})
export class DishDetailComponent implements OnInit {

  dish: Dish;
  prev: number;
  next: number;
  dishIds: number[];
  comment: Comment;

  commentForm: FormGroup;

  formErrors = {
    author: '',
    comment: ''
  };

  validationMessages = {
    author: {
      'required': 'Author Name is required.',
      'minlength': 'Author Name must be at least 2 characters long.',
      'maxlength': 'Author Name cannot be more than 25 characters long.'
    },
    comment: {
      'required': 'Comment is required.',
      'minlength': 'Comment must be at least 2 characters long.',
      'maxlength': 'Comment cannot be more than 25 characters long.'
    }
  };

  constructor(private dishService: DishService,
     private location: Location,
     private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, @Inject('BaseURL') private BaseURL) {
       this.createForm();
       this.commentForm.valueChanges.subscribe(data => this.onValueChange(data));
       this.onValueChange();
      }


  createForm(): void{
    this.commentForm = this.formBuilder.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      rating: '5',
      comment: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(25)] ]
    });
  }

  onValueChange(data?: any): void {
    if (! this.commentForm) {
      return;
    }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.touched && control.invalid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
     
  ngOnInit() {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.activatedRoute.params.switchMap((params: Params) => this.dishService.getDish(+params['id']))
    .subscribe(dish => {this.dish = dish; this.setPrevNext(dish.id)});
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(formDirective: FormGroupDirective) {

    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dish.comments.push(this.comment);
    this.commentForm.reset({author: '', rating: '5', comment: ''},
      {emitEvent: false});
  // Mat-input-field issue workaround
  // after submitting, the form stays red
  formDirective.resetForm();
  }

}
