import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MenuComponent } from './menu.component';
import { DISHES } from '../shared/dishes';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { baseURL } from '../shared/baseUrl';

describe('MenuComponent', () => {

  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  let dishService: DishService;

  beforeEach(async(() => {

    const dishServiceStub = {
      getDishes(): Observable<Dish[]> {
        return Observable.of(DISHES);
      }
    };

    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        RouterTestingModule.withRoutes([{ path: 'menu', component: MenuComponent }])
      ],
      declarations: [ MenuComponent ],
      providers: [
        { provide: DishService, useValue: dishServiceStub },
        { provide: 'BaseURL', useValue: baseURL },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dishService = TestBed.get(DishService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('dishes items should be 4', () => {
    expect(component.dishes.length).toBe(4);
    expect(component.dishes[1].name).toBe('Zucchipakoda');
    expect(component.dishes[3].featured).toBeFalsy();
  });

  it('should use dish name in template in upper case', () => {
    fixture.detectChanges();
    let debugElement: DebugElement;
    let htmlElement: HTMLElement;

    debugElement = fixture.debugElement.query(By.css('h1'));
    htmlElement = debugElement.nativeElement;

    expect(htmlElement.textContent).toContain(DISHES[0].name.toLocaleUpperCase());
  });

});
