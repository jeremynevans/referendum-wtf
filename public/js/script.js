var myData;
var notLoaded = true;

$.doctop({
  url: 'https://docs.google.com/document/d/15oMHuBNX4CTMvaAm7piTaWVwpc8kaO0bDLg190p5Qdc/pub',
  archieml: true,
  cache: false,
  callback: function(d){
    if (notLoaded) {
      notLoaded = false;
      myData = d.copy.archie.sections;
      console.log(myData);
      getAllPanelsHTML(myData);
    }
  }
});

var getAllPanelsHTML = function(data) {
  // $('.tab-content').html('');
  $.each(data, function(i, e) {
    var panelHTML = getPanelHTML(i, e);
    // $('.tab-content').append(panelHTML);
  });
};

var getPanelHTML = function(i, data) {
  var intro = boldify(data.intro[0].value);
  var inOut = getInOutHTML(data);
  var subsectionsHTML = '';
  var subsectionsHTML1 = '';
  $.each(data.subsections, function(i, e) {
    subsectionsHTML += getSubsectionHTML(e, '');
    subsectionsHTML1 += getSubsectionHTML(e, '1');
  });
  subsectionsHTML = '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">' + subsectionsHTML + '</div>';
  subsectionsHTML1 = '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">' + subsectionsHTML1 + '</div>';
  // var firstBit = i==0 ? ' in active' : '';
  // var panelHTML = '<div role="tabpanel" class="tab-pane fade' + firstBit + '" id="' + data.id + '1"><p>' + intro + inOut + '</p></div>';
  var panelHTML = '<p>' + intro + '</p>' + inOut + subsectionsHTML;
  var panelHTML1 = '<p>' + intro + '</p>' + inOut + subsectionsHTML1;
  $('#' + data.id + '1').html(panelHTML1);
  $('#' + data.id).html(panelHTML);
  // $('.panel-title a').click(function() {
    // console.log(this.getAttribute('href'));
    // $(this.getAttribute('href')).
  // })
  return panelHTML;
};

var getInOutHTML = function(data) {
  var allInOutHTML = '';
  var inHTML = '';
  var outHTML = '';
  $.each(data.in, function(i, e) {
    inHTML += '<li>' + boldify(e.bullet) + '</li>';
  });
  $.each(data.out, function(i, e) {
    outHTML += '<li>' + boldify(e.bullet) + '</li>';
  });
  inHTML = '<div class="in"><h3>In</h3><ul>' + inHTML + '</ul></div>';
  outHTML = '<div class="out"><h3>Out</h3><ul>' + outHTML + '</ul></div>';
  inOutHTML = '<div class="in-out">' + inHTML + outHTML + '</div>';
  return inOutHTML;
};

var getSubsectionHTML = function(data, desktop) {
  var intro = boldify(data.intro[0].value);
  var inOut = getSubsectionInOutHTML(data, desktop);
  var comingsoon = '<div class="coming-soon"><h3>⌛ This section is coming&nbsp;soon..! ⌛</h3><h4>🙈 🙉 🙊 Don\'t miss out on getting involved - <b>help us</b> 📝 <b>write this section</b>! 📨 Email <a href="mailto:FOMO@referendum.wtf">FOMO@referendum.wtf</a></h4></div>'
  // data.comingsoon = false; //temporary
  var content = data.comingsoon ? comingsoon : intro + inOut;
  // var firstBit = i==0 ? ' in active' : '';
  var panelHTML = '<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading' + data.id + desktop + '"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse' + data.id + desktop + '"prices" aria-expanded="false" aria-controls="collapse' + data.id + desktop + '" class="collapsed subsection-heading">' + data.title[0].value + '</a></h4></div> <div id="collapse' + data.id + desktop + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + data.id + desktop + '"><div class="panel-body">' + content + '</div></div></div>';
  // var panelHTML = '<p>' + intro + inOut + '</p>';
  // $('#subsection-' + data.id + '1').html(panelHTML);
  // $('#subsection-' + data.id).html(panelHTML);
  return panelHTML;
}

var getSubsectionInOutHTML = function(data) {
  var allInOutHTML = '';
  var inHTML = '';
  var outHTML = '';
  $.each(data.in, function(i, e) {
    inHTML += '<li>' + boldify(e.bullet) + '</li>';
  });
  $.each(data.out, function(i, e) {
    outHTML += '<li>' + boldify(e.bullet) + '</li>';
  });
  inHTML = '<div class="in"><h3>In</h3><ul>' + inHTML + '</ul></div>';
  outHTML = '<div class="out"><h3>Out</h3><ul>' + outHTML + '</ul></div>';
  inOutHTML = '<div class="in-out">' + inHTML + outHTML + '</div>';
  return inOutHTML;
};

var boldify = function(text) {
  // bolded=text.replace(/\*.+\*/gi, function myFunction(x){return '<b>' + x + '</b>';});
  // bolded = bolded.replace(/\*/gi, "");
  // var bolded = !text.length ? text : text.replace(/\*\*([^*]+?)\*\*/g, '<div class="bullet-heading">$1<\/div>')
  //                                 .replace(/\*([^*]+?)\*/g, '<b>$1<\/b>');
  var bolded = !text.length ? text : text.replace(/\*\*([^*]+?)\*\*/g, '<div class="bullet-heading">$1<\/div><br>')
                                  .replace(/\*([^*]+?)\*/g, '$1');
  var bolded = removeSplitLinks(bolded);
  return bolded;
}

var removeSplitLinks = function(text) {
  if (typeof text == "string") {
    var removed = text.replace(/<\/a><a href=\"#[0-9]*\">/g,'');
  }
  return removed;
}


setTimeout(function() {
  if (notLoaded) {
    console.log('Using backup data')
    notLoaded = false;
    myData = backupMyData;
    console.log(myData);
    getAllPanelsHTML(myData);
    // var whoops = '<div class="coming-soon"><h3>😳 Well, this is awkward..! 😳</h3><h4>🙈 🙉 🙊 We seem to have failed to load much here - <b>please help us figure out why</b>! 📨 Email <a href="mailto:whoops@referendum.wtf">whoops@referendum.wtf</a></h4></div>'
    // $('.tab-pane').html(whoops);
    // $('.tab-content').html(whoops);
  }
}, 4000)




$('body').on('click', '.tab-content a:not(.subsection-heading)', function() {
  var key = $(this).attr('href').split('#')[1];
  console.log(key);
  try {
         // Post message to the preview pane to let it now saving worked
         if (window.frames['explaain'].postMessage) {
           // e.g. Safari
           window.frames['explaain'].postMessage({ action: 'open', id: key }, "*");
         } else if (window.frames['explaain'].contentWindow.postMessage) {
           // e.g. Chrome, Firefox
           window.frames['explaain'].contentWindow.postMessage({ action: 'open', id: key }, "*");
         }
       } catch (e) {
         console.log(e);
       }
});

$('.explaain-container').css('height', $(window).height());
$(document).scroll(function() {
  if ($(document).scrollTop() > 160) {
    $('.explaain-container').addClass('sticky');
  } else {
    $('.explaain-container').removeClass('sticky');
  }
});
