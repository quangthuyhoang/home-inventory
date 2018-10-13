import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { StoreModule, State, ActionReducerMap } from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { foodReducer, initState, AppState } from './reducer/food.reducers';
import * as fromFood from './reducer/food.reducers';

import { AppComponent } from './app.component';
import { FoodItemComponent } from './food-item/food-item.component';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodData } from './app.data';
import { AddFoodComponent } from './add-food/add-food.component';

import { AppRoutingModule } from './app.routes';
import { environment } from './../environments/environment.prod';
import { MyOwnCustomMaterialModule } from './material-component/material-component.module';

import { EffectsModule } from '@ngrx/effects';
import { FoodEffects } from './food-list/state/food.effects';

import { BaseService } from './shared/services/indexed-db.service';

const reducers = {
  food: fromFood.foodReducer
}

@NgModule({
  declarations: [
    AppComponent,
    FoodItemComponent,
    FoodListComponent,
    AddFoodComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModule,
    EffectsModule.forRoot([FoodEffects]),
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'Fridge storage',
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [
    FoodData,
    BaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
