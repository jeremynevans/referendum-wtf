var express = require('express');
var app = express();

var ImgixClient = require('imgix-core-js');
var client = new ImgixClient({
  host: "referendum-wtf.imgix.net",
  secureURLToken: "KuKMWSurQr6lFYsX"
});

var imageFiles = [];
var fs = require('fs');
fs.readdir(__dirname + '/public/img/generate', function(err, files) {
    if (err) return;
    imageFiles = files;
    files.forEach(function(f) {
        console.log('Files: ' + f);
    });
});




app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/cards/:author/:image/:text', function(request, response) {
  var image = request.params.image.replace(/[^a-z0-9\.]/g, '');
  var text = request.params.text;
  var author = request.params.author.replace(/[^a-zA-Z0-9\.]/g, '');

  //   Security!!!

  var factMark = client.buildURL("/~text", {
    txt64: text,
    txtfont: 'avenir-black',
    txtalign: 'center',
    txtclr: 'fff',
    txtsize: 32,
    txtlead: 0,
    txtpad: 15,
    bg: '66000000',
    w: 650
  });

  var blendWatermark = '/img/watermark.png';

  var imageUrl = client.buildURL("/" + image, {
    mark: factMark,
    markalign: 'center,middle',
    // txt: author + '`s Factogram:',
    // txtalign: 'top, center',
    // txtsize: 24,
    // txtclr: 'fff',
    // txtpad: 30,
    // txtshad: 10,
    fit: 'crop',
    blend64: blendWatermark,
    bw: 800,
    ba: 'bottom, center',
    balph: 100,
    bm: 'normal',
    // exp: '-3',
    w: 800,
    h: 380
  });


  // var tweet = 'https://twitter.com/intent/tweet?text=I%20just%20made%20an%20EU%20Factogram%20on%20Referendum.wtf%21%20' + encodeURIComponent('http://referendum.wtf/cards/' + encodeURIComponent(author) + '/' + image + '/' + encodeURIComponent(text)) + '&source=webclient';

  // console.log(blendWatermark);
  var cardUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
  var tweet = 'https://twitter.com/intent/tweet?text=I%20just%20made%20an%20EU%20Factogram%20on%20Referendum.wtf%21%20' + encodeURIComponent(cardUrl) + '&source=webclient';

  response.render('pages/card', { cardUrl: cardUrl, imageUrl: imageUrl, text: text, author: author, tweet: tweet });

});

app.get('/issues', function(request, response) {

  var MobileDetect = require('mobile-detect'),
      md = new MobileDetect(request.headers['user-agent']);
      if (md.mobile() == null && md.tablet() == null) {
        var touchscreen = false;
      } else {
        var touchscreen = true;
      }

  response.render('pages/issues1', { imageFiles : imageFiles, touchscreen : touchscreen });
});

app.get('/quiz', function(request, response) {
  response.render('pages/quiz');
});

app.get('/issues_old', function(request, response) {
  response.render('pages/issues');
});

// app.get('/issues3', function(request, response) {
//   response.render('pages/issues3');
// });

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
