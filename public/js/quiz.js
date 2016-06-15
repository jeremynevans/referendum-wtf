var countdown;
var name;
var score = 0;

var currentRound = -1;
var rounds = [
  // {
  //   question: "Roughly how much do we pay in fees to the EU every week?",
  //   options: [
  //     "£350m",
  //     "£160m",
  //     "£100m"
  //   ],
  //   answer: 1
  // },
  {
    question: "Who is this? <img src='/quiz/nf.png'>",
    options: [
      "Justin Bieber",
      "Nigel Farage",
      "Mr T",
      "Kermit the frog"
    ],
    answer: 1
  },
  {
    question: "What day is the EU referendum?",
    options: [
      "23rd June",
      "30th June",
      "22nd June",
      "7th July"
    ],
    answer: 0
  },
  {
    question: "Where's the European Parliament headquarters?",
    options: [
      "London",
      "Berlin",
      "Brussels",
      "Strasbourg"
    ],
    answer: 2
  },
  {
    question: "How many states are a member of European Union?",
    options: [
      "30",
      "22",
      "19",
      "28"
    ],
    answer: 3
  },
  {
    question: "Can you move across EU borders without a passport?",
    options: [
      "Yes all the time",
      "Sometimes",
      "No, never!"
    ],
    answer: 1
  },
  {
    question: "Who is this? <img src='/quiz/am.png'>",
    options: [
      "Teresa May",
      "Will.I.Am",
      "Angela Merkel",
      "Christine Lagarde"
    ],
    answer: 2
  },
  {
    question: "When did the Euro become a national currency?",
    options: [
      "1999",
      "1992",
      "1972",
      "1990"
    ],
    answer: 0
  },
  {
    question: "Did the UK join the EU during the 1992 Treaty of Maastricht or was it already a member of the European Economic Community?",
    options: [
      "1992 Treaty of Maastricht",
      "Already a member of the European Economic Community"
    ],
    answer: 0
  },
  {
    question: "How many member states use the Euro as their national currency?",
    options: [
      "22",
      "27",
      "19",
      "30"
    ],
    answer: 2
  },
  {
    question: "What is the annual total net migration to the UK?",
    options: [
      "150,000",
      "1,000,000",
      "550,000",
      "300,000"
    ],
    answer: 3
  },
  {
    question: "How many Members of the European Parliament does the UK elect?",
    options: [
      "50",
      "73",
      "28",
      "64"
    ],
    answer: 1
  },
  {
    question: "What’s the spending limit for each side of the campaign?",
    options: [
      "£1 billion",
      "£5 million",
      "£7 million",
      "£2 million"
    ],
    answer: 2
  },
  {
    question: "How much trade do we have with the EU?",
    options: [
      "45% of all UK exports go to the EU",
      "60% of all UK exports go to the EU",
      "25% of all UK exports go to the EU",
      "30% of all UK exports go to the EU"
    ],
    answer: 0
  },
  {
    question: "Who's the president of the Euopean Parliament?",
    options: [
      "David Cameron",
      "Martin Schulz",
      "Jean-Claude Juncker",
      "Federica Mogherini"
    ],
    answer: 1
  },
  {
    question: "Who is this? <img src='/quiz/jcj.png'>",
    options: [
      "David Cameron",
      "Martin Schulz",
      "Federica Mogherini",
      "Jean-Claude Juncker"
    ],
    answer: 3
  }
];

var startQuiz = function() {
  name = $('#myName').val();
  newRound();
}


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
    var resultTemplate = '<div class="result"><img src="/img/eu-wtf.jpg" style="max-width: 60%; margin-top: -20px;"><h3>EU must be joking!</h3><h2 style="color:#ffcc01;">' + name + '</h2><h4>You scored...</h4><p class="score">' + score + '<span>/' + rounds.length + '</span></p><p><span style="color:#ffcc01;">#</span>areEUready</p></div>'
    $('.quiz').html(resultTemplate);
    $('body').css('background', '#003399');
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
    nextButtonMessage = 'And that\'s it <br>- now check out your result!';
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
