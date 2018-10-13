const GroceryItemSchema = require('./GroceryItem.Schema');
const _ = require('lodash');

function GroceryItem(args) { 
  this.data = this.sanitize(args);
}

GroceryItem.prototype.sanitize = function (data) {
  let datas = data || {};
  return _.pick(_.defaults(datas, GroceryItemSchema), _.keys(GroceryItemSchema));
}

GroceryItem.prototype.data = {};

GroceryItem.prototype.get = function (name) {
  return this.data[name];
}

GroceryItem.prototype.set = function (name, value) {
  this.data[name] = value;
}

GroceryItem.prototype.upc_check = function (name) {
  let index = name.toUpperCase().indexOf(', UPC:');
  let upc = (index > -1) ? name.substring(index + 7, name.length) : false;
  if(!upc) {
    return;
  }
  return upc;
}

module.exports = GroceryItem;