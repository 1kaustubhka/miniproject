var currentQuestion = 0; //Indexing current question fetched(Used in showing the quiz)
var correctAnswers = 0; //Number of correct answers
var quizOver = false; //For checking if quiz is over or not.
var selectedAnswer = []; //Storing the selected answers checked by user.
var qlength = 0; //Quiz length
var quizTime = 900; //Quiz time variable
var t;
var flagValue = false; //For flagging a question
var questions = []; //Storing the questions
var cat;
$(document).ready(function () {
  cat = window.location.search.split("?")[1].split("=")[1];
  $(".pushdata").hide();
  $(".preButton").attr("disabled", true);
  $(".flag").click(function (e) {
    flagValue = true;
    $(`button#${currentQuestion + 1}.navButton`).css(
      "background-color",
      "	#CD5C5C"
    );
    e.preventDefault();
  });

  $("#submit").click(function () {
    var checkConfirm = confirm("Do you want to Close?");
    if (checkConfirm == true) {
      $("#quizback").attr("class", "col-sm-12");
      if ($("#submit").text() === "Close") window.close();
      currentQuestion = 0;
      $(".question").text("");
      $(".choiceList").hide();
      $(".preButton").prop("disabled", false);
      $(".submit").hide();
      $(".nextButton").hide();
      viewResults();
    }
  });

  clickEvent(cat);

  $(document).on("click", ".quizContainer > .choiceList ", function () {
    var checkedOption = $("input[type='radio']:checked").val();
    if (checkedOption == questions[currentQuestion].correct_option) {
      correctAnswers++;
    }
    selectedAnswer[currentQuestion] = checkedOption;
  });

  function clickEvent(id) {
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/questions",
      success: function (res) {
        res.forEach((items) => {
          if (items.cat == cat) {
            questions.push(items);
          }
        });
        qlength = questions.length;
      },
      complete: function (data) {
        displayCurrentQuestion(currentQuestion);
        navButtons();
      },
      error: (e) => {
        console.log("Error" + e);
      },
    });
  }

  $(document).on("click", ".questionNav button", function () {
    currentQuestion = this.id;
    displayCurrentQuestion(currentQuestion - 1);

    //Change the flag value.
    if ((flagValue = true)) {
      flagValue = false;
      $(`button#${currentQuestion}.navButton`).css(
        "background-color",
        "rgb(153, 156, 221)"
      );
    }

    if (qlength === currentQuestion + 1) {
      $(document).find(".nextButton").attr("disabled", true);
    } else {
      $(document).find(".nextButton").attr("disabled", false);
    }
  });
  $(this).find(".preButton").attr("disabled", "disabled");

  timedCount();
  hideScore();

  $(this)
    .find(".preButton")
    .on("click", function () {
      if (!quizOver) {
        if (currentQuestion == 0) return false;

        if (currentQuestion == 1) $(".preButton").attr("disabled", "disabled");

        if (currentQuestion + 2 != qlength)
          $(".nextButton").prop("disabled", false);

        currentQuestion--; // Since we have already displayed the first question on DOM ready
        if (currentQuestion < questions.length)
          displayCurrentQuestion(currentQuestion);
      }
    });

  // On clicking next, display the next question
  $(this)
    .find(".nextButton")
    .on("click", function () {
      if (!quizOver) {
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
          quizTime = 600;
        }
      } else {
        quizOver = false;
        $("#iTimeShow").html("Time Remaining:");
        selectedAnswer = [];
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
  if (quizTime == 300) alert(quizTime / 60 + " minutes remaining.");
  var hours = parseInt(quizTime / 3600) % 24;
  var minutes = parseInt(quizTime / 60) % 60;
  var seconds = quizTime % 60;
  var result =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
  $("#timer").html(result);

  if (quizTime == 0) {
    alert("Your time is up.");
    displayScore();
    $(document).find(".preButton").text("View Answer");
    $(".preButton").prop("disabled", false);
    $(".submit").hide();
    $(".nextButton").hide();
    $("#iTimeShow").html("Quiz Time Completed!");
    $(".question").hide();
    $(".choiceList").hide();
    $(".questionNav").hide();
    quizTime = 605;
    quizOver = true;
    return false;
  }
  if ($("#submit").text() === "Close") {
    //$("#timer").hide();
    $("#score").text(correctAnswers + " /" + questions.length);
  } else {
    quizTime = quizTime - 1;
    t = setTimeout(function () {
      timedCount();
    }, 1000);
  }
}

if ($("#submit").text() === "Close") {
  //$("#timer").hide();
  $("#score").text(correctAnswers + " /" + questions.length);
}

// This displays the current question AND the choices
function displayCurrentQuestion(currentQuestion) {
  var question = questions[currentQuestion].question;
  let qnum = currentQuestion + 1;

  var selectedOption = selectedAnswer[currentQuestion];

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
    if (i == selectedOption - 1) {
      $(
        '<li><input type="radio" class="radio-inline" value=' +
          (i + 1) +
          ' name="dynradio" checked/>' +
          " " +
          choice1[i] +
          "</li>"
      ).appendTo(choiceList);
    } else {
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
}

function displayScore() {
  $("#score").text(correctAnswers + "/" + questions.length);
  if ((correctAnswers / questions.length) * 100 < 35) {
    $("#score").css("color", "red");
  } else if ((correctAnswers / questions.length) * 100 < 65) {
    $("#score").css("color", "orange");
  } else {
    $("#score").css("color", "green");
  }
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
  $("#timer").hide();
  $("#score").show();
  $(".pushdata").show()
  $("#submit").text("Close");
  $("#submit").css("bottom", "5%");
  $("#quizback").attr("class", "col-sm-12");
  $("#heading").text("RESULT");

  $(".question").show();
  displayScore();

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
      if (selectedAnswer[currentQuestion] == i + 1) {
        if (questions[currentQuestion].correct_option == i + 1) {
          $(".question").append(
            '<li style="border:2px solid green;margin-top:10px;">' +
              " " +
              choice[i] +
              "</li>"
          );
        } else {
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
            '<li style="border:2px solid green ;margin-top:10px; background-color:lightgray">' +
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
  }
}

function navButtons() {
  for (var i = 1; i < qlength + 1; i++) {
    $(".questionNav").append(`<button class="navButton" id=${i}>${i}</button`);
  }
}

$(document).on("click", ".pushdata", function (e) {
  alert("data-pushing")
  var userid = sessionStorage.getItem("userid");

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + "/" + mm + "/" + yyyy;

 // email = "xyz@gmail.com";

  $.ajax({
    method: "GET",
    url: "http://localhost:3000/user/"+userid,
    async: false,
    success: function (result) {
      result.forEach(function (userData) {
        if (userid === userData.id) {
          var $categoryData = JSON.parse(userData.category);

          if ($categoryData[cat] == undefined) {
            $categoryData[cat] = [];
          }

          $categoryData[cat][$categoryData[cat].length] = {
            score: correctAnswers,
            date: today,
          };
          userData["category"] = JSON.stringify($categoryData);
          e.preventDefault();
          $.ajax({
            method: "PUT",
            async: false,
            url: "http://localhost:3000/user/" + userData.id,
            data: userData,
          });
        }
      });
    },
    complete: () => {
      window.open("user_dashboard.html", "_self");
    },
  });
  e.preventDefault();
});
