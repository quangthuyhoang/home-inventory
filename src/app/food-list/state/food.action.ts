import { Action } from '@ngrx/store';
import { IFood } from '../../model/Food';

export const ADD_FOOD_SUCCESS = 'ADD_FOOD_SUCCESS';
export const ADD_FOOD = 'ADD_FOOD';
export const ADD_FOOD_FAILURE = 'ADD_FOOD_FAILURE';

/*
* Every action is comprised of at least a type and an optional
* payload. Expressing actions as classes enables powerful
* type checking in reducer functions.
*/

export class AddFoodSuccessAction implements Action {
    readonly type = ADD_FOOD_SUCCESS;

    constructor(public payload: any) { }
}

export class AddFoodAction implements Action {
    readonly type = ADD_FOOD;
    
    constructor(public payload: IFood) { }
}

export class AddFoodFailureAction implements Action {
    readonly type = ADD_FOOD_FAILURE;
    
    constructor(public payload: string) { }
}

export type FoodActions 
    = AddFoodAction 
    | AddFoodSuccessAction
    | AddFoodFailureAction;
