var express = require('express');
var router = express.Router();
const request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  const url = "http://api.giphy.com/v1/gifs/random?api_key=t5SJVX8GeVmK1drukZ8GqAPZGaDCTHui";
  request.get(url, (err, response, body) => {
    if(err) { console.error(err) }

    body = JSON.parse(body);

    // Add this line to get the .gif's URL from the Giphy response body:
    const imgUrl = body.data.image_url;

    // And pass it to our view as imgUrl:
    res.render('index', { title: 'Make School Giphy', imgUrl: imgUrl });
  });
});

router.get('/search', (req, res, next) => {
  res.render('search');
})

router.post('/search', (req, res, next) => {
  const query = req.body['giphy-query']
  const url = 'http://api.giphy.com/v1/gifs/search?api_key=t5SJVX8GeVmK1drukZ8GqAPZGaDCTHui&q=${query}'
  request.get(url, (err, response, body) => {
    if(err) { console.error(err) }
    body = JSON.parse(body);
    const randomResult = body.data[Math.floor(Math.random() * body.data.length)];
    const searchResultUrl = randomResult.images.fixed_height.url;
    res.render('search', { searchResultUrl: searchResultUrl });
  });
});

module.exports = router;
