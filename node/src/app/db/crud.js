'use strict';
const assert = require('assert');
var dbController = {};

function dbFindResponseHandler(err, results) {
    var report = {};
    assert.equal(err, null);
    if(err) {
        report.error = err;
        report.status = 404;
        report.message = "There's been an error in findItem method";
    } 
    
    if(results.length > 0) {
        report.results = results;
        report.status = 200;
        report.message = "Successfully found " + results[0].name;
    }
    return report;
}

dbController.createItem = function(db, groceryItem, callback) {
    const collections = db.collection('storage');

    collections.insertOne(groceryItem, function(err, results) {
        var report = {};
        assert.equal(err, null);
        if(err) {
            report.error = err;
            report.status = 404;
            report.message = "There's been an error in saveItem method";
        } else {
            report.results = results;
            report.status = 200;
            report.message = "Successfully saved " + results.ops[0].name;
        }
        callback(report);
    })
};

function findItem(db, upc, callback) {

    const collections = db.collection('storage');
    if(upc === 0) {
        return getAllItems(collections, callback);
    } else {
        return findOneItem(collections, upc, callback)
    }
}
function findOneItem(collections, upc, callback) {
    collections.find({upc: upc}).toArray(function(err, results) {
        let report = dbFindResponseHandler(err, results);
        callback(report);
    })
}
function getAllItems(collections, callback) {
    collections.find({}).toArray(function(err, results) {
        let report = dbFindResponseHandler(err, results);
        callback(report);
    })
}

dbController.findItem = findItem;
dbController.getAllItems = getAllItems

dbController.deleteItem = function(db, id, callback) {
    const collections = db.collection('storage');
    
    collections.deleteOne({upc: id}, function(err, results) {
        var report = {};
        assert.equal(err, null);
        if(err) {
            report.error = err;
            report.status = 404;
            report.message = "There's been an error in deleteItem method";
        } else {
            report.results = results;
            report.status = 200;
            console.log("results" , results)
            report.message = "Successfully deleted " + results.result.n + " items associated with upc: " + id;
        }
        callback(report);
    })
};

const updateItem = (db, item, callback) => {
    const collections = db.collection('storage');
    
    collections.updateOne({  upc: Number(item.upc) }
        , { $set: { qty : item.qty } }, function(err, results) {
            var report = {};
            console.log(results)
            assert.equal(err, null);
            if(err) {
                report.error = err;
                report.status = 404;
                report.message = "There's been an error in deleteItem method";
            } else {
                report.results = results;

                if(results.result.nModified > 0 && results.result.ok > 0) {
                    report.status = 200;
                    report.message = "Successfully updated " + results.result.nModified + " items.";
                } else if (results.nModified === 0 && results.result.ok > 0) {
                    report.status = 404;
                    report.message = "Item " + item.name + " was not updated ";
                }
            }
            callback(report);
      });  
}

dbController.updateItem = updateItem;

module.exports = dbController;