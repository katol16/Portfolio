var app_questions = '';
var app_answears = '';  
$(document).ready(function() {
    $.getJSON("data.json", function(data) {
               
        $.each(data, function(key, value) {
            for (i=0; i<=value.question.length-1; i++) {
                app_questions += '<div class="answear">'+value.question[i]+'</div>'; 
            } 
        });
        $('.questions').append(app_questions);
    });
    $.getJSON("data.json", function(data) {
               
        $.each(data, function(key, value) {
            app_answears += '<div class="answearContainer">';
            for (i=0; i<=value.answears.length-1; i++) {
                
                app_answears += '<div class="answear">'+value.answears[i]+'</div>'; 
                
            } 
            app_answears += '</div>';
        });
        $('.answears').append(app_answears);
    });
});

// var app_questions = ["Which company do you think is the greates?", "CHuj w dupe", "nie chce"],
// app_answears = [ ["odp1","odp2","odp3","odp4","chuj"],["odpA","odpB","odpC"],["odpZ","odpX","odpY"] ],
// yourAnswears = [],
// // var obj = {
// //     question: "Which company do you think is the greates?",
// //     app_answears: ["odp1","odp2","odp3"]
// // };

question = document.querySelector(".question");
counter = 0;
nextBtn = document.querySelector(".next");
backBtn = document.querySelector(".back"); 
progressBar = document.getElementById("progressBar");
progressBar.max = app_questions.length;

nextBtn.addEventListener("click", nextQuestion);
backBtn.addEventListener("click", previousQuestion);


// load allapp_questions
for( var j=0; j <= app_answears.length - 1; j++ ) {
    var answearContainer = document.createElement("div");
    var answearList = document.querySelector(".answears");
    answearList.appendChild(answearContainer);
    answearContainer.classList = "answearContainer";

    for ( var i=0; i <= app_answears[j].length - 1; i++ ) {
        var answearBox = document.createElement("div");
        answearBox.classList = "answear";
        answearBox.innerHTML = app_answears[j][i];
        answearContainer.appendChild(answearBox);
    }
    chujFunc();
}

function nextQuestion() {
    if ( counter == app_questions.length - 1 ) {
        question.innerHTML = "Koniec pytan";
        nextBtn.style.display = "none";
        backBtn.style.display = "none";        
        answearList.style.display = "none";
        progressBar.value =app_questions.length; 
    } else {
        nextBtn.disabled = true;
        goToNextOrPreviousQuestion(1);
    }
};


function previousQuestion() { 
    if ( counter == 0 ) {
        backBtn.disabled = true;
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = false;
        goToNextOrPreviousQuestion(-1);
    }

};

function goToNextOrPreviousQuestion(x) {
    counter = counter + x;
    question.innerHTML =app_questions[counter];    
    backBtn.disabled = false;
    progressBar.value = counter; 

    for ( var i=0; i <= app_answears[counter].length - 1; i++ ) {      
        var answearBox = document.createElement("div");
        answearBox.classList = "answear";
        answearContainer.classList = "answearContainer";
        answearBox.innerHTML = app_answears[counter][i];
        answearList.appendChild(answearContainer);
    }
    chujFunc();
}

function chujFunc() {

    var answearContainerDiv = document.querySelectorAll(".answearContainer"); 
    $(answearContainerDiv).removeClass("show");
    $(answearContainerDiv[counter]).toggleClass("show");

    var chuj = answearContainerDiv[counter].children;

    for (var i=0; i<chuj.length; i++ ) {
        chuj[i].addEventListener("click", gowno(i));
    }

    function gowno(i) {
        return function() {
            $(chuj).removeClass("yourAnswear");
            $(chuj[i]).addClass("yourAnswear");
            nextBtn.disabled = false;  
        }     
    };
    if ( $(chuj).hasClass("yourAnswear") == true ) {
       nextBtn.disabled = false;   
       console.log("ds");
    }

};


