var questions = [
    {
      id: 1,
      question: " Which of the following is correct about JavaScript?",
      answer: " All of the above",
      options: [
        "JavaScript is complementary to and integrated with Java",
        "JavaScript is a lightweight, interpreted programming language",
        "The general-purpose core of the language has been embedded in Netscape, Internet Explorer, and other web browsers",
        " All of the above"
      ]
    },
    {
      id: 2,
      question: "Which of the following is correct about callbacks?",
      answer: "Both of the above",
      options: [
        " A callback is a plain JavaScript function passed to some method as an argument or option.",
        "Some callbacks are just events, called to give the user a chance to react when a certain state is triggered",
        "Both of the above.",
        "None of the above."
      ]
    },
    {
      id: 3,
      question: " Which built-in method returns the string representation of the number's value?",
      answer: " toString()",
      options: [
        "toValue()",
        "toNumber()",
        " toString()",
        " None of the above"
      ]
    },
    {
      id: 4,
      question: "  Which of the following function of String object returns a number indicating the Unicode value of the character at the given index?",
      answer: "charCodeAt()",
      options: [
        "charAt()",
        "charCodeAt()",
        "concat()",
        "indexOf()"
      ]
    },
    {
      id: 5,
      question: "Which of the following function of String object executes the search for a match between a regular expression and a specified string?",
      answer: "search()",
      options: [
        "concat()",
        "match()",
        "replace()",
        "search()"
      ]
    },
    {
      id: 6,
      question: "  Which of the following function of String object returns the primitive value of the specified object.",
      answer: "valueOf()",
      options: [
        " toString()",
        "toUpperCase()",
        "toLocaleUpperCase()",
        "valueOf()"
      ]
    },
    {
      id: 7,
      question: "Which of the following function of String object causes a string to be displayed as a superscript, as if it were in a <sup> tag?",
      answer: "sup()",
      options: [
        "sup()",
        "small()",
        "strike()",
        "sub()"
      ]
    },
    {
      id: 8,
      question: "Why so JavaScript and Java have similar name?",
      answer: "JavaScript's syntax is loosely based on Java's",
      options: [
        "JavaScript is a stripped-down version of Java",
        "JavaScript's syntax is loosely based on Java's",
        "They both originated on the island of Java",
        "  None of the above"
      ]
    },
    {
      id: 8,
      question: " Which of the following function of Array object reverses the order of the elements of an array?",
      answer: "reverse()",
      options: [
        "reverse()",
        "push()",
        "reduce()",
        "reduceRight()"
      ]
    },
    {
      id: 10,
      question: "Which of the following function of Array object joins all elements of an array into a string?",
      answer: "join()",
      options: [
        "concat()",
        "join()",
        "pop()",
        "map()"
      ]
    }
  ];

 var question_count = 0;

  
  window.onload = function() {
    show(question_count);
  
  };
  function submitForm(e){
    e.preventDefault()
    var nameInput = document.getElementById("input").value
    var userName = document.getElementById("user-name")
    
    if(nameInput == ""){
      alert("Enter your name!")
    }else {
      userName.innerHTML = nameInput
    
   
    var main1 = document.getElementById("main1")
    main1.setAttribute("class" , "hide")
    var main2 = document.getElementById("main2")
    main2.classList.remove("hide")
    var name = document.getElementById("name")
    var set = name.innerHTML = nameInput;
    interval = setInterval(timer, 10)
    var name = document.getElementById("user-name2")
    name.innerHTML = nameInput;
}
}

var points = 0
  function next() {
  
    // if the question is last then redirect to final page
    if (question_count == questions.length - 0) {
      clearInterval(interval);
    
      if (points <= 30){
        var main2 = document.getElementById("main2")
        main2.setAttribute("class" , "hide")
        var main4 = document.getElementById("main4")
        main4.classList.remove("hide")
        var userPoint = document.getElementById("point2")
        userPoint.innerHTML = points
        var time = document.getElementById("time-taken2")
        time.innerHTML = min +" minutes " + sec + " seconds "
        
      }else {
    
      var main2 = document.getElementById("main2")
      main2.setAttribute("class" , "hide")
      var main3 = document.getElementById("main3")
      main3.classList.remove("hide")
        // user marks
        var userPoint = document.getElementById("point")
       userPoint.innerHTML = points
       var time = document.getElementById("time-taken")
       time.innerHTML = min +" minutes " + sec + " seconds "

      }
      console.log(points)

    }
    var user_answer = document.querySelector("li.options.active")
    // console.log(user_answer)
    user_answer = user_answer.innerHTML
    // check if the answer is right or wrong
    if (user_answer == questions[question_count].answer) {
        points += 10
    }
    
  
    question_count++;
    console.log(points)
    show(question_count);
  }
 

  // Quiz
  function show(count) {
    var question = document.getElementById("quiz-question");
    var [first, second, third, fourth] = questions[count].options;
  
    question.innerHTML = `
    <h2>Q${count + 1}. ${questions[count].question}</h2>
     <ul class="option_group">
    <li class="options">${first}</li>
    <li class="options">${second}</li>
    <li class="options">${third}</li>
    <li class="options">${fourth}</li>
  </ul> 
    `;
    toggleActive();
  }
  
  function toggleActive() {
    let option = document.querySelectorAll("li.options");
    for (let i = 0; i < option.length; i++) {
      option[i].onclick = function() {
        for (let i = 0; i < option.length; i++) {
          if (option[i].classList.contains("active")) {
            option[i].classList.remove("active");
          }
        }
        option[i].classList.add("active");
      };
    }
  }


// //   TIMER
var sec = 0;
var min = 0;  
var msec = 0;
var minspan = document.getElementById("min")
var secspan = document.getElementById("sec")
var interval;
var formatSec = sec <10 ? `0${sec}`: `${sec}` 
var formatMin = min < 10 ? `0${min}`: `${min}`

function timer(){
    msec++
    if (msec >= 100){
        sec++
        msec = 0 
    }else if (sec >=60){
        min++
        sec = 0 
    }
    var formatSec = sec <10 ? `0${sec}`: `${sec}` 
    var formatMin = min < 10 ? `0${min}`: `${min}`
    document.querySelector("span#min").innerHTML = `${formatMin}`;
    document.querySelector("span#sec").innerHTML = `  ${formatSec}`
}