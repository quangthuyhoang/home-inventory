import { IFood } from "../model/Food";
import * as ActionTypes from '../food-list/state/food.action';
import { FoodActions } from '../food-list/state/food.action';
import { AppState } from './food.reducers';
import { createFeatureSelector, createSelector } from "@ngrx/store";


export interface AppState {
    currentInventory: any[];
}

export const initState: AppState = {
    currentInventory: [{
        ndbno: 12345677,
        upc: 12345677,
        name: 'apple',
        timestamp: '123466',
        qty: 1
      }]
}

const getFoodFeatureState = createFeatureSelector<AppState>('food')

export const getCurrentInventoryState = createSelector(
    getFoodFeatureState,
    state => state.currentInventory
)

export function foodReducer (state = initState, action: FoodActions) : AppState {
    switch(action.type) {

        case ActionTypes.ADD_FOOD_SUCCESS:
            return {
                ...state,
                currentInventory: [...state.currentInventory,action.payload]
            }
        
        default:
            return state;
    }
}

