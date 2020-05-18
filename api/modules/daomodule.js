var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
exports.createUsersColetion = function (){
    MongoClient.connect(url , { useNewUrlParser: true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.createCollection("users", function(err, res) {
          if (err) throw err;
          console.log("Users Collection created!");
          db.close();
        });
      }); 
};

exports.createUsers = function (users){
    MongoClient.connect(url, { useNewUrlParser: true } , function(err, db ) {
        if(err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("users").insertMany(users, function(err, res){
            if(err) throw err;
            db.close();
        });
    });
}

exports.dbGetAllUsers = function (callback){
    MongoClient.connect(url , { useNewUrlParser: true } , function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("users").find({}).toArray(function(err, result) {
            if(err)
            {
              callback(err,null);
            }
            if(result){
                db.close();
                callback(null,result);
            }            
        });
    });
};
