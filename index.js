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
    imageFiles = '';
    files.forEach(function(f, i) {
      imageFiles = imageFiles + '"' + f + '", ';
      console.log('Files: ' + f);
    });
    imageFiles = '[' + imageFiles + ']';
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
  response.redirect('/cards/' + request.params.author + '/0/' + request.params.image + '/' + request.params.text);
});

app.get('/cards/:author/:side/:image/:text', function(request, response) {
  var image = request.params.image.replace(/[^a-z0-9\.]/g, '');
  var text = 'FACT: ' + request.params.text;
  var author = request.params.author.replace(/[^a-zA-Z0-9\.]/g, '');
  var side = request.params.side.replace(/[^a-zA-Z0-9\.]/g, '');
  side = (side=='0') ? '' : "I Back #" + side;

  //   Security!!!

  var factMark = client.buildURL("/~text", {
    txt64: text,
    txtfont: 'avenir-black',
    txtalign: 'center',
    txtclr: 'fff',
    txtsize: 30,
    txtlead: 0,
    txtpad: 15,
    bg: '66000000',
    w: 650
  });

  var blendWatermark = 'http://referendum.wtf/img/watermark.png';

  var imageUrl = client.buildURL("/" + image, {
    mark: factMark,
    markalign: 'center,middle',
    txt: side,
    txtfont: 'avenir-black',
    txtalign: 'top, center',
    txtsize: 48,
    txtclr: 'ffcc01',
    txtline: 1,
    txtlineclr: '000',
    txtpad: 40,
    txtshad: 6,
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

  var factMarkIG = client.buildURL("/~text", {
    txt64: text,
    txtfont: 'avenir-black',
    txtalign: 'center',
    txtclr: 'fff',
    txtsize: 48,
    txtlead: 0,
    txtpad: 15,
    bg: '66000000',
    w: 650
  });

  var imageUrlIG = client.buildURL("/" + image, {
    mark: factMarkIG,
    markalign: 'center,middle',
    txt: side,
    txtfont: 'avenir-black',
    txtalign: 'top, center',
    txtsize: 70,
    txtclr: 'ffcc01',
    txtline: 1,
    txtlineclr: '000',
    txtpad: 40,
    txtshad: 6,
    fit: 'crop',
    blend64: blendWatermark,
    bw: 800,
    ba: 'bottom, center',
    balph: 100,
    bm: 'normal',
    // exp: '-3',
    w: 800,
    h: 800
  });


  var cloudinary = require('cloudinary');
  cloudinary.config({
    cloud_name: 'diihpmlbp',
    api_key: '233772981662372',
    api_secret: '5rzlTR49Sc7e5CsVdQ7_uPFWWp8'
  });
  cloudinary.uploader.upload(imageUrl, function(result) {
    imageUrl = result.url;
    var cardUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    var tweet = 'https://twitter.com/intent/tweet?text=I%20just%20made%20an%20EU%20Factogram%20on%20Referendum.wtf!%20%23BrexitOrBromance%3F%20Choose%20your%20allegiance...%20%23EUref%20' + encodeURIComponent(cardUrl) + '&source=webclient';

    response.render('pages/card', { cardUrl: cardUrl, imageUrl: imageUrl, imageUrlIG: imageUrlIG, text: text, author: author, tweet: tweet });
  });



  // var tweet = 'https://twitter.com/intent/tweet?text=I%20just%20made%20an%20EU%20Factogram%20on%20Referendum.wtf%21%20' + encodeURIComponent('http://referendum.wtf/cards/' + encodeURIComponent(author) + '/' + image + '/' + encodeURIComponent(text)) + '&source=webclient';

  // console.log(blendWatermark);

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

app.get('/press-release', function(request, response) {

  var MobileDetect = require('mobile-detect'),
      md = new MobileDetect(request.headers['user-agent']);
      if (md.mobile() == null && md.tablet() == null) {
        var touchscreen = false;
      } else {
        var touchscreen = true;
      }

  response.render('pages/press-release', { imageFiles : imageFiles, touchscreen : touchscreen });
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
