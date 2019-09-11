// dependencies
const express = require('express');
const connect = require('connect-ensure-login');

// models
const User = require('../models/user');
const Bathroom = require('../models/bathroom');
const Review = require('../models/review');

const router = express.Router();

// api endpoints
router.get('/test', function(req, res) {
    res.send('quack');
});

router.get('/whoami', function(req, res) {
    if(req.isAuthenticated()) {
        res.send(req.user);
    }
    else {
        res.send({});
    }
});


router.get('/user', function(req, res) {
    User.findOne({ _id: req.query._id }, function(err, user) {
        res.send(user);
    });
});

router.get('/bathrooms', function(req, res) {
    Bathroom.find({building : req.query.building}, function(err, bathrooms) {
        res.send(bathrooms);
    });
});

// router.post(
//     '/bathroom',
//     connect.ensureLoggedIn(),
//     function(req, res) {
//         const newBathroom = new Bathroom({
//             'name': req.body.name,
//             'mappic': req.body.mappic,
//             'stars': req.body.stars,
//             'building': req.body.building,
//         });
  
//         newBathroom.save(function(err, bathroom) {
//             io.emit("post", {name: req.body.name, mappic: req.body.mappic, stars: req.body.stars});
//             if (err) console.log(err);
//         });
//         res.send({});
//   }
// );

router.get('/review', function(req, res) {
    Review.find({ parent: req.query.parent }, function(err, comments) {
        res.send(comments);
    })
});

router.post(
    '/review',
    connect.ensureLoggedIn(),
    function(req, res) {
        const newReview = new Review({
            'creator_name': req.user.name,
            'content': req.body.content,
            'parent': req.body.parent,
            'stars': req.body.stars,
        });

        newReview.save(function(err, comment) {
            // configure socket
            const io = req.app.get('socketio');
            io.emit("review", { creator_name: req.user.name, content:req.body.content, parent: req.body.parent});
            if (err) console.log(err);
        });
        res.send({});
        res.redirect('/'); 
  }
);
module.exports = router;
