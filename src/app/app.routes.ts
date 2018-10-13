import { Routes, RouterModule } from '@angular/router';
import { FoodListComponent } from './food-list/food-list.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    
    { 
        path: 'foodlist',
        component: FoodListComponent
    },
    {
        path: 'addfood',
        component: AddFoodComponent
    },
    { path: '', redirectTo: 'foodlist', pathMatch: 'full' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule { };