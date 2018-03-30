import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MenuComponent } from '../menu/menu.component';
import { DishDetailComponent } from '../dish-detail/dish-detail.component';

export const routes: Routes = [
    {path: 'home' , component: HomeComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'dishdetail/:id', component: DishDetailComponent },
    {path: '', redirectTo: '/home', pathMatch:'full'}
];