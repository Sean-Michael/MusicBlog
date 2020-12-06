/*
 * Name: Ryan Jeffrey
 * Email: jeffrrya@oregonstate.edu
 */

var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'index' }));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));



/* Look for single post page */
app.get('/posts/:index', function(req, res, next) {
    let postI = parseInt(req.params.index);
    if(isNaN(postI) || postI < 0 || postI > 7)
    {
        next();
    }
    else
    {
        res.status(200).render('postPage', {
            posts: [ defaultPosts[postI] ],
        });
    }
});

/* index.html generation. */
app.get('/', function (req, res) {
    res.status(200).render('index', {
        posts: defaultPosts,
    });
});


/* Templatize 404.html */
app.get('*', function (req, res) {
    res.status(404).render('404', {
    });
});

/* Port message */
app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
