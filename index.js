var express = require('express');
var app = express();

var ImgixClient = require('imgix-core-js');
var client = new ImgixClient({
  host: "referendum-wtf.imgix.net",
  secureURLToken: "KuKMWSurQr6lFYsX"
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
  var image = request.params.image.replace(/[^a-z\.]/g, '');
  var text = request.params.text;
  var author = request.params.author;

  // var authorMark = client.buildURL("/~text", {
  //
  // });

  var factMark = client.buildURL("/~text", {
    txt64: text,
    txtfont: 'avenir-black',
    txtalign: 'center',
    txtclr: 'fff',
    txtsize: 24,
    txtlead: 0,
    txtpad: 15,
    bg: '66003399',
    w: 500
  });

  var blendWatermark = 'http://referendum.wtf/img/generate/watermark.png';
  var blendWatermark = '/watermark.png';

  var imageUrl = client.buildURL("/" + image, {
    mark: factMark,
    markalign: 'center,middle',
    txt: 'Created by ' + author,
    txtalign: 'center%2Cbottom',
    txtsize: 20,
    txtclr: 'fff',
    txtpad: 90,
    // txtlineclr: 'ffffff',
    // txtline: 1,
    txtshad: 10,
    fit: 'crop',
    blend64: blendWatermark,
    bw: 600,
    ba: 'bottom, center',
    balph: 100,
    bm: 'normal',
    // exp: '-3',
    w: 600,
    h: 400
  });

  // console.log(blendWatermark);

  var tweet = 'https://twitter.com/intent/tweet?text=%23AreEUReady%20for%20the%20Referendum%3F%20Thought%20not%2C%20so%20check%20out%20referendum.wtf%20...%21%20' + encodeURIComponent('http://referendum.wtf/cards/' + image + '/' + encodeURIComponent(text)) + '&source=webclient';

  response.render('pages/card', { imageUrl: imageUrl, text: text, tweet: tweet, blendWatermark: blendWatermark });

// var textUrl = 'https://assets.imgix.net/~text64?w=500&txtclr=fff&txt64=' + textFixed + '&txtsize=24&txtlead=0&txtpad=15&bg=80002228&txtfont=Avenir-Heavy';
// var imageUrl = 'https://referendum-wtf.imgix.net/' + encodeURIComponent(image) + '?txtsize=14&txtclr=ff0&txtalign=center%2Cbottom&txt64=' + encodeURIComponent(new Buffer(brand).toString('base64')) + '&txtfont64=SGVsdmV0aWNhTmV1ZS1NZWRpdW0&markalign=center%2Cmiddle&mark64=' + textUrl + '&fit=crop&exp=-3&w=600';
/*
  //Security
  var brand = 'Referendum.wtf'
  var textFixed = text.replace(/[^\x00-\x7F]/g, "").trim();
  var textUrl = 'https://assets.imgix.net/~text64?w=500&txtclr=fff&txt64=' + textFixed + '&txtsize=24&txtlead=0&txtpad=15&bg=80002228&txtfont=Avenir-Heavy';
  // var imageUrl = 'https://referendum-wtf.imgix.net/' + encodeURIComponent(image) + '?txtsize=14&txtclr=ff0&txtalign=center%2Cbottom&txt64=' + encodeURIComponent(new Buffer(brand).toString('base64')) + '&txtfont64=SGVsdmV0aWNhTmV1ZS1NZWRpdW0&markalign=center%2Cmiddle&mark64=' + encodeURIComponent(new Buffer(textUrl).toString('base64')) + '&fit=crop&exp=-3&w=600';
  var watermark = 'https://assets.imgix.net/~text?txt64=RVZFTiBUSEUgQUxMLVBPV0VSRlVMIFBPSU5USU5HIEhBUyBOTyBDT05UUk9MIEFCT1VUIFRIRSBCTElORCBURVhUUw&bg=dd0AAFE2&txtclr=fff&txtsize=28&w=500&txtpad=20&txtfont=avenir-black&txtalign=center';
  var watermark64 = encodeURIComponent(new Buffer(watermark).toString('base64'));
  var imageUrl = 'https://referendum-wtf.imgix.net/' + encodeURIComponent(image) + '?txtsize=14&txtclr=ff0&txtalign=center%2Cbottom&txt64=' + encodeURIComponent(new Buffer(brand).toString('base64')) + '&txtfont64=SGVsdmV0aWNhTmV1ZS1NZWRpdW0&markalign=center%2Cmiddle&mark64=' + textUrl + '&fit=crop&exp=-3&w=600';
  var tweet = 'https://twitter.com/intent/tweet?text=%23AreEUReady%20for%20the%20Referendum%3F%20Thought%20not%2C%20so%20check%20out%20referendum.wtf%20...%21%20' + encodeURIComponent('http://referendum.wtf/cards/' + image + '/' + encodeURIComponent(text)) + '&source=webclient';
  response.render('pages/card', { imageUrl: textUrl, text: text, tweet: tweet });
*/
});

app.get('/issues', function(request, response) {
  response.render('pages/issues1');
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
