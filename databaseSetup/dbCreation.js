let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";

function createStoreDatabase () {

	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		let dbo = db.db("Store");
		let entries =  [{
			name : 'Computer 1',
			price : 1200,
			available: true,
			dateCreated:'Mon Oct 03 2016 15:22:08 GMT+0200 (CEST)'
		},
		{
			name : 'Computer 2',
			price : 1300,
			available: false,
			dateCreated:'Mon Oct 03 2016 15:22:08 GMT+0200 (CEST)'
		}];
		let count = 0;
		entries.forEach ((element) => {
			dbo.collection("products").insertOne(element, function(err, res) {
			if (err) throw err;
			})
			count ++
		});
		console.log("Database " + dbo.s.databaseName + " created and " + count + " documents inserted");
		db.close();
	});
}

createStoreDatabase ();