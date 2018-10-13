import { Injectable } from '@angular/core';
import { FoodListService } from './../food-list/food-list.service';

@Injectable({
  providedIn: 'root'
})
export class InitializationService {

  constructor(private foodService: FoodListService) { }
  
}
