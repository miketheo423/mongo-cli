var mongo = require("mongodb").MongoClient;
var prompt = require("prompt-sync")();
var url = "mongodb://localhost:27017/restaurant_db";

// Prompt for viewing all restaurants
mongo.connect(url, function(err, db){
  var collection = db.collection('restaurants');
  var allChoice = prompt("Type 'all' and press enter to display all restaurants' names: ");
  if(allChoice == "all"){
    collection.find().toArray(function(err, doc){
      console.log(doc);
    });
  } else {
    console.log("Aw, you don't want to see the restaurants?");
  }
});

// Specific restaurant information prompt
mongo.connect(url, function(err, db){
  var collection = db.collection('restaurants');
  var restName = prompt("Type the restaurant's name to display it's information. name: ");
    collection.find({name: restName }).toArray(function(err, doc){
      console.log(doc);
    });
});

	// Prompt for adding restaurants 
mongo.connect(url, function(err, db){
  var collection = db.collection('restaurants');
  var enterName = prompt("Enter the name of your restaurant. name: ");
  var enterStreet = prompt("Enter the street address of your restaurant. street: ");
  var enterZipCode = prompt("Enter the zipcode of your restaurant. zipcode: ");
  var enterWebsite = prompt("Enter the yelp url to your website. url: "); 
    collection.insert(
    	{name: enterName,
    	 address: {street: enterStreet, zipcode: enterZipCode},
    	  yelp: enterWebsite});
});

// Prompt for editing 
mongo.connect(url, function(err, db) {
	var collection = db.collection('restaurants');
	var updateRest = prompt('Enter the name of the restaurant you wish to update. Name: ');
	var updateTrait = prompt('Enter the name of the field you would like to update or add. Field:');
	console.log(updateTrait);
	var updateVal = prompt('Enter the information for the field mentioned above. Info: ');
	collection.update({name: updateRest}, {$set: { updateTrait: updateVal} });
	console.log(updateTrait);
});

// Prompt for deleting
mongo.connect(url, function(err, db) {
	var collection = db.collection('restaurants');
	var deleteRest = prompt('Enter the name of the restaurant you wish to delete. name: ');
		collection.remove({name: deleteRest });
});
