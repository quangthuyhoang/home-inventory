import { Injectable } from '@angular/core';
import * as idbWrapper from 'idb-wrapper';


@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  static idb = new idbWrapper({
    dbVersion: 1,
    storeName: 'currentInventory',
    keyPath: 'foodId',
    autoIncrement: true,
    onStoreReady: function() {
      console.log('currentInventory store is ready');
    }
  })
  
}

export class BaseService {
  dbname = 'inventory';

  get connection() {
    return IndexedDBService.idb;
  }

  storeFood(args, onSuccess, onError) {
    IndexedDBService.idb.put(
      args, 
      onSuccess,
      onError
      );
    return args;
  }

  getFood(args) {
    return new Promise((resolve, reject) => {
      IndexedDBService.idb.get(
        args.foodId,
        (id) => {resolve(id)},
        (err) => {reject(err)},
      )
    })
  }

  updateFood(args) {
    return new Promise((resolve, reject) => {
      IndexedDBService.idb.put(
        args,
        (id) => {resolve(id)},
        (err) => {reject(err)}
      )
    })
  }

  getAllFoods() {
    return new Promise((resolve, reject) => {
      IndexedDBService.idb.getAll(
        (data) => {resolve(data);},
        (err) => {reject(err);}
      )
    })
  }

  removeFood(args) {
    return new Promise((resolve, reject) => {
      IndexedDBService.idb.remove(
        args.foodId,
        (data) => {
          if(data === true)
          resolve(data);
        },
        (err) => {reject(err);}
      )
    })
  }
}