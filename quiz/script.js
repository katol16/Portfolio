
// MODUŁY:
// MODUŁ w którym będziemy dodawać dane
var guestionDataController = (function() {
	// function constructor
	var Question = function(question, answers, correct) {
		this.question = question;
		this.answers = answers;
		this.correct = correct;
	}

	var questions = [];

	return {
		addQuestionWithAnswers: function() {
			var question = new Question(UIController.questionText.textContent, UIController.answersArray, 0);
			questions.push(question);

			console.log(questions);		
		}
	}
})();

// MODUŁ user interface
var UIController = (function() {

		// Questions (input, and p)
	var questionInput = document.querySelector(".questionForm__Question"),
		questionText = document.querySelector(".questionText"),

		// Answers (input, ul , li)
		answerInput = document.querySelector(".answerForm__Answer"),
		answersList = document.querySelector(".answersList"),
		answersList__item,
		answersArray = [],

		// Buttons
		addQuestionBtn = document.querySelector(".questionForm__addBtn"),
		addAnswerBtn = document.querySelector(".answerForm__addBtn"),
		add = document.querySelector(".add");

	// zwracamy publiczne metody
	return {
		// zwracamy zmienne, których będziemy używać w innych modułach
		questionText,
		addQuestionBtn,
		addAnswerBtn,
		answersArray,
		add,

		// adding questions to user interface
		addQuestion: function() {
			questionText.textContent = questionInput.value;

			// wywołanie fukncji, która zablokuje/odblokuje buttony
			UIController.disableBtns(true,false,false);
		},

		// displaying buttons
		disableBtns: function(questionBtnDisable, answerBtnDisable, addBtnDisable) {
			addQuestionBtn.disabled = questionBtnDisable;
			addAnswerBtn.disabled = answerBtnDisable;
			add.disabled = addBtnDisable;			
		},

		// adding answers to user interface
		addAnswer: function() {
			answersList__item = document.createElement("li");
			answersList__item.textContent = answerInput.value;
			answersList.appendChild(answersList__item);		
			UIController.answersArray.push(answersList__item.textContent);
		},

		// celaring inputs, user interface and answersArray
		clear: function() {
			questionText.textContent = '';
			questionInput.value = '';
			answerInput.value = '';
			UIController.answersArray = [];
			while (answersList.firstChild) {
			    answersList.removeChild(answersList.firstChild);
			}

			UIController.disableBtns(false,true,true);
		}
	}
})();

// MODUŁ controller - tutaj wstawimy nasze eventy
var controller = (function(questionCtrl, UICtrl) {

	UICtrl.addQuestionBtn.addEventListener("click", UICtrl.addQuestion);
	UICtrl.addAnswerBtn.addEventListener("click", UICtrl.addAnswer);

	UICtrl.add.addEventListener("click", questionCtrl.addQuestionWithAnswers);
	UICtrl.add.addEventListener("click", UICtrl.clear);

})(guestionDataController, UIController);

