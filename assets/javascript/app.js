  //Max Time limit 20 seconds per question
  var myVar;
  function startTimer() {
    myVar = setInterval(function(){myTimer()},1000);
    timelimit = maxtimelimit;
  }

  //Timer Function
  function myTimer() {
    if (timelimit > 0) {
      curmin=Math.floor(timelimit/60);
      cursec=timelimit%60;
      if (curmin!=0) { curtime=curmin+" minutes and "+cursec+" seconds left"; }
                else { curtime=cursec+" seconds left"; }

    //time left - Time Out Move to next question
      $_('timeleft').innerHTML = curtime;
    } else {
      $_('timeleft').innerHTML = timelimit+'Tick Tock, Move on to Next Question';
      clearInterval(myVar);
    }
    timelimit--;
  }
 
  var pos = 0, posn, choice, correct = 0, rscore = 0;
  //20 seconds per question
  var maxtimelimit = 20, timelimit = maxtimelimit;  
  
  //Questions 
  var questions = [
      [ "Who is the chosen one?", "Trinity", "Neo", "Morpheus", "B" ],
      [ "What was Morpheus's hovercrafts name?", "Matrix", "Logos", "Nebuchadnezzar", "C" ],
      [ "What color was the pill the Mr. Anderson took?", "Red Pill", "Blue Pill", "Yellow Pill", "A" ],
      [ "How many movies were made in the Matrix collection?", "2", "3", "4", "C" ],
 
  ];
  
  
  var questionOrder = [];
  function setQuestionOrder() {
    questionOrder.length = 0;
    for (var i=0; i<questions.length; i++) { questionOrder.push(i); }
    //alert questions order - shuffle display order
    questionOrder.sort(randOrd);  
    pos = 0;  posn = questionOrder[pos];
  }
  
  function $_(IDS) { return document.getElementById(IDS); }
  function randOrd() { return (Math.round(Math.random())-0.5); }
  function renderResults(){
    var test = $_("test");
    test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
    $_("test_status").innerHTML = "Test Completed";
    $_('timeleft').innerHTML = '';
    test.innerHTML += '<button onclick="location.reload()">Re-test</a> ';
    setQuestionOrder();
    correct = 0;
    clearInterval(myVar);
    return false;
  }
  function renderQuestion() {
    var test = $_("test");
    $_("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
    if (rscore != 0) { $_("test_status").innerHTML += '<br>Currently: '+(correct/rscore*100).toFixed(0)+'% correct'; }
    var question = questions[posn][0];
    var chA = questions[posn][1];
    var chB = questions[posn][2];
    var chC = questions[posn][3];
    test.innerHTML = "<h3>"+question+"</h3>";
    test.innerHTML += "<label><input type='radio' name='choices' value='A'> "+chA+"</label><br>";
    test.innerHTML += "<label><input type='radio' name='choices' value='B'> "+chB+"</label><br>";
    test.innerHTML += "<label><input type='radio' name='choices' value='C'> "+chC+"</label><br><br>";
    test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
    timelimit = maxtimelimit;
    clearInterval(myVar);
    startTimer();
  }
  
  function checkAnswer(){
    var choices = document.getElementsByName("choices");
    for (var i=0; i<choices.length; i++) {
      if (choices[i].checked) { choice = choices[i].value; }
    }
    rscore++;
    if (choice == questions[posn][4] && timelimit > 0) { correct++; }
    pos++;  posn = questionOrder[pos];
    if (pos < questions.length) { renderQuestion(); } else { renderResults(); }
  }
  
  window.onload = function() {
    setQuestionOrder();
    renderQuestion();
  }