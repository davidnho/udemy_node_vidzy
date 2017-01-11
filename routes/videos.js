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

// add videos
router.post('/', function(req, res){
    var collection = db.get('videos');
    collection.insert({
        title: req.body.title,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
})
module.exports = router;