'use strict';
const MongoClient = require('mongodb').MongoClient;

var _client;

module.exports = {
    connectToServer: function (url, callback) {
        MongoClient.connect(url, function (err, client) {
            _client = client.db('inventory');
            return callback(err);
        })
    },

    getDB: function () {
        return _client;
    }
}