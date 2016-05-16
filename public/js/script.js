var myData;

$.doctop({
  url: '//docs.google.com/document/d/15oMHuBNX4CTMvaAm7piTaWVwpc8kaO0bDLg190p5Qdc/pub',
  archieml: true,
  cache: false,
  callback: function(d){
      console.dir(d);
      myData = d.copy.archie.sections;
      console.log(myData);
      getAllPanelsHTML(myData);
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
  $.each(data.subsections, function(i, e) {
    subsectionsHTML += getSubsectionHTML(e);
  });
  subsectionsHTML = '<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">' + subsectionsHTML + '</div>';
  // var firstBit = i==0 ? ' in active' : '';
  // var panelHTML = '<div role="tabpanel" class="tab-pane fade' + firstBit + '" id="' + data.id + '1"><p>' + intro + inOut + '</p></div>';
  var panelHTML = '<p>' + intro + '</p>' + inOut + subsectionsHTML;
  $('#' + data.id + '1').html(panelHTML);
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

var getSubsectionHTML = function(data) {
  var intro = boldify(data.intro[0].value);
  var inOut = getSubsectionInOutHTML(data);
  // var firstBit = i==0 ? ' in active' : '';
  var panelHTML = '<div class="panel panel-default"><div class="panel-heading" role="tab" id="heading' + data.id + '"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse' + data.id + '"prices" aria-expanded="false" aria-controls="collapseprices' + data.id + '" class="collapsed">' + data.title[0].value + '</a></h4></div> <div id="collapse' + data.id + '" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading' + data.id + '"><div class="panel-body">' + intro + inOut + '</div></div></div>';
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
  var bolded = text.replace(/\*([^*]+?)\*/g, "<b>$1<\/b>");
  return bolded;
}
