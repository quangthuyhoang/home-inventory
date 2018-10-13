import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import * as foodAction from "./food.action";
import { mergeMap, map, catchError } from "rxjs/operators";
import { FoodListService } from './../food-list.service';
import { IFood } from "../../model/Food";
import { BaseService } from "../../shared/services/indexed-db.service";

@Injectable()
export class FoodEffects {
    constructor(private actions$: Actions,
        private foodservice: FoodListService,
        private IdbService: BaseService) { }

    @Effect()
    AddFoods$: Observable<Action> = this.actions$.pipe(
        ofType(foodAction.ADD_FOOD),
        map((action: foodAction.AddFoodAction) => action.payload),
        mergeMap((food: IFood) => this.foodservice.addFood(food).pipe(
            map((addedFood) => (new foodAction.AddFoodSuccessAction(food))),
            catchError(err => of(new foodAction.AddFoodFailureAction(err)))
        ))
    )
    
    @Effect()
    SaveFoods$: Observable<Action> = this.actions$.pipe(
        
    )
    // TODO: add effect that will save all data to localStorage or indexDB or in a SERVICE??? need reserach
}
