var countdown;

var score = 0;

var currentRound = -1;
var rounds = [
  {
    question: "Roughly how much do we pay in fees to the EU every week?",
    options: [
      "£350m",
      "£160m",
      "£100m"
    ],
    answer: 1
  },
  {
    question: "Second question",
    options: [
      "£1m",
      "£2m",
      "£3m"
    ],
    answer: 0
  }
];

var newRound = function() {
  if (currentRound+1 < rounds.length) {
    round = currentRound + 1;
    currentRound++;
    var optionsHTML = '';
    $.each(rounds[round].options, function(i, option) {
      optionsHTML = optionsHTML + '<button class="btn btn-default btn-lg btn-block option-button" data-option="' + i + '">' + option + '</li>';
    });
    var roundTemplate = '<div class="round"><h3>' + rounds[round].question + '</h3><div class="countdown"></div><div class="options">' + optionsHTML + '</div></div>';
    $('.quiz').html(roundTemplate);
    countdownInit();
  } else {
    var resultTemplate = '<div class="result"><h3>EU must be joking!</h3><h4>You scored...</h4><p class="score">' + score + '<span>/' + rounds.length + '</span></p></div>'
    $('.quiz').html(resultTemplate);
  }
};

var submitAnswer = function(thisButton) {
  countdown.stop();
  $('.quiz .options').addClass('inactive');
  var submission = parseInt(thisButton.data('option'));
  console.log(submission);
  var answer = rounds[round].answer;
  if (answer == submission) {
    score++;
    thisButton.addClass('btn-success');
  } else {
    thisButton.addClass('btn-danger');
    $('.quiz').find('.option-button[data-option=' + answer + ']').addClass('btn-success');
  }
  var nextButtonMessage;
  if (currentRound+1 < rounds.length) {
    nextButtonMessage = 'Go to question ' + (currentRound+2);
  } else {
    nextButtonMessage = 'And that\'s it - now check out your result!';
  }
  $('.quiz').append('<hr><button class="btn btn-primary btn-lg btn-block" onclick="newRound()">' + nextButtonMessage + '</button>');
  // newRound(round + 1);
};


$('.quiz').on('click', 'button.option-button', function() {
  submitAnswer($(this));
});



var countdownInit = function() {
  countdown = $(".countdown").countdown360({
    radius: 60,
    seconds: 10,
    label: ['sec', 'secs'],
    fontColor: '#003399',
    fillStyle   : '#ffcc01',
    strokeStyle : '#003399',
    autostart: false,
    onComplete: function () {
      $('.quiz .options').addClass('inactive');
      $('.outOfTimeModal').modal();
    }
  });

  countdown.start();
}
