var currentQuestion = 0;

var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
var qlength = 0;
var c = 600;
var t;

var questions = [];

$(document).ready(function () {
  var cat = window.location.search.split("?")[1].split("=")[1];
  console.log(cat);
  $(".preButton").attr("disabled", true);
  $(".flag").click(function (e) {
    $(`button#${currentQuestion + 1}.navButton`).css(
      "background-color",
      "	#CD5C5C"
    );

    e.preventDefault();
  });

  //

  $("#submit").click(function (e) {
    if ($("#submit").text() === "Close") {
      window.open("user_dashboard.html", "_self");
    }
    currentQuestion = 0;
    $(".question").text("");
    $(".choiceList").hide();
    c = 600;
    $(".preButton").prop("disabled", false);
    $(".submit").hide();
    // $(document).find(".nextButton").text("Play Again?");
    $(".nextButton").hide();
    viewResults();
  });

  clickEvent(cat);

  $(document).on("click", ".quizContainer > .choiceList ", function () {
    // console.log("click li");

    var val = $("input[type='radio']:checked").val();
    if (val == questions[currentQuestion].correct_option) {
      correctAnswers++;
    }

    console.log("val" + val);
    iSelectedAnswer[currentQuestion] = val;
  });

  function clickEvent(id) {
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/" + cat,
      success: function (res) {
        console.log(id);
        console.log(res);
        res.forEach((items) => {
          // console.log("items" + JSON.stringify(items));
          questions.push(items);
          //  console.log(questions);
        });
        qlength = questions.length;
        console.log("question" + qlength);
      },
      complete: function (data) {
        console.log(data);
        displayCurrentQuestion(currentQuestion);
        navButtons();
      },
      error: (e) => {
        alert("Error" + e);
      },
    });
  }

  $(document).on("click", ".questionNav button", function () {
    currentQuestion = this.id;
    console.log(currentQuestion);
    displayCurrentQuestion(currentQuestion - 1);

    if (qlength === currentQuestion + 1) {
      $(document).find(".nextButton").attr("disabled", true);
      console.log(disabled);
    } else {
      $(document).find(".nextButton").attr("disabled", false);
    }
  });

  // $(this).find(".quizMessage").hide();
  $(this).find(".preButton").attr("disabled", "disabled");

  timedCount();
  hideScore();

  $(this)
    .find(".preButton")
    .on("click", function () {
      if (!quizOver) {
        if (currentQuestion == 0) {
          return false;
        }

        if (currentQuestion == 1) {
          $(".preButton").attr("disabled", "disabled");
        }
        if (currentQuestion + 2 != qlength) {
          $(".nextButton").prop("disabled", false);
        }

        currentQuestion--; // Since we have already displayed the first question on DOM ready
        if (currentQuestion < questions.length) {
          displayCurrentQuestion(currentQuestion);
        }
      }
    });

  // On clicking next, display the next question
  $(this)
    .find(".nextButton")
    .on("click", function () {
      if (!quizOver) {
        // TODO: Remove any message -> not sure if this is efficient to call this each time....
        // $(document).find(".quizMessage").hide();

        if (currentQuestion + 2 == qlength) {
          $(".nextButton").prop("disabled", true);
        }

        currentQuestion++; // Since we have already displayed the first question on DOM ready
        if (currentQuestion >= 1) {
          $(".preButton").prop("disabled", false);
        }

        if (currentQuestion < questions.length) {
          displayCurrentQuestion(currentQuestion);
        } else {
          c = 600;
        }
      } else {
        // quiz is over and clicked the next button (which now displays 'Play Again?'
        quizOver = false;
        $("#iTimeShow").html("Time Remaining:");
        iSelectedAnswer = [];
        $(document).find(".nextButton").text("Next Question");
        $(document).find(".preButton").text("Previous Question");
        $(".preButton").attr("disabled", "disabled");
        resetQuiz();
        //viewingAns = 1;
        displayCurrentQuestion();
        hideScore();
      }
    });
});

