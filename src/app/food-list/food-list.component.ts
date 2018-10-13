import { Component, OnInit } from '@angular/core';
import { FoodData } from './../app.data';
import { IFood } from './../model/Food';
import { FoodListService } from './food-list.service';
import { Store, select } from '@ngrx/store';

import * as fromFood from '../reducer/food.reducers';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit {

  public foodList: IFood[];
  public foodTest: string;
  private foodItem = {
    ndbno: 1113,
    upc: 1113,
    name: 'apple',
    timestamp: '12324124',
    qty: 3
  };

  constructor(private food: FoodData, 
    private foodService: FoodListService,
    private store: Store<fromFood.AppState>) { }

  ngOnInit() {
    // this.foodList = this.food.createDb();
    this.foodTest = "Food name";
    // this.foodService.getFood(0)
    //   .subscribe((data: dataResponse) => {
    //     if(data.status && data.status === 200) {
    //       this.foodList = data.results;
    //     }
    //   })


    this.store.pipe(select(fromFood.getCurrentInventoryState))
      .subscribe(currentInventory => {
        this.foodList = currentInventory
      })
  }


}
interface dataResponse {
  results: IFood[],
  status: Number,
  message: String
}