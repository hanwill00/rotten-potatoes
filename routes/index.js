var express = require('express');
var router = express.Router();
// 1
const Review = require('../models/review');

router.get('/', (req, res) => {
  Review.find({}, (err, reviews) => {
    if(err) {
      console.log(err);
    }

    res.render('reviews/index', {
      reviews:reviews
    });
  });
});

router.get('/reviews/new', (req, res) => {
  res.render('reviews/new');
});

router.post('/reviews', (req, res) => {
  // 2
  const review = new Review(req.body);

  // 3
  review.save(function(err, review) {
    if (err) {
      console.log(err);
    }

    // 4
    return res.redirect('/reviews/' + review._id);
  });
});

router.get('/reviews/:id', (req, res) => {
  // 2
  Review.findById(req.params.id, (err, review) => {
    if (err) {
      console.log(err);
    }

    // 3
    res.render('reviews/show', {
      review: review
    });
  });
});


// create new route below


module.exports = router;
