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
        genre:req.body.genre,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

// get a particular record based on the ID
router.get('/:id', function(req, res) {
    var collection = db.get('videos');
    collection.findOne({ _id: req.params.id }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

// edit
router.put('/:id', function(req, res){
    var collection = db.get('videos');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        genre:req.body.genre,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

router.delete('/:id', function(req, res){
    var collection = db.get('videos');
    collection.delete({ _id: req.params.id }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});

module.exports = router;