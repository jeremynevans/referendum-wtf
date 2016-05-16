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
    console.log(i);
    console.log(e);
    console.log($('#' + e.id + '1'));
    // $('.tab-content').append(panelHTML);
  });
};

var getPanelHTML = function(i, data) {
  var intro = boldify(data.intro[0].value);
  var inOut = getInOutHTML(data);
  // var firstBit = i==0 ? ' in active' : '';
  // var panelHTML = '<div role="tabpanel" class="tab-pane fade' + firstBit + '" id="' + data.id + '1"><p>' + intro + inOut + '</p></div>';
  var panelHTML = '<p>' + intro + inOut + '</p>';
  // $('#' + data.id + '1').html('hi');
  // $('#' + data.id + '1').html(panelHTML);
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

var boldify = function(text) {
  // bolded=text.replace(/\*.+\*/gi, function myFunction(x){return '<b>' + x + '</b>';});
  // bolded = bolded.replace(/\*/gi, "");
  var bolded = text.replace(/\*([^*]+?)\*/g, "<b>$1<\/b>");
  return bolded;
}
