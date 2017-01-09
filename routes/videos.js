var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('mongodb://noel_test:test123@ds157268.mlab.com:57268/vidzy',['videos']);
// var db = monk('localhost:27017/vidzy');

router.get('/', function(req, res) {
    var collection = db.get('videos');
    collection.find({}, function(err, videos){
        if (err) throw err;
      	res.json(videos);
    });
});

module.exports = router;