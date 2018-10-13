import { InMemoryDbService } from 'angular-in-memory-web-api';

import { IFood } from './model/Food';
import { Injectable } from '@angular/core';

@Injectable()
export class FoodData {

        createDb() {
                const foods: IFood[] = [
                        {
                                "timestamp" : "5b98773ffdd98b2200a42c4a",
                                "ndbno" : 1113,
                                "upc" : 1113,
                                "name" : "apple",
                                "qty" : 1
                        },
                        {
                                "timestamp" : "5b9e685032219c10c4d2f0fa",
                                "ndbno" : 1111,
                                "upc" : 1333,
                                "name" : "chicken",
                                "qty" : 1
                        },
                        {
                                "timestamp" : "5b9e686c672b7b31cc19382f",
                                "ndbno" : 1111,
                                "upc" : 1333,
                                "name" : "chicken",
                                "qty" : 1
                        },
                        {
                                "timestamp" : "5b9e6967542b1c349804d9db",
                                "ndbno" : 1111,
                                "upc" : 1323,
                                "name" : "chicken",
                                "qty" : 1
                        },
                        {
                                "timestamp" : "5b9e69c592f6ea330450ca0e",
                                "ndbno" : 1111,
                                "upc" : 1323,
                                "name" : "chicken",
                                "qty" : 1
                        },
                        {
                                "timestamp" : "5ba65e32894d023c84194df9",
                                "ndbno" : 11111,
                                "upc" : 13231,
                                "name" : "chickendf",
                                "qty" : 1
                        }
                ]
                return foods;
        }
}
    

    
