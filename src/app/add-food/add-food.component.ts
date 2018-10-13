import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducer/food.reducers';
import * as ActionTypes from '../food-list/state/food.action';
import * as fromFood from '../reducer/food.reducers';
import { FoodListService } from './../food-list/food-list.service';
import { BaseService } from '../shared/services/indexed-db.service';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css']
})
export class AddFoodComponent implements OnInit {

  public scanCode: string = '';
  
  constructor(private store: Store<AppState>, 
    private foodService: FoodListService,
    private idbService: BaseService) { }

  ngOnInit(): void { }

  onScanHandler(userInput):void {

    if(userInput.value.length >= 8) {
      this.scanCode = userInput.value;
      // TODO: auto add to db
      const num = (typeof userInput.value === 'string') ?
         Number(userInput.value) : userInput.value;
      const payload = {
        foodId: num,
        ndbno: num,
        upc: num,
        name: 'apple',
        timestamp: '123466',
        qty: 1
      }
      this.idbService.getAllFoods()
      .then(inventory => {
        console.log(inventory)
      })
      this.store.dispatch(new ActionTypes.AddFoodAction(payload));
      this.clearInput(userInput)
    }
  }

  clearInput(userInput): void {
    userInput.value = '';
  }
}
