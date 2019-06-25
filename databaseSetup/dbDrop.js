let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/";


function dropStoreDatabase () {

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("Store");
        dbo.dropDatabase(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Database " + dbo.s.databaseName + " deleted");
            db.close();
        });
    });
}

function dropTestStoreDatabase () {
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("StoreTest");
        dbo.dropDatabase(function(err, delOK) {
            //console.log(db.db)
            if (err) throw err;
            if (delOK) console.log("Database " + dbo.s.databaseName + " deleted");
            db.close();
        });
    });
}

dropStoreDatabase ();
dropTestStoreDatabase ();