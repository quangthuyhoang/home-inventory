const express = require('express'),
	app = express(),
	bodyparser = require('body-parser'),
	findItem = require('./src/app/db/crud').findItem,
	crud = require('./src/app/db/crud'),
	GroceryItem = require('./src/app/GroceryStorage/model/GroveryItem.Model');
	db = require('./src/app/db/index'),
	dbUrl = 'mongodb://localhost:27017/inventory',
	port = 3000;

	const MongoClient = require('mongodb').MongoClient;
	const assert = require('assert');
// APP CONFIG
// const { saveItem, deleteItem, updateItem } = crud;
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use((req, res, next) => {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');
  
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, *');
  
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', '*');
  
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	// Pass to next layer of middleware
	next();
  });


app.get('/', function(req,res){
	res.send('Landing Page')
})
// INDEX ROUTE
app.get('/input', function(req,res){
	res.render('index');
});



// SHOW ROUTE
app.get('/api/show/:upc', function(req,res){
	var upc = Number(req.params.upc)
	db.connectToServer(dbUrl, function(err) {
			if(err) {
				return res.status(404).json({
					error: err,
					message: "There was an error connecting to the database"
				})
			} else {
				findItem(db.getDB(), upc, function(results) {
					
					res.status(results.status).json(results);
				})
			}
		})
})
	


// CREATE ROUTE
app.post('/api/new', function(req,res){

	let item = req.body.item
	let testItem = Object.assign({}, GroceryItem.data, item)
	
	var newItem = new GroceryItem({
		upc: item.upc,
		ndbno: item.ndbno,
		name: item.name,
		qty: item.qty
	})
	console.log("test item: ", testItem, "newItem: ", newItem);
	db.connectToServer(dbUrl, function(err) {
		if(err) {
			return res.status(404).json({
				error: err,
				message: "There was an error connecting to the database"
			})
		} else {
			crud.createItem(db.getDB(), newItem.data, function(results) {
				
				res.status(results.status).json(results)
			})
		}		
	})
});

app.put('/api/put', function(req, res) {

	let updatedItem = req.body.item;
	console.log(updatedItem)

	db.connectToServer(dbUrl, function(err) {
		if(err) {
			return res.status(404).json({
				error: err,
				message: "There was an error connecting to the database"
			})
		} else {
			crud.updateItem(db.getDB(), updatedItem, function(results) {
				
				res.status(results.status).json(results)
			})
		}				
	})
})

app.delete('/api/delete/:id', function(req, res) {
	let deletedId = Number(req.params.id);
	console.log("deleteid", deletedId)
	
	db.connectToServer(dbUrl, function(err) {
		if(err) {
			return res.status(404).json({
				error: err,
				messsage: "There was an error connecting to the database"
			})
		} else {
			crud.deleteItem(db.getDB(), deletedId, function(results) {
			
				res.status(results.status).json(results)
			})
		}
	})
})

//start server 
app.listen(port, process.env.IP, function(req,res){
	console.log("Server has started on port:", port);
})