function timedCount() {
  if (c == 605) {
    return false;
  }

  var hours = parseInt(c / 3600) % 24;
  var minutes = parseInt(c / 60) % 60;
  var seconds = c % 60;
  var result =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  $("#timer").html(result);

  if (c == 0) {
    displayScore();
    $(document).find(".preButton").text("View Answer");
    $(".preButton").prop("disabled", false);
    $(".submit").hide();
    // $(document).find(".nextButton").text("Play Again?");
    $(".nextButton").hide();
    $("#iTimeShow").html("Quiz Time Completed!");
    $(".question").hide();
    $(".choiceList").hide();
    $(".questionNav").hide();
    c = 605;
    quizOver = true;
    return false;
  }

  if ($("#submit").text() === "Close") {
    $("#timer").text(correctAnswers + " / 10");
    if (correctAnswers <= 3) {
      $("#timer").css("color", "red");
    } else if (correctAnswers > 3 && correctAnswers <= 7) {
      $("#timer").css("color", "orange");
    } else {
      $("#timer").css("color", "green");
    }

    // $("#timer").attr("font-size","30px")
  } else {
    c = c - 1;
  }
  t = setTimeout(function () {
    timedCount();
  }, 1000);
}

// This displays the current question AND the choices
function displayCurrentQuestion(currentQuestion) {
  console.log(
    "display current question called" +
      currentQuestion +
      " " +
      questions[currentQuestion].question
  );

  var question = questions[currentQuestion].question;
  let qnum = currentQuestion + 1;

  var questionClass = $(document).find(".quizContainer > .question");
  $(questionClass).text(qnum + ".  " + question);
  var choiceList = $(document).find(".quizContainer > .choiceList");

  $(choiceList).find("li").remove();
  //var choice="hii";
  choice1 = [];
  var option_1 = questions[currentQuestion].option_1;
  var option_2 = questions[currentQuestion].option_2;
  var option_3 = questions[currentQuestion].option_3;
  var option_4 = questions[currentQuestion].option_4;
  choice1.push(option_1);
  choice1.push(option_2);
  choice1.push(option_3);
  choice1.push(option_4);

  for (var i = 0; i < 4; i++) {
    $(
      '<li><input type="radio" class="radio-inline" value=' +
        (i + 1) +
        ' name="dynradio" />' +
        " " +
        choice1[i] +
        "</li>"
    ).appendTo(choiceList);
  }
}

function displayScore() {
  alert("You scored: " + correctAnswers + " out of: " + questions.length);
}

function hideScore() {
  $(document).find(".result").hide();
}

// This displays the current question AND the choices
function viewResults() {
  $(".btns").hide();
  $(".flag").hide();
  $(".preButton").hide();
  $(".nextButton").hide();
  $("#submit").text("Close");
  console.log("c  " + c);

  if (currentQuestion == 10) {
    currentQuestion = 0;
    return false;
  }

  $(".question").show();
  hideScore();

  console.log("qlength" + qlength);
  for (var j = 0; j < qlength; j++) {
    var question = questions[currentQuestion].question;
    choice = [];
    var option_1 = questions[currentQuestion].option_1;
    var option_2 = questions[currentQuestion].option_2;
    var option_3 = questions[currentQuestion].option_3;
    var option_4 = questions[currentQuestion].option_4;
    choice.push(option_1);
    choice.push(option_2);
    choice.push(option_3);
    choice.push(option_4);

    $(".question").append(
      "<div>" + question + '</div><ul id="result_ul" style="list-style:none;">'
    );
    for (var i = 0; i < 4; i++) {
      //  console.log("choice[i]" + choice[i]);

      if (iSelectedAnswer[currentQuestion] == i + 1) {
        if (questions[currentQuestion].correct_option == i + 1) {
          $(".question").append(
            '<li style="border:2px solid green;margin-top:10px;">' +
              " " +
              choice[i] +
              "</li>"
          );
        } else {
          // console.log("red")
          $(".question").append(
            '<li style="border:2px solid red;margin-top:10px;">' +
              " " +
              choice[i] +
              "</li>"
          );
        }
      } else {
        if (questions[currentQuestion].correct_option == i + 1) {
          $(".question").append(
            '<li style="border:2px solid green;margin-top:10px;">' +
              " " +
              choice[i] +
              "</li>"
          );
        } else {
          $(".question").append("<li>" + " " + choice[i] + "</li>");
        }
      }
    }

    $(".question").append("</ul><hr>");
    currentQuestion++;
    //console.log("incrementing.."+currentQuestion++)
  }
}

function navButtons() {
  for (var i = 1; i < qlength + 1; i++) {
    $(".questionNav").append(`<button class="navButton" id=${i}>${i}</button`);
  }
}
