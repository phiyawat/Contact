var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.json());

// enable cross-origin resource sharing very important!!
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", function(req, res) {
  res.send("Hello NodeJS");
});

app.listen(3000);

console.log("My Service is listening to port 3000.");

var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://dbAdmin:p%40ssw0rd@localhost:27017/student";
var ObjectID = require("mongodb").ObjectID;

app.post("/contacts/add", function(req, res) {
  console.log("Now api");
  MongoClient.connect(dbUrl, function(err, db) {
    if (err) res.send(err);
    var id = new ObjectID();
    var data = req.body;

    data["_id"] = id.toHexString();
    db.collection("student").insertOne(data, function(err, result) {
      db.close();
      if (err) res.send(err);
      console.log(result);
      res.send(result);
    });
  });
});

app.get("/contacts/getMany", function(req, res) {
  MongoClient.connect(dbUrl, function(err, db) {
    if (err) res.send(err);
    db.collection("student").find(req.query).toArray(function(err, result) {
      db.close();
      if (err) res.send(err);
      res.send(result);
    });
  });
});
