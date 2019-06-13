const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const posts = require('./posts');

app.use(cors())

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.json(posts);
});

app.put('/update/:post', function(req, res) {
  const index = posts.findIndex(post => post.id === +req.params.post);
  posts[index] = req.body;
  res.json({status: 'ok'});
});

app.put('/create/', function(req, res) {
  posts.push(req.body);
  res.json({status: 'ok'});
});

app.delete('/delete/:post', function(req, res) {
  const index = posts.findIndex(post => post.id === +req.params.post);
  posts.splice(index, 1);
  res.json({status: 'ok'});
});

app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});